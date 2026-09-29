import { z } from "zod";

export const HostingSchema = z.enum(["free-tier", "cloud-run", "vercel", "other"]);
export const StatusSchema = z.enum(["live", "demo", "repo-only", "private"]);
export const LensKeySchema = z.enum(["general", "gis-rs", "web"]);

export const ProjectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  status: StatusSchema,
  lenses: z.array(LensKeySchema).min(1),
  tags: z.array(z.string()).default([]),
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.coerce.string(),
  summary: z.string().min(1),
  problem: z.string().optional().default("TODO"),
  outcome: z
    .array(z.object({ text: z.string().min(1), verified: z.boolean(), source: z.string().min(1) }))
    .default([]),
  links: z.object({ live: z.string().nullable().optional(), code: z.string().nullable().optional() }).default({}),
  demo: z.object({ hosting: HostingSchema }).default({ hosting: "other" }),
  media: z.object({ cover: z.string().min(1), gallery: z.array(z.string()).default([]), video: z.string().nullable().optional() }).default({ cover: "", gallery: [] }),
  versions: z.array(z.object({ label: z.string(), period: z.string(), note: z.string() })).optional(),
  draft: z.boolean().optional().default(false),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
export type Project = ProjectFrontmatter & { body: string; hasTodo: boolean };
export type LensKey = z.infer<typeof LensKeySchema>;
export type Lens = {
  route: string; label: string; headline: string; subline: string; cv: string;
  accent: string; featuredProjects: string[]; skillOrder: string[]; experienceFilter: string[];
};

export function hostingBadge(hosting: z.infer<typeof HostingSchema>) {
  switch (hosting) {
    case "free-tier": return "Demo may take a moment to wake (free tier)";
    case "cloud-run": return "Cloud Run — may cold-start";
    case "vercel": return "Live on Vercel";
    default: return "Live demo";
  }
}
