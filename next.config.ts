import type { NextConfig } from "next";
import { resumePdfUrl, resumePdfPath, resumeDownloadName, frenchResumePdfUrl, frenchResumePdfPath, frenchResumeDownloadName } from "./src/lib/resume";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Keep the language-picker source for later; expose the common PDF for now.
      { source: "/resume", destination: resumePdfUrl, permanent: false },
      { source: "/resume/RUBENS_Romain_cv.pdf", destination: frenchResumePdfUrl, permanent: false },
      ...["/resume/RUBENS_Romain_Resume.pdf", "/resume/RUBENS_Romain_Ամփոփում.pdf"].map(source => ({ source: encodeURI(source), destination: resumePdfUrl, permanent: false })),
      { source: "/projects/framasoft", destination: "/projects", permanent: true },
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
      {
        source: frenchResumePdfPath,
        headers: [{ key: "Content-Disposition", value: `inline; filename="Romain Rubens (Resume).pdf"; filename*=UTF-8''${encodeURIComponent(frenchResumeDownloadName)}` }],
      },
      {
        source: resumePdfPath,
        headers: [{ key: "Content-Disposition", value: `inline; filename="${resumeDownloadName}"` }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/:folder(icons|projects|articles|resume|devices)/:path*.:ext(png|jpg|jpeg|webp|avif|svg|gif|webm|mp4|pdf|json)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
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
