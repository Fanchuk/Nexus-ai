import PageHeader from "@/components/ui/PageHeader";
import LibraryToolbar from "./LibraryToolbar";
import CanvasTile from "./CanvasTile";

const canvases = [
  { name: "Coffee brand launch", date: "2 hours ago", blocks: 12, gradient: "from-magenta to-iris" },
  { name: "Q3 report breakdown", date: "Yesterday", blocks: 8, gradient: "from-gold to-magenta" },
  { name: "Competitor research", date: "3 days ago", blocks: 21, gradient: "from-cobalt to-azure" },
  { name: "Growth experiments", date: "Last week", blocks: 6, gradient: "from-mint to-acid" },
  { name: "Moodboard — winter", date: "Last week", blocks: 14, gradient: "from-iris to-magenta" },
  { name: "Pricing page ideas", date: "2 weeks ago", blocks: 9, gradient: "from-azure to-mint" },
];

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="Library" subtitle="All your canvases in one place" />
      <LibraryToolbar />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {canvases.map((canvas) => (
          <CanvasTile key={canvas.name} {...canvas} />
        ))}
      </ul>
    </div>
  );
}