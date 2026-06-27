import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Intratone",
  description: "Projet de design UX/UI — refonte de l'application Intratone pour la gestion des accès résidentiels.",
  path: "/projects/intratone",
});

export default function IntratoneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
