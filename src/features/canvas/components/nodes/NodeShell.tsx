"use client";

import { Handle, Position } from "@xyflow/react";
import { BarChart3, Copy, Maximize2, RefreshCw, Trash2 } from "lucide-react";
import { useCanvasActions } from "../../hooks/useCanvasActions";
import { CARD_CONFIG } from "../../config";
import { CanvasCard } from "../../types";

type NodeShellProps = {
  card: CanvasCard;
  children: React.ReactNode;
};

const edgeHandleClass =
  "!h-full !w-3 !min-w-0 !rounded-none !border-0 !bg-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:!bg-iris/25 group-hover:!bg-iris/10";

export default function NodeShell({ card, children }: NodeShellProps) {
  const { run, duplicate, remove, expand, turnIntoChart } = useCanvasActions();
  const config = CARD_CONFIG[card.type];

  return (
    <div className={`group w-[300px] rounded-2xl bg-gradient-to-br p-px ${config.gradient}`}>
      <Handle
        type="target"
        position={Position.Left}
        className={edgeHandleClass}
        style={{ left: 0, top: 0, transform: "none", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={edgeHandleClass}
        style={{ right: 0, top: 0, transform: "none", borderRadius: 0 }}
      />

      <div className="rounded-[15px] bg-surface p-4">
        <div className="mb-4 flex items-center gap-2">
          <span className={`size-3 rounded-full bg-gradient-to-br ${config.gradient}`} />
          <h3 className="truncate text-sm">{card.title}</h3>

          <div className="ml-auto flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {card.type === "WEB" ? (
              <button
                onClick={() => turnIntoChart(card)}
                className="rounded-md p-1 text-muted transition-colors hover:text-mint"
              >
                <BarChart3 className="size-3.5" />
              </button>
            ) : null}
            <button
              onClick={() => run(card)}
              className="rounded-md p-1 text-muted transition-colors hover:text-fg"
            >
              <RefreshCw className="size-3.5" />
            </button>
            <button
              onClick={() => duplicate(card)}
              className="rounded-md p-1 text-muted transition-colors hover:text-fg"
            >
              <Copy className="size-3.5" />
            </button>
            {config.href ? (
              <button
                onClick={() => expand(card)}
                className="rounded-md p-1 text-muted transition-colors hover:text-fg"
              >
                <Maximize2 className="size-3.5" />
              </button>
            ) : null}
            <button
              onClick={() => remove(card.id)}
              className="rounded-md p-1 text-muted transition-colors hover:text-magenta"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        {card.status === "ERROR" ? (
          <p className="text-sm text-magenta">Something went wrong. Try regenerating.</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
}