import PageHeader from "@/components/ui/PageHeader";
import SettingsNav from "./SettingsNav";
import AccountSection from "./sections/AccountSection";
import AiSection from "./sections/AiSection";
import AppearanceSection from "./sections/AppearanceSection";
import IntegrationsSection from "./sections/IntegrationsSection";
import UsageSection from "./sections/UsageSection";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="Settings" subtitle="Account, models and workspace preferences" />

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <SettingsNav />

        <div className="space-y-6">
          <AccountSection />
          <AiSection />
          <AppearanceSection />
          <IntegrationsSection />
          <UsageSection />
        </div>
      </div>
    </div>
  );
}