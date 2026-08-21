import { CircleCheck, LoaderCircle, Circle } from "lucide-react";

type Status = "done" | "active" | "pending";

export function StepItem({ status, label }: { status: Status; label: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {status === "done" && <CircleCheck className="h-[18px] w-[18px] text-[#22C55E]" />}
      {status === "active" && (
        <LoaderCircle className="h-[18px] w-[18px] animate-spin text-[#A1A1A6]" />
      )}
      {status === "pending" && <Circle className="h-[18px] w-[18px] text-[#6B6B70]" />}
      <span
        className={`text-[15px] ${
          status === "done"
            ? "font-medium text-[#EDEDED]"
            : status === "active"
              ? "text-[#A1A1A6]"
              : "text-[#6B6B70]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}