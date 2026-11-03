---
name: novel-crosscheck
description: Review a novel chapter or plan against continuity, clue fairness, craft criteria, and reference-author principles using a fresh context. Use for chapter reviews or after drafting or revision before acceptance.
---

# /novel-crosscheck

**Announce**: "Menggunakan novel-crosscheck untuk review chapter N dengan rubric dan panel penulis."

`/novel-crosscheck [<slug>] <N | plan> [--panel "A, B, C"] [--pass P]`

## Independent context

The writer never reviews their own draft in the same context. Spawn a reviewer without inherited conversation (for example, `fork_turns: none` in Codex), with only the authorized packet paths. If fresh contexts are unavailable, save a review handoff and keep the chapter unapproved. Author lenses are editorial principles, not actual reviews or endorsements by those authors, and they do not prove originality.

## Chapter review: two reading stages

Prepare a new packet at `.cache/crosscheck/<slug>/NNN-passP/`. Check the entire packet for spoilers: truths also leak through cast headings, wants/wounds, future idiolects, world exceptions, planned closes, camouflage descriptions, and payoff dates. Blanking one ledger column is insufficient. Give no path to an unredacted bible, outline, chapter plan, previous reviews, or writer commentary.

1. **Reader stage.** Give only the current chapter and the previous chapter if it exists. Ask for a saved first-read note: what changed, what the reader suspects, and which details drew attention. Save it before opening the editorial packet. With no predecessor, explicitly mark the continuity boundary unverified.
2. **Editorial stage.** After saving the note, let the same reviewer read `engine/rubrics/crosscheck-rubric.md`, `engine/style/anti-ai-pitfalls.md`, the selected entries from `engine/style/reference-authors.md`, lint output, book voice/style requirements, and established continuity. Include only cast and world facts available by chapter N. Then provide clue IDs with observable plant/echo descriptions; omit hidden truths and future schedules. Compare deliberate clue search with the already saved first-read note. Finding an identified clue during this stage is not evidence that an ordinary reader spotted it immediately.
3. **Payoff audit.** For a payoff chapter, only after the reader note is saved, supply that payoff's truth and earlier on-page plants with chapter references. Keep unrelated mysteries concealed. The writer checks complete ledger consistency separately.

Use `engine/templates/review.md`. Require:
- All eleven rubric scores, with quoted evidence for scores ≤2 and 5; explain uncertainty instead of fabricating confidence.
- One paragraph per author lens applying its documented principle, with concrete edits where needed and something to keep. Record real tradeoffs; agreement is allowed, invented disagreement is not.
- Clue findings separated into first-read attention and later targeted search. A clue that dominates the unaided reading may need better camouflage; a clue absent on deliberate search is missing.
- Continuity violations with both conflicting lines. A missing predecessor limits verification; it is not proof of a contradiction.
- Ordered required changes tied to lines and a verdict under the rubric: `final`, `revise`, or `rewrite`. Judge actual problems before selecting the verdict; obey the rubric's precedence.
- The reviewed draft's pass and prose-body SHA-256 (remove YAML frontmatter, normalize CRLF to LF, trim outer whitespace), allowing resumed work to detect stale approval. Lint alone never approves prose.

## Plan review

For `plan`, give a fresh reviewer `bible.md`, `outline.md`, `clues.md` including truths, rubric §B (all twelve items), and the applicable genre document. Verdict: `approve` or `revise` with concrete fixes. This is a planning audit and is not a blind-reader test.

## Save and report

Save to `projects/<slug>/reviews/NNN-passP.md` (or `plan-review.md`), using the current draft pass and preserving earlier reviews. Save the first-read note alongside it. Record unresolved uncertainty. Report the verdict, lowest three rubric dimensions, and first three required changes in Indonesian.
