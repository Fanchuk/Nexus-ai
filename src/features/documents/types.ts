import { CardData } from "@/features/canvas/types";

export type DocCard = {
  id: string;
  data: CardData;
};

export type Tab = "summary" | "points" | "qa";