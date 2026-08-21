"use client";

import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useUIStore } from "../store/uiStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebar = useUIStore((s) => s.setSidebar);

  return (
    <div className="flex h-screen gap-3 bg-[#0A0A0B] p-3">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <button
        onClick={() => setSidebar(true)}
        className="fixed left-4 top-4 z-30 rounded-lg bg-[#131316] p-2 text-[#A1A1A6] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        onClick={() => setSidebar(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed left-3 top-3 z-50 h-[calc(100vh-24px)] transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
        <Sidebar />
      </div>

      <main className="flex min-w-0 flex-1 flex-col rounded-xl bg-[#131316] p-4">
        {children}
      </main>
    </div>
  );
}