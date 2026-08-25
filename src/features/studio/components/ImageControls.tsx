"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { RATIOS, STYLES } from "../constants";

type ImageControlsProps = {
  prompt: string;
  style: string;
  ratio: string;
  count: number;
  generating: boolean;
  onPrompt: (value: string) => void;
  onStyle: (value: string) => void;
  onRatio: (value: string) => void;
  onCount: (value: number) => void;
  onGenerate: () => void;
};

export default function ImageControls({
  prompt,
  style,
  ratio,
  count,
  generating,
  onPrompt,
  onStyle,
  onRatio,
  onCount,
  onGenerate,
}: ImageControlsProps) {
  const fields = [
    { label: "Style", value: style, options: STYLES, onChange: onStyle },
    { label: "Ratio", value: ratio, options: RATIOS, onChange: onRatio },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm text-muted">Prompt</label>
        <textarea
          rows={4}
          value={prompt}
          onChange={(event) => onPrompt(event.target.value)}
          placeholder="Foggy mountain range at dawn, muted tones, cinematic"
          className="w-full resize-none rounded-xl border border-line bg-surface p-4 text-sm leading-6 outline-none transition-colors focus:border-magenta/60 placeholder:text-muted"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="mb-2 block text-sm text-muted">{field.label}</label>
            <div className="relative">
              <select
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-magenta/60"
              >
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
          <span>{count}</span>
        </div>
        <input
          type="range"
          min={1}
          max={2}
          value={count}
          onChange={(event) => onCount(Number(event.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={generating || !prompt.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-iris to-magenta px-5 py-3 text-sm text-white transition-all hover:shadow-[0_0_28px_-6px_#ff2c9a] disabled:opacity-50"
      >
        {generating ? <Spinner size={16} /> : <Sparkles className="size-4" />}
        Generate
      </button>
    </div>
  );
}