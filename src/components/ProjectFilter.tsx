"use client";
import * as React from "react";
import Link from "next/link";

export type ProjectFilterItem = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  tags: string[];
};

const TAG_ALIASES: Record<string, string> = {
  GEE: "Google Earth Engine",
};

function displayTag(tag: string) {
  return TAG_ALIASES[tag] ?? tag;
}

export default function ProjectFilter({ projects }: { projects: ProjectFilterItem[] }) {
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
      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {visible.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}/`} className="card block h-full min-w-0 p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
            <p className="prose-wrap text-xs font-semibold sm:text-sm" style={{ color: "var(--muted)" }}>{p.period}</p>
            <h2 className="prose-wrap mt-1 text-balance font-bold">{p.title}</h2>
            <p className="prose-wrap clamp-2 mt-1 text-sm" style={{ color: "var(--muted)" }}>{p.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
