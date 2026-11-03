# Coverage and validation

Completion audit: 2026-11-03.

## Source coverage

The earlier research collected 845 files/list entries from the English collection through site chapter 861. This is 843 distinct site numbers, not 861 complete chapters plus prologue. Eighteen reading slices produced notes; the brief allowed skimming fights and mechanics. Synthesis is grounded in those notes, with reconstructed passages identified there. The completion pass checked the inventory and the engine; it did not independently re-read every source chapter.

Absent site numbers: 143, 211, 340, 634, 711–714, 770–773, 785, 801–802, 827, 839, 858–859 (19 numbers). Chapter 781 is present; an earlier map incorrectly listed it as absent.

Further limitations:

- Site 740–750 are eleven preview-only stubs.
- Notes flag 759 as truncated and the body of 443 as a duplicate of 442.
- Site IDs 799 and 804 each occur twice. The 799 entries duplicate material; the two 804 entries correspond to different author chapters.
- Site numbering and author numbering diverge. The final main-story chapter is filed as 805 and read after 807 in the slice notes; afterword 808, afterstories 809–812, side stories beginning 813. Site 861 is the side-story conclusion in this collected snapshot.

This supports a broad craft study of the available collection, not a claim of a complete, verified, unabridged reading. Raw source text is local reference material and is excluded from the delivery package. The engine transfers high-level techniques into original stories.

## Evidence classes and limits

The craft report distinguishes primary studies, authors’ teaching, secondary commentary, and reader opinions. Findings about academic abstracts cannot establish what makes fiction good. Lint thresholds are house-style heuristics, not authorship detection. A model review against author principles is neither a real author endorsement nor a comprehensive originality search.

The LitBench result quoted in the report is benchmark-specific: 73% human-preference agreement for its best tested zero-shot judge on its story-pair task. It is not measured reliability for this engine. Fresh contexts prevent exposure to the drafter’s rationale; their literary reliability here has not been measured with human readers.

The supplied genre baseline describes the original uncleaned collection. It contains translation effects, stubs and duplicates; the completion pass also corrected word/dialogue parsing. Historical statistics are informational, not quality targets.

## Verified behavior

- `node --test tests/cli.test.mjs`: 17/17 regression tests pass. Cases cover safe scaffold paths, literal seeds, status filtering, non-destructive compile failures, Windows frontmatter, Unicode words, narrative questions versus dialogue, strict lint, user-corpus baselines, continuity hints, and duplicate manuscript headings.
- Demo: `projects/not-yet/chapters/001.md`, 2,785 words, pass 2, zero strict lint FAILs. Dialogue 25%; two advisory categories remain: similar-length runs and punchline share.
- Independent review: `reviews/001-pass2.md`, verdict `final`, weighted score 3.76/5, no required changes. `001-reader-pass2.md` was saved before the editorial packet was opened. The file remains `reviewed` until user acceptance.
- Prose-body SHA-256: `22ad6f3ad4d3a0eadedc44785c46bffd7e06112dc44bcb335e0ec9c732d44d24` (YAML frontmatter removed, CRLF normalized, outer whitespace trimmed).
- Bookkeeping records C-002, C-019, C-021 and RH-8, the decision hook, established facts, and open threads. D = 3 is recorded for the 30-chapter demo plan.

## Remaining boundaries

Only chapter 1 is drafted; chapter 0 and chapters 2–30 are still planned. This is a workflow demonstration, not a completed novel or evidence of long-run coherence across hundreds of generated chapters. The predecessor transition must be checked when chapter 0 is written. Sari’s whereabouts remain an explicit open thread with no scheduled close yet.

The engine is local skills and Node utilities, usable through the project instructions in Claude Code or Codex/T3 Code. The Node utilities do not call a model. Session limits can interrupt long runs; STATUS and review files preserve the resume point. At the original local validation milestone, no Git repository, PR, deployment or database migration had been created. Subsequent publication and installation instructions are maintained in README.md.
