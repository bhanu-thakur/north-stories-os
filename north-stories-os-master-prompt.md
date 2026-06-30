# Master Prompt: Build "North Stories OS"

Paste this whole document to another AI as the starting instruction. It's written so the AI can build the app in one pass and know exactly what "done" looks like for each piece.

---

## 1. What this is

Build **North Stories OS** — a personal operating system for one person (a solo hospitality videographer/photographer in Himachal Pradesh, India, building a visual studio) to learn a craft, train taste, and run the business side, all in one app. It is simultaneously:

- A **project-based curriculum** (apprenticeship through 28 real client-style engagements, not lessons/quizzes)
- A **knowledge base** ("Bibles") that is the permanent source of truth for camera, lighting, editing, business, etc. — projects update it, never duplicate it
- A **taste-training tool** (Creative Director drills, brand teardowns, a location library)
- A **lightweight business OS** (CRM, pricing/sales playbooks, SOPs, habit tracking, reviews)
- A **personal mission control** (North Star: mission/vision/values, read first by every AI-assisted "Ask" prompt)

Tone of all written content: direct, second-person, practical, India/Himachal-specific (₹ pricing, WhatsApp-first outreach, Indian mains 50Hz flicker etc.), restraint-as-premium aesthetic philosophy. No filler, no generic stock-photo advice — every piece of content should read like it was written by someone who has actually done the job.

## 2. Hard technical constraints

- **No build step, no framework, no bundler.** Vanilla HTML/CSS/JS only, runs by opening `index.html` or serving it statically. This must also work as an installable PWA (manifest + service worker).
- **File layout:**
  - `index.html` — shell: design-system CSS, SVG icon sprite, app layout markup (`#side` nav, `#view` mount point, command palette, mobile nav), then `<script>` tags loading `app.js` and every `data.*.js` file.
  - `app.js` — the ENGINE only. No content. Contains: localStorage store, router, nav renderer, command palette/search, knowledge-graph backlinks, and the generic/system views (Today, North Star, CRM, Business, Brain, Portfolio, Ask, Habits, Reviews, Research, placeholder).
  - One `data.<module>.js` file per content domain (see §5). Each file is an IIFE-free script that does `window.NS = window.NS || {};` then assigns arrays/objects onto `NS`, e.g. `NS.bibles = [...]`. Content modules attach to `window.NS` and the engine auto-discovers them — **never hardcode content inside app.js**.
  - `manifest.webmanifest` + `sw.js` for PWA installability (cache-first shell, standalone display, theme color matching the brand primary).
- **State:** all user-generated data (CRM clients, journal entries, habit logs, checklist ticks, reviews) lives in `localStorage` under a single namespaced key prefix (e.g. `cos:`), accessed through one `store.get(key, default)` / `store.set(key, value)` helper. No backend, no auth, no network calls except optional outbound links (Google Maps, Instagram, a "copy prompt to paste into Claude" flow).
- **Routing:** hash-based (`#/route/param/sub`), a `parseHash()` → `{route, param, sub}`, a `VIEWS` object mapping route name → render function returning an HTML string, and a catch-all `VIEWS._placeholder` for any registered module that doesn't have a view yet (so the nav never 404s, it degrades gracefully).

## 3. Design system ("Card Atlas")

Light theme only. Reuse this exact token set so every screen feels like one coherent product:

```css
:root{
  --bg:#F4F6F2; --ink:#15231D; --ink-soft:#4C5A53; --ink-faint:#7C887F;
  --line:#E1E7DF; --line-strong:#D4DCD3; --card:#FFFFFF;
  --primary:#1E5945; --primary-deep:#143E30; --primary-soft:#E7F0EA;
  --good:#2E8B6B; --good-soft:#E6F3EC;
  --watch:#B7740E; --watch-ink:#8A5705; --watch-soft:#FBF0DA;
  --alert:#BC4B45; --alert-ink:#9A3A35; --alert-soft:#FAE9E7;
  --c1:#3E7A5A; --c2:#B7740E; --c3:#2E6F8E; --c4:#8A5A7E; --c5:#9A6B3F; --c6:#4E7E8C;
  --radius:20px; --shadow:0 1px 2px rgba(20,40,30,.04),0 8px 28px -12px rgba(20,40,30,.14);
}
```

