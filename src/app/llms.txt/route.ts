import skills from "@/data/skills.json";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

// Public summary only; no account, analytics or administration data.
const projects = [
  ["Intratone", "/projects/intratone", "Refonte de l’application de gestion des accès résidentiels."],
  ["iOS 26", "/projects/ios26", "Exploration de concepts d’interface pour iOS 26."],
  ["Wave Switch", "/projects/waveswitch", "Interface de contrôle sonore."],
  ["Google Maps App Extension", "https://www.behance.net/gallery/247000211/Google-Maps-App-Extension", "Projet d’extension de l’expérience Google Maps."],
  ["Google Play on iOS", "https://www.behance.net/gallery/246858627/Google-Play-on-iOS", "Concept Google Play adapté à iOS."],
  ["Renault App Extension", "https://www.behance.net/gallery/246976591/Renault-App-Extension", "Projet d’extension de l’application Renault."],
  ["Stratos — Campus App", "https://www.behance.net/gallery/247046537/Stratos-Campus-App", "Application de campus universitaire."],
  ["Framasoft", "/projects/framasoft", "Refonte UX/UI du site Framasoft."],
  ["Goupil", "https://www.behance.net/gallery/253535235/Goupil-Digital-Ecosystem-UXUI-Design-System", "Écosystème digital et design system."],
  ["NameQuest", "/projects/namequest", "Jeu de société éducatif et inclusif abordant les discriminations liées aux noms de famille, pour 2 à 6 joueurs dès 12 ans."],
  ["Vahan Soghomonian", "/projects/vahansoghomonian", "Site portfolio pour l’artiste Vahan Soghomonian."],
  ["Chaussez-vous ou pas", "/projects/chaussez-vous-ou-pas", "Identité visuelle et branding."],
];

const absolute = (url: string) => url.startsWith("/") ? `https://romainrubens.com${url}` : url;

export function GET() {
  const text = [
    "# Romain Rubens",
    "> Portfolio officiel — UX/UI Designer · Smart Ecosystems.",
    "Étudiant en design industriel avec une pratique centrée sur l’UX/UI et le design d’interaction. Son travail porte sur la manière dont les interfaces s’organisent dans des usages réels, des contraintes concrètes et des systèmes du quotidien.",
    "Intérêts : écosystèmes connectés, interfaces de service et usages du quotidien. Langues du site : français, anglais et arménien.",
    "Les projets sont présentés comme des travaux de design ; la présence d’une marque ne constitue pas une preuve d’emploi ou de partenariat avec celle-ci. Consulter les études de cas pour le contexte et les détails.",
    "## Pages de référence",
    ...["/", "/projects", "/skills", "/contact", "/resume", "/articles", "/explorations"].map(url => `- [${url}](${absolute(url)})`),
    "## Projets",
    ...projects.map(([name, url, description]) => `- [${name}](${absolute(url)}): ${description}`),
    "## Compétences",
    "Les notes publiées sont des autoévaluations sur 5, pas des certifications.",
    ...skills.categories.map(category => `### ${category.names.FR}\n${category.skills.map(skill => `- ${skill.names.FR}: ${skill.rating}/5`).join("\n")}`),
    "## Contact et profils publics",
    "- [Email](mailto:hello@romainrubens.com)",
    "- [Rendez-vous](https://www.cal.eu/romainrubens)",
    "- [LinkedIn](https://www.linkedin.com/in/romain-rubens-ba660323b/)",
    "- [Behance](https://www.behance.net/rubensromain)",
    "- [Medium](https://medium.com/@romainrubens)",
    "- [Pinterest](https://www.pinterest.com/rubensromain/_created)",
    "## Articles",
    ...articles.map(article => `- [${article.title.FR}](${article.href.FR}) — [English](${article.href.EN})`),
    "## Exploration",
    "- [Sitemap XML](https://romainrubens.com/sitemap.xml)",
    "Les pages publiques liées ci-dessus font autorité et contiennent davantage de détails que ce résumé.",
  ].join("\n\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
