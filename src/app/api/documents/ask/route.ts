import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { textModel } from "@/lib/ai";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { trackUsage } from "@/lib/usage";
import { CardData } from "@/features/canvas/types";

export const maxDuration = 30;

type Action = "summary" | "points" | "qa";

const TASKS: Record<Action, string> = {
  summary: "Write two short paragraphs summarising the document.",
  points: "List 5 to 7 key points. Start every line with a dash.",
  qa: "Answer the question using only the document.",
};

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, action, question } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "DOC", canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = (card.data ?? {}) as CardData;

  const file = data.fileId
    ? await prisma.file.findFirst({ where: { id: data.fileId, userId: user.id } })
    : null;

  if (!file?.text) return NextResponse.json({ error: "No document" }, { status: 400 });

  const document = file.text
    .split("\f")
    .map((text, index) => `[p.${index + 1}] ${text}`)
    .join("\n\n")
    .slice(0, 200000);

  const { text } = await generateText({
    model: textModel,
    system:
      "You answer questions about a document. Use only what the document says. " +
      "After every fact add its page marker exactly like [p.8]. Never invent pages.",
    prompt: [
      `Document:\n${document}`,
      TASKS[action as Action],
      question ? `Question: ${question}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  const next: CardData = { ...data };
  if (action === "summary") next.summary = text;
  if (action === "points") next.keyPoints = text;
  if (action === "qa") next.thread = [...(data.thread ?? []), { question, answer: text }];

  await prisma.card.update({ where: { id: cardId }, data: { data: toJson(next) } });

  await prisma.prompt.create({
    data: {
      userId: user.id,
      canvasId: card.canvasId,
      mode: "DOC",
      text: question ?? `${action}: ${file.name}`,
    },
  });
  await trackUsage(user.id, "textRequests");

  return NextResponse.json({ text });
}