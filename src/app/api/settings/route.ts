import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function PATCH(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (typeof body.lastX === "number") data.lastX = body.lastX;
  if (typeof body.lastY === "number") data.lastY = body.lastY;
  if (typeof body.lastZoom === "number") data.lastZoom = body.lastZoom;

  await prisma.settings.upsert({
    where: { userId: user.id },
    update: data,
    create: { userId: user.id, ...data },
  });

  return NextResponse.json({ ok: true });
}