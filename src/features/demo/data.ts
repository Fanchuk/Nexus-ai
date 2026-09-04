import { BarChart3, Globe, Sparkles, LucideIcon } from "lucide-react";

export type DemoKind = "WEB" | "CHART" | "RECS";

export type DemoCardData = {
  kind: DemoKind;
  title: string;
  body: string;
};

export type DemoNodeSeed = {
  id: string;
  position: { x: number; y: number };
  data: DemoCardData;
};

export const DEMO_CONFIG: Record<
  DemoKind,
  { gradient: string; accent: string; icon: LucideIcon }
> = {
  WEB: { gradient: "from-cobalt to-azure", accent: "text-azure", icon: Globe },
  CHART: { gradient: "from-mint to-acid", accent: "text-mint", icon: BarChart3 },
  RECS: { gradient: "from-iris to-magenta", accent: "text-iris", icon: Sparkles },
};

export const DEMO_NODES: DemoNodeSeed[] = [
  {
    id: "web",
    position: { x: 0, y: 0 },
    data: {
      kind: "WEB",
      title: "Specialty coffee market",
      body: "Direct-to-consumer subscriptions grew roughly 12% year over year, with three cited sources.",
    },
  },
  {
    id: "chart",
    position: { x: 360, y: 60 },
    data: {
      kind: "CHART",
      title: "Growth by channel",
      body: "Waiting for context. Connect a card to fill this one.",
    },
  },
  {
    id: "recs",
    position: { x: 180, y: 300 },
    data: {
      kind: "RECS",
      title: "Next actions",
      body: "Waiting for context. Connect a card to fill this one.",
    },
  },
];

export const DEMO_FILLED: Record<string, string> = {
  chart: "Subscriptions 74 · Retail 41 · Wholesale 28 — built from the connected answer.",
  recs: "Lead with one hero product · Move the subscription toggle above the fold.",
};

export const DEMO_POINTS: number[] = [74, 41, 28, 55];