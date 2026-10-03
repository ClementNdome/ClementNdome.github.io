import { Mail } from "lucide-react";
import type { Lens } from "@/lib/projects";
import { GithubIcon, LinkedinIcon } from "./icons";

type Profile = {
  name: string; location: string; currently: string;
  socials: { github: string; linkedin: string };
};

export default function Hero({ lens, profile }: { lens: Lens; lensKey: string; profile: Profile }) {
  return (
    <section className="container-x pb-6 pt-8 sm:pt-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <p className="prose-wrap text-xs font-semibold sm:text-sm" style={{ color: "var(--muted)" }}>
            {profile.location}{profile.currently ? ` · ${profile.currently}` : null}
          </p>
          <h1 className="h1-fluid mt-2 font-extrabold">{lens.headline}</h1>
          <p className="mt-3 max-w-2xl text-balance text-base sm:text-lg" style={{ color: "var(--muted)" }}>
            {lens.subline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="#contact" className="btn-compact">
              <Mail size={14} className="shrink-0" /> Contact me
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn-compact">
              <GithubIcon size={14} /> GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="btn-compact">
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Quiet CV: muted text link, same on every route */}
        <aside className="min-w-0 lg:w-64 lg:shrink-0">
          <a
            href={lens.cv}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV (opens Google Drive in a new tab)"
            className="text-[13px] font-semibold underline underline-offset-4"
            style={{ color: "var(--muted)" }}
          >
            Download CV ↗
          </a>
        </aside>
      </div>
    </section>
  );
}
