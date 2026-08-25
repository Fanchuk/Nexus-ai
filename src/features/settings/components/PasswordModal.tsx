"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/stores/toast-store";
import Spinner from "@/components/ui/Spinner";

export default function PasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { label: "Current password", value: current, set: setCurrent },
    { label: "New password", value: next, set: setNext },
  ];

  async function submit() {
    if (next.length < 8) return toast.error("New password is too short");

    setLoading(true);

    const { error } = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
    });

    setLoading(false);

    if (error) return toast.error(error.message ?? "Could not update the password");

    toast.success("Password updated");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm animate-rise rounded-2xl border border-line bg-surface p-5">
        <h2 className="mb-5 text-base font-medium">Update password</h2>

        <div className="space-y-3">
          {fields.map((field) => (
            <label key={field.label} className="block">
              <span className="mb-2 block text-sm text-muted">{field.label}</span>
              <input
                type="password"
                value={field.value}
                onChange={(event) => field.set(event.target.value)}
                className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors focus:border-iris/60"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-line py-2.5 text-sm transition-colors hover:bg-raised"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Spinner size={16} /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}