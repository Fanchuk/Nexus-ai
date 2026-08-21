import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust"];

const codeLines = [
  { text: "const nexus = new NexusAI(process.env.API_KEY)", tone: "text-[#c9a6ff]" },
  { text: "", tone: "" },
  { text: "const research = await nexus.research({", tone: "text-white/80" },
  { text: "  query: 'EV market leaders 2027',", tone: "text-[#7dd3fc]" },
  { text: "  sources: ['web', 'documents'],", tone: "text-[#7dd3fc]" },
  { text: "  steps: 'auto',", tone: "text-[#7dd3fc]" },
  { text: "})", tone: "text-white/80" },
  { text: "", tone: "" },
  { text: "console.log(research.summary)", tone: "text-[#7aa2ff]" },
  { text: "console.log(research.sources)", tone: "text-[#7aa2ff]" },
];

export function CodeShowcase() {
  return (
    <section className="px-6 py-24">
      <SectionTitle
        title="Easy to integrate"
        subtitle="A clean API and SDKs, so you can focus on what matters."
      />

      <Reveal delay={100} className="mx-auto mt-12 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0b0a14]/80 shadow-[0_30px_80px_-45px_#9747d2]">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>

          <div className="grid md:grid-cols-[170px_1fr]">
            <div className="hidden flex-col gap-1 border-r border-white/10 p-3 md:flex">
              {languages.map((lang, i) => (
                <span
                  key={lang}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    i === 0
                      ? "bg-gradient-to-r from-[#2a35d6]/40 to-[#9747d2]/30 text-white"
                      : "text-white/45 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {lang}
                </span>
              ))}
            </div>

            <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className={line.tone || "text-white/35"}>
                  {line.text || "\u00A0"}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </Reveal>
    </section>
  );
}