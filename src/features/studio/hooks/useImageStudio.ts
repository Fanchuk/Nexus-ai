"use client";

import { useState } from "react";
import { toast } from "@/stores/toast-store";
import { CardData } from "@/features/canvas/types";
import { ImageCard } from "../types";

type Loading = "generate" | "edit" | null;

export function useImageStudio(initial: ImageCard, initialStyle: string, initialRatio: string) {
  const [data, setData] = useState<CardData>(initial.data);
  const [prompt, setPrompt] = useState(initial.prompt);
  const [style, setStyle] = useState(initialStyle);
  const [ratio, setRatio] = useState(initialRatio);
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState<Loading>(null);

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading("generate");

    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({ cardId: initial.id, prompt: prompt.trim(), style, ratio, count }),
    });

    setLoading(null);

    if (!res.ok) {
      toast.error("Generation failed");
      return;
    }

    const { urls } = await res.json();
    setData({ urls, activeUrl: urls[0], style, ratio });
    toast.success(`${urls.length} image${urls.length !== 1 ? "s" : ""} ready`);
  }

  async function removeBackground() {
    if (!data.activeUrl || loading) return;
    setLoading("edit");

    const res = await fetch("/api/image/edit", {
      method: "POST",
      body: JSON.stringify({ cardId: initial.id, url: data.activeUrl }),
    });

    setLoading(null);

    if (!res.ok) {
      toast.error("Could not remove the background");
      return;
    }

    const { url } = await res.json();
    setData((prev) => ({ ...prev, urls: [...(prev.urls ?? []), url], activeUrl: url }));
    toast.success("Background removed");
  }

  async function select(url: string) {
    const next = { ...data, activeUrl: url };
    setData(next);

    await fetch(`/api/cards/${initial.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: next }),
    });
  }

  return {
    data,
    prompt,
    style,
    ratio,
    count,
    loading,
    setPrompt,
    setStyle,
    setRatio,
    setCount,
    generate,
    removeBackground,
    select,
  };
}