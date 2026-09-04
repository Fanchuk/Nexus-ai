import GradientCard from "@/components/ui/GradientCard";

export default function ChartCard() {
  return (
    <GradientCard
      gradient="from-mint to-acid"
      className="transition-shadow duration-300 hover:shadow-[0_0_34px_-10px_#11e93f]"
      innerClassName="p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 rounded-full bg-linear-to-br from-mint to-acid" />
        <h3 className="text-sm">Generated chart</h3>
      </div>

      <div className="flex h-32 items-end gap-2">
        {[42, 64, 92, 52, 74].map((height) => (
          <div
            key={height}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-md bg-linear-to-t from-mint/20 to-mint/70 transition-all duration-300 hover:to-acid"
          />
        ))}
      </div>
    </GradientCard>
  );
}