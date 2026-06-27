import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Framasoft",
  description: "Projet de design UX/UI — refonte du site Framasoft, organisation française du logiciel libre.",
  path: "/projects/framasoft",
});

export default function FramasoftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
