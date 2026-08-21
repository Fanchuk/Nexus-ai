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