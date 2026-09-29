import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import Nav from "@/components/Nav";
import { getAllProjects, getProject } from "@/lib/content";
import { hostingBadge } from "@/lib/projects";
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
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Nav home="/" showSections={false} />
      <main className="container-x min-w-0 w-full max-w-3xl flex-1 py-8 sm:py-10 lg:max-w-4xl">
        <p className="prose-wrap text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{p.period} · {p.role} · {p.org}</p>
        <h1 className="h1-fluid mt-2 font-extrabold">{p.title}</h1>
        <p className="mt-2 max-w-2xl text-balance text-base sm:text-lg" style={{ color: "var(--muted)" }}>{p.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        <p className="prose-wrap mt-3 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{hostingBadge(p.demo.hosting)}</p>
        <div className="mt-4 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap">
          {p.links.live ? <a className="btn-primary text-sm" href={p.links.live} target="_blank" rel="noreferrer">Live</a> : null}
          {p.links.code && p.links.code !== "TODO" ? <a className="btn-secondary break-all text-sm" href={p.links.code} target="_blank" rel="noreferrer">Code</a> : null}
        </div>
        {p.hasCover ? (
          <figure className="card mt-6 min-w-0 overflow-hidden">
            <img src={p.media.cover} alt={`${p.title} screenshot`} loading="lazy" className="h-auto w-full object-cover" />
          </figure>
        ) : null}
        {p.media.gallery.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {p.media.gallery.map((g) => (
              <figure key={g} className="card min-w-0 overflow-hidden">
                <img src={g} alt={`${p.title} screenshot`} loading="lazy" className="h-auto w-full object-cover" />
              </figure>
            ))}
          </div>
        ) : null}
        <div className="card prose-wrap mt-6 min-w-0 p-4 text-sm leading-relaxed sm:p-5 sm:text-[0.95rem]">
          <ReactMarkdown>{p.body}</ReactMarkdown>
        </div>
        <div className="card prose-wrap mt-4 min-w-0 p-4 text-sm sm:p-5">
          <h2 className="font-bold">Summary</h2>
          <p className="mt-1 leading-relaxed">{p.summary}</p>
          {p.versions ? (
            <>
              <h2 className="mt-4 font-bold">Version history</h2>
              <ul className="mt-1 list-disc space-y-1 pl-5">{p.versions.map((v) => <li key={v.label} className="prose-wrap">{v.label} · {v.period} — {v.note}</li>)}</ul>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
