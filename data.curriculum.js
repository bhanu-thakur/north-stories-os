/* ============================================================
   North Stories OS — data.curriculum.js
   Unit: Curriculum & Skill Tree Architecture v1.0
   Project-based apprenticeship. Each project is a realistic
   engagement that produces real business assets and ADVANCES
   SKILLS (see skills[].toStage). Theory only serves the project.
   8 phases / 40 projects scaffolded from the Shimla bootcamp.
   Project 01 authored in full; the rest are planned slots whose
   deep authoring ships as their own units.
   ============================================================ */
window.NS = window.NS || {};

/* Apprenticeship STAGES — each project is a realistic commercial
   hospitality engagement that produces real assets and advances skills.
   (Not reel-drills; that bootcamp informed only the UI, not this spine.) */
NS.curriculumPhases = [
  { id:"s1", label:"Stage 1 · First assets",        accent:"var(--c1)", icon:"i-camera", blurb:"Build the first portfolio pieces through homestay & café engagements." },
  { id:"s2", label:"Stage 2 · First paying clients", accent:"var(--c2)", icon:"i-cash",   blurb:"Boutique hotels, restaurants and salons — booked, paid work." },
  { id:"s3", label:"Stage 3 · Premium & retainers",  accent:"var(--c4)", icon:"i-star",   blurb:"Resorts, luxury brands and recurring monthly revenue." },
  { id:"s4", label:"Stage 4 · Studio & scale",       accent:"var(--c3)", icon:"i-users",  blurb:"Multi-deliverable systems, trained editors, agency operations." }
];

