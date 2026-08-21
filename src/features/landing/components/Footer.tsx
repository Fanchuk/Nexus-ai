import Link from "next/link";
import { Sparkles } from "lucide-react";
import { footerLinks } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-5">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#9747d2]" />
            <span className="text-lg font-semibold text-white">Nexus</span>
          </Link>
          <p className="mt-3 text-sm text-white/55">Your AI research workspace.</p>
        </div>

        {Object.entries(footerLinks).map(([group, items]) => (
          <div key={group}>
            <h3 className="text-sm font-medium text-white">{group}</h3>
            <ul className="mt-4 space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/55 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6">
        <p className="text-sm text-white/45">© 2026 Nexus AI — All rights reserved.</p>
      </div>
    </footer>
  );
}