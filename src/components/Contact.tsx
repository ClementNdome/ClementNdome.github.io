"use client";
import * as React from "react";
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react";

const ACCENT_HEX: Record<string, string> = { green: "047857", blue: "2563eb" };

export default function Contact({
  formspree,
  email,
  availability,
  schedulingUrl,
  accent = "green",
}: {
  formspree: string;
  email: string;
  availability?: string;
  schedulingUrl?: string;
  accent?: string;
}) {
  const [state, setState] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const mountedAtRef = React.useRef<number>(0);
  const firstInteractionRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const handleInteraction = () => {
    if (!firstInteractionRef.current) {
      firstInteractionRef.current = Date.now();
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const userEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const gotcha = String(formData.get("_gotcha") || "").trim();
    const honeypot = String(formData.get("website_url") || "").trim();

    // 1. Multi-honeypot trap: if filled by a scraper/bot, silently sinkhole
    if (honeypot || gotcha) {
      setState("ok");
      form.reset();
      return;
    }

    // 2. Timing trap: automated bots submit in < 3 seconds
    const timeSinceMount = Date.now() - mountedAtRef.current;
    const timeSinceInteraction = firstInteractionRef.current
      ? Date.now() - firstInteractionRef.current
      : 0;

    if (timeSinceMount < 3000 || timeSinceInteraction < 1200) {
      setState("ok");
      form.reset();
      return;
    }

    // 3. Known bot test heuristics (e.g. Name: "Test User", Message: "Test")
    const isObviousTestBot =
      name.toLowerCase() === "test user" ||
      name.toLowerCase() === "test" ||
      message.toLowerCase() === "test";

    if (isObviousTestBot) {
      setState("ok");
      form.reset();
      return;
    }

    // 4. Message length check for genuine inquiries
    if (message.length < 15) {
      setErrorMessage("Please enter a more descriptive message (at least 15 characters).");
      setState("error");
      return;
    }

    // 5. Client cooldown rate limit (30 seconds)
    try {
      const lastSubmit = sessionStorage.getItem("portfolio_contact_last_submit");
      if (lastSubmit && Date.now() - Number(lastSubmit) < 30000) {
        setErrorMessage("Please wait a moment before sending another message.");
        setState("error");
        return;
      }
    } catch {
      // Ignore if sessionStorage is unavailable
    }

    setState("sending");

    // Clean payload for Formspree (omit honeypot field, keep empty _gotcha)
    const cleanData = new FormData();
    cleanData.append("name", name);
    cleanData.append("email", userEmail);
    cleanData.append("message", message);
    cleanData.append("_subject", "New message from portfolio site");
    cleanData.append("_gotcha", "");

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);

    try {
      const res = await fetch(formspree, {
        method: "POST",
        body: cleanData,
        headers: { Accept: "application/json" },
        signal: ctrl.signal,
      });

      if (res.ok) {
        setState("ok");
        form.reset();
        try {
          sessionStorage.setItem("portfolio_contact_last_submit", String(Date.now()));
        } catch {
          // ignore
        }
      } else {
        const errorData = await res.json().catch(() => null);
        setErrorMessage(
          errorData?.error || "Failed to send message. Please email me directly."
        );
        setState("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again or email me directly.");
      setState("error");
    } finally {
      clearTimeout(timer);
    }
  }

  const primary = ACCENT_HEX[accent] ?? ACCENT_HEX.green;
  const widgetUrl = schedulingUrl ? `${schedulingUrl}?hide_gdpr_banner=1&primary_color=${primary}` : null;

  return (
    <section id="contact" className="container-x scroll-mt-20 py-6 sm:py-8">
      <h2 className="h2-fluid font-extrabold">Contact</h2>
      <div className="card mt-4 min-w-0 p-4 sm:p-5">
        {availability ? (
          <p className="w-fit rounded-full px-3 py-1 text-xs font-bold" style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)", color: "var(--accent)" }}>
            {availability}
          </p>
        ) : null}
        <p className="prose-wrap mt-2 text-sm leading-relaxed sm:text-base">
          Have a project in mind? Email me at <a className="underline break-all" href={`mailto:${email}`}>{email}</a>
          {schedulingUrl ? (
            <> or <a className="font-semibold underline underline-offset-4" href={schedulingUrl} target="_blank" rel="noreferrer"><Calendar size={14} className="mr-1 inline shrink-0" />Book a project consultation </a></>
          ) : null}
        </p>
        <div className="mt-4 grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">
          {widgetUrl ? (
            <div className="min-w-0">
              <div className="card relative min-w-0 overflow-hidden p-1" style={{ borderColor: "var(--border)" }}>
                <p aria-hidden="true" className="absolute inset-0 p-4 text-sm" style={{ color: "var(--muted)" }}>
                  Loading scheduler…
                </p>
                <div
                  className="calendly-inline-widget relative min-w-0"
                  data-url={widgetUrl}
                  style={{ minWidth: 0, width: "100%", height: 700 }}
                />
              </div>
              {schedulingUrl ? (
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  Having trouble loading?{" "}
                  <a className="font-semibold underline underline-offset-4" href={schedulingUrl} target="_blank" rel="noreferrer">
                    Book directly on Calendly ↗
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="min-w-0">
            <p className="prose-wrap text-sm leading-relaxed sm:text-base">
              Or you can leave your message here, I will get back to you soon:
            </p>
            <form
              className="mt-3 min-w-0"
              onSubmit={onSubmit}
              onFocus={handleInteraction}
              autoComplete="on"
            >
              <div className="grid grid-cols-1 gap-3">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  autoComplete="name"
                  className="field"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  autoComplete="email"
                  className="field"
                />
                <textarea
                  name="message"
                  required
                  minLength={15}
                  placeholder="Your message (at least 15 characters)..."
                  rows={5}
                  className="field min-h-[120px] resize-y"
                />

                {/* Honeypot 1: Standard Formspree field (hidden) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  style={{ display: "none" }}
                />

                {/* Honeypot 2: Decoy field tempting for automated bot fillers */}
                <div
                  aria-hidden="true"
                  className="opacity-0 absolute -left-[9999px] h-0 w-0 overflow-hidden pointer-events-none"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                >
                  <label htmlFor="contact_website_url">Website</label>
                  <input
                    id="contact_website_url"
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  className="btn-primary w-full justify-center"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Sending…" : "Send Message"}
                </button>
                <div aria-live="polite" className="text-sm">
                  {state === "ok" ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                      <CheckCircle2 size={16} /> Message sent successfully! I will get back to you soon.
                    </span>
                  ) : null}
                  {state === "error" ? (
                    <span className="inline-flex items-center gap-1.5 text-rose-600 font-medium">
                      <AlertCircle size={16} /> {errorMessage || "Something went wrong. Please try again or email directly."}
                    </span>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
