import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { ACCENTS } from "@/features/settings/accents";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  const settings = user
    ? await prisma.settings.findUnique({ where: { userId: user.id } })
    : null;

  const accent = ACCENTS[settings?.accent ?? "iris"] ?? ACCENTS.iris;

  return (
    <div className="min-h-svh bg-ink">
      <style>{`:root{--accent-from:${accent.from};--accent-to:${accent.to}}`}</style>
      <Sidebar />
      <main className="pb-24 md:pb-0 md:pl-16">{children}</main>
      <MobileNav />
    </div>
  );
}