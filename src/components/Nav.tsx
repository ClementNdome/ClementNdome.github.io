import Link from "next/link";

const lenses = [
  { key: "general", label: "General", href: "/" },
  { key: "gis-rs", label: "GIS & RS", href: "/gis-rs/" },
  { key: "web", label: "WebGIS", href: "/web/" },
];

export default function Nav({ active }: { active: string }) {
  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-lg">Clement Ndome</Link>
        <div className="flex items-center gap-2 text-sm" role="navigation" aria-label="Lens switcher">
          <span className="hidden sm:inline" style={{ color: "var(--muted)" }}>View as:</span>
          {lenses.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              aria-current={active === l.key ? "page" : undefined}
              className="rounded-full px-3 py-1 font-semibold"
              style={{
                background: active === l.key ? "var(--accent)" : "transparent",
                color: active === l.key ? "#fff" : "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/projects/" className="rounded-full px-3 py-1 font-semibold" style={{ border: "1px solid var(--border)" }}>
            All projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
