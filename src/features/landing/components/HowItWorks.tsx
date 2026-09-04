import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { steps } from "../data";

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24">
      <SectionTitle title="How it works" subtitle="Three steps from question to result." />

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 100}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
              <span className="bg-linear-to-br from-[#7aa2ff] to-[#9747d2] bg-clip-text text-4xl font-semibold text-transparent">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}