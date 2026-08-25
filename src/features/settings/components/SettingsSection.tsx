type SettingsSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export default function SettingsSection({ id, title, children }: SettingsSectionProps) {
  return (
    <section id={id} className="scroll-mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="mb-5 text-base font-medium">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type SettingRowProps = {
  label: string;
  hint?: string;
  control: React.ReactNode;
};

export function SettingRow({ label, hint, control }: SettingRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm">{label}</p>
        {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}