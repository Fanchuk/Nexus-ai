"use client";

import { useRouter } from "next/navigation";
import { useReactFlow } from "@xyflow/react";
import { useDebouncedCallback } from "use-debounce";
import { nanoid } from "nanoid";
import { toast } from "@/stores/toast-store";
import { useCanvasStore } from "@/stores/canvas-store";
import { CARD_CONFIG } from "../config";
import { CanvasCard, CardType } from "../types";

export function useCanvasActions() {
  const router = useRouter();
  const { screenToFlowPosition } = useReactFlow();

  const canvasId = useCanvasStore((state) => state.canvasId);
  const cards = useCanvasStore((state) => state.cards);
  const addCard = useCanvasStore((state) => state.addCard);
  const replaceCard = useCanvasStore((state) => state.replaceCard);
  const patchCardData = useCanvasStore((state) => state.patchCardData);
  const setStatus = useCanvasStore((state) => state.setStatus);
  const removeCard = useCanvasStore((state) => state.removeCard);
  const addEdge = useCanvasStore((state) => state.addEdge);

  const savePosition = useDebouncedCallback((id: string, x: number, y: number) => {
    fetch(`/api/cards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    });
  }, 800);

  async function createCard(type: CardType, prompt: string, x: number, y: number) {
    const tempId = `temp-${nanoid()}`;
    const title = CARD_CONFIG[type].label;

    addCard({ id: tempId, type, status: "PENDING", title, prompt, x, y, data: {} });

    const res = await fetch(`/api/canvas/${canvasId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, title, prompt, x, y }),
    });

    if (!res.ok) {
      removeCard(tempId);
      toast.error("Could not create the card");
      return null;
    }

    const card: CanvasCard = await res.json();
    replaceCard(tempId, card);
    return card;
  }

  async function streamWeb(card: CanvasCard) {
    setStatus(card.id, "STREAMING");
    patchCardData(card.id, { answer: "" });

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: card.id, prompt: card.prompt }),
    });

    if (!res.ok || !res.body) {
      setStatus(card.id, "ERROR");
      toast.error("Search failed");
      return;
    }

    const header = res.headers.get("x-sources");
    if (header) patchCardData(card.id, { sources: JSON.parse(decodeURIComponent(header)) });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let answer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
      patchCardData(card.id, { answer });
    }

    setStatus(card.id, "DONE");
  }

  async function generateChart(card: CanvasCard) {
    setStatus(card.id, "STREAMING");

    const res = await fetch("/api/chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: card.id, prompt: card.prompt }),
    });

    if (!res.ok) {
      setStatus(card.id, "ERROR");
      toast.error("Chart generation failed");
      return;
    }

    const object = await res.json();
    patchCardData(card.id, { points: object.points });
    setStatus(card.id, "DONE");
  }

  function run(card: CanvasCard) {
    if (card.type === "WEB") return streamWeb(card);
    if (card.type === "CHART") return generateChart(card);
    router.push(`${CARD_CONFIG[card.type].href}?card=${card.id}`);
  }

  async function submitPrompt(mode: CardType, prompt: string) {
    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const card = await createCard(mode, prompt, center.x - 150, center.y - 100);
    if (card) run(card);
  }

  async function duplicate(card: CanvasCard) {
    const tempId = `temp-${nanoid()}`;
    const copy = { ...card, id: tempId, x: card.x + 40, y: card.y + 40 };
    addCard(copy);

    const res = await fetch(`/api/canvas/${canvasId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: card.type,
        title: card.title,
        prompt: card.prompt,
        x: copy.x,
        y: copy.y,
        data: card.data,
      }),
    });

    if (res.ok) replaceCard(tempId, await res.json());
  }

  async function remove(id: string) {
    removeCard(id);
    await fetch(`/api/cards/${id}`, { method: "DELETE" });
  }

  async function connect(sourceId: string, targetId: string) {
    const res = await fetch("/api/edges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ canvasId, sourceId, targetId }),
    });

    if (res.ok) addEdge(await res.json());
  }

  async function turnIntoChart(card: CanvasCard) {
    const chart = await createCard("CHART", card.prompt, card.x + 380, card.y);
    if (!chart) return;

    await connect(card.id, chart.id);
    generateChart(chart);
  }

  async function createRecommendations() {
    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const card = await createCard("RECS", "", center.x - 150, center.y + 120);
    if (card) router.push(`/app/canvas/recommendations?card=${card.id}`);
  }

  function expand(card: CanvasCard) {
    const href = CARD_CONFIG[card.type].href;
    if (href) router.push(`${href}?card=${card.id}`);
  }

  function findCard(id: string) {
    return cards.find((card) => card.id === id) ?? null;
  }

  return {
    submitPrompt,
    run,
    duplicate,
    remove,
    connect,
    turnIntoChart,
    createRecommendations,
    expand,
    savePosition,
    findCard,
  };
}