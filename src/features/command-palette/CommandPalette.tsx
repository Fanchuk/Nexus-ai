"use client";

import { useEffect } from "react";
import { BarChart3, FileText, Globe, ImagePlus, Paperclip, Sparkles } from "lucide-react";
import ModeItem from "./ModeItem";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 sm:pt-32">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl animate-rise rounded-2xl bg-gradient-to-br from-iris to-magenta p-px shadow-[0_0_60px_-20px_#9747d2]">
        <div className="rounded-[15px] bg-surface">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Sparkles className="size-5 shrink-0 text-azure" />
            <input
              autoFocus
              defaultValue="Design a landing page for a coffee brand"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted"
              placeholder="Ask anything…"
            />
            <kbd className="hidden rounded-md border border-line px-2 py-1 text-xs text-muted sm:block">
              enter
            </kbd>
          </div>

          <div className="p-2">
            <p className="px-3 py-2 text-xs text-muted">Choose a mode</p>

            <ModeItem
              active
              icon={<Globe className="size-5" />}
              gradient="from-cobalt to-azure"
              title="Search the web"
              description="Live answer with cited sources"
            />
            <ModeItem
              icon={<BarChart3 className="size-5" />}
              gradient="from-mint to-acid"
              title="Generate a chart"
              description="Turn data or a prompt into a visual"
            />
            <ModeItem
              icon={<ImagePlus className="size-5" />}
              gradient="from-magenta to-iris"
              title="Create an image"
              description="Text to image, edit, remove background"
            />
            <ModeItem
              icon={<FileText className="size-5" />}
              gradient="from-gold to-magenta"
              title="Analyze a document"
              description="Upload a PDF, image or file to ask about"
            />
          </div>

          <div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-muted">
            <span className="flex items-center gap-4">
              <span>↕ navigate</span>
              <span className="flex items-center gap-1">
                <Paperclip className="size-3" /> attach
              </span>
            </span>
            <span>⌘ for shortcuts</span>
          </div>
        </div>
      </div>
    </div>
  );
}