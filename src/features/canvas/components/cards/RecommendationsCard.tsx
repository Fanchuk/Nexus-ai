import GradientCard from "@/components/ui/GradientCard";
import Skeleton from "@/components/ui/Skeleton";

export default function RecommendationsCard() {
  return (
    <GradientCard
      gradient="from-iris to-magenta"
      className="transition-shadow duration-300 hover:shadow-[0_0_34px_-10px_#9747d2]"
      innerClassName="p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 rounded-full bg-gradient-to-br from-iris to-magenta" />
        <h3 className="text-sm">Recommendations</h3>
      </div>

      <ul className="space-y-2">
        {["w-9/12", "w-10/12", "w-7/12"].map((width) => (
          <li
            key={width}
            className="flex items-center gap-3 rounded-xl border border-line bg-raised/60 px-3 py-2.5 transition-colors duration-300 hover:border-iris/50"
          >
            <span className="size-3 shrink-0 rounded-full bg-gradient-to-br from-iris to-magenta" />
            <Skeleton className={`h-2 ${width}`} />
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}