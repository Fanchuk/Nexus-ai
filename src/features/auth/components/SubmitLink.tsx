import Link from "next/link";

export function SubmitLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/app/chat"
      className="block rounded-xl bg-linear-to-r from-[#2a35d6] via-[#6b4ee0] to-[#9747d2] py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_-12px_#9747d2]"
    >
      {children}
    </Link>
  );
}