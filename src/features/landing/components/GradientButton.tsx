import Link from "next/link";
import type { ReactNode } from "react";

export function GradientButton({
  children,
  href = "#",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9747d2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07060c]";

  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`${base} border border-white/15 bg-white/[0.04] text-white/90 hover:border-white/35 hover:bg-white/[0.09]`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} bg-linear-to-r from-[#2a35d6] via-[#6b4ee0] to-[#9747d2] text-white shadow-[0_8px_30px_-10px_#9747d2] hover:shadow-[0_10px_40px_-8px_#2a35d6]`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-y-0 left-0 w-1/3 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:animate-[mk-sheen_0.9s_ease-out] group-hover:opacity-100" />
    </Link>
  );
}