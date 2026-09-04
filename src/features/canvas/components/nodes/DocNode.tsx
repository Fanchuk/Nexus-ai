"use client";

import { NodeProps } from "@xyflow/react";
import NodeShell from "./NodeShell";
import NodeSkeleton from "./NodeSkeleton";
import { CardNode } from "./types";

export default function DocNode({ data }: NodeProps<CardNode>) {
  const { card } = data;

  return (
    <NodeShell card={card}>
      <div className="flex gap-4">
        <div className="h-24 w-16 shrink-0 rounded-lg bg-linear-to-b from-gold/40 to-gold/10" />
        <div className="min-w-0 flex-1">
          {card.data.summary ? (
            <p className="line-clamp-4 text-sm leading-6 text-fg/80">{card.data.summary}</p>
          ) : (
            <NodeSkeleton />
          )}
        </div>
      </div>

      {card.data.fileName ? (
        <p className="mt-3 truncate text-xs text-muted">{card.data.fileName}</p>
      ) : null}
    </NodeShell>
  );
}