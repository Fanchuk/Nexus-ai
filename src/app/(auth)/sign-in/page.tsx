import Link from "next/link";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { SignInForm } from "@/features/auth/components/SignInForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in and pick up where your canvas left off."
      footer={
        <>
          New here?{" "}
          <Link href="/sign-up" className="text-[#b18cff] transition-colors hover:text-white">
            Create an account
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}