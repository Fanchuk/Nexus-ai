import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const data: Prisma.CardUpdateManyMutationInput = {};
  if (typeof body.x === "number") data.x = body.x;
  if (typeof body.y === "number") data.y = body.y;
  if (typeof body.title === "string") data.title = body.title;
  if (body.status) data.status = body.status;
  if (body.data) data.data = body.data;

  const result = await prisma.card.updateMany({
    where: { id, canvas: { userId: user.id } },
    data,
  });

  if (!result.count) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.card.deleteMany({ where: { id, canvas: { userId: user.id } } });

  return NextResponse.json({ ok: true });
}