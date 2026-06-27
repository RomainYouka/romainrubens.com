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
    alternates: { canonical: path },
    openGraph: {
      type: "website",
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
  };
}
