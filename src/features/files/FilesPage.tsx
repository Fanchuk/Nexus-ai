import PageHeader from "@/components/ui/PageHeader";
import StorageBar from "./StorageBar";
import FileRow from "./FileRow";
import FilePreview from "./FilePreview";

const files = [
  { name: "report_q3.pdf", size: "4.2 MB", date: "Today", status: "Indexed" as const, gradient: "from-gold to-magenta" },
  { name: "brand-moodboard.png", size: "1.8 MB", date: "Today", status: "Indexed" as const, gradient: "from-magenta to-iris" },
  { name: "market-data.csv", size: "320 KB", date: "Yesterday", status: "Processing" as const, gradient: "from-mint to-acid" },
  { name: "interview-notes.docx", size: "76 KB", date: "3 days ago", status: "Indexed" as const, gradient: "from-cobalt to-azure" },
];

export default function FilesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="Files" subtitle="Everything you uploaded, indexed for search" />
      <StorageBar />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="space-y-2">
          {files.map((file, index) => (
            <FileRow key={file.name} active={index === 0} {...file} />
          ))}
        </ul>

        <FilePreview />
      </div>
    </div>
  );
}