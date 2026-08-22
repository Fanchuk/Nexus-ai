import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { textModel } from "@/lib/ai";
import { searchWeb, WebSource } from "@/lib/serper";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { trackUsage } from "@/lib/usage";
import { getIncomingContext } from "@/features/canvas/server/context";
import { CardData } from "@/features/canvas/types";

export const maxDuration = 30;

type Action = "answer" | "continue" | "follow";

const SYSTEM =
  "You are a research assistant. Answer in short paragraphs using only the sources. " +
  "Mark every fact with its source number like [1]. Never invent sources.";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, action = "answer", question } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "WEB", canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = (card.data ?? {}) as CardData;
  const sources: WebSource[] =
    action === "answer" ? await searchWeb(card.prompt) : data.sources ?? [];

  const references = sources
    .map((source, index) => `[${index + 1}] ${source.title} (${source.domain}): ${source.snippet}`)
    .join("\n");

  const context = await getIncomingContext(cardId);

  const task: Record<Action, string> = {
    answer: `Question: ${card.prompt}`,
    continue: `Previous answer:\n${data.answer}\n\nAdd one new paragraph with extra detail. Do not repeat anything.`,
    follow: `Previous answer:\n${data.answer}\n\nFollow-up question: ${question}`,
  };

  await prisma.card.update({ where: { id: cardId }, data: { status: "STREAMING" } });
  await prisma.prompt.create({
    data: {
      userId: user.id,
      canvasId: card.canvasId,
      mode: "WEB",
      text: question ?? card.prompt,
    },
  });
  await trackUsage(user.id, "textRequests");

  const result = streamText({
    model: textModel,
    system: SYSTEM,
    prompt: [
      context ? `Context from linked cards:\n${context}` : "",
      `Sources:\n${references}`,
      task[action as Action],
    ]
      .filter(Boolean)
      .join("\n\n"),
    onFinish: async ({ text }) => {
      const next: CardData = { ...data, sources };

      if (action === "answer") next.answer = text;
      if (action === "continue") next.answer = `${data.answer ?? ""}\n\n${text}`;
      if (action === "follow") {
        next.thread = [...(data.thread ?? []), { question, answer: text }];
      }

      await prisma.card.update({
        where: { id: cardId },
        data: { status: "DONE", data: toJson(next) },
      });
    },
  });

  return result.toTextStreamResponse({
    headers: { "x-sources": encodeURIComponent(JSON.stringify(sources)) },
  });
}