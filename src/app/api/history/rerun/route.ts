import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { CARD_CONFIG } from "@/features/canvas/config";
import { CardType } from "@/features/canvas/types";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { promptId } = await req.json();

  const prompt = await prisma.prompt.findFirst({ where: { id: promptId, userId: user.id } });
  if (!prompt) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const canvas = await prisma.canvas.findFirst({
    where: { userId: user.id, ...(prompt.canvasId ? { id: prompt.canvasId } : {}) },
    orderBy: { updatedAt: "desc" },
  });
  if (!canvas) return NextResponse.json({ error: "No canvas" }, { status: 404 });

  const count = await prisma.card.count({ where: { canvasId: canvas.id } });
  const type = prompt.mode as CardType;

  const card = await prisma.card.create({
    data: {
      canvasId: canvas.id,
      type: prompt.mode,
      title: CARD_CONFIG[type].label,
      prompt: prompt.text,
      x: (count % 3) * 380,
      y: Math.floor(count / 3) * 320,
    },
  });

  await prisma.prompt.create({
    data: {
      userId: user.id,
      canvasId: canvas.id,
      cardId: card.id,
      mode: prompt.mode,
      text: prompt.text,
    },
  });

  return NextResponse.json({ canvasId: canvas.id, cardId: card.id });
}