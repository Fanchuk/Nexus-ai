type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function Spinner({ size = 20, className = "" }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={`animate-spin ${className}`}
      style={{ animationDuration: "0.7s" }}
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}