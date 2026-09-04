"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type DocPreviewProps = {
  pages: string[];
  page: number;
  onPage: (page: number) => void;
};

export default function DocPreview({ pages, page, onPage }: DocPreviewProps) {
  const total = pages.length;

  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <div className="aspect-[3/4] overflow-y-auto rounded-xl bg-linear-to-b from-gold/12 to-transparent p-5">
        <p className="whitespace-pre-wrap text-sm leading-6 text-fg/80">
          {pages[page - 1] || "This page has no text."}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          className="grid size-8 place-items-center rounded-full transition-colors hover:bg-raised hover:text-fg"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span>
          page {page} / {total}
        </span>
        <button
          onClick={() => onPage(Math.min(total, page + 1))}
          className="grid size-8 place-items-center rounded-full transition-colors hover:bg-raised hover:text-fg"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}