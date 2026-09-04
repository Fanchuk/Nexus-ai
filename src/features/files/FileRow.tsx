import { FileText } from "lucide-react";

type FileRowProps = {
  name: string;
  size: string;
  date: string;
  status: "Indexed" | "Processing";
  gradient: string;
  active?: boolean;
};

export default function FileRow({ name, size, date, status, gradient, active = false }: FileRowProps) {
  return (
    <li>
      <button
        className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 ${
          active ? "border-iris/50 bg-raised" : "border-line bg-surface hover:bg-raised/70"
        }`}
      >
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br ${gradient} text-white`}>
          <FileText className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm">{name}</span>
          <span className="block text-xs text-muted">
            {size} · {date}
          </span>
        </span>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs ${
            status === "Indexed"
              ? "border-mint/40 bg-mint/10 text-mint"
              : "border-gold/40 bg-gold/10 text-gold"
          }`}
        >
          {status}
        </span>
      </button>
    </li>
  );
}