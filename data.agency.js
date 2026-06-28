/* ============================================================
   North Stories OS — data.agency.js
   Unit: Agency Brain v1.0
   Pricing, sales, scripts, outreach, paperwork. The playbooks and
   copy-paste templates that turn talent into a business. India /
   Himachal context; WhatsApp-first; prices in ₹ and illustrative.
   ============================================================ */
window.NS = window.NS || {};

NS.agencySections = [
  { id:"pricing",   label:"Pricing",        icon:"i-cash",  accent:"var(--c2)" },
  { id:"sales",     label:"Sales",          icon:"i-users", accent:"var(--c1)" },
  { id:"messaging", label:"Scripts & email",icon:"i-doc",   accent:"var(--c3)" },
  { id:"outreach",  label:"Outreach",       icon:"i-bag",   accent:"var(--c4)" },
  { id:"paperwork", label:"Paperwork",      icon:"i-list",  accent:"var(--c5)" }
];

NS.agency = [
  { id:"pricing-philosophy", section:"pricing", title:"Pricing philosophy",
    body:"Price on the **value to the client's business**, not your hours. A reel that fills a homestay's calendar is worth far more than the time it took.\n\n• **Anchor high**, then offer a smaller option — never open with your cheapest.\n• **Never be the cheapest** — that attracts the worst clients and kills your margin.\n• **Raise your rates** as the portfolio and saved-post counts grow; proof justifies price.\n• Sell **outcomes** (more bookings, higher perceived value), not deliverables (a 30-second clip).",
    templates:[], links:["bible:pricing","skill:pricing"] },

  { id:"package-tiers", section:"pricing", title:"Package tiers (starter menu)",
    body:"Illustrative Himachal hospitality pricing — adjust to property and season:\n\n• **Starter reel — ₹6,000–10,000:** 3–5 cosy clips + one finished reel. The foot in the door.\n• **Property set — ₹15,000–30,000:** full property/room coverage, hero reel + cutdowns + photo pulls + captions.\n• **Monthly retainer — ₹20,000–50,000/mo:** one shoot day, a steady stream of fresh content. The goal — recurring revenue.\n\nAlways present **three** options; most clients pick the middle.",
    templates:[], links:["bible:pricing"] },

  { id:"discovery", section:"sales", title:"Discovery call framework",
    body:"**Listen → diagnose → show → scope → price → recap.**\n\n1. Ask about the **business goal** (more direct bookings? higher rates?), not the video.\n2. Diagnose what their current content is missing and what a premium look would do for them.\n3. Show one relevant case study — don't tell, show.\n4. Scope out loud: deliverables, timeline, what you need from them.\n5. Price on value; present the package; then stop talking.\n6. Send a short written recap the same day.",
    templates:[], links:["bible:sales","sop:client-call","skill:client-communication"] },

  { id:"objections", section:"sales", title:"Objection handling",
    body:"Common objections and calm responses:\n\n• **\"It's too expensive.\"** → \"Compared to what? One extra booking a month covers this. What's a room-night worth to you?\"\n• **\"We'll just shoot it ourselves.\"** → \"You can — and a phone in good hands is fine. The difference is whether it looks like the premium place you actually are.\"\n• **\"Send us some samples first.\"** → Share the portfolio, not free work. \"Here's the standard — happy to do a small paid pilot.\"\n• **\"Let me think about it.\"** → \"Of course. What's the one thing you're unsure about?\" — surface the real objection.",
    templates:[], links:["bible:negotiation","bible:sales"] },

  { id:"hold-rate", section:"sales", title:"Holding your rate",
    body:"Talent gets the meeting; nerve gets the cheque.\n\n• After you state the price, **stay silent** — don't fill the gap with a discount.\n• If pushed, **trade scope for price** (remove a deliverable) rather than just dropping the number.\n• Offer a **smaller package**, never a cheaper version of the big one.\n• Walk away from clients who only want the lowest price — they damage the standard and the margin.",
    templates:[], links:["bible:negotiation","bible:pricing"] },

  { id:"whatsapp", section:"messaging", title:"WhatsApp scripts",
    body:"India runs on WhatsApp — keep it warm, short, and specific. Replace the [brackets].",
    templates:[
      { name:"First contact", body:"Hi [Name], I'm Bhanu — I make cinematic reels for boutique stays & cafés around Shimla. I came across [Business] and loved [specific detail]. I'd love to make a short reel that shows it off — would you be open to a quick chat this week?" },
      { name:"Follow-up (no reply)", body:"Hi [Name], just floating this back up 🙂 I put together a quick idea for a [Business] reel — happy to share it whenever you have a minute. No rush!" },
      { name:"Soft close", body:"Thanks [Name]! To lock it in: I'd come [date], shoot ~1 hour, and deliver [deliverables] by [date] for [₹]. Shall I block the date?" }
    ], links:["skill:client-communication","bible:sales"] },

  { id:"email", section:"messaging", title:"Email templates",
    body:"For more formal clients (hotels, resorts). Keep it tight and outcome-led.",
    templates:[
      { name:"Cold intro", body:"Subject: A premium reel for [Business]\n\nHi [Name],\n\nI'm Bhanu — I make cinematic visuals for Himachal hospitality brands. [Business] has [specific strength], and the right reel would help it read as premium to travellers deciding where to book.\n\nCould I send over a short idea and a couple of examples?\n\nBest,\nBhanu" },
      { name:"Proposal", body:"Subject: Proposal — [Business] reel\n\nHi [Name],\n\nGreat speaking with you. Here's what I propose:\n\n• Scope: [deliverables]\n• Shoot: [date], ~[time]\n• Delivery: [date]\n• Investment: ₹[amount]\n\nThis is built to [business outcome]. Happy to adjust scope. Shall we lock the date?\n\nBest,\nBhanu" },
      { name:"Delivery", body:"Subject: Your [Business] reel is ready ✨\n\nHi [Name],\n\nHere's your finished set: [link]. It includes [deliverables]. Suggested caption inside.\n\nIf it helps fill the calendar, I run a monthly content option that keeps your feed fresh — happy to share. And if you're pleased, a short testimonial would mean a lot.\n\nBest,\nBhanu" },
      { name:"Testimonial request", body:"Hi [Name], so glad you loved it! Would you mind a one-line testimonial I can share — what it was like working together and any result you noticed? Thank you!" }
    ], links:["skill:client-communication"] },

  { id:"cold-outreach", section:"outreach", title:"Cold outreach playbook",
    body:"Warm > cold. Engage genuinely before pitching.\n\n• Build a **target list** from the Location Library (cafés, homestays, resorts worth filming).\n• Follow them, like, leave a real comment for a few days before DMing.\n• Lead with a **specific compliment** and a **specific idea**, not a generic pitch.\n• Send the portfolio link, never free work.\n• Follow up **once**, politely; then move on and circle back next season.",
    templates:[
      { name:"Instagram DM", body:"Hi [Business] 👋 Your [specific detail] is gorgeous. I make cinematic reels for boutique Himachal stays & cafés — I had a quick idea for how to show yours off. Mind if I send it over?" }
    ], links:["bible:sales","skill:sales"] },

  { id:"invoice", section:"paperwork", title:"Invoice essentials",
    body:"Keep it simple and professional. Take a **deposit** (often 50%) before the shoot.\n\nInclude: your name/studio + contact, the client's details, invoice number + date, a clear line-item of deliverables, the amount, GST if applicable, payment terms (e.g. 50% advance / 50% on delivery), and UPI/bank details.",
    templates:[
      { name:"Invoice template", body:"NORTH STORIES — INVOICE\nInvoice #: [NSO-0001]   Date: [date]\n\nBill to: [Client / Business], [location]\n\nItem                                   Amount\n[Hero reel + 3 cutdowns]              ₹[amount]\n[Photography pulls]                   ₹[amount]\n----------------------------------------------\nSubtotal                              ₹[amount]\nGST [if applicable]                   ₹[amount]\nTOTAL                                 ₹[amount]\n\nTerms: 50% advance, 50% on delivery.\nPay to: [UPI ID] / [Bank a/c, IFSC]\nThank you!" }
    ], links:["skill:agency-operations","bible:agency"] },

  { id:"contract", section:"paperwork", title:"Contract essentials",
    body:"Even a one-page agreement protects the relationship. Cover: **scope** (exact deliverables), **timeline**, **fee + payment terms**, **revisions** (e.g. one round included), **usage rights** (where they can use it), **cancellation** (deposit non-refundable), and **credit** (you may showcase the work in your portfolio).\n\nNot legal advice — adapt and, for big jobs, have a professional review it.",
    templates:[
      { name:"One-page agreement (skeleton)", body:"AGREEMENT — North Stories & [Client]\nDate: [date]\n\n1. Scope: [exact deliverables].\n2. Timeline: shoot [date]; delivery by [date].\n3. Fee: ₹[amount]. Terms: 50% advance (non-refundable), 50% on delivery.\n4. Revisions: one round included; further rounds ₹[amount].\n5. Usage: client may use deliverables for [their own marketing]. Resale/transfer not included.\n6. Portfolio: North Stories may feature the work in its portfolio & socials.\n7. Cancellation: advance is non-refundable; rescheduling once at no cost.\n\nSigned: ____________   /   ____________" }
    ], links:["skill:agency-operations","bible:agency"] }
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
