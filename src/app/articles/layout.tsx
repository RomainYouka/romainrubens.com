import { createPageMetadata } from "@/lib/page-metadata";
import { articles } from "@/data/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";

export const metadata = createPageMetadata({
  title: "Articles",
  description:
    "Articles de Romain Rubens sur le design UX/UI, les écosystèmes connectés, la maison intelligente et la collaboration designer–développeur.",
  path: "/articles",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Articles — Romain Rubens",
  url: `${siteUrl}/articles`,
  description:
    "Articles de Romain Rubens sur le design UX/UI, les écosystèmes connectés et le design d'interaction.",
  isPartOf: { "@type": "WebSite", name: "Romain Rubens", url: siteUrl },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: article.href.FR,
      name: `${article.number} — ${article.title.FR}`,
    })),
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
