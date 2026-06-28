/* ============================================================
   North Stories OS — data.locations.js
   Unit: Location Library v1.0
   Himachal, mapped for shoots and clients. Each location is a
   scouting brief: light, weather, architecture, the businesses
   worth filming, and future clients. Verify access & permission
   before filming any private business.
   ============================================================ */
window.NS = window.NS || {};

function loc(o){ o.maps = o.maps || ("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(o.name+" Himachal Pradesh")); return o; }

NS.locations = [
  loc({ id:"shimla", name:"Shimla", region:"Capital · ~2,200 m",
    blurb:"Colonial hill-station core — Mall Road, the Ridge, Scandal Point — dense with cafés and heritage façades.",
    light:"Crisp high-altitude daylight; harsh midday in clear months, gorgeous soft light on overcast monsoon afternoons.",
    goldenHour:"Long golden hour off the Ridge looking west; warm light on the colonial timber façades.",
    sunrise:"Sunrise over the eastern ranges from Jakhoo; mist often fills the valleys below.",
    fog:"Frequent monsoon and winter fog rolling through the deodars — a free atmosphere machine.",
    architecture:"British colonial: timber-framed, gabled roofs, Gothic Christ Church, the Gaiety Theatre, tin roofs and stone.",
    roads:"Mall Road is pedestrian-only (no vehicles) — plan carry-in gear; steep lanes everywhere.",
    parking:"Cart Road / Lift parking; then walk or take the lift up to the Mall.",
    permissions:"Mall Road is public but photography of shops needs the owner's nod; some heritage interiors restrict tripods.",
    restaurants:["Café Simla Times (Mall Road)","Honey Hut Café (Scandal Point)","Wake & Bake Café (The Ridge)"],
    hotels:["Heritage hotels along the Ridge","Boutique stays on the upper Mall"],
    luxuryBiz:["Heritage hotels","Boutique cafés","Artisan & woollens boutiques"],
    futureClients:["Mall Road cafés","Heritage hotels","Boutique retailers"],
    shoots:["Cosy café window-corner reel","Foggy Ridge golden-hour walk","Colonial façade detail set"],
    gps:"31.1048, 77.1734", links:["bible:hotel","bible:restaurant","bible:luxury"] }),

  loc({ id:"mashobra", name:"Mashobra", region:"~13 km from Shimla · ~2,150 m",
    blurb:"Quiet orchard-and-forest belt above Shimla — boutique homestays, big valley views, far calmer than the Mall.",
    light:"Clean forest light through deodar and oak; soft, diffused on cloudy days — ideal for warm interiors.",
    goldenHour:"Spectacular golden hour over apple orchards and the valley; long shadows through the trees.",
    sunrise:"Open eastern views; sunrise over layered ridgelines with valley fog beneath.",
    fog:"Low cloud and fog drift through the orchards in monsoon — premium 'dreamy stay' atmosphere.",
    architecture:"Modern boutique homestays with big glazing, timber and stone; orchard cottages.",
    roads:"Winding forest roads; The Prospect / Craignano drives are scenic and filmable.",
    parking:"On-property at most homestays; limited roadside.",
    permissions:"Mostly private stays — arrange access with owners; orchards may be private land.",
    restaurants:["Homestay in-house kitchens","Café stops toward Naldehra"],
    hotels:["Mahasu House (boutique homestay)","Hushstays · Jagheri Bagh","The Oberoi Wildflower Hall (nearby Charabra)"],
    luxuryBiz:["Boutique homestays","Luxury resorts","Apple orchards / cider makers"],
    futureClients:["Boutique homestays","Orchard-stay owners","Wellness retreats"],
    shoots:["Homestay cosy-room reel","Orchard golden-hour story","Valley-view balcony / breakfast"],
    gps:"31.1290, 77.2360", links:["bible:hotel","bible:lighting","skill:hotel-cinematography"] }),

  loc({ id:"naldehra", name:"Naldehra", region:"~22 km from Shimla · ~2,050 m",
    blurb:"Deodar-ringed golf-course meadow — open green space, big skies, premium-resort territory.",
    light:"Open meadow light, fewer obstructions; lovely rim-light through the deodars at the edges.",
    goldenHour:"Wide, unobstructed golden hour over the golf greens and ridgelines.",
    sunrise:"Open horizons; mist over the fairway at dawn.",
    fog:"Monsoon mist hangs over the meadow and treeline.",
    architecture:"Resort architecture, the historic golf course, cedar forest.",
    roads:"Scenic drive from Shimla via Mashobra; the Naldehra road itself is filmable.",
    parking:"Resort and roadside parking near the golf course.",
    permissions:"Golf course and resorts are managed — arrange access; meadow edges are open.",
    restaurants:["Resort restaurants","Roadside dhabas with views"],
    hotels:["The Chalets Naldehra","Koti Resorts"],
    luxuryBiz:["Golf resorts","Destination-wedding venues"],
    futureClients:["Resorts","Wedding venues","Adventure / experience operators"],
    shoots:["Resort brand film with aerials","Misty meadow morning","Wedding-venue experience reel"],
    gps:"31.1620, 77.2110", links:["bible:hotel","bible:wedding","skill:hotel-cinematography"] }),

  loc({ id:"kufri", name:"Kufri", region:"~16 km from Shimla · ~2,720 m",
    blurb:"High ridge with the biggest open views near Shimla — adventure tourism and snow in winter.",
    light:"Bright, thin high-altitude light; dramatic when clouds break over the peaks.",
    goldenHour:"Huge panoramic golden hour over the Himalayan range.",
    fog:"Cloud often sits at this altitude — shoot through it for moody layers.",
    architecture:"Tourist huts, adventure-park structures, alpine feel.",
    roads:"NH-5 toward Kufri; steep, busy in season.", parking:"Roadside / paid lots in season.",
    permissions:"Public viewpoints; adventure operators are private.",
    luxuryBiz:["Adventure tourism operators","Viewpoint cafés"], futureClients:["Adventure operators","Hilltop cafés"],
    shoots:["Panoramic range reveal","Snow / adventure b-roll"], gps:"31.0980, 77.2660", links:["bible:hotel"] }),

  loc({ id:"chail", name:"Chail", region:"~45 km from Shimla · ~2,250 m",
    blurb:"Forested former royal retreat — the famous palace and the world's highest cricket ground, deep quiet.",
    light:"Dense pine-filtered light; calm and even under canopy.",
    goldenHour:"Warm light on the palace stone and through tall pines.",
    fog:"Thick forest fog in monsoon — cinematic and exclusive-feeling.",
    architecture:"Colonial-era Chail Palace, royal cottages, pine forest.",
    roads:"Quiet forested approach roads, great for drives.", parking:"Palace hotel and roadside.",
    permissions:"Palace is a heritage hotel — arrange access.",
    luxuryBiz:["Heritage palace hotel","Forest resorts"], futureClients:["Heritage hotels","Destination weddings"],
    shoots:["Heritage palace brand film","Forest-retreat mood reel"], gps:"30.9680, 77.2030", links:["bible:hotel","bible:wedding"] }),

  loc({ id:"kasauli", name:"Kasauli", region:"~77 km from Shimla · ~1,900 m",
    blurb:"Cantonment charm closer to the plains — Victorian houses, pines, easy access from Chandigarh.",
    light:"Softer, lower-altitude light; pleasant most of the year.",
    goldenHour:"Sunset Point golden hour over the plains haze.",
    fog:"Gentle evening mist; less than the higher towns.",
    architecture:"Victorian cottages, churches, cobbled cantonment lanes.",
    roads:"Good access from Chandigarh/Parwanoo; walkable Mall.", parking:"Limited cantonment parking.",
    permissions:"Cantonment areas restrict photography in parts — check signage.",
    luxuryBiz:["Boutique cafés","Breweries / distilleries nearby","Boutique stays"], futureClients:["Cafés","Boutique resorts","Breweries"],
    shoots:["Café & brewery story","Victorian-lane walk"], gps:"30.8990, 76.9650", links:["bible:restaurant","bible:hotel"] }),

  loc({ id:"theog", name:"Theog", region:"~32 km from Shimla · ~2,500 m",
    blurb:"Apple-country town on the Hindustan–Tibet road — orchards, farm stays, authentic Himachali life.",
    light:"Clear orchard light; beautiful during apple season (bloom in spring, fruit in late summer).",
    goldenHour:"Golden light across terraced orchards and ridgelines.",
    fog:"Valley fog common; dramatic over the terraces.",
    architecture:"Traditional Himachali kath-kuni timber-and-stone homes, farm structures.",
    roads:"On NH-5 (Hindustan–Tibet road); orchard side-roads.", parking:"Roadside / farm-stay parking.",
    permissions:"Orchards are private farmland — ask the grower.",
    luxuryBiz:["Farm stays","Cider / apple producers","Agritourism"], futureClients:["Farm stays","Orchard / cider brands","Agritourism operators"],
    shoots:["Apple-orchard harvest story","Kath-kuni heritage-home reel"], gps:"31.1240, 77.3490", links:["bible:hotel","skill:luxury-positioning"] })
];

if (window.NS && typeof NS.rebuild === "function") NS.rebuild();
