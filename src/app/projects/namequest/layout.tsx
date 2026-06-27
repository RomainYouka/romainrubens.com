import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "NameQuest",
  description: "Projet de design UX/UI — NameQuest, application de recherche et génération de noms.",
  path: "/projects/namequest",
});

export default function NamequestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
