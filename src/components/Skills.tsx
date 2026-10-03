type SkillGroup = { id: string; title: string; items: string[]; evidence?: string[] };

const SPOTLIGHT_COUNT = 4;

export default function Skills({ groups, order }: { groups: SkillGroup[]; order: string[] }) {
  const sorted = [...groups].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  const spotlight = sorted.slice(0, SPOTLIGHT_COUNT);
  const rest = sorted.slice(SPOTLIGHT_COUNT);
  return (
    <section id="skills" className="container-x scroll-mt-20 py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Skills</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {spotlight.map((g) => (
          <div key={g.id} className="card h-full min-w-0 p-3 sm:p-5">
            <h3 className="prose-wrap text-balance text-[13px] font-bold sm:text-base">{g.title}</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed sm:text-sm">
              {g.items.map((it) => <li key={it} className="prose-wrap min-w-0">{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
      {rest.length > 0 ? (
        <div className="card mt-4 min-w-0 p-4 sm:p-5">
          <h3 className="text-sm font-bold sm:text-base">Also in the toolkit</h3>
          <dl className="mt-2 space-y-2 text-sm leading-relaxed">
            {rest.map((g) => (
              <div key={g.id} className="min-w-0">
                <dt className="prose-wrap inline font-bold">{g.title}: </dt>
                <dd className="prose-wrap inline" style={{ color: "var(--muted)" }}>{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
