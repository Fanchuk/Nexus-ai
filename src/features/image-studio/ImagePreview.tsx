import { Eraser, Maximize2, Mountain, Scissors } from "lucide-react";

const tools = [
  { label: "Inpaint", icon: Eraser },
  { label: "Remove bg", icon: Scissors },
  { label: "Upscale", icon: Maximize2 },
];

export default function ImagePreview() {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-magenta/25 via-iris/15 to-cobalt/25">
        <Mountain className="size-16 text-magenta/70 animate-float" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <button
              key={tool.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-line px-2 py-3 text-sm transition-colors duration-300 hover:border-magenta/50 hover:bg-raised"
            >
              <Icon className="size-4 shrink-0 text-magenta" />
              <span className="truncate">{tool.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}