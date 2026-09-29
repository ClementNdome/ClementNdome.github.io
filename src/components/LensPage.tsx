"use client";
import Nav from "./Nav";
import Hero from "./Hero";
import ProjectCard from "./ProjectCard";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
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
    <div data-accent={lens.accent} className="flex min-h-dvh min-w-0 flex-col">
      <Nav home={lens.route} showSections />
      <main className="min-w-0 flex-1">
        <Hero lens={lens} lensKey={lensKey} profile={profile} />
        <section id="projects" className="container-x scroll-mt-20 py-4 sm:py-6">
          <h2 className="h2-fluid font-extrabold">Featured projects</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </section>
        <Experience roles={roles} lensKey={lensKey} />
        <Skills groups={skillGroups} order={lens.skillOrder} />
        <Education edu={edu} />
        {moreWork.length > 0 ? (
          <section className="container-x py-6 sm:py-8">
            <h2 className="h2-fluid font-extrabold">More work</h2>
            <div className="card mt-4 divide-y p-1 sm:p-2" style={{ borderColor: "var(--border)" }}>
              {moreWork.map((p) => (
                <a key={p.slug} href={`/projects/${p.slug}/`} className="flex min-w-0 flex-col gap-0.5 px-3 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <span className="prose-wrap min-w-0 font-semibold">{p.title}</span>
                  <span className="prose-wrap clamp-2 min-w-0 text-sm sm:max-w-[60%] sm:text-right" style={{ color: "var(--muted)" }}>{p.tagline}</span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
        <section className="container-x py-6 sm:py-8">
          <h2 className="h2-fluid font-extrabold">How I build</h2>
          <div className="card prose-wrap mt-4 p-4 text-sm leading-relaxed sm:p-5 sm:text-base">
            <p>SDLC from requirements to maintenance. PostGIS schema design with indexing and validation pipelines. Small, deployable increments with live demos and short recordings when free tiers sleep.</p>
          </div>
        </section>
        <Contact formspree={profile.formspree} email={profile.email} />
      </main>
      <Footer github={profile.socials.github} linkedin={profile.socials.linkedin} spationex={profile.socials.spationex} />
      <BackToTop />
    </div>
  );
}
