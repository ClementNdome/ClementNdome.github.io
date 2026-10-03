"use client";
import Image from "next/image";
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
    name: string; location: string; email: string; currently: string; availability?: string;
    socials: { github: string; linkedin: string; devstory: string; spationex: string };
    formspree: string;
  };
  featured: Project[];
  moreWork: Project[];
  roles: { id: string; title: string; org: string; location: string; period: string; type: string; bullets: { text: string; lenses: string[]; source: string }[] }[];
  skillGroups: { id: string; title: string; items: string[]; evidence: string[] }[];
  edu: {
    degree: { title: string; org: string; period: string; detail?: string };
    certifications: { title: string; org: string; issued: string; evidence: string }[];
    leadership: { title: string; org: string; period: string; detail: string }[];
  };
};

export default function LensPage({ lensKey, lens, profile, featured, moreWork, roles, skillGroups, edu }: Props) {
  const projectsBase = lensKey === "general" ? "/projects" : `/${lensKey}/projects`;
  return (
    <div data-accent={lens.accent} className="flex min-h-dvh min-w-0 flex-col">
      <Nav home={lens.route} showSections />
      <main className="min-w-0 flex-1">
        <Hero lens={lens} lensKey={lensKey} profile={profile} />
        <section id="projects" className="container-x scroll-mt-20 py-4 sm:py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="h2-fluid font-extrabold">Featured projects</h2>
            <a href={`${projectsBase}/`} className="text-sm font-semibold underline underline-offset-4" style={{ color: "var(--muted)" }}>
              View all {lens.label} projects
            </a>
          </div>
          <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4">
            {featured.map((p) => <ProjectCard key={p.slug} p={p} projectsBase={projectsBase} />)}
          </div>
        </section>
        <Experience roles={roles} lensKey={lensKey} />
        <Skills groups={skillGroups} order={lens.skillOrder} />
        <Education edu={edu} />
        {moreWork.length > 0 ? (
          <section className="container-x py-6 sm:py-8">
            <h2 className="h2-fluid font-extrabold">More work</h2>
            <div className="mt-4 min-w-0 space-y-2.5">
              {moreWork.map((p) => (
                <a key={p.slug} href={`${projectsBase}/${p.slug}/`} aria-label={`View ${p.title} case study`} className="card flex min-w-0 items-center gap-3 p-2.5 transition-transform hover:-translate-y-0.5">
                  {p.hasCover ? (
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
                      <Image
                        src={p.media.cover}
                        alt=""
                        fill
                        sizes="56px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="prose-wrap block truncate text-sm font-bold">{p.title}</span>
                    <span className="prose-wrap block truncate text-[13px]" style={{ color: "var(--muted)" }}>{p.tagline}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
        <Contact formspree={profile.formspree} email={profile.email} availability={profile.availability} />
      </main>
      <Footer github={profile.socials.github} linkedin={profile.socials.linkedin} devstory={profile.socials.devstory} spationex={profile.socials.spationex} />
      <BackToTop />
    </div>
  );
}
