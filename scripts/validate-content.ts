import fs from "node:fs";
import path from "node:path";
import { ProjectFrontmatterSchema, LensKeySchema } from "../src/lib/projects";
import matter from "gray-matter";
import { z } from "zod";

const root = process.cwd();
const contentDir = path.join(root, "content");
const projectsDir = path.join(contentDir, "projects");

const BANNED = ["Founder", "Co-founder", "hallucination-free", "+254", "Namasake", "Gikwa", "Ndiwa", "clementndome20@gmail.com", "View as"];
const PERCENT_ALLOW = ["85%"];

const errors: string[] = [];
const warnings: string[] = [];

function err(m: string) { errors.push(m); }
function warn(m: string) { warnings.push(m); }

// lenses
const lensesRaw = JSON.parse(fs.readFileSync(path.join(contentDir, "lenses.json"), "utf8"));
const lensKeys = Object.keys(lensesRaw);
for (const k of lensKeys) {
  if (!LensKeySchema.safeParse(k).success) err(`Unknown lens key: ${k}`);
  const l = lensesRaw[k];
  if (!l.headline || !l.subline) err(`Lens ${k} missing headline/subline`);
  if (!Array.isArray(l.featuredProjects) || l.featuredProjects.length === 0) warn(`Lens ${k} has no featured projects`);
  if (typeof l.cv !== "string" || !l.cv.startsWith("https://docs.google.com/document/")) {
    err(`Lens ${k} cv must be a Google Drive document URL`);
  }
}

// experience
const exp = JSON.parse(fs.readFileSync(path.join(contentDir, "experience.json"), "utf8"));
if (!Array.isArray(exp) || exp.length === 0) err("experience.json empty");

// skills
const skills = JSON.parse(fs.readFileSync(path.join(contentDir, "skills.json"), "utf8"));
if (!Array.isArray(skills)) err("skills.json must be array");

// education
const edu = JSON.parse(fs.readFileSync(path.join(contentDir, "education.json"), "utf8"));
if (!edu.degree) err("education.json missing degree");

// projects
const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const slugs = new Set<string>();
const isProd = process.env.VALIDATE_PROD === "1";

