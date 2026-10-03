"use client";
import * as React from "react";
import { Calendar } from "lucide-react";

const ACCENT_HEX: Record<string, string> = { green: "047857", blue: "2563eb" };

export default function Contact({ formspree, email, availability, schedulingUrl, accent = "green" }: { formspree: string; email: string; availability?: string; schedulingUrl?: string; accent?: string }) {
  const [state, setState] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const form = e.currentTarget;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" }, signal: ctrl.signal });
      setState(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
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
            <> or <a className="font-semibold underline underline-offset-4" href={schedulingUrl} target="_blank" rel="noreferrer"><Calendar size={14} className="mr-1 inline shrink-0" />Book a 30-min call ↗</a></>
          ) : null}
          {/* <span style={{ color: "var(--muted)" }}> — I typically reply within 24 hours.</span> */}
        </p>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <form className="min-w-0" action={formspree} method="POST" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <input name="name" required placeholder="Your Name" autoComplete="name" className="field" />
              <input name="email" type="email" required placeholder="Your Email" autoComplete="email" className="field" />
              <textarea name="message" required placeholder="Your message..." rows={5} className="field min-h-[120px] resize-y" />
              <input type="hidden" name="_subject" value="New message from portfolio site" />
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden opacity-0"
                style={{ position: "absolute", left: "-9999px" }}
              />
              <button className="btn-primary w-full justify-center" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Message"}</button>
              <p aria-live="polite" className="text-sm">
                {state === "ok" ? <span className="text-green-600">Message sent successfully.</span> : null}
                {state === "error" ? <span className="text-red-600">Something went wrong. Please try again or email directly.</span> : null}
              </p>
            </div>
          </form>
          {widgetUrl ? (
            <div className="card relative min-w-0 overflow-hidden p-2" style={{ borderColor: "var(--border)" }}>
              <p aria-hidden="true" className="absolute inset-0 p-4 text-sm" style={{ color: "var(--muted)" }}>
                Loading scheduler…
              </p>
              <div
                className="calendly-inline-widget relative min-w-0"
                data-url={widgetUrl}
                style={{ minWidth: 320, height: 700 }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
