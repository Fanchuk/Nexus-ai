"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "@/stores/toast-store";
import { CanvasTileData } from "../types";
import CanvasPreview from "./CanvasPreview";

export default function CanvasTile({ canvas }: { canvas: CanvasTileData }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [title, setTitle] = useState(canvas.title);
  const [visible, setVisible] = useState(true);
  const [duplicating, setDuplicating] = useState(false);

  if (!visible) return null;

  async function rename() {
    setRenaming(false);
    if (title === canvas.title) return;

    await fetch(`/api/canvas/${canvas.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });

    router.refresh();
  }

  async function duplicate() {
    setMenu(false);
    setDuplicating(true);
    const res = await fetch(`/api/canvas/${canvas.id}/duplicate`, { method: "POST" });
    setDuplicating(false);

    if (!res.ok) return toast.error("Could not duplicate");

    toast.success("Canvas duplicated");
    router.refresh();
  }

  async function remove() {
    setConfirming(false);
    setVisible(false);
    await fetch(`/api/canvas/${canvas.id}`, { method: "DELETE" });
    toast.success("Canvas deleted");
    router.refresh();
  }

  return (
    <li className={`group relative overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:border-iris/40 ${duplicating ? "opacity-50 pointer-events-none" : ""}`}>
      <Link href={`/app/canvas?id=${canvas.id}`} className="block">
        <CanvasPreview cards={canvas.preview} />
      </Link>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          {renaming ? (
            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={rename}
              onKeyDown={(event) => event.key === "Enter" && rename()}
              className="w-full rounded-lg border border-iris/40 bg-raised px-2 py-1 text-sm outline-none"
            />
          ) : (
            <Link href={`/app/canvas?id=${canvas.id}`} className="block truncate text-sm">
              {title}
            </Link>
          )}
          <span className="block text-xs text-muted">{canvas.updatedAt}</span>
        </div>

        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
          {canvas.count} blocks
        </span>

        <button
          onClick={() => setMenu(!menu)}
          className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-raised hover:text-fg"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {menu ? (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
          <div className="absolute bottom-14 right-4 z-20 w-40 rounded-xl border border-line bg-raised p-1">
            <button
              onClick={() => { setMenu(false); setRenaming(true); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface"
            >
              <Pencil className="size-3.5" />
              Rename
            </button>
            <button
              onClick={duplicate}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface"
            >
              <Copy className="size-3.5" />
              Duplicate
            </button>
            <button
              onClick={() => { setMenu(false); setConfirming(true); }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-magenta transition-colors hover:bg-surface"
            >
              <Trash2 className="size-3.5" />
              Delete
            </button>
          </div>
        </>
      ) : null}

      {confirming ? (
        <ConfirmModal
          title="Delete this canvas?"
          description="All cards and links on it will be removed."
          onCancel={() => setConfirming(false)}
          onConfirm={remove}
        />
      ) : null}
    </li>
  );
}