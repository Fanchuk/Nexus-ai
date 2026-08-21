type ModeItemProps = {
  icon: React.ReactNode;
  gradient: string;
  title: string;
  description: string;
  active?: boolean;
};

export default function ModeItem({ icon, gradient, title, description, active = false }: ModeItemProps) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 ${
        active ? "bg-raised" : "hover:bg-raised/70"
      }`}
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm">{title}</span>
        <span className="block truncate text-xs text-muted">{description}</span>
      </span>
    </button>
  );
}