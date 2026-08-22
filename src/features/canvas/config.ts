import { BarChart3, FileText, Globe, ImagePlus, Sparkles } from "lucide-react";
import { CardType } from "./types";

export const CARD_CONFIG: Record<
  CardType,
  { label: string; description: string; gradient: string; icon: typeof Globe; href?: string }
> = {
  WEB: {
    label: "Search the web",
    description: "Live answer with cited sources",
    gradient: "from-cobalt to-azure",
    icon: Globe,
    href: "/app/canvas/web",
  },
  CHART: {
    label: "Generate a chart",
    description: "Turn data or a prompt into a visual",
    gradient: "from-mint to-acid",
    icon: BarChart3,
  },
  IMAGE: {
    label: "Create an image",
    description: "Text to image, edit, remove background",
    gradient: "from-magenta to-iris",
    icon: ImagePlus,
    href: "/app/canvas/image",
  },
  DOC: {
    label: "Analyze a document",
    description: "Upload a PDF, image or file to ask about",
    gradient: "from-gold to-magenta",
    icon: FileText,
    href: "/app/canvas/document",
  },
  RECS: {
    label: "Recommendations",
    description: "Ideas based on this canvas",
    gradient: "from-iris to-magenta",
    icon: Sparkles,
    href: "/app/canvas/recommendations",
  },
};

export const PALETTE_MODES: CardType[] = ["WEB", "CHART", "IMAGE", "DOC"];