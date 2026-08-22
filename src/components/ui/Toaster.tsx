"use client";

import { createPortal } from "react-dom";
import { X, CheckCircle, XCircle, Info } from "lucide-react";
import { useToastStore } from "@/stores/toast-store";
import { useState, useEffect } from "react";

const icons = {
  success: <CheckCircle className="size-4 shrink-0 text-mint" />,
  error: <XCircle className="size-4 shrink-0 text-magenta" />,
  info: <Info className="size-4 shrink-0 text-azure" />,
};

const borders = {
  success: "border-mint/30",
  error: "border-magenta/30",
  info: "border-azure/30",
};

export default function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const remove = useToastStore((state) => state.remove);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex animate-rise items-center gap-3 rounded-xl border bg-surface px-4 py-3 shadow-lg ${borders[toast.type]}`}
        >
          {icons[toast.type]}
          <span className="text-sm">{toast.message}</span>
          <button
            onClick={() => remove(toast.id)}
            className="ml-2 text-muted transition-colors hover:text-fg"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}