import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const source = await prisma.canvas.findFirst({
    where: { id, userId: user.id },
    include: { cards: true, edges: true },
  });
  if (!source) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const copyId = randomUUID();
  const ids = new Map(source.cards.map((card) => [card.id, randomUUID()]));

  await prisma.$transaction([
    prisma.canvas.create({
      data: { id: copyId, userId: user.id, title: `${source.title} (copy)` },
    }),
    prisma.card.createMany({
      data: source.cards.map((card) => ({
        id: ids.get(card.id)!,
        canvasId: copyId,
        type: card.type,
        status: card.status,
        title: card.title,
        prompt: card.prompt,
        x: card.x,
        y: card.y,
        data: card.data ?? {},
      })),
    }),
    prisma.cardEdge.createMany({
      data: source.edges.map((edge) => ({
        canvasId: copyId,
        sourceId: ids.get(edge.sourceId)!,
        targetId: ids.get(edge.targetId)!,
      })),
    }),
  ]);

  return NextResponse.json({ id: copyId });
}