import PageHeader from "@/components/ui/PageHeader";
import HistoryGroup from "./HistoryGroup";

const groups = [
  {
    label: "Today",
    items: [
      { time: "14:32", type: "Image", prompt: "Foggy mountain range at dawn, cinematic", gradient: "from-magenta to-iris" },
      { time: "13:05", type: "Web", prompt: "Specialty coffee market growth 2026", gradient: "from-cobalt to-azure" },
      { time: "11:47", type: "Doc", prompt: "Summarize report_q3.pdf", gradient: "from-gold to-magenta" },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { time: "18:20", type: "Chart", prompt: "Revenue by tier, last four quarters", gradient: "from-mint to-acid" },
      { time: "16:02", type: "Web", prompt: "Landing page conversion benchmarks", gradient: "from-cobalt to-azure" },
    ],
  },
  {
    label: "Earlier",
    items: [
      { time: "Mon", type: "Image", prompt: "Minimal coffee packaging mockup", gradient: "from-iris to-magenta" },
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PageHeader title="History" subtitle="Every prompt you sent, grouped by day" />

      <div className="space-y-10">
        {groups.map((group) => (
          <HistoryGroup key={group.label} {...group} />
        ))}
      </div>
    </div>
  );
}