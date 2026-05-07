import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/icons/logo-rubens.png",
        destination: "/icons/icon.svg",
        permanent: true,
      },
      {
        source: "/lab/world",
        destination: "/lab",
        permanent: false,
      },
    ];
  },
  async headers() {
    const legacyLogoHeaders = [
      "/icons/logo-animation_20260414110105.gif",
      "/icons/logo-star-animated.gif",
      "/animations/logo-animation.json",
      "/resume/RUBENS_Romain_Logo_Guidelines_FR.pdf",
      "/resume/RUBENS_Romain_Logo_Guidelines_EN.pdf",
    ];

    return [
      ...legacyLogoHeaders.map((source) => ({
        source,
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noimageindex, noarchive",
          },
        ],
      })),
      {
        source: "/lab/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
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
