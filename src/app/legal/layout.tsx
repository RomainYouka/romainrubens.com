import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site romainrubens.com — éditeur, hébergement, propriété intellectuelle et données personnelles.",
  path: "/legal",
});

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
