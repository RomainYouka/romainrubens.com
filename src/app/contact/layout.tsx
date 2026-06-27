import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Prenez contact avec Romain Rubens — designer UX/UI disponible pour des opportunités professionnelles.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
