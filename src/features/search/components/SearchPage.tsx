"use client";

import { Search, ListTree, Globe, FileText, Lightbulb, Download, BookMarked } from "lucide-react";
import { ModeHeader } from "./ModeHeader";
import { ModelPill } from "./ModelPill";
import { MessageBubble } from "./MessageBubble";
import { StepItem } from "./StepItem";
import { InputBar } from "./InputBar";
import { RightPanel } from "./RightPanel";
import { PanelCard } from "./PanelCard";

export function SearchPage() {
  return (
    <>
      <ModeHeader icon={Search} title="Deep research · multi-step" showPanelToggle>
        <ModelPill label="GPT-4o" active />
      </ModeHeader>

      <div className="mt-4 flex flex-1 flex-col gap-4 overflow-y-auto">
        <MessageBubble role="user">
          Compare EV market leaders and forecast 2027
        </MessageBubble>

        <div className="rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-4">
          <div className="mb-2 flex items-center gap-2 text-[13px] text-[#A1A1A6]">
            <ListTree className="h-4 w-4" />
            Research plan · agent
          </div>
          <StepItem status="done" label="Gathered sales data from 6 sources" />
          <StepItem status="active" label="Building forecast model…" />
          <StepItem status="pending" label="Formatting output" />
        </div>
      </div>

      <div className="pt-4">
        <InputBar placeholder="Ask, research, or generate…" />
      </div>

      <RightPanel>
        <PanelCard title="Sources · 6" icon={BookMarked}>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#131316] px-2.5 py-1.5 text-left text-[13px] text-[#EDEDED] transition-colors hover:bg-[#1A1A1F]">
              <Globe className="h-3.5 w-3.5 text-[#60A5FA]" />
              bloomberg.com
            </button>
            <button className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#131316] px-2.5 py-1.5 text-left text-[13px] text-[#EDEDED] transition-colors hover:bg-[#1A1A1F]">
              <FileText className="h-3.5 w-3.5 text-[#60A5FA]" />
              report_2026.pdf
            </button>
          </div>
        </PanelCard>

        <PanelCard title="Follow-ups" icon={Lightbulb}>
          <div className="flex flex-col gap-2">
            <button className="text-left text-[13px] text-[#60A5FA] transition-colors hover:text-[#3B82F6]">
              → Which region grows fastest?
            </button>
            <button className="text-left text-[13px] text-[#60A5FA] transition-colors hover:text-[#3B82F6]">
              → Export as slide deck
            </button>
          </div>
        </PanelCard>

        <PanelCard title="Export" icon={Download}>
          <div className="flex gap-2">
            <button className="rounded-md border border-white/[0.08] bg-[#131316] px-3 py-1.5 text-[13px] text-[#EDEDED] transition-colors hover:bg-[#1A1A1F]">
              PDF
            </button>
            <button className="rounded-md border border-white/[0.08] bg-[#131316] px-3 py-1.5 text-[13px] text-[#EDEDED] transition-colors hover:bg-[#1A1A1F]">
              Slides
            </button>
          </div>
        </PanelCard>
      </RightPanel>
    </>
  );
}