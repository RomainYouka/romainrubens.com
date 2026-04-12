import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Seuls les domaines réellement utilisés sont autorisés
    remotePatterns: [
      {
        protocol: "https",
        hostname: "slelguoygbfzlpylpxfs.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
