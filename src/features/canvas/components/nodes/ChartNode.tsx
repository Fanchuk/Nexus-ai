"use client";

import { NodeProps } from "@xyflow/react";
import NodeShell from "./NodeShell";
import NodeSkeleton from "./NodeSkeleton";
import { CardNode } from "./types";

export default function ChartNode({ data }: NodeProps<CardNode>) {
  const { card } = data;
  const points = card.data.points ?? [];
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <NodeShell card={card}>
      {points.length ? (
        <div className="flex h-32 items-end gap-2">
          {points.map((point) => (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                style={{ height: `${(point.value / max) * 100}%` }}
                className="w-full rounded-md bg-gradient-to-t from-mint/20 to-mint/70"
              />
              <span className="w-full truncate text-center text-[10px] text-muted">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <NodeSkeleton />
      )}
    </NodeShell>
  );
}