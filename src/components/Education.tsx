type Edu = {
  degree: { title: string; org: string; period: string; detail?: string };
  certifications: { title: string; org: string; issued: string; evidence: string }[];
  leadership: { title: string; org: string; period: string; detail: string }[];
};

export default function Education({ edu }: { edu: Edu }) {
  return (
    <section className="container-x py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Education & certifications</h2>
      <div className="card mt-4 min-w-0 p-4 sm:p-5">
        <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{edu.degree.title}</h3>
        <p className="prose-wrap mt-0.5 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{edu.degree.org} · {edu.degree.period}</p>
        {/* REVIVAL NOTE: undergrad carbon-sequestration & biomass mapping project is not live.
            When revived with evidence, set degree.detail (e.g. project + evidence link) to render the line below. */}
        {edu.degree.detail ? (
          <p className="prose-wrap mt-1 text-sm">{edu.degree.detail}</p>
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {edu.certifications.map((c) => (
          <div key={c.title} className="card flex min-w-0 flex-col p-4 sm:p-5">
            <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{c.title}</h3>
            <p className="prose-wrap mt-0.5 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>{c.org} · {c.issued}</p>
            <a className="btn-compact mt-3 w-fit" href={c.evidence} target="_blank" rel="noreferrer">
              View credential
            </a>
          </div>
        ))}
      </div>
      {edu.leadership.length > 0 ? (
        <div className="card mt-4 min-w-0 p-4 sm:p-5">
          <h3 className="text-sm font-bold sm:text-base">Community</h3>
          {edu.leadership.map((l) => (
            <p key={l.title} className="prose-wrap mt-2 min-w-0 text-sm"><strong>{l.title}</strong> · {l.org} · {l.period}<br />{l.detail}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}
