export default function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="h-6 w-11 rounded-full bg-raised transition-colors duration-300 peer-checked:bg-linear-to-r peer-checked:from-iris peer-checked:to-magenta" />
      <span className="pointer-events-none absolute left-1 size-4 rounded-full bg-fg transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  );
}