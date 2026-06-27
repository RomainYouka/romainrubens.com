import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retour à l'accueil",
  robots: { index: false, follow: false },
};

export default function ResumeSplashLayout({ children }: { children: React.ReactNode }) {
  return children;
}
