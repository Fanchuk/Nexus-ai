import SettingsSection from "../SettingsSection";

const metrics = [
  { label: "Text requests", value: "1 240", limit: "of 5 000", width: "w-[25%]", gradient: "from-cobalt to-azure" },
  { label: "Images", value: "86", limit: "of 300", width: "w-[29%]", gradient: "from-magenta to-iris" },
  { label: "Indexed pages", value: "512", limit: "of 2 000", width: "w-[26%]", gradient: "from-gold to-magenta" },
];

export default function UsageSection() {
  return (
    <SettingsSection id="usage" title="Usage">
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-line bg-raised/60 p-4">
            <p className="text-sm text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-medium">{metric.value}</p>
            <p className="text-xs text-muted">{metric.limit}</p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
              <div className={`h-full bg-gradient-to-r ${metric.width} ${metric.gradient}`} />
            </div>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}