import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { CardData } from "@/features/canvas/types";
import DocAnalysisPanel from "../components/DocAnalysisPanel";

export default async function DocumentScreen({ cardId }: { cardId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");
  if (!cardId) notFound();

  const card = await prisma.card.findFirst({
    where: { id: cardId, type: "DOC", canvas: { userId: user.id } },
  });
  if (!card) notFound();

  const data = (card.data ?? {}) as CardData;

  const file = data.fileId
    ? await prisma.file.findFirst({ where: { id: data.fileId, userId: user.id } })
    : null;

  return (
    <DocAnalysisPanel
      key={data.fileId ?? "empty"}
      card={{ id: card.id, data }}
      pages={file?.text ? file.text.split("\f") : []}
    />
  );
}