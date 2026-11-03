# Novel Engine

A fiction production system that runs inside Claude Code, Codex, or T3 Code. One prompt in, a planned and reviewed novel out, one chapter at a time, with every chapter checked against a rubric, a clue ledger, a continuity file, and a panel of reference authors before it is accepted.

No extra API keys or server are required; generation uses the active model session and its usage limits. The engine is a set of skills (`/novel-*`), reference documents (`engine/`), and four small Node scripts.

## Install in T3 Code

Clone this repository, then open its folder as a T3 Code project:

```sh
git clone https://github.com/arthamegayasa/novel-engine.git
```

For use from any project, install the `skills/novel-engine` directory as a user skill. The Codex skill-installer accepts this repository and that path; its default destination is `~/.codex/skills/novel-engine`. For Claude in T3 Code, install the same directory under `~/.claude/skills/novel-engine`.

Beside each installed `SKILL.md`, create a local `workspace.json` pointing to your checkout, for example:

```json
{"root": "C:/Projects/novel-engine"}
```

Use your actual absolute path. This keeps the shared engine resources and manuscripts together; the global entrypoint loads the canonical procedures from the checkout. Do not copy the seven individual procedure files into global skills without their workspace resources.

In T3 Code, open **Command Palette → Restart agent session**, then type **`$novel-engine`** and choose the skill. The conversation is retained. The entrypoint routes creation, chapter drafting, revision, review, and status requests. When working inside the checkout, `AGENTS.md` also supports plain-language use; Claude additionally discovers the seven project-local `/novel-*` skills.

The public repository includes the original `not-yet` example. New `projects/<slug>` manuscripts are ignored by Git by default; publishing one requires an explicit choice.

## Quick start

Open this folder as the project in T3 Code. In Codex, `AGENTS.md` routes ordinary requests to the same canonical skills. If `/novel-*` does not appear in the host command menu, use plain language, for example:

> Read AGENTS.md and use Novel Engine to create a complete original 12-chapter regression mystery from this premise: a mapmaker loses one remembered street each time she returns to yesterday. Plan it, write and independently review each chapter, revise as needed, and compile the manuscript. Keep progress in STATUS.md so the run can resume after interruption.

For a single command that includes drafting, use `/novel-new "<premise>" --chapters 12 --write 12`. The prologue is included only when planned. A whole book is generated sequentially across model work and may require resuming after session limits; it is not a single model response.


```
/novel-new "A hospital night-shift nurse keeps waking up on the same Tuesday, but each loop one more patient remembers her." --chapters 30
/novel-run <slug> 0-5
/novel-status <slug>
/novel-revise <slug> 3 "the doctor's dialogue is too polite; he is exhausted and rude"
node scripts/compile.mjs <slug>
```

`<slug>` is printed by `/novel-new` (derived from the title). If only one project exists you may omit it.

## What each command does

| Command | Produces | Reviewed by |
|---|---|---|
| `/novel-new <prompt>` | `bible.md`, `outline.md`, `clues.md`, `continuity.md`, `STATUS.md` | plan review (fresh subagent, rubric §B) |
| `/novel-arc <slug> next` | detailed chapter rows and clue schedule for one arc | plan review |
| `/novel-write <slug> N` | `plans/NNN.md`, `chapters/NNN.md`, `reviews/NNN-passP.md`, ledger updates | lint + chapter review (rubric §A + author panel) |
| `/novel-run <slug> N-M` | chapters N..M, one fresh subagent each, sequential | each chapter as above; status audit every 5 |
| `/novel-crosscheck <slug> N` | a review file and a verdict | fresh subagent |
| `/novel-revise <slug> N "notes"` | change list, edited chapter, re-review | fresh subagent |
| `/novel-status <slug>` | ledger / continuity / pacing audit, next chapter | deterministic scripts + reasoning |

## How a chapter gets made

