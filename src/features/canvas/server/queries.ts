import { Card } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CanvasCard, CanvasData, CardData, CardStatus, CardType } from "../types";

export function toCard(card: Card): CanvasCard {
  return {
    id: card.id,
    type: card.type as CardType,
    status: card.status as CardStatus,
    title: card.title,
    prompt: card.prompt,
    x: card.x,
    y: card.y,
    data: (card.data ?? {}) as CardData,
  };
}

export async function getCanvas(userId: string, canvasId?: string): Promise<CanvasData> {
  const include = { cards: true, edges: true };

  let canvas = canvasId
    ? await prisma.canvas.findFirst({ where: { id: canvasId, userId }, include })
    : await prisma.canvas.findFirst({ where: { userId }, orderBy: { updatedAt: "desc" }, include });

  if (!canvas) {
    canvas = await prisma.canvas.create({
      data: { userId, title: "My first canvas" },
      include,
    });
  }

  return {
    id: canvas.id,
    title: canvas.title,
    cards: canvas.cards.map(toCard),
    edges: canvas.edges.map((edge) => ({
      id: edge.id,
      sourceId: edge.sourceId,
      targetId: edge.targetId,
    })),
  };
}