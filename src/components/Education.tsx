type Edu = {
  degree: { title: string; org: string; period: string; detail: string };
  certifications: { title: string; org: string; issued: string; evidence: string }[];
  leadership: { title: string; org: string; period: string; detail: string }[];
  initiatives: { title: string; period: string; detail: string }[];
};

export default function Education({ edu }: { edu: Edu }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-extrabold">Education, certifications, initiatives</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h3 className="font-bold">{edu.degree.title}</h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{edu.degree.org} · {edu.degree.period}</p>
          <p className="text-sm">{edu.degree.detail}</p>
          {edu.leadership.map((l) => (
            <p key={l.title} className="mt-3 text-sm"><strong>{l.title}</strong> · {l.org} · {l.period}<br />{l.detail}</p>
          ))}
        </div>
        <div className="card p-5">
          <h3 className="font-bold">Certifications</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {edu.certifications.map((c) => (
              <li key={c.title}><strong>{c.title}</strong> — {c.org} ({c.issued})<br /><a className="underline" href={c.evidence} target="_blank" rel="noreferrer">Evidence</a></li>
            ))}
          </ul>
          <h3 className="mt-4 font-bold">Initiative</h3>
          {edu.initiatives.map((i) => (
            <p key={i.title} className="text-sm"><strong>{i.title}</strong> · {i.period}<br />{i.detail}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
