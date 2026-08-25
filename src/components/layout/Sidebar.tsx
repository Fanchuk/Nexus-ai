"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Files, Frame, Library, Settings } from "lucide-react";

const links = [
  { href: "/app/canvas", label: "Canvas", icon: Frame },
  { href: "/app/library", label: "Library", icon: Library },
  { href: "/app/files", label: "Files", icon: Files },
  { href: "/app/history", label: "History", icon: Clock },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="group fixed left-0 top-0 z-40 hidden h-svh w-16 flex-col justify-between overflow-hidden border-r border-line bg-surface/70 backdrop-blur-xl transition-[width] duration-300 ease-out hover:w-60 md:flex">
      <div>
        <Link href="/app/canvas" className="flex h-16 items-center gap-3 px-4">
          <span className="size-8 shrink-0 rounded-lg bg-accent" />
          <span className="whitespace-nowrap text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Nexus
          </span>
        </Link>

        <nav className="mt-2 flex flex-col gap-1 px-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
                  active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg"
                }`}
              >
                {active ? (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
                ) : null}
                <Icon className="size-5 shrink-0" />
                <span className="whitespace-nowrap text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-2">
        <button className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-raised">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent p-px">
            <span className="grid size-full place-items-center rounded-full bg-surface text-xs">NA</span>
          </span>
          <span className="whitespace-nowrap text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="block text-sm">Назар</span>
            <span className="block text-xs text-muted">Pro plan</span>
          </span>
        </button>
      </div>
    </aside>
  );
}