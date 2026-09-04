"use client";

import Image from "next/image";
import { Mountain, Scissors } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

type ImagePreviewProps = {
  url?: string;
  generating: boolean;
  editing: boolean;
  onRemoveBackground: () => void;
};

export default function ImagePreview({
  url,
  generating,
  editing,
  onRemoveBackground,
}: ImagePreviewProps) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-linear-to-br from-magenta/25 via-iris/15 to-cobalt/25">
        {url ? (
          <Image src={url} alt="Generated image" fill className="object-cover" sizes="640px" />
        ) : (
          <Mountain className="size-16 animate-float text-magenta/70" />
        )}

        {generating || editing ? (
          <div className="absolute inset-0 grid place-items-center bg-ink/70 backdrop-blur-sm">
            <Spinner size={32} className="text-magenta" />
          </div>
        ) : null}
      </div>

      <button
        onClick={onRemoveBackground}
        disabled={!url || editing || generating}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line px-2 py-3 text-sm transition-colors hover:border-magenta/50 hover:bg-raised disabled:opacity-50"
      >
        {editing ? (
          <Spinner size={16} className="text-magenta" />
        ) : (
          <Scissors className="size-4 text-magenta" />
        )}
        Remove background
      </button>
    </section>
  );
}