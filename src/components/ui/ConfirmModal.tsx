"use client";

type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  title,
  description,
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative w-full max-w-sm animate-rise rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-base font-medium">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-line py-2.5 text-sm transition-colors hover:bg-raised"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl border border-magenta/40 py-2.5 text-sm text-magenta transition-colors hover:bg-magenta/10"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}