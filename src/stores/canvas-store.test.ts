import { describe, it, expect, beforeEach } from "vitest";
import { useCanvasStore } from "./canvas-store";
import { CanvasCard, CanvasEdge } from "@/features/canvas/types";

const mockCard: CanvasCard = {
  id: "card-1",
  type: "WEB",
  status: "DONE",
  title: "Search the web",
  prompt: "test prompt",
  x: 0,
  y: 0,
  data: {},
};

const mockEdge: CanvasEdge = {
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

  it("replaceCard замінює тимчасову картку на серверну", () => {
    useCanvasStore.getState().addCard({ ...mockCard, id: "temp-1" });
    useCanvasStore.getState().replaceCard("temp-1", mockCard);

    const { cards } = useCanvasStore.getState();
    expect(cards).toHaveLength(1);
    expect(cards[0].id).toBe("card-1");
  });

  it("patchCardData зливає дані, не затираючи попередні", () => {
    useCanvasStore.getState().addCard(mockCard);
    useCanvasStore.getState().patchCardData("card-1", { answer: "перша частина" });
    useCanvasStore.getState().patchCardData("card-1", { sources: [] });

    const card = useCanvasStore.getState().cards[0];
    expect(card.data.answer).toBe("перша частина");
    expect(card.data.sources).toEqual([]);
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