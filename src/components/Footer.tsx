import { Code2, Briefcase, Globe } from "lucide-react";

export default function Footer({ github, linkedin, spationex }: { github: string; linkedin: string; spationex: string }) {
  return (
    <footer className="mt-8 border-t py-8" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <div className="flex gap-5">
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 /></a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Briefcase /></a>
          <a href={spationex} target="_blank" rel="noreferrer" aria-label="SpatioNEX"><Globe /></a>
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Clement Ndome © {new Date().getFullYear()} · Nairobi, Kenya · Geospatial Software Engineer</p>
      </div>
    </footer>
  );
}
