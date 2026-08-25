import { CardType } from "@/features/canvas/types";

export type HistoryEntry = {
  id: string;
  text: string;
  mode: CardType;
  time: string;
  canvasId: string | null;
  cardId: string | null;
};

export type HistoryGroupData = {
  label: string;
  items: HistoryEntry[];
};