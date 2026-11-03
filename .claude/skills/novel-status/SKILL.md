---
name: novel-status
description: Audit a novel project's health. Reports clue-ledger integrity (overdue plants, orphan payoffs, silent abandonments), continuity drift, hook-type monotony, chapter length drift, and what to write next. Use when the user says "/novel-status", "where are we", "what's unresolved", or before starting a new arc.
---

# /novel-status — project health audit

**Announce**: "Menggunakan novel-status untuk audit ledger, continuity, dan pacing."

## Inputs

`/novel-status [<slug>] [--fix]`

## Checks

1. **Ledger integrity** (`clues.md`): every `planned` plant whose target chapter is already written → overdue. Every `paid` clue without a plant at distance ≥D (ledger header) → unfair payoff. Every plant with no echo and payoff more than 2.5×D chapters away → needs an echo scheduled. Every `abandoned` without a note → violation. Decoys whose death chapter has passed without an on-page disproof → violation.
2. **Continuity drift**: run `node scripts/continuity-scan.mjs <slug>` (names, numbers, places that appear in chapters but not in `continuity.md`; characters whose last-seen chapter is more than one arc old while still "on stage").
3. **Pacing**: hook types over the last 10 written chapters (flag 3+ identical in a row); chapter lengths vs band; rest-chapter spacing; chapters since the last payoff; chapters since the protagonist last lost something.
4. **Voice drift**: run lint on the last 5 chapters and on chapters 1–5; compare mean sentence length, dialogue share, punchline share. Flag drift over 30% unless bible §2 planned it.
5. **Outline truth**: rows marked `reviewed`/`final` whose text no longer matches the chapter's actual turn.

## Output

A short report in Indonesian with a table of violations (severity, location, fix), then "Next chapter to write" with its outline row, then the status block. With `--fix`, apply the mechanical fixes (schedule echoes, add notes, correct rows) and list what still needs a writing decision.
