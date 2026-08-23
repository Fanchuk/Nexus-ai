"use client";

import { useState } from "react";

const gradients: Record<string, string> = {
  Tools: "from-cobalt to-azure",
  Reading: "from-gold to-magenta",
  Design: "from-magenta to-iris",
};

type RecommendationRowProps = {
  title: string;
  description: string;
  category: string;
  reasoning: string;
};

export default function RecommendationRow({
  title,
  description,
  category,
  reasoning,
}: RecommendationRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className="group rounded-2xl border border-line bg-surface p-4 transition-all hover:border-iris/50">
      <div className="flex items-start gap-4">
        <span
          className={`size-11 shrink-0 rounded-xl bg-gradient-to-br ${gradients[category] ?? "from-iris to-magenta"}`}
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm">{title}</p>
          <p className="mt-1 text-sm text-muted">{description}</p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs text-muted opacity-0 transition-all hover:text-fg group-hover:opacity-100 focus-visible:opacity-100"
        >
          why?
        </button>
      </div>

      {open ? (
        <p className="mt-3 rounded-xl border border-iris/30 bg-iris/10 px-4 py-3 text-sm text-fg/80">
          {reasoning}
        </p>
      ) : null}
    </li>
  );
}