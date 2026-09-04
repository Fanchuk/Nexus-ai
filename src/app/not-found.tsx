import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-4">
      <div className="text-center">
        <div className="relative mx-auto mb-8 size-24">
          <span className="absolute inset-0 rounded-3xl bg-linear-to-br from-iris to-magenta opacity-20 blur-xl" />
          <span className="relative grid size-full place-items-center rounded-3xl bg-linear-to-br from-iris/20 to-magenta/20 ring-1 ring-iris/30">
            <Sparkles className="size-10 text-iris" />
          </span>
        </div>

        <p className="bg-linear-to-r from-iris to-magenta bg-clip-text text-8xl font-medium text-transparent">
          404
        </p>

        <h1 className="mt-4 text-xl font-medium">Page not found</h1>
        <p className="mt-2 text-sm text-muted">
          This canvas block doesn’t exist or was removed.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/app/canvas"
            className="rounded-xl bg-linear-to-r from-iris to-magenta px-5 py-3 text-sm text-white transition-opacity hover:opacity-90"
          >
            Go to canvas
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-line px-5 py-3 text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}