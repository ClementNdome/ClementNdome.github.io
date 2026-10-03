import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import type { Project } from "@/lib/projects";

type Props = {
  p: Project;
  home: string;
  projectsBase: string;
  backLabel: string;
  siblings?: Project[];
};

export default function ProjectDetail({ p, home, projectsBase, backLabel, siblings = [] }: Props) {
  const related = siblings.filter((s) => s.slug !== p.slug).slice(0, 6);
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Nav home={home} showSections={false} />
      <main className="container-x min-w-0 w-full max-w-3xl flex-1 py-8 sm:py-10 lg:max-w-4xl">
        <Link href={`${projectsBase}/`} className="text-sm font-semibold underline underline-offset-4" style={{ color: "var(--muted)" }}>
          ← {backLabel}
        </Link>
        <h1 className="h1-fluid mt-2 font-extrabold">{p.title}</h1>
        <p className="mt-2 max-w-2xl text-balance text-base sm:text-lg" style={{ color: "var(--muted)" }}>{p.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        <div className="mt-4 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap">
          {p.links.live ? <a className="btn-primary text-sm" href={p.links.live} target="_blank" rel="noreferrer">Live</a> : null}
          {p.links.code && p.links.code !== "TODO" ? <a className="btn-secondary break-all text-sm" href={p.links.code} target="_blank" rel="noreferrer">GitHub</a> : null}
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
          {p.versions ? (
            <>
              <h2 className="mt-4 font-bold">Version history</h2>
              <ul className="mt-1 list-disc space-y-1 pl-5">{p.versions.map((v) => <li key={v.label} className="prose-wrap">{v.label} · {v.period} — {v.note}</li>)}</ul>
            </>
          ) : null}
        </div>
        {related.length > 0 ? (
          <div className="card mt-4 min-w-0 p-4 text-sm sm:p-5">
            <h2 className="font-bold">More in this view</h2>
            <ul className="mt-2 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`${projectsBase}/${r.slug}/`} className="font-semibold underline underline-offset-4">
                    {r.title}
                  </Link>
                  <span style={{ color: "var(--muted)" }}> — {r.tagline}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>
      <BackToTop />
    </div>
  );
}
