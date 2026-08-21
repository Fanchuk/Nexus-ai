import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { features } from "../data";

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <SectionTitle
        title="Everything in one workspace"
        subtitle="Six tools that usually live in six tabs, sitting on one canvas."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 80}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9747d2]/45 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_-30px_#9747d2]">
      <span className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-[#2a35d6]/40 to-[#9747d2]/40 p-2.5 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
    </div>
  );
}