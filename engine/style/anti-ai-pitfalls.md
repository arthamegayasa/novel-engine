# Anti-AI pitfalls: the checklist

Used by the reviewer for rubric dimension A11 and by the writer before submitting a draft. Each item has a one-line fix. The phrase lists are enforced mechanically by `scripts/prose-lint.mjs` from `banned-phrases.txt` (FAIL) and `suspect-phrases.txt` (WARN). This file is about the structural habits the lint cannot see.

Sources and evidence: `research/craft-report.md` §1 (Wikipedia's "Signs of AI writing", Kobak et al. 2024, the Economist 2026 study, the homogenisation papers). Two cautions from that research shape how this list is used:

- No single item proves anything. Humans accuse *clean* prose of being machine-written, and they are usually wrong. The point is to remove hollowness, not to pass a detector.
- "Polishing" a draft with a model makes it more generic. Fixes here are cuts and concrete substitutions, never synonym swaps.

## A. Structural tells (reviewer scores these)

| # | Pattern | Fix |
|---|---|---|
| 1 | Tricolons by reflex (three adjectives, three clauses, three examples) | One or two. A third item only if it breaks the pattern. |
| 2 | Every paragraph ends on a punchy one-liner | Two in three paragraphs end mid-thought or on a mundane detail. Save the zinger for the turn. |
| 3 | Uniform sentence length and shape | At least one sentence under 5 words and one over 40 per 1,000 words; mix shapes; allow fragments. |
| 4 | Uniform paragraph length | One-line to ten-line paragraphs in the same scene. |
| 5 | Em-dash as universal joint | House rule: none. Commas, colons, full stops, restructuring. |
| 6 | Rhetorical questions as interiority | Convert to a declarative with a concrete object, or to an action. |
| 7 | Summarising the emotion the scene just showed | Cut the label. If the scene did not show it, fix the scene. |
| 8 | Telling the theme ("This was what it meant to be free.") | Delete. Theme lives in the juxtaposition of events. |
| 9 | Characters stating feelings in dialogue | Oblique line, deflection, or an action that contradicts the feeling. |
| 10 | Generic sensory lists (pine, birdsong, breeze) | One specific, unexpected detail only this character would notice. |
| 11 | Hedging narration (perhaps, maybe, it seemed, almost) | Commit. Keep a hedge only when uncertainty is the point. |
| 12 | Every scene resolves positively | Default outcome "No, and furthermore" or "Yes, but". Clean wins only at arc climaxes. |
| 13 | Every thread tied | Leave one named thread open per arc and log it. |
| 14 | Sanitised conflict; antagonist concedes politely | Antagonist is right about something and wins the exchange at least half the time. |
| 15 | Named emotions (anger, relief, determination) as nouns | The body's specific behaviour or the object the character fixates on. |
| 16 | Body-language stacking (jaw, fists, shoulders in one beat) | One reaction per beat, and not the first you reached for. |
| 17 | "Something shifted" vagueness | Name the exact thing and what it was before. |
| 18 | Filter words (saw, heard, noticed, realised) | Render the perceived thing directly. |
| 19 | Frictionless dialogue; complete information calmly exchanged | Each speaker has a goal that conflicts with answering. Let them lie, evade, misunderstand. |
| 20 | Thesis-statement paragraph openers | Start with the first concrete detail. |
| 21 | Thought verbs (knew, realised, wondered, felt) | Unpack into sensation and action (Palahniuk). Budget six per 1,000 words. |
| 22 | Balanced both-sides clauses ("While X, Y") | Pick a side. The character has a bias; so does the prose. |
| 23 | Trailing participial explainer (", a gesture that revealed her fear") | End at the gesture. |
| 24 | Synonym cycling for names ("the swordsman", "the older man", "the regressor") | Use the name or the pronoun. |
| 25 | Recap in the first paragraph | Open in motion. Recap only through a present need. |
| 26 | Closing reflection paragraph every chapter | End on the turn's consequence or an image. No coda. |
| 27 | Everyone speaks with the same syntax | Idiolect rules per character in the bible; cover test. |
| 28 | Stakes stated ("Everything depended on this.") | Put the thing that will be lost in the room. |
| 29 | Backstory dump to explain a feeling | Imply the past through one object; dramatise it later if it matters. |
| 30 | Simile overload | One figurative comparison per paragraph at most; prefer literal specificity. |
| 31 | Scenes that begin at the beginning and end at the end | Enter late, leave early. |
| 32 | Monotone sentiment across a scene | Interleave a comic or banal beat inside tension, and vice versa. |
| 33 | Significance inflation ("a testament to", "a pivotal moment", "served as a reminder") | Say what happened. Let the reader rank it. |
| 34 | Copula avoidance ("serves as", "stands as", "boasts") | "Is" and "has" are fine words. |
| 35 | Elegant variation under repetition pressure | Repeat the plain word. Repetition is rhythm when chosen. |
| 36 | Latinate abstraction where a plain word exists | Prefer the shorter, older word unless the voice is a pedant's. |
| 37 | Questions as chapter endings | End on consequence. The question is implied. |
| 38 | Villain monologue that explains the plot | The antagonist explains nothing he would not explain; the reader assembles it. |
| 39 | The protagonist is always right in arguments | Let them lose an argument on the merits at least once per arc. |
| 40 | Wrap-up sentences ("And so, ...", "In the end, ...") | Cut. |

## B. Lexical tells (mechanically enforced)

- `banned-phrases.txt`: Tier A. A hit is a FAIL. The writer may keep one with a written justification in the review; the reviewer decides. Includes the significance-inflation set (delve, tapestry, testament, underscore, showcase, pivotal, meticulous, nestled, in the heart of, serves as), the stock-physiology set (shiver down the spine, breath he didn't know he was holding, silence was deafening, time stood still), the stock-feeling set (a wave of X washed over, a mix of X and Y, couldn't help but, little did they know), and the negative-parallel scaffold ("not just X").
- `suspect-phrases.txt`: Tiers B and C. A hit is a WARN. The writer looks at each and keeps only the ones a specific voice earns. Includes crucial, intricate, profound, palpable, whispered as a default tag, in that moment, for the first time in a long time, heart pounded, jaw clenched, eyes gleamed, perhaps and maybe as narration hedges, filter verbs.

## C. Counts the lint reports (targets per 1,000 words of narration)

| Metric | Target | Why |
|---|---|---|
| Sentence-length coefficient of variation | ≥ 0.55 | Low variance reads as cadence-locked. Not a goal in itself; a by-product of rules 3 and 4. |
| Paragraphs ending on a ≤6-word sentence | < 35% | Punchline habit. |
| Em-dashes | 0 (house) | See voice guide rule 10. |
| Rhetorical questions in narration | ≤ 3 | Unless the voice earns them. |
| "Not X but Y" scaffolds | ≤ 1 per chapter | Economist's strongest discriminator. |
| Tricolon lists | ≤ 2 | Rule of three. |
| "-ly" adverbs | ≤ 12 | King. |
| Filter verbs | ≤ 10 | Fiction-checker consensus. |
| Thought verbs | ≤ 6 | Palahniuk. |
| Trailing "-ing" explainer clauses | 0 | Wikipedia's "superficial -ing analyses". |
| Repeated distinctive words (7+ letters, 4+ uses) | Look at each | Echo or tic? |

## D. Diversity across chapters (reviewer and `/novel-status`)

The homogenisation research says the deeper tell is sameness across outputs, not inside one. Track across the last ten chapters:

- Opening types (in dialogue, in action, in object, in time-skip clause, in a wrong assumption). No type three times running.
- Ending hook types (question, threat, reveal, decision, quiet, comic, cycle-reset, cliff). No type three times running.
- Conflict shapes (argument, chase, negotiation, concealment, endurance, ritual). No shape three times running.
- Value shifts (Story Grid): direction alternates; three same-direction shifts in a row is a flag.

## E. How to fix a chapter that fails A11

1. Cut first. Remove every explainer, label, coda, and hedge. Re-read.
2. Then concretise. Replace each remaining abstraction with a thing in the room.
3. Then roughen. Break one long sentence into fragments; join two short ones into a winding one; let one paragraph end early.
4. Then check the voice: did any of the above push the narrator out of character? Revert those.
5. Never run a "make this sound more human" pass. That is the polish pass the research says homogenises.
