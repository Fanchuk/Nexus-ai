import { ChevronDown, Sparkles } from "lucide-react";
import AccentButton from "@/components/ui/AccentButton";

const variations = ["from-magenta/30 to-iris/30", "from-cobalt/30 to-azure/30", "from-gold/30 to-magenta/30", "from-mint/30 to-acid/30"];

export default function ImageControls() {
  return (
    <section className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-muted">Prompt</label>
        <textarea
          rows={4}
          defaultValue="Foggy mountain range at dawn, muted tones, cinematic"
          className="w-full resize-none rounded-xl border border-line bg-surface p-4 text-sm leading-6 outline-none transition-colors duration-300 focus:border-magenta/60"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Style", options: ["Cinematic", "Photo", "Illustration"] },
          { label: "Ratio", options: ["4:3", "1:1", "16:9"] },
        ].map((field) => (
          <div key={field.label}>
            <label className="mb-2 block text-sm text-muted">{field.label}</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-magenta/60">
                {field.options.map((option) => (
                  <option key={option} className="bg-surface">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">Variations</span>
          <span>4</span>
        </div>
        <input type="range" min={1} max={8} defaultValue={4} className="w-full" />
      </div>

      <AccentButton className="w-full">
        <Sparkles className="size-4" />
        Generate
      </AccentButton>

      <div className="grid grid-cols-4 gap-3">
        {variations.map((gradient) => (
          <button
            key={gradient}
            className={`aspect-square rounded-xl border border-line bg-gradient-to-br transition-transform duration-300 hover:scale-105 ${gradient}`}
          />
        ))}
      </div>
    </section>
  );
}