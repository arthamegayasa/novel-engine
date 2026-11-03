# Novel Engine: full report

Date: 2026-11-03. Scope: (1) what was learned from *A Regressor's Tale of Cultivation* (ARToC), (2) what the research says about human-sounding prose, story construction, and mystery craft, (3) how the engine built in this folder turns that into a repeatable production line with built-in cross-checking.

**Completion status.** The engine is usable in Claude Code and Codex/T3 Code through seven canonical skills. The Node utilities pass 17 regression tests. The original demo chapter is 2,785 words with zero strict lint FAILs and an independent pass-2 verdict of `final`; its file remains `reviewed` pending the user’s acceptance. Only that chapter is written, and its unwritten predecessor is an explicit verification boundary. See [coverage and validation](coverage-and-validation.md) for evidence, source gaps, and remaining limits.

This report is the summary. The detail lives in:

| Document | What it holds |
|---|---|
| `research/craft-report.md` | 11,500 words of sourced craft research: AI-prose tells and their evidence, principles from named teachers, structural models compared, fair-play mystery rules, web-serial norms, LLM-as-judge findings |
| `research/artoc-analysis.md` | The book-wide study of ARToC synthesised from 18 slice readings |
| `research/source-notes/artoc-*.md` | The slice readings themselves (one per 35 to 70 chapters), with micro-logs, clue tables, and craft takeaways |
| `research/source-notes/artoc-chapter-map.md` | All 845 published chapter titles, cycle markers, and arc boundaries |
| `engine/` | The operating documents the writer and reviewer actually load |

## 1. Method

**Corpus.** The study covers the available English collection from the prologue through site chapter 861. It is not an unabridged reading: the inventory contains 845 files spanning 843 site numbers, with 19 absent numbers, eleven preview-only entries (740–750), a truncated chapter (759), and duplicated or misnumbered material. IDs 799 and 804 occur twice; 804 contains two distinct author chapters, while notes flag 799 as a duplicate and the body of 443 as a repeat of 442. See `research/coverage-and-validation.md` for the inventory audit. Source text remains local in `.cache/` and is excluded from delivery packages.

**Reading.** Eighteen agents produced ordered slice notes from the available material. Their brief permitted skimming fight and mechanics passages; reconstructed sections and unavailable passages are identified in the notes. The synthesis draws on these notes, rather than claiming a verified close reading of every line. The present completion pass audited coverage metadata and engine behavior, not every earlier literary interpretation.

**Research.** The craft report combines primary research and authors’ direct teaching where accessible, secondary craft commentary, and reader reception. These have different evidential weight. Editorial choices and thresholds are heuristics, not research-validated quality guarantees.

**Build.** Skills, templates, rubric, scripts, and style documents were written against the research, then calibrated against corpus statistics (`engine/style/baselines/regression-xianxia-webnovel.json`).

## 2. What ARToC does, and what is portable

### 2.1 The spine

The book is organised by regression cycles, each announced by a "Nth Cycle's First Day" chapter. There are 32 such markers across 845 chapters, but they are not evenly spaced: early cycles are five to fifteen chapters, later ones run to sixty or more, and the cycle count jumps from the twenties into the hundreds and then thousands as the author compresses repeated loops into paragraphs. The regression anchor point itself moves (notably around chapter 140 and again around 674), which converts earlier "disposable" lives into permanent history and changes what the protagonist can carry.

Portable rule: **a repeated structural unit with a fixed opening ritual is a measuring stick.** ARToC re-runs the same four-day script at every First Day so the reader measures growth against a constant without exposition, and it breaks the ritual only when the break is itself the plot. The engine's story-architecture document adopts this as the "fixed ruler" pattern for any series with resets, seasons, or recurring set pieces.

### 2.2 Voice

First person, close, interior. One clause per paragraph is the default, so a full paragraph is an event. Interior calculation sits in single quotes; conviction is a bare declarative; non-human speech is bracketed; later, redaction glyphs mark names the text refuses to say. Rhythm comes from countdown lists, anaphora, and sound-effect lines used as punctuation. Humour is register clash: a salaryman's vocabulary against xianxia grandeur, deflation after grandeur, running gags that are dropped on the day of a loss. Grief is routed through objects and counts (a list of thirty-four names with no adjectives; twenty-one bottles; a trampled potato flower), and the cost of a sacrifice is revealed by a third party, never confessed.

Portable rules are catalogued as "moves" in `engine/style/artoc-style-dna.md`. The house voice guide keeps the restraint, the register clash, the object-ledger grief, and the short-paragraph rhythm. It does not keep the translation's ellipsis and exclamation density, the over-explanation Korean readers complained about, or the melodrama.

### 2.3 Mystery management

This is the book's reputation and the reason the user named it. The slice readings confirm the praise with specifics:

