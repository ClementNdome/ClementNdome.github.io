"use client";
import * as React from "react";
import { ProjectDetailBody } from "./ProjectDetail";

export type ProjectFilterItem = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  cover: string;
  hasCover: boolean;
  live: string | null;
  code: string | null;
  body: string;
  gallery: string[];
  versions?: { label: string; period: string; note: string }[];
};

const TAG_ALIASES: Record<string, string> = {
  GEE: "Google Earth Engine",
};

function displayTag(tag: string) {
  return TAG_ALIASES[tag] ?? tag;
}

export default function ProjectFilter({ projects, projectsBase = "/projects" }: { projects: ProjectFilterItem[]; projectsBase?: string }) {
  const [selected, setSelected] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) for (const t of p.tags) set.add(displayTag(t));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const visible = React.useMemo(() => {
    if (!selected) return projects;
    return projects.filter((p) => p.tags.some((t) => displayTag(t) === selected));
  }, [projects, selected]);

  return (
    <div>
      <div role="group" aria-label="Filter projects by tag" className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selected === null}
          onClick={() => setSelected(null)}
          className="tag tag-btn"
          style={selected === null ? { background: "var(--accent)", color: "#fff" } : undefined}
        >
          All
        </button>
        {allTags.map((t) => {
          const isActive = selected === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(isActive ? null : t)}
              className="tag tag-btn"
              style={isActive ? { background: "var(--accent)", color: "#fff" } : undefined}
            >
              {t}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
        Showing {visible.length} of {projects.length} projects{selected ? ` tagged “${selected}”` : ""}.
      </p>
      <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        {visible.map((p) => (
          <article key={p.slug} className="card min-w-0 p-4 sm:p-6">
            <ProjectDetailBody
              p={{ slug: p.slug, title: p.title, tagline: p.tagline, tags: p.tags, hasCover: p.hasCover, media: { cover: p.cover, gallery: p.gallery }, links: { live: p.live, code: p.code }, body: p.body, versions: p.versions }}
              headingId={p.slug}
              singleImage
            />
            <p className="mt-3 text-[13px]">
              <a href={`${projectsBase}/${p.slug}/`} className="font-semibold underline underline-offset-4" style={{ color: "var(--muted)" }}>
                Standalone page ↗
              </a>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
