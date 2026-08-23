import { NextRequest, NextResponse } from "next/server";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { trackUsage } from "@/lib/usage";
import { removeBackground } from "@/lib/image-gen";
import { CardData } from "@/features/canvas/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cardId, url } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "IMAGE", canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const uploaded = await removeBackground(url);
  if (!uploaded) return NextResponse.json({ error: "Edit failed" }, { status: 500 });

  await prisma.file.create({
    data: {
      userId: user.id,
      name: uploaded.name,
      key: uploaded.key,
      url: uploaded.url,
      size: uploaded.size,
      mime: uploaded.mime,
      kind: "IMAGE",
    },
  });

  const previous = (card.data ?? {}) as CardData;
  const data: CardData = {
    ...previous,
    urls: [...(previous.urls ?? []), uploaded.url],
    activeUrl: uploaded.url,
  };

  await prisma.card.update({ where: { id: cardId }, data: { data: toJson(data) } });
  await trackUsage(user.id, "images");

  return NextResponse.json({ url: uploaded.url });
}