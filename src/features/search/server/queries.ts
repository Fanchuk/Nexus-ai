import { prisma } from "@/lib/prisma";
import { CardData } from "@/features/canvas/types";
import { WebCard } from "../types";

export async function getWebCard(userId: string, cardId: string) {
  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "WEB", canvas: { userId } },
  });

  if (!card) return null;

  const webCard: WebCard = {
    id: card.id,
    canvasId: card.canvasId,
    title: card.title,
    prompt: card.prompt,
    x: card.x,
    y: card.y,
    data: (card.data ?? {}) as CardData,
  };

  return { card: webCard, updatedAt: card.updatedAt };
}