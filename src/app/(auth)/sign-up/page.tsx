import Link from "next/link";
import { AuthShell } from "@/features/auth/components/AuthShell";
import { SignUpForm } from "@/features/auth/components/SignUpForm";

export default function Page() {
  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Free to start. No card, no setup."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-iris hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}