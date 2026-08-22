export default function NodeSkeleton() {
  return (
    <div className="space-y-2.5">
      {["w-full", "w-11/12", "w-8/12"].map((width) => (
        <div
          key={width}
          className={`h-2 animate-shimmer rounded-full bg-[linear-gradient(90deg,#26262c_25%,#35353f_50%,#26262c_75%)] bg-[length:200%_100%] ${width}`}
        />
      ))}
    </div>
  );
}