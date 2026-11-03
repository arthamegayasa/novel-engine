#!/usr/bin/env node
/**
 * new-project.mjs — scaffold projects/<slug>/ from engine/templates.
 * Usage: node scripts/new-project.mjs "Working Title" [--slug custom-slug] [--seed "prompt text"]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let options;
try {
  options = parseArgs({ allowPositionals: true, options: { slug: { type: 'string' }, seed: { type: 'string' } } });
  if (options.positionals.length !== 1) throw new Error('provide exactly one title');
} catch (error) { console.error(error.message); process.exit(2); }
const title = options.positionals[0];
if (!title) { console.error('usage: new-project.mjs "Title" [--slug s] [--seed "prompt"]'); process.exit(2); }

const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+/, '').slice(0, 60).replace(/-+$/, '') || 'untitled';
const slug = options.values.slug ?? slugify(title);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 60) {
  console.error('invalid slug: use up to 60 lowercase letters, digits, and separating hyphens');
  process.exit(2);
}
const dir = path.join(root, 'projects', slug);
if (fs.existsSync(dir)) { console.error(`project exists: ${dir}`); process.exit(1); }

const tpl = path.join(root, 'engine', 'templates');
const fill = (s) => s.replace(/\{\{(TITLE|SEED_PROMPT)\}\}/g, (_, key) =>
  key === 'TITLE' ? title : options.values.seed || '(paste the seed prompt here)');

fs.mkdirSync(dir, { recursive: true });
for (const d of ['chapters', 'plans', 'reviews']) fs.mkdirSync(path.join(dir, d));
const map = { 'bible.md': 'bible.md', 'outline.md': 'outline.md', 'clue-ledger.md': 'clues.md', 'continuity.md': 'continuity.md' };
for (const [from, to] of Object.entries(map)) {
  fs.writeFileSync(path.join(dir, to), fill(fs.readFileSync(path.join(tpl, from), 'utf8')));
}
fs.writeFileSync(path.join(dir, 'STATUS.md'), `# STATUS: ${title}\n\n- Slug: \`${slug}\`\n- Created: ${new Date().toISOString().slice(0, 10)}\n- Next chapter: 0 (prologue) or 1\n- Passes default: 3\n\n## Assumptions made from the seed\n\n- \n\n## Open questions for the author\n\n- \n\n## Run log\n\n| Date | Chapter | Words | Verdict | Passes | Notes |\n|---|---|---|---|---|---|\n`);
console.log(JSON.stringify({ slug, dir, files: fs.readdirSync(dir) }, null, 2));
