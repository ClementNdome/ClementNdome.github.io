type SkillGroup = { id: string; title: string; items: string[]; evidence: string[] };

export default function Skills({ groups, order }: { groups: SkillGroup[]; order: string[] }) {
  const sorted = [...groups].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-extrabold">Skills</h2>
      <p className="text-sm" style={{ color: "var(--muted)" }}>Each group links to projects that prove it.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((g) => (
          <div key={g.id} className="card p-5">
            <h3 className="font-bold">{g.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {g.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
            <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>Evidence: {g.evidence.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
