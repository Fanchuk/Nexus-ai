import { RefreshCw, Sparkles } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import RecommendationRow from "./RecommendationRow";

const filters = ["All", "Most relevant", "Tools", "Reading", "Design"];

const items = [
  {
    title: "Switch the hero to a single product shot",
    description: "Pages with one focused hero convert better than carousels for small roasters.",
    gradient: "from-magenta to-iris",
  },
  {
    title: "Add a subscription toggle above the fold",
    description: "Your competitors surface pricing modes before the story section.",
    gradient: "from-cobalt to-azure",
  },
  {
    title: "Compress hero imagery to WebP",
    description: "Estimated 1.4s faster first paint on mid-range mobile devices.",
    gradient: "from-mint to-acid",
  },
];

export default function RecommendationsPanel() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<Sparkles className="size-5" />}
        title="Recommendations"
        gradient="from-iris to-magenta"
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
              index === 0
                ? "border border-iris/40 bg-iris/15 text-iris"
                : "border border-line text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <RecommendationRow key={item.title} {...item} />
        ))}
      </ul>

      <button className="mt-6 flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors duration-300 hover:bg-raised">
        <RefreshCw className="size-4 text-iris" />
        Refine criteria
      </button>
    </div>
  );
}