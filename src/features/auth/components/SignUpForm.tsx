import { AuthField } from "./AuthField";
import { OAuthButtons } from "./OAuthButtons";
import { SubmitLink } from "./SubmitLink";

export function SignUpForm() {
  return (
    <div className="space-y-5">
      <OAuthButtons />
      <AuthField label="Name" placeholder="Andrii Nazarov" />
      <AuthField label="Email" type="email" placeholder="you@example.com" />
      <AuthField label="Password" type="password" placeholder="At least 8 characters" />

      <label className="flex items-start gap-2 text-sm text-white/60">
        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#9747d2]" />
        I agree to the Terms and Privacy Policy
      </label>

      <SubmitLink>Create account</SubmitLink>
    </div>
  );
}