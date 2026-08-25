import { format, isToday, isYesterday } from "date-fns";
import { prisma } from "@/lib/prisma";
import { CardType } from "@/features/canvas/types";
import { HistoryEntry, HistoryGroupData } from "../types";

function label(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "d MMMM");
}

export async function getHistory(userId: string, limit: number) {
  const prompts = await prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
  });

  const hasMore = prompts.length > limit;
  const groups: HistoryGroupData[] = [];

  prompts.slice(0, limit).forEach((prompt) => {
    const entry: HistoryEntry = {
      id: prompt.id,
      text: prompt.text,
      mode: prompt.mode as CardType,
      time: format(prompt.createdAt, isToday(prompt.createdAt) ? "HH:mm" : "EEE"),
      canvasId: prompt.canvasId,
      cardId: prompt.cardId,
    };

    const group = groups.at(-1);
    const current = label(prompt.createdAt);

    if (group?.label === current) group.items.push(entry);
    else groups.push({ label: current, items: [entry] });
  });

  return { groups, hasMore };
}