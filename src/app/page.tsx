import type { Metadata } from "next";
import LensPage from "@/components/LensPage";
import { getAllProjects, readJson } from "@/lib/content";
import type { Lens } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Clement Ndome | Geospatial Software Engineer",
  description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools. Nairobi, Kenya.",
  alternates: { canonical: "https://clementndome.github.io/" },
  openGraph: {
    type: "website",
    url: "https://clementndome.github.io/",
    siteName: "Clement Ndome",
    title: "Clement Ndome | Geospatial Software Engineer",
    description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools.",
    images: [{ url: "/og/og-general.png", width: 1200, height: 630, alt: "Clement Ndome — Geospatial Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clement Ndome | Geospatial Software Engineer",
    description: "GIS, backend and applied AI: from spatial databases to deployed decision-support tools.",
    images: ["/og/og-general.png"],
  },
};

export default function Home() {
  const profile = readJson<{ name: string; location: string; email: string; currently: string; socials: { github: string; linkedin: string; devstory: string; spationex: string }; formspree: string }>("profile.json");
  const lenses = readJson<Record<string, Lens>>("lenses.json");
  const lens = lenses["general"];
  const roles = readJson("experience.json") as Parameters<typeof LensPage>[0]["roles"];
  const skillGroups = readJson("skills.json") as Parameters<typeof LensPage>[0]["skillGroups"];
  const edu = readJson("education.json") as Parameters<typeof LensPage>[0]["edu"];
  const all = getAllProjects().filter((p) => p.status !== "private");
  const featured = lens.featuredProjects.map((s) => all.find((p) => p.slug === s)!).filter(Boolean);
  const moreWork = all.filter((p) => p.lenses.includes("general") && !lens.featuredProjects.includes(p.slug));
  return <LensPage lensKey="general" lens={lens} profile={profile} featured={featured} moreWork={moreWork} roles={roles} skillGroups={skillGroups} edu={edu} />;
}
