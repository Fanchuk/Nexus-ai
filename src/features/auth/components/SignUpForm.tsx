"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/stores/toast-store";
import { signUp } from "@/lib/auth-client";
import { signUpSchema, SignUpValues } from "../schema";
import AuthField from "./AuthField";
import OAuthButtons from "./OAuthButtons";
import Spinner from "@/components/ui/Spinner";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpValues) {
    setLoading(true);
    const { error } = await signUp.email(values);
    setLoading(false);
    if (error) return toast.error(error.message ?? "Sign up failed");
    router.push("/app/canvas");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <OAuthButtons callbackUrl="/app/canvas" />

      <AuthField label="Name" placeholder="Andrii Nazarov"
        error={errors.name?.message} {...register("name")} />
      <AuthField label="Email" type="email" placeholder="you@example.com"
        error={errors.email?.message} {...register("email")} />
      <AuthField label="Password" type="password" placeholder="At least 8 characters"
        error={errors.password?.message} {...register("password")} />

      <button type="submit" disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-cobalt to-iris py-3 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60">
        {loading ? <Spinner size={16} className="mx-auto" /> : "Create account"}
      </button>
    </form>
  );
}