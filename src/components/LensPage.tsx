"use client";
import Nav from "./Nav";
import Hero from "./Hero";
import ProjectCard from "./ProjectCard";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import type { Lens, Project } from "@/lib/projects";

type Props = {
  lensKey: string;
  lens: Lens;
  profile: {
    name: string; location: string; email: string; currently: string;
    socials: { github: string; linkedin: string; devstory: string; spationex: string };
    formspree: string;
  };
  featured: Project[];
  moreWork: Project[];
  roles: { id: string; title: string; org: string; location: string; period: string; type: string; bullets: { text: string; lenses: string[]; source: string }[] }[];
  skillGroups: { id: string; title: string; items: string[]; evidence: string[] }[];
  edu: {
    degree: { title: string; org: string; period: string; detail: string };
    certifications: { title: string; org: string; issued: string; evidence: string }[];
    leadership: { title: string; org: string; period: string; detail: string }[];
    initiatives: { title: string; period: string; detail: string }[];
  };
};

export default function LensPage({ lensKey, lens, profile, featured, moreWork, roles, skillGroups, edu }: Props) {
  return (
    <div data-accent={lens.accent}>
      <Nav active={lensKey} />
      <main>
        <Hero lens={lens} lensKey={lensKey} profile={profile} />
        <section className="mx-auto max-w-6xl px-4 py-4">
          <h2 className="text-2xl font-extrabold">Featured projects</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>
        <Experience roles={roles} lensKey={lensKey} />
        <Skills groups={skillGroups} order={lens.skillOrder} />
        <Education edu={edu} />
        {moreWork.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-8">
            <h2 className="text-2xl font-extrabold">More work</h2>
            <div className="card mt-4 divide-y p-2" style={{ borderColor: "var(--border)" }}>
              {moreWork.map((p) => (
                <a key={p.slug} href={`/projects/${p.slug}/`} className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2">
                  <span className="font-semibold">{p.title}</span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>{p.tagline}</span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="text-2xl font-extrabold">How I build</h2>
          <div className="card mt-4 p-5 text-sm">
            <p>SDLC from requirements to maintenance. PostGIS schema design with indexing and validation pipelines. Small, deployable increments with live demos and short recordings when free tiers sleep.</p>
          </div>
        </section>
        <Contact formspree={profile.formspree} email={profile.email} />
      </main>
      <Footer github={profile.socials.github} linkedin={profile.socials.linkedin} spationex={profile.socials.spationex} />
    </div>
  );
}
