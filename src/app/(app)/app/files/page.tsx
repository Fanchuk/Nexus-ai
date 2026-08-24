import { Suspense } from "react";
import FilesScreen from "@/features/documents/server/FilesScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ file?: string }>;
}) {
  const { file } = await searchParams;

  return (
    <Suspense>
      <FilesScreen fileId={file} />
    </Suspense>
  );
}