import { prisma } from "@/lib/prisma";
import { CardData } from "../types";

export async function getIncomingContext(cardId: string) {
  const edges = await prisma.cardEdge.findMany({
    where: { targetId: cardId },
    include: { source: true },
  });

  return edges
    .map((edge) => {
      const data = (edge.source.data ?? {}) as CardData;
      return data.answer ?? data.summary ?? edge.source.prompt;
    })
    .filter(Boolean)
    .join("\n\n");
}