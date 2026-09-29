import ReactMarkdown from "react-markdown";
import Nav from "@/components/Nav";
import { getAllProjects, getProject } from "@/lib/content";
import { hostingBadge } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllProjects().filter((p) => p.status !== "private").map((p) => ({ slug: p.slug }));
}

export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.status === "private") notFound();
  return (
    <div>
      <Nav active="projects" />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm" style={{ color: "var(--muted)" }}>{p.period} · {p.role} · {p.org}</p>
        <h1 className="mt-2 text-3xl font-extrabold">{p.title}</h1>
        <p className="mt-2 text-lg" style={{ color: "var(--muted)" }}>{p.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>{hostingBadge(p.demo.hosting)}</p>
        <div className="mt-4 flex gap-2">
          {p.links.live ? <a className="btn-primary text-sm" href={p.links.live} target="_blank" rel="noreferrer">Live</a> : null}
          {p.links.code && p.links.code !== "TODO" ? <a className="btn-secondary text-sm" href={p.links.code} target="_blank" rel="noreferrer">Code</a> : null}
        </div>
        <div className="card mt-6 p-5 text-sm leading-relaxed">
          <ReactMarkdown>{p.body}</ReactMarkdown>
        </div>
        <div className="card mt-4 p-5 text-sm">
          <h2 className="font-bold">Summary</h2>
          <p className="mt-1">{p.summary}</p>
          {p.versions ? (
            <>
              <h2 className="mt-4 font-bold">Version history</h2>
              <ul className="list-disc pl-5">{p.versions.map((v) => <li key={v.label}>{v.label} · {v.period} — {v.note}</li>)}</ul>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
