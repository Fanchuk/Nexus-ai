import GradientCard from "@/components/ui/GradientCard";
import Skeleton from "@/components/ui/Skeleton";

export default function DocCard() {
  return (
    <GradientCard
      gradient="from-gold to-magenta"
      className="transition-shadow duration-300 hover:shadow-[0_0_34px_-10px_#dea306]"
      innerClassName="p-4"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 rounded-full bg-linear-to-br from-gold to-magenta" />
        <h3 className="text-sm">Doc analysis</h3>
      </div>

      <div className="flex gap-4">
        <div className="h-24 w-16 shrink-0 rounded-lg bg-linear-to-b from-gold/40 to-gold/10" />
        <div className="flex-1 space-y-2.5 pt-1">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-10/12" />
          <Skeleton className="h-2 w-11/12" />
          <Skeleton className="h-2 w-7/12" />
        </div>
      </div>
    </GradientCard>
  );
}