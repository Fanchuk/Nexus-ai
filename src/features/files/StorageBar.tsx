const segments = [
  { label: "Documents", width: "w-[34%]", gradient: "from-gold to-magenta" },
  { label: "Images", width: "w-[22%]", gradient: "from-magenta to-iris" },
  { label: "Data", width: "w-[11%]", gradient: "from-mint to-acid" },
];

export default function StorageBar() {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-muted">Storage used</p>
        <p className="text-sm">6.7 GB of 10 GB</p>
      </div>

      <div className="flex h-2 overflow-hidden rounded-full bg-raised">
        {segments.map((segment) => (
          <div key={segment.label} className={`${segment.width} bg-gradient-to-r ${segment.gradient}`} />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs text-muted">
            <span className={`size-2.5 rounded-full bg-gradient-to-br ${segment.gradient}`} />
            {segment.label}
          </li>
        ))}
      </ul>
    </section>
  );
}