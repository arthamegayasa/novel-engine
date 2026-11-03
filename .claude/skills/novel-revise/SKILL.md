---
name: novel-revise
description: Revise an existing chapter from review or user notes, then lint and obtain an independent review. Use for novel-revise, requests to revise a chapter, or chapter feedback.
---

# /novel-revise — targeted revision of one chapter

**Announce**: "Menggunakan novel-revise untuk chapter N berdasarkan catatan review."

## Inputs

`/novel-revise [<slug>] N ["<notes>"] [--from-review] [--line-edit | --dev-edit]`

- `<notes>`: the user's instructions (any language). If absent and `--from-review` is set or a review exists for N with verdict `revise`/`rewrite`, use its "Required changes".
- `--dev-edit`: structural pass (scene goal, turn, hook, clue placement). May change what happens.
- `--line-edit` (default): prose-level pass. Must not change what happens, who knows what, or which clues are planted.

## Procedure

1. Load: `bible.md` §2, §4, §8; the chapter; its latest review; `clues.md` rows touching N; `continuity.md` open threads; `engine/style/voice-guide.md`; `engine/style/anti-ai-pitfalls.md`.
2. Write a **change list** before editing: each item = location (quote 5 to 10 words), problem, intended fix. Save to `reviews/NNN-changes-passP.md`. If the user's notes conflict with the clue ledger or continuity, say so and propose the smallest reconciliation; apply the user's decision if they already made one.
3. Edit the chapter in place. For line edits, work paragraph by paragraph; do not regenerate the whole chapter (regeneration loses the good accidents and reintroduces tells).
4. Re-lint. Fix FAILs.
5. Bump frontmatter `pass`; set `status: revised`.
6. Unless the user said otherwise, run `/novel-crosscheck <slug> N --pass P` using the newly incremented frontmatter pass. Never reuse the old review for changed text.
7. Bookkeeping: synchronize frontmatter, outline, word count, and STATUS. A latest verdict of `final` permits `reviewed`; only the user's acceptance permits `final`. Unresolved changes remain `revised`. If a dev edit moved a clue or changed a fact, update `clues.md` and `continuity.md` in the same turn and log any `RETCON`; flag affected later chapters for review before continuing the run.

## Output (Indonesian, short)

What changed (3 to 6 bullets with before/after fragments of at most 10 words each), lint line, new verdict, status block.
