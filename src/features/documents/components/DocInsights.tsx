"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";
import { CardData } from "@/features/canvas/types";
import { Tab } from "../types";
import DocText from "./DocText";
import MetricCard from "./MetricCard";

const TABS: { id: Tab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "points", label: "Key points" },
  { id: "qa", label: "Q&A" },
];

type DocInsightsProps = {
  data: CardData;
  tab: Tab;
  loading: Tab | null;
  onTab: (tab: Tab) => void;
  onPage: (page: number) => void;
  onAsk: (question: string) => void;
};

export default function DocInsights({
  data,
  tab,
  loading,
  onTab,
  onPage,
  onAsk,
}: DocInsightsProps) {
  const [question, setQuestion] = useState("");

  const text = tab === "summary" ? data.summary : tab === "points" ? data.keyPoints : "";
  const citations = ((data.summary ?? "").match(/\[p\.\d+\]/g) ?? []).length;

  function submit() {
    if (!question.trim() || loading) return;
    onAsk(question.trim());
    setQuestion("");
  }

  return (
    <section className="space-y-6">
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
              tab === item.id
                ? "border border-gold/40 bg-gold/15 text-gold"
                : "border border-transparent text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "qa" ? (
        <div className="space-y-4">
          {data.thread?.length ? (
            data.thread.map((item, index) => (
              <div key={index} className="rounded-2xl border border-line bg-surface p-4">
                <p className="mb-3 text-sm text-muted">{item.question}</p>
                <DocText text={item.answer} onPage={onPage} />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">Ask anything about this document below.</p>
          )}
          {loading === "qa" ? <Skeleton className="h-2 w-9/12" /> : null}
        </div>
      ) : loading === tab ? (
        <div className="space-y-3">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-11/12" />
          <Skeleton className="h-2 w-7/12" />
        </div>
      ) : text ? (
        <DocText text={text} onPage={onPage} />
      ) : (
        <p className="text-sm text-muted">Open this tab to generate it.</p>
      )}

      <div className="rounded-2xl border border-line bg-surface p-4">
        <label className="mb-3 block text-sm text-muted">Ask this document</label>
        <div className="flex gap-3">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submit()}
            placeholder="What drove the churn drop?"
            className="flex-1 rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors focus:border-gold/60 placeholder:text-muted"
          />
          <button
            onClick={submit}
            disabled={loading !== null}
            className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold to-magenta text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            {loading === "qa" ? <Spinner size={18} /> : <ArrowUp className="size-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Pages" value={String(data.pages ?? 0)} />
        <MetricCard label="Citations" value={String(citations)} />
        <MetricCard label="Read time" value={`${data.readTime ?? 0}m`} />
      </div>
    </section>
  );
}