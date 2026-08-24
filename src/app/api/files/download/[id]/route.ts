import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const file = await prisma.file.findFirst({ where: { id, userId: user.id } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const response = await fetch(file.url);
  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Disposition": `attachment; filename="${file.name}"`,
      "Content-Type": file.mime,
    },
  });
}