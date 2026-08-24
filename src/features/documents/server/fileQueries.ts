import { formatDistanceToNow } from "date-fns";
import { prisma } from "@/lib/prisma";
import { FileRowData, StorageSegment } from "../types";

const LIMIT = 10 * 1024 * 1024 * 1024;

const SEGMENTS = [
  { kind: "DOCUMENT", label: "Documents", gradient: "from-gold to-magenta" },
  { kind: "IMAGE", label: "Images", gradient: "from-magenta to-iris" },
  { kind: "DATA", label: "Data", gradient: "from-mint to-acid" },
] as const;

export function formatSize(bytes: number) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export async function getFiles(userId: string) {
  const files = await prisma.file.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const rows = files.map<FileRowData>((file) => ({
    id: file.id,
    name: file.name,
    url: file.url,
    size: formatSize(file.size),
    date: formatDistanceToNow(file.createdAt, { addSuffix: true }),
    mime: file.mime,
    kind: file.kind,
    status: file.status,
    pages: file.pages,
  }));

  const used = files.reduce((total, file) => total + file.size, 0);

  const segments = SEGMENTS.map<StorageSegment>((segment) => ({
    label: segment.label,
    gradient: segment.gradient,
    percent:
      (files
        .filter((file) => file.kind === segment.kind)
        .reduce((total, file) => total + file.size, 0) /
        LIMIT) *
      100,
  }));

  return {
    rows,
    segments,
    usedLabel: `${formatSize(used)} of 10 GB`,
    processing: files.some((file) => file.status === "PROCESSING"),
  };
}