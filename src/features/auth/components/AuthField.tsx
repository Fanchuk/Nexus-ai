"use client";

import { forwardRef, InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, ...props }, ref) => (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      <input
        ref={ref}
        {...props}
        className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors focus:border-iris/60"
      />
      {error ? <span className="mt-1 block text-xs text-magenta">{error}</span> : null}
    </label>
  )
);

AuthField.displayName = "AuthField";
export default AuthField;