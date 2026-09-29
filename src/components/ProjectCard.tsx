import Link from "next/link";
import { ExternalLink, Code2 } from "lucide-react";
import { hostingBadge, type Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card flex h-full min-w-0 flex-col overflow-hidden">
      {p.hasCover ? (
        <div className="aspect-video w-full overflow-hidden border-b" style={{ borderColor: "var(--border)" }}>
          <img
            src={p.media.cover}
            alt={`${p.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <div
          className="flex aspect-video w-full items-center justify-center border-b px-4 text-center"
          style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
        >
          <span className="clamp-2 px-2 text-sm font-bold sm:text-base">{p.title}</span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="prose-wrap text-xs font-semibold sm:text-sm" style={{ color: "var(--muted)" }}>
          {p.period} · {p.role}
        </p>
        <h3 className="prose-wrap mt-1 text-balance text-sm font-bold sm:text-base">{p.tagline}</h3>
        <p className="prose-wrap mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        {p.hasTodo ? (
          <p className="prose-wrap mt-2 text-xs font-semibold text-amber-600">TODO: details being added — {hostingBadge(p.demo.hosting)}</p>
        ) : (
          <p className="prose-wrap mt-2 text-xs" style={{ color: "var(--muted)" }}>{hostingBadge(p.demo.hosting)}</p>
        )}
        <div className="mt-4 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap">
          {p.links.live ? (
            <a className="btn-primary text-sm" href={p.links.live} target="_blank" rel="noreferrer">
              <ExternalLink size={14} className="shrink-0" /> Live
            </a>
          ) : null}
          {p.links.code && p.links.code !== "TODO" ? (
            <a className="btn-secondary break-all text-sm" href={p.links.code} target="_blank" rel="noreferrer">
              <Code2 size={14} className="shrink-0" /> Code
            </a>
          ) : null}
          <Link className="btn-secondary text-sm" href={`/projects/${p.slug}/`}>Case study</Link>
        </div>
      </div>
    </article>
  );
}
