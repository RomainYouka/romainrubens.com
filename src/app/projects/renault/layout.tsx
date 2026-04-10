import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renault App Extension",
  description: "Projet de design UX/UI — extension de l'application Renault pour améliorer l'expérience conducteur.",
};

export default function RenaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
