"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { toast } from "@/stores/toast-store";
import { CARD_CONFIG } from "@/features/canvas/config";
import { HistoryEntry } from "../types";

export default function HistoryItem({ entry }: { entry: HistoryEntry }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const config = CARD_CONFIG[entry.mode];
  const Icon = config.icon;

  function open() {
    if (!entry.canvasId) return;
    const card = entry.cardId ? `&card=${entry.cardId}` : "";
    router.push(`/app/canvas?id=${entry.canvasId}${card}`);
  }

  async function rerun(event: React.MouseEvent) {
    event.stopPropagation();
    setLoading(true);

    const res = await fetch("/api/history/rerun", {
      method: "POST",
      body: JSON.stringify({ promptId: entry.id }),
    });

    setLoading(false);

    if (!res.ok) return toast.error("Could not rerun this prompt");

    const { canvasId, cardId } = await res.json();
    router.push(`/app/canvas?id=${canvasId}&card=${cardId}&run=1`);
  }

  return (
    <li className="relative">
      <span
        className={`absolute -left-[31px] top-6 size-2.5 rounded-full bg-gradient-to-br ${config.gradient}`}
      />

      <div
        onClick={open}
        className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-iris/40"
      >
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${config.gradient} text-white`}
        >
          <Icon className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm">{entry.text || config.label}</span>
          <span className="block text-xs text-muted">
            {entry.time} · {entry.mode.toLowerCase()}
          </span>
        </span>

        <button
          onClick={rerun}
          className="shrink-0 rounded-lg border border-line p-2 text-muted opacity-0 transition-all hover:text-fg group-hover:opacity-100"
        >
          {loading ? <Spinner size={14} /> : <RotateCcw className="size-3.5" />}
        </button>
      </div>
    </li>
  );
}