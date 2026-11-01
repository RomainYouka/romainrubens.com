import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "NameQuest",
  description: "NameQuest, jeu de société éducatif et inclusif pour 2 à 6 joueurs, abordant les discriminations liées aux noms de famille.",
  path: "/projects/namequest",
});

export default function NamequestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
