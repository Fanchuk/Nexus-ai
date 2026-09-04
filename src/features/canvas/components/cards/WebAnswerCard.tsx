import GradientCard from "@/components/ui/GradientCard";
import Skeleton from "@/components/ui/Skeleton";

export default function WebAnswerCard() {
  return (
    <GradientCard
      gradient="from-cobalt to-azure"
      className="transition-shadow duration-300 hover:shadow-[0_0_34px_-10px_#19b5e0]"
      innerClassName="p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 rounded-full bg-linear-to-br from-cobalt to-azure" />
        <h3 className="text-sm">Web answer</h3>
      </div>

      <div className="space-y-2.5">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-11/12" />
        <Skeleton className="h-2 w-8/12" />
      </div>

      <span className="mt-4 inline-flex rounded-full border border-azure/40 bg-azure/10 px-2.5 py-1 text-xs text-azure">
        3 sources
      </span>
    </GradientCard>
  );
}