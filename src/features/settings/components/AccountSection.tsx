"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { useUploadThing } from "@/lib/uploadthing-client";
import { toast } from "@/stores/toast-store";
import { AccountData } from "../types";
import SettingsSection, { SettingRow } from "./SettingsSection";
import PasswordModal from "./PasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountSection({ account }: { account: AccountData }) {
  const router = useRouter();
  const [name, setName] = useState(account.name);
  const [password, setPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { startUpload, isUploading } = useUploadThing("avatar", {
    onClientUploadComplete: () => {
      toast.success("Photo updated");
      router.refresh();
    },
    onUploadError: () => toast.error("Upload failed"),
  });

  async function saveName() {
    if (!name.trim() || name.trim() === account.name) return;

    await fetch("/api/account", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });

    toast.success("Saved");
    router.refresh();
  }

  return (
    <SettingsSection id="account" title="Account">
      <div className="flex items-center gap-4">
        <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-accent p-px">
          {account.image ? (
            <Image
              src={account.image}
              alt={account.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <span className="grid size-full place-items-center rounded-full bg-surface text-sm">
              {account.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </span>

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm transition-colors hover:bg-raised">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) startUpload([file]);
            }}
          />
          {isUploading ? <Spinner size={16} /> : null}
          Change photo
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={saveName}
            className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors focus:border-iris/60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input
            value={account.email}
            disabled
            className="w-full rounded-xl border border-line bg-raised/50 px-4 py-3 text-sm text-muted outline-none"
          />
        </label>
      </div>

      <SettingRow
        label="Password"
        hint="Only for accounts created with email"
        control={
          <button
            onClick={() => setPassword(true)}
            className="rounded-xl border border-line px-4 py-2.5 text-sm transition-colors hover:bg-raised"
          >
            Update
          </button>
        }
      />

      <SettingRow
        label="Delete account"
        hint="This removes all canvases and files"
        control={
          <button
            onClick={() => setDeleting(true)}
            className="rounded-xl border border-magenta/40 px-4 py-2.5 text-sm text-magenta transition-colors hover:bg-magenta/10"
          >
            Delete
          </button>
        }
      />

      {password ? <PasswordModal onClose={() => setPassword(false)} /> : null}

      {deleting ? (
        <DeleteAccountModal email={account.email} onClose={() => setDeleting(false)} />
      ) : null}
    </SettingsSection>
  );
}