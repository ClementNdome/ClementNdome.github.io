import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clementndome.github.io";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/gis-rs/`, lastModified: now },
    { url: `${base}/web/`, lastModified: now },
    { url: `${base}/projects/`, lastModified: now },
    { url: `${base}/gis-rs/projects/`, lastModified: now },
    { url: `${base}/web/projects/`, lastModified: now },
  ];
  const all = getAllProjects().filter((p) => p.status !== "private");
  for (const p of all) {
    const lenses = p.lenses as string[];
    // Global canonical (general scope) for projects in the general lens.
    if (lenses.includes("general")) entries.push({ url: `${base}/projects/${p.slug}/`, lastModified: now });
    if (lenses.includes("gis-rs")) entries.push({ url: `${base}/gis-rs/projects/${p.slug}/`, lastModified: now });
    if (lenses.includes("web")) entries.push({ url: `${base}/web/projects/${p.slug}/`, lastModified: now });
  }
  return entries;
}
