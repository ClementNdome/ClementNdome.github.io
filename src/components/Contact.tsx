import * as React from "react";

export default function Contact({ formspree, email }: { formspree: string; email: string }) {
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
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl font-extrabold">Contact</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm">Prefer email? <a className="underline" href={`mailto:${email}`}>{email}</a></p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>I typically reply within 24 hours.</p>
        </div>
        <form className="card p-5" action={formspree} method="POST" onSubmit={onSubmit}>
          <div className="grid gap-3">
            <input name="name" required placeholder="Your Name" className="rounded-lg border p-2.5" style={{ borderColor: "var(--border)", background: "var(--background)" }} />
            <input name="email" type="email" required placeholder="Your Email" className="rounded-lg border p-2.5" style={{ borderColor: "var(--border)", background: "var(--background)" }} />
            <textarea name="message" required placeholder="Your message..." rows={5} className="rounded-lg border p-2.5" style={{ borderColor: "var(--border)", background: "var(--background)" }} />
            <button className="btn-primary justify-center" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Message"}</button>
            {state === "ok" ? <p className="text-sm text-green-600">Message sent successfully.</p> : null}
            {state === "error" ? <p className="text-sm text-red-600">Something went wrong. Please try again or email directly.</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
