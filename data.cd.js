/* ============================================================
   North Stories OS — data.cd.js
   Unit: Creative Director v1.0
   The flagship eye-training module. Each "drill" is a real-world
   observation/analysis task done out in Himachal's hospitality
   world — not a quiz. Taste is trained before technique.
   Drills link into the Bibles and Skills graph; logged analyses
   live in localStorage (cos:cdlog) and nudge Creative Direction.
   ============================================================ */
window.NS = window.NS || {};

NS.cdTypes = [
  { id:"observation", label:"Daily Observation",   icon:"i-eye",      accent:"var(--c1)", blurb:"Notice what most people walk past." },
  { id:"audit",       label:"Hospitality Audit",   icon:"i-building", accent:"var(--c4)", blurb:"Judge a real space like a consultant would." },
  { id:"lighting",    label:"Lighting Analysis",   icon:"i-sun",      accent:"var(--c2)", blurb:"Read where light comes from and what it does." },
  { id:"composition", label:"Composition Analysis",icon:"i-grid",     accent:"var(--c1)", blurb:"See the order behind a frame that feels right." },
  { id:"colour",      label:"Colour Analysis",     icon:"i-palette",  accent:"var(--c4)", blurb:"Name a palette and the mood it sells." },
  { id:"photo",       label:"Photo / Frame Analysis",icon:"i-film",   accent:"var(--c3)", blurb:"Reverse-engineer work you admire." }
];

