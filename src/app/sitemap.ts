import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";

const routes = [
  "",
  "/projects",
  "/projects/chaussez-vous-ou-pas",
  "/projects/framasoft",
  "/projects/intratone",
  "/projects/ios26",
  "/projects/namequest",
  "/projects/vahansoghomonian",
  "/projects/waveswitch",
  "/explorations",
  "/skills",
  "/contact",
  "/resume",
  "/legal",
  "/accessibility",
  "/sitemap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" || route === "/projects" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));
}
