import { redirect } from "next/navigation";

// Preserve old bookmarks while the new résumé page is prepared.
export default function RetiredSkillsPage() {
  redirect("/cv");
}
