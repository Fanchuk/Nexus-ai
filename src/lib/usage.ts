import { prisma } from "@/lib/prisma";

type Field = "textRequests" | "images" | "indexedPages";

export async function trackUsage(userId: string, field: Field) {
  const month = new Date().toISOString().slice(0, 7);

  await prisma.usage.upsert({
    where: { userId_month: { userId, month } },
    update: { [field]: { increment: 1 } },
    create: { userId, month, [field]: 1 },
  });
}