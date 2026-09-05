import { NextRequest, NextResponse } from "next/server";
import { prisma, toJson } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { isOverLimit, trackUsage } from "@/lib/usage";
import { getReadTime, parseDocument } from "@/lib/parse-document";
import { CardData } from "@/features/canvas/types";
import { indexDocument } from "@/lib/embeddings";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (await isOverLimit(user.id, "indexedPages")) {
    return NextResponse.json({ error: "Monthly limit reached" }, { status: 429 });
  }

  const { id } = await params;
  const { cardId } = await req.json();

  const file = await prisma.file.findFirst({ where: { id, userId: user.id } });
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const pages = await parseDocument(file.url, file.mime);
    const readTime = getReadTime(pages);

    await prisma.file.update({
      where: { id: file.id },
      data: { text: pages.join("\f"), pages: pages.length, status: "INDEXED" },
    });

    await indexDocument(file.id, pages);

    const card = await prisma.card.findFirst({
      where: { id: cardId, type: "DOC", canvas: { userId: user.id } },
    });

    if (card) {
      const data: CardData = {
        fileId: file.id,
        fileName: file.name,
        pages: pages.length,
        readTime,
      };

      await prisma.card.update({
        where: { id: card.id },
        data: { status: "DONE", title: file.name, data: toJson(data) },
      });
    }

    await trackUsage(user.id, "indexedPages", pages.length);

    return NextResponse.json({ pages: pages.length, readTime });
  } catch (err) {
    console.error("DOCUMENT ANALYZE ERROR:", err);
    await prisma.file.update({ where: { id: file.id }, data: { status: "ERROR" } });
    return NextResponse.json({ error: "Could not read the file" }, { status: 500 });
  }
}