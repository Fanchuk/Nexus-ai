import GradientCard from "@/components/ui/GradientCard";
import Skeleton from "@/components/ui/Skeleton";

export default function LoadingCard() {
  return (
    <GradientCard gradient="from-magenta to-iris" innerClassName="p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="size-3 animate-pulse rounded-full bg-linear-to-br from-magenta to-iris" />
        <h3 className="text-sm text-muted">Generating image…</h3>
      </div>

      <div className="space-y-2.5">
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-9/12" />
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full w-2/3 animate-shimmer rounded-full bg-[linear-gradient(90deg,#9747d2,#ff2c9a,#9747d2)] bg-[length:200%_100%]" />
      </div>
    </GradientCard>
  );
}