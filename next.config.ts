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
};

export default nextConfig;
