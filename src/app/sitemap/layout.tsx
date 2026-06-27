import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Plan du site",
  description: "Plan du site romainrubens.com — liste complète des pages et sections disponibles.",
  path: "/sitemap",
});

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
