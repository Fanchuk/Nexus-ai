"use client";

import { FileText } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import { useDocument } from "../hooks/useDocument";
import { DocCard } from "../types";
import UploadDropzone from "./UploadDropzone";
import DocPreview from "./DocPreview";
import DocInsights from "./DocInsights";

type DocAnalysisPanelProps = {
  card: DocCard;
  pages: string[];
};

export default function DocAnalysisPanel({ card, pages }: DocAnalysisPanelProps) {
  const doc = useDocument(card);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<FileText className="size-5" />}
        title="Document analysis"
        gradient="from-gold to-magenta"
        meta={doc.data.fileName ? `${doc.data.fileName} · ${doc.data.pages} pages` : undefined}
      />

      {pages.length ? (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DocPreview pages={pages} page={doc.page} onPage={doc.setPage} />
          <DocInsights
            data={doc.data}
            tab={doc.tab}
            loading={doc.loading}
            onTab={doc.openTab}
            onPage={doc.setPage}
            onAsk={doc.askQuestion}
          />
        </div>
      ) : (
        <UploadDropzone analyzing={doc.analyzing} onUploaded={doc.analyze} />
      )}
    </div>
  );
}