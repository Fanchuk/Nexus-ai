type SettingRowProps = {
  label: string;
  hint?: string;
  control: React.ReactNode;
};

export default function SettingRow({ label, hint, control }: SettingRowProps) {
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