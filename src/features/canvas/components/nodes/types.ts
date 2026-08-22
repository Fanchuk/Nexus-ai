import { Node } from "@xyflow/react";
import { CanvasCard } from "../../types";

export type CardNode = Node<{ card: CanvasCard }, "WEB" | "CHART" | "IMAGE" | "DOC" | "RECS">;