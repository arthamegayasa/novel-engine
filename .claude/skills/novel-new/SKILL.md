---
name: novel-new
description: Start a new novel project from a single prompt. Produces the story bible, arc outline, clue ledger, continuity file, and a plan review before any prose is written. Use when the user says "/novel-new", "new novel", "start a story from this prompt", or gives a premise and asks for a book.
---

# /novel-new — seed a novel from one prompt

**Announce**: "Menggunakan novel-new untuk membangun bible, outline, dan clue ledger dari prompt."

## Inputs

`/novel-new <prompt> [--chapters N] [--words W] [--genre <tag>] [--panel "Author A, Author B, ..."] [--write K] [--title "..."]`

- `<prompt>`: anything from one sentence to a page. Treat it as the seed; do not ask clarifying questions unless two readings would produce materially different books. Make the routine calls yourself and record them in `STATUS.md` under "Assumptions made from the seed" (that is the canonical place; bible §0 holds only the seed verbatim).
- `--chapters N` (default 40): the number of **numbered** chapters. A prologue, if the plan calls for one, is chapter 0 and is additional. Rows are 1..N, plus 0 only when a prologue is planned.
- `--words W` (default 2500). `--genre` default: inferred and written into bible §1. `--panel` default: chosen by you from `engine/style/reference-authors.md` to fit the genre (3 to 5 lenses). `--write K`: after setup, run `/novel-write` for existing outline rows through K. `--title`: otherwise invent a working title and say so.

## Read first (in this order)

1. `engine/structure/story-architecture.md`
2. `engine/structure/mystery-playbook.md`
3. `engine/style/voice-guide.md`
4. `engine/style/reference-authors.md`
5. If the genre is regression / time loop / foreknowledge / cultivation / progression fantasy: `engine/structure/regression-genre.md` (its §9 checklist is mandatory) and `engine/style/artoc-style-dna.md`.

## Vocabulary used everywhere

- Hook types (exactly eight): `question`, `threat`, `reveal`, `decision`, `quiet`, `comic`, `cycle-reset`, `cliff`. "Hard hook" means cliff or threat.
- Distance D (plant to payoff minimum): 10 chapters, or max(3, N/10) for books under 60 chapters. Compute it, write it in the ledger header, and use it consistently.

## Procedure

### Step 1. Scaffold
```
node scripts/new-project.mjs "<title>" --seed "<the prompt verbatim>" [--slug <slug>]
```
This creates `projects/<slug>/` with `bible.md`, `outline.md`, `clues.md`, `continuity.md`, `chapters/`, `plans/`, `reviews/`, and `STATUS.md`, with the seed already in bible §0.

### Step 2. Interrogate the seed (write your answers into `bible.md`)
Work through these in order. Each answer must be a decision, not a menu.

1. **Controlling idea** as cause and effect, arguable (rubric §B1). If the seed implies none, choose one that the seed can carry.
2. **Core dramatic question** and the final chapter that answers it.
3. **The Big Question** (the central mystery), its **true answer**, and **two or three decoy answers** the reader will believe in sequence. Decide at which chapter each decoy dies on-page and in what scene.
4. **Narrator voice** (bible §2): exactly five concrete habits, at least two things the narrator never does, how the voice changes by the midpoint, the paragraph mode (`house` or `short-line`), the speech channels, and whether narration may ask rhetorical questions.
5. **World rules that matter** with costs and exceptions. Hard limits the story will never break.
6. **Cast**: want / need / wound / lie / idiolect sample lines for each major character. Every ally must be able to become an obstacle. The antagonist must be right about something.
7. **Motifs**: 5 to 8 literal objects whose meaning will shift.
8. **Arc map**: Promise / Progress / Payoff / Mystery turn per arc. Rest chapters placed. Arc length band chosen.
9. **If a genre document applies**, answer its checklist (regression-genre §9) item by item in bible §1 or waive items with a stated reason.

### Step 3. Outline
Fill `outline.md`: the spine, the arc table, and chapter rows 1..N, adding row 0 only for a planned prologue. Arc 1 gets full rows (scene goal, obstacle, turn, hook type, clues touched). Later arcs get rows with at least title, turn, and hook type. No more than two consecutive chapters with the same hook type. At least one rest chapter per arc.

### Step 4. Clue ledger
Fill `clues.md`, including D in the header. For the Big Question: at least three plants, each with a camouflage method, at distance ≥D before payoff, at least one echo. For each arc mystery: at least one plant at ≥D and one echo. Red herrings fair, with their on-page death chapter. Mark statuses `planned` and the fairness-check column `planned`. If the narrator has foreknowledge, fill the Foreknowledge Ledger, cycle ledger, cycle-end rows, and anchor moves sections.

### Step 5. Plan review (mandatory)
Spawn a fresh reviewer subagent (general-purpose). Give it the files (`bible.md`, `outline.md`, `clues.md`), `engine/rubrics/crosscheck-rubric.md` §B (all twelve items), and, when a genre document applies, that document. Give it files, not your conclusions. Save the review as `reviews/plan-review.md`, apply every required fix, and record the disposition of each in `STATUS.md`.

### Step 6. Status
Update `STATUS.md` (next chapter, assumptions, open questions for the author, review disposition). If `--write K` was given, run `/novel-write` for each existing outline row through K sequentially using the `novel-run` pattern (one fresh subagent per chapter).

## Output to the user (Indonesian, short)

Title, one-line pitch, the controlling idea, number of arcs and chapters, the author panel chosen, the three biggest assumptions you made, and the paths. Then the status block required by the user's global CLAUDE.md.
