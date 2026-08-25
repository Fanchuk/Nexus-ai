import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function DELETE() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.prompt.deleteMany({ where: { userId: user.id } });

  return NextResponse.json({ ok: true });
}