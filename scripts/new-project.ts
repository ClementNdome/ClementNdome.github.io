import fs from "node:fs";
import path from "node:path";
const slug = process.argv[2] ?? "my-project";
const dir = path.join(process.cwd(), "content", "projects");
const target = path.join(dir, `${slug}.md`);
if (fs.existsSync(target)) { console.error(`Exists: ${target}`); process.exit(1); }
const tpl = fs.readFileSync(path.join(dir, "_template.md"), "utf8").replaceAll("_template", slug);
fs.writeFileSync(target, tpl);
console.log(`Created ${target}`);
