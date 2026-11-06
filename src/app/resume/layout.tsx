import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "CV",
  description: "Curriculum vitae de Romain Rubens — Product & Interaction Designer | Connected Ecosystems & Smart Home.",
  path: "/resume",
});

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
