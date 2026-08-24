"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileText, MessageSquare, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Spinner from "@/components/ui/Spinner";
import { toast } from "@/stores/toast-store";
import { FileRowData } from "../types";

export default function FilePreview({
  file,
  onDelete,
}: {
  file: FileRowData;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [asking, setAsking] = useState(false);

  const details: [string, string][] = [
    ["Size", file.size],
    ["Type", file.mime.split("/").pop() ?? file.mime],
    ["Uploaded", file.date],
  ];

  if (file.pages) details.unshift(["Pages", String(file.pages)]);

  async function remove() {
    setConfirming(false);
    onDelete(file.id);

    const res = await fetch(`/api/files/${file.id}`, { method: "DELETE" });
    if (!res.ok) toast.error("Could not delete the file");
    else toast.success("File deleted");

    router.refresh();
  }

  async function ask() {
    setAsking(true);

    const res = await fetch("/api/files/ask", {
      method: "POST",
      body: JSON.stringify({ fileId: file.id }),
    });

    setAsking(false);

    if (!res.ok) return toast.error("Could not open the document");

    const { cardId } = await res.json();
    router.push(`/app/canvas/document?card=${cardId}`);
  }

  return (
    <aside className="rounded-2xl border border-line bg-surface p-5">
      <div className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-gold/12 to-transparent">
        {file.kind === "IMAGE" ? (
          <Image src={file.url} alt={file.name} fill className="object-cover" sizes="420px" />
        ) : (
          <FileText className="size-12 text-gold/70" />
        )}
      </div>

      <h2 className="mt-5 truncate text-sm">{file.name}</h2>

      <dl className="mt-3 space-y-2 text-sm">
        {details.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-muted">{label}</dt>
            <dd className="truncate">{value}</dd>
          </div>
        ))}
      </dl>

      {file.kind === "DOCUMENT" && file.status === "INDEXED" ? (
        <button
          onClick={ask}
          disabled={asking}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-magenta py-2.5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {asking ? <Spinner size={16} /> : <MessageSquare className="size-4" />}
          Ask this file
        </button>
      ) : null}

      <div className="mt-3 flex gap-2">
        <a
          href={`/api/files/download/${file.id}`}
          download={file.name}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm transition-colors hover:bg-raised"
        >
          <Download className="size-4" />
          Download
        </a>
        <button
          onClick={() => setConfirming(true)}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-magenta/50 hover:text-magenta"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {confirming ? (
        <ConfirmModal
          title="Delete this file?"
          description="It will be removed from storage and from any cards using it."
          onCancel={() => setConfirming(false)}
          onConfirm={remove}
        />
      ) : null}
    </aside>
  );
}