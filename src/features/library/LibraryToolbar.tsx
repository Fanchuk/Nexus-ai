import { Plus, Search } from "lucide-react";

const filters = ["All", "Starred", "Recent"];

export default function LibraryToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-11 min-w-56 flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition-colors duration-300 focus-within:border-iris/60">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          placeholder="Search canvases…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      <div className="flex gap-2">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`rounded-xl px-4 py-2.5 text-sm transition-colors duration-300 ${
              index === 0
                ? "border border-iris/40 bg-iris/15 text-iris"
                : "border border-line text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <button className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-iris to-magenta px-4 text-sm text-white transition-all duration-300 hover:shadow-[0_0_26px_-8px_#ff2c9a]">
        <Plus className="size-4" />
        New canvas
      </button>
    </div>
  );
}