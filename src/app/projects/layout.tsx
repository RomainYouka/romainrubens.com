import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Projets",
  description: "Sélection de projets de design UX/UI de Romain Rubens — applications mobiles, sites web et projets divers.",
  path: "/projects",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
