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

export async function getCanvas(userId: string): Promise<CanvasData> {
  let canvas = await prisma.canvas.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: { cards: true, edges: true },
  });

  if (!canvas) {
    canvas = await prisma.canvas.create({
      data: { userId, title: "My first canvas" },
      include: { cards: true, edges: true },
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