import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Explorations",
  description: "Explorations créatives et expérimentations design de Romain Rubens.",
  path: "/explorations",
});

export default function ExplorationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
