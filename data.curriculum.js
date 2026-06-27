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
  { id:"s4", label:"Stage 4 · Studio & scale",       accent:"var(--c3)", icon:"i-users",  blurb:"Multi-deliverable systems, trained editors, agency operations." },
  { id:"s5", label:"Stage 5 · Authority & expansion",accent:"var(--c5)", icon:"i-flag",   blurb:"Destination campaigns, brand collaborations, teaching, and the studio showreel." }
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
  editing:{ page:"Cut / Edit page · grounded in The Editor (Resolve 20/21)",
    intro:"Three clips into one calm, loop-friendly 8–10s reel — re-taught from the Editor guide, not copied. Verify menu names against your Resolve 21 build.",
    steps:[
      "**Make the project & set it vertical.** New project; set the timeline resolution to **1080×1920** (9:16). *(Editor: 'Building the Rough Cut → Setting Up a Project'; 'Project Organization → Creating a New Project'.)*",
      "**Import the three clips** into the Media Pool. *(Editor: 'Importing Media'.)*",
      "**Append them A → B → C.** Select a clip and press **F12** to append it to the end. *(Editor: 'Insert and Append at End Edits'.)*",
      "**Trim to the best 2–3 seconds each.** Set an in/out with **I** and **O**, or blade with **B** and delete the rest. *(Editor: 'Trimming the Timeline Clips'.)*",
      "**Pace it** to a calm 8–10s total — hold a shot only as long as it stays interesting.",
      "**Make it loop:** end on a frame close to Shot A so the reel cycles seamlessly."
    ],
    grid:[{t:"Play / stop",v:"Space"},{t:"Shuttle",v:"J  K  L"},{t:"In / out",v:"I   O"},{t:"Blade",v:"B"},{t:"Append",v:"F12"},{t:"Undo",v:"Ctrl/⌘ Z",lever:true}],
    note:"The Cut page's smart trimming is the fastest way to top-and-tail clips when you're new — get comfortable there before graduating to the Edit page's precision trims." },
  color:{ page:"Color page · Primaries · grounded in The Colorist",
    intro:"Today is one clean, honest balance — creative looks come later. A natural, well-exposed grade is what makes a property read as premium.",
    steps:[
      "**Open the Color page and turn on the Waveform / Parade scopes.** *(Colorist: 'Balancing Footage → Understanding the Grading Workflow'.)*",
      "**Add a serial node** (**Alt/⌥ S**) so the grade is non-destructive.",
      "**Set black & white points.** Use **Lift** to sit the darkest shadow just above 0, and **Gain** to bring the brightest highlight near — but never past — the top of the scope. *(Colorist: 'Primary Grading with Color Wheels'.)*",
      "**Fine-tune the midtones** with a gentle S-curve if they feel flat. *(Colorist: 'Precision Grading with Curves'.)*",
      "**Match the three shots** so they feel like one room — line up wood and skin tones across clips on the Parade."
    ],
    grid:[{t:"Add serial node",v:"Alt/⌥ S"},{t:"Toggle node",v:"Ctrl/⌘ D"},{t:"Watch",v:"Waveform · Parade",lever:true}],
    note:"The Parade's top must stop short of clipping — if it flattens against the ceiling, the window detail is already gone.", noteType:"warn" },
  audio:{ page:"Edit / Fairlight page · grounded in Mixing Audio",
    intro:"The simplest soundtrack: a single music bed at the right level, with a soft room-tone whisper beneath it.",
    steps:[
      "**Import a licensed / royalty-free track** you can legally post into the Media Pool. *(Audio: 'Importing Audio Files and Creating a Timeline'.)*",
      "**Drop it on an audio track** under your clips and trim it to length. *(Audio: 'Marking and Adding Music to the Timeline'.)*",
      "**Set the level** in the Inspector so the music supports the picture without shouting. *(Audio: 'Changing Clip Volume Levels in the Inspector'.)*",
      "**Lay a soft rain / room-tone bed** beneath, ducked under the music — felt, not loud.",
      "**Add a short fade in and out** by dragging the fade handles at each end of the clip."
    ],
    grid:[{t:"Music peaks",v:"≈ −6 dB",sub:"on the meter",lever:true},{t:"Never exceed",v:"0 dB",sub:"no clipping"},{t:"Target loudness",v:"≈ −14 LUFS",sub:"IG-friendly"}],
    note:"Instagram normalises loud uploads down, so mixing around −14 LUFS with peaks near −6 dB keeps the reel punchy but clean." },
  locations:[
    { name:"Café Simla Times", area:"Mall Road, Shimla", why:"Huge windows with panoramic Himalayan views and colonial-cosy interiors — a ready-made window-corner set.", maps:"https://www.google.com/maps/search/?api=1&query=Cafe+Simla+Times+Mall+Road+Shimla" },
    { name:"Honey Hut Café", area:"near Scandal Point, Shimla", why:"Rustic wooden tables, warm earthy light and valley views — strong for the detail (Shot B) and cosy wides.", maps:"https://www.google.com/maps/search/?api=1&query=Honey+Hut+Cafe+Shimla" },
    { name:"Wake & Bake Café", area:"The Ridge, Shimla", why:"Cosy rooftop and rustic decor overlooking hills — good for warm interiors against an overcast sky.", maps:"https://www.google.com/maps/search/?api=1&query=Wake+and+Bake+Cafe+Shimla" },
    { name:"Mahasu House", area:"Mashobra (~15 km / 45 min)", why:"Boutique homestay with tastefully designed cosy rooms and big mountain views — ideal for the homestay brief.", maps:"https://www.google.com/maps/search/?api=1&query=Mahasu+House+Mashobra" },
    { name:"Hushstays · Jagheri Bagh", area:"Mashobra", why:"Oversized windows framing the hills and a cosy library nook — the exact 'window-seat with a book' frame.", maps:"https://www.google.com/maps/search/?api=1&query=Hushstays+Jagheri+Bagh+Mashobra" }
  ],
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
  /* Stage 1 · First assets */
  stub("p02",2,"s1","The café morning","An independent café — first light, the signature drink, the regulars' ritual.","Café",["food-cinematography","lighting","restaurant-marketing"]),
  stub("p03",3,"s1","The full stay story","A homestay's complete arrival → view → room → detail → host reel.","Homestay",["hotel-cinematography","editing","hospitality-psychology"]),
  stub("p04",4,"s1","The detail & texture set","A set of tactile detail clips — wood, brass, ceramic, linen, steam — reusable B-roll.","Homestay / café",["composition","lighting","food-cinematography"]),
  stub("p05",5,"s1","The signature drink","A single hero drink film — pour, steam, garnish — for a café's menu and socials.","Café",["food-cinematography","editing","lighting"]),
  stub("p06",6,"s1","Your first pitch reel","Cut your own showreel from these assets — the thing that wins the first client.","Studio",["editing","creative-direction","client-communication"]),
  /* Stage 2 · First paying clients */
  stub("p07",7,"s2","Boutique hotel hero","A boutique hotel's hero property film + a room set for the website & Google Business.","Boutique hotel",["hotel-cinematography","creative-direction","client-communication"]),
  stub("p08",8,"s2","Restaurant table-top","A restaurant's signature-dish story + menu hero stills.","Restaurant",["food-cinematography","restaurant-marketing","pricing"]),
  stub("p09",9,"s2","The calm transformation","A salon / spa reel that sells care and transformation, not a service list.","Salon / spa",["creative-direction","hospitality-psychology","sales"]),
  stub("p10",10,"s2","Room-by-room set","A hotel's full set of room-type films for OTAs and direct bookings.","Boutique hotel",["hotel-cinematography","editing","client-communication"]),
  stub("p11",11,"s2","The menu film","A restaurant's full menu brought to life — dish films + photography.","Restaurant",["food-cinematography","composition","pricing"]),
  stub("p12",12,"s2","The host story","The owner / host on camera — the trust-builder that sells a small stay.","Homestay",["hospitality-psychology","sound","client-communication"]),
  /* Stage 3 · Premium & retainers */
  stub("p13",13,"s3","Mountain resort brand film","A premium resort brand film with ground + sub-250g aerials.","Resort",["hotel-cinematography","colour","luxury-positioning"]),
  stub("p14",14,"s3","Tea estate experience","A tea estate destination-experience film — landscape, ritual, craft.","Destination",["creative-direction","composition","luxury-positioning"]),
  stub("p15",15,"s3","Venue as experience","A wedding venue sold as a premium experience, not a hall.","Wedding venue",["hotel-cinematography","hospitality-psychology","negotiation"]),
  stub("p16",16,"s3","The seasonal refresh","A retainer-style seasonal content drop for an existing client.","Retainer",["editing","creative-direction","client-communication"]),
  stub("p17",17,"s3","The spa ritual film","A luxury spa ritual — slow, sensorial, restraint-led.","Spa",["lighting","creative-direction","luxury-positioning"]),
  stub("p18",18,"s3","Apple orchard harvest","A Himachal apple orchard harvest story — destination & produce branding.","Destination",["composition","creative-direction","food-cinematography"]),
  /* Stage 4 · Studio & scale */
  stub("p19",19,"s4","The content retainer system","A multi-property monthly content system — one shoot day, many assets.","Retainer",["agency-operations","editing","client-communication"]),
  stub("p20",20,"s4","The signature look","A reusable house grade / LUT and a look-book for consistent delivery.","Studio",["colour","creative-direction","luxury-positioning"]),
  stub("p21",21,"s4","Studio handoff","Train an editor on the SOPs and deliver the standard without you.","Studio",["agency-operations","client-communication","pricing"]),
  stub("p22",22,"s4","The pitch deck reel","A sales asset — the deck + reel that closes premium clients.","Studio",["sales","creative-direction","pricing"]),
  stub("p23",23,"s4","The case-study system","A repeatable case-study template that turns every job into new business.","Studio",["agency-operations","client-communication","sales"]),
  /* Stage 5 · Authority & expansion */
  stub("p24",24,"s5","The destination campaign","A multi-property campaign positioning a whole area as a premium destination.","Destination",["creative-direction","luxury-positioning","agency-operations"]),
  stub("p25",25,"s5","The brand collaboration","A luxury brand collaboration delivering co-branded films.","Luxury brand",["luxury-positioning","creative-direction","negotiation"]),
  stub("p26",26,"s5","The tourism board pitch","A pitch to a tourism board / association for ongoing destination work.","Institution",["sales","negotiation","client-communication"]),
  stub("p27",27,"s5","Teaching others","Package the system as a workshop / course — teach to deepen mastery.","Studio",["agency-operations","creative-direction","sales"]),
  stub("p28",28,"s5","The studio showreel","The flagship showreel — the studio's signature, refreshed yearly.","Studio",["editing","creative-direction","luxury-positioning"])
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
