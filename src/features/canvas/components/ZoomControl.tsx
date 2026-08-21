import { Maximize, Minus, Plus } from "lucide-react";

export default function ZoomControl() {
  return (
    <div className="fixed bottom-6 right-6 z-30 hidden items-center gap-1 rounded-full border border-line bg-surface/85 p-1.5 backdrop-blur-xl lg:flex">
      <button className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg">
        <Minus className="size-4" />
      </button>
      <span className="min-w-14 text-center text-sm">100%</span>
      <button className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg">
        <Plus className="size-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-line" />
      <button className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg">
        <Maximize className="size-4" />
      </button>
    </div>
  );
}