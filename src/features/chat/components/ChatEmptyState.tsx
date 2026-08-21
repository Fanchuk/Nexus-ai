"use client";

import { Sparkles } from "lucide-react";

const prompts = [
  "Summarize this article in 5 bullet points",
  "Write a SQL query to find top customers",
  "Draft a polite follow-up email",
  "Explain closures with a simple example",
];

export function ChatEmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B82F6]/[0.12]">
          <Sparkles className="h-7 w-7 text-[#3B82F6]" />
        </div>
        <h2 className="text-[20px] font-medium text-[#EDEDED]">
          How can I help you today?
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map((p) => (
          <button
            key={p}
            className="rounded-xl border border-white/[0.08] bg-[#0A0A0B] p-4 text-left text-[14px] text-[#A1A1A6] transition-colors hover:border-white/[0.14] hover:bg-[#1A1A1F] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}