- **Clues are planted as mannerisms, jokes, and jargon the narrator cannot parse.** A laugh, a forbidden topic, a shoulder pat, a line of a mantra, a bookseller's odd referral. The reader files them as colour.
- **The narrator's confident wrong theory is the main misdirection.** He deduces, the reader trusts him, and the correction lands as a reveal. Narration misreads but does not lie; this is fair unreliability in Gene Wolfe's sense.
- **Villain cutaways and side points of view** keep the reader one secret above the hero without telling the hero.
- **Chapter titles carry hidden text**: a run of arc titles turns out to be the lines of a mantra the hero is unknowingly learning.
- **Payoffs are assembled on-page from quoted plants**, so the reader names the villain a beat before the text does. The largest identity reveal rests on five or more quiet plants spread across hundreds of chapters.
- **Decoys die on-page.** Each wrong answer to "what is the hidden hand" gets a scene that both kills it and advances plot.
- **Plenty-of-nothing** details (the only thing in the drawer was a receipt) and **refusal-as-information** (what a character will not say) are used repeatedly.
- **The thematic verdict is placed one chapter after the physical victory**, so fights never end the argument.

The readers also found the weak spots: a few reveals rely on retroactive testimony rather than planted behaviour; late cosmology is introduced and paid within one chapter near the end (the author's afterword admits this). The engine's ledger rules are written to prevent exactly those two failures.

### 2.3a Numbers the synthesis settled on

| Measure | ARToC | Engine default in this mode |
|---|---|---|
| Hook mix across ~830 chapters | ~40% cliff or threat, ~20% reveal, ~15% quiet, ~10% decision, ~5% each question and comic | same mix; no hook type three chapters running; soft close after every very hard one |
| Rest chapters | one per three to five, each carrying a short plant (≤10 ch) and a long plant (≤60 ch) | mandatory per arc; rest chapters are where long plants go |
| Cycle length | 5 to 15 chapters early; 45 to 85 in the stretch where readers quit | cap near 40; a realm arrival or dream world runs the reset template without a reset |
| Reset template | five jobs: fixed ruler, ledger audit as discovery, one-sentence goal, test one power on something inert, end on the first changed fact | adapted as a high-level planning pattern; five sanctioned ways to vary it, each usable once |
| Breakthroughs | one per cycle, at death or loss, cost named first, humiliation before gain | adopted; a tier without a named cost is rejected at plan review |
| Baseline prose stats | mean sentence 12 words, CV 0.74, dialogue 21%, thought verbs 6/1k, questions 3/1k | keep these; ignore ellipsis, exclamation, and -ly rates as translation noise |

### 2.4 Weaknesses to design against

From the notes and from Korean reader reception: emotional excess in inner monologue; padding around minor realms; relationships erased by resets so bonds do not accumulate; a mid-book sag; scale inflation into geological time; comedy quarantined in side stories so the tone splits. The engine's responses: thought-verb and filter-verb budgets, a "pull back when it hurts" rule, a mandatory carry-over item so bonds persist across resets, rest chapters that must plant something, milestone-not-calendar compression, and one comic beat inside tense chapters rather than outside the book.

## 3. What the research says

### 3.1 AI-prose pitfalls

The craft report collects recurrent patterns such as significance inflation, explanatory participial endings, repeated negative contrasts, generic sensory lists, and over-tidy conclusions. Their evidence comes from different domains: the PubMed vocabulary study concerns abstracts, secondary reporting describes an Economist analysis, and the quoted burstiness result comes from one vendor benchmark. These observations motivate editorial heuristics; they neither identify authorship nor guarantee human-sounding fiction. Lint thresholds are house-style choices, not validated detection rules. Revision should preserve a character’s specific voice instead of mechanically optimizing every metric.

The engine ships a hard-ban list (FAIL) and a soft list (WARN) in `engine/style/`, and a forty-item structural checklist in `engine/style/anti-ai-pitfalls.md`.

### 3.2 Human-sounding prose

Named, checkable rules from named teachers: Palahniuk's thought-verb ban; Gardner's psychic-distance ladder; Swain's motivation-reaction order; Butcher's scene outcomes with "No, and furthermore" as the default; Le Guin's crowding and leaping; Maass's three emotional modes; Saunders's "always be escalating"; Hemingway's omission only of what the writer knows; King's ten percent cut. These became the forty-two rules of `engine/style/voice-guide.md` and the sixteen lenses of `engine/style/reference-authors.md`.

### 3.3 Story construction

Eleven structural models were compared. The engine's hybrid: Promise/Progress/Payoff as the series spine; Seven-Point arcs planned backwards with Plot Turn 2 always a ledger payoff; Story Circle mini-arcs; and "one scene, one turn" chapters with Coyne's five commandments as the quality gate. Reveal chapters use kishōtenketsu; training chapters use try/fail cycles; rest chapters are sequel-heavy and still shift a value. Hard cliffhangers at most once per four or five chapters; hook types rotate.

### 3.4 Mystery craft

Knox and Van Dine translated to a regressor-narrator; Christie's catalogue (plenty of nothing, identity theft, sawing the clue in half); Wolfe's fair unreliability; Sanderson's "the author must know the answer before planting the question." The engine encodes these as a Clue Ledger with required fields (what the reader is meant to think, what is actually true, camouflage method, fair-play check), distance rules (record distance D in the ledger: 10 chapters for a long serial, max(3, N/10) for a book under 60 chapters; use the playbook’s matching short-book schedule), a Foreknowledge Ledger for regressors, and a reader-simulation step before any payoff.

### 3.5 Serial norms and judging

Two thousand to twenty-eight hundred words per chapter; end on a pull; debt-and-repayment rhythm; antagonists win an exchange before losing. [LitBench](https://arxiv.org/abs/2507.00769) reported 73% human-preference agreement for its best tested zero-shot judge on that story-pair benchmark. This is not an accuracy estimate for this engine. Other work identifies judge biases involving length, position, and style; the engine's rubric therefore demands quoted evidence for every deduction, blinds the reviewer to mystery truths, and uses a panel of disagreeing lenses rather than one "is it good" score.

## 4. The engine

### 4.1 Pipeline

```
/novel-new  ──► bible, outline, clue ledger, continuity ──► plan review (fresh subagent)
/novel-arc  ──► detailed chapter rows + clue schedule   ──► plan review
/novel-write N:
    plan (plans/NNN.md) ──► draft ──► lint (FAIL blocks) ──► crosscheck (fresh subagent,
    rubric + find-the-clue + continuity + author panel) ──► revise ──► bookkeeping
/novel-run N-M  ──► one fresh subagent per chapter, sequential, status audit every 5
/novel-status   ──► ledger integrity, continuity drift, hook monotony, voice drift
/novel-revise N ──► change list ──► edit in place ──► re-lint ──► re-review
node scripts/compile.mjs ──► manuscript
```

### 4.2 Why it cross-checks the way it does

- **Fresh eyes.** The context that drafted a chapter never reviews it. The reviewer receives files, not the writer's intentions.
- **Blind to the answer.** The reviewer saves an unaided first-read note before seeing editorial requirements or clue descriptions. Hidden answers, future cast facts, and payoff dates are removed from the packet. A payoff’s truth is supplied only after that note.
- **Disagreeing lenses.** Sixteen reference-author lenses, three to five per book, chosen by chapter type. Each lens must use its own criteria; agreement is allowed when supported. The panel is not a set of actual author endorsements.
- **Deterministic first.** `prose-lint.mjs` runs before any model review: banned phrases, burstiness, punchline habit, em-dashes, "not X but Y", trailing explainers, "something shifted", thought and filter verbs, repeated openers, and comparison against a genre baseline built from the corpus.
- **Ledger in the same turn.** Clue and continuity updates are part of the chapter, not a later chore. `/novel-status` audits for overdue plants, orphan payoffs, silent abandonments, and hook monotony.

### 4.3 Files

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Invariants and layout; read by every session in this folder |
| `README.md` | User manual |
| `.claude/skills/novel-*/SKILL.md` | The seven commands |
| `engine/style/voice-guide.md` | House style, 42 rules |
| `engine/style/anti-ai-pitfalls.md` | 40 structural tells with fixes, lint targets, cross-chapter diversity rules |
| `engine/style/banned-phrases.txt`, `suspect-phrases.txt` | Lint lists (FAIL / WARN) |
| `engine/style/reference-authors.md` | 16 lenses and a panel-by-chapter-type table |
| `engine/style/artoc-style-dna.md` | Portable moves learned from ARToC |
| `engine/style/baselines/` | Corpus statistics for lint comparison |
| `engine/structure/story-architecture.md` | Four-layer structure, chapter shape, hooks, rest and reveal chapters |
| `engine/structure/mystery-playbook.md` | Contract, distances, 13 camouflage methods, Foreknowledge Ledger, reader simulation |
| `engine/structure/regression-genre.md` | Cycle template, cycle ledger, anchor moves, ending a loop story, `/novel-new` checklist |
| `engine/rubrics/crosscheck-rubric.md` | 11 chapter dimensions with verdict rule; 12 plan dimensions; panel protocol |
| `engine/templates/` | bible, outline, clue ledger, continuity, chapter plan, review |
| `scripts/` | `new-project.mjs`, `prose-lint.mjs`, `continuity-scan.mjs`, `compile.mjs` |

### 4.4 Limits to know about

- The shipped genre baseline describes an uncleaned translated corpus containing stubs, duplicates, and damaged entries. It is a comparison reference, not a validated quality target. The tokenizer was subsequently corrected; older statistics are historical. Build a fresh baseline from a clean, lawfully usable genre corpus when needed.
- Fresh contexts reduce exposure to the writer’s rationale, but do not establish review reliability. The model’s editorial verdict is separate from the user’s acceptance. There has been no human-reader evaluation of this engine.
- The engine learns technique from ARToC. It never reuses names, lines, or plot beats, and the reviewer treats any such borrowing as a violation.

## 5. Recommended way to start

1. `/novel-new "<seed>" --chapters 30` with a seed that includes the one thing the protagonist wants to lose, not only what they want to gain. Read the plan review before writing.
2. `/novel-run <slug> 0-3`. Read chapter 1 yourself. Edit the bible's voice section if the narrator is not yet the person you hear.
3. `/novel-status`, then `/novel-arc next`, then run the rest of arc 1.
4. Revise with `/novel-revise <slug> N "<your note>"`, which keeps facts and clues fixed unless you ask for a developmental edit.
