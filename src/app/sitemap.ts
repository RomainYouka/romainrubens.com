import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romainrubens.com";

const routes = [
  "",
  "/projects",
  "/renaultextensionapp",
  "/googlemapsextension",
  "/stratosapp",
  "/projects/chaussez-vous-ou-pas",
  "/goupildigitalecosystem",
  "/googleplayonios",
  "/projects/intratone",
  "/projects/ios26",
  "/projects/namequest",
  "/projects/students",
  "/projects/vahansoghomonian",
  "/projects/waveswitch",
  "/articles",
  "/explorations",
  "/contact",
  "/resume",
  "/legal",
  "/accessibility",
  "/sitemap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" || route === "/projects" || route === "/articles" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/projects" || route === "/articles" ? 0.9 : 0.7,
  }));
}