/* ---------- PROJECT 01 — authored in full ---------- */
var P01 = {
  id:"p01", order:1, phase:"s1", status:"available",
  title:"The cosy window corner", businessType:"Homestay / boutique stay",
  client:"Practice engagement — a cosy Shimla homestay corner",
  blurb:"Your first locked-off, hand-exposed interior reel — the clip that sells a stay.",
  reelLength:"8–10s", timeBudget:"~3h · 1h shoot · 2h edit",
  gearChips:[{icon:"i-camera",label:"Lens 26 / 52 / 13"},{icon:"i-sun",label:"WB 4800–5600 K"},{icon:"i-activity",label:"ISO per shot"},{icon:"i-clock",label:"1/50 · f1.6 · 24 fps"}],
  brief:{
    objective:"Make a quiet, scroll-stopping reel of a window-lit corner that makes a stranger think 'I want to stay there.'",
    audience:"Travellers browsing Instagram for a cosy Himachal escape.",
    psychology:"You're selling a feeling/state, not square footage — warmth against cold rain triggers the imagined comfort of being there.",
    positioning:"Restraint reads as premium: three calm, perfectly exposed frames beat a hundred busy ones."
  },
  creativeDirection:"Warm, cosy, calm. Window as the only light; soft overcast monsoon daylight as a giant softbox. Protect the rainy view through the glass; let the room glow. Kill the yellow ceiling lights.",
  viralAutopsy:{
    triggers:[
      {k:"Scroll-stop (0.5s)",body:"A warm, correctly exposed interior against cool rain reads as 'comfort' instantly."},
      {k:"Retention",body:"One tiny live element — steam, rain on glass, a breathing curtain — keeps the eye on a 'still' shot."},
      {k:"Rewatch",body:"8–10s, loop-friendly: end near the opening frame so it cycles seamlessly."},
      {k:"Save",body:"Aspirational interiors get saved as 'places I'd book' — the strongest booking-intent signal."},
      {k:"Share",body:"'Look how cosy' gets sent to the person you'd travel with — a free second viewer."}
    ],
    borrow:"Boutique-hotel photographers live by 'the first frame is the best frame.' Lead with your single most inviting shot — never warm up to it."
  },
  storyboard:{
    light:"Grey overcast monsoon afternoon (~10am–1pm). Window only; the clouds are your softbox.",
    beats:[{name:"Beat 1 · Establish",range:"wide · 26mm",seg:"good"},{name:"Beat 2 · Detail",range:"tea · 52mm",seg:"watch"},{name:"Beat 3 · Open up",range:"room · 13mm",seg:"flat"}],
    playback:[
      {tc:"0–3s",body:"A rainy evening; someone's scrolling. Your **warm, window-lit corner** fills the screen and the thumb just stops."},
      {tc:"3–6s",body:"Cut close to the **steaming cup on the sill** — they can almost smell the chai."},
      {tc:"6–9s",body:"Open **wide**, the room hugging the rainy window, then loop back to the first shot."}
    ],
    land:"Somewhere in that quiet loop a stranger thinks 'I want to stay there.' That feeling — not the room — is the entire thing you're learning to make."
  },
  shots:[
    { name:"Shot A · Wide establishing", role:"the invitation", lens:"26mm",
      purpose:"Show the whole cosy corner and its relationship to the window in one calm hero frame.",
      settings:[{t:"Lens",v:"26mm",sub:"main"},{t:"White balance",v:"4800 K",sub:"cosy-warm"},{t:"ISO",v:"200–400",sub:"read histogram",lever:true},{t:"Shutter",v:"1/50",sub:"locked"},{t:"Aperture",v:"f1.6",sub:"fixed"},{t:"Frame rate",v:"24 fps"},{t:"Height",v:"chest ~1.2m"},{t:"Distance",v:"~1.5–2m"},{t:"Record",v:"8 sec"}],
      brightness:"Lower ISO until the bright window is no longer pure white. A slightly dark, moody room reads as cosy and deliberate; a glowing white window looks like a mistake.",
      framing:"Split the screen into thirds: window on one third, chair on another, a little open space for the eye to wander.",
      mistakes:"Letting the phone brighten for the room and blowing out the window. Always set exposure for the brightest thing you want to keep.",
      capture:{ intro:"One calm, gorgeous shot of the corner. Take it slowly — every move matters.", steps:[
        "Tidy & style the corner — plump cushions, straighten the throw, set one warm prop (cup / book / vase).",
        "Tripod two big steps back, legs low and wide so nothing wobbles.",
        "Phone at chest height, grid on, window edge straight to a gridline.",
        "Tap to the 26mm lens; set white balance 4800 K once.",
        "Watch the histogram; lower ISO until the window stops glowing pure white.",
        "Tap the chair to focus, press-hold to lock, record a slow 8-count via the volume button. Grab a safety take."] },
      inspo:{ label:"Cosy rainy window corner — Google Images", url:"https://www.google.com/search?tbm=isch&q=cosy+rainy+window+corner+interior+cinematic+reel" },
      ideas:["Rattan armchair against a rain-streaked window, deodars blurred outside.","A made bed using the window as a headboard, mist beyond.","A window-seat with a folded blanket, valley fog rolling behind."] },
    { name:"Shot B · The detail", role:"the intimacy", lens:"52mm",
      purpose:"One warm, tactile close-up — tea, book or throw — that turns a room into a feeling. The shot people save.",
      settings:[{t:"Lens",v:"52mm",sub:"sensor crop"},{t:"White balance",v:"4800 K",sub:"match A"},{t:"ISO",v:"400–640",sub:"closer, dimmer",lever:true},{t:"Shutter",v:"1/50",sub:"locked"},{t:"Aperture",v:"f1.6",sub:"fixed"},{t:"Frame rate",v:"24 fps"},{t:"Height",v:"subject level"},{t:"Distance",v:"~0.4–0.6m"},{t:"Record",v:"6 sec"}],
      brightness:"Closer, softer light — nudge ISO up a little but keep the shiniest spot (cup rim, steam) glowing, not burnt white.",
      framing:"Detail slightly off-centre with the soft window glow behind it, so it stands out instead of blending in.",
      mistakes:"Getting so close the 52mm can't focus — back up a few centimetres.",
      capture:{ intro:"Crouched by the sill for one tiny, cosy detail — the kind that makes someone go 'aww.'", steps:[
        "Style one hero prop (steaming cup / open book / throw); wipe off dust — this close the camera sees everything.",
        "Place it in the window light, turned so light skims across it from the side (that side-light brings out texture).",
        "52mm lens, white balance 4800 K to match Shot A.",
        "Kneel level with the object, about an arm's length away.",
        "ISO ~400–640; keep the brightest spot glowing, not pure white.",
        "Tap exactly where you want sharp, lock, film a slow 6s with gentle motion (steam / candle / rain). Twice."] },
      inspo:{ label:"Steaming chai by rainy window — Google Images", url:"https://www.google.com/search?tbm=isch&q=steaming+chai+cup+rainy+window+detail+cinematic+macro" },
      ideas:["Steam curling off fresh chai on the sill.","Open book and glasses resting on a knitted throw.","Raindrops on glass with a warm brass lamp glowing in front."] },
    { name:"Shot C · Open it up", role:"the breath", lens:"13mm",
      purpose:"An ultra-wide showing how the room wraps the window so a viewer pictures themselves inside. Loops back to Shot A.",
      settings:[{t:"Lens",v:"13mm",sub:"ultra-wide"},{t:"White balance",v:"4800 K",sub:"match"},{t:"ISO",v:"200–320",sub:"more window in frame",lever:true},{t:"Shutter",v:"1/50",sub:"locked"},{t:"Aperture",v:"f1.6",sub:"fixed"},{t:"Frame rate",v:"24 fps"},{t:"Height",v:"waist ~1.0m"},{t:"Distance",v:"~1m from corner"},{t:"Record",v:"7 sec"}],
      brightness:"More bright window fills a wide shot, so it blows out faster — drop ISO until the glass keeps its detail.",
      framing:"Keep upright lines (door & window edges) actually upright. Lens Correction helps; how you point the phone matters more.",
      mistakes:"Too much ceiling or floor, or standing so close the room looks bent. Step back, keep the phone level.",
      capture:{ intro:"Back into a corner to show the whole room at once — the 'imagine staying here' shot.", steps:[
        "Final tidy of the whole room — a wide shows every stray mess.",
        "Tuck into a corner ~1m out, phone at waist height and dead level.",
        "13mm lens, white balance 4800 K (Lens Correction quietly straightens the wide-angle bend).",
        "Line a door/window edge to a gridline; don't tip the phone up or down.",
        "Lower ISO until the window holds its detail.",
        "Tap the chair back to focus, lock, film a slow 7s. Safety take."] },
      inspo:{ label:"Cosy Himalayan room interior wide — Google Images", url:"https://www.google.com/search?tbm=isch&q=cosy+himalayan+homestay+room+window+interior+wide+cinematic" },
      ideas:["Corner showing two walls and the rainy window.","Window-seat nook with the valley beyond.","Reading corner with lamp glow against grey daylight."] }
  ],
  editing:["Import the 3 clips; set a 1080×1920 vertical, 24 fps timeline.","Trim each to its calmest 2–3s; order A → B → C.","Match cuts on stillness; keep it 8–10s and loop-friendly (end near Shot A).","Lay gentle ambience (rain / room tone) under everything."],
  color:["Balance to neutral first (set a white point on a known white).","Warm it slightly toward the 4800 K mood; lift shadows gently, never crush.","Check scopes — keep the window off the top; protect the highlights.","Match all three shots to one consistent look."],
  audio:["Lay a soft rain / room-tone bed at a low level.","Duck it under any music; keep it felt, not loud.","Target around −18 dBFS average; no clipping."],
  exportNote:"Use the one-time Instagram master recipe (H.264 MP4, 1080×1920, match 24 fps, ~20 Mbps, AAC 320 / 48 k). Never let highlights clip.",
  monetization:"This is the core homestay 'cosy room' clip — the unit that sells a stay. On a package it's the portfolio anchor and the proof a homestay needs to say yes to a shoot.",
  pricing:{ quote:"Starter homestay reel: ₹6,000–10,000 (3–5 cosy clips + 1 reel).", upsell:"Add a detail / food set, or a 5-beat formula reel.", retainer:"Monthly 'fresh reel' retainer once they see bookings move." },
  deliverables:[{id:"hero",label:"Hero reel (8–10s)"},{id:"verticals",label:"3 vertical clips (A / B / C)"},{id:"stills",label:"2–3 photography pulls"},{id:"caption",label:"Caption + hashtags"},{id:"casestudy",label:"Portfolio case study"},{id:"cdreview",label:"Creative Director review"}],
  skills:[{skillId:"blackmagic-camera",toStage:"Practiced"},{skillId:"lighting",toStage:"Introduced"},{skillId:"composition",toStage:"Introduced"},{skillId:"hotel-cinematography",toStage:"Introduced"}],
  bibleUpdates:[{bibleId:"camera",note:"Confirm per-shoot ISO ranges for dim interiors."},{bibleId:"lighting",note:"Window-as-softbox on overcast monsoon days."},{bibleId:"hotel",note:"The 'cosy corner' as the homestay hero clip."}],
  research:[{platform:"Google Images",query:"cosy rainy window corner interior cinematic reel"},{platform:"Instagram",query:"himachalhomestay"},{platform:"Pinterest",query:"boutique homestay window nook"}],
  reflection:["Did protecting the highlights cost a friendlier image — was it worth it?","Which single frame would make YOU book this stay?"],
  reviewQuestions:["Is the window detail held in all three shots?","Does it loop cleanly?","Would a paying homestay frame this?"],
  links:["bible:camera","bible:lighting","bible:hotel","skill:blackmagic-camera"]
};

