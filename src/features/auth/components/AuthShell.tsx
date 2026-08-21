import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthAside } from "./AuthAside";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#9747d2]" />
          <span className="text-lg font-semibold text-white">Nexus</span>
        </Link>

        <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm sm:p-8">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-white/60">{subtitle}</p>

          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-white/55">{footer}</p>
      </div>

      <AuthAside />
    </div>
  );
}