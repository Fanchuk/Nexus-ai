import { prisma } from "@/lib/prisma";
import { CardData } from "@/features/canvas/types";
import { ImageCard } from "../types";

export const STYLES = ["Cinematic", "Photo", "Illustration"];
export const RATIOS = ["4:3", "1:1", "16:9"];

export async function getImageCard(userId: string, cardId: string) {
  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "IMAGE", canvas: { userId } },
  });

  if (!card) return null;

  const settings = await prisma.settings.findUnique({ where: { userId } });
  const saved = (card.data ?? {}) as CardData;

  const fallback =
    STYLES.find((style) => style.toLowerCase() === settings?.imageStyle) ?? STYLES[0];

  const imageCard: ImageCard = {
    id: card.id,
    prompt: card.prompt,
    data: saved,
  };

  return {
    card: imageCard,
    style: saved.style ?? fallback,
    ratio: saved.ratio ?? RATIOS[0],
  };
}