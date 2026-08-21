"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Plus,
  Search,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Bot,
  LayoutTemplate,
  Crown,
} from "lucide-react";

const workspace = [
  { href: "/app/search", label: "Search", icon: Search },
  { href: "/app/chat", label: "Chat", icon: MessageSquare },
  { href: "/app/documents", label: "Documents", icon: FileText },
  { href: "/app/studio", label: "Studio", icon: ImageIcon },
  { href: "/app/agents", label: "Agents", icon: Bot },
  { href: "/app/canvas", label: "Canvas", icon: LayoutTemplate },
];

const library = [
  "EV market leaders 2027",
  "Q3 revenue breakdown",
  "Climate policy summary",
  "React 19 migration notes",
  "Startup pitch outline",
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col rounded-xl bg-[#131316] p-4">
      <Link href="/app/search" className="flex items-center gap-2 px-2">
        <Sparkles className="h-[18px] w-[18px] text-[#3B82F6]" />
        <span className="text-[15px] font-medium text-[#EDEDED]">Nexus</span>
      </Link>

      <button className="mt-4 flex items-center justify-center gap-2 rounded-[10px] bg-[#3B82F6] py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#2f74e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131316]">
        <Plus className="h-4 w-4" />
        New session
      </button>

      <p className="mb-1 mt-6 px-2 text-[11px] font-medium uppercase tracking-wide text-[#6B6B70]">
        Workspace
      </p>
      <nav className="flex flex-col gap-0.5">
        {workspace.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] ${
                active
                  ? "bg-[#1A1A1F] text-[#EDEDED]"
                  : "text-[#A1A1A6] hover:bg-[#1A1A1F] hover:text-[#EDEDED]"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mb-1 mt-6 px-2 text-[11px] font-medium uppercase tracking-wide text-[#6B6B70]">
        Library
      </p>
      <nav className="flex flex-col gap-0.5 overflow-y-auto">
        {library.map((item) => (
          <button
            key={item}
            className="truncate rounded-lg px-3 py-1.5 text-left text-[12px] text-[#A1A1A6] transition-colors hover:bg-[#1A1A1F] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
          >
            {item}
          </button>
        ))}
      </nav>

      <Link
        href="/app/billing"
        className="mt-auto flex items-center gap-2 border-t border-white/[0.08] px-2 pt-4 text-[13px] text-[#A1A1A6] transition-colors hover:text-[#EDEDED]"
      >
        <Crown className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span>Pro · 8.4k</span>
      </Link>
    </aside>
  );
}