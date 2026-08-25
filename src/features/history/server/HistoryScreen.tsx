import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import PageHeader from "@/components/ui/PageHeader";
import { getHistory } from "./queries";
import HistoryList from "../components/HistoryList";
import ClearHistoryButton from "../components/ClearHistoryButton";

export default async function HistoryScreen({ limit }: { limit: number }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const { groups, hasMore } = await getHistory(user.id, limit);

  return (
  <div className="h-svh overflow-y-auto">
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader
        title="History"
        subtitle="Every prompt you sent, grouped by day"
        action={groups.length ? <ClearHistoryButton /> : undefined}
      />
      <HistoryList groups={groups} hasMore={hasMore} limit={limit} />
    </div>
  </div>
);
}