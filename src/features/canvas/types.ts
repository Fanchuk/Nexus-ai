export type CardType = "WEB" | "CHART" | "IMAGE" | "DOC" | "RECS";
export type CardStatus = "PENDING" | "STREAMING" | "DONE" | "ERROR";

export type CardData = {
  // Web / General / Q&A
  answer?: string;
  sources?: { title: string; link: string; domain: string; snippet: string }[];
  thread?: { question: string; answer: string }[];
  isSaved?: boolean;

  // Recommendations (RECS)
  items?: {
    title: string;
    description: string;
    category: string;
    reasoning: string;
  }[];

  // Chart
  points?: { label: string; value: number }[];

  // Image
  urls?: string[];
  activeUrl?: string;
  style?: string;
  ratio?: string;

  // Document (DOC)
  fileId?: string;
  fileName?: string;
  summary?: string;
  keyPoints?: string;
  pages?: number;
  readTime?: number;
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