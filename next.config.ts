import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    qualities: [85, 90, 95, 100],
  },

  distDir: ".next",

  typescript: { ignoreBuildErrors: true },

  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.worf.replit.dev",
  ],
};

export default nextConfig;
