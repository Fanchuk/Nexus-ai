import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { canvasId, sourceId, targetId } = await req.json();

  const canvas = await prisma.canvas.findFirst({ where: { id: canvasId, userId: user.id } });
  if (!canvas) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const edge = await prisma.cardEdge.upsert({
    where: { sourceId_targetId: { sourceId, targetId } },
    update: {},
    create: { canvasId, sourceId, targetId },
  });

  return NextResponse.json({ id: edge.id, sourceId: edge.sourceId, targetId: edge.targetId });
}