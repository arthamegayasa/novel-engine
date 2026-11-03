# Story architecture

How the engine structures a novel from the whole book down to a paragraph. The models compared and the evidence are in `research/craft-report.md` §3. This document is the operating version.

## 0. The four layers

| Layer | Unit | Model | Owner file |
|---|---|---|---|
| Series | the whole book (or the whole serial) | Promise / Progress / Payoff over a mystery | `bible.md` §1, §5, §6 |
| Arc | 8 to 60 chapters | Seven-Point structure planned backwards; Butcher's climax anatomy | `outline.md` arc table |
| Mini-arc | 4 to 8 chapters | Harmon's Story Circle | `outline.md` chapter rows, grouped |
| Chapter | one scene + one turn | Swain/Butcher scene and sequel; Coyne's five commandments as QA | `plans/NNN.md` |

Reveal chapters use kishōtenketsu (introduction, development, twist-as-reframing, reconciliation) instead of a fight. Training and progression chapters use try/fail cycles. Rest chapters are sequel-heavy and still shift one value.

## 1. Series layer: promises

Define three or four **series promises** in bible §1 and §5:

1. **Tone promise**: what kind of book this is (the prologue and chapter 1 make this promise; the rest must keep it).
2. **Mystery promise**: the Big Question, phrased as the reader would ask it.
3. **Character promise**: the protagonist's misbelief (Cron) and the question of whether they will shed it.
4. **System promise** (if a power or progression system exists): the ceiling the reader is told about and the cost of approaching it.

**Progress signposts:** every 10 to 15 chapters, a visible, nameable advance on at least one promise. "Visible" means a reader could point at the paragraph. Readers quit books when they cannot see progress, not when progress is slow.

**Payoff:** surprising in prospect, inevitable in retrospect. The ledger must hold the true answer before the first plant is written.

## 2. Arc layer: Seven-Point, planned backwards

For each arc, fill in this order:

1. **Resolution**: the state at the end of the arc (where the protagonist stands, what they now know, what they lost).
2. **Hook**: the opposite state at the start. If hook and resolution are not opposites, the arc has no shape.
3. **Midpoint**: the shift from reaction to action; often a false victory or a true loss.
4. **Plot Turn 1**: the call that moves the protagonist from hook toward midpoint. Usually new information.
5. **Plot Turn 2**: the last piece of information before resolution. In this engine it is **always a clue payoff from the ledger**, never new information from nowhere.
6. **Pinch 1**: pressure applied; the antagonist force shows its hand.
7. **Pinch 2**: things fall apart; a mentor, ally, or belief is lost. In a mystery-heavy serial this is where the arc's mystery seems to collapse into the wrong answer (a decoy triumphs).

Then the **arc contract** in the outline: Promise (what the reader expects by the arc's second chapter), Progress (3 to 5 visible changes), Payoff (the scene), Mystery turn (which decoy dies, which plant pays, which new question opens).

**Climax anatomy** (Butcher): isolation, confrontation, dark moment, choice, dramatic reversal, short resolution. Keep the resolution short.

**Arc length bands**: 8 to 15 chapters for a tight book; 25 to 60 for a serial. Rest chapter at least once per arc. The protagonist loses something at least once per arc that is not immediately replaced.

## 3. Mini-arc layer: the Story Circle

For runs of 4 to 8 chapters: You (comfort) → Need → Go (unfamiliar situation) → Search (adapt) → Find (get what they wanted) → Take (pay for it) → Return → Change. The **Take** is a real cost: a relationship, a resource, a certainty. If the Change is cosmetic, the mini-arc is a treadmill.

## 4. Chapter layer: one scene, one turn

### 4.1 The plan
`plans/NNN.md` is filled before drafting. The non-negotiable fields: scene goal, obstacle, turn (value at start → value at end), hook type, clues touched with camouflage, the sentence the chapter exists to earn, and what the reader should wrongly believe at the end.

### 4.2 The scene
A scene has a point-of-view character with a specific goal, opposition from another character (not just circumstance), and an outcome. Outcome distribution across an arc, roughly: half **No, and furthermore**; a third **Yes, but**; a few **No**; a clean **Yes** only at arc climaxes and earned rest chapters.

### 4.3 The sequel
Optional, following a setback: emotion → reasoning → anticipation → choice, in that order. Sequels control pace and empathy. Too many is navel-gazing; too few and the reader does not feel the stakes. In a first-person regression narrator, the sequel is where the interior monologue lives; keep it to one per chapter and under a fifth of the words.

### 4.4 Five-commandment QA (Coyne)
Before review, the writer answers in the plan: inciting incident, progressive complication, turning point, crisis (name the two options), climax (the action), resolution (the value shift and direction). If any is missing, the chapter is a fragment of a chapter.

### 4.5 Turn placement and hook
- The turn lands in the final 15 percent.
- The chapter ends on the **consequence** of the turn, not on a question and not on a reflective coda.
- Hook types: question, threat, reveal, decision, quiet dread, comic, cycle-reset, cliff. No type three chapters running.
- **Hard cliffhanger** (life, identity, betrayal) at most once per 4 to 5 chapters. A hard cliffhanger resolved by a cheat in the next chapter's first paragraph destroys reader trust; the next chapter must honour it.

### 4.6 Opening
Open in motion. No recap. If the reader needs an earlier fact, a character needs it now. Opening types (rotate): in dialogue, in action, on an object, in a time-skip clause, on a wrong assumption.

### 4.7 Length and cadence
Default target 2,000 to 2,800 words (web-serial norm; see craft report §5.1). Consistency of cadence matters more than exact length. A book may set its own band in bible §8.

## 5. Rest chapters

Every 8 to 12 chapters. Sequel-heavy, slice-of-life or comic, and still:
- shift one value (a relationship warms or cools; a resource is gained or spent),
- plant or echo at least one clue (rest chapters are the best camouflage there is),
- set up the next pressure.

## 6. Reveal chapters (kishōtenketsu)

- **Ki**: the ordinary situation, with the clue's final echo placed in plain sight.
- **Shō**: development that seems to be about something else.
- **Ten**: the twist as recontextualisation. The payoff quotes or paraphrases the earlier plant so the reader feels the click.
- **Ketsu**: the character absorbs it. Short. The chapter ends on what the character does next, not on what it means.

## 7. Progression and training chapters (try/fail)

Attempt → Yes-but or No-and; escalate each cycle; the last cycle becomes a success only when the ledger marks the relevant plant as paid (the technique the character finally gets was planted; the insight came from somewhere on the page). Each realm or tier has a cost (time, body, obligation, sanity). A breakthrough never resolves a conflict the reader could not have predicted (Sanderson's First Law).

## 8. Value tracking and diversity

Each chapter row in the outline records the value shifted and its direction. `/novel-status` flags: three same-direction shifts in a row; three identical hook types; three identical opening types; three identical conflict shapes (argument, chase, negotiation, concealment, endurance, ritual). Sameness across chapters is the deepest machine tell.

## 9. Endings

- The final image answers the opening image.
- The last line's job is decided in the bible before chapter 1 is written.
- At least one thing stays unresolved, on purpose, and the reader can tell it is on purpose.
- The Big Question is answered on the page by facts the reader has seen. No new power, person, or rule in the last ten percent may do the answering.
