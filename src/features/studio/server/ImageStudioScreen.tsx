import { notFound, redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import { getImageCard } from "./queries";
import ImageStudioPanel from "../components/ImageStudioPanel";

export default async function ImageStudioScreen({ cardId }: { cardId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");
  if (!cardId) notFound();

  const result = await getImageCard(user.id, cardId);
  if (!result) notFound();

  return <ImageStudioPanel card={result.card} style={result.style} ratio={result.ratio} />;
}