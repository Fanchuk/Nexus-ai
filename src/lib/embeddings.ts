import { embed, embedMany } from "ai";
import { prisma } from "@/lib/prisma";
import { embeddingModel } from "@/lib/ai";

const SIZE = 1200;
const OVERLAP = 200;

function chunkPages(pages: string[]) {
  const chunks: { page: number; text: string }[] = [];

  pages.forEach((page, index) => {
    const clean = page.replace(/\s+/g, " ").trim();

    for (let start = 0; start < clean.length; start += SIZE - OVERLAP) {
      const text = clean.slice(start, start + SIZE).trim();
      if (text) chunks.push({ page: index + 1, text });
    }
  });

  return chunks;
}

const toVector = (values: number[]) => `[${values.join(",")}]`;

export async function indexDocument(fileId: string, pages: string[]) {
  const chunks = chunkPages(pages);
  if (!chunks.length) return 0;

  await prisma.$executeRaw`DELETE FROM "Chunk" WHERE "fileId" = ${fileId}`;

  for (let start = 0; start < chunks.length; start += 96) {
    const batch = chunks.slice(start, start + 96);

    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: batch.map((chunk) => chunk.text),
    });

    for (let i = 0; i < batch.length; i++) {
      await prisma.$executeRaw`
        INSERT INTO "Chunk" ("id", "fileId", "page", "text", "embedding")
        VALUES (gen_random_uuid()::text, ${fileId}, ${batch[i].page}, ${batch[i].text}, ${toVector(embeddings[i])}::vector)
      `;
    }
  }

  return chunks.length;
}

export async function retrieve(fileId: string, question: string) {
  const { embedding } = await embed({ model: embeddingModel, value: question });
  const vector = toVector(embedding);

  return prisma.$queryRaw<{ text: string; page: number }[]>`
    SELECT "text", "page"
    FROM "Chunk"
    WHERE "fileId" = ${fileId} AND "embedding" IS NOT NULL
    ORDER BY "embedding" <=> ${vector}::vector
    LIMIT 6
  `;
}