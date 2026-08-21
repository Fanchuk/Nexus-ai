import { logos } from "../data";

export function TrustedBy() {
  const row = [...logos, ...logos];

  return (
    <section className="px-6 py-14">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40">
        Trusted by teams that move fast
      </p>

      <div className="relative mx-auto mt-8 max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="mk-marquee flex w-max gap-12">
          {row.map((logo, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-medium text-white/35 transition-colors hover:text-white/70"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}