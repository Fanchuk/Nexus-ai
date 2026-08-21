import { ImagePlus } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import ImagePreview from "./ImagePreview";
import ImageControls from "./ImageControls";

export default function ImageStudioPanel() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<ImagePlus className="size-5" />}
        title="Image studio"
        gradient="from-magenta to-iris"
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <ImagePreview />
        <ImageControls />
      </div>
    </div>
  );
}