"use client";

import { signIn } from "@/lib/auth-client";

export default function OAuthButtons({ callbackUrl }: { callbackUrl: string }) {
  function oauth(provider: "google" | "github") {
    signIn.social({ provider, callbackURL: callbackUrl });
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {(["google", "github"] as const).map((provider) => (
        <button
          key={provider}
          onClick={() => oauth(provider)}
          className="rounded-xl border border-line bg-surface py-3 text-sm capitalize transition-colors hover:bg-raised"
        >
          {provider === "github" ? "GitHub" : "Google"}
        </button>
      ))}
    </div>
  );
}