# Mystery playbook

How the engine plants, hides, echoes, and pays off clues across a long book so that the reveal is surprising, fair, and rewards rereading. The historical rules and the analyses behind this are in `research/craft-report.md` §4; the genre-specific lessons from *A Regressor's Tale of Cultivation* are in `engine/style/artoc-style-dna.md` §Mystery.

## 1. The contract

1. **The author knows the answer before the question is asked.** No mystery is opened in the outline without a ledger row whose "what is actually true" field is filled.
2. **Every clue is a true fact.** Misdirection is a wrong *inference* the reader draws from true facts, or a lie told by a character who has a reason to lie and is later exposed. Narration never states a falsehood that the text does not later expose.
3. **The hidden hand is on stage.** Whoever or whatever is behind the Big Question has been present (named, seen, felt, quoted) for most of the book, usually under another role.
4. **The reader could solve it, in hindsight.** Before any payoff, the writer lists the chapters a re-reader would point to. If the list is shorter than three, the payoff is unfair.
5. **No late tools.** Nothing introduced in the final tenth of the book may do the solving.
6. **Theories may be withheld; facts may not.** A first-person narrator may keep his guesses to himself. He may not hide what he saw.

## 2. Plant, echo, payoff: distances

| Tier | Plant to payoff | Echoes |
|---|---|---|
| Scene | 1 to 5 chapters | 0 to 1 |
| Arc | 20 to 60 chapters | 1 to 2, different camouflage each |
| Series | first 5% of the book → final 10% | every 40 to 80 chapters, at least 2 |

**Short books.** The table assumes a long serial. For a book under 60 chapters, set D = max(3, N/10) where N is the planned chapter count, use D as the minimum plant-to-payoff distance for arc payoffs, plant series clues in the first 10 percent, and pay in the final 15 percent. Record D in the ledger header.

**Rule of three:** a series-level clue is planted once, echoed at least twice in different emotional contexts (once inside a joke, once inside a scene whose focus is elsewhere), then paid. One mention is trivia. Three is a pattern the reader can assemble after the fact.

**Follow the plant with a louder beat.** A planted clue is never the last beat of a chapter and never the quietest moment of a scene. Something bigger happens right after.

## 3. Camouflage methods (choose one per plant; record it in the ledger)

| Method | How | Example shape |
|---|---|---|
| `list` | the clue is one item among mundane items | a repair list; a packing list; a roll call |
| `joke` | the clue is the setup or punchline of a joke | a running gag about a bell that rings itself |
| `off-focus-scene` | the scene's emotional centre is elsewhere (grief, a fight, a flirtation) | a dying man mentions the clue while asking for water |
| `character-error` | a character gets something wrong; the error contains the truth | a servant misnames a rank; the misname is the real rank |
| `exposition` | buried in worldbuilding the reader skims | third paragraph of a lecture on tribute law |
| `name` | the clue is a name's meaning or etymology | a sect named for a thing that no longer exists |
| `plenty-of-nothing` | a detail the point-of-view dismisses as worthless | "the only thing in the drawer was a receipt" |
| `sawn-half-A` / `sawn-half-B` | the clue is two facts in two distant chapters; neither means anything alone | the date on a letter (ch 12); whose birthday that is (ch 140) |
| `unreliable-speaker` | a liar tells the truth, so the reader discounts it | the antagonist's taunt is literally accurate |
| `misread` | the narrator interprets the fact wrongly, on the page | he reads a tic as fear; it was recognition |
| `tic` | a habitual gesture, phrase, or object the narrator stops noticing | a shoulder pat; a mantra; a particular tea |
| `cognitive-hazard` | lore delivered as dangerous or forbidden, so the character and reader keep only fragments | a name that cannot be spoken |
| `side-pov` | an interlude from another viewpoint carries what the protagonist cannot hear | a servant's chapter |

## 4. Red herrings, fairly

A red herring is a true fact that supports a wrong inference. The engine may not invent a false fact to mislead. Each red herring row records: the fact, the wrong inference the reader is meant to draw, the chapter where the inference dies on-page, and the true meaning of the fact (every red herring also means something true; it is not noise).

**Decoy answers** to the Big Question are the structural form of this. Each decoy is the most reasonable explanation at its stage of the book. Each dies on-page in a scene that also advances plot. Decoys never die by the narration simply moving on.

## 5. The narrator who regresses (or otherwise knows too much)

For a first-person narrator with foreknowledge (regression, prophecy, a text, a past life), keep a **Foreknowledge Ledger** inside `clues.md`:

| Field | Meaning |
|---|---|
| Known future event | what the narrator believes will happen |
| Source | which life, vision, or text |
| Confidence | intact / shifted / invalidated |
| Spent (ch) | where the narrator used it |
| Invalidated (ch) | where his own actions or a hidden variable broke it |
| Carry-over item | the one thing (object, relationship, memory) that persists when the rest resets |

Rules: spend at least one known event per arc; invalidate at least one per arc; the narrator's certainty becomes a flaw at least once per arc (he treats a changed person as unchanged, or clings to a stale plan). Dramatic irony runs both ways: the reader knows what the cast does not; the cast knows what the narrator has forgotten about being a person.

## 6. Recontextualisation

A payoff worth the name changes the meaning of at least two earlier scenes. The payoff chapter quotes or paraphrases the plant's `verbatim_hook` so the reader feels the click without a character explaining it. The ledger records `recontext` rows pointing at the earlier chapters so `/novel-status` can verify they exist.

## 7. The reader simulation (before any arc or series payoff)

Spawn a fresh reviewer with only the planted text (the plant, echo, and red-herring passages, not the ledger truths) and ask: what facts do you have, and what do you think they mean? If the reviewer cannot list the facts, the payoff is unfair. If the reviewer states the true answer with confidence from one plant, the camouflage failed. The sweet spot: the reviewer lists the facts, proposes the decoy, and has a nagging alternative.

## 8. Scheduling in the ledger

- When `/novel-arc` creates an arc, every payoff in it gets its plants scheduled ≥10 chapters earlier. If those chapters are already written and lack the plant, either find an existing line that can serve (and log it), or change the payoff.
- Echoes are scheduled when the plant is written, not later.
- `abandoned` requires a note. If the clue was prominent, the abandonment is acknowledged on-page (a character notices it never mattered, or it mattered differently).
- Every payoff row lists its `fair_play_check`: which facts a reader needs and where each was shown.

## 9. Common failures and their signatures

| Failure | How it reads | Fix |
|---|---|---|
| Underlined clue | the narrator pauses on it; the chapter ends on it | move it mid-scene, follow with a louder beat |
| Trivia plant | mentioned once, paid 300 chapters later | schedule echoes |
| Mystery box | questions multiply, answers never come | no question opens without a filled truth |
| Deus ex revelation | the answer arrives from a new character or power | the hidden hand must have been on stage |
| Narration lies | the narrator stated a falsehood never exposed | reclassify as `misread` and expose it on-page, or cut |
| Decoy fades | the reader's leading theory is never addressed | give the decoy a death scene that advances plot |
| Reveal explains itself | a character lays out the solution | quote the plant; let the reader assemble; cut the lecture |
