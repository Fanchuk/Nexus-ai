"use client";

import type { LucideIcon } from "lucide-react";
import { PanelRight } from "lucide-react";
import { useUIStore } from "../store/uiStore";

export function ModeHeader({
  icon: Icon,
  title,
  showPanelToggle,
  children,
}: {
  icon: LucideIcon;
  title: string;
  showPanelToggle?: boolean;
  children?: React.ReactNode;
}) {
  const toggle = useUIStore((s) => s.toggleRightPanel);

  return (
    <div className="flex items-center justify-between px-1 py-1">
      <div className="flex items-center gap-2 text-[#3B82F6]">
        <Icon className="h-[18px] w-[18px]" />
        <span className="text-[15px] font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {showPanelToggle && (
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#A1A1A6] transition-colors hover:border-white/[0.14] hover:bg-[#1A1A1F] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
          >
            <PanelRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}