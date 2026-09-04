"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "@/stores/toast-store";
import { ACCENTS } from "../accents";
import { AccountData, IntegrationData, SettingsData, UsageData } from "../types";
import AccountSection from "./AccountSection";
import SettingsSection, { SettingRow } from "./SettingsSection";

const NAV = [
  { href: "#account", label: "Account" },
  { href: "#ai", label: "AI preferences" },
  { href: "#appearance", label: "Appearance" },
  { href: "#integrations", label: "Integrations" },
  { href: "#usage", label: "Usage" },
];

type SettingsFormProps = {
  account: AccountData;
  settings: SettingsData;
  metrics: UsageData[];
  integrations: IntegrationData[];
};

export default function SettingsForm({
  account,
  settings: initial,
  metrics,
  integrations,
}: SettingsFormProps) {
  const [settings, setSettings] = useState(initial);

  const save = useDebouncedCallback(async (patch: Partial<SettingsData>) => {
    await fetch("/api/settings", {
      method: "PATCH",
      body: JSON.stringify(patch),
    });

    toast.success("Saved");
  }, 500);

  function update(patch: Partial<SettingsData>) {
    setSettings((prev) => ({ ...prev, ...patch }));

    if (patch.accent) {
      const colors = ACCENTS[patch.accent];
      document.documentElement.style.setProperty("--accent-from", colors.from);
      document.documentElement.style.setProperty("--accent-to", colors.to);
    }

    save(patch);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <nav className="lg:sticky lg:top-6 lg:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {NAV.map((item) => (
            <li key={item.href} className="shrink-0 lg:shrink">
              <a
                href={item.href}
                className="block rounded-xl border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:bg-raised hover:text-fg lg:border-transparent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-6">
        <AccountSection account={account} />

        <SettingsSection id="ai" title="AI preferences">
          <SettingRow
            label="Text model"
            hint="Used for search answers and documents"
            control={
              <div className="relative">
                <select
                  value={settings.textModel}
                  onChange={(event) => update({ textModel: event.target.value })}
                  className="w-44 appearance-none rounded-xl border border-line bg-raised px-4 py-2.5 text-sm outline-none transition-colors focus:border-iris/60"
                >
                  <option value="fast">Fast</option>
                  <option value="balanced">Balanced</option>
                  <option value="deep">Deep</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              </div>
            }
          />

          <SettingRow
            label="Answer language"
            control={
              <div className="relative">
                <select
                  value={settings.answerLang}
                  onChange={(event) => update({ answerLang: event.target.value })}
                  className="w-44 appearance-none rounded-xl border border-line bg-raised px-4 py-2.5 text-sm outline-none transition-colors focus:border-iris/60"
                >
                  <option value="en">English</option>
                  <option value="uk">Українська</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              </div>
            }
          />
        </SettingsSection>

        <SettingsSection id="appearance" title="Appearance">
          <div>
            <p className="mb-3 text-sm">Accent gradient</p>
            <div className="flex gap-3">
              {Object.entries(ACCENTS).map(([key, colors]) => (
                <button
                  key={key}
                  onClick={() => update({ accent: key })}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                  }}
                  className={`size-11 rounded-xl transition-transform hover:scale-105 ${
                    settings.accent === key ? "ring-2 ring-fg ring-offset-2 ring-offset-surface" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </SettingsSection>

        <SettingsSection id="integrations" title="Integrations">
          <ul className="space-y-3">
            {integrations.map((item) => (
              <li
                key={item.name}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-raised/60 p-4"
              >
                <span className={`size-10 shrink-0 rounded-xl bg-linear-to-br ${item.gradient}`} />
                <span className="min-w-0 flex-1 text-sm">{item.name}</span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs ${
                    item.connected
                      ? "border-mint/40 bg-mint/10 text-mint"
                      : "border-line text-muted"
                  }`}
                >
                  {item.connected ? "Connected" : "Not connected"}
                </span>
              </li>
            ))}
          </ul>
        </SettingsSection>

        <SettingsSection id="usage" title="Usage">
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-line bg-raised/60 p-4">
                <p className="text-sm text-muted">{metric.label}</p>
                <p className="mt-2 text-2xl font-medium">{metric.value}</p>
                <p className="text-xs text-muted">of {metric.limit}</p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    style={{
                      width: `${Math.min(100, (metric.value / metric.limit) * 100)}%`,
                    }}
                    className={`h-full bg-linear-to-r ${metric.gradient}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}