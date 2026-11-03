#!/usr/bin/env node
/**
 * compile.mjs — stitch a project's chapters into one manuscript.
 * Usage: node scripts/compile.mjs <slug> [--status final|reviewed|drafted] [--out path.md] [--txt]
 * Default includes chapters with status reviewed or final. Strips frontmatter, adds chapter headings.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let options;
try {
  options = parseArgs({ allowPositionals: true, options: {
    status: { type: 'string' }, out: { type: 'string' }, txt: { type: 'boolean' },
  } });
  if (options.positionals.length !== 1) throw new Error('provide exactly one project slug');
} catch (error) { console.error(error.message); process.exit(2); }
const slug = options.positionals[0];
if (!slug) { console.error('usage: compile.mjs <slug> [--status drafted] [--out file] [--txt]'); process.exit(2); }
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 60) {
  console.error('invalid slug: use up to 60 lowercase letters, digits, and separating hyphens');
  process.exit(2);
}
const dir = path.join(root, 'projects', slug);
const minStatus = options.values.status ?? 'reviewed';
const rank = { drafted: 1, revised: 2, reviewed: 3, final: 4 };
if (!Object.hasOwn(rank, minStatus)) {
  console.error(`invalid status: ${minStatus}; use drafted, revised, reviewed, or final`);
  process.exit(2);
}

const bible = fs.readFileSync(path.join(dir, 'bible.md'), 'utf8');
const title = (bible.match(/^# Story Bible: (.+)$/m) || [])[1] || slug;
const files = fs.readdirSync(path.join(dir, 'chapters')).filter(f => f.endsWith('.md')).sort();
const parts = []; let words = 0; let included = 0;
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, 'chapters', f), 'utf8');
  const frontmatter = raw.match(/^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  const fm = frontmatter?.[1] || '';
  const status = (fm.match(/status:\s*(\w+)/) || [])[1] || 'drafted';
  if ((rank[status] || 0) < (rank[minStatus] || 0)) continue;
  const n = (fm.match(/chapter:\s*(\d+)/) || [])[1];
  const t = (fm.match(/^title:[ \t]*([^\r\n]*)/m) || [])[1]?.trim() || '';
  let body = (frontmatter ? raw.slice(frontmatter[0].length) : raw).trim();
  const heading = `${n === '0' ? 'Prologue' : `Chapter ${n}`}${t ? `: ${t}` : ''}`;
  const leadingHeading = body.match(/^#{1,6}[ \t]+([^\r\n]+)(?:\r?\n|$)/);
  if (leadingHeading?.[1].trim() === heading) body = body.slice(leadingHeading[0].length).trim();
  words += (body.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length; included++;
  parts.push(`## ${heading}\n\n${body}`);
}
if (!included) { console.error(`no chapters meet status ${minStatus}; manuscript unchanged`); process.exit(1); }
const out = `# ${title}\n\n${parts.join('\n\n* * *\n\n')}\n`;
const outPath = options.values.out || path.join(dir, `${slug}-manuscript.${options.values.txt ? 'txt' : 'md'}`);
fs.writeFileSync(outPath, options.values.txt ? out.replace(/^#+\s*/gm, '').replace(/\*\s\*\s\*/g, '***') : out);
console.log(JSON.stringify({ outPath, chapters: included, words }, null, 2));
