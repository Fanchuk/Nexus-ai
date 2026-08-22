import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { toCard } from "@/features/canvas/server/queries";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const canvas = await prisma.canvas.findFirst({
    where: { id, userId: user.id },
    include: { cards: true, edges: true },
  });

  if (!canvas) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: canvas.id,
    title: canvas.title,
    cards: canvas.cards.map(toCard),
    edges: canvas.edges.map((edge) => ({
      id: edge.id,
      sourceId: edge.sourceId,
      targetId: edge.targetId,
    })),
  });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { title } = await req.json();

  const result = await prisma.canvas.updateMany({
    where: { id, userId: user.id },
    data: { title },
  });

  if (!result.count) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.canvas.deleteMany({ where: { id, userId: user.id } });

  return NextResponse.json({ ok: true });
}