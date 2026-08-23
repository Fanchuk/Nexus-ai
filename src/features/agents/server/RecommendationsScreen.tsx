import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { CardData } from "@/features/canvas/types";
import RecommendationsPanel from "../components/RecommendationsPanel";

export default async function RecommendationsScreen({ cardId }: { cardId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");
  if (!cardId) notFound();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "RECS", canvas: { userId: user.id } },
  });
  if (!card) notFound();

  const data = (card.data ?? {}) as CardData;

  return <RecommendationsPanel cardId={card.id} initialItems={data.items ?? []} />;
}