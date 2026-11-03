#!/usr/bin/env node
/**
 * prose-lint.mjs — deterministic prose checks for Novel Engine chapters.
 *
 * Usage:
 *   node scripts/prose-lint.mjs <file.md> [--baseline <dir-or-json>] [--target <words>] [--json] [--strict]
 *   node scripts/prose-lint.mjs --stats <dir>     # compute a baseline JSON from a corpus directory
 *
 * None of these checks "prove" machine authorship. They flag habits a human editor
 * would also flag, so the writer (human or model) has to look at them.
 *
 * Checks:
 *   - banned / suspect phrases  (engine/style/banned-phrases.txt, one per line, # comments)
 *   - sentence-length burstiness (coefficient of variation) and monotony runs
 *   - repeated sentence openers
 *   - paragraph "punchline" habit (share of paragraphs ending in a <=6-word sentence)
 *   - em-dash / semicolon / rhetorical-question density per 1k words
 *   - "not X, but Y" scaffolds, "it's not just X", tricolon lists, filter verbs, -ly adverbs
 *   - dialogue share, paragraph length, chapter word count vs target
 *   - optional baseline comparison against a reference corpus
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');
const bannedFile = path.join(root, 'engine', 'style', 'banned-phrases.txt');
const suspectFile = path.join(root, 'engine', 'style', 'suspect-phrases.txt');

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? (args[i + 1] ?? true) : undefined; };
const has = (n) => args.includes(n);

function loadList(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/)
    .map(l => l.trim()).filter(l => l && !l.startsWith('#'));
}
function loadBanned() { return loadList(bannedFile); }
function loadSuspect() { return loadList(suspectFile); }

function phraseHits(lower, list) {
  const hits = [];
  for (const phrase of list) {
    const re = new RegExp(`\\b${escapeRe(phrase.toLowerCase()).replace(/\s+/g, '\\s+')}\\b`, 'g');
    const m = lower.match(re);
    if (m) hits.push({ phrase, count: m.length });
  }
  return hits.sort((a, b) => b.count - a.count);
}

function stripFrontmatter(md) {
  return md
    .replace(/^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^#.*$/gm, '');
}

function sentences(text) {
  return text.replace(/\s+/g, ' ')
    .split(/(?<=[.!?…]["'”’)]?)\s+(?=[A-Z"'“‘(\[])/)
    .map(s => s.trim()).filter(s => s.length > 0);
}

function words(s) { return (s.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []); }

function stats(arr) {
  const n = arr.length;
  if (!n) return { n: 0, mean: 0, sd: 0, cv: 0, min: 0, max: 0 };
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  return { n, mean: +mean.toFixed(2), sd: +sd.toFixed(2), cv: +(sd / (mean || 1)).toFixed(3), min: Math.min(...arr), max: Math.max(...arr) };
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export function analyze(raw, banned = loadBanned(), suspect = loadSuspect()) {
  const text = stripFrontmatter(raw);
  const paras = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const sents = sentences(text);
  const sentLens = sents.map(s => words(s).length).filter(n => n > 0);
  const totalWords = words(text).length;
  const per1k = (n) => +((n / Math.max(totalWords, 1)) * 1000).toFixed(2);

  const dialoguePattern = /"[^"]*"|“[^”]*”/g;
  const quoted = text.match(dialoguePattern) || [];
  const dialogueWords = quoted.reduce((a, q) => a + words(q).length, 0);

  const openers = sents.map(s => (words(s)[0] || '').toLowerCase()).filter(Boolean);
  const openerCounts = {};
  openers.forEach(o => { openerCounts[o] = (openerCounts[o] || 0) + 1; });
  const topOpeners = Object.entries(openerCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([w, c]) => ({ word: w, count: c, share: +(c / Math.max(openers.length, 1)).toFixed(3) }));
  let openerRuns = 0, run = 1;
  for (let i = 1; i < openers.length; i++) {
    if (openers[i] === openers[i - 1]) { run++; if (run === 3) openerRuns++; } else run = 1;
  }

  let monotonyRuns = 0; run = 1;
  for (let i = 1; i < sentLens.length; i++) {
    if (Math.abs(sentLens[i] - sentLens[i - 1]) <= 3) { run++; if (run === 4) monotonyRuns++; } else run = 1;
  }

  const multiSentParas = paras.filter(p => sentences(p).length >= 2);
  const punchy = multiSentParas.filter(p => { const ss = sentences(p); return words(ss[ss.length - 1]).length <= 6; }).length;

  const count = (re) => (text.match(re) || []).length;
  const emDashes = count(/—|--/g);
  const semicolons = count(/;/g);
  const narration = text.replace(dialoguePattern, '');
  const rhetoricalQ = (narration.match(/\?/g) || []).length;
  const notBut = count(/\b(not|n't|never|no longer)\b[^.!?]{0,60}\b(but|rather|instead)\b/gi);
  const itsNotJust = count(/\b(wasn't|isn't|not|weren't|aren't)\s+(just|only|merely|simply)\s+(a|an|the|about)?\b/gi);
  const tricolon = count(/\b\w+,\s+\w+,\s+and\s+\w+\b/g);
  const lyAdverbs = count(/\b\w{4,}ly\b/g);
  const filterVerbs = count(/\b(felt|feel|feels|feeling|saw|see|sees|seeing|noticed|notice|realized|realize|realizes|wondered|wonder|thought|knew|know|heard|hear|watched|watch|seemed|seem|seems)\b/gi);
  const ellipses = count(/…|\.\.\./g);
  const exclaim = count(/!/g);
  // trailing participial explainer: ", <verb>ing <stuff>." at sentence end (e.g. ", underscoring her resolve.")
  const trailingIng = sents.filter(s => /,\s+(?:a\s+\w+\s+that\s+\w+|\w+ing\s+(?:the|his|her|their|its|my|a|an|how|what)\b)[^,.!?]{0,80}[.!?]["”]?$/i.test(s)).length;
  const somethingVague = count(/\bsomething\s+(?:shifted|stirred|broke|changed|cracked|gave|snapped|flickered|settled|ancient|primal|deep|inside)\b/gi);
  const thoughtVerbs = count(/\b(knew|know|knows|realized|realised|realize|realise|understood|understand|wondered|wonder|believed|believe|remembered|remember|wanted|want|felt|feel|thought|think|imagined|imagine|decided|decide)\b/gi);

  const lower = text.toLowerCase();
  const bannedHits = phraseHits(lower, banned);
  const suspectHits = phraseHits(lower, suspect);

  const freq = {};
  words(lower).forEach(w => { if (w.length >= 7) freq[w] = (freq[w] || 0) + 1; });
  const echoes = Object.entries(freq).filter(([, c]) => c >= 4).sort((a, b) => b[1] - a[1]).slice(0, 12)
    .map(([w, c]) => ({ word: w, count: c }));

  const paraLens = paras.map(p => words(p).length);

  return {
    words: totalWords,
    paragraphs: paras.length,
    sentences: sentLens.length,
    sentence: stats(sentLens),
    paragraph: stats(paraLens),
    dialogueShare: +(dialogueWords / Math.max(totalWords, 1)).toFixed(3),
    punchlineShare: +(punchy / Math.max(multiSentParas.length, 1)).toFixed(3),
    openerRuns, monotonyRuns, topOpeners,
    per1k: {
      emDashes: per1k(emDashes), semicolons: per1k(semicolons), rhetoricalQ: per1k(rhetoricalQ),
      notBut: per1k(notBut), itsNotJust: per1k(itsNotJust), tricolon: per1k(tricolon),
      lyAdverbs: per1k(lyAdverbs), filterVerbs: per1k(filterVerbs), ellipses: per1k(ellipses), exclaim: per1k(exclaim),
      trailingIng: per1k(trailingIng), somethingVague: per1k(somethingVague), thoughtVerbs: per1k(thoughtVerbs),
    },
    bannedHits, suspectHits, echoes,
  };
}

export function judge(a, baseline, target) {
  const issues = [];
  const warn = (sev, msg) => issues.push({ sev, msg });
  if (a.bannedHits.length) warn('FAIL', `banned phrases: ${a.bannedHits.map(h => `"${h.phrase}" x${h.count}`).join(', ')}`);
  if (a.suspectHits.length) warn('WARN', `suspect phrases (keep only on purpose): ${a.suspectHits.slice(0, 12).map(h => `"${h.phrase}" x${h.count}`).join(', ')}${a.suspectHits.length > 12 ? ` +${a.suspectHits.length - 12} more` : ''}`);
  if (a.sentence.cv < 0.45) warn('FAIL', `low burstiness: sentence-length CV ${a.sentence.cv} (<0.45). Mix fragments with one long winding sentence per scene.`);
  else if (a.sentence.cv < 0.55) warn('WARN', `moderate burstiness: CV ${a.sentence.cv}. Aim for 0.55 or higher.`);
  if (a.monotonyRuns > 0) warn('WARN', `${a.monotonyRuns} run(s) of 4+ sentences with near-identical length.`);
  if (a.openerRuns > 0) warn('WARN', `${a.openerRuns} run(s) of 3+ consecutive sentences starting with the same word.`);
  const top = a.topOpeners[0];
  if (top && top.share > 0.22 && !['i', 'the'].includes(top.word)) warn('WARN', `opener "${top.word}" starts ${Math.round(top.share * 100)}% of sentences.`);
  if (a.punchlineShare > 0.45) warn('FAIL', `punchline habit: ${Math.round(a.punchlineShare * 100)}% of paragraphs end in a 6-word-or-shorter zinger (>45%). Let some paragraphs end mid-thought.`);
  else if (a.punchlineShare > 0.35) warn('WARN', `punchline share ${Math.round(a.punchlineShare * 100)}%.`);
  if (a.per1k.emDashes > 3) warn('FAIL', `em-dash density ${a.per1k.emDashes}/1k words (>3). Use commas, periods, or restructure.`);
  else if (a.per1k.emDashes > 1.5) warn('WARN', `em-dash density ${a.per1k.emDashes}/1k.`);
  if (a.per1k.rhetoricalQ > 4) warn('WARN', `rhetorical questions in narration ${a.per1k.rhetoricalQ}/1k.`);
  if (a.per1k.notBut > 4) warn('WARN', `"not X but Y" scaffolds ${a.per1k.notBut}/1k. Cut half.`);
  if (a.per1k.itsNotJust > 0.5) warn('FAIL', `"not just X" construction present (${a.per1k.itsNotJust}/1k).`);
  if (a.per1k.tricolon > 5) warn('WARN', `tricolon lists ${a.per1k.tricolon}/1k. Prefer pairs or singles.`);
  if (a.per1k.lyAdverbs > 12) warn('WARN', `-ly adverbs ${a.per1k.lyAdverbs}/1k. Replace with stronger verbs.`);
  if (a.per1k.filterVerbs > 18) warn('WARN', `filter verbs (felt/saw/realized) ${a.per1k.filterVerbs}/1k. Render perception directly.`);
  if (a.per1k.ellipses > 6) warn('WARN', `ellipses ${a.per1k.ellipses}/1k.`);
  if (a.per1k.trailingIng > 1) warn('WARN', `trailing "-ing"/"a gesture that" explainer clauses ${a.per1k.trailingIng}/1k. End the sentence at the gesture.`);
  if (a.per1k.somethingVague > 0) warn('FAIL', `"something shifted/stirred/broke" vagueness present (${a.per1k.somethingVague}/1k). Name the exact thing.`);
  if (a.per1k.thoughtVerbs > 6) warn('WARN', `thought verbs (knew/realized/wanted/felt) ${a.per1k.thoughtVerbs}/1k (>6). Unpack into perception and action.`);
  if (a.echoes.length) warn('INFO', `repeated distinctive words: ${a.echoes.slice(0, 6).map(e => `${e.word} x${e.count}`).join(', ')}`);
  if (target) { const t = Number(target); if (t && (a.words < t * 0.8 || a.words > t * 1.25)) warn('WARN', `length ${a.words} words vs target ${t}.`); }
  if (baseline) {
    const cmp = (label, mine, ref, tol) => { if (ref && Math.abs(mine - ref) / ref > tol) warn('INFO', `${label} ${mine} vs baseline ${ref} (${Math.round(((mine - ref) / ref) * 100)}%).`); };
    cmp('mean sentence length', a.sentence.mean, baseline.sentence?.mean, 0.35);
    cmp('dialogue share', a.dialogueShare, baseline.dialogueShare, 0.5);
    cmp('mean paragraph length', a.paragraph.mean, baseline.paragraph?.mean, 0.6);
    cmp('sentence CV', a.sentence.cv, baseline.sentence?.cv, 0.35);
  }
  return issues;
}

export function corpusStats(dir) {
  const files = fs.readdirSync(dir).filter(f => /\.(txt|md)$/.test(f));
  const acc = files.map(f => analyze(fs.readFileSync(path.join(dir, f), 'utf8'), [], []));
  if (!acc.length) return null;
  const avg = (sel) => +(acc.reduce((s, a) => s + sel(a), 0) / acc.length).toFixed(3);
  return {
    files: acc.length,
    words: avg(a => a.words),
    sentence: { mean: avg(a => a.sentence.mean), cv: avg(a => a.sentence.cv) },
    paragraph: { mean: avg(a => a.paragraph.mean) },
    dialogueShare: avg(a => a.dialogueShare),
    punchlineShare: avg(a => a.punchlineShare),
    per1k: Object.fromEntries(Object.keys(acc[0].per1k).map(k => [k, avg(a => a.per1k[k])])),
  };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain) {
  if (has('--stats')) {
    const dir = flag('--stats');
    console.log(JSON.stringify(corpusStats(dir), null, 2));
    process.exit(0);
  }
  const skip = new Set([flag('--baseline'), flag('--target')]);
  const file = args.find(a => !a.startsWith('--') && !skip.has(a));
  if (!file) {
    console.error('usage: prose-lint.mjs <file> [--baseline <dir-or-json>] [--target <words>] [--json] [--strict]');
    process.exit(2);
  }
  const raw = fs.readFileSync(file, 'utf8');
  const a = analyze(raw);
  let baseline = null;
  const b = flag('--baseline');
  if (b && typeof b === 'string') {
    baseline = fs.statSync(b).isDirectory() ? corpusStats(b) : JSON.parse(fs.readFileSync(b, 'utf8'));
  }
  const issues = judge(a, baseline, flag('--target'));
  if (has('--json')) {
    console.log(JSON.stringify({ file, metrics: a, issues }, null, 2));
  } else {
    console.log(`# prose-lint: ${path.basename(file)}`);
    console.log(`words ${a.words} | paras ${a.paragraphs} | sentences ${a.sentences} | sent mean ${a.sentence.mean} sd ${a.sentence.sd} cv ${a.sentence.cv} | dialogue ${Math.round(a.dialogueShare * 100)}% | punchline ${Math.round(a.punchlineShare * 100)}%`);
    console.log(`per 1k words: em-dash ${a.per1k.emDashes} | semicolon ${a.per1k.semicolons} | narr-question ${a.per1k.rhetoricalQ} | not-but ${a.per1k.notBut} | tricolon ${a.per1k.tricolon} | -ly ${a.per1k.lyAdverbs} | filter ${a.per1k.filterVerbs} | ellipsis ${a.per1k.ellipses}`);
    if (!issues.length) console.log('OK: no issues.');
    for (const i of issues) console.log(`[${i.sev}] ${i.msg}`);
  }
  const fails = issues.filter(i => i.sev === 'FAIL').length;
  process.exit(fails && has('--strict') ? 1 : 0);
}
