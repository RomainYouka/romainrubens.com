import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Chaussez-vous ou pas",
  description: "Projet de design — Chaussez-vous ou pas, identité visuelle et branding.",
  path: "/projects/chaussez-vous-ou-pas",
});

export default function ChaussezLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
