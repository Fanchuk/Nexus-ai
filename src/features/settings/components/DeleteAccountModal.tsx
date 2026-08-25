"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { apiError } from "@/lib/api";
import { toast } from "@/stores/toast-store";
import Spinner from "@/components/ui/Spinner";

type DeleteAccountModalProps = {
  email: string;
  onClose: () => void;
};

export default function DeleteAccountModal({ email, onClose }: DeleteAccountModalProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/account", {
      method: "DELETE",
      body: JSON.stringify({ email: value }),
    });

    if (!res.ok) {
      setLoading(false);
      return toast.error(await apiError(res));
    }

    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm animate-rise rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-base font-medium">Delete account</h2>
        <p className="mt-2 text-sm text-muted">
          Every canvas, card and file will be removed. Type{" "}
          <span className="text-fg">{email}</span> to confirm.
        </p>

        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={email}
          className="mt-4 w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors focus:border-magenta/60 placeholder:text-muted"
        />

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-line py-2.5 text-sm transition-colors hover:bg-raised"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading || value !== email}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-magenta/40 py-2.5 text-sm text-magenta transition-colors hover:bg-magenta/10 disabled:opacity-40"
          >
            {loading ? <Spinner size={16} /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}