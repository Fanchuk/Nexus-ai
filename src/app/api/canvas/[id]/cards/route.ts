import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { toCard } from "@/features/canvas/server/queries";
import type { Prisma } from "@prisma/client";

const bodySchema = z.object({
  type: z.enum(["WEB", "CHART", "IMAGE", "DOC", "RECS"]),
  title: z.string(),
  prompt: z.string().default(""),
  x: z.number(),
  y: z.number(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const canvas = await prisma.canvas.findFirst({ where: { id, userId: user.id } });
  if (!canvas) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const body = parsed.data;

  const card = await prisma.card.create({
    data: {
      canvasId: canvas.id,
      type: body.type,
      title: body.title,
      prompt: body.prompt,
      x: body.x,
      y: body.y,
      data: (body.data ?? {}) as Prisma.InputJsonValue,
    },
  });

  if (body.prompt) {
    await prisma.prompt.create({
      data: { userId: user.id, canvasId: canvas.id, mode: body.type, text: body.prompt, cardId: card.id },
    });
  }

  await prisma.canvas.update({ where: { id: canvas.id }, data: { updatedAt: new Date() } });

  return NextResponse.json(toCard(card));
}