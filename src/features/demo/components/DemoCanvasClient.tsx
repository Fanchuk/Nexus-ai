'use client'

import dynamic from "next/dynamic";

const DemoCanvas = dynamic(() => import("@/features/demo/components/DemoCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-105 w-full animate-pulse rounded-2xl border border-line bg-surface sm:h-130" />
  ),
});

export default DemoCanvas;