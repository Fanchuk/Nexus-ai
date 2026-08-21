"use client";

import { X } from "lucide-react";
import { useUIStore } from "../store/uiStore";

export function RightPanel({ children }: { children: React.ReactNode }) {
  const open = useUIStore((s) => s.rightPanelOpen);
  const setOpen = useUIStore((s) => s.setRightPanel);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[340px] max-w-[90vw] flex-col gap-4 overflow-y-auto bg-[#131316] p-4 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-[#EDEDED]">Context</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-[#A1A1A6] transition-colors hover:bg-[#1A1A1F] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}