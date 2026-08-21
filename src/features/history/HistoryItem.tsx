import Link from "next/link";

type HistoryItemProps = {
  time: string;
  type: string;
  prompt: string;
  gradient: string;
};

export default function HistoryItem({ time, type, prompt, gradient }: HistoryItemProps) {
  return (
    <li className="relative">
      <span className={`absolute -left-[31px] top-6 size-2.5 rounded-full bg-gradient-to-br ${gradient}`} />

      <Link
        href="/canvas"
        className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/40"
      >
        <span className={`size-11 shrink-0 rounded-xl bg-gradient-to-br ${gradient} opacity-80`} />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm">{prompt}</span>
          <span className="block text-xs text-muted">
            {time} · {type}
          </span>
        </span>
      </Link>
    </li>
  );
}