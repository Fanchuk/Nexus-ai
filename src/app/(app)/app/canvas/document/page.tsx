import DocumentScreen from "@/features/documents/server/DocumentScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ card?: string }>;
}) {
  const { card } = await searchParams;
  return <DocumentScreen cardId={card} />;
}