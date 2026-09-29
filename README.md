# Improved CLM Portfolio — Next.js rebuild

One domain, three lenses. Static export to GitHub Pages.

- `/` — Generalist: Geospatial Software Engineer
- `/gis-rs/` — GIS & Remote Sensing Engineer
- `/web/` — WebGIS Developer
- `/projects/` + `/projects/[slug]/` — all projects + case studies
- `/ai` reserved (content lives under Generalist for now)

## Quick start

```powershell
npm install
npm run validate   # dev: TODOs warn
npm run dev -- --webpack
npm run build      # webpack (win32 WASM fallback)
npx serve out      # preview static export
```

Prod gate: `VALIDATE_PROD=1 npm run validate` fails if any featured/draft project still has `TODO:` — per plan §6a. CI runs this before build.

## Add a project (~5 min)

```powershell
npm run new:project <slug>
# fill content/projects/<slug>.md, drop cover in public/projects/<slug>/
npm run validate
```

Featured = listed in `content/lenses.json`. Keep 3–4 per lens. Rest appear under More work automatically.

## Content source

- `content/profile.json`, `lenses.json`, `experience.json`, `skills.json`, `education.json`
- `content/projects/*.md` (frontmatter schema in `src/lib/projects.ts`)
- Master truth stays in `planning_new_portfolio/MASTER_CV_CONSOLIDATED.md` — not committed here.
- Placeholders (`TODO:`, `draft: true`) are intentional until you paste Fleet Guard text, DevStory dump, dates, stacks, screenshots.

## Deploy

Push to `main` → `.github/workflows/deploy.yml`: `npm ci` → `validate (PROD=1)` → `build` → Pages `out/` + `.nojekyll`. Target domain `https://clementndome.github.io/`.

Privacy: no phone, referee, or personal email in repo. Public email `clement.ndome@spationex.com`. Cert links use Drive URLs for v1.
