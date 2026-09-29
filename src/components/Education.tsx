type Edu = {
  degree: { title: string; org: string; period: string; detail: string };
  certifications: { title: string; org: string; issued: string; evidence: string }[];
  leadership: { title: string; org: string; period: string; detail: string }[];
  initiatives: { title: string; period: string; detail: string }[];
};

export default function Education({ edu }: { edu: Edu }) {
  return (
    <section className="container-x py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Education, certifications, initiatives</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="card min-w-0 p-4 sm:p-5">
          <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{edu.degree.title}</h3>
          <p className="prose-wrap mt-0.5 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{edu.degree.org} · {edu.degree.period}</p>
          <p className="prose-wrap mt-1 text-sm">{edu.degree.detail}</p>
          {edu.leadership.map((l) => (
            <p key={l.title} className="prose-wrap mt-3 min-w-0 text-sm"><strong>{l.title}</strong> · {l.org} · {l.period}<br />{l.detail}</p>
          ))}
        </div>
        <div className="card min-w-0 p-4 sm:p-5">
          <h3 className="text-sm font-bold sm:text-base">Certifications</h3>
          <ul className="mt-2 space-y-2.5 text-sm leading-relaxed">
            {edu.certifications.map((c) => (
              <li key={c.title} className="prose-wrap min-w-0"><strong>{c.title}</strong> — {c.org} ({c.issued})<br /><a className="underline break-words" href={c.evidence} target="_blank" rel="noreferrer">Evidence</a></li>
            ))}
          </ul>
          <h3 className="mt-4 text-sm font-bold sm:text-base">Initiative</h3>
          {edu.initiatives.map((i) => (
            <p key={i.title} className="prose-wrap mt-1 min-w-0 text-sm"><strong>{i.title}</strong> · {i.period}<br />{i.detail}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
