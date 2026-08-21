import Link from "next/link";
import { Minimize2 } from "lucide-react";

type PanelHeaderProps = {
  icon: React.ReactNode;
  title: string;
  gradient: string;
  meta?: string;
};

export default function PanelHeader({ icon, title, gradient, meta }: PanelHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center gap-3">
      <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
        {icon}
      </span>
      <h1 className="text-lg font-medium sm:text-xl">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        {meta ? <span className="hidden text-sm text-muted sm:block">{meta}</span> : null}
        <Link
          href="/canvas"
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-muted transition-colors hover:text-fg"
        >
          <Minimize2 className="size-4" />
          <span className="hidden sm:inline">collapse to card</span>
        </Link>
      </div>
    </header>
  );
}