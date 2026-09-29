type Bullet = { text: string; lenses: string[]; source: string };
type Role = { id: string; title: string; org: string; location: string; period: string; type: string; note?: string; bullets: Bullet[] };

export default function Experience({ roles, lensKey }: { roles: Role[]; lensKey: string }) {
  return (
    <section id="experience" className="container-x scroll-mt-20 py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Experience</h2>
      <div className="mt-4 space-y-4">
        {roles.map((r) => {
          const bullets = r.bullets.filter((b) => b.lenses.includes(lensKey) || b.lenses.includes("general"));
          if (bullets.length === 0) return null;
          return (
            <div key={r.id} className="card min-w-0 p-4 sm:p-5">
              <div className="min-w-0">
                <h3 className="prose-wrap text-balance text-base font-bold sm:text-lg">{r.title} — {r.org}</h3>
                <p className="prose-wrap mt-0.5 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{r.location} · {r.period}</p>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed sm:text-[0.95rem]">
                {bullets.map((b, i) => <li key={i} className="prose-wrap min-w-0">{b.text}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
