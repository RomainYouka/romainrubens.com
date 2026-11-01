import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: `/${string}`;
}

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: [
      "Romain Rubens",
      "UX UI designer",
      "Smart Ecosystems",
      "design d'interaction",
      "maison connectée",
      "portfolio designer",
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Romain Rubens",
      title,
      description,
      url: path,
      images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icons/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
