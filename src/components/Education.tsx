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
        {edu.certifications.length > 0 ? (
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <h4 className="text-[13px] font-bold">Certifications</h4>
            <ul className="mt-1.5 space-y-1.5 text-sm leading-relaxed">
              {edu.certifications.map((c) => (
                <li key={c.title} className="prose-wrap min-w-0">
                  <strong>{c.title}</strong> <span style={{ color: "var(--muted)" }}>· {c.org} · {c.issued}</span>{" "}
                  <a className="font-semibold underline underline-offset-4" style={{ color: "var(--muted)" }} href={c.evidence} target="_blank" rel="noreferrer">
                    View credential ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
