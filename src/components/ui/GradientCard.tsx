type GradientCardProps = {
  gradient: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
};

export default function GradientCard({
  gradient,
  className = "",
  innerClassName = "",
  children,
}: GradientCardProps) {
  return (
    <div className={`rounded-2xl bg-linear-to-br p-px ${gradient} ${className}`}>
      <div className={`h-full rounded-[15px] bg-surface ${innerClassName}`}>{children}</div>
    </div>
  );
}