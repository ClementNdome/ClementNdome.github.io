type Bullet = { text: string; lenses: string[]; source: string };
type Role = { id: string; title: string; org: string; location: string; period: string; type: string; note?: string; bullets: Bullet[] };

export default function Experience({ roles, lensKey }: { roles: Role[]; lensKey: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-extrabold">Experience</h2>
      <div className="mt-4 space-y-4">
        {roles.map((r) => {
          const bullets = r.bullets.filter((b) => b.lenses.includes(lensKey) || b.lenses.includes("general"));
          if (bullets.length === 0) return null;
          return (
            <div key={r.id} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-bold">{r.title} — {r.org}</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>{r.location} · {r.period}</p>
                </div>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
                {bullets.map((b, i) => <li key={i}>{b.text}</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
