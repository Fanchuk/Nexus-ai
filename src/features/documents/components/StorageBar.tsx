import { StorageSegment } from "../types";

type StorageBarProps = {
  segments: StorageSegment[];
  usedLabel: string;
};

export default function StorageBar({ segments, usedLabel }: StorageBarProps) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-muted">Storage used</p>
        <p className="text-sm">{usedLabel}</p>
      </div>

      <div className="flex h-2 overflow-hidden rounded-full bg-raised">
        {segments.map((segment) => (
          <div
            key={segment.label}
            style={{ width: `${Math.max(segment.percent, segment.percent > 0 ? 2 : 0)}%` }}
            className={`bg-linear-to-r ${segment.gradient}`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs text-muted">
            <span className={`size-2.5 rounded-full bg-linear-to-br ${segment.gradient}`} />
            {segment.label}
          </li>
        ))}
      </ul>
    </section>
  );
}