- **Fonts:** Fraunces (serif, headings — warmth + editorial feel), Inter (body), JetBrains Mono (labels, eyebrows, kbd hints, tags — all-caps, letter-spaced).
- **Components to build once, reuse everywhere:** `.card` (white, rounded, soft shadow, optional left accent stripe via `.cat`/`--bc`), `.tile` (clickable grid card with top accent border, used for "browse all X" grids), `.pill` (status badge: good/watch/alert/brand), `.stat` (big-number dashboard tile), `.note` (callout: you/done/warn variants), `ul.list` / `ol.steps` (custom bullet & numbered list styling, not browser default), `.minigrid`/`.cell` (small data-grid for shot settings etc.), `.track`/`.seg` (a horizontal histogram-style bar with colored segments — used for exposure/coverage visualizations), `.progbar`, `.check` (custom checkbox row), `.pagenav` (prev/next footer).
- **Layout:** `.app` is a CSS grid, `248px` sticky sidebar + fluid main column. Sidebar groups nav links under group labels (see §4). Main content is capped at `920px`, centered. Mobile collapses to a 5-icon bottom nav bar (Today / Curriculum / Bibles / Brain / Ask) and the sidebar hides.
- **Icons:** one inline `<svg><symbol>` sprite defined once in `index.html`, referenced everywhere via `<svg class="ic"><use href="#i-name"/></svg>`. Build ~25-30 line-style icons (camera, sun, book, layers, search, eye, star, map, bulb, users, cash, bag, list, activity, flag, spark, compass, mountain, check, plus, edit, ext, arrow, warn, building, coffee, heart, film, mic, palette, grid).

## 4. Engine architecture (app.js)

Build these pieces, in this order, before any content module is loaded:

