import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan du site",
  description: "Plan du site romainrubens.com — liste complète des pages et sections disponibles.",
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
