import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import PageHeader from "@/components/ui/PageHeader";
import { getFiles } from "./fileQueries";
import FilesView from "../components/FilesView";

export default async function FilesScreen({ fileId }: { fileId?: string }) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const { rows, segments, usedLabel, processing } = await getFiles(user.id);

  return (
    <div className="h-svh overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <PageHeader title="Files" subtitle="Everything you uploaded, indexed for search" />

        <FilesView
          rows={rows}
          segments={segments}
          usedLabel={usedLabel}
          processing={processing}
          activeId={fileId}
        />
      </div>
    </div>
  );
}