for (const f of files) {
  const raw = fs.readFileSync(path.join(projectsDir, f), "utf8");
  const parsed = matter(raw);
  const slug = (parsed.data as { slug?: string }).slug ?? f.replace(/\.md$/, "");
  if (slugs.has(slug)) err(`Duplicate slug: ${slug}`);
  slugs.add(slug);
  const res = ProjectFrontmatterSchema.safeParse({ ...parsed.data, slug });
  if (!res.success) {
    err(`Schema fail ${f}: ${res.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
    continue;
  }
  const p = res.data;
  const fullText = raw;
  for (const b of BANNED) {
    if (fullText.includes(b)) err(`Banned wording "${b}" in ${f}`);
  }
  // percentage check
  const pcts = fullText.match(/\d+%/g) ?? [];
  for (const pct of pcts) {
    if (!PERCENT_ALLOW.includes(pct)) warn(`${f} contains percentage ${pct} outside allow-list (only 85% allowed)`);
  }
  // unverified outcome fails prod
  for (const o of p.outcome ?? []) {
    if (!o.verified) err(`Unverified outcome in ${f}: "${o.text}"`);
  }
  if (p.status === "live" && !p.links?.live) warn(`${f}: status live without live link`);
  const isPrivate = p.status === "private";
  if (!isPrivate) {
    if (!p.media?.cover) warn(`${f}: no cover image`);
    else if (typeof p.media.cover === "string" && p.media.cover.startsWith("/projects/")) {
      const coverFile = path.join(root, "public", ...p.media.cover.replace(/^\//, "").split("/"));
      if (!fs.existsSync(coverFile)) warn(`${f}: cover file missing: ${p.media.cover}`);
    }
    for (const g of p.media?.gallery ?? []) {
      if (typeof g === "string" && g.startsWith("/projects/")) {
        const gf = path.join(root, "public", ...g.replace(/^\//, "").split("/"));
        if (!fs.existsSync(gf)) warn(`${f}: gallery file missing: ${g}`);
      }
    }
  }
  if ((p.summary?.length ?? 0) > 400) warn(`${f}: summary long (>400 chars)`);
  for (const l of p.lenses) {
    if (!lensKeys.includes(l)) err(`${f}: unknown lens ref ${l}`);
  }
  const hasTodo = fullText.includes("TODO:");
  const featuredBy = lensKeys.filter((k) => (lensesRaw[k].featuredProjects as string[]).includes(slug));
  if (hasTodo && !isPrivate && (p.draft || featuredBy.length > 0)) {
    const msg = `${f} has TODO and is ${p.draft ? "draft" : ""} ${featuredBy.length ? `featured by ${featuredBy.join(",")}` : ""}`;
    if (isProd) {
      if (featuredBy.length > 0 || p.draft) err(`PROD BLOCKER: ${msg}`);
      else warn(msg);
    } else {
      warn(`DEV TODO: ${msg}`);
    }
  }
  // lens featured refs exist
  for (const k of lensKeys) {
    const feat = lensesRaw[k].featuredProjects as string[];
    for (const s of feat) {
      if (!files.map((x) => x.replace(/\.md$/, "")).includes(s) && !slugs.has(s)) {
        // checked after loop; skip here
      }
    }
  }
}

// featured refs must exist
for (const k of lensKeys) {
  for (const s of lensesRaw[k].featuredProjects as string[]) {
    if (!slugs.has(s)) err(`Lens ${k} features missing slug: ${s}`);
  }
}

// schema check with zod for lenses file shape
const LensFileSchema = z.record(z.string(), z.object({
  route: z.string(), label: z.string(), headline: z.string(), subline: z.string(),
  cv: z.string(), accent: z.string(), featuredProjects: z.array(z.string()),
  skillOrder: z.array(z.string()), experienceFilter: z.array(z.string()),
}));
const lensParse = LensFileSchema.safeParse(lensesRaw);
if (!lensParse.success) err(`lenses.json shape invalid`);

// nav scope guards: no hardcoded home link, no section anchors on project templates
const navSrc = fs.readFileSync(path.join(root, "src", "components", "Nav.tsx"), "utf8");
if (navSrc.includes('href="/"')) err(`Nav.tsx must not hardcode href="/" — use the home prop`);
const projectIndex = fs.readFileSync(path.join(root, "src", "app", "projects", "page.tsx"), "utf8");
const projectSlug = fs.readFileSync(path.join(root, "src", "app", "projects", "[slug]", "page.tsx"), "utf8");
const lensProjectIndex = fs.readFileSync(path.join(root, "src", "app", "[lens]", "projects", "page.tsx"), "utf8");
const lensProjectSlug = fs.readFileSync(path.join(root, "src", "app", "[lens]", "projects", "[slug]", "page.tsx"), "utf8");
const detailSrc = fs.readFileSync(path.join(root, "src", "components", "ProjectDetail.tsx"), "utf8");
for (const [name, src] of [["projects/page.tsx", projectIndex], ["[lens]/projects/page.tsx", lensProjectIndex]] as const) {
  for (const a of ["#projects", "#experience", "#skills", "#contact"]) {
    if (src.includes(`"${a}"`) || src.includes(`'${a}'`)) err(`${name} must not contain section anchor ${a}`);
  }
  if (!src.includes("showSections={false}")) err(`${name} must render <Nav> with showSections={false}`);
}
// detail templates may delegate to <ProjectDetail> — accept either direct Nav or delegation
for (const [name, src] of [["projects/[slug]/page.tsx", projectSlug], ["[lens]/projects/[slug]/page.tsx", lensProjectSlug]] as const) {
  for (const a of ["#projects", "#experience", "#skills", "#contact"]) {
    if (src.includes(`"${a}"`) || src.includes(`'${a}'`)) err(`${name} must not contain section anchor ${a}`);
  }
  const delegates = src.includes("<ProjectDetail");
  if (!delegates && !src.includes("showSections={false}")) err(`${name} must render <Nav> with showSections={false} or delegate to <ProjectDetail>`);
}
for (const [name, src] of [["components/ProjectDetail.tsx", detailSrc]] as const) {
  for (const a of ["#projects", "#experience", "#skills", "#contact"]) {
    if (src.includes(`"${a}"`) || src.includes(`'${a}'`)) err(`${name} must not contain section anchor ${a}`);
  }
  if (!src.includes("showSections={false}")) err(`${name} must render <Nav> with showSections={false}`);
}
// lens detail must stay in-lens: Nav home must be lens route, links must be lens-scoped
for (const [name, src, home] of [["[lens]/projects/page.tsx", lensProjectIndex, 'home={m.home}'], ["[lens]/projects/[slug]/page.tsx", lensProjectSlug, 'home={lens.route}']] as const) {
  if (!src.includes(home)) err(`${name} must render <Nav> with lens home (${home})`);
  if (!src.includes("projectsBase")) err(`${name} must use lens-scoped projectsBase`);
}
// lens cards must not hardcode global /projects/ links
const lensPageSrc = fs.readFileSync(path.join(root, "src", "components", "LensPage.tsx"), "utf8");
if (lensPageSrc.includes('href={`/projects/')) err(`LensPage.tsx must not hardcode global /projects/ links — use projectsBase`);
const cardSrc = fs.readFileSync(path.join(root, "src", "components", "ProjectCard.tsx"), "utf8");
if (!cardSrc.includes("projectsBase")) err(`ProjectCard.tsx must support lens-scoped projectsBase`);

// public filter guard: tags-only, no lens keys in the client filter
const filterSrc = fs.readFileSync(path.join(root, "src", "components", "ProjectFilter.tsx"), "utf8");
for (const leak of ["lenses", "lensKey", "gis-rs"]) {
  if (filterSrc.includes(leak)) err(`ProjectFilter.tsx must not reference "${leak}" — tags-only filter`);
}

console.log(`Checked ${files.length} projects, ${lensKeys.length} lenses.`);
if (warnings.length) { console.log("\nWARNINGS:"); warnings.forEach((w) => console.log(" - " + w)); }
if (errors.length) { console.log("\nERRORS:"); errors.forEach((e) => console.log(" - " + e)); process.exit(1); }
else console.log("\nValidate OK.");
