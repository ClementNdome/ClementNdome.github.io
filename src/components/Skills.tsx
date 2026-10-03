type SkillGroup = { id: string; title: string; items: string[]; evidence: string[] };

export default function Skills({ groups, order }: { groups: SkillGroup[]; order: string[] }) {
  const sorted = [...groups].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return (
    <section id="skills" className="container-x scroll-mt-20 py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Skills</h2>
      <p className="mt-1 text-sm sm:text-base" style={{ color: "var(--muted)" }}>Each group links to projects that prove it.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {sorted.map((g) => (
          <div key={g.id} className="card h-full min-w-0 p-4 sm:p-5">
            <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{g.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
              {g.items.map((it) => <li key={it} className="prose-wrap min-w-0">{it}</li>)}
            </ul>
            <p className="prose-wrap mt-3 text-xs" style={{ color: "var(--muted)" }}>Evidence: {g.evidence.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
