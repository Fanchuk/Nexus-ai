export function AuthField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/35 focus:border-[#9747d2]/70 focus:bg-white/[0.07]"
      />
    </label>
  );
}