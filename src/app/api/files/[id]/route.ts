import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { utapi } from "@/lib/uploadthing";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const file = await prisma.file.findFirst({ where: { id, userId: user.id } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await utapi.deleteFiles(file.key);
  
  await prisma.file.deleteMany({ where: { id: file.id } });

  return NextResponse.json({ ok: true });
}