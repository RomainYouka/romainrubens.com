import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NameQuest",
  description: "Projet de design UX/UI — NameQuest, application de recherche et génération de noms.",
};

export default function NamequestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
