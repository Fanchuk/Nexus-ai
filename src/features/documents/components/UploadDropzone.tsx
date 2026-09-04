"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { useUploadThing } from "@/lib/uploadthing-client";
import { toast } from "@/stores/toast-store";

type UploadDropzoneProps = {
  analyzing: boolean;
  onUploaded: (fileId: string) => void;
};

export default function UploadDropzone({ analyzing, onUploaded }: UploadDropzoneProps) {
  const [over, setOver] = useState(false);

  const { startUpload, isUploading } = useUploadThing("document", {
    onClientUploadComplete: (result) => {
      const fileId = result?.[0]?.serverData?.fileId;
      if (fileId) onUploaded(fileId);
    },
    onUploadError: () => toast.error("Upload failed"),
  });

  const busy = isUploading || analyzing;

  function upload(files: FileList | null) {
    if (!files?.length || busy) return;
    startUpload([files[0]]);
  }

  return (
    <div className="rounded-2xl bg-linear-to-br from-gold to-magenta p-px">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          upload(event.dataTransfer.files);
        }}
        className={`grid cursor-pointer place-items-center rounded-[15px] px-6 py-14 text-center transition-colors ${
          over ? "bg-raised" : "bg-surface"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          disabled={busy}
          onChange={(event) => upload(event.target.files)}
          className="hidden"
        />

        {busy ? <Spinner size={36} className="text-gold" /> : <UploadCloud className="size-9 text-gold" />}

        <p className="mt-4 text-sm">
          {isUploading ? "Uploading…" : analyzing ? "Reading the document…" : "Drop a PDF, DOCX or TXT"}
        </p>
        <p className="mt-1 text-xs text-muted">up to 16 MB · indexed for search automatically</p>
      </label>
    </div>
  );
}