import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { textModel } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { getIncomingContext } from "@/features/canvas/server/context";

export const maxDuration = 30;

const chartSchema = z.object({
  title: z.string(),
  points: z.array(z.object({ label: z.string(), value: z.number() })).min(3).max(8),
});

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, prompt } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const context = await getIncomingContext(cardId);

  const { object } = await generateObject({
    model: textModel,
    schema: chartSchema,
    prompt: [
      context ? `Data from linked cards:\n${context}` : "",
      `Build a small bar chart for: ${prompt}`,
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  await prisma.card.update({
    where: { id: cardId },
    data: { status: "DONE", title: object.title, data: { points: object.points } },
  });

  return NextResponse.json(object);
}