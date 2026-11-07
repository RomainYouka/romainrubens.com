import type { Metadata } from "next";
import { frenchResumePdfUrl } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  alternates: { canonical: frenchResumePdfUrl },
  robots: { index: false, follow: true },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
