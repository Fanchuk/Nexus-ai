import Link from "next/link";
import { AuthField } from "./AuthField";
import { OAuthButtons } from "./OAuthButtons";
import { SubmitLink } from "./SubmitLink";

export function SignInForm() {
  return (
    <div className="space-y-5">
      <OAuthButtons />
      <AuthField label="Email" type="email" placeholder="you@example.com" />
      <AuthField label="Password" type="password" placeholder="••••••••" />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" className="h-4 w-4 accent-[#9747d2]" />
          Remember me
        </label>
        <Link href="#" className="text-sm text-white/60 transition-colors hover:text-white">
          Forgot password?
        </Link>
      </div>

      <SubmitLink>Sign in</SubmitLink>
    </div>
  );
}