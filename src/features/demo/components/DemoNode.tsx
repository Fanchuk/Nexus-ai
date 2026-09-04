"use client";

import { memo } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { DEMO_CONFIG, DEMO_POINTS, DemoCardData } from '../data'

export type DemoNodeType = Node<
  DemoCardData & { inherited: boolean },
  "WEB" | "CHART" | "RECS"
>;

const handleClass =
  "!h-full !w-3 !min-w-0 !rounded-none !border-0 !bg-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:!bg-iris/30 group-hover:!bg-iris/10";

function DemoNode({ data }: NodeProps<DemoNodeType>) {
  const config = DEMO_CONFIG[data.kind];
  const Icon = config.icon;

  return (
    <div className={`group w-60 rounded-2xl bg-linear-to-br p-px sm:w-[280px] ${config.gradient}`}>
      <Handle
        type="target"
        position={Position.Left}
        className={handleClass}
        style={{ left: 0, top: 0, transform: "none", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={handleClass}
        style={{ right: 0, top: 0, transform: "none", borderRadius: 0 }}
      />

      <div className="rounded-[15px] bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <Icon className={`size-4 shrink-0 ${config.accent}`} />
          <h3 className="truncate text-sm">{data.title}</h3>
        </div>

        {data.kind === "CHART" && data.inherited ? (
          <div className="mb-3 flex h-20 items-end gap-1.5">
            {DEMO_POINTS.map((value: number) => (
              <div
                key={value}
                style={{ height: `${value}%` }}
                className="flex-1 rounded-md bg-linear-to-t from-mint/20 to-mint/70"
              />
            ))}
          </div>
        ) : null}

        <p className="line-clamp-3 text-xs leading-5 text-fg/70 sm:text-sm sm:leading-6">
          {data.body}
        </p>

        {data.inherited ? (
          <span className="mt-3 inline-flex rounded-full border border-iris/40 bg-iris/10 px-2.5 py-1 text-[11px] text-iris">
            context inherited
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default memo(DemoNode);