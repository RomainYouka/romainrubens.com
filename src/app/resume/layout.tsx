import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = { ...createPageMetadata({
  title: "Résumé",
  description: "Résumé de Romain Rubens — Product & Interaction Designer | Connected Ecosystems & Smart Home.",
  path: "/resume",
}), robots: { index: false, follow: false } };

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
