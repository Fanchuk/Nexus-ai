import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ["pdf-parse"],
  images: {
    remotePatterns: [{ hostname: "*.ufs.sh" }, { hostname: "utfs.io" }],
  },
};

export default nextConfig;