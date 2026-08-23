import { prisma } from "@/lib/prisma";

type Field = "textRequests" | "images" | "indexedPages";

export async function trackUsage(userId: string, field: Field, amount = 1) {
  const month = new Date().toISOString().slice(0, 7);

  await prisma.usage.upsert({
    where: { userId_month: { userId, month } },
    update: { [field]: { increment: amount } },
    create: { userId, month, [field]: amount },
  });
}