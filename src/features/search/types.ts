import { CardData } from "@/features/canvas/types";

export type WebCard = {
  id: string;
  canvasId: string;
  title: string;
  prompt: string;
  x: number;
  y: number;
  data: CardData;
};