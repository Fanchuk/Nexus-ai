import { FileText } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import DocPreview from "./DocPreview";
import DocInsights from "./DocInsights";

export default function DocAnalysisPanel() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<FileText className="size-5" />}
        title="Document analysis"
        gradient="from-gold to-magenta"
        meta="report_q3.pdf · 24 pages"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <DocPreview />
        <DocInsights />
      </div>
    </div>
  );
}