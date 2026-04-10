import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    qualities: [85, 90, 95, 100],
  },

  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
