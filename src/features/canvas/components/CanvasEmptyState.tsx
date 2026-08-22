"use client";

import { Sparkles } from "lucide-react";
import { useCanvasStore } from "@/stores/canvas-store";

export default function CanvasEmptyState() {
  const setPaletteOpen = useCanvasStore((state) => state.setPaletteOpen);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="pointer-events-auto grid place-items-center text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-iris to-magenta">
          <Sparkles className="size-6 text-white" />
        </span>
        <h2 className="mt-5 text-base">Your canvas is empty</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Ask a question, generate a chart or upload a document — every result stays as a card.
        </p>
        <button
          onClick={() => setPaletteOpen(true)}
          className="mt-6 rounded-xl bg-gradient-to-r from-iris to-magenta px-5 py-3 text-sm text-white"
        >
          Start with a prompt
        </button>
      </div>
    </div>
  );
}