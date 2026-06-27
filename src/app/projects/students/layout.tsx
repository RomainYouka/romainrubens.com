import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Stratos — Campus App",
  description: "Projet de design UX/UI — Stratos, application mobile pour campus universitaire.",
  path: "/projects/students",
});

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
