const gradients = [
  "from-cobalt to-azure",
  "from-mint to-acid",
  "from-gold to-magenta",
  "from-magenta to-iris",
  "from-iris to-cobalt",
];

type SourceListProps = {
  sources: { title: string; link: string; domain: string }[];
};

export default function SourceList({ sources }: SourceListProps) {
  if (!sources.length) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm text-muted">Sources</h2>
      <ul className="flex gap-3 overflow-x-auto pb-2">
        {sources.map((source, index) => (
          <li key={source.link} className="shrink-0">
            <a
              href={source.link}
              target="_blank"
              rel="noreferrer"
              className="flex w-64 items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors duration-300 hover:border-azure/50"
            >
              <span
                className={`size-8 shrink-0 rounded-lg bg-linear-to-br ${gradients[index % gradients.length]}`}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm">{source.title}</span>
                <span className="block truncate text-xs text-muted">{source.domain}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}