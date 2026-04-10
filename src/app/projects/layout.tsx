import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description: "Sélection de projets de design UX/UI de Romain Rubens — applications mobiles, sites web et projets divers.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
