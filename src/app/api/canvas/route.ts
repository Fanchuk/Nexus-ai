import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function POST() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const canvas = await prisma.canvas.create({
    data: { userId: user.id, title: "Untitled canvas" },
  });

  return NextResponse.json({ id: canvas.id });
}