/* ============================================================
   North Stories OS — data.sops.js
   Unit: SOP Library v1.0
   Standard Operating Procedures — the repeatable systems that let
   the studio deliver the same standard every time, and eventually
   let a trained editor or shooter deliver it without you.
   ============================================================ */
window.NS = window.NS || {};

NS.sops = [
  { id:"shoot-day", title:"Shoot Day SOP", icon:"i-camera", accent:"var(--c1)",
    blurb:"From arrival to wrap — the standard run of a hospitality shoot day so nothing gets missed.",
    steps:[
      "**Confirm the night before:** location, contact, call time, the shot list, weather, battery + storage charged/empty, ND filter and mic packed.",
      "**On arrival, walk the space first.** No camera — find the best light, the hero corners, the windows, and the order to shoot in.",
      "**Set Blackmagic once:** confirm the locked permanent setup (HEVC 4K Rec.709, 1/50, f1.6); set white balance per scene in Kelvin.",
      "**Style before you shoot.** Tidy, remove clutter, add one warm prop; a styled frame is half the result.",
      "**Shoot the hero frames first** while light and energy are best; protect highlights on every setup (histogram + red peaking).",
      "**Get coverage:** wide, detail, and an opening-up shot for every space; grab a safety take of each.",
      "**Capture room tone / ambience** for 30s per space for the edit.",
      "**Before wrapping, review clips on-site** — re-shoot anything soft or clipped now, not later.",
      "**Back up immediately** (see Backup SOP) before leaving or that evening."
    ],
    checklist:[{id:"a",label:"Shot list confirmed"},{id:"b",label:"Batteries + storage ready"},{id:"c",label:"ND + mic packed"},{id:"d",label:"Hero frames captured"},{id:"e",label:"Ambience recorded"},{id:"f",label:"Clips reviewed on-site"},{id:"g",label:"Backed up"}],
    cautions:["Never leave a location without reviewing the hero shots full-screen.","A blown window is unrecoverable — expose for highlights every time."],
    links:["bible:camera","bible:lighting","skill:blackmagic-camera"] },

  { id:"backup", title:"Backup SOP", icon:"i-layers", accent:"var(--c2)",
    blurb:"The non-negotiable that protects a client relationship: footage is never in one place.",
    steps:[
      "**Offload the same day** — copy all clips from the phone/app to the computer.",
      "**3-2-1 rule:** at least 2 copies on 2 different devices, 1 of them off the computer (external SSD or cloud).",
      "**Verify the copy opens** and plays before deleting anything from the source.",
      "**Name the folder** clearly: `YYYY-MM-DD_Client_Location`.",
      "**Keep originals (no proxy-only)** until the project is delivered and approved."
    ],
    checklist:[{id:"a",label:"Offloaded same day"},{id:"b",label:"Second copy made"},{id:"c",label:"Copy verified"},{id:"d",label:"Folder named correctly"}],
    cautions:["Never format a card/phone until you've verified two good copies.","Losing a client's footage once can end the relationship — treat backup as part of the shoot."],
    links:["bible:camera","skill:agency-operations"] },

  { id:"editing-sop", title:"Editing SOP", icon:"i-film", accent:"var(--c3)",
    blurb:"A repeatable edit path so every reel is finished to the same standard at the same speed.",
    steps:[
      "**Create the project** and a 1080×1920 / 24 fps timeline; import and rename clips.",
      "**Select the keepers** first — pull the calmest 2–3s of each before building.",
      "**Assemble to the formula** (e.g. hero → detail → open-up); cut on stillness/motion.",
      "**Grade** with one balanced node; protect highlights on the scopes; match all shots to one look.",
      "**Sound:** music bed + room tone, ducked; target ~−14 LUFS, peaks ~−6 dB.",
      "**Export** with the saved Instagram master preset; watch it back full-screen for clipped highlights.",
      "**File the project** and add it to the Portfolio as a case study."
    ],
    checklist:[{id:"a",label:"Timeline set up"},{id:"b",label:"Graded + matched"},{id:"c",label:"Audio mixed"},{id:"d",label:"Exported + checked"},{id:"e",label:"Case study logged"}],
    cautions:["Don't over-grade — restraint reads as premium.","Always check the final export on a phone before sending."],
    links:["bible:editing","bible:colour","bible:davinci","skill:editing"] },

  { id:"delivery", title:"Delivery SOP", icon:"i-arrow", accent:"var(--c4)",
    blurb:"How work is handed to a client so it feels professional and leads to the next job.",
    steps:[
      "**Package the deliverable set:** hero reel, vertical cutdowns, photography pulls, and a caption suggestion.",
      "**Share via a clean link** (cloud folder), named clearly, with a short note framing the work.",
      "**Include one upsell line** — a next reel, a seasonal refresh, or a retainer.",
      "**Ask for feedback + a testimonial** once they've seen it.",
      "**Log the outcome** in the CRM and turn the job into a Portfolio case study."
    ],
    checklist:[{id:"a",label:"Deliverable set complete"},{id:"b",label:"Clean link + note sent"},{id:"c",label:"Upsell offered"},{id:"d",label:"Testimonial requested"},{id:"e",label:"CRM + Portfolio updated"}],
    cautions:["Never deliver raw files unless contracted to — deliver the finished standard.","Always deliver on or before the promised date."],
    links:["skill:client-communication","skill:agency-operations","bible:agency"] },

  { id:"client-call", title:"Client Call SOP", icon:"i-users", accent:"var(--c1)",
    blurb:"A discovery call structure that builds trust and leads to a well-scoped, well-priced job.",
    steps:[
      "**Listen first.** Ask about their business goal (more bookings? higher perceived value?), not the video.",
      "**Diagnose:** what's their current content missing, and what would a premium look do for them?",
      "**Show, don't tell:** reference one relevant case study / reel.",
      "**Scope it** out loud — deliverables, timeline, what you need from them.",
      "**Price on value**, present a package, and hold the rate (see Pricing/Negotiation Bibles).",
      "**Agree next steps** and send a short written recap the same day."
    ],
    checklist:[{id:"a",label:"Business goal understood"},{id:"b",label:"Relevant case study shown"},{id:"c",label:"Scope agreed"},{id:"d",label:"Package + price presented"},{id:"e",label:"Written recap sent"}],
    cautions:["Don't quote a price before you understand the value to their business.","Silence after the price is fine — don't discount to fill it."],
    links:["bible:sales","bible:pricing","bible:negotiation","skill:client-communication"] },

  { id:"cafe-shoot", title:"Café / Restaurant Shoot SOP", icon:"i-coffee", accent:"var(--c5)",
    blurb:"The specifics of filming food-and-beverage spaces so the appetite signal and ambience land.",
    steps:[
      "**Shoot during the quiet hours** (or before opening) for clean frames and owner attention.",
      "**Lead with the signature item** — the drink/dish they're known for; style it and protect the sheen/steam.",
      "**Use window light** as the key; kill warm ceiling lights that fight it.",
      "**Get the ritual:** the pour, the plating, hands, steam — motion that sells the place.",
      "**Capture ambience b-roll** (details, textures, the room) and room tone.",
      "**Confirm brand details** for the caption — name, location, hours."
    ],
    checklist:[{id:"a",label:"Signature item filmed"},{id:"b",label:"Window light used"},{id:"c",label:"Ritual / motion captured"},{id:"d",label:"Ambience + room tone"},{id:"e",label:"Brand details noted"}],
    cautions:["Protect specular highlights on glassware and sauces — that sheen is the appetite cue.","Don't let busy backgrounds cheapen a hero dish — control the frame."],
    links:["bible:restaurant","bible:lighting","skill:food-cinematography"] }
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
