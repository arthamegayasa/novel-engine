# Craft Research Report for the Novel Engine

**Scope:** Evidence-based craft rules for an LLM-driven fiction system targeting long serialized web novels (300+ chapters), with a Korean/Chinese regression-cultivation flavor and a heavy mystery spine.
**Date:** 2026-11-03
**Method:** Web searches and direct reads combine primary research papers and author teaching where accessible with secondary craft summaries, Wikipedia commentary, and reader communities. These are different evidence classes: reader reception is opinion, and advice derived from it is not an empirical result. Unreachable sources are flagged. Rules chosen for this engine rather than established by a source are labelled **[heuristic]**.

How to use this document: Sections 1 and 6 feed the **linter and judge**. Sections 2 and 3 feed the **drafting prompts and outline schema**. Section 4 feeds the **Clue Ledger** data model. Section 5 feeds **chapter-shape constraints**.

---

## 1. AI prose pitfalls

### 1.1 What the evidence actually says

**The best-maintained catalogue is Wikipedia's "Signs of AI writing" (WP:AITELLS).** It is explicitly descriptive, not prescriptive, and it warns that no single sign is proof, that detection tools are unreliable, and that humans judging intuitively perform near chance ([Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)). Its most relevant categories for fiction:

- **Undue emphasis on significance:** "stands/serves as," "is a testament/reminder," "a crucial/pivotal/vital role," "underscores its importance," "setting the stage for," "marking a shift," "evolving landscape," "indelible mark," "deeply rooted."
- **Superficial -ing analyses:** trailing present-participle clauses that explain what the sentence just showed: "...highlighting/underscoring/reflecting/symbolizing/fostering/ensuring..."
- **Promotional register:** "vibrant," "rich," "profound," "showcasing," "nestled," "in the heart of," "renowned," "diverse array," "boasts a."
- **Negative parallelisms:** "Not just X, but Y," "It's not X, it's Y," "Y rather than X," "no X, no Y, just Z."
- **Rule of three:** triplet adjectives/phrases used to fake comprehensiveness.
- **Copula avoidance:** "serves as," "stands as," "features," "boasts" instead of "is"/"has."
- **Em dashes:** overused, typically spaced, where humans would use commas, parentheses or colons; newer models tuned to avoid em dashes now over-produce commas and periods, which is itself a sign.
- **Elegant variation:** older models' repetition penalty pushes synonym cycling ("the diverse yet united front of non-conformist artists").
- **Hedging disclaimers / chatty wrappers:** "It's important to note," "In summary," "Overall," "I hope this helps."
- **Era-specific vocabulary:** 2023–24 GPT-4: "delve," "tapestry," "intricate," "garner," "key"; 2024–25 GPT-4o: "align with," "highlighting," "showcasing," "fostering"; 2025–26: "emphasizing," "enhance"; 2026+: "quietly," "steady," "multifaceted," "leverage," "prioritize," "dependable," "matters," "clearer," "universally," plus 8–20-word sentences.

