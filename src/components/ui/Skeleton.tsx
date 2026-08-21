export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-full bg-[linear-gradient(90deg,#26262c_25%,#35353f_50%,#26262c_75%)] bg-[length:200%_100%] ${className}`}
    />
  );
}