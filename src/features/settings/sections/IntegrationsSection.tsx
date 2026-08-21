import SettingsSection from "../SettingsSection";

const integrations = [
  { name: "Web search API", status: "Connected", gradient: "from-cobalt to-azure" },
  { name: "Object storage", status: "Connected", gradient: "from-mint to-acid" },
  { name: "Image provider", status: "Not connected", gradient: "from-magenta to-iris" },
];

export default function IntegrationsSection() {
  return (
    <SettingsSection id="integrations" title="Integrations">
      <ul className="space-y-3">
        {integrations.map((integration) => (
          <li
            key={integration.name}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-raised/60 p-4"
          >
            <span className={`size-10 shrink-0 rounded-xl bg-gradient-to-br ${integration.gradient}`} />
            <span className="min-w-0 flex-1 text-sm">{integration.name}</span>
            <span
              className={`rounded-full border px-2.5 py-1 text-xs ${
                integration.status === "Connected"
                  ? "border-mint/40 bg-mint/10 text-mint"
                  : "border-line text-muted"
              }`}
            >
              {integration.status}
            </span>
            <button className="rounded-xl border border-line px-4 py-2 text-sm transition-colors duration-300 hover:bg-surface">
              Manage
            </button>
          </li>
        ))}
      </ul>
    </SettingsSection>
  );
}