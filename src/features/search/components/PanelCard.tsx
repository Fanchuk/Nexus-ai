import type { LucideIcon } from "lucide-react";

export function PanelCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-3">
      <div className="mb-2.5 flex items-center gap-2 text-[13px] text-[#A1A1A6]">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      {children}
    </div>
  );
}