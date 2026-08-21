export function ModelPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-full border px-3 py-1 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] ${
        active
          ? "border-[#3B82F6] bg-[#3B82F6]/[0.12] text-[#EDEDED]"
          : "border-white/[0.08] text-[#A1A1A6] hover:border-white/[0.14] hover:text-[#EDEDED]"
      }`}
    >
      {label}
    </button>
  );
}