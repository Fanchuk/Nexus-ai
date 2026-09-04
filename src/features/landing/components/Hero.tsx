import { Check, Loader, Search, Sparkles } from "lucide-react";
import { GradientButton } from "./GradientButton";
import { Reveal } from "./Reveal";

const previewSteps = [
  { text: "Searched 6 sources on the web", done: true },
  { text: "Read report_q3.pdf — 24 pages", done: true },
  { text: "Building your canvas…", done: false },
];

export function Hero() {
  return (
    <section className="px-6 pb-20 pt-20 text-center md:pt-28">
      <Reveal className="mx-auto max-w-4xl">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs text-white/80">
          <Sparkles className="h-3.5 w-3.5 text-[#9747d2]" />
          Your AI research workspace
        </span>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          Think, research
          <br />
          <span className="bg-linear-to-r from-[#7aa2ff] via-[#b18cff] to-[#19b5e0] bg-clip-text text-transparent">
            and create with AI
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base text-white/70 sm:text-lg">
          Search the web, chat with documents, generate visuals — every answer
          lands as a card on one infinite canvas.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <GradientButton href="/sign-up">Get started free</GradientButton>
          <GradientButton href="#showcase" variant="ghost">
            See how it works
          </GradientButton>
        </div>
      </Reveal>

      <HeroPreview />
    </section>
  );
}

function HeroPreview() {
  return (
    <Reveal delay={150} className="mx-auto mt-16 max-w-3xl">
      <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-2 shadow-[0_30px_80px_-40px_#2a35d6]">
        <div className="rounded-2xl border border-white/10 bg-[#0b0a14]/80 p-5 sm:p-6">
          <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-white/50" />
            <span className="truncate text-sm text-white/55">
              Compare EV market leaders and forecast 2027…
            </span>
            <kbd className="ml-auto hidden rounded-md border border-[#9747d2]/40 bg-[#9747d2]/15 px-2 py-0.5 text-[11px] text-[#c9a6ff] sm:block">
              ⌘K
            </kbd>
          </div>

          <ul className="mt-4 space-y-2 text-left">
            {previewSteps.map((step) => (
              <li
                key={step.text}
                className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5"
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                    step.done
                      ? "bg-linear-to-br from-[#2a35d6] to-[#9747d2] text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {step.done ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Loader className="h-3 w-3 animate-spin" />
                  )}
                </span>
                <span className="truncate text-sm text-white/70">{step.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}