import { Suspense } from "react";
import RecommendationsScreen from "@/features/agents/server/RecommendationsScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ card?: string }>;
}) {
  const { card } = await searchParams;

  return (
    <Suspense>
      <RecommendationsScreen cardId={card} />
    </Suspense>
  );
}