import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { currentMonth, LIMITS } from "@/lib/usage";
import PageHeader from "@/components/ui/PageHeader";
import SettingsForm from "../components/SettingsForm";
import { IntegrationData, SettingsData, UsageData } from "../types";

export default async function SettingsScreen() {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const [row, usage] = await Promise.all([
    prisma.settings.findUnique({ where: { userId: user.id } }),
    prisma.usage.findUnique({
      where: { userId_month: { userId: user.id, month: currentMonth() } },
    }),
  ]);

  const settings: SettingsData = {
    accent: row?.accent ?? "iris",
    textModel: row?.textModel ?? "balanced",
    answerLang: row?.answerLang ?? "en",
  };

  const metrics: UsageData[] = [
    {
      label: "Text requests",
      value: usage?.textRequests ?? 0,
      limit: LIMITS.textRequests,
      gradient: "from-cobalt to-azure",
    },
    {
      label: "Images",
      value: usage?.images ?? 0,
      limit: LIMITS.images,
      gradient: "from-magenta to-iris",
    },
    {
      label: "Indexed pages",
      value: usage?.indexedPages ?? 0,
      limit: LIMITS.indexedPages,
      gradient: "from-gold to-magenta",
    },
  ];

  const integrations: IntegrationData[] = [
    {
      name: "Web search API",
      connected: Boolean(process.env.SERPER_API_KEY),
      gradient: "from-cobalt to-azure",
    },
    {
      name: "Object storage",
      connected: Boolean(process.env.UPLOADTHING_TOKEN),
      gradient: "from-mint to-acid",
    },
    {
      name: "AI provider",
      connected: Boolean(process.env.GEMINI_API_KEY),
      gradient: "from-magenta to-iris",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="Settings" subtitle="Account, models and workspace preferences" />

      <SettingsForm
        account={{ name: user.name, email: user.email, image: user.image ?? null }}
        settings={settings}
        metrics={metrics}
        integrations={integrations}
      />
    </div>
  );
}