import Link from "next/link";
import { ExternalLink, Code2 } from "lucide-react";
import { hostingBadge, type Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="flex h-36 items-center justify-center border-b px-4 text-center" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>
        <span className="text-sm font-bold">{p.title}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>{p.period} · {p.role}</p>
        <h3 className="mt-1 font-bold">{p.tagline}</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{p.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        {p.hasTodo ? <p className="mt-2 text-xs font-semibold text-amber-600">TODO: details being added — {hostingBadge(p.demo.hosting)}</p> : <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>{hostingBadge(p.demo.hosting)}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.links.live ? <a className="btn-primary text-sm" href={p.links.live} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live</a> : null}
          {p.links.code && p.links.code !== "TODO" ? <a className="btn-secondary text-sm" href={p.links.code} target="_blank" rel="noreferrer"><Code2 size={14} /> Code</a> : null}
          <Link className="btn-secondary text-sm" href={`/projects/${p.slug}/`}>Case study</Link>
        </div>
      </div>
    </article>
  );
}
