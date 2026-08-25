"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "@/stores/toast-store";

export default function ClearHistoryButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function clear() {
    setConfirming(false);
    await fetch("/api/history", { method: "DELETE" });
    toast.success("History cleared");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-magenta/40 hover:text-magenta"
      >
        <Trash2 className="size-4" />
        Clear history
      </button>

      {confirming ? (
        <ConfirmModal
          title="Clear history?"
          description="Your prompts will be removed. Cards on the canvas stay."
          confirmLabel="Clear"
          onCancel={() => setConfirming(false)}
          onConfirm={clear}
        />
      ) : null}
    </>
  );
}