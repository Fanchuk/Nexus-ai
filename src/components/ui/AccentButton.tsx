type AccentButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AccentButton({ children, className = "" }: AccentButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-iris to-magenta px-5 py-3 text-sm text-white shadow-[0_0_0_0_transparent] transition-all duration-300 hover:shadow-[0_0_28px_-6px_#ff2c9a] active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}