import { UploadCloud } from "lucide-react";

export default function UploadDropzone() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-gold to-magenta p-px">
      <div className="grid place-items-center rounded-[15px] bg-surface px-6 py-14 text-center">
        <UploadCloud className="size-9 text-gold" />
        <p className="mt-4 text-sm">Drop a PDF, image or file</p>
        <p className="mt-1 text-xs text-muted">up to 25 MB · indexed for search automatically</p>
      </div>
    </div>
  );
}