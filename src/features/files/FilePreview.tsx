import { Download, Trash2 } from "lucide-react";

export default function FilePreview() {
  return (
    <aside className="rounded-2xl border border-line bg-surface p-5">
      <div className="aspect-[3/4] space-y-3 overflow-hidden rounded-xl bg-gradient-to-b from-gold/12 to-transparent p-5">
        {["w-8/12 h-3", "w-full h-2", "w-full h-2", "w-9/12 h-2", "w-full h-8", "w-full h-2"].map((line, index) => (
          <div key={index} className={`rounded-md bg-gold/55 ${line}`} />
        ))}
      </div>

      <h2 className="mt-5 text-sm">report_q3.pdf</h2>
      <dl className="mt-3 space-y-2 text-sm">
        {[
          ["Pages", "24"],
          ["Size", "4.2 MB"],
          ["Uploaded", "Today, 14:20"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <dt className="text-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
          <Download className="size-4" />
          Download
        </button>
        <button className="grid size-11 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors duration-300 hover:border-magenta/50 hover:text-magenta">
          <Trash2 className="size-4" />
        </button>
      </div>
    </aside>
  );
}