import "./marketing.css";
import { AnimatedBackground } from "@/features/landing/components/AnimatedBackground";
import { Navbar } from "@/features/landing/components/Navbar";
import { Hero } from "@/features/landing/components/Hero";
import { TrustedBy } from "@/features/landing/components/TrustedBy";
import { Features } from "@/features/landing/components/Features";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Showcase } from "@/features/landing/components/Showcase";
import { CodeShowcase } from "@/features/landing/components/CodeShowcase";
import { Faq } from "@/features/landing/components/Faq";
import { CtaBanner } from "@/features/landing/components/CtaBanner";
import { Footer } from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Showcase />
      <CodeShowcase />
      <Faq />
      <CtaBanner />
      <Footer />
    </main>
  );
}