"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CATEGORIES = ["Tools", "Reading", "Design"];

type RefineModalProps = {
  onClose: () => void;
  onApply: (focus: string[]) => void;
};

export default function RefineModal({ onClose, onApply }: RefineModalProps) {
  const [focus, setFocus] = useState<string[]>([]);

  function toggle(category: string) {
    setFocus((prev) =>
      prev.includes(category) 
          ? prev.filter((item) => item !== category) 
          : [...prev, category]
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm animate-rise rounded-2xl border border-line bg-surface p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-medium">Refine criteria</h2>
          <button onClick={onClose} className="text-muted transition-colors hover:text-fg">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-raised/60 px-4 py-3 text-sm transition-colors hover:border-iris/40"
            >
              <input
                type="checkbox"
                checked={focus.includes(category)}
                onChange={() => toggle(category)}
                className="size-4 accent-iris"
              />
              {category}
            </label>
          ))}
        </div>

        <button
          onClick={() => onApply(focus)}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-iris to-magenta py-3 text-sm text-white transition-opacity hover:opacity-90"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}