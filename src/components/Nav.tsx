"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowLeft } from "lucide-react";

const anchors = [
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function BackButton({ fallbackHome = "/" }: { fallbackHome?: string }) {
  function onBack(e: React.MouseEvent) {
    e.preventDefault();
    try {
      const ref = document.referrer;
      if (ref) {
        const url = new URL(ref);
        if (url.origin === window.location.origin) {
          window.history.back();
          return;
        }
      }
    } catch {
      /* fall through */
    }
    window.location.href = fallbackHome;
  }
  return (
    <a href={fallbackHome} onClick={onBack} className="btn-compact" aria-label="Go back">
      <ArrowLeft size={14} className="shrink-0" /> Back
    </a>
  );
}

export default function Nav({ home = "/", showSections = true }: { home?: string; showSections?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onBrandClick(e: React.MouseEvent) {
    // Same-scope: just scroll to top instead of reloading
    const here = pathname === home || (home === "/" && (pathname === "/" || pathname === null));
    if (here) {
      e.preventDefault();
      scrollToTop();
      setOpen(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur" style={{ background: "color-mix(in srgb, var(--background) 88%, transparent)", borderColor: "var(--border)" }}>
      <div className="container-x flex min-h-[60px] items-center justify-between gap-3 py-2.5">
        <Link href={home} onClick={onBrandClick} className="flex min-w-0 items-center gap-2 truncate text-base font-bold sm:text-lg">
          <img
            src="/my-favicon/favicon.svg"
            alt="Clement Ndome logo"
            width={28}
            height={28}
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          />
          <span className="truncate">Clement Ndome</span>
        </Link>

        {showSections ? (
          <div className="hidden items-center gap-1 text-sm md:flex" role="navigation" aria-label="Sections">
            {anchors.map((a) => (
              <a
                key={a.id}
                href={a.href}
                className="whitespace-nowrap rounded-full px-3 py-2 font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--foreground)", border: "1px solid transparent" }}
              >
                {a.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="hidden items-center md:flex">
            <BackButton fallbackHome={home} />
          </div>
        )}

        {showSections ? (
          <button
            type="button"
            className="btn-secondary !px-3 !py-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        ) : (
          <div className="md:hidden">
            <BackButton fallbackHome={home} />
          </div>
        )}
      </div>

      {showSections && open ? (
        <div id="mobile-nav-panel" className="border-t md:hidden" style={{ borderColor: "var(--border)" }}>
          <div className="container-x flex max-h-[calc(100dvh-60px)] flex-col gap-2 overflow-y-auto py-3">
            {anchors.map((a) => (
              <a
                key={a.id}
                href={a.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] w-full items-center rounded-xl px-4 py-3 font-semibold"
                style={{ background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
