"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { useQueryState } from "nuqs";
import PanelHeader from "@/components/ui/PanelHeader";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";
import { toast } from "@/stores/toast-store";
import { CardData } from "@/features/canvas/types";
import RecommendationRow from "./RecommendationRow";
import RefineModal from "./RefineModal";

const FILTERS = ["All", "Tools", "Reading", "Design"];

type Item = NonNullable<CardData["items"]>[number];

type RecommendationsPanelProps = {
  cardId: string;
  initialItems: Item[];
};

export default function RecommendationsPanel({
  cardId,
  initialItems,
}: RecommendationsPanelProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "All" });
  const started = useRef(false);

  async function generate(focus?: string[]) {
    setLoading(true);

    const res = await fetch("/api/recommendations", {
      method: "POST",
      body: JSON.stringify({ cardId, focus }),
    });

    setLoading(false);

    if (!res.ok) return toast.error("Could not generate recommendations");

    const result = await res.json();
    setItems(result.items);
  }

  useEffect(() => {
    if (!initialItems.length && !started.current) {
      started.current = true;
      generate();
    }
  }, []);

  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<Sparkles className="size-5" />}
        title="Recommendations"
        gradient="from-iris to-magenta"
        meta={items.length ? `${items.length} ideas` : undefined}
      />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item === "All" ? null : item)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
              filter === item
                ? "border border-iris/40 bg-iris/15 text-iris"
                : "border border-line text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="rounded-2xl border border-line bg-surface p-4">
              <Skeleton className="h-2 w-8/12" />
              <Skeleton className="mt-3 h-2 w-11/12" />
            </div>
          ))}
        </div>
      ) : visible.length ? (
        <ul className="space-y-3">
          {visible.map((item) => (
            <RecommendationRow key={item.title} {...item} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Nothing in this category yet.</p>
      )}

      <button
        onClick={() => setRefining(true)}
        disabled={loading}
        className="mt-6 flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:bg-raised disabled:opacity-50"
      >
        {loading ? <Spinner size={16} className="text-iris" /> : <RefreshCw className="size-4 text-iris" />}
        Refine criteria
      </button>

      {refining ? (
        <RefineModal
          onClose={() => setRefining(false)}
          onApply={(focus) => {
            setRefining(false);
            generate(focus);
          }}
        />
      ) : null}
    </div>
  );
}