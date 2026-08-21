import HistoryItem from "./HistoryItem";

type HistoryGroupProps = {
  label: string;
  items: { time: string; type: string; prompt: string; gradient: string }[];
};

export default function HistoryGroup({ label, items }: HistoryGroupProps) {
  return (
    <section>
      <h2 className="mb-4 text-sm text-muted">{label}</h2>

      <ol className="relative space-y-3 border-l border-line pl-6">
        {items.map((item) => (
          <HistoryItem key={item.prompt} {...item} />
        ))}
      </ol>
    </section>
  );
}