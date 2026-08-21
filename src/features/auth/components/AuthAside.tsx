import { Check, FileText, Globe, ImagePlus } from "lucide-react";

const cards = [
  { icon: Globe, title: "Web answer", text: "3 sources cited", tone: "from-[#2a35d6] to-[#19b5e0]" },
  { icon: FileText, title: "Doc analysis", text: "report_q3.pdf · 24 pages", tone: "from-[#9747d2] to-[#2a35d6]" },
  { icon: ImagePlus, title: "Image studio", text: "4 variations ready", tone: "from-[#19b5e0] to-[#9747d2]" },
];

export function AuthAside() {
  return (
    <aside className="hidden lg:block">
      <div className="space-y-3">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-4 ${
                i === 1 ? "mk-float-late ml-10" : "mk-float"
              }`}
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${card.tone}`}>
                <Icon className="h-5 w-5 text-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-white">{card.title}</span>
                <span className="block text-xs text-white/55">{card.text}</span>
              </span>
              <Check className="ml-auto h-4 w-4 shrink-0 text-[#7aa2ff]" />
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">
        One canvas for search, documents and images — everything you ask stays
        as a card you can reuse.
      </p>
    </aside>
  );
}