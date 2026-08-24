import CanvasScreen from "@/features/canvas/server/CanvasScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return <CanvasScreen canvasId={id} />;
}