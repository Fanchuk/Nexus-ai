"use client";

import { NodeProps } from "@xyflow/react";
import NodeShell from "./NodeShell";
import NodeSkeleton from "./NodeSkeleton";
import { CardNode } from "./types";

export default function WebNode({ data }: NodeProps<CardNode>) {
  const { card } = data;
  const answer = card.data.answer ?? "";

  return (
    <NodeShell card={card}>
      {answer ? (
        <p className="line-clamp-5 text-sm leading-6 text-fg/80">{answer}</p>
      ) : (
        <NodeSkeleton />
      )}

      {card.data.sources?.length ? (
        <span className="mt-4 inline-flex rounded-full border border-azure/40 bg-azure/10 px-2.5 py-1 text-xs text-azure">
          {card.data.sources.length} sources
        </span>
      ) : null}
    </NodeShell>
  );
}