---
name: novel-arc
description: Plan or re-plan one arc of an existing novel in detail (chapter rows, clue schedule, rest chapters, hook cadence), given the bible and what has actually been written so far. Use when the user says "/novel-arc", "plan the next arc", "outline arc 3", or when novel-run finds missing chapter rows.
---

# /novel-arc — detailed arc planning

**Announce**: "Menggunakan novel-arc untuk merencanakan arc K secara rinci."

## Inputs

`/novel-arc [<slug>] <K | next> [--chapters N]`

## Read

`bible.md` (all), `outline.md` (spine, arc table, all written chapter rows), `clues.md` (all), `continuity.md` (open threads, character state), `STATUS.md`, `engine/structure/story-architecture.md` §Arc design, `engine/structure/mystery-playbook.md` §Scheduling.

## Procedure

1. **Reconcile**: compare the arc's Promise/Progress/Payoff in the bible with what the written chapters actually delivered. Update the bible row if reality diverged and note why in `STATUS.md`.
2. **Arc contract**: write the arc's Promise (what the reader expects by chapter 2 of the arc), Progress markers (3 to 5 visible changes), Payoff (the scene), and Mystery turn (which decoy dies, which plant pays, which new question opens).
3. **Chapter rows**: fill every row of the arc in `outline.md`: scene goal, obstacle, turn, hook type, clues touched. Rules: no more than two consecutive identical hook types; at least one rest chapter; the protagonist loses something at least once; a secondary character gets a chapter where their want drives the scene; the midpoint of the arc flips something the reader was sure of.
4. **Clue schedule**: in `clues.md`, create or move rows so that every payoff in this arc has a plant at distance ≥D (the D recorded in the ledger header) chapters earlier (possibly in earlier arcs; if those chapters are already written and lack the plant, either find an existing line that can serve, log it, or choose a different payoff). Schedule echoes. Assign camouflage methods.
5. **Plan review**: spawn a fresh reviewer with rubric §Plan review on the arc rows. Apply required fixes.

## Output (Indonesian)

Arc contract in four lines, the chapter row table, the clue schedule changes, assumptions made, status block.
