import { GradientButton } from "./GradientButton";
import { Reveal } from "./Reveal";

export function CtaBanner() {
  return (
    <section className="px-6 py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-linear-to-br from-[#2a35d6]/40 via-[#6b4ee0]/30 to-[#9747d2]/35 px-6 py-16 text-center">
        <span className="mk-float absolute -left-10 top-6 h-40 w-40 rounded-full bg-[#19b5e0]/20 blur-2xl" />
        <span className="mk-float-late absolute -right-8 bottom-4 h-44 w-44 rounded-full bg-[#9747d2]/25 blur-2xl" />

        <h2 className="relative text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Ready to think faster?
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-base text-white/80">
          Open your first canvas and let Nexus do the reading.
        </p>
        <div className="relative mt-9 flex justify-center">
          <GradientButton href="/sign-up">Get started free</GradientButton>
        </div>
      </Reveal>
    </section>
  );
}