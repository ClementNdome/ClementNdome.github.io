import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import ProjectFilter, { type ProjectFilterItem } from "@/components/ProjectFilter";
import { getAllProjects, readJson } from "@/lib/content";
import type { Lens } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lens: "gis-rs" }, { lens: "web" }];
}

const lensMeta: Record<string, { title: string; description: string; og: string; canonical: string; home: string }> = {
  "gis-rs": {
    title: "GIS & Remote Sensing projects",
    description: "Earth observation, vegetation monitoring, early-warning and yield systems for East Africa.",
    og: "/og/og-gis-rs.png",
    canonical: "https://clementndome.github.io/gis-rs/projects/",
    home: "/gis-rs",
  },
  web: {
    title: "WebGIS projects",
    description: "Fast, clear interactive web maps and spatial dashboards, from PostGIS to the browser.",
    og: "/og/og-web.png",
    canonical: "https://clementndome.github.io/web/projects/",
    home: "/web",
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
      title: `${m.title} | Clement Ndome`,
      description: m.description,
      images: [{ url: m.og, width: 1200, height: 630, alt: `${m.title} — Clement Ndome` }],
    },
    twitter: { card: "summary_large_image", title: `${m.title} | Clement Ndome`, description: m.description, images: [m.og] },
  };
}

export default async function LensProjectsIndex({ params }: { params: Promise<{ lens: string }> }) {
  const { lens: lensKey } = await params;
  if (lensKey !== "gis-rs" && lensKey !== "web") notFound();
  const m = lensMeta[lensKey];
  const lenses = readJson<Record<string, Lens>>("lenses.json");
  const lens = lenses[lensKey];
  // NOTE: lenses filtered server-side here — the public filter stays tags-only.
  const items: ProjectFilterItem[] = getAllProjects()
    .filter((p) => p.status !== "private" && (p.lenses as string[]).includes(lensKey))
    .map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline, tags: [...p.tags], cover: p.media.cover, hasCover: p.hasCover, live: p.links.live ?? null, code: p.links.code ?? null, body: p.body, gallery: [...p.media.gallery], versions: p.versions }));
  const projectsBase = `/${lensKey}/projects`;
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Nav home={m.home} showSections={false} />
      <main className="container-x min-w-0 flex-1 py-8 sm:py-10">
        <Link href={`${m.home}/`} className="text-sm font-semibold underline underline-offset-4" style={{ color: "var(--muted)" }}>
          ← Back to {lens.label}
        </Link>
        <h1 className="h1-fluid mt-3 font-extrabold">{m.title}</h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--muted)" }}>{m.description}</p>
        <ProjectFilter projects={items} projectsBase={projectsBase} />
      </main>
      <BackToTop />
    </div>
  );
}
