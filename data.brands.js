/* ============================================================
   North Stories OS — data.brands.js
   Unit: Brand Library v1.0
   Teardowns of brands worth studying. The goal is never to copy —
   it's to extract the underlying principle and notice what NOT to
   borrow for warm Himachal hospitality work. Trains taste.
   ============================================================ */
window.NS = window.NS || {};

NS.brands = [
  { id:"apple", name:"Apple", sector:"Technology / retail",
    blurb:"The reference for reductionist premium — the product as the only hero.",
    visualLanguage:"Extreme reduction: the product floats in space, nothing competing for attention.",
    color:"Near-monochrome — white, black, aluminium grey; colour comes only from the product itself.",
    movement:"Slow, weighty, precise motion; nothing bounces or rushes.",
    composition:"Centred, symmetrical, generous margins; one idea per frame.",
    typography:"San Francisco — clean, neutral, tightly kerned; it gets out of the way.",
    businessLesson:"Charge a premium by removing, not adding. Restraint signals confidence.",
    doNotCopy:"The sterile white void reads cold for a homestay — borrow the discipline, not the emptiness.",
    principles:["Negative space is a feature","One hero per frame","Confidence shows as restraint"],
    links:["bible:luxury","bible:composition"] },

  { id:"aesop", name:"Aesop", sector:"Skincare / retail",
    blurb:"Apothecary minimalism — sells a worldview, not ingredients.",
    visualLanguage:"Apothecary calm: amber glass, raw materials, stores each designed to their location.",
    color:"Muted, earthy, sepia — amber, concrete, brass; almost no bright colour.",
    movement:"Stillness; editorial photography over motion.",
    composition:"Asymmetric editorial balance, deep texture and shadow.",
    typography:"Restrained classic serif; reads like a literary journal.",
    businessLesson:"Sell a worldview and stay consistent across every touchpoint — that consistency is the luxury.",
    doNotCopy:"Don't ape the amber palette literally; steal the discipline, not the colour.",
    principles:["Place-specific, brand-consistent","Texture over gloss","Intellectual, never flashy"],
    links:["bible:luxury","bible:colour"] },

  { id:"aman", name:"Aman", sector:"Ultra-luxury hotels",
    blurb:"The masterclass for hospitality — sells silence, space and feeling.",
    visualLanguage:"Serene minimalism rooted in local culture; space and nature framed like art.",
    color:"Natural and tonal — stone, wood, water, sky; saturation almost absent.",
    movement:"Slow and meditative; long holds, breathing pace.",
    composition:"Architectural symmetry; nature framed through openings; vast negative space.",
    typography:"Quiet classical serif, understated.",
    businessLesson:"Scarcity plus silence equals ultra-premium. Sell the feeling of disappearing, not amenities.",
    doNotCopy:"Empty isn't boring here — Aman's calm is meticulously art-directed; lazy emptiness just looks unfinished.",
    principles:["Space is the luxury","Frame nature like art","Sell the feeling, not the room"],
    links:["bible:hotel","bible:luxury","bible:composition"] },

  { id:"six-senses", name:"Six Senses", sector:"Wellness resorts",
    blurb:"Warm luxury — proof that premium doesn't have to be cold.",
    visualLanguage:"Barefoot luxury; sustainability and wellness made beautiful with natural materials and candid warmth.",
    color:"Earthy and warm — terracotta, greens, natural wood, sunset tones.",
    movement:"Gentle, human, sensorial — hands, water, food, ritual.",
    composition:"Inviting and slightly candid; depth through nature and foreground.",
    typography:"Soft, humanist, friendly.",
    businessLesson:"Values (wellness, eco) justify the price and build loyalty — and warmth out-sells cold prestige for stays.",
    doNotCopy:"Don't fake the eco/wellness story — the authenticity is the product.",
    principles:["Warm luxury beats cold luxury","Ritual sells","Values are positioning"],
    links:["bible:hotel","bible:psychology","bible:luxury"] },

  { id:"rolex", name:"Rolex", sector:"Watches",
    blurb:"Heritage and never discounting — a price nothing else can touch.",
    visualLanguage:"Heritage and precision; the product shot like a jewel.",
    color:"Deep green, gold, black — rich but tightly controlled.",
    movement:"Crisp, exact, prestigious; macro detail.",
    composition:"Centred product hero, dramatic controlled lighting, managed reflections.",
    typography:"Classic serif, authoritative.",
    businessLesson:"Consistency over decades builds untouchable pricing power — and the brand never discounts.",
    doNotCopy:"Don't over-light hospitality like a watch ad — that polish kills warmth.",
    principles:["Never discount the brand","Heritage compounds","Master highlight control"],
    links:["bible:luxury","bible:pricing"] },

  { id:"muji", name:"Muji", sector:"Lifestyle / retail",
    blurb:"No-brand branding — calm and honesty as a premium position.",
    visualLanguage:"Honest materials, function-first, clutter-free calm.",
    color:"Off-white, kraft, natural — colour nearly absent.",
    movement:"Quiet and functional.",
    composition:"Grid order, repetition, calm.",
    typography:"Plain and unbranded.",
    businessLesson:"Anti-luxury can be premium; calm and honesty are themselves a positioning.",
    doNotCopy:"Don't go so plain it's forgettable — a hospitality brand still needs warmth and a hook.",
    principles:["Honesty as aesthetic","Order is calming","Less brand, more trust"],
    links:["bible:luxury","bible:composition"] },

  { id:"patagonia", name:"Patagonia", sector:"Outdoor / apparel",
    blurb:"Mission and authenticity as a moat — values over polish.",
    visualLanguage:"Documentary authenticity — real people, real places, rugged.",
    color:"Weathered, earthy naturals with bold brand accents.",
    movement:"Energetic and candid.",
    composition:"Wide environmental frames; human-in-landscape.",
    typography:"Sturdy and honest.",
    businessLesson:"A real mission builds fierce loyalty; values and authenticity beat gloss.",
    doNotCopy:"Don't stage grit — authenticity can't be faked.",
    principles:["Mission is a moat","Real over polished","Stand for something"],
    links:["bible:luxury","bible:psychology"] },

  { id:"nespresso", name:"Nespresso", sector:"Coffee",
    blurb:"A commodity turned into a ritual — and a recurring-revenue system.",
    visualLanguage:"Accessible luxury built on the ritual of the perfect cup; sleek but warm.",
    color:"Rich browns, black, gold accents — warm premium.",
    movement:"The pour, the crema, the ritual — sensorial macro.",
    composition:"Hero cup in a clean context, shallow depth.",
    typography:"Elegant modern serif/sans.",
    businessLesson:"Ritualise the product and build a system (pods) to lock in recurring revenue.",
    doNotCopy:"Don't over-stage food and drink until it looks fake — keep the appetite real.",
    principles:["Ritualise the product","Recurring revenue by design","Accessible luxury scales"],
    links:["bible:restaurant","bible:luxury","skill:food-cinematography"] }
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
