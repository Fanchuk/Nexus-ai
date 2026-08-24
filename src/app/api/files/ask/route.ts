import { NextRequest, NextResponse } from "next/server";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { CardData } from "@/features/canvas/types";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { fileId } = await req.json();

  const file = await prisma.file.findFirst({ where: { id: fileId, userId: user.id } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = await prisma.card.findFirst({
    where: { type: "DOC", canvas: { userId: user.id }, data: { path: ["fileId"], equals: fileId } },
  });

  if (existing) return NextResponse.json({ cardId: existing.id });

  const canvas = await prisma.canvas.findFirst({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  if (!canvas) return NextResponse.json({ error: "No canvas" }, { status: 404 });

  const words = (file.text ?? "").split(/\s+/).filter(Boolean).length;

  const data: CardData = {
    fileId: file.id,
    fileName: file.name,
    pages: file.pages ?? 1,
    readTime: Math.max(1, Math.round(words / 200)),
  };

  const card = await prisma.card.create({
    data: {
      canvasId: canvas.id,
      type: "DOC",
      status: "DONE",
      title: file.name,
      prompt: file.name,
      x: 0,
      y: 0,
      data: toJson(data),
    },
  });

  return NextResponse.json({ cardId: card.id });
}