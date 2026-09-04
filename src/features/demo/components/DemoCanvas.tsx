"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RotateCcw } from "lucide-react";
import { DEMO_FILLED, DEMO_NODES } from "../data";
import DemoNode, { DemoNodeType } from "./DemoNode";

const nodeTypes = { WEB: DemoNode, CHART: DemoNode, RECS: DemoNode };

function buildNodes(edges: Edge[], positions: Record<string, { x: number; y: number }>): DemoNodeType[] {
  const targets = new Set(edges.map((e) => e.target));

  return DEMO_NODES.map((node) => {
    const inherited = targets.has(node.id);
    return {
      id: node.id,
      type: node.data.kind,
      position: positions[node.id] ?? node.position,
      data: {
        ...node.data,
        inherited,
        body: inherited ? (DEMO_FILLED[node.id] ?? node.data.body) : node.data.body,
      },
    };
  });
}

function DemoFlow() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const nodes = useMemo(() => buildNodes(edges, positions), [edges, positions]);

  const onNodesChange = useCallback((changes: NodeChange<DemoNodeType>[]) => {
    setPositions((prev) => {
      const next = { ...prev };
      let touched = false;
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          next[change.id] = change.position;
          touched = true;
        }
      });
      return touched ? next : prev;
    });
  }, []);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((prev) => addEdge({ ...connection, animated: true }, prev)),
    []
  );

  const reset = useCallback(() => {
    setEdges([]);
    setPositions({});
  }, []);

  return (
    <div className="relative h-105 w-full overflow-hidden rounded-2xl border border-line bg-ink sm:h-130">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.4}
        maxZoom={1.4}
        panOnScroll={false}
        zoomOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={26} size={1} />
      </ReactFlow>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4">
        <span className="rounded-full border border-line bg-surface/85 px-3 py-1.5 text-[11px] text-muted backdrop-blur-xl sm:text-xs">
          Drag a card · connect from the right edge to another
        </span>

        {edges.length ? (
          <button
            onClick={reset}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-surface/85 px-3 py-1.5 text-xs text-muted backdrop-blur-xl transition-colors hover:text-fg"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function DemoCanvas() {
  return (
    <ReactFlowProvider>
      <DemoFlow />
    </ReactFlowProvider>
  );
}