import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const DemoCanvas = dynamic(() => import("@/features/demo/components/DemoCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-105 w-full animate-pulse rounded-2xl border border-line bg-surface sm:h-130" />
  ),
});

const facts = [
  { value: "5", label: "card types on a single canvas" },
  { value: "~70%", label: "fewer external requests via Postgres cache" },
  { value: "Zod", label: "validates model output to React" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <header className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <span className="size-7 rounded-lg bg-gradient-to-br from-iris to-magenta" />
          <span className="text-base font-medium">Nexus</span>
        </span>

        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/Metenchuk/Nexus-ai"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="grid size-10 place-items-center rounded-xl border border-line text-muted transition-colors hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
          <Link
            href="/sign-in"
            className="rounded-xl border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <section className="mt-12 md:mt-20">
        <h1 className="max-w-3xl text-balance text-3xl font-medium leading-tight sm:text-5xl md:text-6xl">
          Every AI response is a{" "}
          <span className="bg-gradient-to-r from-iris to-magenta bg-clip-text text-transparent">
            card on the canvas
          </span>
          , not a line in a chat.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
          Draw an arrow from one card to another — the second inherits the first's content as context. The canvas below is live, try dragging it right here.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-iris to-magenta px-5 py-3 text-sm text-white transition-all hover:shadow-[0_0_28px_-6px_#ff2c9a]"
          >
            Open your canvas
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mt-10 md:mt-14">
        <DemoCanvas />
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3 md:mt-14">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-line bg-surface p-5">
            <p className="bg-gradient-to-r from-iris to-magenta bg-clip-text text-2xl font-medium text-transparent">
              {fact.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{fact.label}</p>
          </div>
        ))}
      </section>

      <footer className="mt-16 border-t border-line pt-6 text-sm text-muted">
        Nazar Metenchuk · Next.js 16 · React Flow · Prisma
      </footer>
    </main>
  );
}