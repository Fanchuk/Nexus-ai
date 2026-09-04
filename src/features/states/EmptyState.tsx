type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <span className="size-14 rounded-2xl bg-linear-to-br from-iris to-magenta opacity-70" />
      <h2 className="mt-5 text-base">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}