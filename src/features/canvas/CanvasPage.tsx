import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { CardType, CardData, CanvasData } from "@/features/canvas/types";
import CanvasBoard from "./components/CanvasBoard";

export default async function CanvasPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; cardId?: string; run?: string }>;
}) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const { id, cardId, run } = await searchParams;

  const [settings, canvas] = await Promise.all([
    prisma.settings.findUnique({ where: { userId: user.id } }),
    id
      ? prisma.canvas.findUnique({
          where: { id },
          include: { cards: true, edges: true },
        })
      : prisma.canvas.findFirst({
          where: { userId: user.id },
          orderBy: { updatedAt: "desc" },
          include: { cards: true, edges: true },
        }),
  ]);

  if (!canvas) redirect("/app/canvas");

  const initial: CanvasData = {
    id: canvas.id,
    title: canvas.title,
    cards: canvas.cards.map((card) => ({
      ...card,
      data: (card.data ?? {}) as CardData,
    })),
    edges: canvas.edges,
  };

  return (
    <CanvasBoard
      initial={initial}
      defaultMode={(settings?.defaultMode ?? "WEB") as CardType}
      showGrid={settings?.showGrid ?? true}
      lastViewport={{
        x: 0,
        y: 0,
        zoom: 1,
      }}
      focusCardId={cardId}
      autoRun={run === "1"}
    />
  );
}