import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Projets",
  description: "Projets de Romain Rubens, Product & Interaction Designer | Connected Ecosystems & Smart Home : interfaces, design systems et projets divers.",
  path: "/projects",
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
