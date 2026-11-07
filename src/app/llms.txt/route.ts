import skills from "@/data/skills.json";
import { articles } from "@/data/articles";
import { jobTitle, profileDescriptions } from "@/lib/profile";
import { resumePdfUrl, frenchResumePdfUrl } from "@/lib/resume";

export const dynamic = "force-static";

// Public summary only; no account, analytics or administration data.
const projects = [
  ["Renault App Extension", "/renaultextensionapp", "Projet académique d’extension de l’application Renault, avec Erwan Hodonou, sur les quotas de mobilité partagés."],
  ["Google Maps App Extension", "/googlemapsextension", "Projet de navigation accessible dans le pôle multimodal de Perrache à Lyon, avec cartes par étage, recherche utilisateur et adaptations pour Google Maps, Plans et TCL."],
  ["Stratos — Campus App", "/stratosapp", "Concept d’application pour connecter les étudiants de Strate autour d’événements et de conversations de groupe."],
  ["Intratone", "/projects/intratone", "Refonte de l’application de gestion des accès résidentiels."],
  ["iOS 26", "/projects/ios26", "Exploration de concepts d’interface pour iOS 26."],
  ["Wave Switch", "/projects/waveswitch", "Interface de contrôle sonore."],
  ["Goupil", "/goupildigitalecosystem", "Projet de stage : recherche UX, stratégie produit et écosystème de services numériques pour les véhicules utilitaires électriques Goupil. Création du design system SyGo, fondations, composants et interfaces de configuration, pièces, support et formation."],
  ["Google Play on iOS", "/googleplayonios", "Concept Google Play adapté à iOS : distribution alternative dans l’Union européenne, règles d’interface, composants natifs et design system."],
  ["NameQuest", "/projects/namequest", "Jeu de société éducatif et inclusif abordant les discriminations liées aux noms de famille, pour 2 à 6 joueurs dès 12 ans."],
  ["Vahan Soghomonian", "/projects/vahansoghomonian", "Site portfolio pour l’artiste Vahan Soghomonian."],
  ["Chaussez-vous ou pas", "/projects/chaussez-vous-ou-pas", "Identité visuelle et branding."],
];

const absolute = (url: string) => url.startsWith("/") ? `https://romainrubens.com${url}` : url;

export function GET() {
  const text = [
    "# Romain Rubens",
    `> Portfolio officiel — ${jobTitle}.`,
    profileDescriptions.FR,
    "Intérêts : écosystèmes connectés, interfaces de service et usages du quotidien. Langues du site : français, anglais et arménien.",
    "Les projets sont présentés comme des travaux de design ; la présence d’une marque ne constitue pas une preuve d’emploi ou de partenariat avec celle-ci. Consulter les études de cas pour le contexte et les détails.",
    "## Pages de référence",
    ...["/", "/projects", "/contact", "/articles", "/explorations"].map(url => `- [${url}](${absolute(url)})`),
    `- [Résumé français (PDF)](${absolute(frenchResumePdfUrl)})`,
    `- [English resume (PDF)](${absolute(resumePdfUrl)})`,
    "## Projets",
    ...projects.map(([name, url, description]) => `- [${name}](${absolute(url)}): ${description}`),
    "## Compétences",
    "Les notes publiées sont des autoévaluations sur 5, pas des certifications.",
    ...skills.categories.map(category => `### ${category.names.FR}\n${category.skills.map(skill => `- ${skill.names.FR}: ${skill.rating}/5`).join("\n")}`),
    "## Contact et profils publics",
    "- [Email](mailto:hello@romainrubens.com)",
    "- [Rendez-vous](https://cal.com/romainrubens)",
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
