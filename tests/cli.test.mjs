import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function workspace(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'novel-cli-test-'));
  t.after(() => {
    assert.equal(path.dirname(fs.realpathSync(dir)), fs.realpathSync(os.tmpdir()));
    assert.match(path.basename(dir), /^novel-cli-test-/);
    fs.rmSync(dir, { recursive: true, force: true });
  });
  fs.cpSync(path.join(sourceRoot, 'scripts'), path.join(dir, 'scripts'), { recursive: true });
  fs.cpSync(path.join(sourceRoot, 'engine', 'templates'), path.join(dir, 'engine', 'templates'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'engine', 'style'), { recursive: true });
  for (const name of ['banned-phrases.txt', 'suspect-phrases.txt']) {
    fs.copyFileSync(path.join(sourceRoot, 'engine', 'style', name), path.join(dir, 'engine', 'style', name));
  }
  return {
    dir,
    run(script, ...args) {
      const result = spawnSync(process.execPath, [path.join(dir, 'scripts', script), ...args], {
        cwd: dir, encoding: 'utf8', timeout: 10000,
      });
      assert.ifError(result.error);
      return result;
    },
  };
}

function project(w, chapters) {
  const result = w.run('new-project.mjs', 'Test Book');
  assert.equal(result.status, 0, result.stderr);
  const dir = JSON.parse(result.stdout).dir;
  for (const [file, raw] of Object.entries(chapters)) {
    fs.writeFileSync(path.join(dir, 'chapters', file), raw);
  }
  return dir;
}

test('scaffolding rejects a slug that escapes the projects directory', (t) => {
  const w = workspace(t);
  const result = w.run('new-project.mjs', 'Escape', '--slug', '../escaped');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /slug/i);
  assert.equal(fs.existsSync(path.join(w.dir, 'escaped')), false);
});

test('scaffolding accepts identical title and seed and preserves the seed literally', (t) => {
  const w = workspace(t);
  const seed = 'A $& story';
  const result = w.run('new-project.mjs', seed, '--seed', seed);
  assert.equal(result.status, 0, result.stderr);
  const project = JSON.parse(result.stdout);
  assert.equal(project.slug, 'a-story');
  const bible = fs.readFileSync(path.join(project.dir, 'bible.md'), 'utf8');
  assert.ok(bible.includes(`# Story Bible: ${seed}`));
  assert.ok(bible.includes(`\n${seed}\n`));
  const duplicate = w.run('new-project.mjs', seed);
  assert.notEqual(duplicate.status, 0);
  assert.equal(fs.readFileSync(path.join(project.dir, 'bible.md'), 'utf8'), bible);
});

test('compile rejects an unknown status without overwriting an existing manuscript', (t) => {
  const w = workspace(t);
  const dir = project(w, { '001.md': '---\nchapter: 1\nstatus: drafted\n---\nUnreviewed words.' });
  const out = path.join(dir, 'test-book-manuscript.md');
  fs.writeFileSync(out, 'Previous approved manuscript');
  const result = w.run('compile.mjs', 'test-book', '--status', 'finla');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /status/i);
  assert.equal(fs.readFileSync(out, 'utf8'), 'Previous approved manuscript');
});

test('compile selects reviewed chapters and keeps empty titles out of the manuscript', (t) => {
  const w = workspace(t);
  const dir = project(w, {
    '000.md': '---\nchapter: 0\ntitle: First Light\nstatus: final\n---\nRain fell.',
    '001.md': '---\nchapter: 1\ntitle: \nstatus: reviewed\n---\nA door opened.',
    '002.md': '---\nchapter: 2\ntitle: Later\nstatus: drafted\n---\nExcluded draft.',
  });
  const result = w.run('compile.mjs', 'test-book');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual({ ...JSON.parse(result.stdout), outPath: null }, { outPath: null, chapters: 2, words: 5 });
  assert.equal(fs.readFileSync(path.join(dir, 'test-book-manuscript.md'), 'utf8'),
    '# Test Book\n\n## Prologue: First Light\n\nRain fell.\n\n* * *\n\n## Chapter 1\n\nA door opened.\n');
});

