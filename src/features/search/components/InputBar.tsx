import { Paperclip, Mic, ArrowUp } from "lucide-react";

export function InputBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-white/[0.08] bg-[#131316] px-4 py-2.5 transition-colors focus-within:border-white/[0.14]">
      <button className="text-[#6B6B70] transition-colors hover:text-[#A1A1A6] focus:outline-none">
        <Paperclip className="h-5 w-5" />
      </button>
      <input
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[15px] text-[#EDEDED] placeholder:text-[#6B6B70] focus:outline-none"
      />
      <button className="text-[#6B6B70] transition-colors hover:text-[#A1A1A6] focus:outline-none">
        <Mic className="h-5 w-5" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]">
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}