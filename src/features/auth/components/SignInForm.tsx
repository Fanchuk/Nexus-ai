"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "@/stores/toast-store";
import { signIn } from "@/lib/auth-client";
import { signInSchema, SignInValues } from "../schema";
import AuthField from "./AuthField";
import OAuthButtons from "./OAuthButtons";
import Spinner from "@/components/ui/Spinner";

export function SignInForm() {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") ?? "/app/canvas";
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: SignInValues) {
    setLoading(true);
    const { error } = await signIn.email(values);
    setLoading(false);
    if (error) return toast.error(error.message ?? "Sign in failed");
    router.push(callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <OAuthButtons callbackUrl={callbackUrl} />

      <AuthField label="Email" type="email" placeholder="you@example.com"
        error={errors.email?.message} {...register("email")} />
      <AuthField label="Password" type="password" placeholder="••••••••"
        error={errors.password?.message} {...register("password")} />

      <button type="submit" disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-cobalt to-iris py-3 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60">
        {loading ? <Spinner size={16} className="mx-auto" /> : "Sign in"}
      </button>
    </form>
  );
}