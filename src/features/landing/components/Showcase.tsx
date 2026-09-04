import { Bot, FileText, Globe, ImagePlus } from "lucide-react";
import { Reveal } from "./Reveal";

export function Showcase() {
  return (
    <section id="showcase" className="px-6 py-24">
      <Reveal className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-linear-to-br from-[#2a35d6]/45 via-[#6b4ee0]/35 to-[#9747d2]/35 p-9 transition-transform duration-300 hover:scale-[1.01] md:col-span-2 md:row-span-2">
          <span className="mk-float absolute right-8 top-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <Globe className="h-9 w-9 text-white" />
          <h3 className="mt-6 text-3xl font-semibold text-white md:text-4xl">Live web search</h3>
          <p className="mt-4 max-w-md text-base text-white/80">
            Ask anything and get an answer grounded in fresh, cited sources.
            Nexus reads the web so you don&apos;t have to.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["reuters.com", "baymard.com", "sca.coffee"].map((source) => (
              <span
                key={source}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80"
              >
                {source}
              </span>
            ))}
          </div>
        </div>

        <ShowcaseCard icon={FileText} title="Chat with docs" text="Answers cite the exact page." />
        <ShowcaseCard icon={ImagePlus} title="Image studio" text="Generate, edit, upscale." />
        <ShowcaseCard icon={Bot} title="Agents" text="Long tasks run while you work." wide />
      </Reveal>
    </section>
  );
}

function ShowcaseCard({
  icon: Icon,
  title,
  text,
  wide,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#19b5e0]/40 ${
        wide ? "md:col-span-3" : ""
      }`}
    >
      <Icon className="h-7 w-7 text-[#7aa2ff]" />
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-white/55">{text}</p>
    </div>
  );
}