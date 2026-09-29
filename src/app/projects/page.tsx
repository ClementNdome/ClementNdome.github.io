import Link from "next/link";
import Nav from "@/components/Nav";
import { getAllProjects } from "@/lib/content";

export default function ProjectsIndex() {
  const all = getAllProjects().filter((p) => p.status !== "private");
  return (
    <div>
      <Nav active="projects" />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">All projects</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>Filter by lens via the project pages. Featured per lens are marked.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {all.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}/`} className="card p-5">
              <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{p.period} · {(p.lenses as string[]).join(" / ")}</p>
              <h2 className="mt-1 font-bold">{p.title}</h2>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{p.tagline}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
