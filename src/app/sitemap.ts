import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clementndome.github.io";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/gis-rs/`, lastModified: new Date() },
    { url: `${base}/web/`, lastModified: new Date() },
    { url: `${base}/projects/`, lastModified: new Date() },
  ];
}
