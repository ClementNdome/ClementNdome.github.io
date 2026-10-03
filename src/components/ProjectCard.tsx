import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p, projectsBase = "/projects" }: { p: Project; projectsBase?: string }) {
  const href = `${projectsBase}/${p.slug}/`;
  const tags = p.tags.slice(0, 3);
  return (
    <article className="card min-w-0 overflow-hidden transition-transform hover:-translate-y-0.5">
      <a href={href} aria-label={`View ${p.title} case study`} className="flex min-w-0 items-center gap-3 p-3 sm:gap-4 sm:p-4">
        {p.hasCover ? (
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border sm:h-24 sm:w-36" style={{ borderColor: "var(--border)" }}>
            <Image
              src={p.media.cover}
              alt={`${p.title} screenshot`}
              fill
              sizes="(max-width: 640px) 112px, 144px"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        ) : (
          <div
            className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg border px-2 text-center sm:h-24 sm:w-36"
            style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
          >
            <span className="clamp-2 text-xs font-bold sm:text-sm">{p.title}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="prose-wrap truncate text-sm font-bold sm:text-base">{p.title}</h3>
          <p className="prose-wrap mt-0.5 truncate text-[13px] leading-snug sm:text-sm" style={{ color: "var(--muted)" }}>{p.tagline}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </div>
      </a>
    </article>
  );
}