1. **Helpers:** `$()` query shorthand, `esc()` HTML-escaper, `ic()` icon-tag builder, `md()` — a minimal markdown renderer supporting only `**bold**`, `*italic*`, `` `code` ``, and `\n` → `<br>` (do not pull in a markdown library).
2. **Store:** localStorage wrapper as described in §2, exposed as `NS.store`.
3. **Knowledge graph:** every content item that has `{id, links:[]}` gets indexed into a node map; `links` is an array of `"type:id"` strings (e.g. `"bible:camera"`, `"skill:lighting"`). Build a reverse index so any page can render "what links here" (backlinks) automatically. Re-run `buildGraph()` whenever a content module finishes loading.
4. **Module registry:** a single ordered array, `NS.modules`, of `{id, name, group, icon, blurb}` — this is the **single source of truth** that drives the sidebar, mobile nav, and command palette. Adding a module to this array is what makes it appear in navigation; it does not require a view to exist yet (it'll fall through to the placeholder).
5. **Nav renderer:** groups modules by `group` (`Home, Learn, Taste, Create, Build, System`) and renders the sidebar + mobile nav, highlighting the active route.
6. **Router:** hash parser + `go(route, param)` + `render()` that looks up the view function, catches render errors into an inline `.empty` error card (never a blank white screen), and calls an optional `fn.after(r)` hook for views that need to attach event listeners after mount.
7. **Command palette (⌘K):** a `searchIndex()` that flattens modules + every content array (north star entries, curriculum projects, bibles AND their nested entries, brands, locations, sops, CD drills, agency docs) plus user-generated localStorage collections (CRM clients, portfolio case studies, journal entries) into one flat searchable list of `{title, sub, kind, go, icon}`. Filter-as-you-type, arrow-key navigation, enter to jump.
8. **Generic placeholder view:** renders the module's name/blurb from the registry with a "not authored yet" empty state — this is what makes partially-built apps still feel intentional instead of broken.

Then implement the "system" views directly in app.js (these are app behavior, not authored content): Today (daily focus dashboard pulling from mission + today's habit/lesson/shoot), North Star, CRM (lead→prospect→client pipeline with follow-ups and quotes), Business Dashboard (revenue/retainers/conversion/effective-hourly-rate, computed from CRM data), Creative Brain (freeform journal), Agency Portfolio (case studies: problem/solution/result), Ask (see §6), Habit Tracker (streaks, weekly grid, custom habits), Reviews (CD/weekly/monthly reflection prompts), Research Hub (one-click prefilled search links to Instagram/Pinterest/Google Images for visual research).

## 5. Content modules (`data.*.js`)

Each file starts with a header comment naming the file, the "Unit" it represents, and one line on its content philosophy. Each does `window.NS = window.NS || {};`, assigns its arrays, and ends with `if (window.NS && typeof NS.rebuild === "function") NS.rebuild();` so the graph/search reindex after late-loading.

**`data.core.js`** — `NS.meta` (app name/tagline/version/owner), `NS.northstar` (mission, vision, values, wealth philosophy, business philosophy, creative philosophy, decision framework — each `{id, kind, title, updated, body, principles:[]}`), `NS.modules` (the registry from §4 — this is the most important array in the whole app), `NS.settingsDefaults`, `NS.habitSeeds`, `NS.incomeMilestones`.

**`data.curriculum.js`** — `NS.curriculumPhases` (5 stages: First assets → First paying clients → Premium & retainers → Studio & scale → Authority & expansion). `NS.curriculum`: an array of **28 projects**, each modeling a realistic commercial engagement (not a "lesson"). One project must be fully authored as the gold-standard template (see exact schema in §7); the rest can start as `{id, order, phase, status:"planned", title, blurb, businessType, skills:[{skillId}]}` stubs via a small `stub()` helper, to be deep-authored later as their own units. Order projects from beginner solo-practice engagements through to studio-scale and authority-stage work (teaching, brand collabs, tourism-board pitches).

**`data.bibles.js`** — `NS.bibleCategories` (craft / hospitality / business). `NS.bibles`: ~19 bibles across those 3 categories (craft: Shot, Camera, Lighting, Composition, Colour & Grading, Sound, Editing, DaVinci Resolve; hospitality: Hotel & Stay, Restaurant & Café, Salon & Spa, Wedding & Venue, Hospitality Psychology, Luxury Branding; business: Sales, Pricing, Negotiation, Indian Consumer Psychology, Agency & SOP, Mistakes). Each bible is `{id, category, title, icon, accent, blurb, tags:[], links:[], entries:[]}`. At least one bible (Camera & Blackmagic, tied to the author's real gear) should have its `entries` deeply authored to the full schema in §7 as the template for authoring the rest later.

**`data.brands.js`** — Teardowns of real brands (mix of tech/luxury/lifestyle, e.g. Apple-style reductionist premium) purely to extract transferable visual-language principles for hospitality work. Each: `{id, name, sector, blurb, visualLanguage, color, movement, composition, typography, businessLesson, doNotCopy, principles:[]}`. The `doNotCopy` field is mandatory on every entry — the point is critical extraction, never imitation.

**`data.locations.js`** — A scouting-brief library of real shoot locations in the studio's home region. Each via a `loc()` helper that auto-generates a Google Maps search link: `{id, name, region, blurb, light, goldenHour, sunrise, fog, architecture, ...}` — enough detail that someone could plan a shoot day from the entry alone.

**`data.skills.js`** — `NS.skillBranches` (craft / hospitality / business, mirroring the bible categories). `NS.skills`: a knowledge-graph of skills, each linking to the bibles that teach it, the SOPs that standardize it, and (resolved at runtime from curriculum) the projects that advance it. Mastery is progressive (e.g. Introduced → Practiced → Mastered stages defined in app.js) and earned through project application, not reading.

**`data.sops.js`** — `NS.sops`: Standard Operating Procedures as ordered, numbered step lists (`{id, title, icon, accent, blurb, steps:[]}`) — Shoot Day, Edit Handoff, Client Onboarding, Delivery, etc. — written so a hired editor/shooter could follow them without the founder present.

**`data.agency.js`** — `NS.agencySections` (pricing / sales / messaging / outreach / paperwork). `NS.agency`: copy-paste-ready playbook docs per section — pricing philosophy, anchor-high negotiation tactics, WhatsApp/email scripts, outreach templates, contracts/paperwork — India/Himachal context, prices in ₹, explicitly marked illustrative.

**`data.cd.js`** ("Creative Director") — `NS.cdTypes`: drill categories (Daily Observation, Hospitality Audit, Lighting Analysis, Composition Analysis, Colour Analysis, Photo/Frame Analysis). `NS.cdDrills`: real-world (not quiz) taste-training tasks — go observe an actual space/photo and write an analysis, logged to localStorage (`cos:cdlog`) and surfaced back into the relevant Bible/Skill as a note-to-self.

## 6. The "Ask" feature (AI hand-off, not a chat integration)

`Ask` is a module that does **not** call an LLM API. It defines a small set of expert personas (e.g. Creative Director, Pricing Strategist, Client Whisperer), each `{id, role, icon, persona}`. The role's page lets the user type their situation, then offers two buttons: "Copy grounded prompt" (assembles the full North Star + persona description + the user's question into one prompt and copies it to the clipboard) and "Open in Claude" (opens a new Claude chat with a shorter prefilled version). This is the deliberate design pattern for grounding any external AI assistant in the user's own mission/values/skill-state without building real API integration.

## 7. Authoring depth standard

This matters more than anything else in this prompt: **a "module" being registered in `NS.modules` is not the same as it being done.** Two depth tiers must both exist, explicitly:

- **`status:"available"` / fully authored** — a complete, usable unit. A curriculum project at this tier includes: objective/audience/psychology/positioning brief, creative direction, a "viral autopsy" (why this content performs: scroll-stop/retention/rewatch/save/share triggers + one named reference to study), a 3-beat storyboard with timecodes, per-shot breakdowns (lens/WB/ISO/shutter/aperture/frame rate/height/distance/duration, common mistakes, numbered capture steps, real reference search links, alternative shot ideas), editing/color/audio walkthroughs grounded in named software documentation sections, 3-5 real scoutable locations with map links, export settings, monetization framing + an illustrative ₹ price quote + upsell + retainer angle, deliverables list, skills advanced (with mastery stage), bible-update notes, research links, reflection questions, and peer-review questions. A bible entry at this tier follows a similarly deep multi-section schema (definition/why/first-principles/standards/common-mistakes/business-angle/hospitality-angle/step-by-step implementation, plus exercises, observation exercises, reflection prompts, and cross-links).
- **`status:"planned"` / stub** — title, one-line blurb, business-type tag, and which skills it will advance. Nothing more. This is intentional scaffolding, not a bug — it lets the full structure (nav, search, progress tracking, knowledge graph) exist and work end-to-end before every unit is deep-authored, and signals exactly what's left to do.

Build the **engine and full registry first**, author **one complete example per content type** to lock the schema (one curriculum project, one bible), stub everything else, and leave the rest of the deep authoring as explicitly tracked follow-up work — do not silently skip registering a module just because you haven't authored its content yet.

## 8. PWA wrapper

`manifest.webmanifest`: name/short_name, `start_url: "./index.html"`, `scope: "./"`, `display: "standalone"`, background/theme color matching `--bg`/`--primary`, 192 and 512px maskable icons. `sw.js`: minimal cache-first service worker caching the app shell (`index.html`, `app.js`, all `data.*.js`, the manifest) so it installs and works offline after first load.

## 9. Definition of done for a first pass

1. Open `index.html` with no console errors, sidebar shows all registered modules grouped correctly, ⌘K opens a working fuzzy search over all loaded content.
2. Every module in `NS.modules` resolves to *something* on click — either a real view or the placeholder empty-state, never a blank screen or thrown error.
3. At least one fully deep-authored example exists for curriculum and for bibles, matching §7, to serve as the template for all future content authoring.
4. CRM/Habits/Brain/Reviews persist correctly across reloads via localStorage.
5. The app installs as a PWA and the shell loads offline.
