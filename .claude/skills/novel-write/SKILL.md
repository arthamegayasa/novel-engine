---
name: novel-write
description: Plan, draft, lint, crosscheck, and revise one chapter of an existing novel project. Use when the user says "/novel-write", "write chapter N", "next chapter", or "continue the novel".
---

# /novel-write — one chapter, start to reviewed

**Announce**: "Menggunakan novel-write untuk chapter N: plan → draft → lint → crosscheck → revisi."

## Inputs

`/novel-write [<slug>] [N | next] [--passes 3] [--words W] [--no-review]`

- If `<slug>` is omitted and only one project exists in `projects/`, use it. If several exist, ask.
- `next` = first unfinished chapter in outline order, including an existing `drafted` or `revised` chapter. Resume its outstanding review/revision before drafting a later row. If a predecessor has not been written, complete it first unless the user explicitly requests an out-of-order sample; record the unverified continuity boundary.
- `--no-review` is for the user's own drafting experiments only; never use it in `novel-run`.

## Context loading (keep it lean; do not read the whole book)

1. `projects/<slug>/bible.md` (all of it).
2. `projects/<slug>/outline.md`: the spine, the current arc row, chapter rows N-2 .. N+2.
3. `projects/<slug>/clues.md`: every row whose planted/echoed/paid chapter is within N-3 .. N+5, plus every `planned` row for the current mystery.
4. `projects/<slug>/continuity.md`: last 40 lines of each table plus all open threads.
5. The previous chapter in full (`chapters/NNN-1.md`); the one before that, first and last 300 words.
6. `engine/style/voice-guide.md`, `engine/style/anti-ai-pitfalls.md` (skim the structural list; the phrase list is enforced by lint).
7. If genre applies: `engine/style/artoc-style-dna.md` §"Chapter shape" and §"Voice moves".

## Procedure

### Step 1. Chapter plan → `plans/NNN.md`
Use `engine/templates/chapter-plan.md`. Every field filled. If "Scene goal" or "Turn" can't be filled from the outline, fix the outline first (and say so). Decide the single sentence the chapter exists to earn. Decide what the reader should wrongly believe at the end.

### Step 2. Draft → `chapters/NNN.md`
Frontmatter:
```
---
chapter: N
title:
status: drafted
pass: 1
words:
pov:
in_story_time:
hook:
---
```
Drafting rules (non-negotiable; the reviewer will check):
- Write the scene, not the summary of the scene. Enter late, leave early.
- One turn per chapter. The value at the end differs from the value at the start.
- Emotions are rendered through action, object, and omission. The narrator may name an emotion only to undercut or misjudge it.
- Each named character speaks in their idiolect from bible §4. Read their two sample lines before writing their dialogue.
- Vary sentence length on purpose. At least one sentence over 40 words and several under 5 in any 1,000 words.
- Paragraphs may end mid-thought. Not every paragraph earns a punchline.
- Plant clues from the plan with their camouflage. Never underline a clue.
- No em-dashes. No "not X, but Y" more than once per chapter. No rhetorical question in narration unless it is in the narrator's established voice (check voice-guide).
- End on the planned hook type (one of: question, threat, reveal, decision, quiet, comic, cycle-reset, cliff). Do not add a second hook. Record the hook type as `hook:` in the frontmatter.
- Paragraph mode and speech channels as declared in bible §2.
- Target words ±15%.

### Step 3. Lint
```
node scripts/prose-lint.mjs projects/<slug>/chapters/NNN.md --baseline engine/style/baselines/<file> --target W --strict
```
Baseline file per `engine/style/baselines/README.md`: `regression-xianxia-webnovel.json` for regression / cultivation / progression genres, otherwise `default.json`. Fix every `FAIL` before review. Treat `WARN` as a prompt to look, not an order. Baseline comparison lines are INFO.

### Step 4. Crosscheck (fresh eyes)
Unless `--no-review`: run `/novel-crosscheck <slug> N` which spawns a reviewer subagent that has not seen your plan or your reasoning. Save the review to `reviews/NNN-passP.md`.

### Step 5. Revise
Apply every "Required change". Re-lint, then obtain a new independent review of the revised text with an incremented pass number. An old review never approves changed prose. If the verdict was `rewrite`, go back to Step 2 with the review's notes appended to the plan. Stop after `--passes` (default 3) total reviewed versions and report what remains; unresolved required changes keep the chapter `revised`.

### Step 6. Bookkeeping (same turn, never skipped)
- `clues.md`: move planted/echoed/paid IDs to their new status with the chapter number.
- `continuity.md`: append timeline rows, character state, established facts, open threads opened or closed.
- `outline.md`: use `reviewed` only when the latest review of the current text returns `final`; use `final` only on the user's acceptance. Without review use `drafted`; with unresolved changes use `revised`. Correct the row to what the chapter actually does. A review verdict and user acceptance are separate states.
- `STATUS.md`: next chapter, pass count, outstanding review notes.
- Update frontmatter `status`, `pass`, `words`.

## Output to the user (Indonesian, short)

Chapter number and title, word count, lint summary line, review verdict, the one or two most significant changes made in revision, and the open threads touched. Then the status block.
