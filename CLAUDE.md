# Novel Engine — project instructions

This folder is a fiction production system for Claude Code / Codex / T3 Code. It turns a single prompt into a story bible, an arc outline, a clue ledger, and then chapters, each of which is drafted, linted, reviewed by a fresh-context reviewer against a rubric and a panel of reference authors, and revised. The user's global `~/.claude/CLAUDE.md` still applies (respond in Indonesian, code and documents in English, status block at the end of state-changing tasks).

## Layout

| Path | What it is |
|---|---|
| `.claude/skills/novel-*/` | The commands: `/novel-new`, `/novel-arc`, `/novel-write`, `/novel-crosscheck`, `/novel-revise`, `/novel-run`, `/novel-status` |
| `engine/style/` | `voice-guide.md` (the house style), `anti-ai-pitfalls.md`, `banned-phrases.txt` (enforced by lint), `reference-authors.md` (the review panel), `artoc-style-dna.md` (what we learned from *A Regressor's Tale of Cultivation*), `baselines/*.json` (corpus statistics for lint comparison) |
| `engine/structure/` | `story-architecture.md`, `mystery-playbook.md`, `regression-genre.md` |
| `engine/rubrics/crosscheck-rubric.md` | Scoring dimensions used by every review |
| `engine/templates/` | bible, outline, clue ledger, continuity, chapter plan, review |
| `scripts/` | `new-project.mjs`, `prose-lint.mjs`, `continuity-scan.mjs`, `compile.mjs` (Node 24, no dependencies) |
| `projects/<slug>/` | One novel: `bible.md`, `outline.md`, `clues.md`, `continuity.md`, `STATUS.md`, `plans/`, `chapters/`, `reviews/` |
| `research/` | The craft report, the ARToC analysis, and slice notes. Read-only reference. |
| `.cache/` | Local reference corpus and scratch. Never copy from it into a project. Not for redistribution. |

## Invariants (the reviewer enforces these; do not argue with them in a draft)

1. **Plan before prose.** No chapter is drafted without `plans/NNN.md`.
2. **Fresh eyes.** Reviews use a fresh context without inherited history and the staged packet in `novel-crosscheck`. If unavailable, record the blocked review and retain draft status.
3. **Ledger in the same turn.** Any chapter that plants, echoes, or pays a clue updates `clues.md` and `continuity.md` before the turn ends.
4. **Fair mysteries.** Plant at distance D before payoff (D = 10 chapters, or max(3, N/10) for books under 60 chapters; recorded in the ledger), at least one echo, camouflage recorded, decoys disproven on-page.
5. **Lint FAILs block review.** Run `node scripts/prose-lint.mjs ... --strict`; exit code must be zero before `/novel-crosscheck`.
6. **No verbatim borrowing.** The reference corpus informs technique only. Names, lines, and specific plot beats from any source work are off-limits.
7. **One turn per chapter.** If the plan cannot state the value shift, the chapter is not ready.
8. **Line edits preserve facts.** `--line-edit` never changes events, knowledge states, or clue placement.

## Default workflow

```
/novel-new "<prompt>" --chapters 40          # bible, outline, clues, plan review
/novel-run <slug> 0-5                         # prologue + first five chapters, one subagent each
/novel-status <slug>                          # ledger / continuity / pacing audit
/novel-arc <slug> next                        # detail the next arc
/novel-run <slug> 6-15
/novel-revise <slug> 7 "make the master colder; cut the dream"
node scripts/compile.mjs <slug>               # manuscript
```

## Style, in one paragraph

Concrete over abstract. Scene over summary. Subtext over statement. Sentence lengths that swing. Paragraphs that sometimes stop before the point. Humour from register clash, not from quips. Feelings shown through objects and omissions and allowed to be misread by the narrator. Clues hidden in plain sight inside scenes about something else. No em-dashes, no "not X but Y" refrains, no closing moral. Full rules: `engine/style/voice-guide.md`.

## When the user asks for something outside the skills

Read `engine/` first, then do the ordinary work. Keep chapter files and ledgers consistent. If a request would break an invariant (e.g. "just write chapter 12 without a plan"), do it the user's way but say which invariant was skipped and what to run later to catch up.

## Cross-harness use and acceptance

`AGENTS.md` routes natural-language requests for Codex/T3 Code to the same canonical skills. A model review verdict `final` permits file status `reviewed`; only the user accepts a chapter as `final`. Revised text requires a matching new review. If a run is interrupted, resume the unfinished draft or review before advancing. Skills use the active model session and its usage limits; the Node scripts themselves do not generate prose.
