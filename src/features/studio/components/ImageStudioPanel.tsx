"use client";

import { ImagePlus } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import { useImageStudio } from "../hooks/useImageStudio";
import { ImageCard } from "../types";
import ImagePreview from "./ImagePreview";
import ImageControls from "./ImageControls";
import VariationGrid from "./VariationGrid";

type ImageStudioPanelProps = {
  card: ImageCard;
  style: string;
  ratio: string;
};

export default function ImageStudioPanel({ card, style, ratio }: ImageStudioPanelProps) {
  const studio = useImageStudio(card, style, ratio);
  const generating = studio.loading === "generate";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<ImagePlus className="size-5" />}
        title="Image studio"
        gradient="from-magenta to-iris"
        meta={studio.data.urls?.length ? `${studio.data.urls.length} images` : undefined}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <ImagePreview
          url={studio.data.activeUrl}
          generating={generating}
          editing={studio.loading === "edit"}
          onRemoveBackground={studio.removeBackground}
        />

        <section className="space-y-5">
          <ImageControls
            prompt={studio.prompt}
            style={studio.style}
            ratio={studio.ratio}
            count={studio.count}
            generating={generating}
            onPrompt={studio.setPrompt}
            onStyle={studio.setStyle}
            onRatio={studio.setRatio}
            onCount={studio.setCount}
            onGenerate={studio.generate}
          />

          <VariationGrid
            urls={studio.data.urls ?? []}
            activeUrl={studio.data.activeUrl}
            pending={generating ? studio.count : 0}
            onSelect={studio.select}
          />
        </section>
      </div>
    </div>
  );
}