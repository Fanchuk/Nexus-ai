import { Suspense } from "react";
import HistoryScreen from "@/features/history/server/HistoryScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string }>;
}) {
  const { limit } = await searchParams;

  return (
    <Suspense>
      <HistoryScreen limit={Number(limit) || 20} />
    </Suspense>
  );
}