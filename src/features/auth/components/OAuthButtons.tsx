const providers = ["Google", "GitHub"];

export function OAuthButtons() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <button
            key={provider}
            className="rounded-xl border border-white/12 bg-white/[0.04] py-3 text-sm text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.09]"
          >
            {provider}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}