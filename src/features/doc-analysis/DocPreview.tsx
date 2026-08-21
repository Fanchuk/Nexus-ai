import { ChevronLeft, ChevronRight } from "lucide-react";

const lines = ["w-8/12 h-3", "w-full h-2", "w-full h-2", "w-9/12 h-2", "w-full h-10", "w-full h-2", "w-6/12 h-2"];

export default function DocPreview() {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <div className="aspect-[3/4] space-y-3 overflow-hidden rounded-xl bg-gradient-to-b from-gold/12 to-transparent p-5">
        {lines.map((line, index) => (
          <div key={index} className={`rounded-md bg-gold/60 ${line}`} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted">
        <button className="grid size-8 place-items-center rounded-full transition-colors hover:bg-raised hover:text-fg">
          <ChevronLeft className="size-4" />
        </button>
        <span>page 8 / 24</span>
        <button className="grid size-8 place-items-center rounded-full transition-colors hover:bg-raised hover:text-fg">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}