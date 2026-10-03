import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { getAllProjects, getProject, readJson } from "@/lib/content";
import type { Lens } from "@/lib/projects";
import { notFound } from "next/navigation";

function ogForLens(lens: string) {
  if (lens === "web") return "/og/og-web.png";
  if (lens === "gis-rs") return "/og/og-gis-rs.png";
  return "/og/og-general.png";
}

export function generateStaticParams() {
  const all = getAllProjects().filter((p) => p.status !== "private");
  const params: { lens: string; slug: string }[] = [];
  for (const lens of ["gis-rs", "web"] as const) {
    for (const p of all) {
      if ((p.lenses as string[]).includes(lens)) params.push({ lens, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lens: string; slug: string }> }): Promise<Metadata> {
  const { lens: lensKey, slug } = await params;
  const p = getProject(slug);
  if (!p || p.status === "private" || !(p.lenses as string[]).includes(lensKey)) return {};
  const og = ogForLens(lensKey);
  // Hybrid SEO rule: lens variant canonicalizes to the global case study.
  const canonical = `https://clementndome.github.io/projects/${slug}/`;
  return {
    title: `${p.title}`,
    description: p.tagline,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: `https://clementndome.github.io/${lensKey}/projects/${slug}/`,
      siteName: "Clement Ndome",
      title: `${p.title} — Clement Ndome`,
      description: p.tagline,
      images: [{ url: og, width: 1200, height: 630, alt: `${p.title} — Clement Ndome` }],
    },
    twitter: { card: "summary_large_image", title: `${p.title} — Clement Ndome`, description: p.tagline, images: [og] },
  };
}

export default async function LensProjectRoute({ params }: { params: Promise<{ lens: string; slug: string }> }) {
  const { lens: lensKey, slug } = await params;
  if (lensKey !== "gis-rs" && lensKey !== "web") notFound();
  const p = getProject(slug);
  if (!p || p.status === "private" || !(p.lenses as string[]).includes(lensKey)) notFound();
  const lenses = readJson<Record<string, Lens>>("lenses.json");
  const lens = lenses[lensKey];
  const siblings = getAllProjects().filter((q) => q.status !== "private" && (q.lenses as string[]).includes(lensKey));
  const projectsBase = `/${lensKey}/projects`;
  return <ProjectDetail p={p} home={lens.route} projectsBase={projectsBase} backLabel={`${lens.label} projects`} siblings={siblings} />;
}
