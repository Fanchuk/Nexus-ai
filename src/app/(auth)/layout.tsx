import "../marketing.css";
import { AnimatedBackground } from "@/features/landing/components/AnimatedBackground";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-hidden">
      <AnimatedBackground />
      {children}
    </div>
  );
}