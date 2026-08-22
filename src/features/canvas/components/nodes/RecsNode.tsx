"use client";

import { NodeProps } from "@xyflow/react";
import NodeShell from "./NodeShell";
import NodeSkeleton from "./NodeSkeleton";
import { CardNode } from "./types";

export default function RecsNode({ data }: NodeProps<CardNode>) {
  const { card } = data;
  const items = card.data.items ?? [];

  return (
    <NodeShell card={card}>
      {items.length ? (
        <ul className="space-y-2">
          {items.slice(0, 3).map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-line bg-raised/60 px-3 py-2.5"
            >
              <span className="size-3 shrink-0 rounded-full bg-gradient-to-br from-iris to-magenta" />
              <span className="truncate text-xs">{item.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <NodeSkeleton />
      )}
    </NodeShell>
  );
}