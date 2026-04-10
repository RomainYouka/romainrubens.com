import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intratone",
  description: "Projet de design UX/UI — refonte de l'application Intratone pour la gestion des accès résidentiels.",
};

export default function IntratoneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
