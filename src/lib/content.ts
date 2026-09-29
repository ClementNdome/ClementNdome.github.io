import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ProjectFrontmatterSchema, type Project } from "./projects";

const contentDir = path.join(process.cwd(), "content");
const projectsDir = path.join(contentDir, "projects");
const publicDir = path.join(process.cwd(), "public");

function hasTodoMarker(raw: string) {
  return raw.includes("TODO:");
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(projectsDir, f), "utf8");
    const parsed = matter(raw);
    const data = ProjectFrontmatterSchema.parse({
      ...(parsed.data as Record<string, unknown>),
      slug: (parsed.data as { slug?: string }).slug ?? f.replace(/\.md$/, ""),
    });
    const coverPath = typeof data.media?.cover === "string" && data.media.cover.startsWith("/projects/")
      ? path.join(publicDir, data.media.cover.replace(/^\//, "").replace(/\//g, path.sep))
      : null;
    return {
      ...data,
      body: parsed.content.trim(),
      hasTodo: hasTodoMarker(raw),
      hasCover: coverPath ? fs.existsSync(coverPath) : false,
    };
  });
}

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function readJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentDir, name), "utf8")) as T;
}
