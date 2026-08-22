import { notFound, redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { getUser } from "@/lib/session";
import { getWebCard } from "./queries";
import WebAnswerPanel from "../components/WebAnswerPanel";

export default async function WebAnswerScreen({ cardId }: { cardId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");
  if (!cardId) notFound();

  const result = await getWebCard(user.id, cardId);
  if (!result) notFound();

  return (
    <WebAnswerPanel
      card={result.card}
      updatedLabel={`updated ${formatDistanceToNow(result.updatedAt, { addSuffix: true })}`}
    />
  );
}