import LensPage from "@/components/LensPage";
import { getAllProjects, readJson } from "@/lib/content";
import type { Lens } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lens: "gis-rs" }, { lens: "web" }];
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
