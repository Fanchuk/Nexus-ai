"use client";

import { useEffect } from "react";
import { Lightbulb, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCanvasStore } from "@/stores/canvas-store";
import { useCanvasActions } from "../hooks/useCanvasActions";
import { CardType } from "../types";
import CommandPalette from "./CommandPalette";

export default function CommandBar({ defaultMode }: { defaultMode: CardType }) {
  const router = useRouter();
  const paletteOpen = useCanvasStore((state) => state.paletteOpen);
  const setPaletteOpen = useCanvasStore((state) => state.setPaletteOpen);
  const hasCards = useCanvasStore((state) => state.cards.length > 0);
  const { createRecommendations } = useCanvasActions();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setPaletteOpen]);

  async function createCanvas() {
    const res = await fetch("/api/canvas", { method: "POST" });
    if (res.ok) router.refresh();
  }

  return (
    <>
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <button
          onClick={() => setPaletteOpen(true)}
          className="group flex h-12 flex-1 items-center gap-3 rounded-full border border-line bg-surface/80 px-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-iris/60"
        >
          <Sparkles className="size-4 shrink-0 text-iris" />
          <span className="flex-1 truncate text-sm text-muted">
            Ask, search the web, upload, generate…
          </span>
          <kbd className="hidden rounded-md border border-iris/40 bg-iris/15 px-2 py-1 text-xs text-iris sm:block">
            ⌘K
          </kbd>
        </button>

        {hasCards ? (
          <button
            onClick={createRecommendations}
            className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-surface/80 px-4 text-sm backdrop-blur-xl transition-colors hover:bg-raised"
          >
            <Lightbulb className="size-4 text-iris" />
            <span className="hidden sm:inline">Ideas</span>
          </button>
        ) : null}

        <button
          onClick={createCanvas}
          className="flex h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-surface/80 px-4 text-sm backdrop-blur-xl transition-colors hover:bg-raised"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New canvas</span>
        </button>
      </div>

      {paletteOpen ? (
        <CommandPalette defaultMode={defaultMode} onClose={() => setPaletteOpen(false)} />
      ) : null}
    </>
  );
}