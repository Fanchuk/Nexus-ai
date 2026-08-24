import { CardType } from "@/features/canvas/types";

export type PreviewCard = {
  type: CardType;
  x: number;
  y: number;
};

export type CanvasTileData = {
  id: string;
  title: string;
  updatedAt: string;
  count: number;
  preview: PreviewCard[];
};