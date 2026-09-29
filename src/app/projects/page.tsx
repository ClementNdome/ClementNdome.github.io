import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import ProjectFilter, { type ProjectFilterItem } from "@/components/ProjectFilter";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "All projects",
  description: "Selected GIS, WebGIS and applied-AI work with live demos and case studies.",
  alternates: { canonical: "https://clementndome.github.io/projects/" },
  openGraph: {
    type: "website",
    url: "https://clementndome.github.io/projects/",
    siteName: "Clement Ndome",
    title: "All projects — Clement Ndome",
    description: "Selected GIS, WebGIS and applied-AI work with live demos and case studies.",
    images: [{ url: "/og/og-general.png", width: 1200, height: 630, alt: "All projects — Clement Ndome" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All projects — Clement Ndome",
    description: "Selected GIS, WebGIS and applied-AI work with live demos and case studies.",
    images: ["/og/og-general.png"],
  },
};

export default function ProjectsIndex() {
  // NOTE: lenses deliberately stripped here — the public filter is tags-only.
  const items: ProjectFilterItem[] = getAllProjects()
    .filter((p) => p.status !== "private")
    .map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline, period: String(p.period), tags: [...p.tags] }));
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Nav home="/" showSections={false} />
      <main className="container-x min-w-0 flex-1 py-8 sm:py-10">
        <h1 className="h1-fluid font-extrabold">All projects</h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--muted)" }}>Selected work with live demos and case studies.</p>
        <ProjectFilter projects={items} />
      </main>
      <BackToTop />
    </div>
  );
}
