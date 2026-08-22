"use client";

import { Maximize, Minus, Plus } from "lucide-react";
import { useReactFlow, useViewport } from "@xyflow/react";

export default function ZoomControl() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden items-center gap-1 rounded-full border border-line bg-surface/85 p-1.5 backdrop-blur-xl lg:flex">
      <button
        onClick={() => zoomOut()}
        className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-14 text-center text-sm">{Math.round(zoom * 100)}%</span>
      <button
        onClick={() => zoomIn()}
        className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
      >
        <Plus className="size-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-line" />
      <button
        onClick={() => fitView({ duration: 300 })}
        className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
      >
        <Maximize className="size-4" />
      </button>
    </div>
  );
}