export function MessageBubble({
  role,
  children,
}: {
  role: "user" | "ai";
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl bg-[#3B82F6]/[0.12] px-4 py-3 text-[15px] text-[#60A5FA]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] text-[15px] leading-relaxed text-[#EDEDED]">
        {children}
      </div>
    </div>
  );
}