import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  
  const body = await req.text();
  const data: Prisma.CardUpdateManyMutationInput = {};
  
  if (body) {
    const parsed = JSON.parse(body);
    if (typeof parsed.x === "number") data.x = parsed.x;
    if (typeof parsed.y === "number") data.y = parsed.y;
    if (typeof parsed.title === "string") data.title = parsed.title;
    if (parsed.status) data.status = parsed.status;
    if (parsed.data) data.data = parsed.data;
  }

  if (Object.keys(data).length > 0) {
    const result = await prisma.card.updateMany({
      where: { id, canvas: { userId: user.id } },
      data,
    });

    if (!result.count) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const card = await prisma.card.findFirst({
      where: { id },
      select: { canvasId: true },
    });

    if (card) {
      await prisma.canvas.update({
        where: { id: card.canvasId },
        data: { updatedAt: new Date() },
      });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.card.deleteMany({ where: { id, canvas: { userId: user.id } } });

  return NextResponse.json({ ok: true });
}