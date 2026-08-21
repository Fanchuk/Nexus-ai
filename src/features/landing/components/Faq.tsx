"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { faqs } from "../data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Questions &amp; answers
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 ${
                      open === i ? "rotate-180 text-[#9747d2]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/65">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}