type MetricCardProps = {
  label: string;
  value: string;
};

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-gold/40">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-medium">{value}</p>
    </div>
  );
}