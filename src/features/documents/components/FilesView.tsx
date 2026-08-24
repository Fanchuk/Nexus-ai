"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useQueryState } from "nuqs";
import { FileRowData, StorageSegment } from "../types";
import StorageBar from "./StorageBar";
import FileRow from "./FileRow";
import FilePreview from "./FilePreview";

type FilesViewProps = {
  rows: FileRowData[];
  segments: StorageSegment[];
  usedLabel: string;
  processing: boolean;
  activeId?: string;
};

export default function FilesView({
  rows,
  segments,
  usedLabel,
  processing,
  activeId,
}: FilesViewProps) {
  const router = useRouter();
  const [selected, setSelected] = useQueryState("file", { defaultValue: activeId ?? "" });
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const visibleRows = rows.filter((row) => !deletedIds.has(row.id));
  const active = visibleRows.find((row) => row.id === selected) ?? visibleRows[0];

  if (!visibleRows.length) {
    return (
      <p className="mt-10 text-center text-sm text-muted">
        Nothing uploaded yet. Analyze a document on the canvas to see files here.
      </p>
    );
  }

  return (
    <>
      <StorageBar segments={segments} usedLabel={usedLabel} />

      {processing ? (
        <button
          onClick={() => router.refresh()}
          className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <RefreshCw className="size-4" />
          Some files are still processing — refresh
        </button>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="space-y-2">
          {visibleRows.map((row) => (
            <FileRow
              key={row.id}
              file={row}
              active={row.id === active?.id}
              onSelect={() => setSelected(row.id)}
            />
          ))}
        </ul>

        {active ? (
          <FilePreview
            file={active}
            onDelete={(id) => setDeletedIds((prev) => new Set(prev).add(id))}
          />
        ) : null}
      </div>
    </>
  );
}