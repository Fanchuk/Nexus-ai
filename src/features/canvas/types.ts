export type CardType = "WEB" | "CHART" | "IMAGE" | "DOC" | "RECS";
export type CardStatus = "PENDING" | "STREAMING" | "DONE" | "ERROR";

export type CardData = {
  answer?: string;
  sources?: { title: string; link: string; domain: string; snippet: string }[];
  thread?: { question: string; answer: string }[];
  isSaved?: boolean;
  points?: { label: string; value: number }[];
  urls?: string[];
  activeUrl?: string;
  style?: string;
  ratio?: string;
  summary?: string;
  fileName?: string;
  items?: { title: string; description: string }[];
};

export type CanvasCard = {
  id: string;
  type: CardType;
  status: CardStatus;
  title: string;
  prompt: string;
  x: number;
  y: number;
  data: CardData;
};

export type CanvasEdge = {
  id: string;
  sourceId: string;
  targetId: string;
};

export type CanvasData = {
  id: string;
  title: string;
  cards: CanvasCard[];
  edges: CanvasEdge[];
};