test('compile parses line-delimited frontmatter with CRLF and an inline triple hyphen', (t) => {
  const w = workspace(t);
  const dir = project(w, {
    '001.md': '\uFEFF---\r\nchapter: 1\r\ntitle: Before---After\r\nstatus: reviewed\r\n---\r\nCafé walls glowed.',
  });
  const result = w.run('compile.mjs', 'test-book');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).chapters, 1);
  assert.equal(fs.readFileSync(path.join(dir, 'test-book-manuscript.md'), 'utf8'),
    '# Test Book\n\n## Chapter 1: Before---After\n\nCafé walls glowed.\n');
});

test('compile preserves an existing manuscript when no chapters meet the requested status', (t) => {
  const w = workspace(t);
  const dir = project(w, { '001.md': '---\nchapter: 1\nstatus: drafted\n---\nDraft only.' });
  const out = path.join(dir, 'test-book-manuscript.md');
  fs.writeFileSync(out, 'Approved content');
  const result = w.run('compile.mjs', 'test-book');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /no chapters/i);
  assert.equal(fs.readFileSync(out, 'utf8'), 'Approved content');
});

test('continuity scan reports a missing project as an error', (t) => {
  const w = workspace(t);
  const result = w.run('continuity-scan.mjs', 'missing', '--json');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /project/i);
  assert.equal(result.stdout, '');
});

test('continuity scan finds repeated hooks and unlogged terms using chapter metadata', (t) => {
  const w = workspace(t);
  project(w, {
    '001.md': '\uFEFF---\r\nchapter: 1\r\ntitle: Before---After\r\nhook: question\r\n---\r\nMara waited 3 days.',
    '002.md': '---\nchapter: 2\nhook: question\n---\nMara waited 2 days.',
    '003.md': '---\nchapter: 3\nhook: question\n---\nMara left.',
  });
  const result = w.run('continuity-scan.mjs', 'test-book', '--json');
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.deepEqual(report.hookRuns, ['3']);
  assert.deepEqual(report.unloggedTerms, [{ term: 'Mara', chapters: ['1', '2', '3'] }]);
  assert.deepEqual(report.numbersByChapter, { 1: ['3 days'], 2: ['2 days'], 3: [] });
});

test('lint ignores frontmatter and counts prose consistently in a Windows chapter file', (t) => {
  const w = workspace(t);
  const file = path.join(w.dir, 'sample.md');
  fs.writeFileSync(file, '\uFEFF---\r\nchapter: 1\r\ntitle: Before---After\r\nstatus: reviewed\r\n---\r\n# A heading\r\n\r\nNaïve children waited.\r\n\r\nStop.\r\n\r\nAcross the courtyard a copper bell rang twice before the old caretaker unlocked the gate.');
  const result = w.run('prose-lint.mjs', file, '--json');
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.metrics.words, 19);
  assert.equal(report.metrics.sentences, 3);
});

test('compiled word totals match prose lint for accented names and scene separators', (t) => {
  const w = workspace(t);
  const dir = project(w, { '001.md': '---\nchapter: 1\nstatus: reviewed\n---\nNaïve children waited.\n\n---\n\nStop.' });
  const result = w.run('compile.mjs', 'test-book');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).words, 4);
  const lint = w.run('prose-lint.mjs', path.join(dir, 'chapters', '001.md'), '--json');
  assert.equal(JSON.parse(lint.stdout).metrics.words, 4);
});

test('compile rejects a missing option value before writing output', (t) => {
  const w = workspace(t);
  const dir = project(w, { '001.md': '---\nchapter: 1\nstatus: reviewed\n---\nReady.' });
  const result = w.run('compile.mjs', 'test-book', '--status');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /status/i);
  assert.equal(fs.existsSync(path.join(dir, 'test-book-manuscript.md')), false);
});

