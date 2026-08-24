import { Prisma } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { prisma } from "@/lib/prisma";
import { CardType } from "@/features/canvas/types";
import { CanvasTileData } from "../types";
import { FILTERS } from "../constants";

const WEEK = 7 * 24 * 60 * 60 * 1000;

export async function getCanvases(userId: string, query: string, filter: string) {
  const where: Prisma.CanvasWhereInput = { userId };

  if (query) where.title = { contains: query, mode: "insensitive" };

  if (filter === "Starred") {
    where.cards = { some: { data: { path: ["isSaved"], equals: true } } };
  }

  if (filter === "Recent") {
    where.updatedAt = { gte: new Date(Date.now() - WEEK) };
  }

  const canvases = await prisma.canvas.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { cards: true } },
      cards: { select: { type: true, x: true, y: true }, take: 6, orderBy: { createdAt: "asc" } },
    },
  });

  return canvases.map<CanvasTileData>((canvas) => ({
    id: canvas.id,
    title: canvas.title,
    updatedAt: formatDistanceToNow(canvas.updatedAt, { addSuffix: true }),
    count: canvas._count.cards,
    preview: canvas.cards.map((card) => ({
      type: card.type as CardType,
      x: card.x,
      y: card.y,
    })),
  }));
}