/* ---------- planned slots (deep authoring = future units) ---------- */
function stub(id,order,phase,title,blurb,businessType,skills){
  return { id:id, order:order, phase:phase, status:"planned", title:title, blurb:blurb, businessType:businessType, skills:(skills||[]).map(function(s){return {skillId:s};}) };
}
NS.curriculum = [ P01,
  stub("p02",2,"s1","The café morning","An independent café — first light, the signature drink, the regulars' ritual.","Café",["food-cinematography","lighting","restaurant-marketing"]),
  stub("p03",3,"s1","The full stay story","A homestay's complete arrival → view → room → detail → host reel.","Homestay",["hotel-cinematography","editing","hospitality-psychology"]),
  stub("p04",4,"s2","Boutique hotel hero","A boutique hotel's hero property film + a room set for the website & Google Business.","Boutique hotel",["hotel-cinematography","creative-direction","client-communication"]),
  stub("p05",5,"s2","Restaurant table-top","A restaurant's signature-dish story + menu hero stills.","Restaurant",["food-cinematography","restaurant-marketing","pricing"]),
  stub("p06",6,"s2","The calm transformation","A salon / spa reel that sells care and transformation, not a service list.","Salon / spa",["creative-direction","hospitality-psychology","sales"]),
  stub("p07",7,"s3","Mountain resort brand film","A premium resort brand film with ground + sub-250g aerials.","Resort",["hotel-cinematography","colour","luxury-positioning"]),
  stub("p08",8,"s3","Tea estate experience","A tea estate / apple orchard destination-experience film.","Destination",["creative-direction","composition","luxury-positioning"]),
  stub("p09",9,"s3","Venue as experience","A wedding venue sold as a premium experience, not a hall.","Wedding venue",["hotel-cinematography","hospitality-psychology","negotiation"]),
  stub("p10",10,"s4","The content retainer","A multi-property monthly content system — one shoot day, many assets.","Retainer",["agency-operations","editing","client-communication"]),
  stub("p11",11,"s4","The signature look","A luxury brand collaboration delivering a reusable house grade / LUT.","Luxury brand",["colour","creative-direction","luxury-positioning"]),
  stub("p12",12,"s4","Studio handoff","Train an editor on the SOPs and deliver the standard without you.","Studio",["agency-operations","client-communication","pricing"])
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
