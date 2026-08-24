import { NextRequest, NextResponse } from "next/server";
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

  const copy = await prisma.canvas.create({
    data: { userId: user.id, title: `${source.title} (copy)` },
  });

  const ids = new Map<string, string>();

  for (const card of source.cards) {
    const created = await prisma.card.create({
      data: {
        canvasId: copy.id,
        type: card.type,
        status: card.status,
        title: card.title,
        prompt: card.prompt,
        x: card.x,
        y: card.y,
        data: card.data ?? {},
      },
    });

    ids.set(card.id, created.id);
  }

  await prisma.cardEdge.createMany({
    data: source.edges.map((edge) => ({
      canvasId: copy.id,
      sourceId: ids.get(edge.sourceId)!,
      targetId: ids.get(edge.targetId)!,
    })),
  });

  return NextResponse.json({ id: copy.id });
}