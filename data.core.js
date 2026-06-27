/* ============================================================
   North Stories OS — data.core.js
   Foundation data: North Star, module registry, settings.
   Unit: core v1.0 · attaches to window.NS namespace.
   ============================================================ */
window.NS = window.NS || {};

/* ---- META ---- */
NS.meta = {
  app: "North Stories OS",
  tagline: "Learn · Create · Build",
  version: "1.0",
  owner: "Bhanu",
  repo: "north-stories-os"
};

/* ---- NORTH STAR (foundation; read first by every Ask prompt) ----
   v1.0 seed. Deliberately written to be edited as you grow. */
NS.northstar = [
  { id:"mission", kind:"mission", title:"Mission", updated:"2026-06-28",
    body:"Build a hospitality-focused visual studio in the Himalayas that makes small luxury businesses — cafés, boutique hotels, salons, makers — look as considered as the global brands they admire. Turn one camera and a sharp eye into a real business with paying clients, retainers, and a body of work I'm proud of.",
    principles:[
      "Make the ordinary feel intentional.",
      "Ship work a paying client would frame on their wall.",
      "Every shoot must teach me something and earn or build toward money."
    ]},
  { id:"vision", kind:"vision", title:"Vision (5 years)", updated:"2026-06-28",
    body:"A recognised studio brand across Himachal hospitality. Editors hired and trained on these same SOPs. Recurring retainers with hotels and restaurants. A portfolio so specific that the right clients self-select. The OS itself becomes the agency's operating manual.",
    principles:[
      "From freelancer → studio → small agency.",
      "Systems over heroics: anyone trained on the SOPs can deliver the standard.",
      "Reputation compounds; protect it on every job."
    ]},
  { id:"values", kind:"values", title:"Values", updated:"2026-06-28",
    body:"How I work, even when no one is watching.",
    principles:[
      "Taste is trainable — study the best daily.",
      "Protect the highlights, protect the relationship, protect the brand.",
      "Under-promise, over-deliver, on time.",
      "Honest pricing; no race to the bottom.",
      "Document everything so it can be repeated and taught."
    ]},
  { id:"wealth", kind:"wealth", title:"Wealth Philosophy", updated:"2026-06-28",
    body:"Money is the scoreboard that lets the work continue. Price on the value delivered to the client's business, not on hours. Retainers buy stability; projects buy upside; profit buys the freedom to choose better clients.",
    principles:[
      "Sell outcomes (more bookings, higher perceived value), not deliverables.",
      "Raise rates as the portfolio and proof grow.",
      "Track effective hourly rate — it tells the truth about a client."
    ]},
  { id:"business", kind:"business", title:"Business Philosophy", updated:"2026-06-28",
    body:"A studio is a promise kept repeatedly. Win trust with one excellent job, then convert it into a relationship. The pipeline matters more than any single shoot.",
    principles:[
      "One great case study is worth more than ten cold pitches.",
      "Follow-up is the job; talent gets the meeting, follow-through gets the cheque.",
      "Say no to clients who damage the standard or the margin."
    ]},
  { id:"creative", kind:"creative", title:"Creative Philosophy", updated:"2026-06-28",
    body:"Light first, story second, gear last. Restraint reads as luxury. I'd rather nail three frames than spray a hundred. The grade should feel inevitable, never loud.",
    principles:[
      "Expose to protect highlights — a blown window cheapens any property.",
      "One light, well-shaped, beats five fighting each other.",
      "Cut on motion and emotion; let silence breathe."
    ]},
  { id:"decision", kind:"decision", title:"Decision Framework", updated:"2026-06-28",
    body:"When unsure, run the choice through this order: (1) Does it serve the mission? (2) Does it protect the brand and relationship? (3) Does it teach me or pay me — ideally both? (4) Is it the simplest version that still meets the standard? If a choice fails 1 or 2, stop.",
    principles:[
      "Mission > money on any single job; money > ego always.",
      "If two options tie, pick the one that builds a better portfolio.",
      "Reversible decisions: move fast. Irreversible ones: sleep on it."
    ]}
];

/* ---- MODULE REGISTRY (drives sidebar, mobile nav, command palette) ---- */
NS.modules = [
  { id:"today",            name:"Today",             group:"Home",   icon:"i-sun",      blurb:"Your single daily focus — mission, lesson, shoot, business, habit." },
  { id:"curriculum",       name:"Curriculum",        group:"Learn",  icon:"i-book",     blurb:"The full path, lesson by lesson, with progress." },
  { id:"bibles",           name:"Knowledge Bibles",  group:"Learn",  icon:"i-layers",   blurb:"The source of truth: camera, light, colour, editing, business." },
  { id:"research",         name:"Research Hub",      group:"Learn",  icon:"i-search",   blurb:"Exact searches that train your eye, one click away." },
  { id:"gallery",          name:"Reference Gallery", group:"Learn",  icon:"i-eye",      blurb:"Saved frames and references to study." },
  { id:"creative-director",name:"Creative Director", group:"Taste",  icon:"i-palette",  blurb:"Daily analysis that trains taste — photo, frame, audit, colour." },
  { id:"brands",           name:"Brand Library",     group:"Taste",  icon:"i-star",     blurb:"Teardowns of the brands worth studying." },
  { id:"locations",        name:"Location Library",  group:"Taste",  icon:"i-map",      blurb:"Himachal, mapped for shoots and clients." },
  { id:"brain",            name:"Creative Brain",    group:"Create", icon:"i-bulb",     blurb:"Ideas, observations, light, textures, voice notes." },
  { id:"portfolio",        name:"Agency Portfolio",  group:"Create", icon:"i-camera",   blurb:"Case studies: problem, solution, results." },
  { id:"crm",              name:"Business CRM",      group:"Build",  icon:"i-users",    blurb:"Leads → prospects → clients → past. The money pipeline." },
  { id:"business",         name:"Business Dashboard",group:"Build",  icon:"i-cash",     blurb:"Revenue, retainers, conversion, effective hourly rate." },
  { id:"agency",           name:"Agency Brain",      group:"Build",  icon:"i-bag",      blurb:"Pricing, sales, scripts, contracts, objections." },
  { id:"sops",             name:"SOP Library",       group:"Build",  icon:"i-list",     blurb:"Repeatable standards for every kind of job." },
  { id:"habits",           name:"Habit Tracker",     group:"Build",  icon:"i-activity", blurb:"Daily reps that compound. Protect the streak." },
  { id:"reviews",          name:"Reviews",           group:"Build",  icon:"i-flag",     blurb:"Creative Director, weekly and monthly reviews." },
  { id:"ask",              name:"Ask",               group:"System", icon:"i-spark",    blurb:"Launch a Claude expert grounded in your North Star." },
  { id:"northstar",        name:"North Star",        group:"System", icon:"i-compass",  blurb:"Mission, vision, values, philosophy, decisions." }
];

/* ---- SETTINGS DEFAULTS ---- */
NS.settingsDefaults = { theme:"light" };

/* ---- HABIT SEEDS (editable later) ---- */
NS.habitSeeds = [
  { id:"study",  label:"Study one reference for 10 min" },
  { id:"shoot",  label:"Shoot something (even one frame)" },
  { id:"edit",   label:"Edit / grade for 20 min" },
  { id:"reach",  label:"One business action (outreach / follow-up)" },
  { id:"journal",label:"Log one entry in Creative Brain" }
];

/* ---- INCOME MILESTONES (₹) ---- */
NS.incomeMilestones = [10000, 25000, 50000, 100000, 200000, 500000];
