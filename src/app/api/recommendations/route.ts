import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { z } from "zod";
import { textModel } from "@/lib/ai";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { trackUsage } from "@/lib/usage";
import { CardData } from "@/features/canvas/types";

export const maxDuration = 30;

const schema = z.object({
  items: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(["Tools", "Reading", "Design"]),
        reasoning: z.string(),
      })
    )
    .min(1)
    .max(6),
});

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, focus } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "RECS", canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cards = await prisma.card.findMany({
    where: { canvasId: card.canvasId, id: { not: cardId } },
  });

  const context = cards
    .map((item) => {
      const data = (item.data ?? {}) as CardData;
      return `${item.title}: ${item.prompt} ${data.answer ?? data.summary ?? ""}`.slice(0, 800);
    })
    .join("\n\n");

  if (!context.trim()) {
    return NextResponse.json({ error: "Canvas is empty" }, { status: 400 });
  }

  const { object } = await generateObject({
    model: textModel,
    schema,
    prompt: [
      `Here is what the user is working on:\n${context}`,
      focus?.length ? `Focus only on these categories: ${focus.join(", ")}.` : "",
      "Suggest 3 to 6 concrete next actions. Keep each description to one sentence. " +
        "In reasoning explain in one sentence why you suggest it based on the canvas.",
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  await prisma.card.update({
    where: { id: cardId },
    data: { status: "DONE", data: toJson({ items: object.items } satisfies CardData) },
  });

  await prisma.prompt.create({
    data: { userId: user.id, canvasId: card.canvasId, mode: "RECS", text: "Recommendations" },
  });
  await trackUsage(user.id, "textRequests");

  return NextResponse.json({ items: object.items });
}