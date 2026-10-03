"use client";
import * as React from "react";

type Bullet = { text: string; lenses: string[]; source: string };
type Role = { id: string; title: string; org: string; location: string; period: string; type: string; note?: string; bullets: Bullet[] };

const NOW_IDS = ["forbspace", "spationex", "personal-projects"];
const VISIBLE_MAX = 2;

type Tab = "now" | "earlier" | "all";
const TABS: { id: Tab; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "earlier", label: "Earlier" },
  { id: "all", label: "All" },
];

function RoleEntry({ r, bullets }: { r: Role; bullets: Bullet[] }) {
  const [open, setOpen] = React.useState(false);
  const capped = !open && bullets.length > VISIBLE_MAX;
  const shown = capped ? bullets.slice(0, VISIBLE_MAX) : bullets;
  return (
    <li className="relative min-w-0 pl-6 sm:pl-8">
      <span
        aria-hidden="true"
        className="absolute top-5 left-0 h-2.5 w-2.5 rounded-full sm:left-0"
        style={{ background: "var(--accent)" }}
      />
      <p className="prose-wrap text-xs font-semibold" style={{ color: "var(--muted)" }}>
        {r.period} · {r.location}
      </p>
      <div className="card mt-1 min-w-0 p-3 sm:p-4">
        <h3 className="prose-wrap text-balance text-sm font-bold sm:text-base">{r.title} — {r.org}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed sm:text-sm">
          {shown.map((b, i) => <li key={i} className="prose-wrap min-w-0">{b.text}</li>)}
        </ul>
        {bullets.length > VISIBLE_MAX ? (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-[13px] font-semibold underline underline-offset-4 sm:text-sm"
            style={{ color: "var(--muted)" }}
          >
            {open ? "Show less" : `Show ${bullets.length - VISIBLE_MAX} more`}
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default function Experience({ roles, lensKey }: { roles: Role[]; lensKey: string }) {
  const [tab, setTab] = React.useState<Tab>("now");

  const withBullets = React.useMemo(
    () =>
      roles
        .map((r) => ({ r, bullets: r.bullets.filter((b) => b.lenses.includes(lensKey) || b.lenses.includes("general")) }))
        .filter((x) => x.bullets.length > 0),
    [roles, lensKey],
  );
  const now = withBullets.filter((x) => NOW_IDS.includes(x.r.id));
  const earlier = withBullets.filter((x) => !NOW_IDS.includes(x.r.id));

  const showNow = tab === "now" || tab === "all";
  const showEarlier = tab === "earlier" || tab === "all";
  const listNow = tab === "now" ? now : tab === "all" ? now : [];
  const listEarlier = tab === "earlier" ? earlier : [];

  return (
    <section id="experience" className="container-x scroll-mt-20 py-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="h2-fluid font-extrabold">Experience</h2>
        <div role="tablist" aria-label="Filter experience" className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className="tag tag-btn"
                style={active ? { background: "var(--accent)", color: "#fff" } : undefined}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {showNow && listNow.length > 0 ? (
        <ol className="relative mt-4 min-w-0 space-y-4 sm:space-y-5">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[4px] hidden w-px sm:block" style={{ background: "var(--border)" }} />
          {listNow.map(({ r, bullets }) => <RoleEntry key={r.id} r={r} bullets={bullets} />)}
        </ol>
      ) : null}

      {tab === "all" && earlier.length > 0 ? (
        <details className="card mt-4 min-w-0 p-4 sm:p-5">
          <summary className="cursor-pointer text-sm font-bold sm:text-base">Earlier roles ({earlier.length})</summary>
          <ol className="relative mt-4 min-w-0 space-y-4">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[4px] hidden w-px sm:block" style={{ background: "var(--border)" }} />
            {earlier.map(({ r, bullets }) => <RoleEntry key={r.id} r={r} bullets={bullets} />)}
          </ol>
        </details>
      ) : null}

      {showEarlier && listEarlier.length > 0 ? (
        <ol className="relative mt-4 min-w-0 space-y-4 sm:space-y-5">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[4px] hidden w-px sm:block" style={{ background: "var(--border)" }} />
          {listEarlier.map(({ r, bullets }) => <RoleEntry key={r.id} r={r} bullets={bullets} />)}
        </ol>
      ) : null}
    </section>
  );
}
