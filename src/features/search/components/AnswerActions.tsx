"use client";

import { useState } from "react";
import { BarChart3, Bookmark, CornerDownRight } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Action } from "../hooks/useWebAnswer";

type AnswerActionsProps = {
  isSaved: boolean;
  loading: Action | null;
  onContinue: () => void;
  onChart: () => void;
  onSave: () => void;
  onAsk: (question: string) => void;
};

export default function AnswerActions({
  isSaved,
  loading,
  onContinue,
  onChart,
  onSave,
  onAsk,
}: AnswerActionsProps) {
  const [question, setQuestion] = useState("");
  const busy = loading !== null;

  function ask() {
    if (!question.trim() || busy) return;
    onAsk(question.trim());
    setQuestion("");
  }

  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onContinue}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm transition-colors hover:bg-raised disabled:opacity-50"
        >
          {loading === "continue" ? (
            <Spinner size={16} className="text-azure" />
          ) : (
            <CornerDownRight className="size-4 text-azure" />
          )}
          Continue
        </button>

        <button
          onClick={onChart}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm transition-colors hover:bg-raised disabled:opacity-50"
        >
          {loading === "chart" ? (
            <Spinner size={16} className="text-mint" />
          ) : (
            <BarChart3 className="size-4 text-mint" />
          )}
          Turn into chart
        </button>

        <button
          onClick={onSave}
          className={`flex items-center gap-2 rounded-xl border bg-surface px-4 py-2.5 text-sm transition-colors hover:bg-raised ${
            isSaved ? "border-magenta/50 text-magenta" : "border-line"
          }`}
        >
          <Bookmark className={`size-4 text-magenta ${isSaved ? "fill-magenta" : ""}`} />
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && ask()}
          placeholder="Ask a follow-up…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        />
        <button
          onClick={ask}
          disabled={busy}
          className="grid h-7 min-w-14 place-items-center rounded-lg bg-linear-to-r from-cobalt to-azure px-3 text-xs text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading === "follow" ? <Spinner size={14} /> : "Send"}
        </button>
      </div>
    </section>
  );
}