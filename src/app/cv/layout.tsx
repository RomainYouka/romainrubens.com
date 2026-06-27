import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
