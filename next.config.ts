import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(
  __dirname,
  "src/visual-edits/component-tagger-loader.js",
);
const isDev = process.env.NODE_ENV !== "production";

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
  eslint: { ignoreDuringBuilds: true },

  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.worf.replit.dev",
  ],

  ...(isDev && {
    turbopack: {
      rules: { "*.{jsx,tsx}": { loaders: [LOADER] } },
    },
  }),
};

export default nextConfig;
