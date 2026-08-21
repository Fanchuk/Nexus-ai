import { RotateCcw } from "lucide-react";

type ErrorStateProps = {
  title: string;
  description: string;
};

export default function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-magenta/35 bg-magenta/5 p-6">
      <h2 className="text-base">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>

      <button className="mt-5 flex items-center gap-2 rounded-xl border border-magenta/40 px-4 py-2.5 text-sm text-magenta transition-colors duration-300 hover:bg-magenta/10">
        <RotateCcw className="size-4" />
        Retry
      </button>
    </div>
  );
}