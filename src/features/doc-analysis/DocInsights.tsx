import { ArrowUp } from "lucide-react";
import MetricCard from "./MetricCard";

const tabs = ["Summary", "Key points", "Q&A"];

export default function DocInsights() {
  return (
    <section className="space-y-6">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
              index === 0
                ? "border border-gold/40 bg-gold/15 text-gold"
                : "border border-transparent text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="text-[15px] leading-7 text-fg/90">
        Revenue grew 18% quarter over quarter, driven mainly by the enterprise tier
        <button className="mx-1.5 rounded-md border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-xs text-gold transition-colors hover:bg-gold/25">
          p.8
        </button>
        . Churn dropped to its lowest point this year
        <button className="mx-1.5 rounded-md border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-xs text-gold transition-colors hover:bg-gold/25">
          p.14
        </button>
        .
      </p>

      <div className="rounded-2xl border border-line bg-surface p-4">
        <label className="mb-3 block text-sm text-muted">Ask this document</label>
        <div className="flex gap-3">
          <input
            placeholder="What drove the churn drop?"
            className="flex-1 rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-gold/60 placeholder:text-muted"
          />
          <button className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold to-magenta text-white transition-transform duration-300 hover:scale-105">
            <ArrowUp className="size-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Pages" value="24" />
        <MetricCard label="Citations" value="7" />
        <MetricCard label="Read time" value="12m" />
      </div>
    </section>
  );
}