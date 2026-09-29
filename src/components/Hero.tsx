import Link from "next/link";
import { Download, Mail, Code2, Briefcase } from "lucide-react";
import type { Lens } from "@/lib/projects";

type Profile = {
  name: string; location: string; email: string; currently: string;
  socials: { github: string; linkedin: string; devstory: string };
};

export default function Hero({ lens, lensKey, profile }: { lens: Lens; lensKey: string; profile: Profile }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
      <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>{profile.location} · {profile.currently}</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">{lens.headline}</h1>
      <p className="mt-3 max-w-2xl text-lg" style={{ color: "var(--muted)" }}>{lens.subline}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={lens.cv} className="btn-primary"><Download size={16} /> Download CV ({lens.label})</Link>
        <a href={`mailto:${profile.email}`} className="btn-secondary"><Mail size={16} /> Email</a>
        <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn-secondary"><Code2 size={16} /> GitHub</a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="btn-secondary"><Briefcase size={16} /> LinkedIn</a>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="tag">Leading development of an Aeronautical Information GIS Platform (Django, PostGIS, GeoServer), full SDLC</span>
        <span className="tag">Personal prototype: OLS checks on public data, demo certificates only</span>
      </div>
      <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
        DevStory: <a className="underline" href={profile.socials.devstory} target="_blank" rel="noreferrer">Stack Overflow story</a>
        {lensKey !== "general" ? <> · <Link className="underline" href="/">View as Generalist</Link></> : null}
      </p>
    </section>
  );
}
