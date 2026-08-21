import { ChevronDown } from "lucide-react";

type SelectControlProps = {
  options: string[];
};

export default function SelectControl({ options }: SelectControlProps) {
  return (
    <div className="relative">
      <select className="w-44 appearance-none rounded-xl border border-line bg-raised px-4 py-2.5 text-sm outline-none transition-colors duration-300 focus:border-iris/60">
        {options.map((option) => (
          <option key={option} className="bg-surface">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}