# BAPPER — SITE BRIEF

**Written 2026-08-31 · Site strategist deliverable · Inputs: 6 agency teardowns (NoGood, WebFX, Thrive, Directive, Single Grain, Slalom), `ops/UNIT_ECONOMICS.md`, `encyclopedia/00_INDEX.md`**

Domain: bapperstudio.com (pending — see Open Questions). Brand lines already settled: **"Ads that hit."** · **"You pay when it works."** · **"Nothing untried."**

---

## 1. Positioning statement

### The statement

> **Bapper is a one-person, AI-native studio. The front door is a bet: we build your business a finished ad before you pay anything. Behind the door are two rooms — Growth (ads, SEO, web, AEO) and AI Systems (agents, integrations, copilots, automation) — and they are the same machine. The pipeline that manufactures the ads IS the AI-systems practice. At big agencies, AI is a bullet point on a services page. Here it's the factory, and you can watch it run.**

Shorter, for meta descriptions and bios:

> An AI-native studio with one operator and one machine. Ads that hit — you pay when it works — plus the AI systems that make them possible, built for your business too.

### Solving the honest-split problem head-on

Every teardown target that claims growth AND deep AI does AI as a thin add-on (Directive literally files AEO/GEO/LLM as sub-bullets under Content Marketing; WebFX brands AI as "powered by IBM Watson" — someone else's engine). Bapper claims both credibly by making three moves, and the site must make all three visible:

1. **The machinery story (the spine, not a feature).** The spec ads are not made "with AI tools" — they are manufactured by a named, showable pipeline (see §3.6): master-ad generation, the re-skin batcher that personalizes 100 ads for ~$0, the generation log that tracks every roll's keep-rate, the kill-rule playbook. That factory is simultaneously the *proof* of the AI Systems pillar. The site's job is to keep saying one sentence in different ways: **"The ads are the demo."** A prospect who wants an agent or a copilot doesn't have to trust a case study — they can look at the ad that landed in their inbox and know the machinery is real, because it just processed *them*.

2. **Productized packages, not fake departments.** A solo operator claiming a full-service menu reads as lying (Thrive's 40-item taxonomy works only because 160 people stand behind it). Bapper never presents a menu; it presents a small number of fixed-shape engagements with floors: the free spec ad → run-it retainer on the Growth side; audit → pilot build → run on the AI Systems side. Everything nests under two pillars, max. Breadth is expressed as *depth of one system*, not width of a list.

3. **No enterprise cosplay — solo is the pitch, stated plainly.** No "we," no squads, no team page, no awards row, no logo wall, no offices. The counter-positioning writes itself against every teardown target: one senior builder, zero account-manager layer, the person who answers your email is the person who builds the thing, response inside 24 hours. Single Grain's "impact without increasing headcount" testimonial shows SMBs *want* this; Bapper just says it in first person.

**The one-outcome frame (WebFX steal, Bapper version):** every service on the site is subordinated to one sentence — *work that pays for itself before you're asked to pay for it*. Ads: free until they hit. SEO/AEO: measured in citations and tracked revenue, not reports. AI systems: scoped so the pilot proves value before the retainer. "You pay when it works" is not the ad offer's fine print; it's the studio's operating principle, and the site should apply it visibly to both pillars.

**Enemy framing (Directive steal):** the enemy is not "traditional agencies" generically — it's the *pay-before-anything-works* model and the *AI-as-a-bullet-point* model. Both get named in copy (see §3.2 and §3.7).

---

## 2. Sitemap (minimal-viable)

Research verdict from the teardowns: a solo studio needs FEW pages that look top-tier, not many that look thin. Seven templates total, five in the nav.

| URL | Page | Nav? | Purpose |
|---|---|---|---|
| `/` | Home | logo | The whole argument in ~9 sections (§3). Carries 80% of the persuasion. |
| `/growth` | Pillar: Growth | yes | Ads · SEO · AEO · Web, nested as one system (§4A) |
| `/ai-systems` | Pillar: AI Systems | yes | Outcome-organized builds: agents, copilots, integrations, RAG, automation (§4B) |
| `/work` | Work | yes | Flat grid of spec ads + shipped systems, service-tagged. No carousel — with few proof points a carousel hides them (anti-NoGood). |
| `/free-ad` | The Offer | yes, as button | Conversion page: how the free spec ad works, what "works" means, FAQ, form. Doubles as the contact page — no separate `/contact`. |
| `/about` | Founder | yes | The founder note expanded: who builds this, what he runs daily, why solo is the feature. |
| `/for/{prospect}` | Personalized outreach page | no (noindex) | One per cold prospect, generated from the same CSV as the re-skin batcher (§below). |
| `404` | — | — | On-brand one-liner + free-ad CTA. |

**Deliberately absent at launch:** blog (add `/answers` later as an AEO-dogfooding play — question-titled pages with FAQ schema, once there's bandwidth), pricing page (floor pricing appears as one line on `/free-ad` instead — see Open Q2), careers, verticals/industries axis, city pages, client login.

### The `/for/{prospect}` system

The site personalization works exactly like the ad personalization: **a master template with prospect-specific text layers.** Same CSV that drives the re-skin batcher (name, claim, phone, city, vertical) renders both the mp4 and the page. Cute, true, and worth saying to prospects who ask how it was so cheap to make them something custom.

Page contents (short — one screen and a half):
1. `We made this for {Business Name}.` — the spec ad embedded, playable immediately, no gate.
2. The claim line under it: `Built around what you already tell customers: "{claim from their site/GBP}".`
3. Three bullets: why this pattern for their vertical (from `04_AD_PATTERN_LIBRARY`), the test plan (their ~$30–50/day, their ad account, the kill rules we'd apply), and what happens if it hits (retainer) / doesn't (they keep the ad, we part friends).
4. Single CTA: `Run it. You pay when it works.` → books a call or replies by email. `[CALENDAR LINK]` `[EMAIL]`
5. Footer line: `This page was generated by the same machine that made your ad. That machine is also for hire → /ai-systems`

Rules: `noindex,nofollow`, no prospect data beyond what's public on their own site/GBP, pages expire or 410 after 90 days.

---

## 3. Homepage blueprint (section by section, with draft copy)

Edited and fast — 9 sections, not Thrive's 14. Every scroll depth has exactly one job.

### 3.1 Hero

**Layout:** full-viewport, statement typography (metric-forward, NoGood register), the settled brand lines doing the work. Dual CTA (Directive steal): one free-value wedge button, one machinery/proof link. Optional: a muted autoplaying strip of 3–4 spec-ad clips as the background texture — the work is the wallpaper.

**Hero Option A — wedge-led (RECOMMENDED default):**

> # Ads that hit.
> ## You pay when it works.
> We build your business a finished video ad — free — before you've paid a dollar or sat through a single call. Run it on your budget, in your ad account. If it hits, we talk retainer. If it doesn't, keep the ad.
>
> **[ Get my free ad ]**  [ See the machine → ]

**Hero Option B — brand-broadened (if the full-studio story should lead):**

> # Work that hits.
> ## You pay when it works.
> One builder. One machine. The ads, the search rankings, the AI answers, the automations — all built by the same pipeline, all priced the same way: prove it first.
>
> **[ Get my free ad ]**  [ What the machine builds → ]

**Hero Option C — shift-frame (Single Grain steal: buyer behavior changed → your setup is stale):**

> # Your customers ask ChatGPT now.
> ## Your last agency doesn't know that yet.
> Bapper is an AI-native studio run by one person who builds AI systems every day — and proves it before you pay. Ads that hit. Brands that get cited. Systems that ship.
>
> **[ Get my free ad ]**  [ How it works → ]

**Hero Option D — machinery-led:**

> # One builder. One machine. Nothing untried.
> ## Every service on this site has already been run on our own work — the ads that hit, the pages that get cited, the agents that ship. You pay when it works.
>
> **[ Get my free ad ]**  [ See the machine → ]

**Tagline system (recommendation):** keep **"Ads that hit."** as the wedge/Growth line — it is the sharpest asset the brand has and the cold email leads with it. Adopt **"Work that hits."** as the umbrella sibling for the masthead/footer/OG tags. Per-pillar children: Growth = *"Ads that hit."* · AI Systems = *"Systems that ship."* Universal risk-reversal: *"You pay when it works."* Craft/dogfooding line: *"Nothing untried."* (meaning: we never sell a thing we haven't already run on ourselves — this becomes the §3.6 section header). Do NOT retire the ads line in favor of the umbrella; the homepage hero should stay Option A until the AI Systems pillar has its own inbound.

### 3.2 Anti-positioning line (NoGood steal — one line that tells the wrong buyer to leave)

Directly under the hero, small type, no section chrome:

> If you want a discovery call, a 40-page deck, and an invoice before anything exists — there are agencies for that. We're not one. Here, the work shows up first.

### 3.3 The Offer block ("How the free ad works")

Risk reversal as a first-class structural element (Thrive steal), concrete-deliverable CTA language throughout (WebFX steal — never "proposal," never "audit"; the artifact is *a finished ad*).

**Three steps, one row each:**

> **1 — We build it. Free.**
> A finished 15–30 second ad for your business. Your name, your offer, your phone number, your city. You didn't ask for it? Even better — it's already done.
>
> **2 — You run it. Your budget, your ad account.**
> $30–50 a day for a week is enough to know. We hand you the kill rules we use ourselves: if clicks cost over ~$2.30 or fewer than 1.5% of viewers click, kill it. Most ads fail. That's why ours are free until they don't.
>
> **3 — It hits? Now we talk.**
> A monthly engagement: more concepts, more cuts, landing pages, search, AI answers — the whole machine pointed at your business. It doesn't hit? Keep the ad. No invoice, no hard feelings.

> **[ Get my free ad ]** — reply time inside 24 hours, from the person who builds it. *(Single Grain's response-time micro-guarantee, free for a solo founder to honor.)*

Note for build: the kill-rule numbers are quoted as operator knowledge (per UNIT_ECONOMICS — "sounding like an operator," not a bill we pay). The exact contractual meaning of "when it works" needs Jason's answer (Open Q1) before this section's fine print is final.

### 3.4 Work (the spec portfolio IS the proof)

**Proof strategy for a company with zero case studies:** every teardown target leans on logo walls, retention percentages, award rows, headcounts — all unavailable and all falsifiable at n=1. Bapper's proof stack, in order:

1. **The spec portfolio.** Flat grid (no carousel), 9:16 video cards, autoplay muted on hover. Each card service-tagged (Slalom steal): `SPEC AD · HVAC`, `AEO`, `AI SYSTEM`. Titles in first-person outcome grammar from day one (NoGood steal), so the format doesn't change when real client results arrive: today *"We built [Vertical] a 24-second offer-first ad for $0.40 of compute"* — later *"We took [Client] to a 2.1% CTR in week one."*
2. **Machine stats, un-rounded (WebFX steal: $10,085,355,239 reads truer than $10B+).** Pulled from `genlog.py`, however small: `[N] generations logged · [N] keepers · $[X.XX] per finished second · [N] spec ads shipped`. Exactness is the credibility; never round up, never pad.
3. **Number-in-headline formatting reserved** (Directive steal) for the first real result: *"How [Client] turned a free ad into [X] booked jobs."* The grid is built so that card slots in with zero redesign.

Section closer: `Every card on this page was made by the machine below. → Nothing untried`

### 3.5 Two pillars — one system, two surfaces (Single Grain frame)

Not a services menu. Two named rows, each with 3–4 one-line `We [verb] [specific outcome]` items (NoGood grammar), each linking to its pillar page.

> ## Growth — *Ads that hit.*
> Getting found, clicked, and called.
> - **Paid-social ads** — we build spec ads free and iterate the winners on retainer.
> - **SEO** — we rank you for the searches that end in a phone call.
> - **AEO** — we get your business cited when customers ask ChatGPT, Perplexity, or Gemini who to hire.
> - **Web** — we build pages that load fast and convert the click the ad paid for.
> [ The Growth pillar → /growth ]

> ## AI Systems — *Systems that ship.*
> The machinery we use daily, built for your business.
> - **Agents & automation** — we automate the workflow that eats your week.
> - **Internal copilots & RAG** — we give your team an assistant that actually knows your documents.
> - **Integrations** — we connect the tools you already pay for so data stops being retyped.
> [ The AI Systems pillar → /ai-systems ]

### 3.6 The Machine ("Nothing untried.")

The named-machinery move (Single Grain's "Single Brain" / WebFX's RevenueCloudFX — but ours is real and showable). **Working name: the Bapper Engine** (alternates: the Rig, Bapworks — flag for Jason but don't burn an open question on it; Engine is the safe default).

> ## Nothing untried.
> Every service on this site is something we already run on our own work — daily, logged, measured.
>
> - **The ad factory.** One master ad per industry, then a text-layer press that personalizes it per business in minutes for pennies. It's why the ad in your inbox was free.
> - **The generation log.** Every AI video roll we make is logged — model, prompt, seed, keep or kill. We know our hit rates because we count them. Most shops guess.
> - **The kill rules.** CPC and CTR thresholds decide an ad's fate in days, not months. We'd rather kill our own work fast than bill you slowly.
> - **The answer tracker.** We monitor what ChatGPT, Perplexity, and Gemini say when asked about our clients — because that's where your next customer is asking. `[LIVE ONCE AEO TRACKING EXISTS — placeholder stat until then]`
>
> This machinery is the AI Systems practice. When you hire Bapper to build an agent or a pipeline, you're hiring the person who built this one — not a partnerships page.

Visual: 1–2 real screenshots (genlog output, the re-skin batcher run, a beat-sheet) the way WebFX shows dashboard shots. Real terminal/tooling screenshots read *more* credible than polished product UI here.

### 3.7 The contrast block (the honest-split argument, said out loud)

Directive's competitive tell, weaponized; Single Grain's blunt two-sentence rhythm.

> ## At big agencies, AI is a bullet point.
> It sits on the services page between "content marketing" and "email," run by whoever finished the webinar. Here it's the factory. The ads are made by it. The site you're reading was assembled by it. And it's for hire.
> **We don't advise on AI. We run on it.**

Optional compact comparison strip (WebFX table, cut to three columns × four rows): **Bapper / typical agency / DIY** — rows: *who does the work* (the founder / a junior you never meet / you, at midnight), *when you pay* (when it works / before kickoff / with your weekends), *AI depth* (the factory / a bullet point / a ChatGPT tab), *response time* (24h from the builder / account-manager relay / —). Keep it playful, one screen, no sales-slide energy.

### 3.8 Founder note (Single Grain steal — the founder IS the product)

Personal voice, photo `[FOUNDER PHOTO — pending Open Q3]`, signed.

> ## One person builds all of this. On purpose.
> I'm Jason `[SURNAME? — Open Q3]`. I build AI systems every day — trading research pipelines, content machines, agent fleets that run while I sleep — and Bapper is that machinery pointed at businesses like yours.
> No account managers, no handoffs, no junior team "executing." The person reading your reply is the person who built your ad, and the same one who'll build your copilot. That's not a limitation I'm hiding; it's the whole point. Small enough to answer in 24 hours. Automated enough that it doesn't matter.
> — Jason

(The "systems I run daily" list should be genericized versions of real machinery — never project codenames, never client-of-one claims. Honest, checkable shapes: "a content pipeline that ships daily," etc.)

### 3.9 FAQ + final CTA

FAQ pre-answers objections (Slalom steal) — this is also AEO bait for the site itself (FAQ schema):

- **What does the free ad actually cost me?** Nothing. Not a call, not a card. We make it before we contact you. The catch is the obvious one: if it works, we'd like to be your ad shop.
- **What does "when it works" mean?** `[Pending Open Q1 — draft: you run it on ~$30–50/day for a week in your own ad account; if it beats the kill thresholds we publish, the retainer conversation starts. You always keep the ad either way.]`
- **Who pays for the ad spend?** You do — your budget, your ad account, your data. We never touch client ad dollars. We're paid for the work, when the work works.
- **Why would an ad guy build my internal AI system?** Backwards — the AI systems came first. The ad factory is one of them. See /ai-systems.
- **Is this AI-generated? Do you disclose that?** We use AI generation where it's the right tool and follow every platform's disclosure rules (TikTok AIGC labels, Google attestation, state law). What we never do is ship something that only works because you didn't look closely.
- **What's the engagement after a hit?** Monthly, from $[FLOOR — Open Q2]. Month to month. No long-term contracts — the work re-earns the retainer or it doesn't.

Final CTA band, full-width:

> ## The next ad we build free could be yours.
> **[ Get my free ad ]** · or write to `[EMAIL]` — answered inside 24 hours by the builder, not a bot. (Ironic, we know. The bots are busy making ads.)

Footer: Bapper · *Work that hits.* · [EMAIL] · [CITY, MI?] · /growth · /ai-systems · /work · /free-ad · /about · no phone unless Jason wants one published `[PHONE?]`.

---

## 4. Pillar pages

### 4A. /growth — "Ads that hit."

1. **Hero:** `Ads that hit. Search that ranks. Answers that cite you. Pages that convert.` + `You pay when it works.` CTA: Get my free ad.
2. **The funnel frame (WebFX steal, two-pillar scale):** four services presented as four stages of one machine — *Get seen (ads) → Get found (SEO) → Get cited (AEO) → Get chosen (web)* — never as a menu.
3. **Paid-social ads** (front door, biggest block): the free-spec offer restated; what a retainer buys (new concepts monthly, hook variants, kill-rule management on the client's account, landing pages the click deserves); the pattern-library credibility line ("we build from the formats with measured hit-rates — offer-first, demo, testimonial — not whatever's trendy").
4. **SEO:** productized, local-business shaped. `We rank you for searches that end in a phone call — [CITY]-level terms, Google Business Profile, the pages that answer what buyers actually type.` One-line anti-mush: no 6-month "foundational audit" phase; work ships in week one.
5. **AEO — first-class, its own block, not a sub-bullet (the Directive tell, inverted):**
   > `When someone asks ChatGPT "who's the best [trade] in [city]" — someone gets named. We make it you.`
   What it includes: entity cleanup, citations, the question-shaped pages LLMs quote, tracked mentions across ChatGPT/Perplexity/Gemini/AI Overviews. **Proof units in AI-era metrics** (WebFX/Thrive steal): citations won, AI-source sessions, share-of-answer — `[placeholder stats until first client; use Bapper's own site tracking as the dogfood number]`.
6. **Web:** in service of the other three — fast pages, conversion-first, built and shipped in days not quarters. Includes the `/for/` page system as a visible example of "pages manufactured by the machine."
7. **Proof strip:** the Growth-tagged cards from /work.
8. **FAQ (3–4 growth-specific)** + CTA: Get my free ad.

### 4B. /ai-systems — "Systems that ship."

1. **Hero:** `The machinery that makes our ads is for hire.` Sub: `Agents, copilots, integrations, automation — built by the operator who runs his own, daily.` CTA: `Tell me what eats your week →` (form; softer than the ads wedge, still concrete).
2. **Organized by the client's problem, not the stack (Slalom steal — outcomes, never "RAG/LangChain/embeddings"):** four outcome blocks:
   - `Answer every customer email in minutes, automatically — in your voice, with your prices.`
   - `Give your team an assistant that actually knows your documents, your SOPs, your history.`
   - `Connect the tools you already pay for — quotes stop being retyped, invoices stop being late.`
   - `Automate the workflow that eats your week. You know the one.`
   (Tech honesty line underneath: "Under the hood this is agents, retrieval, and integration code. You don't have to care. It has to work.")
3. **The credibility section — "the ads are the demo":** walk the ad factory as a worked example of exactly this service: ingest (prospect data) → generation (master ad) → personalization (re-skin press) → QA (kill rules, genlog). `We didn't read about this in a webinar. You got an email from it.`
4. **Productized engagement shapes (anti-mush, anti-cosplay):**
   - **The Audit** — `[½ day? priced or free — tie to Open Q4]`: map the workflow, name the one automation worth building first, fixed quote.
   - **The Pilot** — one system, fixed scope, weeks not quarters. Priced so it proves value before anyone signs anything longer. *("You pay when it works" applied to systems: pilot acceptance criteria defined up front.)*
   - **Run & extend** — monthly: the system maintained, extended, and watched by the person who built it.
5. **Anti-positioning line:** `If you need a 40-person transformation program with a governance workstream, hire one. If you need a working thing shipped this month, that's here.` (Slalom's committee-language, rejected out loud.)
6. **FAQ (3–4):** data privacy/local-first options, what happens if the pilot fails, why solo beats a dev shop here, what it costs `[FLOOR — Open Q2]`.
7. CTA repeat.

---

## 5. What we stole from whom — and what we rejected

### Stolen (attributed)

| From | What | Where it lands |
|---|---|---|
| **NoGood** | Anti-positioning line that tells the wrong buyer to leave | §3.2, §4B.5 |
| **NoGood** | First-person outcome case titles ("We increased X by Y%"); metric-card grammar (giant numeral + one-line context); featured-few services with detail one click deeper; "We [verb] [outcome]" one-liners; AEO as first-class card | §3.4, §3.5, §4A.5 |
| **WebFX** | One-outcome frame (everything subordinated to a single metric); deliverable-CTA ("Get my free ad" ≫ "get a proposal"); un-rounded specificity; named proprietary machinery shown via screenshots; AI-era proof units (LLM visibility, AI-source traffic); floor pricing as qualifier; comparison table | §1, §3.3, §3.4, §3.6, §3.7, §3.9 |
| **Thrive** | First-person free-value CTA in nav/hero/footer; proof before pitch (strip under hero); two-tier service architecture; dedicated AEO proof section; dogfooding proof; risk reversal as a first-class structural element; delta-format stats; a named process/tool | §3 order, §3.3, §3.6, §4A.5 |
| **Directive** | Dual-CTA (relationship + free-value wedge); number-in-headline case format (reserved for result #1); enemy-metric framing (ours: pay-before-it-works, AI-as-bullet-point); few named pillars with outcome names; hyper-specific capability naming for search intent ("get cited by ChatGPT"); behavior-stats over size-stats; **naming their own tell in our copy** (AEO filed under Content Marketing) | §3.1, §3.4, §3.5, §3.7 |
| **Single Grain** | Buyer-shift hero pattern (Option C); "We don't advise on AI. We run it." bluntness; name-the-machinery with its own CTA; services as components of one system; founder note as homepage section; response-time micro-guarantee; AEO listed first | §3.1, §3.5–3.8, §4A |
| **Slalom** | Service-tag overlays on work cards; self-generated stats when you have no logos; objection-killing FAQ; AI organized by client problem/outcome rather than stack; subhead discipline (measurable in the sentence) | §3.4, §3.9, §4B.2 |

### Rejected (deliberately, most from multiple targets)

- **Headcount/scale theater** — squads, "160+ team members," "750+ specialists," "100+ strategists," multi-office footers, careers pages. Solo is the pitch; any plural is falsifiable. *(all six)*
- **Borrowed prestige** — logo walls before logos exist, Amazon/Nike-tier heroes, "powered by IBM Watson," partner-network counts. One real spec-ad with numbers beats all of it; naming someone else's AI engine reverses our story. *(NoGood, WebFX, Single Grain, Slalom)*
- **Bulk vanity proof** — awards rows, "$1B+ influenced," "1,545% ROI," retention % at n=0, survey-scale claims. Fake proof reads worse than no proof. *(WebFX, Thrive, Directive, Single Grain, Slalom)*
- **Mega-menu taxonomies** — 40-service trees, 12×9 service/industry matrices, three taxonomy axes, 10-category accordions. More nav items than employees reads as fake. Cap: one front door, two pillars. *(WebFX, Thrive, Directive, Slalom)*
- **Vague CTAs** — "Let's talk," "Explore Partnership," "Get a proposal," budget-dropdown lead forms. The wedge is a finished artifact; never dilute it back into proposal language. *(Directive, Slalom, Thrive)*
- **Abstract vibe heroes** — "AI in motion," "RELATIONSHIPS & RESULTS." With zero brand equity, a vibe headline is invisible; the offer is the headline. *(Slalom, Thrive, Directive)*
- **Conversion-machine density** — 14+ stacked sections, sticky CTAs, popups, phone in header, 25-city footer farms, 20-item FAQs. Bapper feels edited and fast. *(WebFX, Thrive)*
- **Carousels as the proof spine** — rotating containers signal scale and hide scarce proof; everything flat. *(NoGood, Slalom)*
- **AI as thin enabling layer** — "AI-powered recommendations included in all plans," AEO as a sub-bullet, "Human-Driven AI" hedges, governance-dimension framing. This is the exact pattern the brand attacks; it can never appear in our own copy. *(WebFX, Thrive, Directive, Slalom)*
- **"Affordable pricing for any size budget" hedging** — screams "we take anyone"; the floor price and the anti-positioning line do the opposite on purpose. *(Thrive)*

---

## 6. Design direction (open — logo incoming from Jason)

Visual identity stays **OPEN** until the logo lands. The system below is logo-agnostic on purpose; lock nothing that fights an unseen mark.

- **Candidate direction: tasting-canvas dark-premium.** Dark ground, generous whitespace, big statement typography, metric numerals as the visual heroes (NoGood's register, Slalom/Single Grain's calm — dense confidence without corporate cold). It fits the brand voice (short declarative lines want big type) and makes 9:16 video cards glow. Candidate, not decision.
- **Typography-led, photography-free.** No stock photos, no team shots (nobody to shoot), no illustration system to maintain. Type + numerals + real video frames + real tooling screenshots. The spec-ad thumbnails provide all the color the pages need.
- **One accent color, pulled from the logo when it arrives.** Everything else near-monochrome so the accent and the video cards carry the energy. Build the palette as swap-ready tokens.
- **Numbers as design objects:** the genlog stats, kill-rule thresholds, and per-second costs set extra-large — the un-rounded-specificity proof strategy IS the art direction.
- **Motion restraint:** hover-play on video cards, subtle count-up on stats, nothing else. No parallax, no scroll-jacking; the ads are the moving pictures.
- **The `/for/` pages inherit the exact master shell** with prospect text layers — the design system literally mirrors the master/re-skin production model, and both stay cheap for the same reason.
- **Dark/light:** if tasting-canvas dark wins, commit to dark as the single deliberate look rather than maintaining two themes at launch.
- Logo checklist on arrival: does it hold at 16px favicon · on dark ground · beside "Work that hits." in the masthead · as a watermark bug on spec-ad end cards (the ads should carry the mark — every cold email quietly ships the brand).

---

## 7. Open questions for Jason (only ones that change the build)

1. **What does "when it works" mean, contractually?** The promise is the brand — it needs one crisp definition before /free-ad and the FAQ can be finished. Draft on the table: *client runs it ≥$30/day for 7 days in their own account; CTR ≥1.5% and CPC ≤$2.30 (our published kill rules) triggers the retainer conversation; below that, they keep the ad free.* Is beating the kill rules the trigger, or is it softer ("you decide it worked")? This one sentence changes the offer block, the FAQ, and the cold-email close.
2. **Publish the floor price?** WebFX-style qualifier ("engagements from $X/mo") filters tire-kickers and fits the no-games voice — but it also anchors. Publish "~$3k/mo" (or a rounder "from $2,500/mo"), or keep pricing off-site entirely? Changes /free-ad, both pillar FAQs, and the comparison strip.
3. **How much founder identity ships?** Full name + face + signed note (recommended — the founder note is a load-bearing section, and solo-as-the-pitch is stronger with a face), or first-name-only/studio-anonymous? Changes /about, §3.8, and outreach reply-to identity.
4. **Does AI Systems take cold inbound at launch, or is it soft-gated?** Equal pillar with its own CTA and form from day one (recommended — the machinery story needs a door), or positioned as "unlocked" for Growth clients until the first pilot exists? Changes nav weight, /ai-systems CTAs, and whether the Audit is free or priced.
5. **Confirm the domain: bapperstudio.com?** The `/for/{slug}` outreach URLs get printed into cold emails and burned into ad end-cards — domain must be final before the first batch. (If a shorter alternative like bapper.studio is in play, decide now; changing later breaks every sent link.)

---

*Next steps after Jason answers: lock hero option + tagline system → wireframe home + /free-ad → build the /for/ template alongside the re-skin batcher (same CSV, one run) → ship dark-canvas v1 with placeholder accent → swap tokens when the logo lands.*