1. **Plan** (`engine/templates/chapter-plan.md`): scene goal, obstacle, the single turn, the hook type, the clues and their camouflage, the sentence the chapter exists to earn, and what the reader should wrongly believe at the end.
2. **Draft** under the house style (`engine/style/voice-guide.md`) and the book's own voice (bible §2).
3. **Lint** (`scripts/prose-lint.mjs`): banned phrases, burstiness, punchline habit, em-dash density, "not X but Y" scaffolds, filter verbs, repeated openers, and a comparison against a genre baseline. FAILs block review.
4. **Crosscheck**: a subagent that did not write the chapter scores it on eleven dimensions, hunts for the clues without being told where they are, checks continuity line by line, and applies each selected reference-author principle as an editorial lens. These are model reviews, not actual author endorsements or plagiarism certification.
5. **Revise** until `final` or the pass limit (default 3).
6. **Bookkeeping** in the same turn: clue ledger, continuity, outline row, status.

## Why the crosscheck is a separate context

A writer reviewing their own draft in the same context sees what they meant, not what they wrote. The reviewer starts without inherited conversation. It first saves a reader response to the prose alone, then opens a spoiler-filtered editorial packet and searches for the required plants. Full mystery truths and future cast facts stay out of the packet; a payoff audit receives only its relevant answer after the first-read note.

## The reference material

- `research/craft-report.md`: writing styles, phrasing, story construction, AI-prose pitfalls, mystery craft, revision practice, with sources.
- `research/artoc-analysis.md`: a synthesis of the available collection through site number 861, distilled into technique: voice, cycle structure, clue management, emotional construction. Coverage has gaps, previews and duplicates; see `research/coverage-and-validation.md`.
- `research/source-notes/`: the per-slice reading notes behind the analysis.
- `engine/style/artoc-style-dna.md`: the portable version of those lessons, used by the writer and the reviewer when the genre fits.

The engine learns *technique* from reference works. It never reuses their names, lines, or specific beats; the reviewer treats that as a violation.

## The demo project

`projects/not-yet/` was produced by running `/novel-new` from a fresh context on an original regression seed (a Jakarta neurology resident who returns to the minute before an earthquake, and finds her former patients arriving ahead of her). It holds a complete bible, a 31-row outline, a clue ledger with decoys and a Foreknowledge Ledger, a plan review with its fixes applied, and chapter 1 (2,785 words) with its plan, two reviews, and ledger updates. Its latest independent verdict is `final`; the file is `reviewed`, pending user acceptance. Chapter 0 has not been written, so the transition from the prologue remains unverified. Use it as the worked example of what every file should look like, or delete it and start your own.

## Scripts

```
node scripts/new-project.mjs "Title" [--seed "prompt"]
node scripts/prose-lint.mjs projects/<slug>/chapters/003.md --baseline engine/style/baselines/regression-xianxia-webnovel.json --target 2500 --strict
node scripts/prose-lint.mjs --stats <dir-of-txt>          # build a new baseline from any corpus you own
node scripts/continuity-scan.mjs <slug>
node scripts/compile.mjs <slug> [--status drafted] [--txt]
```

Node 24, no dependencies. Run the regression suite with `node --test tests/cli.test.mjs`. `--strict` makes lint FAILs return exit code 1; ordinary mode reports them without failing the process. The continuity scanner is a heuristic aid, so the model review must still check facts against the ledger.

## Layout

See `CLAUDE.md` for the full table and the invariants the reviewer enforces.

## Acceptance and resuming

Chapter statuses are `drafted` → `revised` → `reviewed` → `final`. A matching independent review with verdict `final` permits `reviewed`; user acceptance permits file status `final`. Every prose edit requires a new review. Unresolved required edits stop a multi-chapter run. The compiler includes reviewed/final files by default; it does not prove every outlined chapter exists, so compare the included count with the outline before calling a book complete.

## Delivery package

`dist/novel-engine.zip` contains the skills, engine references, scripts, tests, main reports, and original demo. Raw reference text, browser captures, receiver scripts, and large working slice notes are excluded. The engine works without that cache. The main reports and detailed working notes also remain in this project for local audit. `research/coverage-and-validation.md` records evidence limits and checks performed.
