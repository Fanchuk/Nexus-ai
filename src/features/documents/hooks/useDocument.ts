"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/stores/toast-store";
import { CardData } from "@/features/canvas/types";
import { DocCard, Tab } from "../types";

export function useDocument(card: DocCard) {
  const router = useRouter();
  const [data, setData] = useState<CardData>(card.data);
  const [tab, setTab] = useState<Tab>("summary");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<Tab | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  async function analyze(fileId: string) {
    setAnalyzing(true);

    const res = await fetch(`/api/documents/${fileId}/analyze`, {
      method: "POST",
      body: JSON.stringify({ cardId: card.id }),
    });

    setAnalyzing(false);

    if (!res.ok) return toast.error("Could not read the file");

    toast.success("Document indexed");
    router.refresh();
  }

  async function ask(action: Tab, question?: string) {
    if (loading) return;
    setLoading(action);

    const res = await fetch("/api/documents/ask", {
      method: "POST",
      body: JSON.stringify({ cardId: card.id, action, question }),
    });

    setLoading(null);

    if (!res.ok) return toast.error("Request failed");

    const { text } = await res.json();

    setData((prev) => {
      if (action === "summary") return { ...prev, summary: text };
      if (action === "points") return { ...prev, keyPoints: text };
      return { ...prev, thread: [...(prev.thread ?? []), { question: question ?? "", answer: text }] };
    });
  }

  function openTab(next: Tab) {
    setTab(next);
    if (next === "summary" && !data.summary) ask("summary");
    if (next === "points" && !data.keyPoints) ask("points");
  }

  function askQuestion(question: string) {
    setTab("qa");
    ask("qa", question);
  }

  return { data, tab, page, loading, analyzing, setPage, openTab, askQuestion, analyze };
}