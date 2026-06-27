/* ============================================================
   North Stories OS — app.js  (ENGINE)
   Unit: Foundation Runtime v1.0
   Contains: store, helpers, knowledge graph, router, nav,
   command palette, search, and the Today + North Star views.
   Content modules (bibles, curriculum, etc.) attach to window.NS
   and are picked up automatically as they are added.
   ============================================================ */
(function () {
  "use strict";
  var NS = window.NS || (window.NS = {});

  /* ---------- tiny helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function ic(name){ return '<svg class="ic"><use href="#'+name+'"/></svg>'; }
  function md(t){ // minimal markdown: **bold**, *italic*, `code`, line breaks
    if(!t) return "";
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")
      .replace(/\*(.+?)\*/g,"<i>$1</i>")
      .replace(/`(.+?)`/g,"<code>$1</code>")
      .replace(/\n/g,"<br>");
  }
  function todayKey(){ var d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
  function prettyDate(){ return new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"}); }
  function greeting(){ var h=new Date().getHours(); return h<12?"Good morning":h<17?"Good afternoon":"Good evening"; }

  /* ---------- store (localStorage, namespace cos:) ---------- */
  var store = {
    get:function(k,d){ try{ var v=localStorage.getItem("cos:"+k); return v==null?d:JSON.parse(v);}catch(e){return d;} },
    set:function(k,v){ try{ localStorage.setItem("cos:"+k,JSON.stringify(v)); }catch(e){} }
  };
  NS.store = store;

  /* ---------- knowledge graph (backlinks) ----------
     Walks every content array for {id,links[]} and builds a reverse map. */
  var GRAPH = { nodes:{}, back:{} };
  function indexNode(type, item){
    if(!item || !item.id) return;
    var key = type+":"+item.id;
    GRAPH.nodes[key] = { type:type, id:item.id, title:item.title||item.name||item.id };
    (item.links||[]).forEach(function(to){
      (GRAPH.back[to] = GRAPH.back[to] || []).push(key);
    });
  }
  function buildGraph(){
    GRAPH.nodes={}; GRAPH.back={};
    (NS.northstar||[]).forEach(function(x){ indexNode("northstar",x); });
    (NS.curriculum||[]).forEach(function(x){ indexNode("lesson",x); });
    (NS.bibles||[]).forEach(function(b){ indexNode("bible",b);
      (b.entries||[]).forEach(function(e){ indexNode("bible",{id:b.id+"/"+e.id,title:e.title,links:e.links}); }); });
    (NS.brands||[]).forEach(function(x){ indexNode("brand",x); });
    (NS.locations||[]).forEach(function(x){ indexNode("location",x); });
    (NS.sops||[]).forEach(function(x){ indexNode("sop",x); });
    (NS.agency||[]).forEach(function(x){ indexNode("agency",x); });
  }
  NS.backlinks = function(key){
    var arr = GRAPH.back[key]||[];
    return arr.map(function(k){ return GRAPH.nodes[k]||{type:k.split(":")[0],id:k.split(":")[1],title:k}; });
  };

  /* ---------- navigation render ---------- */
  var GROUPS = ["Home","Learn","Taste","Create","Build","System"];
  function moduleById(id){ return (NS.modules||[]).find(function(m){return m.id===id;}); }
  function renderNav(active){
    var byGroup={}; (NS.modules||[]).forEach(function(m){ (byGroup[m.group]=byGroup[m.group]||[]).push(m); });
    var html = '<a class="brand" data-go="today">'+
      '<span class="mark">'+ic("i-mountain")+'</span>'+
      '<span class="bt">North Stories<small>operating system</small></span></a>'+
      '<div class="seek" data-pal>'+ic("i-search")+'<span>Search</span><kbd>⌘K</kbd></div>';
    GROUPS.forEach(function(g){
      var items=byGroup[g]; if(!items) return;
      if(g!=="Home") html+='<div class="navgroup">'+g+'</div>';
      items.forEach(function(m){
        html+='<a class="navlink'+(m.id===active?' active':'')+'" data-go="'+m.id+'">'+ic(m.icon)+'<span>'+esc(m.name)+'</span></a>';
      });
    });
    $("#side").innerHTML = html;
    // mobile nav: 5 anchors
    var mob=["today","curriculum","bibles","brain","ask"];
    $("#mobnav").innerHTML = mob.map(function(id){ var m=moduleById(id); if(!m) return "";
      return '<a data-go="'+id+'"'+(id===active?' class="active"':'')+'>'+ic(m.icon)+'<span>'+esc(m.name.split(" ")[0])+'</span></a>'; }).join("");
  }

  /* ---------- router ---------- */
  var VIEWS = {};
  NS.view = function(name, fn){ VIEWS[name]=fn; };  // content modules can register views
  function parseHash(){
    var h=(location.hash||"#/today").replace(/^#\/?/,"");
    var parts=h.split("/").filter(Boolean);
    return { route: parts[0]||"today", param: parts[1]||null, sub: parts[2]||null };
  }
  function go(route, param){ location.hash = "#/"+route+(param?("/"+param):""); }
  NS.go = go;
  function render(){
    var r=parseHash();
    renderNav(r.route);
    var mount=$("#view");
    window.scrollTo(0,0);
    var fn = VIEWS[r.route] || VIEWS._placeholder;
    try { mount.innerHTML = fn(r); }
    catch(e){ mount.innerHTML = '<div class="empty">'+ic("i-warn")+'<p>Something went wrong rendering this view.<br><code>'+esc(e.message)+'</code></p></div>'; }
    if (fn.after) fn.after(r);
  }

  /* ---------- command palette ---------- */
  var palSel=0, palItems=[];
  function searchIndex(){
    var out=[];
    (NS.modules||[]).forEach(function(m){ out.push({title:m.name,sub:m.blurb,kind:m.group,go:m.id,icon:m.icon}); });
    (NS.northstar||[]).forEach(function(x){ out.push({title:x.title,sub:"North Star",kind:"north star",go:"northstar/"+x.id,icon:"i-compass"}); });
    (NS.curriculum||[]).forEach(function(x){ out.push({title:x.title,sub:"Lesson "+(x.order||""),kind:"lesson",go:"curriculum/"+x.id,icon:"i-book"}); });
    (NS.bibles||[]).forEach(function(b){ out.push({title:b.title,sub:b.blurb||"Bible",kind:"bible",go:"bibles/"+b.id,icon:"i-layers"});
      (b.entries||[]).forEach(function(e){ out.push({title:e.title,sub:b.title,kind:"bible entry",go:"bibles/"+b.id+"/"+e.id,icon:"i-layers"}); }); });
    (NS.brands||[]).forEach(function(x){ out.push({title:x.name,sub:"Brand",kind:"brand",go:"brands/"+x.id,icon:"i-star"}); });
    (NS.locations||[]).forEach(function(x){ out.push({title:x.name,sub:"Location",kind:"location",go:"locations/"+x.id,icon:"i-map"}); });
    (NS.sops||[]).forEach(function(x){ out.push({title:x.title,sub:"SOP",kind:"sop",go:"sops/"+x.id,icon:"i-list"}); });
    (store.get("brain",[])||[]).forEach(function(x){ out.push({title:x.title||"(untitled)",sub:"Creative Brain",kind:"journal",go:"brain",icon:"i-bulb"}); });
    return out;
  }
  function palOpen(){ $("#palbg").classList.add("on"); var i=$("#palin"); i.value=""; palFilter(""); i.focus(); }
  function palClose(){ $("#palbg").classList.remove("on"); }
  function palFilter(q){
    q=q.toLowerCase().trim();
    var idx=searchIndex();
    palItems = !q ? idx.slice(0,8) : idx.filter(function(x){
      return (x.title+" "+x.sub+" "+x.kind).toLowerCase().indexOf(q)>-1; }).slice(0,40);
    palSel=0; palDraw();
  }
  function palDraw(){
    if(!palItems.length){ $("#palres").innerHTML='<div class="pal-item" style="color:var(--ink-faint)">No matches</div>'; return; }
    $("#palres").innerHTML = palItems.map(function(x,i){
      return '<div class="pal-item'+(i===palSel?' sel':'')+'" data-pgo="'+esc(x.go)+'">'+ic(x.icon||"i-arrow")+
        '<span>'+esc(x.title)+'</span><span class="pk">'+esc(x.kind)+'</span></div>'; }).join("");
  }
  function palChoose(i){ var x=palItems[i]; if(!x) return; palClose(); var p=x.go.split("/"); go(p[0], p.slice(1).join("/")||null); }

  /* ===========================================================
     VIEWS
     =========================================================== */

  /* ---- generic placeholder for modules not yet authored ---- */
  VIEWS._placeholder = function(r){
    var m = moduleById(r.route) || {name:r.route, blurb:"", icon:"i-grid"};
    return head(m.name, m.blurb, "Modules")+
      '<div class="empty">'+ic("i-graph")+
      '<p style="margin-top:14px;font-size:1rem;color:var(--ink-soft)"><b>'+esc(m.name)+'</b> is scheduled in the build.</p>'+
      '<p style="max-width:46ch;margin:8px auto 0">This module’s view and content are authored as their own approved units under the incremental build protocol. The data model and navigation already reserve its place.</p>'+
      '<div class="row" style="justify-content:center;margin-top:18px"><a class="btn" data-go="today">'+ic("i-sun")+' Back to Today</a> <a class="btn" data-go="northstar">'+ic("i-compass")+' North Star</a></div>'+
      '</div>';
  };

  function head(title, sub, crumb){
    return '<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<span>'+esc(crumb||title)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(title)+'</h1>'+(sub?'<p class="psub">'+esc(sub)+'</p>':'')+'</div></div>';
  }

  /* ---- TODAY (Mission Control) ---- */
  function todayPlan(){
    var key=todayKey();
    var t=store.get("today",null);
    if(!t || t.date!==key){ t={ date:key, mission:"", lessonId:"", review:"", shoot:"", businessTask:"", habitId:"", done:{} }; store.set("today",t); }
    return t;
  }
  function saveToday(t){ store.set("today",t); }
  function computeStreak(){
    var habits=store.get("habits",{});
    // streak = consecutive days where at least one habit logged, ending today/yesterday
    var days=new Set();
    Object.keys(habits).forEach(function(h){ Object.keys((habits[h]||{}).log||{}).forEach(function(d){ days.add(d); }); });
    var streak=0, d=new Date();
    for(;;){ var k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
      if(days.has(k)){ streak++; d.setDate(d.getDate()-1); }
      else if(streak===0 && k===todayKey()){ d.setDate(d.getDate()-1); } // today not done yet, allow yesterday
      else break; }
    return streak;
  }
  function incomeMilestone(){
    var inc=store.get("income",[])||[]; var total=inc.reduce(function(a,b){return a+(+b.amount||0);},0);
    var ms=NS.incomeMilestones, next=ms[0], hit=0;
    for(var i=0;i<ms.length;i++){ if(total>=ms[i]) hit=ms[i]; else { next=ms[i]; break; } }
    return { total:total, next:next, hit:hit };
  }
  VIEWS.today = function(){
    var t=todayPlan();
    var lessons=NS.curriculum||[];
    var port=store.get("portfolio",[])||[];
    var crm=store.get("crm",[])||[];
    var streak=computeStreak();
    var im=incomeMilestone();
    var pending=crm.filter(function(c){return c.nextAction;}).length;
    var rows=[
      {k:"mission",icon:"i-target",label:"Today’s Mission",ph:"What is the one outcome today?",val:t.mission},
      {k:"lessonId",icon:"i-book",label:"Today’s Lesson",lesson:true,val:t.lessonId},
      {k:"review",icon:"i-eye",label:"Today’s Review",ph:"One thing to study / critique",val:t.review},
      {k:"shoot",icon:"i-camera",label:"Today’s Shoot",ph:"What will you capture?",val:t.shoot},
      {k:"businessTask",icon:"i-bag",label:"Today’s Business Task",ph:"One money-moving action",val:t.businessTask},
      {k:"habit",icon:"i-activity",label:"Today’s Habit",habit:true,val:t.habitId}
    ];
    var doneCount=rows.filter(function(r){return t.done[r.k];}).length;
    var pct=Math.round(doneCount/rows.length*100);
    var est = (t.mission?15:0)+(t.lessonId?30:0)+(t.shoot?45:0)+(t.businessTask?20:0)+(t.review?15:0);

    var focus = rows.map(function(r){
      var on=!!t.done[r.k];
      var control;
      if(r.lesson){
        control = lessons.length
          ? '<select class="input" data-tset="lessonId"><option value="">— pick a lesson —</option>'+
            lessons.map(function(l){return '<option value="'+l.id+'"'+(t.lessonId===l.id?' selected':'')+'>'+esc(l.title)+'</option>';}).join("")+'</select>'
          : '<input class="input" data-tset="lessonId" value="'+esc(t.lessonId||"")+'" placeholder="Curriculum loads here once authored">';
      } else if(r.habit){
        var habits=NS.habitSeeds||[];
        control='<select class="input" data-tset="habitId"><option value="">— pick a habit —</option>'+
          habits.map(function(h){return '<option value="'+h.id+'"'+(t.habitId===h.id?' selected':'')+'>'+esc(h.label)+'</option>';}).join("")+'</select>';
      } else {
        control='<input class="input" data-tset="'+r.k+'" value="'+esc(r.val||"")+'" placeholder="'+esc(r.ph)+'">';
      }
      return '<div style="display:flex;gap:12px;align-items:flex-start;padding:13px 0;border-top:1px solid var(--line)">'+
        '<div class="check'+(on?' on':'')+'" data-tdone="'+r.k+'" style="padding:0;border:0;margin-top:6px"><span class="box">'+ic("i-check")+'</span></div>'+
        '<div style="flex:1;min-width:0"><div style="font-family:\'JetBrains Mono\',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-faint);display:flex;gap:6px;align-items:center;margin-bottom:6px">'+ic(r.icon)+r.label+'</div>'+control+'</div></div>';
    }).join("");

    return ''+
    '<div class="crumb"><span>'+esc(prettyDate())+'</span></div>'+
    '<div class="phead"><div><h1 class="ptitle">'+greeting()+', '+esc((NS.meta&&NS.meta.owner)||"")+'</h1>'+
      '<p class="psub">One screen. One day. Do the work, then close it.</p></div>'+
      '<div class="row"><a class="btn" data-go="ask">'+ic("i-spark")+' Ask</a><a class="btn btn--primary" data-go="curriculum">'+ic("i-book")+' Curriculum</a></div></div>'+

    '<div class="stats" style="--n:4;margin-top:22px">'+
      '<div class="stat"><div class="big">'+streak+'</div><div class="lbl">Day streak</div><div class="sub">Protect it. Do one habit.</div></div>'+
      '<div class="stat" style="--cat:var(--c3)"><div class="big">'+port.length+'</div><div class="lbl">Portfolio pieces</div><div class="sub">Case studies shipped</div></div>'+
      '<div class="stat" style="--cat:var(--c2)"><div class="big">₹'+(im.next/1000)+'k</div><div class="lbl">Next milestone</div><div class="sub">₹'+im.total.toLocaleString("en-IN")+' earned so far</div></div>'+
      '<div class="stat" style="--cat:var(--c4)"><div class="big">'+pending+'</div><div class="lbl">Pending actions</div><div class="sub">Open items in CRM</div></div>'+
    '</div>'+

    '<div class="card" style="margin-top:20px">'+
      '<div class="card-top"><div class="card-title"><span class="ico">'+ic("i-sun")+'</span><div><h3>Today’s focus</h3><div class="val">'+doneCount+' / '+rows.length+' done · ~'+est+' min planned</div></div></div></div>'+
      '<div class="progbar" style="margin-top:14px"><i style="width:'+pct+'%"></i></div>'+
      focus+
    '</div>'+

    '<div class="note note--you" style="margin-top:4px">'+ic("i-bulb")+'<span><b>How to use Today.</b> Set the six fields each morning, then tick them off as you go. Everything else in the OS is a library you reach for <i>in service of today’s work</i> — not a feed to scroll.</span></div>';
  };
  VIEWS.today.after = function(){
    // input edits
    Array.prototype.forEach.call(document.querySelectorAll("[data-tset]"),function(el){
      el.addEventListener("change",function(){ var t=todayPlan(); t[el.getAttribute("data-tset")]=el.value; saveToday(t); });
      if(el.tagName==="INPUT") el.addEventListener("blur",function(){ var t=todayPlan(); t[el.getAttribute("data-tset")]=el.value; saveToday(t); });
    });
  };

  /* ---- NORTH STAR ---- */
  VIEWS.northstar = function(r){
    var docs=NS.northstar||[];
    if(r.param){
      var d=docs.find(function(x){return x.id===r.param;}); if(!d) return VIEWS._placeholder(r);
      return head(d.title,"North Star · read this before every big decision","North Star")+
        '<div class="card"><p class="lead" style="font-size:1.02rem;color:var(--ink)">'+md(d.body)+'</p>'+
        (d.principles&&d.principles.length?'<ul class="list" style="margin-top:18px">'+d.principles.map(function(p){return '<li><b>'+md(p)+'</b></li>';}).join("")+'</ul>':'')+
        '<div class="val" style="margin-top:16px;font-family:\'JetBrains Mono\',monospace;font-size:.7rem;color:var(--ink-faint)">Updated '+esc(d.updated||"")+'</div></div>'+
        '<div class="pagenav"><a data-go="northstar"><span class="dir">Back</span><span class="ttl">All of North Star</span></a></div>';
    }
    return head("North Star","Who you’re trying to become — not just what you’re trying to learn. Every Ask prompt reads these first.","North Star")+
      '<div class="cardgrid">'+docs.map(function(d){
        return '<div class="tile" data-go="northstar/'+d.id+'"><div class="tn">'+d.kind.toUpperCase()+' '+ic("i-arrow")+'</div>'+
        '<div class="tt">'+esc(d.title)+'</div><div class="td">'+esc((d.body||"").slice(0,84))+'…</div>'+
        '<div class="go">Open '+ic("i-arrow")+'</div></div>'; }).join("")+'</div>';
  };

  /* ---- shared content helpers ---- */
  function plain(t){ return String(t||"").replace(/[*`#>]/g,"").replace(/\n+/g," ").trim(); }
  function tagRow(tags){ if(!tags||!tags.length) return ""; return '<div class="row" style="margin-top:14px">'+tags.map(function(t){return '<span class="tag">#'+esc(t)+'</span>';}).join("")+'</div>'; }
  function routeForType(type){ return {bible:"bibles",lesson:"curriculum",brand:"brands",location:"locations",sop:"sops",agency:"agency",northstar:"northstar"}[type]||type; }
  function renderBacklinks(key){
    var bl=NS.backlinks(key); if(!bl.length) return "";
    return '<div class="backlinks"><div class="bl-h">Referenced by</div>'+bl.map(function(n){
      return '<span class="chiplink" data-go="'+routeForType(n.type)+'/'+n.id+'">'+ic("i-graph")+esc(n.title)+'</span>'; }).join("")+'</div>';
  }

  /* ---- KNOWLEDGE BIBLES ---- */
  function bibleById(id){ return (NS.bibles||[]).find(function(b){return b.id===id;}); }
  function biblePage(b){
    var entries=b.entries||[];
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="bibles">Bibles</a>'+ic("i-chevron")+'<span>'+esc(b.title)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(b.title)+'</h1><p class="psub">'+esc(b.blurb)+'</p></div></div>'+tagRow(b.tags);
    if(entries.length){
      h+='<div class="cardgrid" style="margin-top:20px">'+entries.map(function(e){
        return '<div class="tile" data-go="bibles/'+b.id+'/'+e.id+'" style="--dc:'+(b.accent||'var(--primary)')+'"><div class="tn">ENTRY '+ic("i-arrow")+'</div><div class="tt">'+esc(e.title)+'</div><div class="td">'+esc(plain(e.body).slice(0,92))+'…</div><div class="go">Read '+ic("i-arrow")+'</div></div>';
      }).join("")+'</div>';
    } else {
      h+='<div class="empty" style="margin-top:20px">'+ic("i-layers")+'<p style="margin-top:12px;font-size:1rem;color:var(--ink-soft)"><b>No entries yet.</b></p><p style="max-width:46ch;margin:8px auto 0">This Bible fills up as projects are completed — each one contributes observations, workflows, mistakes and SOPs. Deep-dive entries also ship as their own authored units.</p></div>';
    }
    return h+renderBacklinks("bible:"+b.id);
  }
  function entryPage(b,e){
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="bibles">Bibles</a>'+ic("i-chevron")+'<a data-go="bibles/'+b.id+'">'+esc(b.title)+'</a>'+ic("i-chevron")+'<span>'+esc(e.title)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(e.title)+'</h1></div></div>'+
      '<div class="card"><div class="lead" style="color:var(--ink);font-size:.98rem;line-height:1.7">'+md(e.body)+'</div></div>'+tagRow(e.tags);
    if(e.references&&e.references.length){
      h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-ext")+'</span><div><h3>References</h3></div></div><ul class="list">'+e.references.map(function(rf){return '<li><a href="'+esc(rf.url)+'" target="_blank" rel="noopener">'+esc(rf.label)+'</a></li>';}).join("")+'</ul></div>';
    }
    if(e.related&&e.related.length){
      h+='<div class="backlinks"><div class="bl-h">Related in this Bible</div>'+e.related.map(function(rid){var re=(b.entries||[]).find(function(x){return x.id===rid;}); return re?'<span class="chiplink" data-go="bibles/'+b.id+'/'+re.id+'">'+ic("i-layers")+esc(re.title)+'</span>':"";}).join("")+'</div>';
    }
    return h+renderBacklinks("bible:"+b.id+"/"+e.id);
  }
  VIEWS.bibles = function(r){
    if(r.param){ var b=bibleById(r.param); if(!b) return VIEWS._placeholder(r);
      if(r.sub){ var e=(b.entries||[]).find(function(x){return x.id===r.sub;}); return e?entryPage(b,e):VIEWS._placeholder(r); }
      return biblePage(b); }
    var html=head("Knowledge Bibles","The permanent source of truth. Projects update these; they never duplicate them — over time they become your agency's operating manual.","Knowledge Bibles");
    (NS.bibleCategories||[]).forEach(function(cat){
      var items=(NS.bibles||[]).filter(function(b){return b.category===cat.id;}); if(!items.length) return;
      html+='<div class="sec-head" style="margin-top:30px"><p class="eyebrow">'+esc(cat.label)+'</p><h2 style="font-size:1.4rem">'+esc(cat.label)+' Bibles</h2><p>'+esc(cat.blurb)+'</p></div>'+
        '<div class="cardgrid">'+items.map(function(b){ var n=(b.entries||[]).length;
          return '<div class="tile" data-go="bibles/'+b.id+'" style="--dc:'+(b.accent||'var(--primary)')+'"><div class="tn">'+ic(b.icon)+' '+(n?n+' ENTRIES':'NEW')+'</div><div class="tt">'+esc(b.title)+'</div><div class="td">'+esc(b.blurb)+'</div><div class="go">Open '+ic("i-arrow")+'</div></div>'; }).join("")+'</div>';
    });
    return html;
  };

  /* ===========================================================
     EVENTS + INIT
     =========================================================== */
  function onClick(e){
    var go1=e.target.closest("[data-go]"); if(go1){ e.preventDefault(); var p=go1.getAttribute("data-go").split("/"); go(p[0],p.slice(1).join("/")||null); return; }
    if(e.target.closest("[data-pal]")){ palOpen(); return; }
    var pg=e.target.closest("[data-pgo]"); if(pg){ palClose(); var q=pg.getAttribute("data-pgo").split("/"); go(q[0],q.slice(1).join("/")||null); return; }
    var td=e.target.closest("[data-tdone]"); if(td){ var t=todayPlan(); var k=td.getAttribute("data-tdone"); t.done[k]=!t.done[k]; saveToday(t);
      // also log habit streak if it's the habit row toggled on
      if(k==="habit" && t.done.habit && t.habitId){ var hb=store.get("habits",{}); hb[t.habitId]=hb[t.habitId]||{log:{}}; hb[t.habitId].log[todayKey()]=true; store.set("habits",hb); }
      render(); return; }
    if(e.target.id==="palbg"){ palClose(); }
  }
  function onKey(e){
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); palOpen(); return; }
    var open=$("#palbg").classList.contains("on");
    if(!open){ if(e.key==="/" && document.activeElement.tagName!=="INPUT" && document.activeElement.tagName!=="TEXTAREA" && document.activeElement.tagName!=="SELECT"){ e.preventDefault(); palOpen(); } return; }
    if(e.key==="Escape"){ palClose(); }
    else if(e.key==="ArrowDown"){ e.preventDefault(); palSel=Math.min(palSel+1,palItems.length-1); palDraw(); }
    else if(e.key==="ArrowUp"){ e.preventDefault(); palSel=Math.max(palSel-1,0); palDraw(); }
    else if(e.key==="Enter"){ e.preventDefault(); palChoose(palSel); }
  }

  function init(){
    buildGraph();
    document.addEventListener("click",onClick);
    document.addEventListener("keydown",onKey);
    $("#palin").addEventListener("input",function(){ palFilter(this.value); });
    window.addEventListener("hashchange",render);
    NS.rebuild = function(){ buildGraph(); render(); }; // content modules call after loading
    if(!location.hash) location.hash="#/today";
    render();
    if("serviceWorker" in navigator){ navigator.serviceWorker.register("sw.js").catch(function(){}); }
  }
  if(document.readyState!=="loading") init(); else document.addEventListener("DOMContentLoaded",init);
})();
