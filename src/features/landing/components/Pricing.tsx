"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { plans } from "../data";

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Simple pricing
        </h2>
        <p className="mt-5 text-xl text-white/75">
          Start free, upgrade when you grow.
        </p>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] p-1">
          {["Monthly", "Yearly"].map((label, i) => {
            const active = (i === 1) === yearly;
            return (
              <button
                key={label}
                onClick={() => setYearly(i === 1)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-white text-[#0c184f]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1}>
            <div
              className={`relative h-full overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? "border-white/40 bg-gradient-to-br from-[#4d6aff]/30 to-[#b65bc8]/20"
                  : "border-white/12 bg-white/[0.06] hover:border-white/30"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-white px-3 py-1 text-xs font-semibold text-[#0c184f]">
                  Most popular
                </span>
              )}

              <h3 className="mt-2 text-xl font-semibold text-white">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">
                  ${yearly ? plan.yearlyPrice : plan.price}
                </span>
                <span className="text-base text-white/60">/mo</span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-base">
                    <Check className="h-5 w-5 text-[#22C55E]" />
                    <span className="text-white/75">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full py-3.5 text-base font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[#4d6aff] via-[#b65bc8] to-[#ec4899] text-white hover:shadow-xl hover:shadow-[#ec4899]/40"
                    : "border border-white/20 bg-white/[0.06] text-white hover:border-white/40 hover:bg-white/[0.12]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}