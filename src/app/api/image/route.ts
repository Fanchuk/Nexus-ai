import { NextRequest, NextResponse } from "next/server";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { isOverLimit, trackUsage } from "@/lib/usage";
import { createImage } from "@/lib/image-gen";
import { CardData } from "@/features/canvas/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (await isOverLimit(user.id, "images")) {
    return NextResponse.json({ error: "Monthly limit reached" }, { status: 429 });
  }

  const { cardId, prompt, style, ratio, count } = await req.json();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "IMAGE", canvas: { userId: user.id } },
  });
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const total = Math.min(Math.max(Number(count) || 1, 1), 4);

  await prisma.card.update({
    where: { id: cardId },
    data: { status: "STREAMING", prompt },
  });

  const results: Awaited<ReturnType<typeof createImage>>[] = [];
  for (let i = 0; i < total; i++) {
    const result = await createImage(prompt, style, ratio);
    results.push(result);
  }

  const uploaded = results.filter((item) => item !== null);

  if (!uploaded.length) {
    await prisma.card.update({ where: { id: cardId }, data: { status: "ERROR" } });
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }

  await prisma.file.createMany({
    data: uploaded.map((item) => ({
      userId: user.id,
      name: item.name,
      key: item.key,
      url: item.url,
      size: item.size,
      mime: item.mime,
      kind: "IMAGE" as const,
    })),
  });

  const urls = uploaded.map((item) => item.url);
  const data: CardData = { urls, activeUrl: urls[0], style, ratio };

  await prisma.card.update({
    where: { id: cardId },
    data: { status: "DONE", data: toJson(data) },
  });

  await prisma.prompt.create({
    data: { userId: user.id, canvasId: card.canvasId, mode: "IMAGE", text: prompt, cardId: card.id },
  });
  
  await trackUsage(user.id, "images", urls.length);

  return NextResponse.json({ urls });
}