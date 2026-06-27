import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "CV",
  description: "Curriculum vitae de Romain Rubens, designer UX/UI et designer d'interaction.",
  path: "/resume",
});

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
