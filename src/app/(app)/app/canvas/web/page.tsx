import WebAnswerScreen from "@/features/search/server/WebAnswerScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ card?: string }>;
}) {
  const { card } = await searchParams;
  return <WebAnswerScreen cardId={card} />;
}