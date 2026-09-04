"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useCanvasActions } from "../hooks/useCanvasActions";
import { CARD_CONFIG, PALETTE_MODES } from "../config";
import { CardType } from "../types";

type CommandPaletteProps = {
  defaultMode: CardType;
  onClose: () => void;
};

export default function CommandPalette({ defaultMode, onClose }: CommandPaletteProps) {
  const { submitPrompt } = useCanvasActions();
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<CardType>(defaultMode);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function submit(selected: CardType) {
    if (!value.trim()) return;
    submitPrompt(selected, value.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 sm:pt-32">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl animate-rise rounded-2xl bg-linear-to-br from-iris to-magenta p-px">
        <div className="rounded-[15px] bg-surface">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Sparkles className="size-5 shrink-0 text-azure" />
            <input
              autoFocus
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && submit(mode)}
              placeholder="Ask anything…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted"
            />
            <kbd className="hidden rounded-md border border-line px-2 py-1 text-xs text-muted sm:block">
              enter
            </kbd>
          </div>

          <div className="p-2">
            <p className="px-3 py-2 text-xs text-muted">Choose a mode</p>

            {PALETTE_MODES.map((item) => {
              const config = CARD_CONFIG[item];
              const Icon = config.icon;

              return (
                <button
                  key={item}
                  onMouseEnter={() => setMode(item)}
                  onClick={() => submit(item)}
                  className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors ${
                    mode === item ? "bg-raised" : "hover:bg-raised/70"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br ${config.gradient} text-white`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{config.label}</span>
                    <span className="block truncate text-xs text-muted">{config.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}