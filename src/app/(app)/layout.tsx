import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-ink">
      <Sidebar />
      <main className="pb-24 md:pb-0 md:pl-16">{children}</main>
      <MobileNav />
    </div>
  );
}