"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/stores/toast-store";
import { WebCard } from "../types";

export type Action = "answer" | "continue" | "follow" | "chart";

export function useWebAnswer(initial: WebCard) {
  const router = useRouter();
  const [card, setCard] = useState(initial);
  const [loading, setLoading] = useState<Action | null>(null);
  const started = useRef(false);
  const baseRef = useRef("");

  async function run(action: Action, question?: string) {
    setLoading(action);

    if (action === "continue") {
      baseRef.current = `${card.data.answer ?? ""}\n\n`;
    } else {
      baseRef.current = "";
    }

    if (action === "follow" && question) {
      setCard((prev) => ({
        ...prev,
        data: { ...prev.data, thread: [...(prev.data.thread ?? []), { question, answer: "" }] },
      }));
    }

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ cardId: card.id, action, question }),
    });

    if (!res.ok || !res.body) {
      setLoading(null);
      toast.error("Search failed");
      return;
    }

    const header = res.headers.get("x-sources");
    if (header) {
      const sources = JSON.parse(decodeURIComponent(header));
      setCard((prev) => ({ ...prev, data: { ...prev.data, sources } }));
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });

      setCard((prev) => {
        if (action === "follow") {
          const thread = [...(prev.data.thread ?? [])];
          thread[thread.length - 1] = { ...thread[thread.length - 1], answer: text };
          return { ...prev, data: { ...prev.data, thread } };
        }
        return { ...prev, data: { ...prev.data, answer: baseRef.current + text } };
      });
    }

    setLoading(null);
  }

  useEffect(() => {
    if (!card.data.answer && !started.current) {
      started.current = true;
      run("answer");
    }
  }, []);

  async function save() {
    const isSaved = !card.data.isSaved;
    const data = { ...card.data, isSaved };

    setCard((prev) => ({ ...prev, data }));

    await fetch(`/api/cards/${card.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data }),
    });

    toast.success(isSaved ? "Saved to library" : "Removed from library");
  }

  async function turnIntoChart() {
    setLoading("chart");

    const res = await fetch(`/api/canvas/${card.canvasId}/cards`, {
      method: "POST",
      body: JSON.stringify({
        type: "CHART",
        title: "Generated chart",
        prompt: card.prompt,
        x: card.x + 380,
        y: card.y,
      }),
    });

    if (!res.ok) {
      setLoading(null);
      return toast.error("Could not create the chart");
    }

    const chart = await res.json();

    await fetch("/api/edges", {
      method: "POST",
      body: JSON.stringify({ canvasId: card.canvasId, sourceId: card.id, targetId: chart.id }),
    });

    await fetch("/api/chart", {
      method: "POST",
      body: JSON.stringify({ cardId: chart.id, prompt: card.prompt }),
    });

    toast.success("Chart added to the canvas");
    setLoading(null);
    router.push("/app/canvas");
  }

  return { card, loading, run, save, turnIntoChart };
}