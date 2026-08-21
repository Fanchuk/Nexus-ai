"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Files, Frame, Library, Settings } from "lucide-react";

const links = [
  { href: "/canvas", label: "Canvas", icon: Frame },
  { href: "/library", label: "Library", icon: Library },
  { href: "/files", label: "Files", icon: Files },
  { href: "/history", label: "History", icon: Clock },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/85 backdrop-blur-xl md:hidden">
      <ul className="flex items-stretch">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                className={`flex flex-col items-center gap-1 py-3 text-[11px] transition-colors ${
                  active ? "text-fg" : "text-muted"
                }`}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {active ? (
                    <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-iris to-magenta" />
                  ) : null}
                </span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}