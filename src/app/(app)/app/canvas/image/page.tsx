import ImageStudioScreen from "@/features/studio/server/ImageStudioScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ card?: string }>;
}) {
  const { card } = await searchParams;
  return <ImageStudioScreen cardId={card} />;
}