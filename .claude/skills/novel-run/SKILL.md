---
name: novel-run
description: Write a run of chapters (e.g. 1-10 or a whole arc) with one fresh subagent per chapter so each chapter gets a clean context, sequentially, with bookkeeping between chapters. Use when the user says "/novel-run", "write the whole arc", "generate the full story", or "write chapters N to M".
---

# /novel-run — sequential multi-chapter production

**Announce**: "Menggunakan novel-run untuk chapter N–M, satu subagent per chapter."

## Inputs

`/novel-run [<slug>] <N>-<M> [--passes 2] [--stop-on rewrite]`

## Why one subagent per chapter

A chapter written in a context that still holds five earlier drafts drifts toward their phrasing and structure. Each chapter is produced by a fresh `general-purpose` subagent that runs the `/novel-write` procedure for exactly one chapter, reading only the files the procedure lists. The orchestrator (you) keeps a running summary and enforces order.

## Procedure

For each chapter k from N to M, sequentially (never in parallel, because k+1 depends on k's continuity updates):

1. Confirm `outline.md` row k exists. Skip a `reviewed`/`final` row only when its current chapter and matching review exist. Resume `drafted`/`revised` rows; write a new draft for `planned` rows. If the row is missing, run the outline step of `/novel-arc` for the current arc first. Do not invent chapter 0 when the outline has no prologue.
2. Spawn a subagent with this brief:
   - "Execute the procedure in `.claude/skills/novel-write/SKILL.md` for project `<slug>`, chapter k, passes `--passes`. Read the files that skill lists; nothing else. Do not read other chapters beyond what the skill allows. You may spawn independent reviewers with no inherited history, using only the staged packet in novel-crosscheck. You own this chapter and its bookkeeping; other agents may be working here, so preserve their edits. When done, reply with: title, words, lint line, verdict, three-line summary of what happened in the chapter, clue IDs touched, open threads opened/closed."
3. On reply: continue only when the current chapter has zero lint FAILs, a matching independent review with verdict `final`, and completed bookkeeping. Otherwise save the remaining work and stop the run at this chapter. The legacy `--stop-on rewrite` flag never authorizes advancing past an unresolved `revise` or a blocked review.
4. Append the reply's summary to `projects/<slug>/STATUS.md` under "Run log".
5. Every 5 chapters, run `/novel-status <slug>` and fix any ledger or continuity drift before continuing.

## Output (Indonesian)

A table: chapter, title, words, verdict, passes. Then the open threads and any clue whose planned chapter has passed without being planted (these are the first things to fix next session). Status block.
