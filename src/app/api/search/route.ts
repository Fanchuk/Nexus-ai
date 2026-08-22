import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { textModel } from "@/lib/ai";
import { searchWeb } from "@/lib/serper";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { getIncomingContext } from "@/features/canvas/server/context";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, prompt } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [sources, context] = await Promise.all([searchWeb(prompt), getIncomingContext(cardId)]);

  const references = sources
    .map((source, index) => `[${index + 1}] ${source.title} (${source.domain}): ${source.snippet}`)
    .join("\n");

  await prisma.card.update({ where: { id: cardId }, data: { status: "STREAMING" } });

  const result = streamText({
    model: textModel,
    system:
      "You are a research assistant. Answer in two short paragraphs using only the sources. " +
      "Mark every fact with its source number like [1]. Never invent sources.",
    prompt: [
      context ? `Context from linked cards:\n${context}` : "",
      `Sources:\n${references}`,
      `Question: ${prompt}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
    onFinish: async ({ text }) => {
      await prisma.card.update({
        where: { id: cardId },
        data: { status: "DONE", data: { answer: text, sources } },
      });
    },
  });

  return result.toTextStreamResponse({
    headers: { "x-sources": encodeURIComponent(JSON.stringify(sources)) },
  });
}