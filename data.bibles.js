/* ============================================================
   North Stories OS — data.bibles.js
   Unit: Knowledge Base Structure v1.0
   The permanent source of truth. Projects UPDATE these; they
   never duplicate them. Over time each Bible becomes part of
   the agency's operating manual.
   Schema: Data Models v1.1 adds Bible.category (additive).
   Deep per-Bible authoring ships as later approved units.
   Seeded now: Camera & Blackmagic Bible (real, from your setup).
   ============================================================ */
window.NS = window.NS || {};

NS.bibleCategories = [
  { id:"craft",       label:"Craft",        accent:"var(--c1)", blurb:"How the work is made." },
  { id:"hospitality", label:"Hospitality",  accent:"var(--c4)", blurb:"The businesses we serve." },
  { id:"business",    label:"Business",     accent:"var(--c2)", blurb:"How the studio earns and scales." }
];

NS.bibles = [
  /* ---------- CRAFT ---------- */
  { id:"shot", category:"craft", title:"Shot Bible", icon:"i-camera", accent:"var(--c1)",
    blurb:"Every shot type that sells a space — establishing, detail, hero, transition — and when to reach for each.",
    tags:["shots","coverage","sequence"], links:["bible:composition","bible:camera"], entries:[] },

  { id:"camera", category:"craft", title:"Camera & Blackmagic Bible", icon:"i-camera", accent:"var(--c1)",
    blurb:"Your locked Blackmagic Camera setup, the per-shoot dials, and the export recipe. Set once, then only touch the dials.",
    tags:["blackmagic","exposure","settings","export"],
    links:["bible:lighting","bible:colour","bible:davinci"],
    entries:[
      { id:"permanent-setup", title:"Permanent setup — set once, never repeat",
        tags:["setup","hevc","rec709"], links:["bible:colour"],
        body:"These are project-level settings. Configure them on day one across the **Record, Camera, Audio and Monitor** tabs, then leave them. The only things you touch while filming are the per-shoot dials.\n\n**Record**\n• Codec: HEVC (H.265)\n• Resolution: 4K\n• Color Space: Rec.709\n\n**Camera**\n• Vertical Video: On\n• Lock WB on Record: On\n• HDR Video: Off\n• Shutter Measurement: Speed (shows 1/50, not an angle)\n• Flicker Free: 50 Hz (matches Indian mains)\n• Lens Correction: On\n\n**Audio**\n• Format: AAC, Stereo\n• Metering: VU, −18 dBFS\n• Sample Rate: Auto\n\n**Monitor**\n• Focus Assist: Colored Lines, Red\n• Histogram: On\n• Audio Meters: On\n\n**Media**\n• Save clips where Resolve can reach them (export out of the app, or save to Photos / Files)\n• Record Proxy: Off (keep full-quality originals)\n\n**Why these.** HEVC 4K Rec.709 gives clean, gradeable, Instagram-safe footage with no HDR headaches. *Lock WB on Record* stops colour drifting mid-shot. *Flicker Free 50 Hz* matches Indian mains so lights don't strobe. *Focus Assist (red)* plus the histogram are how you nail focus and protect highlights by eye.",
        images:[], references:[], related:["per-shoot-dials","export-recipe"] },

      { id:"per-shoot-dials", title:"Per-shoot dials — the only things that change",
        tags:["exposure","white-balance","iso","frame-rate"], links:["bible:lighting"],
        body:"While filming you only ever touch six things — and two of those stay locked.\n\n• **Lens:** 13 / 26 / 52 mm, chosen per shot\n• **White balance:** set per scene, in Kelvin (keep shots in a scene matching)\n• **ISO:** per shot — read the histogram, protect the highlights\n• **Shutter:** 1/50, locked\n• **Aperture:** f1.6, fixed\n• **Frame rate:** 24 / 30 / 60, chosen per reel\n\n**The rule.** Shutter and aperture never move. With 1/50 and f1.6 locked, **ISO + the ND filter are your only exposure controls** — always expose to protect the highlights. White balance is a *per-scene constant*; ISO/exposure is the *per-shot lever*.\n\n**Frame rate, by intent**\n• **24 fps — cinematic (default):** reveals, interiors, mood.\n• **30 fps — standard:** when a client wants a cleaner, real-time feel.\n• **60 fps — slow-mo:** only when you'll slow it down — pours, steam, fabric, water.\n\nPick the frame rate per reel and be able to say *why*.",
        images:[], references:[], related:["permanent-setup","export-recipe"] },

      { id:"export-recipe", title:"Export master recipe — Instagram Reels (Resolve Deliver)",
        tags:["export","deliver","instagram","h264"], links:["bible:davinci","bible:editing"],
        body:"One render preset for every reel. Build it once in Resolve's **Deliver** page and reuse it forever; only revisit if Instagram changes its specs.\n\n• Format: MP4\n• Codec: H.264 (Native)\n• Resolution: 1080 × 1920 (vertical, match timeline)\n• Frame rate: match timeline (24)\n• Rate control: CBR\n• Bit rate: ~20,000 Kb/s (target 20–25 Mbps)\n• Network optimisation: On\n• Audio: AAC, 320 kbps, 48 kHz, Stereo\n\n**The hard rule on export.** Never let highlights clip — check the scopes before you render. A blown-out window or sky is the fastest way to make a paying property look cheap. To beat Instagram's compression blur: export at the exact size, high bitrate, and never blow the highlights.",
        images:[], references:[], related:["permanent-setup","per-shoot-dials"] },

      /* Field-manual format demonstration entry (BibleEntry schema v1.2) */
      { id:"exposure-histogram", title:"Exposure & the histogram",
        summary:"How to set exposure by eye on the Blackmagic app — protect the highlights first, lift the shadows in the grade.",
        tags:["exposure","histogram","highlights","iso","nd"],
        links:["bible:lighting","bible:colour"],
        sections:{
          definition:"Exposure is how much light reaches the sensor for a given shot. On your locked rig (shutter 1/50, aperture f1.6) the only exposure controls are **ISO** and the **ND filter**. The histogram is the graph of how many pixels fall at each brightness — pure black on the left, pure white on the right.",
          why:"Get exposure wrong and no grade can fully save it. Crushed shadows lose texture; clipped highlights lose detail forever. For paying hospitality work, a blown-out window or sky instantly makes an expensive property look cheap — the fastest way to lose a premium client's trust.",
          firstPrinciples:"Highlights clip hard and unrecoverably; shadows degrade gently and lift well. So when in doubt, **expose for the highlights** and let the shadows sit lower — you can always raise them in Resolve. Rec.709 has limited latitude, so you protect the top end deliberately rather than hoping.",
          standards:"A professional reads the histogram on every setup, not every shot. The right edge should approach but not pile against the wall (no clipping). Skin and key subjects sit in the upper-middle. Focus Assist (red) and the histogram are checked before you hit record — never fixed in the edit.",
          mistakes:"Beginners chase a 'bright' image and clip the windows. They ride ISO up in dark rooms and bury the shot in noise instead of adding light or lowering the ND. They judge exposure on a sunny phone screen instead of the histogram. They expose for the shadows and lose the sky.",
          business:"Consistent, highlight-safe exposure lets you grade a whole shoot to one look quickly — which protects your effective hourly rate and lets you promise a recognisable house style. It also means reshoots (expensive, relationship-damaging) almost never happen.",
          hospitality:"Hotel rooms and cafés are high-dynamic-range nightmares: bright windows, dim interiors. Expose to hold the window view (the 'dream' the guest is buying), then add a little light or accept moodier shadows inside. For food, protect the specular highlights on sauces and glassware — that sheen is the appetite signal.",
          implementation:"1) Frame and lock focus (red peaking). 2) Glance at the histogram. 3) If the right edge clips, add ND or lower ISO until it just clears the wall. 4) If the image is muddy and the highlights have room, raise ISO modestly. 5) Re-check after any lighting or framing change. 6) When a window is unavoidably brighter than the room, decide on purpose — hold it or blow it for a high-key look, never by accident."
        },
        exercises:[
          "Shoot the same café corner three ways: exposed for the window, for the room, and a compromise. Compare which feels most premium.",
          "In a dim interior, fix the exposure two ways — once by raising ISO, once by adding a single light. Note the noise difference."
        ],
        observationExercises:[
          "For three days, study every hospitality reel you admire and decide where they let highlights fall. Are windows held or blown?",
          "Walk into one café and one hotel lobby; find the highest-contrast view in each. Where would you place exposure?"
        ],
        reflection:[
          "When did protecting the highlights cost you a brighter, friendlier image — and was it worth it?",
          "Which is more 'you': holding every window, or embracing bright, high-key rooms?"
        ],
        cameraRefs:["per-shoot-dials","permanent-setup"],
        crossLinks:["lighting","colour"],
        references:[], related:["per-shoot-dials"] }
    ]},

  { id:"lighting", category:"craft", title:"Lighting Bible", icon:"i-sun", accent:"var(--c1)",
    blurb:"Reading and shaping light for interiors, food, faces and product — window-first, restrained, premium.",
    tags:["light","window","interiors","food"], links:["bible:camera","bible:composition"], entries:[] },

  { id:"composition", category:"craft", title:"Composition Bible", icon:"i-grid", accent:"var(--c1)",
    blurb:"Framing that reads as premium: balance, leading lines, negative space, depth and order.",
    tags:["framing","balance","depth"], links:["bible:shot","bible:lighting"], entries:[] },

  { id:"colour", category:"craft", title:"Colour & Grading Bible", icon:"i-palette", accent:"var(--c1)",
    blurb:"Palette, mood and a repeatable grade that feels inevitable, never loud.",
    tags:["colour","grade","mood"], links:["bible:davinci","bible:camera"], entries:[] },

  { id:"sound", category:"craft", title:"Sound Bible", icon:"i-mic", accent:"var(--c1)",
    blurb:"Capturing and designing audio that makes hospitality feel alive — room tone, ritual, restraint.",
    tags:["audio","sound-design","ambience"], links:["bible:editing"], entries:[] },

  { id:"editing", category:"craft", title:"Editing Bible", icon:"i-film", accent:"var(--c1)",
    blurb:"Pacing, rhythm and structure for reels that hold attention to the last frame.",
    tags:["edit","pacing","structure"], links:["bible:sound","bible:davinci"], entries:[] },

  { id:"davinci", category:"craft", title:"DaVinci Resolve Bible", icon:"i-film", accent:"var(--c1)",
    blurb:"Only the Resolve concepts each project needs — learned, then applied to footage you just shot.",
    tags:["resolve","workflow","grade","deliver"], links:["bible:colour","bible:editing","bible:camera"], entries:[] },

  /* ---------- HOSPITALITY ---------- */
  { id:"hotel", category:"hospitality", title:"Hotel & Stay Bible", icon:"i-building", accent:"var(--c4)",
    blurb:"What makes a stay feel luxurious on camera — arrival, space, light, ritual — and what quietly cheapens it.",
    tags:["hotel","boutique","stay","airbnb"], links:["bible:luxury","bible:psychology"], entries:[] },

  { id:"restaurant", category:"hospitality", title:"Restaurant & Café Bible", icon:"i-coffee", accent:"var(--c4)",
    blurb:"Filming food, ambience and ritual for cafés and restaurants so they feel worth the trip.",
    tags:["cafe","restaurant","food"], links:["bible:lighting","bible:luxury"], entries:[] },

  { id:"salon", category:"hospitality", title:"Salon & Spa Bible", icon:"i-heart", accent:"var(--c4)",
    blurb:"Calm, clean, sensorial — selling transformation and care without clichés.",
    tags:["salon","spa","wellness"], links:["bible:psychology","bible:luxury"], entries:[] },

  { id:"wedding", category:"hospitality", title:"Wedding & Venue Bible", icon:"i-star", accent:"var(--c4)",
    blurb:"Destination venues and events as premium experiences buyers will pay to remember.",
    tags:["wedding","venue","events"], links:["bible:hotel","bible:luxury"], entries:[] },

  { id:"psychology", category:"hospitality", title:"Hospitality Psychology Bible", icon:"i-bulb", accent:"var(--c4)",
    blurb:"Why guests choose, trust and pay more — the emotions behind every booking.",
    tags:["psychology","trust","desire"], links:["bible:consumer","bible:luxury"], entries:[] },

  { id:"luxury", category:"hospitality", title:"Luxury Branding Bible", icon:"i-star", accent:"var(--c4)",
    blurb:"The visual grammar of luxury: restraint, consistency, materials, space and time.",
    tags:["luxury","branding","restraint"], links:["bible:colour","bible:composition"], entries:[] },

  /* ---------- BUSINESS ---------- */
  { id:"sales", category:"business", title:"Sales Bible", icon:"i-cash", accent:"var(--c2)",
    blurb:"Turning interest into booked, paying hospitality clients — discovery to close.",
    tags:["sales","discovery","close"], links:["bible:pricing","bible:negotiation"], entries:[] },

  { id:"pricing", category:"business", title:"Pricing Bible", icon:"i-cash", accent:"var(--c2)",
    blurb:"Pricing on the value delivered to the business, never on hours.",
    tags:["pricing","value","packages"], links:["bible:sales"], entries:[] },

  { id:"negotiation", category:"business", title:"Negotiation Bible", icon:"i-users", accent:"var(--c2)",
    blurb:"Holding rate and scope while keeping the relationship warm.",
    tags:["negotiation","scope","objections"], links:["bible:sales","bible:pricing"], entries:[] },

  { id:"consumer", category:"business", title:"Indian Consumer Psychology Bible", icon:"i-bulb", accent:"var(--c2)",
    blurb:"How Indian — and specifically Himachali — hospitality buyers actually decide.",
    tags:["india","buyers","trust"], links:["bible:psychology","bible:sales"], entries:[] },

  { id:"agency", category:"business", title:"Agency & SOP Bible", icon:"i-list", accent:"var(--c2)",
    blurb:"The repeatable systems that let the studio scale beyond you.",
    tags:["agency","sop","systems"], links:["bible:sales","bible:pricing"], entries:[] },

  { id:"mistakes", category:"business", title:"Mistakes Bible", icon:"i-warn", accent:"var(--c2)",
    blurb:"Every error logged once, so it never costs a client twice.",
    tags:["mistakes","lessons","prevention"], links:[], entries:[] }
];

/* notify engine if it has already initialised */
if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