**Quantitative vocabulary evidence.** Kobak et al. analysed 14 million PubMed abstracts and found abrupt post-ChatGPT spikes: *delves* (frequency ratio 28.0), *underscores* (10.9), *showcasing* (10.2), plus large gaps for *potential*, *findings*, *crucial*; 66% of 2024 excess words were verbs and 16% adjectives; a lower bound of 10% of 2024 abstracts were LLM-processed, up to 30%+ in some sub-corpora ([Kobak et al., arXiv 2406.07016](https://arxiv.org/html/2406.07016v2)). Gray (2024), cited there, reported ~22× increases for *intricate* and *meticulously*.

**The Economist's 2026 study** (c. 56,000 sentences, four frontier models vs. the magazine's own prose) found the real discriminators were: bland Latinate diction, **fewer commas**, **longer sentences**, and heavy use of **"not X but Y"**, **"not only... but also"** and the **rule of three** ("The mystery has been solved—not partially, not ambiguously, but definitively"). It also found the em-dash reputation is partly outdated: only Claude used more em dashes than the human baseline ([The Walrus summary](https://thewalrus.ca/readers-think-they-can-spot-ai-writing-theyre-wrong/); [BizNews syndication](https://biznews.com/tech/spot-ai-written-text)).

**Homogenization is measurable.** "The Shrinking Landscape of Linguistic Diversity" (880k texts incl. r/WritingPrompts stories) found variance in writing complexity fell 21–50% post-LLM and that LLM "polishing" of human text reduces stylistic diversity while preserving content ([arXiv 2502.11266](https://arxiv.org/abs/2502.11266)). Jain et al. argue creative-writing homogenization should be measured on *narrative* variation (plot, setting, genre), not just vocabulary ([arXiv 2509.21267](https://arxiv.org/abs/2509.21267)). "Magic, Madness, Heaven, Sin" documents homogenization within one model, across models, and in human-AI co-written text ([arXiv 2604.01504](https://arxiv.org/pdf/2604.01504)).

**Burstiness: useful intuition, weak metric.** Burstiness is usually operationalized as the coefficient of variation of sentence length ([arXiv 2507.10475](https://arxiv.org/pdf/2507.10475)). One vendor benchmark found sentence-length burstiness barely beats chance (AUROC 0.52) at separating machine from human prose, and a NeurIPS 2026 paper argues the common definition is confounded by mean length ([Opace measurement](https://opace.agency/tools/ai/content-verification-integrity/research/ai-writing-myths-measured/); [NeurIPS 2026 listing](https://neurips.cc/virtual/2026/164820)). **Engine implication:** do not optimize *for* a burstiness score; instead enforce the concrete structural rules below (fragment permission, paragraph-length variance, no uniform cadence), which produce burstiness as a by-product.

**Fiction-specific tells** collected by fiction-focused checkers and reader communities ([Fix Your Fiction](https://fixyourfiction.com/tools/ai-detector.html); [Lemmy thread](https://lemmy.4d2.org/post/987990); [Decrypt](https://decrypt.co/348923/5-biggest-tells-something-written-ai)):

- Em-dash density of roughly 15–25 per chapter in AI drafts vs. 1–4 in human fiction (vendor figure, unsourced; treat as directional).
- **Body-language stacking**: "Her jaw clenched. Her fists tightened. Her shoulders went rigid."
- **"Something [verb]ed" vagueness**: "Something shifted inside her," "Something ancient stirred."
- **Filter words**: "I felt," "I noticed," "I realized," "seemed to," "appeared to."
- **Stock metaphors**: "a tapestry of emotions," "the weight of the moment," "like a shroud," "the raw edges of her grief," "primal/ancient/feral/visceral."
- **Frictionless dialogue**: characters calmly trading complete information.
- **Overly neat structure**: uniform paragraphs, even rhythm, no digressions or tonal shifts.
- **Balanced noncommittal clauses**: "While X is true, Y is also important."
- Humans, by contrast, show anecdote, first-person idiosyncrasy, tangents, fragments, and occasional sloppiness.

**Caveat the engine must respect:** these are population-level tendencies. The Walrus piece reports that the statistical features which actually distinguish AI text did *not* predict which Reddit/HN comments got accused of being AI; humans accuse clean prose. So the goal is not "fool a detector" but "remove the hollowness the tells correlate with."

### 1.2 BANNED / SUSPECT phrase list

Tiering: **A = hard ban** (auto-reject the sentence), **B = quota** (max 1 per chapter, flagged), **C = context** (allowed in dialogue or a POV voice that has earned it; flagged in narration). Sources: W = Wikipedia AITELLS; K = Kobak; E = Economist; F = Fix Your Fiction / community fiction checkers; H = engine heuristic from fiction-community consensus (unsourced beyond widespread reader complaint).

| # | Phrase / pattern | Tier | Src |
|---|---|---|---|
| 1 | delve / delves / delving | A | W,K |
| 2 | tapestry (abstract) | A | W,F |
| 3 | a testament to | A | W |
| 4 | underscore(s) (verb) | A | W,K |
| 5 | showcase / showcasing | A | W,K |
| 6 | pivotal | A | W |
| 7 | crucial | B | W,K |
| 8 | meticulous / meticulously | A | W |
| 9 | intricate / intricacies | B | W |
| 10 | landscape (abstract: "the emotional landscape") | A | W |
| 11 | interplay | A | W |
| 12 | robust | A | W |
| 13 | vibrant | A | W |
| 14 | foster / fostering | A | W |
| 15 | enhance / enhancing | A | W,K |
| 16 | boasts (meaning "has") | A | W |
| 17 | nestled | A | W |
| 18 | in the heart of | A | W |
| 19 | serves as / stands as / functions as (for "is") | A | W |
| 20 | deeply rooted | A | W |
| 21 | indelible mark | A | W |
| 22 | evolving landscape / ever-changing | A | W |
| 23 | enduring / lasting legacy | B | W |
| 24 | garner | A | W |
| 25 | bolstered | B | W |
| 26 | multifaceted | A | W,E |
| 27 | leverage (verb) | A | W |
| 28 | navigate (abstract: "navigate her grief") | A | W,Decrypt |
| 29 | unlock (abstract) | A | Decrypt |
| 30 | ecosystem / framework / dynamic (abstract nouns) | A | Decrypt |
| 31 | "It's not X, it's Y" / "not X but Y" | A | W,E |
| 32 | "Not only X but also Y" | B | W,E |
| 33 | "Y rather than X" (as reversal tic) | B | W |
| 34 | "no X, no Y, just Z" | A | W |
| 35 | Triplet lists of adjectives ("cold, hard, unforgiving") | B | W,E |
| 36 | Trailing "-ing" explainer clause ("..., highlighting her resolve") | A | W |
| 37 | "It's important to note" / "It is worth noting" | A | W |
| 38 | "In summary / In conclusion / Overall / Ultimately" | A | W,Decrypt |
| 39 | "a stark reminder" / "a reminder that" | A | W,H |
| 40 | "setting the stage for" | A | W |
| 41 | "marking a turning point" / "key turning point" | A | W |
| 42 | palpable | A | H |
| 43 | whispered (as default dialogue tag) | B | H |
| 44 | shivers / chill down (his) spine | A | H |
| 45 | couldn't help but | A | H |
| 46 | little did he/she/they know | A | H |
| 47 | "a mix of X and Y" / "a mixture of fear and..." | A | H |
| 48 | something shifted / something broke / something ancient stirred | A | F |
| 49 | the weight of the moment / the weight of (abstract) | A | F |
| 50 | like a shroud | A | F |
| 51 | the raw edges of (grief) | A | F |
| 52 | primal / feral / visceral / ancient (as intensifiers) | B | F |
| 53 | a breath he didn't know he was holding | A | H |
| 54 | let out a breath / released a breath | B | H |
| 55 | the silence was deafening | A | H |
| 56 | time seemed to stand still / slow down | A | H |
| 57 | in that moment | B | H |
| 58 | a wave of (emotion) washed over | A | H |
| 59 | felt a surge of | A | H |
| 60 | heart pounded / hammered in (his) chest | B | H |
| 61 | jaw clenched / knuckles white / fists tightened (stacked) | B | F |
| 62 | eyes gleamed / glinted with (emotion) | B | H |
| 63 | a flicker of (emotion) crossed his face | A | H |
| 64 | unreadable expression | A | H |
| 65 | ghost of a smile | A | H |
| 66 | mischievous glint | A | H |
| 67 | voice barely above a whisper | A | H |
| 68 | the air was thick with / charged with | A | H |
| 69 | electric / electricity between them | A | H |
| 70 | a dance of / a symphony of / an orchestra of | A | H |
| 71 | kaleidoscope / labyrinth / ethereal (abstract) | B | H |
| 72 | beacon of hope | A | H |
| 73 | the fabric of (reality/society) | A | H |
| 74 | echoes of / whispers of (abstract) | B | H |
| 75 | unspoken understanding passed between them | A | H |
| 76 | newfound (determination/resolve) | A | H |
| 77 | resolve hardened / steeled himself | B | H |
| 78 | profound (sense of) | A | W,H |
| 79 | a sense of (unease/dread/calm) | B | H |
| 80 | the very essence of | A | H |
| 81 | delicate balance | A | H |
| 82 | stark contrast | A | H |
| 83 | a glimmer of (hope) | A | H |
| 84 | mind raced / thoughts swirled | B | H |
| 85 | the realization hit him like (a truck/wave) | A | H |
| 86 | the world narrowed to | B | H |
| 87 | bile rose in his throat | B | H |
| 88 | shadows danced | A | H |
| 89 | cutting through the silence | A | H |
| 90 | the darkness pressed in | B | H |
| 91 | like a moth to a flame | A | H |
| 92 | journey (abstract: "her journey") / embark | A | H |
| 93 | what it means to be (human) | A | H |
| 94 | in a world where... | A | H |
| 95 | for the first time in (a long time) | B | H |
| 96 | despite everything / and yet (paragraph opener) | B | H |
| 97 | it was then that / that was when | B | H |
| 98 | the seeds of (doubt) | A | H |
| 99 | in the grand scheme of things | A | H |
| 100 | Let's just say / Suffice it to say | A | H |
| 101 | "perhaps" / "maybe" as narrative hedges (>2 per chapter) | B | F |
| 102 | "seemed to" / "appeared to" (filter) | B | F |
| 103 | I felt / I noticed / I realized / I saw (filter) | B | F |
| 104 | "quietly," "steady," "clearer," "dependable," "matters" (2026 cluster) | B | W |
| 105 | hollow / hollowness (as emotional noun) | B | H |
| 106 | Spaced em dash " — " more than 3 per 1,000 words | B | W,F |

**Mechanics of enforcement [heuristic]:** run the A-list as regex on narration only (dialogue exempt if the speaker's voice profile permits it); count B-list per chapter and surface the top offenders to the line-edit pass; never auto-substitute with a synonym (that reproduces elegant variation). Replace with a *concrete* observation or delete.

### 1.3 Structural anti-patterns (with one-line fixes)

| # | Anti-pattern | One-line fix |
|---|---|---|
| 1 | Tricolons everywhere (three adjectives, three clauses, three examples) | Default to one or two; allow a triplet only when the third item breaks the pattern. |
| 2 | Every paragraph ends on a punchy one-liner | Let 2 in 3 paragraphs end mid-thought or on a mundane detail; reserve the zinger for the chapter's one turn. |
| 3 | Uniform sentence length (Economist: longer, fewer commas) | Enforce per-scene variance: at least one sentence under 5 words and one over 30; allow fragments. |
| 4 | Uniform paragraph length | Vary 1-line to 10-line paragraphs within a scene; use a one-word paragraph at most once per chapter. |
| 5 | Em-dash as universal joint | Cap at ~3 per 1,000 words; prefer commas, colons, full stops, or restructuring. |
| 6 | Rhetorical questions as interiority ("Was this really what he wanted?") | Convert to a declarative with a concrete object or to an action. |
| 7 | Summarizing the emotion the scene already showed ("She felt a deep sadness.") | Cut the summary line; if the scene did not show it, fix the scene, not the label. |
| 8 | Telling the theme ("This was what it meant to be free.") | Delete; theme lives in juxtaposition of events, never in a sentence. |
| 9 | Characters stating feelings in dialogue ("I'm scared, but I trust you.") | Replace with an oblique line, a deflection, or an action that contradicts the feeling. |
| 10 | Generic sensory lists ("the smell of pine, the sound of birds, the feel of the breeze") | One specific, unexpected sensory detail that only this character would notice. |
| 11 | Over-hedging ("perhaps," "maybe," "it seemed," "almost") | Commit; strip hedges unless the uncertainty is itself the point. |
| 12 | Happy-ending compulsion / every scene resolves positively | Default scene outcome to "No, and furthermore" or "Yes, but" (Butcher); save clean wins for arc climaxes. |
| 13 | Too-neat resolutions with every thread tied | Leave at least one named thread deliberately open per arc; log it in the Clue Ledger. |
| 14 | Sanitized conflict (antagonist concedes politely) | Give the antagonist a legitimate position and let them win the scene at least half the time. |
| 15 | Name-dropping emotions ("anger," "relief," "determination") | Substitute the body's specific behavior or the object the character fixates on. |
| 16 | Body-language stacking (three physical reactions per beat) | One physical reaction per beat, and not the first one you reached for. |
| 17 | "Something shifted" vagueness | Name the exact thing: what changed, measured against what it was. |
| 18 | Filter words ("he saw," "she heard," "he realized") | Render the perceived thing directly; the POV is already established. |
| 19 | Frictionless information exchange in dialogue | Give each speaker a goal that conflicts with answering; let them lie, evade, or misunderstand. |
| 20 | Thesis-statement paragraph openers (Palahniuk) | Cut the opener; start with the first concrete detail and let the reader draw the conclusion. |
| 21 | Thought verbs ("knew," "realized," "wondered," "felt") | Unpack into sensory detail and action (Palahniuk). |
| 22 | Balanced both-sides clauses ("While X, Y") | Pick a side; the character has a bias, so should the prose. |
| 23 | Trailing participial explainer ("..., a gesture that revealed her fear") | End the sentence at the gesture. |
| 24 | Synonym cycling for names ("the swordsman," "the older man," "the regressor") | Use the name or pronoun; elegant variation is a tell. |
| 25 | Recap of previous chapter in first paragraph | Open in motion; recap only through a character's present need. |
| 26 | Closing-paragraph moral or "reflection beat" every chapter | End on the turn or on an image; no coda. |
| 27 | Every character speaks with identical syntax | Assign idiolect rules per character (sentence length, favorite words, what they never say). |
| 28 | Stakes stated instead of dramatized ("Everything depended on this.") | Show the thing that will be lost in the room with the character. |
| 29 | Flashback/backstory dump when a feeling needs explaining | Dramatize the past as present action later, or imply it through a single object (Cron). |
| 30 | Simile overload (one per sentence) | Max one figurative comparison per paragraph; prefer literal specificity. |
| 31 | Scenes that start at the beginning and end at the end | Enter late, leave early; cut the arrival and the goodbye. |
| 32 | Monotone sentiment (no abrupt emotional modulation) | Interleave a comic or banal beat inside a tense scene and vice versa. |

### 1.4 Pipeline rules derived from the evidence [heuristic]

1. Lint narration, not dialogue, with the Tier-A regex; keep a per-character exemption list.
2. Track **per-chapter counts** of: em dashes, "not X but Y," triplets, trailing -ing clauses, thought verbs, filter words, named emotions. Surface them as a scorecard, not an auto-fix.
3. Measure **narrative diversity** across chapters (Jain et al.): distinct scene-opening types, distinct scene-ending types, distinct conflict shapes. Flag any shape used three chapters running.
4. Treat "polish" passes with suspicion: the Shrinking Landscape paper shows LLM polishing homogenizes style. Polishing should be *subtractive* (cut) rather than *substitutive* (reword).

---

## 2. What makes prose read as human

### 2.1 The principles, with their teachers

**Omission and the iceberg (Hemingway).** "If a writer of prose knows enough of what he is writing about he may omit things that he knows... The dignity of movement of an ice-berg is due to only one-eighth of it being above water." Omitting what you do not know leaves "hollow places" ([Wikipedia: Iceberg theory](https://en.wikipedia.org/wiki/Iceberg_theory)). The engine corollary: the outline and Clue Ledger must *know* far more than the chapter *says*. Omission is only legitimate when the ledger holds the omitted fact.

**Thought verbs (Palahniuk).** Ban "thinks, knows, understands, realizes, believes, wants, remembers, imagines, desires, loves, hates" and their past forms; also distrust "is" and "has." "Thinking is abstract. Knowing and believing are intangible." "Make your case like a lawyer in court, detail by detail." Don't open paragraphs with thesis statements; don't leave characters alone (solitary characters drift into thought); don't use "remember"/"forget" as bridges to backstory ([Palahniuk, LitReactor](https://litreactor.com/essays/chuck-palahniuk/nuts-and-bolts-%E2%80%9Cthought%E2%80%9D-verbs/)). Pushback exists: some writers argue thought verbs keep characters from being strangers; the engine should treat the ban as a default with a per-scene exception budget.

**Psychic distance (Gardner).** Five levels from "It was summer in Los Angeles, 1979" to full immersion in sensory fragments. Shifts must move one level at a time; sudden jumps break the "vivid and continuous dream" ([UNR summary](https://www.unr.edu/writing-speaking-center/student-resources/writing-speaking-resources/psychic-distance-in-creative-writing); [Emma Darwin](https://emmadarwin.substack.com/p/psychic-distance-what-it-is-and-how)). Engine rule: tag each paragraph with a distance level 1–5; forbid jumps of more than two levels inside a paragraph; open scenes at 2–3 and close the chapter's turn at 4–5.

**Motivation-Reaction Units (Swain).** Motivation = something *outside* the character; Reaction = feeling, then reflex action, then deliberate action/speech, in that order. The MRU is the smallest unit of cause and effect; scenes are chains of MRUs ([Writers in the Storm](https://writersinthestormblog.com/2022/06/create-compelling-scenes-with-the-mru/)). Engine rule: reactions precede speech; a character never explains a feeling before the body has reacted; a reaction that arrives before its stimulus is a continuity bug.

**Scene and Sequel (Swain via Butcher).** A **scene** = POV character + specific goal + conflict (between characters, not just adversity) + setback. Outcomes: Yes (weakest), Yes-but, No, **No-and-furthermore** (Butcher's favorite, "my go-to fix for a slowing plot"). A **sequel** = emotion → reasoning → anticipation → choice, in that order; sequels control pacing and empathy. "CONFLICT IS ALL ABOUT CHARACTERS. IT HAPPENS BETWEEN CHARACTERS." "ALWAYS pick the person with the MOST AT STAKE, emotionally, in the scene." ([Butcher, Scenes](https://jimbutcher.livejournal.com/2647.html); [Sequels](https://jimbutcher.livejournal.com/2880.html)).

**Steering the Craft (Le Guin).** Chapters: the sound of writing; punctuation and grammar; sentence length and complex syntax; repetition; adjectives and adverbs; verbs (person and tense); POV and voice; changing POV; indirect narration ("what tells"); crowding and leaping. "Crowding is what Keats said when he said load every rift with ore"; leaping is knowing what to skip while keeping a fixed trajectory. "Story is something moving, something happening, something or somebody changing." She rejects conflict as the only engine: relating, losing, discovering also move a story. "Craft enables art." ([Radacts on Crowding and Leaping](https://radacts.substack.com/p/crowding-and-leaping); [The Archetypist review](https://thearchetypist.substack.com/p/art-and-craft-steering-the-craft); [chapter list](https://thebleedingtypewriter.substack.com/p/steering-the-craft-chapter-1-exercises)). Engine rule: every chapter must contain at least one crowded passage (dense specific detail) and one leap (a time skip or omitted transition stated in a clause).

**Emotional modes (Maass).** *Inner mode* tells emotion, but must dig past the stock first feeling to layered, conflicting ones. *Outer mode* shows through action and subtext, and "when character emotions are highly painful, pull back" with wry distance. *Other mode* provokes in the reader a feeling the character does not share (Bradbury's Montag exhilarated as a house burns) ([Jane Friedman / Maass](https://janefriedman.com/produce-emotional-response)). Engine rule: for each emotional beat, pick a mode explicitly; never use inner mode with the first-listed emotion; use other mode at least once per arc.

**Escalation and causality (Saunders).** "Always be escalating." A story is "a continual system of escalation." Every structural unit must "be entertaining in its own right" and "advance the story in a non-trivial way" (Cornfeld). Causality is melody: "The queen died, and then the king died *of grief*." "Having made something happen, make it matter." Practise "ritual banality avoidance": refuse the first version ([Saunders lessons](https://afasterno.substack.com/p/writing-lessons-from-the-russians); [Spectrum Culture review](https://spectrumculture.com/2021/04/11/a-swim-in-a-pond-in-the-rain-by-george-saunders-review/)).

**Wired for Story (Cron).** The brain reads story as a survival simulation; the protagonist's *misbelief* is the real spine; every scene follows from the last by cause and effect; specificity means details that matter to the protagonist; flashbacks pull the reader out and need immediate justification ([Shortform summary](https://www.shortform.com/blog/wired-for-story-by-lisa-cron/)).

**The gap (McKee).** The core unit of drama is the gap between what the character expects when acting and what actually happens; a scene where the protagonist gets exactly what they expect is "a scene not worth shooting." Characters should have subconscious desires that run counter to conscious ones ([Emily Short on McKee](https://emshort.blog/2019/02/05/story-robert-mckee/)). Antagonism: a protagonist is only as compelling as the forces opposing them ([Graham Edwards](https://graham-edwards.com/2015/09/16/what-is-story/)).

**Adverbs and the 10% rule (King).** "The road to hell is paved with adverbs"; second draft = first draft minus 10%, from an editor's note "Not bad, but PUFFY" ([Signal v. Noise excerpts](https://signalvnoise.com/posts/322-excerpts-from-stephen-kings-on-writing); [Peter Clines](https://www.peterclines.com/?p=593)). Engine rule: the line pass must *reduce* word count by 8–12%.

**Close reading (Prose).** Attention at the level of words, then sentences, then paragraphs; rhythm comes from alternating long and short sentences; paragraphs are units of breath ([Wikipedia](https://en.wikipedia.org/wiki/Reading_Like_a_Writer)).

**Free indirect discourse.** Third person, past tense, colored by the character's idiom and judgments, without tags or quotation marks: "He was more in love with her than Emma had supposed" reads as fact but is Emma's perception ([LitCharts on Emma](https://litcharts.com/lit/emma/literary-devices/style); [writers.com](https://writers.com/?p=21657)). Overuse tires; it works when the narrator's evaluative words are ones the character would use. Engine rule: in limited third, narration vocabulary is drawn from the POV character's idiolect profile.

**Laws of Magic (Sanderson).** First: an author's ability to solve conflict with magic is proportional to how well the reader understands it. Second: limitations and costs are more interesting than powers. Third: expand what you have before adding new things ([Sanderson lecture notes #7](https://www.brandonsanderson.com/blogs/blog/guide-to-sandersons-laws-of-magic-lecture-notes); [Coppermind](https://coppermind.net/wiki/Sanderson%27s_Laws_of_Magic)). For cultivation systems this means: a breakthrough may never resolve a conflict the reader could not have predicted; costs (lifespan, sanity, debt to a sect) do the dramatic work.

### 2.2 Operational rules for "human" prose [heuristic unless cited]

1. **Specificity over generality:** one unexpected concrete noun beats three generic adjectives (Prose, Saunders, Cron).
2. **Deliberate imperfection:** permit fragments, a run-on in panic, a flat sentence after a lyrical one. Do not sand the prose.
3. **Subtext and withholding:** characters say less than they mean; at least one line per dialogue scene means the opposite of its surface.
4. **Voice idiosyncrasy:** each POV character carries a profile: average sentence length, three favorite words, two forbidden words, a characteristic metaphor domain (a smith thinks in heat and hammer-strokes; a scribe in margins and ink).
5. **Interiority that contradicts action:** at least once per chapter the character thinks one thing and does another, without the narrator reconciling the two.
6. **Unresolved threads:** every arc ends with one open question logged in the ledger.
7. **Show, and when to tell:** tell for transitions, time passage, and low-stakes information (Le Guin's "leaping"); show for turns, reveals, and emotional climaxes. Telling is also right when the *telling voice itself* is the entertainment (a wry narrator).
8. **Scene vs summary balance:** target roughly 70/30 scene-to-summary in a web-novel chapter; summary paragraphs must contain one crowded specific detail so they do not read as recap.
9. **Paragraphing rhythm and white space:** a one-line paragraph is a hammer; use it once per chapter at the turn. Dialogue runs should be broken by action beats no more than every third exchange.
10. **Kill your darlings:** any sentence the drafting model flags as "beautiful" is a candidate for cutting; beauty that does not escalate or characterize is decoration.

---

## 3. Story construction

### 3.1 Comparison of structural models

| Model | Beats | Fits when | Failure modes |
|---|---|---|---|
| **Three-act** | Setup / Confrontation / Resolution; turning points at ~25% and ~75% | Any single-volume story; the default scaffold | Saggy middle; acts are too coarse to guide chapters |
| **Freytag's pyramid** (1863, *Die Technik des Dramas*) | Exposition, rising action, climax (center), falling action, denouement | Tragedy, five-act drama | Modern readers want the climax late; a long falling action kills momentum ([writers.com](https://writers.com/freytags-pyramid)) |
| **Hero's Journey (Vogler, 12 stages)** | Ordinary World, Call, Refusal, Mentor, First Threshold, Tests/Allies/Enemies, Approach, Ordeal, Reward, Road Back, Resurrection, Return with Elixir; archetypes Hero, Mentor, Threshold Guardian, Herald, Shapeshifter, Shadow, Ally, Trickster | Quest fantasy, coming-of-age, first arc of a progression story | Predictable; mentors die on schedule; refusal beats feel padded ([Wikipedia](https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_for_Writers)) |
| **Save the Cat (Snyder, 15 beats)** | Opening Image 1%, Theme Stated 5%, Set-Up 1–10%, Catalyst 10%, Debate 10–20%, Break into Two 20%, B Story 22%, Fun and Games 20–50%, Midpoint 50%, Bad Guys Close In 50–75%, All Is Lost 75%, Dark Night 75–80%, Break into Three 80%, Finale 80–99%, Final Image | Commercial, high-concept, when you need a page-count discipline | Mechanical if followed by page number; the "theme stated" beat invites telling the theme ([Reedsy](https://reedsy.com/blog/guide/story-structure/save-the-cat-beat-sheet/)) |
| **Story Grid Five Commandments (Coyne)** | Inciting incident (cause or coincidence) → progressive complications → turning point → crisis (best bad choice *or* irreconcilable goods) → climax (the action taken) → resolution; applies fractally to beat, scene, sequence, act, book; every scene must shift a value (+ to −, − to −−) | Scene-level QA; editing; diagnosing dead scenes | Over-applied it makes every scene a mini-melodrama; "irreversibility" must escalate or scenes feel samey ([Story Grid](https://storygrid.com/5-commandments-storytelling-revisited/)) |
| **Story Circle (Harmon, 8 steps)** | You / Need / Go / Search / Find / Take / Return / Change; top half order, bottom half chaos | Episodic TV, one-chapter or one-arc units; serials with returning status quo | Can feel like a treadmill if "Change" is cosmetic ([StudioBinder](https://studiobinder.com/blog/dan-harmon-story-circle)) |
| **Kishōtenketsu (起承転結)** | Ki introduction / Shō development / Ten twist (a recontextualizing turn, not necessarily conflict) / Ketsu reconciliation | Mystery reveals, slice-of-life interludes, chapters whose payoff is a *reframing* rather than a fight | Western readers may feel "nothing happened" if the ten does not land; weak when stakes are physical ([Wikipedia](https://en.wikipedia.org/wiki/Kish%C5%8Dtenketsu); [Mythic Scribes](https://mythicscribes.com/?p=6914)) |
| **Seven-Point (Dan Wells)** | Hook (opposite of resolution) → Plot Turn 1 (call) → Pinch 1 (pressure) → Midpoint (reaction → action) → Pinch 2 (dire; mentor lost) → Plot Turn 2 (last piece of information) → Resolution; plan *backwards* from resolution | Arcs and subplots; romantic subplots; outlining in reverse | Pinches become predictable villain attacks; mentor-death cliché ([Writing Excuses 7.41](https://writingexcuses.com/writing-excuses-7-41-seven-point-story-structure/)) |
| **Scene/Sequel (Swain, Butcher)** | Scene: goal/conflict/setback (Yes, Yes-but, No, No-and-furthermore); Sequel: emotion/reason/anticipation/choice | Chapter-level engine for serials; pacing control | Too many sequels = navel-gazing; too few = reader can't feel stakes ([Butcher](https://jimbutcher.livejournal.com/2647.html)) |
| **Promise / Progress / Payoff (Sanderson)** | Promises: tone, story, character, structural. Progress signposts: new information, new obstacles, key decisions, direction shifts; "A big reason that people drop off a book is that there weren't enough signposts of progress." Payoff: "a surprising but fulfilling answer to your promise" | Long-form plotting; mystery pacing (clues found, suspects eliminated); any serial | Promising something you can't pay; progress that is motion without meaning ([Sanderson lecture #2, 2025](https://www.brandonsanderson.com/blogs/blog/brandon-sandersons-2025-guide-to-plot-lecture-2)) |
| **Try/Fail cycles ("Yes, but / No, and")** | Attempt → Yes-but (success with new complication) or No-and (failure that worsens things); escalate each cycle; mirror the ending in early failures; final cycle becomes try-succeed; reverse polarity near resolution ("yes, and / no, but") | Middles; action sequences; training arcs | The "three cycles" rule applied as a checklist; complications unrelated to the spine ([Writing Excuses 10.29](https://writingexcuses.com/writing-excuses-10-29-why-should-my-characters-fail-spectacularly/)) |

### 3.2 Notes on using the models together

- **Story Grid's five commandments are the best scene-level QA test** because they are fractal: a chapter without an inciting incident, a complication, a crisis question, a climactic action, and a resolution that shifts a value is a dead chapter. Coyne's "crisis" definition (best bad choice vs. irreconcilable goods) is directly machine-checkable: the outline must name the two options.
- **Butcher's climax anatomy** (isolation → confrontation → dark moment → choice → dramatic reversal → short resolution) maps onto arc finales; "Deliver on the climax or die as a working writer"; "Keep it short" ([Butcher, Story Climax](https://jimbutcher.livejournal.com/3447.html)).
- **Butcher's planning order** (story question → protagonist → antagonist → story arc → subplot arcs → character profiles → scene/sequel outline → climax) is a sound order for the engine's outline stage ([Putting It All Together](https://jimbutcher.livejournal.com/4053.html)).
- **Kishōtenketsu** is the right template for *reveal chapters* in a mystery-heavy serial: the "ten" is the recontextualization, and the "ketsu" is the character absorbing it. It avoids the trap of every chapter ending in a fight.

### 3.3 Recommended hybrid for a 300+ chapter serial [heuristic synthesis]

**Layer 1: Series spine = Promise/Progress/Payoff over a mystery.** Define three or four *series promises* (tone, the central mystery question, the protagonist's internal misbelief, the power-system ceiling). Every 10–15 chapters must deliver a visible progress signpost on at least one of them.

**Layer 2: Arcs (25–60 chapters) = Seven-Point structure, planned backwards.** Each arc has a Hook that is the opposite of its Resolution; Pinch 2 is where the arc's mystery seems to collapse; Plot Turn 2 is a *clue payoff* from the ledger, not new information. Arc climaxes follow Butcher's six stages.

**Layer 3: Mini-arcs (5–8 chapters) = Story Circle.** Comfort / need / unfamiliar place / adapt / get it / pay for it / return / changed. The "Take" step is a cost to the power system or a relationship (Sanderson's Second Law).

**Layer 4: Chapter = one scene + one turn.** Each chapter contains exactly one Scene (goal, conflict, setback) and, optionally, a Sequel for the previous chapter's setback. The chapter's single *turn* must be one of: new information, a reversal, a cost paid, a decision made, or a relationship shifted. Outcome distribution per arc: ~50% No-and-furthermore, ~30% Yes-but, ~15% No, ~5% clean Yes (reserved for arc climaxes and earned rest chapters).

**Chapter-level hooks.** Open in motion (no recap); place the turn in the final 15% of the chapter; end on the *consequence* of the turn, not on a question. Cliffhanger cadence: a hard cliffhanger (life, identity, or betrayal) at most once every 4–5 chapters; soft hooks (a decision made, a door opened, a line that recontextualizes) on the rest. Hard cliffhangers that are resolved by a cheat in the next chapter's first paragraph train readers not to trust them.

**Reveal chapters** use kishōtenketsu; **training/progression chapters** use try/fail cycles with the final cycle a try-succeed only when the Clue Ledger marks the relevant plant as "paid"; **rest chapters** (every 8–12) use a sequel-heavy structure and a comic beat, but still shift one value (Coyne).

**Value tracking.** Every chapter records which Story Grid value shifted and in which direction. Three chapters in a row with the same direction trigger a flag (Coyne: alternate shifts).

---

## 4. Mystery and clue management

### 4.1 Fair play: the historical rule sets

**Knox's Decalogue (1929)** ([Thrilling Detective](https://thrillingdetective.com/2019/01/10/father-knoxs-decalogue-the-ten-rules-of-golden-age-detective-fiction/)): the criminal must be mentioned early and must not be someone whose thoughts the reader has followed; no supernatural; at most one secret passage; no undiscovered poisons or long scientific explanations; (the fifth rule is a period racial exclusion, discarded); no accident or unaccountable intuition may solve it; the detective must not be the culprit; the detective may not conceal clues from the reader; the sidekick must not conceal thoughts and should be slightly below the reader's intelligence; no twins or doubles without preparation.

**Van Dine's Twenty Rules (1928)** ([Gaslight etext](https://www.staff.u-szeged.hu/~gnovak/vandine.htm)): equal opportunity to solve with all clues plainly stated; no tricks on the reader beyond those the criminal plays on the detective; the culprit must be a prominent, known character; deduction, not chance or confession; only one principal culprit; no secret societies as the murderer's backup; motives personal; no long atmospheric digressions; and a list of exhausted devices (silent dog, twin substitution, forged fingerprints, dummy alibi, locked room the police verified, word-association test, cipher).

**The modern condensation:** "There must be fair play." The clues shown must be the ones actually used; the culprit must already be a suspect; red herrings, lying suspects, and a detective withholding *theories* (not *facts*) are permitted ([CrimeReads, "A Magician's Contract"](https://crimereads.com/a-magicians-contract-between-reader-and-writer-rules-for-delivering-a-whodunit/)).

**Translating to a regression-cultivation serial:** replace "detective" with "regressor" and "culprit" with "the hidden hand behind the world." Rules that survive: the hidden big-bad must be *present* (named, seen, or felt) long before the reveal; the reader must have seen every fact the protagonist uses to solve it; the protagonist may withhold theories, not facts; no new power or revelation in the final chapters may do the solving (Sanderson's First Law); twins/doubles/possession must be prepared.

### 4.2 Techniques for planting and paying off

**Chekhov's gun, correctly.** The 1889 letter says "One must not put a loaded rifle on the stage if no one is thinking of firing it"; the "first act / last act" formulation is Gurliand's recollection. The original principle is *economy* (don't plant what you won't fire), and the modern reading is *plant-and-payoff* ([Writing Classes](https://www.writingclasses.com/toolbox/ask-writer/whats-this-business-about-chekhovs-gun); [Wikipedia](https://en.wikipedia.com/wiki/Chekhov_gun)). Engine rule: both readings are enforced by the ledger: every plant has a scheduled payoff, and every payoff has a recorded plant.

**Three tools (CrimeReads):** *Concealment* (hide the key clue among more memorable innocent items), *Misdirection* (point attention elsewhere; follow the clue immediately with a bigger event so the reader forgets it), *Delay* (reveal late, or reveal early and attach meaning late).

**Christie's catalogue** (Hope & Hope, *Agatha Christie: Plots, Clues and Misdirections*, 33 techniques; from the [Cross-Examining Crime review](https://crossexaminingcrime.com/2024/01/06/agatha-christie-plots-clues-and-misdirections-thirty-three-ways-the-queen-of-crime-deceives-us-2023-by-sally-and-tony-hope/)): "Plenty of Nothing" (a valueless-seeming detail is priceless); "Identity theft" (people are not who they seem, in ~60% of her novels); "Missing the target" (conceal the intended victim); "Sawing the clue in half" (place the two halves of one clue in different parts of the book); "Clue clusters"; unlikely partners in crime; and the master deception, "the impression that her writing is simple." Other analyses add: the narrator as culprit (*Roger Ackroyd*), clue overload so readers eliminate rather than build ([LitCharts, Orient Express](https://www.litcharts.com/lit/murder-on-the-orient-express/themes/deception-and-genre-expectations)), and plain prose as camouflage ([Open University](https://www.open.edu/openlearn/history-the-arts/agatha-christie-and-the-golden-age-detective-fiction/content-section-5.1)).

**Rowling's methods** (secondary analyses): clues hidden inside jokes and worldbuilding so they read as comedy (Rita Skeeter's beetle); names that carry meaning; a line that reads as casual and is later re-framed (Snape's "asphodel and wormwood" via the Victorian language of flowers); Dumbledore as the sanctioned clue-dispenser; callbacks visible only on reread ([Pottermore/HarryPotter.com](https://www.harrypotter.com/features/clues-jkr-gave-us-about-the-harry-potter-books-heroes-villains-and-hogwarts); [Business Insider](https://www.businessinsider.nl/harry-potter-books-details-foreshadowing-2017-11/); [Editorial Department on Chekhov's gun in HP](https://www.editorialdepartment.com/chekovs-gun-more-lessons-from-the-harry-potter-series)).

**Gene Wolfe's layered narration** (Evenson, Reactor): Severian is unreliable through *omission and ambiguity*, not lies; events are recounted out of sequence so the reader cannot tell concealment from preference; early oddities (wanting to carry the moon-landing picture to a forest) make sense only after later facts (the moon is green with trees); some clues are flagged "I will understand this later," most are not; rereading "begin[s] to see what was already there." Wolfe reportedly never wanted to give a clue more than once ([Reactor](https://reactormag.com/what-makes-an-unreliable-narrator-severians-voice-in-gene-wolfes-the-book-of-the-new-sun/); [Goodreads thread](https://www.goodreads.com/topic/show/2030522-when-does-severian-lie-and-why)). For a regressor-narrator this is the template for *fair* unreliability: the narrator may misinterpret, may omit, may order events to his own ends, but may not state a falsehood the text does not later expose.

**Long-range setup in anime/manga.** *Fullmetal Alchemist* hides its largest twists in its smallest details (Father's silhouette before the leads appear; Philosopher's Stone research introduced as an institutional project in dossiers before it is a legend). *Steins;Gate* disguises triggers as slice-of-life moments: "foreshadowing that is only visible once the trap has already closed"; a GDC 2023 talk describes "a myriad of inconspicuous plot threads... then executes everything all at once" ([Fiction Horizon](https://fictionhorizon.com/smartest-foreshadowing-seeds-in-season-1-of-an-anime/); [GDC 2023, Runyon](https://media.gdcvault.com/gdc2023/GNR/RunyonConnor_DigiPenInstituteofTechnology_GNR2023.pdf)).

**Sanderson: mystery as promise, not mystery box.** His framework treats a mystery as a *promise* whose progress is "clues discovered, suspects ruled out, mysteries slowly unraveling" and whose payoff must be "surprising but fulfilling"; a twist "redirects the reader's expectations gradually" ([Sanderson lecture #2](https://www.brandonsanderson.com/blogs/blog/brandon-sandersons-2025-guide-to-plot-lecture-2)). Abrams' TED "mystery box" holds the opposite: "Mystery is more important than knowledge" ([TED](https://www.ted.com/talks/j_j_abrams_mystery_box)). Critics of *Lost* note that a mystery is a debt the storyteller must repay ([Slap Happy Larry](https://www.slaphappylarry.com/?p=57600)). I could not retrieve a transcript of Sanderson discussing *Lost* by name; the principle is clear from his published notes: **the author must know the answer before planting the question.** Engine rule: a mystery cannot be opened in the outline without a ledger row whose "what is actually true" field is filled.

### 4.3 Rules of thumb for the ledger [heuristic unless cited]

1. **Plant-to-payoff distance scales with importance.** Small payoffs: 1–5 chapters. Arc payoffs: 20–60 chapters. Series payoffs: planted in the first 5% of the story, echoed every 40–80 chapters, paid in the final 10%.
2. **Rule of three for echoes.** A series-level clue is planted once, echoed at least twice in different emotional contexts (once in a joke, once in a scene whose focus is elsewhere), then paid. One mention is a trivia nugget; three is a pattern the reader can retroactively assemble.
3. **Camouflage methods (pick one per plant):** in a list of mundane items; inside a joke or insult; in a scene whose emotional focus is elsewhere (grief, a fight); in a character's error; in worldbuilding exposition; in a name; as "plenty of nothing" (a detail the POV dismisses); sawn in half across two distant chapters; attributed to an unreliable speaker.
4. **Follow a clue with a louder event** (CrimeReads misdirection). Never let a planted clue be the last beat of a chapter.
5. **Red herrings must be fair:** a red herring is a true fact that supports a wrong inference. The engine may not invent a false fact to mislead; it may let a character lie, provided the lie is exposed or exposable.
6. **"Solvable but not solved":** before each arc payoff, run a *reader simulation*: given only the planted text, can a judge model list the facts needed? If it cannot, the payoff is unfair; if it can state the answer with confidence from one clue, the camouflage failed.
7. **Retroactive recontextualization** is the payoff style that rewards rereading: the payoff chapter should *quote or paraphrase* the earlier plant so the reader feels the click.
8. **Unreliable narration, fairly:** the narrator may omit, misinterpret, or reorder; never state a falsehood as narration that is not later exposed. Mark every narrator misinterpretation in the ledger as type `misread`.

### 4.4 Regression-genre conventions (Korean/Chinese web novels)

Regression (회귀), possession (빙의), and reincarnation (환생) are the "success formula" of Korean web novels; "the overwhelming majority of Korean web novels open with one of the three" because the device establishes motive and advantage within a single episode ([youngju.dev essay](https://www.youngju.dev/transcribe/storytelling/web-novel-grammar.en); [JoongAng Daily on time loops](https://www.koreajoongangdaily.com/opinion/koreas-fascination-with-time-loop-dramas-reflects-deeper-societal-malaise/12437577)). Critic Kim Gyo-seok calls regression "the defining characteristic of Korean webtoons and web novels." A Korean study found return/reincarnation web novels deliver "early catharsis in the free episodes, making them anticipate a full-scale catharsis, which attracts readers to pay for the next episodes" ([accesson.kr](https://www.accesson.kr/daejung/assets/pdf/57632/journal-31-3-145.pdf)).

Conventions the engine should honor (sources where found; otherwise genre-standard):

- **Regressor's knowledge as a depleting resource.** Foreknowledge holds only while events follow the known timeline; the protagonist's own actions cause divergence and shrink the advantage (made explicit in *Omniscient Reader's Viewpoint*, where Kim Dokja's omniscience "holds only while events follow the original plot" ([Critics at Large](https://www.criticsatlarge.ca/2025/08/reductio-ad-absurdumomniscient-reader.html))). Readers complain when stories ignore the butterfly effect entirely ([r/ProgressionFantasy thread](https://reddit.birdcat.cafe/r/ProgressionFantasy/duplicates/1k7ln3g)). Engine rule: maintain a **Foreknowledge Ledger** with each known future event, its confidence (intact / shifted / invalidated), and the chapter where divergence invalidated it. Spend at least one known event per arc; invalidate at least one per arc.
- **Knowledge that corrupts.** The regressor's certainty becomes a flaw: he treats people as pieces, misjudges a changed person, or clings to an outdated plan. This is the regressor's version of Cron's misbelief.
- **Dramatic irony between regressor and cast.** The reader knows what the cast does not; the cast knows what the regressor has forgotten (how to be a person). Interleave scenes where the cast's ignorance is funny with scenes where it is lethal.
- **Butterfly-effect bookkeeping.** Each deliberate change must have a logged ripple (who is now where, who died who should not have). Unlogged ripples are plot holes; logged ripples are plants.
- **Hidden big-bad reveal.** Fair-play rules apply: the hidden hand must have been on stage, under another identity or role, for most of the story (Christie's "identity theft").
- **Cultivation realm progression as pacing spine.** Standard ladder: Qi Refining (炼气) → Foundation Establishment (筑基) → Golden Core (金丹) → Nascent Soul (元婴) and beyond; the story "levels up and changes maps" when no worthy opponent remains ([Wuxiaworld genre guide](https://www.wuxiaworld.com/page/introduction-to-chinese-webnovel-genres-xianxia?full=1)). Korean murim ladder alongside (절정, 삼화취정, 오기조원), as in *A Regressor's Tale of Cultivation* ([jab-guyver realm summary](https://jab-guyver.co.kr/7592)). Sanderson's laws: a breakthrough never resolves a conflict the reader did not see coming; each realm has a *cost* (tribulation, lifespan, sanity, obligation).

### 4.5 Clue Ledger template

| Field | Type | Notes |
|---|---|---|
| `id` | string | `CL-0001`; stable across revisions |
| `type` | enum | `plant` / `echo` / `payoff` / `red-herring` / `misread` (narrator misinterpretation) / `foreknowledge` |
| `mystery_thread` | string | which series/arc question this serves (e.g. `M-ORIGIN`, `M-ASCENSION`, `M-BIGBAD`) |
| `tier` | enum | `scene` / `arc` / `series` |
| `chapter_planted` | int | |
| `chapters_echoed` | int[] | each echo must use a different camouflage |
| `chapter_payoff` | int or null | scheduled; `null` = deliberately open |
| `reader_meant_to_think` | text | the wrong or incomplete inference |
| `actually_true` | text | the fact; must be filled before the plant is written |
| `camouflage` | enum | `list` / `joke` / `off-focus-scene` / `character-error` / `exposition` / `name` / `plenty-of-nothing` / `sawn-half-A` / `sawn-half-B` / `unreliable-speaker` |
| `fair_play_check` | text | which facts a reader needs, and where each was shown |
| `misdirect_follow` | int | chapter/paragraph of the louder event that follows the plant |
| `status` | enum | `planned` / `planted` / `echoed` / `paid` / `abandoned` (abandoned requires a written justification) |
| `owner_pov` | string | which POV character carries the plant |
| `verbatim_hook` | text | the exact phrase to be quoted or paraphrased at payoff |

Example row:

```yaml
- id: CL-0042
  type: plant
  mystery_thread: M-ASCENSION
  tier: series
  chapter_planted: 17
  chapters_echoed: [88, 203]
  chapter_payoff: 612
  reader_meant_to_think: "The sect's bell is cracked because of the war."
  actually_true: "The bell cracked the night the first ascender left; it rings itself when another is about to."
  camouflage: plenty-of-nothing
  fair_play_check: "Crack shown ch17 (list of repairs); bell rings unprompted ch88 (joke about ghosts); ch203 elder dismisses it during a funeral."
  misdirect_follow: 17
  status: echoed
  owner_pov: Seo Eunhyeon
  verbatim_hook: "a hairline crack running from the lip to the crown"
```

---

## 5. Serialized web novel craft

### 5.1 Platform norms

**Length.** Royal Road community consensus: 1,500–2,500 words per chapter is the sweet spot; consistency of cadence matters more than exact length; each chapter should feel structurally complete with a beginning, middle, and end ([Litopia RR experiment](https://colony.litopia.com/threads/royal-road-experiment-the-stats.15642/latest); [Erica Drayton on serial word counts](https://ericadrayton.substack.com/p/word-count-in-serial-fiction)). Korean platforms: episodes ~100 won each, readable in "five minutes or less," designed for commuting gaps; daily uploads; authors keep 60–70% ([JoongAng Daily](https://www.koreajoongangdaily.com/korea/short-addictive-web-novels-hook-more-readers-anyone-can-write-them-and-biggest-hits-have-become-dramas-musicals/10152441)). Korean episodes are conventionally ~5,000–5,500 Korean characters; *A Regressor's Tale of Cultivation* was noted for running ~9,000 characters per episode at ~7 episodes a week ([fmkorea review](https://www.fmkorea.com/6305969912)). Chinese Qidian chapters vary by genre (roughly 2,000–4,000 characters; one serial grew from 1.2k to 3k after reader complaints) and update daily ([Chinese-forums](https://chinese-forums.com/forums/topic/61901-guide-to-reading-chinese-fiction-from-absolute-beginner-to-beyond-hsk-6/page/3); [Wikipedia Qidian](https://en.wikipedia.org/wiki/Qidian)). Engine target: **2,000–2,800 English words per chapter**, fixed cadence.

**Hook-at-end.** Wikipedia's survey of Korean web novels: authors are advised to end episodes on exciting moments or cliffhangers; continuity pulls readers to pay for the next episode ([Wikipedia: Web novels in South Korea](https://en.wikipedia.org/wiki/Web_novels_in_South_Korea)). KakaoPage's "Wait for Free" and Naver's "Free for You" models monetize the gap between episodes, which is why the end-of-episode pull is the genre's core discipline.

**사이다 / 고구마 (cider / sweet potato).** Korean reader slang: *sida* is the fizzy payoff (comeuppance, breakthrough, vindication); *goguma* is the throat-clogging frustration of a stalled or humiliated protagonist. The craft is the *ratio and rhythm*: goguma builds the debt that sida repays; too much goguma loses readers, too much sida is empty. Face-slapping (打脸) is a ritualized sida delivery.

**POV conventions.** Korean regression novels overwhelmingly use **first-person past tense** with heavy interior monologue (the fmkorea reviewer's complaint about "excessive internal monologue" in RTOC reflects the mode; its review title "To me, regression is murder" is in the protagonist's voice). Chinese xianxia defaults to **third-person limited** following one protagonist (*Reverend Insanity* is third person). I could not find an academic source confirming the Korean first-person norm; treat as strong community-level observation.

**Power systems as pacing.** Realms create a visible progress bar (Sanderson's "signposts of progress"); "changing maps" when the protagonist outgrows a region resets the antagonist pool; costs and calamities that scale with power (*Reverend Insanity*'s "brutal math": Gu Immortals must keep growing just to survive their own tribulations) keep stakes attached to progression ([The Motte review thread](https://www.themotte.org/post/2195/pokmon-for-unrepentant-sociopaths-a-review)).

**Comedic undercutting.** Humor after a tense beat is the genre's pressure valve (*Trash of the Count's Family*, *Omniscient Reader*); it also serves Maass's "pull back when emotions are highly painful." Rule: one comic beat per tense chapter, never *inside* the turn itself.

**Face-slapping and why it reads cheap.** Reviewers of weaker xianxia note "repetitive face-slapping moments where each new antagonist is quickly humiliated... more like trope execution than storytelling," versus works where antagonists persist across arcs so conflicts build ([Wuxiaworld review of *Supreme Sword Exalt*](https://www.wuxiaworld.com/novel/supreme-sword-exalt)). A danmei reviewer notes the cost: readers "have to sit through all the disgusting behaviors of the bad guys before you can get to watch them fall" ([Fujoshi Chronicles](https://fujoshichronicles.bearblog.dev/transmigrating-into-the-heartthrobs-cannon-fodder-childhood-friend-review/)). Engine rules: no antagonist humiliated in the same chapter he is introduced; an antagonist must win at least one exchange before losing; the humiliation must cost the protagonist something (Yes-but, not Yes).

### 5.2 How the best handle long mystery arcs

- ***Lord of the Mysteries*** (Qidian 2018–2020, eight volumes; sequence 9→0 Beyonder system; pathways; potions that must be "digested" by acting the role): case-of-the-week investigations in Volume 1 carry recurring clues (the Notebook, the Aurora Order, Hornacis, Emperor Roselle); mysteries are revealed gradually and characters' memories are sometimes altered or unreliable; the slow-burn chapters 1–5 are widely treated as deliberate ([Wikipedia](https://en.wikipedia.org/wiki/Lord_of_the_Mysteries)). The lesson: the power system *is* the mystery (each pathway's name is a clue to the cosmology), so progression and revelation are the same signpost.
- ***Omniscient Reader's Viewpoint*** (Munpia 2018–2020, 551 chapters): a reader-protagonist whose foreknowledge is literally a text; a regressor (Yoo Joonghyuk) whose loops are the hidden history; metafictional layers (a plagiarist and the author turn out to be the same person; a "Disconnected Film Theory" resolves paradoxes); the "missing epilogue," Yoo Joonghyuk's constellation identity, and Secretive Plotter's identity are the series-level mysteries; "the story only makes sense once you have read up to each moment" ([Wikipedia](https://en.wikipedia.org/wiki/Omniscient_Reader%27s_Viewpoint); [Critics at Large](https://www.criticsatlarge.ca/2025/08/reductio-ad-absurdumomniscient-reader.html)). Lesson: dramatic irony between the one who knows the text and the one who lived it is a renewable engine.
- ***Reverend Insanity*** (third person; protagonist already 500 years old at open): long-term planning is the content; "one step of a blood deity long-term plan" unfolds over many chapters; risks taken "mostly after careful planning"; critics say it is ~30% too long and that thematic material is spent by the end of the first arc; defenders praise the brutal math of the Gu system and antagonists (Duke Long) who are not villains ([Wikipedia](https://en.wikipedia.org/wiki/Reverend_Insanity); [The Motte](https://www.themotte.org/post/2195/pokmon-for-unrepentant-sociopaths-a-review)). Lesson: a schemer-protagonist requires the reader to see the plan's *pieces* in advance (fair play) but not the *assembly*.
- ***The Beginning After the End***, ***Trash of the Count's Family***, ***Return of the Mount Hua Sect***: search returned no reliable structural analyses; only premise summaries and SEO pages. Genre-level observation [heuristic]: TotCF uses a protagonist who knows the *book* but not the *world beyond its pages*, so foreknowledge expires at the original ending; Mount Hua uses a 100-year-later regressor whose knowledge is mostly *obsolete*, converting foreknowledge into grief and comedy rather than cheat codes.

### 5.3 *A Regressor's Tale of Cultivation* (회귀수선전, 回歸修仙傳)

**Facts (sourced).**
- Author: 엄청난 (romanized Eomcheongnan). Platform: Munpia, then Naver Series ([소설넷](https://ssn.so/series/204265/)). Reached #1 on Munpia's free best list and held #1 on the paid best list for an extended period (namu.wiki, via search summary; the page itself returned 403).
- Status: main story complete at **809 episodes** (some sources say 814); side stories (외전) ongoing and sharply comedic in tone ([Ruliweb review](https://bbs.ruliweb.com/community/board/300143/read/73142988)). Reviewers estimate content density equivalent to ~1,000 episodes of a typical serial; episodes ran ~9,000 Korean characters at ~7 per week ([fmkorea](https://www.fmkorea.com/6305969912)).
- Webtoon adaptation on Naver Webtoon from June 19, 2025 (art Kim Muhyeon); English digital release via Webtoon Entertainment from October 6, 2025; MAL score 7.86 from ~468k users ([MyAnimeList](https://myanimelist.net/manga/183650/A_Regressors_Tale_of_Cultivation)). The manhwa skips the first regression and opens at the second. The English novel translation circulating on Webnovel.com is labelled a "fanfic" upload by NeverluckySMILE (unofficial) ([Webnovel](https://m.webnovel.com/book/30120306108140505)).
- 소설넷 rating 3.91/5 from 580 ratings.

**Premise and structure.** Seven ordinary office workers are dropped into a xianxia world during a company workshop. Six receive talents and are recruited by sects; the protagonist **Seo Eunhyeon (서은현)** has no spiritual root (영근), lives an ordinary 50 years as a mortal, dies, and wakes at the start. His talent is **infinite regression**, which he experiences as a curse: each loop erases achievements, memories of others, and relationships, so his motive becomes *escaping* regression and returning home. Paradoxically he gives every life full effort ("if he attains the Way in the morning he can die content by evening"). Early arcs are murim-flavored (절정/삼화취정/오기조원 realms) in a xianxia world (연기기/축기기/결단기 ladder), later arcs scale to tens of thousands of years, other dimensions, and cosmic horror ([fmkorea](https://www.fmkorea.com/6305969912); [Ruliweb](https://bbs.ruliweb.com/community/board/300143/read/73142988); [MAL review](https://myanimelist.net/manga/183650/A_Regressors_Tale_of_Cultivation); [jab-guyver](https://jab-guyver.co.kr/7592)). Narration is reported to be first-person with heavy interior monologue (unverified beyond reviewer complaints and the review title's phrasing).

**Mysteries and payoff.** Korean readers' dominant praise is **떡밥 회수** (clue collection): the ending "cleanly collected its foreshadowing" at a time when most serials "scatter hooks and explode the ending without cleaning up"; one 소설넷 reviewer says that after finishing, "the weaknesses on the surface turn out to have been perfect foreshadowing"; the final line carries a Buddhist meaning that lands only for readers who know the concepts ([pgr21 via search](https://ppt21.com/freedom/104356); [소설넷](https://ssn.so/series/204265/); [Ruliweb](https://bbs.ruliweb.com/community/board/300143/read/73142988)). The MAL novel-reader review calls it "dark, well-foreshadowed," mixing politics, philosophy, love, action, mystery, psychological horror and cosmic horror, with "hidden clues and Easter eggs" and unnamed villains worth a reread. The world's origin, the nature of "Heaven," and ascension (승선) are the series-level questions; sources confirm they are resolved but do not detail the answers (and this report will not reproduce them). Worldbuilding draws on Buddhism, Taoism, Hinduism, with Confucian and Won-Buddhist elements.

**Reception: praise.** A "Korean-style" protagonist who values bonds and loyalty over xianxia ruthlessness; approachable terminology for genre newcomers; distinctive motive (wanting to *lose* the cheat); the regression loop as a reveal engine with each cycle building toward disclosure; the step-by-step, "earned" power escalation; update speed ([소설넷](https://ssn.so/series/204265/); [fmkorea](https://www.fmkorea.com/6305969912)).

**Reception: criticism.** Emotional excess (감정과잉) and melodrama; padding and over-explanation of minor realms and fights; slow, "dunce" growth that some find depressing; side characters reset with each loop so relationships do not accumulate; heroines underdeveloped; scale inflation to tens of thousands of years flattens character development; mid-story sag with some readers quitting around chapters 200–400; a late arc ("Gu Lik") disliked; the comedic side stories undercut the main story's emotional weight; best read in binges of 20–30 episodes rather than daily ([소설넷](https://ssn.so/series/204265/); [fmkorea](https://www.fmkorea.com/6305969912); [Ruliweb](https://bbs.ruliweb.com/community/board/300143/read/73142988); [r/noveltranslations comment](https://reddit.sentinel-team.org/posts/1t8cr38/snapshots/2026-05-11T13%3A52%3A29.00144Z)). The English-reading community (r/noveltranslations) describes it as "a Korean murim novel set in a xianxia world" and echoes the internal-monologue and over-explanation complaints; English reviews on NovelUpdates range from "top tier" to "increasingly frustrating and depressing" with a Mary-Sue-by-time-skip complaint ([NovelUpdates comments](https://www.novelupdates.com/series/a-regressors-tale-of-cultivation/comment-page-3/)).

**Lessons for the engine.**
1. Make regression a *cost*, not a cheat; the reader's sympathy comes from what each loop erases.
2. Loop resets are a known weakness: persist at least one relationship or object across loops so bonds can accumulate (the engine's Foreknowledge Ledger should mark "carry-over" items).
3. Plant series-level clues as apparent *weaknesses* (odd pacing choices, unexplained details) that the finale recontextualizes; log them so they are weaknesses on purpose.
4. Control emotional excess with Maass's "pull back when it hurts" and Palahniuk's thought-verb ban; RTOC's strongest critique is exactly the inner-mode overuse the Section 1 linter targets.
5. Scale escalation must be stepwise and shown; time skips of 10–20 years per sentence are accepted by this readership when the *result* of the skip is dramatized.
6. Keep comic relief *inside* the main line in measured doses rather than quarantined in side stories, or the tone split becomes a complaint.

---

## 6. Revision workflow

### 6.1 Professional editing passes

| Pass | Scope | Questions | Engine implementation |
|---|---|---|---|
| **Developmental** | Structure, arcs, pacing, POV choice, promise/payoff | Does every chapter contain Coyne's five commandments? Does each arc hit its seven points? Is every opened mystery in the ledger with a filled answer? Do value shifts alternate? | Outline-level judge; runs *before* drafting and again after a full arc draft |
| **Line** | Sentence-level voice, rhythm, word choice, subtext | Does each paragraph have a psychic-distance level and does it move smoothly? Are thought verbs unpacked? Is there one crowded passage and one leap? Does the POV idiolect hold? Cut 8–12% | Per-chapter rewrite pass with a *subtractive* mandate (cut, don't reword) |
| **Copy** | Grammar, continuity, names, realm terminology, timeline math | Are names, ranks, ages, dates consistent with the series bible and Foreknowledge Ledger? | Deterministic checks plus a small model for continuity |

Sources: developmental edits precede and often force rewrites; line editing is subjective style work; copy editing is rules-based consistency ([Victoria Mixon](https://victoriamixon.com/editing-terminology/); [Jericho Writers](https://jerichowriters.com/line-editing/); [Bernoff](https://bernoff.com/blog/how-a-developmental-edit-differs-from-a-copy-edit-or-line-edit-and-why-that-matters)). Run them in sequence; polishing before structure is wasted work.

### 6.2 The reference-author panel as a review rubric

The idea: instead of asking a judge model "is this good?", ask it to simulate specific named sensibilities, each with a narrow, checkable brief. The panel is a set of *lenses*, not impersonations; the judge cites the author's documented rule and applies it.

| Panelist | Lens | Checkable question | Source rule |
|---|---|---|---|
| **Le Guin** | Sound, rhythm, leaping | Read aloud: where does the rhythm go flat? Which transition could be a leap? Which passage deserves crowding? | *Steering the Craft* |
| **Palahniuk** | Thought verbs, thesis openers | List every thought verb and paragraph-opening thesis; propose the concrete unpacking | "Thought Verbs" |
| **Hemingway** | Omission | What does the chapter say that the ledger shows the reader could infer? Cut it. | Iceberg theory |
| **Gardner** | Psychic distance | Tag each paragraph 1–5; flag jumps > 2 | *Art of Fiction* |
| **Swain / Butcher** | Scene integrity | Name the POV, goal, conflict, setback; classify the outcome; is the sequel's emotion→reason→anticipation→choice in order? | *Techniques*; LiveJournal |
| **Coyne** | Five commandments, value shift | Identify inciting incident, turning point, crisis (name both options), climax, resolution; which value shifted and which way? | Story Grid |
| **Sanderson** | Promise/progress/payoff; magic laws | Which promise did this chapter progress? Did any power resolve a conflict the reader could not have anticipated? | Lecture #2; Laws of Magic |
| **Christie** | Fair play | Is each clue a true fact? Is the misdirection a wrong inference, not a false fact? Was the clue followed by a louder beat? Is the hidden hand already on stage? | Hope & Hope; Knox; Van Dine |
| **Wolfe** | Fair unreliability | Does the narrator state anything false that is never exposed? Are omissions flagged in the ledger? | Evenson/Reactor |
| **Pratchett** (comic lens) | Undercutting | Is there a tense beat that wants a human, deflating detail? Is the joke *inside* character, not a narrator wink? | Genre practice [heuristic] |
| **Saunders** | Escalation, causality | Does this unit entertain *and* advance? What caused what? Where did you hoard? | *Swim in a Pond* |
| **Maass** | Emotional mode | Which mode is each beat in? Is inner mode using the first, obvious feeling? | *Emotional Craft* |
| **King** | Puff | Cut 10%. List adverbs. | *On Writing* |
| **Korean reader (사이다/고구마)** | Serial rhythm | Where is the goguma debt and when is it repaid? Does the chapter end on a pull? | Platform norms |

Each panelist returns: **verdict (pass/revise)**, **top three concrete edits with quotes**, **one thing to keep**. Disagreement between panelists is surfaced, not averaged; a human (or the orchestrator) picks the ruling lens per chapter type (reveal chapters weight Christie/Wolfe; training chapters weight Butcher/Sanderson; rest chapters weight Le Guin/Pratchett).

### 6.3 What LLM-as-judge research says

- **LitBench** (Fein et al., EACL 2026): 2,480 debiased human-labeled story-pair comparisons from Reddit plus 43,827 training pairs. Best zero-shot judge (Claude 3.7 Sonnet) agreed with humans 73%; trained Bradley-Terry and generative reward models reached 78%. Off-the-shelf judges are unreliable enough that a tuned reward model is worth training ([arXiv 2507.00769](https://arxiv.org/abs/2507.00769)).
- **Pron vs Prompt** (Marco et al., EMNLP 2024): novelist Patricio Pron vs GPT-4, 30 titles each, stories written for own and opponent's titles, 5,400 expert assessments against a Boden-inspired creativity rubric; conclusion: "LLMs are still far from challenging a top human creative writer," and GPT-4 wrote more creatively from Pron's titles than its own, i.e., the *prompt's specificity* lifted output ([arXiv 2407.01119](https://arxiv.org/abs/2407.01119)).
- **A Confederacy of Models** (Gómez-Rodríguez & Williams, EMNLP Findings 2023): an out-of-distribution task (Ignatius J. Reilly vs a pterodactyl) with a 10-criterion, 100-point rubric adapted from university creative-writing courses: criteria 1–5 general (readability/fluency, coherence, originality/creativity, humor, style/voice), 6–10 task-specific (epic genre, single combat, character fidelity ×2, dark-humor tone). Top commercial models matched or slightly beat the human writers on most dimensions; humans led on creativity; humor split the models ([arXiv 2310.08433](https://arxiv.org/pdf/2310.08433)).
- **EQ-Bench Creative Writing v3**: rubric scoring in isolation plus pairwise Glicko-2 Elo; the pairwise judge compares on nine criteria: character authenticity and insight; originality; writing quality; coherence (plot, character choices, metaphor); instruction following; world and atmosphere; avoidance of clichés; avoidance of flowery/showy vocabulary; avoidance of excessive metaphor/poetic overload. Judge must pick a winner per criterion with a +…+++++ margin. Anti-bias: truncate to 4,000 characters (length), judge both orderings (position), a "GPT-slop" score (share of words matching phrases over-represented in LLM stories), a vocab-complexity slider (3+ syllable share). Admitted unmitigated biases: judge self-preference, positivity bias, stylistic preference, slop bias ([EQ-Bench about](https://eqbench.com/about.html); [repo](https://github.com/EQ-bench/creative-writing-bench)). An independent vendor reports EQ-Bench agreement with expert writers as low as 43% in some categories ([Surge AI](https://surgehq.ai/blog/hemingway-bench-ai-writing-leaderboard)).
- **Homogenization metrics** (Jain et al.): for creative tasks, measure diversity on narrative features (plot, setting, genre), not only lexical ([arXiv 2509.21267](https://arxiv.org/abs/2509.21267)).

### 6.4 Usable scoring dimensions for the engine's judge

Derived from the above; each 1–5, scored pairwise where possible (A vs B both orders), with a per-criterion forced winner.

**Prose (line level)**
1. Specificity and concreteness (Confederacy "style"; Saunders)
2. Voice distinctiveness per POV (EQ-Bench "character authenticity")
3. Rhythm variance and deliberate imperfection (Economist/burstiness, as a *qualitative* judgment, not a CV score)
4. Absence of slop vocabulary and negative parallelism (EQ "avoidance of clichés"; Section 1.2 list)
5. Absence of poetic overload / flowery diction (EQ)
6. Subtext in dialogue (frictionless-dialogue tell)
7. Psychic-distance control (Gardner)

**Scene (chapter level)**
8. Five commandments present and value shifted (Coyne)
9. Scene outcome is not clean "Yes" (Butcher)
10. One turn, placed late; chapter ends on consequence (Section 3.3)
11. Progress signpost on a series promise (Sanderson)
12. Emotional mode chosen deliberately; not first-obvious feeling (Maass)
13. Escalation vs. previous chapter (Saunders)

**Mystery (arc level)**
14. Fair play: every clue a true fact shown to the reader (Knox/Van Dine/Christie)
15. Camouflage quality: a reader simulation cannot confidently solve from one plant (Section 4.3)
16. Ledger integrity: no open mystery without a filled `actually_true`; no payoff without a recorded plant
17. Foreknowledge accounting: at least one spent and one invalidated per arc

**Serial (reader level)**
18. Goguma/sida rhythm: debt built and repaid on schedule
19. Antagonist dignity: wins at least one exchange; not humiliated on introduction
20. Narrative diversity across the last N chapters: distinct openings, endings, conflict shapes (Jain et al.)

**Judge hygiene (from LitBench/EQ-Bench):** anonymize candidates; judge both orders; truncate to equal length or score per-1,000 words; forbid the judge from rewarding length; forbid draws; require quoted evidence for every deduction; prefer a small trained reward model over a zero-shot judge for pairwise prose preference once ~1,000 in-house labelled pairs exist; keep the rubric judge and the pairwise judge separate because rubric scores saturate (EQ-Bench's reason for Elo).

---

## Sources

**AI prose tells and homogenization**
- Wikipedia, "Signs of AI writing" (WP:AITELLS): https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- Kobak et al., "Delving into ChatGPT usage in academic writing through excess vocabulary": https://arxiv.org/html/2406.07016v2
- The Walrus, "Readers Think They Can Spot AI Writing. They're Wrong" (summarizing the Economist study): https://thewalrus.ca/readers-think-they-can-spot-ai-writing-theyre-wrong/
- BizNews syndication of the Economist study: https://biznews.com/tech/spot-ai-written-text
- "The Shrinking Landscape of Linguistic Diversity in the Age of LLMs": https://arxiv.org/abs/2502.11266
- Jain et al., "Task-Dependent Evaluation of LLM Output Homogenization": https://arxiv.org/abs/2509.21267
- "Magic, Madness, Heaven, Sin: LLM Output Diversity": https://arxiv.org/pdf/2604.01504
- Burstiness operationalization: https://arxiv.org/pdf/2507.10475 ; critique: https://neurips.cc/virtual/2026/164820 ; vendor measurement: https://opace.agency/tools/ai/content-verification-integrity/research/ai-writing-myths-measured/
- Fix Your Fiction AI-detector tells: https://fixyourfiction.com/tools/ai-detector.html
- Lemmy thread on AI writing warning signs: https://lemmy.4d2.org/post/987990
- Decrypt, "5 biggest tells": https://decrypt.co/348923/5-biggest-tells-something-written-ai
- Riedman Report, "10 easy tells": https://riedmanreport.substack.com/p/how-to-spot-ai-writing-with-10-easy

**Craft authors**
- Palahniuk, "Nuts and Bolts: Thought Verbs": https://litreactor.com/essays/chuck-palahniuk/nuts-and-bolts-%E2%80%9Cthought%E2%80%9D-verbs/
- Hemingway, Iceberg theory (Wikipedia): https://en.wikipedia.org/wiki/Iceberg_theory
- Gardner, psychic distance (UNR): https://www.unr.edu/writing-speaking-center/student-resources/writing-speaking-resources/psychic-distance-in-creative-writing ; Emma Darwin: https://emmadarwin.substack.com/p/psychic-distance-what-it-is-and-how
- Swain MRU (Writers in the Storm): https://writersinthestormblog.com/2022/06/create-compelling-scenes-with-the-mru/
- Jim Butcher LiveJournal: index https://jimbutcher.livejournal.com/ ; Scenes https://jimbutcher.livejournal.com/2647.html ; Sequels https://jimbutcher.livejournal.com/2880.html ; Story Climax https://jimbutcher.livejournal.com/3447.html ; Putting It All Together https://jimbutcher.livejournal.com/4053.html ; Great Swampy Middle https://jimbutcher.livejournal.com/1865.html
- Le Guin, *Steering the Craft*: https://radacts.substack.com/p/crowding-and-leaping ; https://thearchetypist.substack.com/p/art-and-craft-steering-the-craft ; https://thebleedingtypewriter.substack.com/p/steering-the-craft-chapter-1-exercises
- Maass, inner/outer/other mode (Jane Friedman): https://janefriedman.com/produce-emotional-response
- Saunders, *A Swim in a Pond in the Rain*: https://afasterno.substack.com/p/writing-lessons-from-the-russians ; https://spectrumculture.com/2021/04/11/a-swim-in-a-pond-in-the-rain-by-george-saunders-review/
- Cron, *Wired for Story* (Shortform): https://www.shortform.com/blog/wired-for-story-by-lisa-cron/
- McKee, the gap (Emily Short): https://emshort.blog/2019/02/05/story-robert-mckee/ ; antagonism: https://graham-edwards.com/2015/09/16/what-is-story/
- King, *On Writing* excerpts: https://signalvnoise.com/posts/322-excerpts-from-stephen-kings-on-writing ; https://www.peterclines.com/?p=593
- Prose, *Reading Like a Writer*: https://en.wikipedia.org/wiki/Reading_Like_a_Writer
- Free indirect discourse: https://litcharts.com/lit/emma/literary-devices/style ; https://writers.com/?p=21657
- Sanderson, Laws of Magic: https://www.brandonsanderson.com/blogs/blog/guide-to-sandersons-laws-of-magic-lecture-notes ; https://coppermind.net/wiki/Sanderson%27s_Laws_of_Magic
- Wendig, terribleminds: https://terribleminds.com/ramble/chucks-books/250-things-about-writing

**Structure**
- Story Grid, Five Commandments revisited: https://storygrid.com/5-commandments-storytelling-revisited/
- Writing Excuses 7.41, Seven-Point Structure: https://writingexcuses.com/writing-excuses-7-41-seven-point-story-structure/
- Writing Excuses 10.29, try/fail cycles: https://writingexcuses.com/writing-excuses-10-29-why-should-my-characters-fail-spectacularly/
- Sanderson, 2025 Guide to Plot, Lecture 2 (Promise/Progress/Payoff): https://www.brandonsanderson.com/blogs/blog/brandon-sandersons-2025-guide-to-plot-lecture-2
- Save the Cat beats (Reedsy): https://reedsy.com/blog/guide/story-structure/save-the-cat-beat-sheet/
- Vogler, *The Writer's Journey* (Wikipedia): https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_for_Writers
- Harmon Story Circle (StudioBinder): https://studiobinder.com/blog/dan-harmon-story-circle
- Kishōtenketsu: https://en.wikipedia.org/wiki/Kish%C5%8Dtenketsu ; https://mythicscribes.com/?p=6914
- Freytag: https://writers.com/freytags-pyramid

**Mystery**
- Knox's Decalogue: https://thrillingdetective.com/2019/01/10/father-knoxs-decalogue-the-ten-rules-of-golden-age-detective-fiction/
- Van Dine's Twenty Rules: https://www.staff.u-szeged.hu/~gnovak/vandine.htm
- CrimeReads, "A Magician's Contract": https://crimereads.com/a-magicians-contract-between-reader-and-writer-rules-for-delivering-a-whodunit/
- Hope & Hope, *Agatha Christie: Plots, Clues and Misdirections* (review): https://crossexaminingcrime.com/2024/01/06/agatha-christie-plots-clues-and-misdirections-thirty-three-ways-the-queen-of-crime-deceives-us-2023-by-sally-and-tony-hope/
- Open University on Christie and the rules: https://www.open.edu/openlearn/history-the-arts/agatha-christie-and-the-golden-age-detective-fiction/content-section-5.1
- LitCharts, *Murder on the Orient Express*: https://www.litcharts.com/lit/murder-on-the-orient-express/themes/deception-and-genre-expectations
- Rowling clue analyses: https://www.harrypotter.com/features/clues-jkr-gave-us-about-the-harry-potter-books-heroes-villains-and-hogwarts ; https://www.businessinsider.nl/harry-potter-books-details-foreshadowing-2017-11/ ; https://www.editorialdepartment.com/chekovs-gun-more-lessons-from-the-harry-potter-series
- Chekhov's gun: https://www.writingclasses.com/toolbox/ask-writer/whats-this-business-about-chekhovs-gun ; https://en.wikipedia.com/wiki/Chekhov_gun
- Evenson on Wolfe's Severian (Reactor): https://reactormag.com/what-makes-an-unreliable-narrator-severians-voice-in-gene-wolfes-the-book-of-the-new-sun/ ; Goodreads thread: https://www.goodreads.com/topic/show/2030522-when-does-severian-lie-and-why
- FMA / Steins;Gate foreshadowing: https://fictionhorizon.com/smartest-foreshadowing-seeds-in-season-1-of-an-anime/ ; GDC 2023 talk: https://media.gdcvault.com/gdc2023/GNR/RunyonConnor_DigiPenInstituteofTechnology_GNR2023.pdf
- Abrams, "The mystery box" (TED): https://www.ted.com/talks/j_j_abrams_mystery_box ; critique: https://www.slaphappylarry.com/?p=57600

**Web novel craft and regression genre**
- Wikipedia, Web novels in South Korea: https://en.wikipedia.org/wiki/Web_novels_in_South_Korea
- JoongAng Daily, short addictive web novels: https://www.koreajoongangdaily.com/korea/short-addictive-web-novels-hook-more-readers-anyone-can-write-them-and-biggest-hits-have-become-dramas-musicals/10152441
- JoongAng Daily, time-loop fascination: https://www.koreajoongangdaily.com/opinion/koreas-fascination-with-time-loop-dramas-reflects-deeper-societal-malaise/12437577
- youngju.dev, web novel grammar: https://www.youngju.dev/transcribe/storytelling/web-novel-grammar.en
- Korean study on early catharsis in return/reincarnation web novels: https://www.accesson.kr/daejung/assets/pdf/57632/journal-31-3-145.pdf
- Royal Road length norms: https://colony.litopia.com/threads/royal-road-experiment-the-stats.15642/latest ; https://ericadrayton.substack.com/p/word-count-in-serial-fiction
- Qidian: https://en.wikipedia.org/wiki/Qidian ; chapter-length anecdotes: https://chinese-forums.com/forums/topic/61901-guide-to-reading-chinese-fiction-from-absolute-beginner-to-beyond-hsk-6/page/3
- Wuxiaworld xianxia genre guide: https://www.wuxiaworld.com/page/introduction-to-chinese-webnovel-genres-xianxia?full=1
- Face-slapping critiques: https://www.wuxiaworld.com/novel/supreme-sword-exalt ; https://fujoshichronicles.bearblog.dev/transmigrating-into-the-heartthrobs-cannon-fodder-childhood-friend-review/ ; Language Log: https://languagelog.ldc.upenn.edu/nll/?p=54258
- r/ProgressionFantasy on butterfly effect in returner stories: https://reddit.birdcat.cafe/r/ProgressionFantasy/duplicates/1k7ln3g
- *Lord of the Mysteries* (Wikipedia): https://en.wikipedia.org/wiki/Lord_of_the_Mysteries
- *Omniscient Reader's Viewpoint* (Wikipedia): https://en.wikipedia.org/wiki/Omniscient_Reader%27s_Viewpoint ; Critics at Large essay: https://www.criticsatlarge.ca/2025/08/reductio-ad-absurdumomniscient-reader.html
- *Reverend Insanity* (Wikipedia): https://en.wikipedia.org/wiki/Reverend_Insanity ; The Motte review thread: https://www.themotte.org/post/2195/pokmon-for-unrepentant-sociopaths-a-review

**A Regressor's Tale of Cultivation (회귀수선전)**
- 소설넷 series page and reviews: https://ssn.so/series/204265/
- FMKorea review "내게 회귀는 살인이다": https://www.fmkorea.com/6305969912
- Ruliweb spoiler review (completion at 809 episodes): https://bbs.ruliweb.com/community/board/300143/read/73142988
- pgr21 completion thread (blocked by bot protection; cited via search summary): https://ppt21.com/freedom/104356
- namu.wiki entry (403 on fetch; cited via search summary): https://namu.wiki/w/%ED%9A%8C%EA%B7%80%EC%88%98%EC%84%A0%EC%A0%84(%E5%9B%9E%E6%AD%B8%E4%BF%AE%E4%BB%99%E5%82%B3)
- Realm glossary: https://jab-guyver.co.kr/7592
- MyAnimeList (webtoon; reviews by novel readers): https://myanimelist.net/manga/183650/A_Regressors_Tale_of_Cultivation
- NovelUpdates comments: https://www.novelupdates.com/series/a-regressors-tale-of-cultivation/comment-page-3/
- Webnovel listing (unofficial translation): https://m.webnovel.com/book/30120306108140505
- r/noveltranslations weekly thread snapshot: https://reddit.sentinel-team.org/posts/1t8cr38/snapshots/2026-05-11T13%3A52%3A29.00144Z
- Webtoon Guide review: https://www.webtoonguide.com/en/board/totalreview/25023

**Revision and LLM-as-judge**
- Editing passes: https://victoriamixon.com/editing-terminology/ ; https://jerichowriters.com/line-editing/ ; https://bernoff.com/blog/how-a-developmental-edit-differs-from-a-copy-edit-or-line-edit-and-why-that-matters
- LitBench: https://arxiv.org/abs/2507.00769
- Pron vs Prompt: https://arxiv.org/abs/2407.01119
- A Confederacy of Models: https://arxiv.org/pdf/2310.08433
- EQ-Bench Creative Writing: https://eqbench.com/about.html ; https://github.com/EQ-bench/creative-writing-bench ; longform: https://eqbench.com/creative_writing_longform.html
- Surge AI critique of EQ-Bench agreement: https://surgehq.ai/blog/hemingway-bench-ai-writing-leaderboard
