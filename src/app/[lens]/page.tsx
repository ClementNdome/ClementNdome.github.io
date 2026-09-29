import type { Metadata } from "next";
import LensPage from "@/components/LensPage";
import { getAllProjects, readJson } from "@/lib/content";
import type { Lens } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lens: "gis-rs" }, { lens: "web" }];
}

const lensMeta: Record<string, { title: string; description: string; og: string; canonical: string }> = {
  "gis-rs": {
    title: "Clement Ndome | GIS & Remote Sensing Engineer",
    description: "Earth observation, vegetation monitoring, early-warning and yield systems for East Africa.",
    og: "/og/og-gis-rs.png",
    canonical: "https://clementndome.github.io/gis-rs/",
  },
  web: {
    title: "Clement Ndome | WebGIS Developer",
    description: "Fast, clear interactive web maps and spatial dashboards, from PostGIS to the browser.",
    og: "/og/og-web.png",
    canonical: "https://clementndome.github.io/web/",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lens: string }> }): Promise<Metadata> {
  const { lens: lensKey } = await params;
  const m = lensMeta[lensKey];
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: {
      type: "website",
      url: m.canonical,
      siteName: "Clement Ndome",
      title: m.title,
      description: m.description,
      images: [{ url: m.og, width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [m.og] },
  };
}

export default async function LensRoute({ params }: { params: Promise<{ lens: string }> }) {
  const { lens: lensKey } = await params;
  if (lensKey !== "gis-rs" && lensKey !== "web") notFound();
  const profile = readJson<{ name: string; location: string; email: string; currently: string; socials: { github: string; linkedin: string; devstory: string; spationex: string }; formspree: string }>("profile.json");
  const lenses = readJson<Record<string, Lens>>("lenses.json");
  const lens = lenses[lensKey];
  const roles = readJson("experience.json") as Parameters<typeof LensPage>[0]["roles"];
  const skillGroups = readJson("skills.json") as Parameters<typeof LensPage>[0]["skillGroups"];
  const edu = readJson("education.json") as Parameters<typeof LensPage>[0]["edu"];
  const all = getAllProjects().filter((p) => p.status !== "private");
  const featured = lens.featuredProjects.map((s) => all.find((p) => p.slug === s)!).filter(Boolean);
  const moreWork = all.filter((p) => (p.lenses as string[]).includes(lensKey) && !lens.featuredProjects.includes(p.slug));
  return <LensPage lensKey={lensKey} lens={lens} profile={profile} featured={featured} moreWork={moreWork} roles={roles} skillGroups={skillGroups} edu={edu} />;
}
