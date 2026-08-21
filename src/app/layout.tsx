import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Nexus — AI canvas workspace",
  description: "Ask, generate and arrange AI results on one infinite canvas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${inter.className} bg-ink text-fg antialiased`}>{children}</body>
    </html>
  );
}