import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
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
  const all = getAllProjects().filter((p) => p.status !== "private");
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Nav home="/" showSections={false} />
      <main className="container-x min-w-0 flex-1 py-8 sm:py-10">
        <h1 className="h1-fluid font-extrabold">All projects</h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--muted)" }}>Selected work with live demos and case studies.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {all.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}/`} className="card block h-full min-w-0 p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
              <p className="prose-wrap text-xs font-semibold sm:text-sm" style={{ color: "var(--muted)" }}>{p.period}</p>
              <h2 className="prose-wrap mt-1 text-balance font-bold">{p.title}</h2>
              <p className="prose-wrap clamp-2 mt-1 text-sm" style={{ color: "var(--muted)" }}>{p.tagline}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
