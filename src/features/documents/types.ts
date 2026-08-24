import { CardData } from "@/features/canvas/types";

export type DocCard = {
  id: string;
  data: CardData;
};

export type Tab = "summary" | "points" | "qa";

export type FileRowData = {
  id: string;
  name: string;
  url: string;
  size: string;
  date: string;
  mime: string;
  kind: "DOCUMENT" | "IMAGE" | "DATA";
  status: "PROCESSING" | "INDEXED" | "ERROR";
  pages: number | null;
};

export type StorageSegment = {
  label: string;
  percent: number;
  gradient: string;
};