"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { GradientButton } from "./GradientButton";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07060c]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#9747d2]" />
          <span className="text-lg font-semibold tracking-tight text-white">Nexus</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#2a35d6] to-[#9747d2] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/sign-in" className="text-sm text-white/70 transition-colors hover:text-white">
            Sign in
          </Link>
          <GradientButton href="/sign-up">Get started</GradientButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-6 py-4 md:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/sign-in"
              className="flex-1 rounded-full border border-white/15 py-2.5 text-center text-sm text-white/80"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="flex-1 rounded-full bg-gradient-to-r from-[#2a35d6] to-[#9747d2] py-2.5 text-center text-sm text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}