test('compile refuses project paths outside the projects directory', (t) => {
  const w = workspace(t);
  const dir = project(w, { '001.md': '---\nchapter: 1\nstatus: reviewed\n---\nReady.' });
  const outside = path.join(w.dir, 'outside');
  fs.cpSync(dir, outside, { recursive: true });
  const result = w.run('compile.mjs', '../outside');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /slug/i);
  assert.equal(fs.existsSync(path.join(w.dir, 'outside-manuscript.md')), false);
});

test('scaffolding truncates long titles to a valid slug', (t) => {
  const w = workspace(t);
  const result = w.run('new-project.mjs', `${'a'.repeat(59)} more`);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).slug, 'a'.repeat(59));
});

test('lint excludes every question in multi-sentence dialogue from narrative questions', (t) => {
  const w = workspace(t);
  const file = path.join(w.dir, 'questions.md');
  fs.writeFileSync(file, '“Where is Mara? Did she leave? Please ask the keeper.” I waited. Had she gone?');
  const result = w.run('prose-lint.mjs', file, '--json');
  assert.equal(result.status, 0, result.stderr);
  const { metrics } = JSON.parse(result.stdout);
  assert.equal(metrics.words, 15);
  assert.equal(metrics.per1k.rhetoricalQ, 66.67);
});

test('strict lint blocks banned phrases while report-only mode still emits its findings', (t) => {
  const w = workspace(t);
  const file = path.join(w.dir, 'banned.md');
  fs.writeFileSync(file, 'The tapestry hung beside the window. Stop. Across the courtyard a copper bell rang twice before the old caretaker unlocked the gate.');
  const report = w.run('prose-lint.mjs', file, '--json');
  assert.equal(report.status, 0, report.stderr);
  const strict = w.run('prose-lint.mjs', file, '--json', '--strict');
  assert.equal(strict.status, 1);
  assert.ok(JSON.parse(strict.stdout).issues.some(issue => issue.sev === 'FAIL' && /banned phrases/.test(issue.msg)));
});

test('a user-owned corpus produces a baseline and can be used in a lint report', (t) => {
  const w = workspace(t);
  const corpus = path.join(w.dir, 'corpus');
  fs.mkdirSync(corpus);
  fs.writeFileSync(path.join(corpus, 'one.txt'), 'Rain fell. A child waited.');
  fs.writeFileSync(path.join(corpus, 'two.md'), '---\nchapter: 1\n---\nThe bell rang.');
  const result = w.run('prose-lint.mjs', '--stats', corpus);
  assert.equal(result.status, 0, result.stderr);
  const baseline = JSON.parse(result.stdout);
  assert.equal(baseline.files, 2);
  assert.equal(baseline.words, 4);
  const baselineFile = path.join(w.dir, 'baseline.json');
  fs.writeFileSync(baselineFile, result.stdout);
  const lint = w.run('prose-lint.mjs', path.join(corpus, 'one.txt'), '--baseline', baselineFile, '--json');
  assert.equal(lint.status, 0, lint.stderr);
  assert.equal(JSON.parse(lint.stdout).metrics.words, 5);
});

test('compile removes matching leading chapter headings and preserves other headings', (t) => {
  const w = workspace(t);
  const dir = project(w, {
    '000.md': '---\nchapter: 0\ntitle: First Light\nstatus: reviewed\n---\n# Prologue: First Light\n\nRain fell.',
    '001.md': '---\nchapter: 1\ntitle: Clock\nstatus: reviewed\n---\n# Chapter 1: Clock\n\nA door opened.',
    '002.md': '---\nchapter: 2\ntitle: Prayer\nstatus: reviewed\n---\n# A Prayer\n\nShe waited.\n\n## Chapter 2: Prayer\n\nA later section remained.',
  });
  const result = w.run('compile.mjs', 'test-book');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.readFileSync(path.join(dir, 'test-book-manuscript.md'), 'utf8'),
    '# Test Book\n\n## Prologue: First Light\n\nRain fell.\n\n* * *\n\n## Chapter 1: Clock\n\nA door opened.\n\n* * *\n\n## Chapter 2: Prayer\n\n# A Prayer\n\nShe waited.\n\n## Chapter 2: Prayer\n\nA later section remained.\n');
});
