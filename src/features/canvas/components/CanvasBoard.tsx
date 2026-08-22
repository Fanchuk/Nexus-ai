"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  MiniMap,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCanvasStore } from "@/stores/canvas-store";
import { useCanvasActions } from "../hooks/useCanvasActions";
import { CanvasData, CardType } from "../types";
import { nodeTypes } from "./nodes";
import { CardNode } from "./nodes/types";
import CommandBar from "./CommandBar";
import ZoomControl from "./ZoomControl";
import CanvasEmptyState from "./CanvasEmptyState";

type CanvasBoardProps = {
  initial: CanvasData;
  defaultMode: CardType;
  showGrid: boolean;
  lastViewport: { x: number; y: number; zoom: number };
};

function CanvasInner({ initial, defaultMode, showGrid, lastViewport }: CanvasBoardProps) {
  const init = useCanvasStore((state) => state.init);
  const cards = useCanvasStore((state) => state.cards);
  const edges = useCanvasStore((state) => state.edges);
  const updateCard = useCanvasStore((state) => state.updateCard);
  const setActiveCardId = useCanvasStore((state) => state.setActiveCardId);

  const { connect, remove, savePosition } = useCanvasActions();
  const { setViewport } = useReactFlow();
  
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init(initial);
    setTimeout(() => {
      setViewport(lastViewport, { duration: 0 });
      setReady(true);
    }, 50);
  }, [init, initial, lastViewport, setViewport]);

  const nodes: CardNode[] = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,
        type: card.type,
        position: { x: card.x, y: card.y },
        data: { card },
      })),
    [cards]
  );

  const flowEdges = useMemo(
    () =>
      edges.map((edge) => ({
        id: edge.id,
        source: edge.sourceId,
        target: edge.targetId,
        animated: true,
      })),
    [edges]
  );

  function onNodesChange(changes: NodeChange<CardNode>[]) {
    changes.forEach((change) => {
      if (change.type === "position" && change.position) {
        updateCard(change.id, { x: change.position.x, y: change.position.y });
      }
      if (change.type === "select" && change.selected) {
        setActiveCardId(change.id);
      }
    });
  }

  function onConnect(connection: Connection) {
    if (connection.source && connection.target) connect(connection.source, connection.target);
  }

  function onMoveEnd(_: unknown, viewport: { x: number; y: number; zoom: number }) {
    fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastX: viewport.x, lastY: viewport.y, lastZoom: viewport.zoom }),
    });
  }

  return (
    <div className={`relative h-svh transition-opacity duration-150 ${ready ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-x-0 top-0 z-20 px-4 py-4 md:px-8">
        <CommandBar defaultMode={defaultMode} />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={(_, node) => savePosition(node.id, node.position.x, node.position.y)}
        onNodesDelete={(deleted) => deleted.forEach((node) => remove(node.id))}
        onConnect={onConnect}
        onMoveEnd={onMoveEnd}
        deleteKeyCode="Delete"
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        {showGrid ? <Background variant={BackgroundVariant.Dots} gap={26} size={1} /> : null}
        <MiniMap pannable zoomable className="!hidden lg:!block" />
      </ReactFlow>

      {cards.length === 0 ? <CanvasEmptyState /> : null}

      <ZoomControl />
    </div>
  );
}

export default function CanvasBoard(props: CanvasBoardProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
}