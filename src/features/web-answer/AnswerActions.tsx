import { BarChart3, Bookmark, CornerDownRight } from "lucide-react";

export default function AnswerActions() {
  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
          <CornerDownRight className="size-4 text-azure" />
          Continue
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
          <BarChart3 className="size-4 text-mint" />
          Turn into chart
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
          <Bookmark className="size-4 text-magenta" />
          Save
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          placeholder="Ask a follow-up…"
        />
        <button className="rounded-lg bg-gradient-to-r from-cobalt to-azure px-3 py-1.5 text-xs text-white transition-opacity hover:opacity-90">
          Send
        </button>
      </div>
    </section>
  );
}