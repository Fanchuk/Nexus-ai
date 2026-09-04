"use client";

import { FileText, Image as ImageIcon, Table } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { FileRowData } from "../types";

const icons = { DOCUMENT: FileText, IMAGE: ImageIcon, DATA: Table };

const gradients = {
  DOCUMENT: "from-gold to-magenta",
  IMAGE: "from-magenta to-iris",
  DATA: "from-mint to-acid",
};

const badges = {
  INDEXED: "border-mint/40 bg-mint/10 text-mint",
  PROCESSING: "border-gold/40 bg-gold/10 text-gold",
  ERROR: "border-magenta/40 bg-magenta/10 text-magenta",
};

type FileRowProps = {
  file: FileRowData;
  active: boolean;
  onSelect: () => void;
};

export default function FileRow({ file, active, onSelect }: FileRowProps) {
  const Icon = icons[file.kind];

  return (
    <li>
      <button
        onClick={onSelect}
        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
          active ? "border-iris/50 bg-raised" : "border-line bg-surface hover:bg-raised/70"
        }`}
      >
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br ${gradients[file.kind]} text-white`}
        >
          <Icon className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm">{file.name}</span>
          <span className="block text-xs text-muted">
            {file.size} · {file.date}
          </span>
        </span>

        <span
          className={`flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${badges[file.status]}`}
        >
          {file.status === "PROCESSING" ? <Spinner size={11} /> : null}
          {file.status === "INDEXED" ? "Indexed" : file.status === "ERROR" ? "Failed" : "Processing"}
        </span>
      </button>
    </li>
  );
}