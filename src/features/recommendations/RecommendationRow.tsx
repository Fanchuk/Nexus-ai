type RecommendationRowProps = {
  title: string;
  description: string;
  gradient: string;
};

export default function RecommendationRow({ title, description, gradient }: RecommendationRowProps) {
  return (
    <li className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:border-iris/50 hover:shadow-[0_0_30px_-14px_#9747d2]">
      <span className={`size-11 shrink-0 rounded-xl bg-linear-to-br ${gradient}`} />

      <span className="min-w-0 flex-1">
        <span className="block text-sm">{title}</span>
        <span className="mt-1 block text-sm text-muted">{description}</span>
      </span>

      <button className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs text-muted opacity-0 transition-all duration-300 hover:text-fg group-hover:opacity-100 focus-visible:opacity-100">
        why?
      </button>
    </li>
  );
}