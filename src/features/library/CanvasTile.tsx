import Link from "next/link";

type CanvasTileProps = {
  name: string;
  date: string;
  blocks: number;
  gradient: string;
};

export default function CanvasTile({ name, date, blocks, gradient }: CanvasTileProps) {
  return (
    <li>
      <Link
        href="/canvas"
        className="block overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-[0_0_34px_-16px_#9747d2]"
      >
        <div className="canvas-grid relative h-36 bg-ink">
          <span className={`absolute left-5 top-5 h-8 w-20 rounded-lg bg-gradient-to-br ${gradient} opacity-80`} />
          <span className="absolute left-32 top-9 h-10 w-16 rounded-lg bg-gradient-to-br from-cobalt to-azure opacity-60" />
          <span className="absolute left-10 top-20 h-9 w-24 rounded-lg bg-gradient-to-br from-mint to-acid opacity-50" />
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <span className="min-w-0">
            <span className="block truncate text-sm">{name}</span>
            <span className="block text-xs text-muted">{date}</span>
          </span>
          <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
            {blocks} blocks
          </span>
        </div>
      </Link>
    </li>
  );
}