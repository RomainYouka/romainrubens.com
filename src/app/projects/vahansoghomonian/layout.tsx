import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Vahan Soghomonian",
  description: "Projet de design — site portfolio pour l'artiste Vahan Soghomonian.",
  path: "/projects/vahansoghomonian",
});

export default function VahanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
