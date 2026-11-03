# Crosscheck rubric

Used by `/novel-crosscheck` for chapters and by `/novel-new` and `/novel-arc` for plans. Scores are 1 to 5. **3 means competent published web fiction.** 4 means a strong human editor would pass it. 5 means a line or move worth quoting in a craft book. A 1 or 2 must be accompanied by a quoted line and a concrete fix.

The reviewer is a fresh context: it has the files, not the writer's intentions. If something is unclear to the reviewer, it is unclear to the reader.

## A. Chapter review

### A1. Voice (weight 2)
Does the narration sound like bible §2 and like the previous chapter? Check the five listed habits: are at least three present? Is either "never does" rule broken? Does any paragraph sound like a generic competent narrator instead of this one? Quote it.

### A2. Dramatic unit (weight 2)
Can the reviewer state, from the text alone, what the POV character wanted, what opposed it, and what changed by the end? If the turn can only be inferred from the outline, score 2. If the chapter has two turns of equal weight, score 3 at most (it is two chapters).

### A3. Specificity (weight 1)
Count abstractions that could be replaced by a thing: "a sense of dread" vs the object that causes it. Are numbers exact where a character would know them? Are places and objects named? Is there at least one detail only this world could produce?

### A4. Subtext (weight 2)
Are emotions named when they could be shown? Does dialogue say what characters mean (bad) or what they would actually say (good)? Is there at least one exchange where the reader knows something the speaker does not? Does the narrator misjudge anything?

### A5. Rhythm (weight 1)
Read three paragraphs aloud in your head. Do sentence lengths swing? Does any run of sentences share a shape? Does every paragraph end on a punch? Are there fragments where a fragment is right? (The lint gives numbers; this score is about whether the numbers *land*.)

### A6. Dialogue (weight 1)
Cover the attribution: can you tell who is speaking from the words alone? Are there exposition dumps dressed as conversation? Do people answer the question asked (they usually should not)? Is there humour that comes from the character rather than from a quip?

### A7. Clue handling (weight 2)
Use the saved unaided first-read note before examining clue IDs or ledger descriptions. For each required plant, can you subsequently find the line? If it dominated the unaided reading and exposed the intended secret, camouflage may fail (score ≤2 with evidence). If you cannot find it on deliberate search, the plant is missing (score 1). If it becomes visible on search while the scene's apparent emotional focus is elsewhere, score 4 to 5. For payoffs: did the reveal recontextualise at least two earlier moments you can name?

### A8. Continuity (weight 2)
Check names, time, injuries, possessions, knowledge states, and who was in the room, against `continuity.md` and the previous chapter. Each violation: quote both lines.

### A9. Hook (weight 1)
Does the last beat make the next chapter necessary rather than merely possible? Is the hook type the planned one? Is there a second, unneeded hook? Is the final line doing work or restating?

### A10. Human texture (weight 1)
Is there mess: a digression that pays off sideways, a misperception, an unanswered question in dialogue, a joke that lands wrong in-world, a physical inconvenience, a wrong guess? Or is the chapter frictionless?

### A11. Absence of machine tells (weight 2)
Using `engine/style/anti-ai-pitfalls.md` as a checklist: structural tells (tidy tricolons, moral at the end, emotion summarised after being shown, uniform paragraph closers, "not X but Y" refrain, rhetorical-question narration, generic sensory lists, over-hedged narration, characters announcing feelings, conflict that resolves within the scene it was raised). Quote every instance. A single instance caps the score at 3; three or more caps it at 2.

### Verdict rule
- `final`: no dimension below 3, no continuity violation, no required changes.
- `revise`: all dimensions ≥2, A2, A1, and A11 ≥3, fixes are local (sentences, a paragraph, a clue line).
- `rewrite`: A1 or A2 ≤2, or A8 has a violation that changes what happens, or A11 ≤2.

## B. Plan review (bible, outline, clue ledger)

Score each 1 to 5 with a one-line reason.

1. **Controlling idea** is a claim someone could disagree with, not a platitude ("love conquers all" is a platitude; "love is what you do for people who can no longer repay you" is a claim).
2. **Big Question**: the true answer is surprising in prospect and inevitable in retrospect. The decoys are each the *most reasonable* explanation at their stage.
3. **Decoy death**: each decoy has a chapter where it dies on-page, and the death itself advances plot.
4. **Arc contracts**: every arc has Promise, Progress, Payoff, and a Mystery turn. No arc is all progress.
5. **Protagonist cost**: in every arc the protagonist loses something that is not immediately replaced.
6. **Cast idiolects**: sample lines for different characters are distinguishable with names removed.
7. **Antagonist**: right about something; wants something the protagonist also wants; is not stupid at any point.
8. **Rest and pressure**: rest chapters exist and set something up; hook types vary; no three identical hooks in a row.
9. **Fairness schedule**: each payoff has at least one plant at distance D or more (D as recorded in the ledger: 10 chapters, or max(3, N/10) for books under 60 chapters) and at least one echo; the Big Question has at least three plants; camouflage named for every plant.
10. **Boredom audit**: name the three chapters a reader is most likely to skim and say why they shouldn't.
11. **Genre checklist** (when the bible names a genre with its own document, e.g. `engine/structure/regression-genre.md` §9): every item answered or explicitly waived with a reason.
12. **Originality**: no character name, place name, technique name, or specific plot beat recognisable from a published work the reviewer knows; flag any that look borrowed, including from the engine's own reference novel.

Verdict: `approve` or `revise` with required fixes, each tied to a row or section.

## C. Reference-author panel: how to use it

For each author on the panel, the reviewer writes one paragraph answering "What would this author cut, add, or change here, and why?", grounded in that author's documented principles from `engine/style/reference-authors.md`. The reviewer applies each principle without imitating prose or claiming to speak for the author. State the actual tradeoffs between lenses. Agreement is allowed; unsupported or manufactured disagreement is not.
