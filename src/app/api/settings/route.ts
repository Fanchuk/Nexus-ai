import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

const FIELDS = ["accent", "textModel", "answerLang"];

export async function PATCH(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = Object.fromEntries(Object.entries(body).filter(([key]) => FIELDS.includes(key)));

  await prisma.settings.upsert({
    where: { userId: user.id },
    update: data,
    create: { userId: user.id, ...data },
  });

  return NextResponse.json({ ok: true });
}