NS.cdDrills = [
  { id:"cafe-read", type:"observation", title:"Walk one café, read the room",
    prompt:"Sit in a café you don't know for 20 minutes with no phone. Decide, with reasons, whether it feels premium or cheap — and exactly which choices created that feeling.",
    lookFor:["Where the light comes from, and what it falls on","One material that feels expensive — and one that cheapens the room","The one thing you'd change to raise the price of a coffee by ₹50","What the owner clearly cares about — and what they've ignored"],
    bibles:["restaurant","luxury","lighting"], skills:["creative-direction","restaurant-marketing"],
    research:{platform:"Instagram",query:"shimla cafe aesthetic"} },

  { id:"two-cafes", type:"observation", title:"Two cafés, side by side",
    prompt:"Visit (or pull up) two cafés in the same town. Rank them on which feels more premium and argue the case — light, materials, spacing, sound, smell, staff.",
    lookFor:["Which one you'd photograph, and why","The single biggest difference in how light is handled","Spacing: which one lets things breathe","What the cheaper-feeling one could copy for free"],
    bibles:["restaurant","luxury","hospitality"], skills:["creative-direction","hospitality-psychology"],
    research:{platform:"Google Images",query:"premium cafe interior himachal"} },

  { id:"hotel-lobby", type:"audit", title:"Audit a hotel lobby",
    prompt:"Walk into (or study) a hotel lobby and audit the arrival experience as if the owner hired you to make it look worth more on camera.",
    lookFor:["The first thing the eye lands on at the door","Where you'd place a camera for the hero arrival shot","Three textures worth a detail clip","One thing that quietly says 'budget' and how to hide it"],
    bibles:["hotel","luxury","composition"], skills:["hotel-cinematography","luxury-positioning"],
    research:{platform:"Behance",query:"luxury hotel lobby photography"} },

  { id:"homestay-room", type:"audit", title:"Audit a homestay room",
    prompt:"Study one guest room (yours, a friend's, or a listing) and plan how you'd make it sell a stay — the cosy-corner brief made real.",
    lookFor:["The best window and the best time of day for it","One corner that's already a hero frame","What to tidy, add, or remove before filming","The detail (tea, book, throw) that carries the feeling"],
    bibles:["hotel","lighting","composition"], skills:["hotel-cinematography","creative-direction"],
    research:{platform:"Pinterest",query:"boutique homestay room styling"} },

  { id:"salon-audit", type:"audit", title:"Audit a salon or spa space",
    prompt:"Read a salon/spa for how well it sells calm and transformation rather than a list of services.",
    lookFor:["Whether the space feels clean and quiet or busy and loud","Where a single soft light would flatter a client","One ritual moment worth filming (the wash, the reveal)","What signals care vs what signals 'cheap and fast'"],
    bibles:["salon","psychology","luxury"], skills:["hospitality-psychology","creative-direction"],
    research:{platform:"Instagram",query:"luxury spa aesthetic"} },

  { id:"menu-teardown", type:"audit", title:"Menu design teardown",
    prompt:"Pick up a restaurant/café menu and analyse it as a piece of brand design and persuasion.",
    lookFor:["What the typography and paper say about the price point","Which dish the layout is steering you toward","One change that would make it feel more premium","How they describe food — sensory words vs flat labels"],
    bibles:["restaurant","luxury","consumer"], skills:["restaurant-marketing","luxury-positioning"],
    research:{platform:"Behance",query:"premium restaurant menu design"} },

  { id:"window-light", type:"lighting", title:"Study window light for 10 minutes",
    prompt:"Sit by one window for ten minutes and watch the light. Don't shoot — just notice how it shapes the room.",
    lookFor:["Which direction the light comes from and how soft it is","What it makes beautiful — and what it flattens","How the mood changes if a cloud passes","Where you'd place a person or a cup to catch it"],
    bibles:["lighting","camera"], skills:["lighting","blackmagic-camera"],
    research:{platform:"YouTube",query:"natural window light cinematography"} },

  { id:"best-light", type:"lighting", title:"Find the best light in a room",
    prompt:"In any room, find the single most flattering pool of light and prove why it's the best — then find the worst.",
    lookFor:["The softest, most directional light available","What's lighting it (window, lamp, bounce)","The harshest light and why it's unusable","How you'd turn the bad light off and shape the good"],
    bibles:["lighting"], skills:["lighting","creative-direction"],
    research:{platform:"Google Images",query:"soft directional interior light reference"} },

  { id:"three-compositions", type:"composition", title:"Frame three premium compositions",
    prompt:"With your phone (no recording), find three frames in your surroundings that would look paid-for. Screenshot or note each.",
    lookFor:["Leading lines or symmetry that organise the frame","Foreground depth (something to shoot through)","Negative space that lets the subject breathe","Why each frame feels intentional, not snapshot"],
    bibles:["composition","luxury"], skills:["composition","creative-direction"],
    research:{platform:"Behance",query:"minimal interior composition photography"} },

  { id:"palette-read", type:"colour", title:"Read a space's colour palette",
    prompt:"Choose a space and name its palette in 3–5 colours, then judge whether it reads as premium, warm, clinical, or cheap.",
    lookFor:["The 3 dominant colours and 1–2 accents","Warm vs cool, and the mood that creates","One clashing element breaking the harmony","The grade you'd push it toward in Resolve"],
    bibles:["colour","luxury"], skills:["colour","creative-direction"],
    research:{platform:"Pinterest",query:"interior colour palette mood"} },

  { id:"luxury-photo", type:"photo", title:"Analyse a luxury hotel photo",
    prompt:"Find one image from a luxury hotel/brand you admire and reverse-engineer why it works.",
    lookFor:["Where the light is coming from","The lens feel — wide and roomy, or tight and intimate","What's in focus and what's let go soft","The one decision you can steal for your next shoot"],
    bibles:["hotel","lighting","composition"], skills:["creative-direction","hotel-cinematography"],
    research:{platform:"Behance",query:"Aman Six Senses hotel photography"} },

  { id:"frame-breakdown", type:"photo", title:"Break a reel down frame-by-frame",
    prompt:"Take a hospitality reel you love and step through it. Map every shot, cut and sound choice.",
    lookFor:["The hook in the first 0.5 second","How many shots, and how long each holds","Where sound leads the cut","The loop or ending that makes you rewatch"],
    bibles:["editing","sound","hotel"], skills:["editing","creative-direction"],
    research:{platform:"Instagram",query:"luxury hotel reel"} },

  { id:"materials-hunt", type:"observation", title:"Premium materials hunt",
    prompt:"Spend a walk hunting for materials that read as expensive — and cheap ones pretending to be. Photograph or note five.",
    lookFor:["Real wood, stone, brass, linen, ceramic — and how light hits them","One convincing fake and one obvious one","Which would make a great tactile detail clip","How texture changes when the light rakes across it"],
    bibles:["luxury","lighting","composition"], skills:["creative-direction","composition"],
    research:{platform:"Pinterest",query:"luxury material texture detail"} }
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
