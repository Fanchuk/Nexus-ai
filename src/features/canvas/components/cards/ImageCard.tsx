import { ImageIcon } from "lucide-react";
import GradientCard from "@/components/ui/GradientCard";

export default function ImageCard() {
  return (
    <GradientCard
      gradient="from-magenta to-iris"
      className="group transition-shadow duration-300 hover:shadow-[0_0_34px_-10px_#ff2c9a]"
      innerClassName="p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 rounded-full bg-gradient-to-br from-magenta to-iris" />
        <h3 className="text-sm">AI image</h3>
      </div>

      <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-magenta/25 via-iris/20 to-cobalt/25">
        <ImageIcon className="size-10 text-magenta/70 transition-transform duration-500 group-hover:scale-110" />
      </div>
    </GradientCard>
  );
}