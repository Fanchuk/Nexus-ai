import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import { getCanvases } from "./queries";
import LibraryToolbar from "../components/LibraryToolbar";
import CanvasTile from "../components/CanvasTile";
import PageHeader from "@/components/ui/PageHeader";

type LibraryScreenProps = {
  query: string;
  filter: string;
};

export default async function LibraryScreen({ query, filter }: LibraryScreenProps) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const canvases = await getCanvases(user.id, query, filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="Library" subtitle="All your canvases in one place" />
      <LibraryToolbar />

      {canvases.length ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {canvases.map((canvas) => (
            <CanvasTile key={canvas.id} canvas={canvas} />
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">
          {query ? "Nothing matches your search." : "No canvases yet."}
        </p>
      )}
    </div>
  );
}