import { Globe } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import SourceList from "./SourceList";
import AnswerActions from "./AnswerActions";

export default function WebAnswerPanel() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<Globe className="size-5" />}
        title="Web answer"
        gradient="from-cobalt to-azure"
        meta="updated 2 min ago"
      />

      <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <p className="text-[15px] leading-7 text-fg/90">
          Specialty coffee brands grew about 12% year over year, mostly through direct-to-consumer
          subscriptions
          <span className="mx-1.5 inline-flex rounded-md border border-azure/40 bg-azure/10 px-1.5 py-0.5 text-xs text-azure">
            reuters
          </span>
          . Landing pages that lead with origin stories convert noticeably better than pages that lead
          with price
          <span className="mx-1.5 inline-flex rounded-md border border-azure/40 bg-azure/10 px-1.5 py-0.5 text-xs text-azure">
            baymard
          </span>
          .
        </p>

        <p className="mt-4 text-[15px] leading-7 text-fg/90">
          The pattern repeats across small roasters: a single hero product, one clear promise, and a
          subscription toggle placed above the fold.
        </p>
      </article>

      <SourceList />
      <AnswerActions />
    </div>
  );
}