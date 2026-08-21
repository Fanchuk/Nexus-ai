"use client";

import { useEffect, useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import CommandPalette from "@/features/command-palette/CommandPalette";

export default function CommandBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="group flex h-12 flex-1 items-center gap-3 rounded-full border border-line bg-surface px-4 text-left transition-all duration-300 hover:border-iris/60 hover:shadow-[0_0_28px_-10px_#9747d2]"
        >
          <Sparkles className="size-4 shrink-0 text-iris transition-transform duration-300 group-hover:scale-110" />
          <span className="flex-1 truncate text-sm text-muted">
            Ask, search the web, upload, generate…
          </span>
          <kbd className="hidden rounded-md border border-iris/40 bg-iris/15 px-2 py-1 text-xs text-iris sm:block">
            ⌘K
          </kbd>
        </button>

        <button className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm transition-colors duration-300 hover:bg-raised">
          <Plus className="size-4" />
          <span className="hidden sm:inline">New canvas</span>
        </button>
      </div>

      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}