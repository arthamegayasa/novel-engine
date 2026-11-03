# Novel Engine: Codex / T3 Code entrypoint

Read `CLAUDE.md` for the project workflow, then load the requested command's `.claude/skills/novel-<command>/SKILL.md`. Those files are the canonical procedures for all harnesses; no duplicate skill installation is needed. Resolve every project path from this folder.

Natural-language requests work even when the host does not expose `/novel-*` in its command menu:
- Start a novel or supply a premise: `novel-new`.
- Generate a full book: `novel-new`, then `novel-run` over the actual outline rows, then compile. Respect an already approved plan; do not stop after scaffolding when prose was requested.
- Write the next chapter: `novel-write`.
- Revise a chapter: `novel-revise`.
- Plan an arc, review, or audit progress: `novel-arc`, `novel-crosscheck`, or `novel-status` respectively.

Use fresh agents without inherited conversation for independent reviews. Supply only the staged review packet described in `novel-crosscheck`, not the full project. Where a writer child must delegate its review, explicitly permit that in its task; otherwise the parent starts a separate reviewer. If fresh contexts are unavailable, leave the chapter `drafted` or `revised`, record the blocked review, and give a new-session handoff. Never label a self-review independent.

For a long run, persist progress after every chapter. On interruption resume the first unfinished row, including an existing draft or unresolved review, rather than overwriting it or skipping to the next planned row. Completion means the requested chapters and their reviews exist and the compiler's included/missing list matches the request.
