import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p, projectsBase = "/projects" }: { p: Project; projectsBase?: string }) {
  const href = `${projectsBase}/${p.slug}/`;
  const tags = p.tags.slice(0, 4);
  const showLive = Boolean(p.links.live);
  const showCode = Boolean(p.links.code) && p.links.code !== "TODO";
  return (
    <article className="card flex h-full min-w-0 flex-col overflow-hidden transition-transform hover:-translate-y-0.5">
      <a href={href} aria-label={`View ${p.title} case study`} className="flex min-w-0 flex-1 flex-col">
        {p.hasCover ? (
          <div className="relative aspect-video w-full overflow-hidden border-b" style={{ borderColor: "var(--border)" }}>
            <Image
              src={p.media.cover}
              alt={`${p.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              style={{ objectFit: "cover", objectPosition: "top" }}
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
          <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{p.title}</h3>
          <p className="prose-wrap clamp-2 mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </div>
      </a>
      {showLive || showCode ? (
        <div className="flex flex-wrap gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
          {showLive ? (
            <a className="btn-primary text-sm" href={p.links.live!} target="_blank" rel="noreferrer">
              <ExternalLink size={14} className="shrink-0" /> Live
            </a>
          ) : null}
          {showCode ? (
            <a className="btn-secondary break-all text-sm" href={p.links.code!} target="_blank" rel="noreferrer">
              <GithubIcon size={14} /> GitHub
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
