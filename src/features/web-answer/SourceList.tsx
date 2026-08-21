const sources = [
  { domain: "reuters.com", title: "Specialty coffee market report", color: "from-cobalt to-azure" },
  { domain: "baymard.com", title: "Landing page conversion study", color: "from-mint to-acid" },
  { domain: "sca.coffee", title: "Consumer trends 2026", color: "from-gold to-magenta" },
];

export default function SourceList() {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm text-muted">Sources</h2>
      <ul className="flex gap-3 overflow-x-auto pb-2">
        {sources.map((source) => (
          <li key={source.domain} className="shrink-0">
            <a className="flex w-64 items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors duration-300 hover:border-azure/50">
              <span className={`size-8 shrink-0 rounded-lg bg-gradient-to-br ${source.color}`} />
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