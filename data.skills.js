/* ============================================================
   North Stories OS — data.skills.js
   Unit: Curriculum & Skill Tree Architecture v1.0
   The Skill Tree is a knowledge graph, not a checklist.
   Each skill links to the Bibles that teach it, the SOPs that
   standardise it, the projects that advance it (resolved from
   curriculum), and the business outcomes it drives.
   Mastery is progressive (see MASTERY stages in app.js) and is
   earned by application + review, not by reading.
   ============================================================ */
window.NS = window.NS || {};

NS.skillBranches = [
  { id:"craft",       label:"Craft",        accent:"var(--c1)", blurb:"The making of the work." },
  { id:"hospitality", label:"Hospitality",  accent:"var(--c4)", blurb:"Understanding the businesses we serve." },
  { id:"business",    label:"Business",     accent:"var(--c2)", blurb:"Winning and keeping premium clients." }
];

NS.skills = [
  /* ---- CRAFT ---- */
  { id:"creative-direction", name:"Creative Direction", branch:"craft",
    blurb:"Deciding the feeling, story and visual logic of a piece before a frame is shot.",
    bibles:["composition","luxury","lighting"], sops:[], dependsOn:["composition","lighting"],
    outcomes:["A recognisable house style","Higher perceived value → higher prices"] },
  { id:"blackmagic-camera", name:"Blackmagic Camera", branch:"craft",
    blurb:"Operating the locked rig: exposure by histogram, ISO, ND, white balance, frame rate.",
    bibles:["camera"], sops:[], dependsOn:[],
    outcomes:["Clean, gradeable footage every time","No reshoots"] },
  { id:"composition", name:"Composition", branch:"craft",
    blurb:"Framing that reads as premium — balance, lines, depth, negative space.",
    bibles:["composition"], sops:[], dependsOn:[],
    outcomes:["Frames a client would frame on a wall"] },
  { id:"lighting", name:"Lighting", branch:"craft",
    blurb:"Reading and shaping light — window-first — for rooms, food, faces and product.",
    bibles:["lighting"], sops:[], dependsOn:[],
    outcomes:["Interiors that feel warm and expensive"] },
  { id:"sound", name:"Sound", branch:"craft",
    blurb:"Capturing room tone and designing audio that makes a space feel alive.",
    bibles:["sound"], sops:[], dependsOn:[],
    outcomes:["Reels that feel immersive, not flat"] },
  { id:"editing", name:"Editing", branch:"craft",
    blurb:"Pacing, rhythm and structure that hold attention to the last frame.",
    bibles:["editing"], sops:[], dependsOn:[],
    outcomes:["Higher retention → more reach → more leads"] },
  { id:"colour", name:"Colour Grading", branch:"craft",
    blurb:"A repeatable grade that feels inevitable — protecting highlights, setting mood.",
    bibles:["colour","davinci"], sops:[], dependsOn:["blackmagic-camera"],
    outcomes:["A signature look / LUT you can reuse"] },
  { id:"davinci-resolve", name:"DaVinci Resolve", branch:"craft",
    blurb:"Only the Resolve concepts each project needs — applied to footage just shot.",
    bibles:["davinci","editing","colour"], sops:[], dependsOn:["editing"],
    outcomes:["Faster turnaround → better effective hourly rate"] },
  { id:"food-cinematography", name:"Food Cinematography", branch:"craft",
    blurb:"Filming food and drink so the appetite signal (steam, sheen, pour) lands.",
    bibles:["restaurant","lighting","composition"], sops:[], dependsOn:["lighting","composition"],
    outcomes:["Café & restaurant clients","Table-top reel packages"] },
  { id:"hotel-cinematography", name:"Hotel Cinematography", branch:"craft",
    blurb:"Shooting stays — arrival, space, light, ritual — to sell the feeling of being there.",
    bibles:["hotel","lighting","composition"], sops:[], dependsOn:["lighting","composition"],
    outcomes:["Boutique hotel & homestay retainers"] },

  /* ---- HOSPITALITY ---- */
  { id:"hospitality-psychology", name:"Hospitality Psychology", branch:"hospitality",
    blurb:"Why guests choose, trust and pay more — the emotion behind a booking.",
    bibles:["psychology","consumer"], sops:[], dependsOn:[],
    outcomes:["Content that converts views into bookings"] },
  { id:"luxury-positioning", name:"Luxury Positioning", branch:"hospitality",
    blurb:"Making a small business look as considered as the global brands it admires.",
    bibles:["luxury","psychology"], sops:[], dependsOn:["creative-direction"],
    outcomes:["Premium pricing power","Self-selecting premium clients"] },
  { id:"restaurant-marketing", name:"Restaurant & Café Marketing", branch:"hospitality",
    blurb:"Turning ambience and ritual into content that fills tables.",
    bibles:["restaurant","psychology"], sops:[], dependsOn:["food-cinematography","hospitality-psychology"],
    outcomes:["Repeat café/restaurant work"] },

  /* ---- BUSINESS ---- */
  { id:"sales", name:"Sales", branch:"business",
    blurb:"Turning interest into booked, paying hospitality clients.",
    bibles:["sales"], sops:[], dependsOn:[],
    outcomes:["Booked projects","Predictable pipeline"] },
  { id:"pricing", name:"Pricing", branch:"business",
    blurb:"Pricing on value delivered to the business, never on hours.",
    bibles:["pricing"], sops:[], dependsOn:["sales"],
    outcomes:["Higher project value","Protected margins"] },
  { id:"negotiation", name:"Negotiation", branch:"business",
    blurb:"Holding rate and scope while keeping the relationship warm.",
    bibles:["negotiation","sales"], sops:[], dependsOn:["sales"],
    outcomes:["Fewer discounts","Better scoped jobs"] },
  { id:"client-communication", name:"Client Communication", branch:"business",
    blurb:"Discovery, updates and delivery that make clients feel safe and impressed.",
    bibles:["sales","agency"], sops:[], dependsOn:[],
    outcomes:["Referrals","Retainers"] },
  { id:"agency-operations", name:"Agency Operations", branch:"business",
    blurb:"The repeatable systems and SOPs that let the studio scale beyond you.",
    bibles:["agency","mistakes"], sops:[], dependsOn:["client-communication"],
    outcomes:["Hire & train editors","Deliver the standard at volume"] }
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
