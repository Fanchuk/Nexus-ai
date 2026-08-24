import { Suspense } from "react";
import LibraryScreen from "@/features/library/server/LibraryScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string }>;
}) {
  const { q = "", filter = "All" } = await searchParams;

  return (
    <Suspense>
      <LibraryScreen query={q} filter={filter} />
    </Suspense>
  );
}