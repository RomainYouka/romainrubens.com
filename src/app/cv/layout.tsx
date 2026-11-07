import type { Metadata } from "next";
import { resumePdfUrl } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  alternates: { canonical: resumePdfUrl },
  robots: { index: false, follow: true },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
