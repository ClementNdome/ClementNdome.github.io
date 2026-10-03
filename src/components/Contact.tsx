"use client";
import * as React from "react";

export default function Contact({ formspree, email, availability }: { formspree: string; email: string; availability?: string }) {
  const [state, setState] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      setState(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }
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
          <span style={{ color: "var(--muted)" }}> — I typically reply within 24 hours.</span>
        </p>
        <form className="mt-4 min-w-0" action={formspree} method="POST" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <input name="name" required placeholder="Your Name" autoComplete="name" className="field" />
            <input name="email" type="email" required placeholder="Your Email" autoComplete="email" className="field" />
            <textarea name="message" required placeholder="Your message..." rows={5} className="field min-h-[120px] resize-y" />
            <button className="btn-primary w-full justify-center" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Message"}</button>
            {state === "ok" ? <p className="text-sm text-green-600">Message sent successfully.</p> : null}
            {state === "error" ? <p className="text-sm text-red-600">Something went wrong. Please try again or email directly.</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
