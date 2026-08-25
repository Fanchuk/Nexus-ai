import { create } from "zustand";
import { CanvasCard, CanvasData, CanvasEdge, CardData, CardStatus } from "@/features/canvas/types";

type CanvasState = {
  canvasId: string;
  cards: CanvasCard[];
  edges: CanvasEdge[];
  activeCardId: string | null;
  paletteOpen: boolean;
  init: (data: CanvasData) => void;
  setPaletteOpen: (open: boolean) => void;
  setActiveCardId: (id: string | null) => void;
  addCard: (card: CanvasCard) => void;
  replaceCard: (tempId: string, card: CanvasCard) => void;
  updateCard: (id: string, patch: Partial<CanvasCard>) => void;
  patchCardData: (id: string, patch: CardData) => void;
  setStatus: (id: string, status: CardStatus) => void;
  removeCard: (id: string) => void;
  addEdge: (edge: CanvasEdge) => void;
  replaceEdge: (tempId: string, edge: CanvasEdge) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  canvasId: "",
  cards: [],
  edges: [],
  activeCardId: null,
  paletteOpen: false,

  init: (data) => set({ canvasId: data.id, cards: data.cards, edges: data.edges }),

  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),

  setActiveCardId: (activeCardId) => set({ activeCardId }),

  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),

  replaceCard: (tempId, card) =>
    set((state) => ({ cards: state.cards.map((item) => (item.id === tempId ? card : item)) })),

  updateCard: (id, patch) =>
    set((state) => ({
      cards: state.cards.map((card) => (card.id === id ? { ...card, ...patch } : card)),
    })),

  patchCardData: (id, patch) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, data: { ...card.data, ...patch } } : card
      ),
    })),

  setStatus: (id, status) =>
    set((state) => ({
      cards: state.cards.map((card) => (card.id === id ? { ...card, status } : card)),
    })),

  removeCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
      edges: state.edges.filter((edge) => edge.sourceId !== id && edge.targetId !== id),
    })),

  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),

  replaceEdge: (tempId, edge) => 
    set((state) => ({ edges: state.edges.map((item) => (item.id === tempId ? edge : item)) })),
}));