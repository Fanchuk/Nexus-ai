import Link from "next/link";

const tabs = [
  { href: "#account", label: "Account" },
  { href: "#ai", label: "AI preferences" },
  { href: "#appearance", label: "Appearance" },
  { href: "#integrations", label: "Integrations" },
  { href: "#usage", label: "Usage" },
];

export default function SettingsNav() {
  return (
    <nav className="lg:sticky lg:top-6 lg:self-start">
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {tabs.map((tab, index) => (
          <li key={tab.href} className="shrink-0 lg:shrink">
            <Link
              href={tab.href}
              className={`block rounded-xl px-4 py-2.5 text-sm transition-colors duration-300 ${
                index === 0
                  ? "border border-iris/40 bg-iris/15 text-iris"
                  : "border border-line text-muted hover:bg-raised hover:text-fg lg:border-transparent"
              }`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}