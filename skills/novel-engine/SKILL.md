---
name: novel-engine
description: Create, write, revise, or audit an original novel using the installed Novel Engine workspace, with a story bible, clue ledger, continuity tracking, and independent chapter reviews. Use for novel-engine or requests to produce a book through this workflow.
---

# Novel Engine

## Locate the workspace

This is the global entrypoint; the engine and the user's manuscripts live in a separate checkout.

1. If the current project contains `engine/rubrics/crosscheck-rubric.md`, `scripts/new-project.mjs`, and `.claude/skills/novel-new/SKILL.md`, use that project root.
2. Otherwise read `workspace.json` beside this installed `SKILL.md`. Its `root` is the absolute path to the Novel Engine checkout. Confirm the three files above exist there.
3. If neither resolves, ask for the checkout path. Do not scaffold a replacement engine or write novel files into an unrelated code project.

Announce the chosen workspace and the operation in the user's language. Use that workspace as the working directory for every engine command and resolve every canonical procedure path against it. Read its `AGENTS.md` and `CLAUDE.md`; do not edit the host's global configuration.

## Route the request

Load the matching canonical procedure; these are maintained in the checkout, not copied into this entrypoint:

| Request | Procedure relative to the workspace |
|---|---|
| A premise, a new story, or a story bible | `.claude/skills/novel-new/SKILL.md` |
| An arc outline or replan | `.claude/skills/novel-arc/SKILL.md` |
| One chapter or the next chapter | `.claude/skills/novel-write/SKILL.md` |
| Several chapters or the complete book | `.claude/skills/novel-run/SKILL.md` |
| Review a chapter or plan | `.claude/skills/novel-crosscheck/SKILL.md` |
| Revise a chapter | `.claude/skills/novel-revise/SKILL.md` |
| Progress, unresolved threads, or continuity audit | `.claude/skills/novel-status/SKILL.md` |

For a complete new book from one prompt, run `novel-new`, then `novel-run` over the actual outline rows, and compile the reviewed manuscript. Respect existing approval and preserve the requested language, genre, and length. Long runs checkpoint after each chapter and resume unfinished work after session limits.

For chapter review, use a fresh context with no inherited conversation and the staged packet in `novel-crosscheck`. Without that capability, save the review handoff and leave the chapter unapproved. Compare author principles without impersonating an author or claiming a human-authorship guarantee.

Save generated work under the resolved workspace's `projects/<slug>/`. Return the chapter/review paths and current status. Publishing a new manuscript is a separate user decision; an existing public engine repository does not authorize publishing private drafts.
