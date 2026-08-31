import { describe, it, expect, beforeEach } from "vitest";
import { useCanvasStore } from "./canvas-store";

const mockCard = {
  id: "card-1",
  type: "WEB" as const,
  status: "DONE" as const,
  position: { x: 0, y: 0 },
  prompt: "test prompt",
  data: {},
  createdAt: new Date().toISOString(),
};

const mockEdge = {
  id: "edge-1",
  sourceId: "card-1",
  targetId: "card-2",
};

beforeEach(() => {
  useCanvasStore.setState({
    canvasId: "",
    cards: [],
    edges: [],
    activeCardId: null,
    paletteOpen: false,
  });
});

describe("useCanvasStore", () => {
  it("початковий стан порожній", () => {
    const { cards, edges, paletteOpen } = useCanvasStore.getState();
    expect(cards).toHaveLength(0);
    expect(edges).toHaveLength(0);
    expect(paletteOpen).toBe(false);
  });

  it("addCard додає картку", () => {
    useCanvasStore.getState().addCard(mockCard);
    expect(useCanvasStore.getState().cards).toHaveLength(1);
    expect(useCanvasStore.getState().cards[0].id).toBe("card-1");
  });

  it("removeCard видаляє картку і пов'язані ребра", () => {
    useCanvasStore.getState().addCard(mockCard);
    useCanvasStore.getState().addEdge(mockEdge);
    useCanvasStore.getState().removeCard("card-1");
    expect(useCanvasStore.getState().cards).toHaveLength(0);
    expect(useCanvasStore.getState().edges).toHaveLength(0);
  });

  it("setStatus змінює статус картки", () => {
    useCanvasStore.getState().addCard(mockCard);
    useCanvasStore.getState().setStatus("card-1", "STREAMING");
    expect(useCanvasStore.getState().cards[0].status).toBe("STREAMING");
  });

  it("setPaletteOpen відкриває палітру", () => {
    useCanvasStore.getState().setPaletteOpen(true);
    expect(useCanvasStore.getState().paletteOpen).toBe(true);
  });
});