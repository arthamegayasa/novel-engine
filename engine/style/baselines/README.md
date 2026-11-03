# Lint baselines

`prose-lint.mjs --baseline <file>` compares a chapter's statistics against one of these.

| Genre tag (bible §1, `--genre`) | File |
|---|---|
| regression, cultivation, xianxia, murim, progression, litrpg, webnovel | `regression-xianxia-webnovel.json` |
| anything else | `default.json` (currently a copy of the above; replace with `prose-lint.mjs --stats <dir>` on text you own) |

Comparison lines are INFO only. Translation noise in the reference corpus (ellipsis, exclamation, -ly rates) is deliberately not a target; see `engine/style/artoc-style-dna.md` §9.

The shipped numbers describe the original uncleaned reference collection, including preview stubs and duplicate/damaged entries. They are historical descriptive statistics, not acceptance thresholds or evidence of human authorship. The tokenizer and dialogue parsing were corrected during completion; regenerating a baseline may change its values. Neither INFO comparisons nor a clean lint report prove literary quality or continuity.
