import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Renault App Extension",
  description: "Projet de design UX/UI — extension de l'application Renault pour améliorer l'expérience conducteur.",
  path: "/projects/renault",
});

export default function RenaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
