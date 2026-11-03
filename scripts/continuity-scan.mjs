#!/usr/bin/env node
/**
 * continuity-scan.mjs — cheap continuity heuristics for a project.
 * Usage: node scripts/continuity-scan.mjs <slug> [--json]
 *
 * Reports:
 *   - Capitalised names/terms that appear in 2+ chapters but never in continuity.md or bible.md
 *   - Numbers with units (years, days, li, gold, realms) per chapter, for manual consistency checks
 *   - Characters listed in bible §4 whose last mention is more than N chapters ago (default 15) while still unresolved
 *   - Hook-type sequence from chapter frontmatter / outline (3+ identical in a row flagged)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const slug = args.find(a => !a.startsWith('--'));
if (!slug) { console.error('usage: continuity-scan.mjs <slug> [--json]'); process.exit(2); }
const dir = path.join(root, 'projects', slug);
if (!fs.existsSync(path.join(dir, 'bible.md')) || !fs.existsSync(path.join(dir, 'chapters'))) {
  console.error(`project missing or incomplete: ${slug}`); process.exit(1);
}
const read = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';

const bible = read(path.join(dir, 'bible.md'));
const continuity = read(path.join(dir, 'continuity.md'));
const outline = read(path.join(dir, 'outline.md'));
const chapterFiles = fs.existsSync(path.join(dir, 'chapters'))
  ? fs.readdirSync(path.join(dir, 'chapters')).filter(f => f.endsWith('.md')).sort() : [];

const STOP = new Set(['The', 'A', 'An', 'I', 'It', 'He', 'She', 'They', 'We', 'You', 'But', 'And', 'Then', 'When', 'If', 'So', 'No', 'Yes', 'Chapter', 'Master', 'Senior', 'Junior', 'Elder', 'Sect', 'Heaven', 'Heavens', 'Earth', 'There', 'This', 'That', 'What', 'Why', 'How', 'Who', 'Where', 'My', 'His', 'Her', 'Our', 'Their', 'In', 'On', 'At', 'For', 'With', 'Of', 'To', 'From', 'As', 'Not', 'Even', 'Still', 'Just', 'Now', 'After', 'Before', 'Once', 'Every', 'All', 'Some', 'One', 'Two', 'Three', 'First', 'Second', 'Last', 'Director', 'Manager', 'Mr', 'Mrs', 'Ms', 'Dr']);

const termChapters = new Map();
const numbers = {};
const hooks = [];
for (const f of chapterFiles) {
  const raw = read(path.join(dir, 'chapters', f));
  const fm = raw.match(/^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  const n = (fm && fm[1].match(/chapter:\s*(\d+)/) || [])[1] || f;
  const hook = fm && (fm[1].match(/hook:\s*([\w-]+)/) || [])[1];
  if (hook) hooks.push({ n, hook });
  const body = fm ? raw.slice(fm[0].length) : raw;
  const terms = new Set((body.match(/\b[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*\b/g) || []).filter(t => !STOP.has(t)));
  for (const t of terms) { if (!termChapters.has(t)) termChapters.set(t, new Set()); termChapters.get(t).add(n); }
  numbers[n] = (body.match(/\b\d+(?:,\d{3})*\s*(?:years?|months?|days?|hours?|li|miles?|gold|silver|taels?|coins?|disciples?|cycles?|realms?|stages?|layers?)\b/gi) || []).slice(0, 25);
}

const known = (bible + '\n' + continuity).toLowerCase();
const unlogged = [...termChapters.entries()]
  .filter(([t, chs]) => chs.size >= 2 && !known.includes(t.toLowerCase()))
  .map(([t, chs]) => ({ term: t, chapters: [...chs].slice(0, 8) }))
  .sort((a, b) => b.chapters.length - a.chapters.length)
  .slice(0, 40);

// stale characters: names in bible §4 headings/bold
const castNames = [...new Set((bible.match(/^#{3,4}\s+(?:\d+\.\d+\s+)?([A-Z][^\n(]+)|\*\*([A-Z][A-Za-z -]{2,40})\*\*/gm) || [])
  .map(s => s.replace(/^#{3,4}\s+(?:\d+\.\d+\s+)?/, '').replace(/\*\*/g, '').trim()).filter(s => s.split(' ').length <= 3))];
const lastChapterNum = Math.max(0, ...chapterFiles.map(f => parseInt(f) || 0));
const stale = castNames.map(name => {
  const chs = termChapters.get(name) || termChapters.get(name.split(' ')[0]) || new Set();
  const last = Math.max(-1, ...[...chs].map(x => parseInt(x) || 0));
  return { name, lastSeen: last, gap: last >= 0 ? lastChapterNum - last : null };
}).filter(x => x.gap !== null && x.gap >= 15);

let hookRuns = [];
for (let i = 2; i < hooks.length; i++) if (hooks[i].hook === hooks[i - 1].hook && hooks[i].hook === hooks[i - 2].hook) hookRuns.push(hooks[i].n);

const report = { slug, chapters: chapterFiles.length, unloggedTerms: unlogged, staleCharacters: stale, hookRuns, numbersByChapter: numbers };
if (args.includes('--json')) { console.log(JSON.stringify(report, null, 2)); process.exit(0); }
console.log(`# continuity-scan: ${slug} (${chapterFiles.length} chapters)`);
console.log(`\n## Terms in 2+ chapters not recorded in bible/continuity (${unlogged.length})`);
for (const u of unlogged) console.log(`- ${u.term}: ch ${u.chapters.join(', ')}`);
console.log(`\n## Cast not mentioned for 15+ chapters (${stale.length})`);
for (const s of stale) console.log(`- ${s.name}: last seen ch ${s.lastSeen} (gap ${s.gap})`);
console.log(`\n## Hook-type runs of 3+ (${hookRuns.length})`);
for (const h of hookRuns) console.log(`- ending at ch ${h}`);
console.log(`\n## Numbers with units, per chapter (check against continuity.md)`);
for (const [n, arr] of Object.entries(numbers)) if (arr.length) console.log(`- ch ${n}: ${arr.join(' | ')}`);
