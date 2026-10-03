import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { getAllProjects, getProject } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllProjects().filter((p) => p.status !== "private").map((p) => ({ slug: p.slug }));
}

function ogForLens(lens: string) {
  if (lens === "web") return "/og/og-web.png";
  if (lens === "gis-rs") return "/og/og-gis-rs.png";
  return "/og/og-general.png";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.status === "private") return {};
  const og = ogForLens((p.lenses as string[])[0] ?? "general");
  const canonical = `https://clementndome.github.io/projects/${slug}/`;
  return {
    title: `${p.title}`,
    description: p.tagline,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Clement Ndome",
      title: `${p.title} — Clement Ndome`,
      description: p.tagline,
      images: [{ url: og, width: 1200, height: 630, alt: `${p.title} — Clement Ndome` }],
    },
    twitter: { card: "summary_large_image", title: `${p.title} — Clement Ndome`, description: p.tagline, images: [og] },
  };
}

export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.status === "private") notFound();
  const siblings = getAllProjects().filter((q) => q.status !== "private" && (q.lenses as string[]).some((l) => (p.lenses as string[]).includes(l)));
  return <ProjectDetail p={p} home="/" projectsBase="/projects" backLabel="All projects" siblings={siblings} />;
}
