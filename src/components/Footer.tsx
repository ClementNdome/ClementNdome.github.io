import { Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, StackOverflowIcon } from "./icons";

export default function Footer({ github, linkedin, devstory, spationex }: { github: string; linkedin: string; devstory: string; spationex: string }) {
  return (
    <footer className="mt-8 border-t py-6 sm:py-8" style={{ borderColor: "var(--border)" }}>
      <div className="container-x flex min-w-0 flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-compact btn-tight"><GithubIcon size={16} /></a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-compact btn-tight"><LinkedinIcon size={16} /></a>
          <a href={devstory} target="_blank" rel="noreferrer" aria-label="DevStory" className="btn-compact btn-tight"><StackOverflowIcon size={16} /></a>
          <a href={spationex} target="_blank" rel="noreferrer" aria-label="SpatioNEX" className="btn-compact btn-tight"><Globe size={16} /></a>
        </div>
        <p className="prose-wrap max-w-full text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
          Clement Ndome © {new Date().getFullYear()}  · Geospatial Software Engineer
        </p>
      </div>
    </footer>
  );
}
