"use client";

import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useQueryState } from "nuqs";
import Spinner from "@/components/ui/Spinner";
import { toast } from "@/stores/toast-store";
import { useState } from "react";
import { FILTERS } from "../constants";

export default function LibraryToolbar() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
    shallow: false,
    throttleMs: 400,
  });

  const [filter, setFilter] = useQueryState("filter", {
    defaultValue: "All",
    shallow: false,
  });

  async function createCanvas() {
    setCreating(true);
    const res = await fetch("/api/canvas", { method: "POST" });
    setCreating(false);

    if (!res.ok) return toast.error("Could not create the canvas");

    const { id } = await res.json();
    router.push(`/app/canvas?id=${id}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-11 min-w-56 flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition-colors focus-within:border-iris/60">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value || null)}
          placeholder="Search canvases…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      <div className="flex gap-2">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item === "All" ? null : item)}
            className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
              filter === item
                ? "border border-iris/40 bg-iris/15 text-iris"
                : "border border-line text-muted hover:bg-raised hover:text-fg"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        onClick={createCanvas}
        disabled={creating}
        className="flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-iris to-magenta px-4 text-sm text-white transition-all hover:shadow-[0_0_26px_-8px_#ff2c9a] disabled:opacity-60"
      >
        {creating ? <Spinner size={16} /> : <Plus className="size-4" />}
        New canvas
      </button>
    </div>
  );
}