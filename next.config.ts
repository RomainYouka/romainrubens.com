import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/icons/logo-rubens.png",
        destination: "/icons/logo-rubens.svg",
        permanent: true,
      },
      {
        source: "/icons/icon.short.svg",
        destination: "/icons/logo-rubens.svg",
        permanent: true,
      },
      {
        source: "/icons/icon.short.white.svg",
        destination: "/icons/logo-rubens-white.svg",
        permanent: true,
      },
      {
        source: "/animations/logo-animation.json",
        destination: "/icons/icon.svg",
        permanent: true,
      },
      {
        source: "/icons/logo-animation_20260414110105.gif",
        destination: "/icons/android-chrome-192x192.png",
        permanent: true,
      },
      {
        source: "/lab/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    const legacyLogoHeaders = [
      "/icons/logo-rubens.png",
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

};

export default nextConfig;
