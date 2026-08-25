import CanvasScreen from "@/features/canvas/server/CanvasScreen";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; card?: string; run?: string }>;
}) {
  const { id, card, run } = await searchParams;
  return <CanvasScreen canvasId={id} focusCardId={card} autoRun={run === "1"} />;
}