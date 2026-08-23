"use client";

import Image from "next/image";

type VariationGridProps = {
  urls: string[];
  activeUrl?: string;
  pending: number;
  onSelect: (url: string) => void;
};

export default function VariationGrid({
  urls,
  activeUrl,
  pending,
  onSelect,
}: VariationGridProps) {
  if (pending > 0) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: pending }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-shimmer rounded-xl bg-[linear-gradient(90deg,#26262c_25%,#35353f_50%,#26262c_75%)] bg-[length:200%_100%]"
          />
        ))}
      </div>
    );
  }

  if (!urls.length) return null;

  return (
    <div className="grid grid-cols-4 gap-3">
      {urls.map((url) => (
        <button
          key={url}
          onClick={() => onSelect(url)}
          className={`relative aspect-square overflow-hidden rounded-xl border transition-transform hover:scale-105 ${
            url === activeUrl ? "border-magenta" : "border-line"
          }`}
        >
          <Image src={url} alt="Variation" fill className="object-cover" sizes="120px" />
        </button>
      ))}
    </div>
  );
}