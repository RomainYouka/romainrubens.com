import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site romainrubens.com — éditeur, hébergement, propriété intellectuelle et données personnelles.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
