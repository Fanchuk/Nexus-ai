import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function PATCH(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  await prisma.user.update({ where: { id: user.id }, data: { name: name.trim() } });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await req.json();

  if (email !== user.email) {
    return NextResponse.json({ error: "Email does not match" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({ ok: true });
}