import { Reveal } from "./Reveal";

export function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-white/65 sm:text-lg">{subtitle}</p>
    </Reveal>
  );
}