"use client";
import * as React from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 400;

export default function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      style={{ background: "var(--accent)", color: "#fff", marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <ArrowUp size={18} />
    </button>
  );
}
