import { prisma } from "@/lib/prisma";

export type UsageField = "textRequests" | "images" | "indexedPages";

export const LIMITS: Record<UsageField, number> = {
  textRequests: 5000,
  images: 300,
  indexedPages: 2000,
};

export const currentMonth = () => new Date().toISOString().slice(0, 7);

export async function trackUsage(userId: string, field: UsageField, amount = 1) {
  await prisma.usage.upsert({
    where: { userId_month: { userId, month: currentMonth() } },
    update: { [field]: { increment: amount } },
    create: { userId, month: currentMonth(), [field]: amount },
  });
}

export async function isOverLimit(userId: string, field: UsageField) {
  const usage = await prisma.usage.findUnique({
    where: { userId_month: { userId, month: currentMonth() } },
  });

  return (usage?.[field] ?? 0) >= LIMITS[field];
}