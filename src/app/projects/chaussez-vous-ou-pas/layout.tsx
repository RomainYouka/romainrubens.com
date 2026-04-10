import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chaussez-vous ou pas",
  description: "Projet de design — Chaussez-vous ou pas, identité visuelle et branding.",
};

export default function ChaussezLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
