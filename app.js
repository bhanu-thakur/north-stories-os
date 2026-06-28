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
    (NS.cdDrills||[]).forEach(function(d){ out.push({title:d.title,sub:"Creative Director",kind:"drill",go:"creative-director/"+d.id,icon:"i-eye"}); });
    (store.get("crm",[])||[]).forEach(function(c){ out.push({title:c.name,sub:"Business CRM",kind:"client",go:"crm/"+c.id,icon:"i-users"}); });
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
    var cd=cdTodayDrill();
    var skillsAdv=(NS.skills||[]).filter(function(s){return skillStage(s.id)!=="Not Introduced";}).length;
    var pipe={lead:0,prospect:0,client:0,past:0}; crm.forEach(function(c){ if(pipe[c.stage]!=null) pipe[c.stage]++; });
    var revPct=im.next?Math.min(100,Math.round(im.total/im.next*100)):100;
    var rows=[
      {k:"mission",icon:"i-target",label:"Today’s Mission",ph:"What is the one outcome today?",val:t.mission},
      {k:"lessonId",icon:"i-book",label:"Today’s Project",lesson:true,val:t.lessonId},
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
          ? '<select class="input" data-tset="lessonId"><option value="">— pick a project —</option>'+
            lessons.map(function(l){return '<option value="'+l.id+'"'+(t.lessonId===l.id?' selected':'')+'>'+esc(l.title)+'</option>';}).join("")+'</select>'
          : '<input class="input" data-tset="lessonId" value="'+esc(t.lessonId||"")+'" placeholder="Curriculum loads here once authored">';
        if(t.lessonId){ var pp=(NS.curriculum||[]).find(function(x){return x.id===t.lessonId;}); if(pp&&pp.status==="available") control+='<div style="margin-top:8px"><span class="chiplink" data-go="curriculum/'+pp.id+'">'+ic("i-arrow")+'Open project</span></div>'; }
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
    (cd?'<div class="card cat" style="--bc:var(--c4);margin-top:18px"><div class="card-top"><div class="card-title"><span class="ico">'+ic("i-eye")+'</span><div><h3>Today’s eye-training</h3><div class="val">'+esc(cd.title)+'</div></div></div><span class="btn btn--sm btn--primary" data-go="creative-director/'+cd.id+'">Begin '+ic("i-arrow")+'</span></div></div>':'')+

    '<div class="card" style="margin-top:18px">'+
      '<div class="card-top"><div class="card-title"><span class="ico">'+ic("i-sun")+'</span><div><h3>Today’s focus</h3><div class="val">'+doneCount+' / '+rows.length+' done · ~'+est+' min planned</div></div></div></div>'+
      '<div class="progbar" style="margin-top:14px"><i style="width:'+pct+'%"></i></div>'+
      focus+
    '</div>'+

    '<div class="card" style="margin-top:18px"><div class="card-title"><span class="ico">'+ic("i-graph")+'</span><div><h3>Momentum &amp; milestones</h3><div class="val">where you are on the bigger journey</div></div></div>'+
      '<div class="minigrid" style="--m:2;margin-top:8px">'+
        '<div class="cell"><div class="t">'+ic("i-activity")+' Skills moving</div><div class="v">'+skillsAdv+' <small>/ '+(NS.skills||[]).length+'</small></div></div>'+
        '<div class="cell"><div class="t">'+ic("i-camera")+' Portfolio</div><div class="v">'+port.length+' <small>pieces</small></div></div>'+
        '<div class="cell"><div class="t">'+ic("i-users")+' Pipeline</div><div class="v">'+pipe.lead+'L · '+pipe.prospect+'P · '+pipe.client+'C</div></div>'+
        '<div class="cell lever"><div class="t">'+ic("i-cash")+' Next milestone</div><div class="v">₹'+(im.next/1000)+'k</div></div>'+
      '</div>'+
      '<div style="margin-top:12px"><div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--ink-faint);font-family:\'JetBrains Mono\',monospace"><span>₹'+im.total.toLocaleString("en-IN")+' earned</span><span>'+revPct+'% to ₹'+(im.next/1000)+'k</span></div><div class="progbar" style="margin-top:6px"><i style="width:'+revPct+'%"></i></div></div>'+
    '</div>'+
    '<div class="note note--you" style="margin-top:4px">'+ic("i-bulb")+'<span><b>How to use Today.</b> Set your focus each morning, tick it off as you go, do today’s eye-training, then close it. Everything else in the OS is a library you reach for <i>in service of today’s work</i> — not a feed to scroll.</span></div>';
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
        return '<div class="tile" data-go="bibles/'+b.id+'/'+e.id+'" style="--dc:'+(b.accent||'var(--primary)')+'"><div class="tn">ENTRY '+ic("i-arrow")+'</div><div class="tt">'+esc(e.title)+'</div><div class="td">'+esc((e.summary||plain(e.body)||(e.sections&&plain(e.sections.definition))||"").slice(0,92))+'…</div><div class="go">Read '+ic("i-arrow")+'</div></div>';
      }).join("")+'</div>';
    } else {
      h+='<div class="empty" style="margin-top:20px">'+ic("i-layers")+'<p style="margin-top:12px;font-size:1rem;color:var(--ink-soft)"><b>No entries yet.</b></p><p style="max-width:46ch;margin:8px auto 0">This Bible fills up as projects are completed — each one contributes observations, workflows, mistakes and SOPs. Deep-dive entries also ship as their own authored units.</p></div>';
    }
    return h+renderBacklinks("bible:"+b.id);
  }
  var BIBLE_SECTIONS=[["definition","Definition","i-info"],["why","Why it matters","i-flag"],["firstPrinciples","First principles","i-compass"],["standards","Professional standards","i-star"],["mistakes","Common beginner mistakes","i-warn"],["business","Business implications","i-cash"],["hospitality","Hospitality applications","i-building"],["implementation","Practical implementation","i-list"]];
  function listCard(title,icon,items,ordered){ if(!items||!items.length) return "";
    var inner=ordered?('<ol class="steps">'+items.map(function(x){return '<li><div>'+md(x)+'</div></li>';}).join("")+'</ol>'):('<ul class="list">'+items.map(function(x){return '<li>'+md(x)+'</li>';}).join("")+'</ul>');
    return '<div class="card"><div class="card-title"><span class="ico">'+ic(icon)+'</span><div><h3>'+esc(title)+'</h3></div></div>'+inner+'</div>'; }
  function entryPage(b,e){
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="bibles">Bibles</a>'+ic("i-chevron")+'<a data-go="bibles/'+b.id+'">'+esc(b.title)+'</a>'+ic("i-chevron")+'<span>'+esc(e.title)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(e.title)+'</h1>'+(e.summary?'<p class="psub">'+esc(e.summary)+'</p>':'')+'</div></div>'+tagRow(e.tags);
    if(e.body){ h+='<div class="card"><div class="lead" style="color:var(--ink);font-size:.98rem;line-height:1.7">'+md(e.body)+'</div></div>'; }
    if(e.sections){ BIBLE_SECTIONS.forEach(function(s){ var v=e.sections[s[0]]; if(!v) return;
      h+='<div class="card cat" style="--bc:'+(b.accent||'var(--primary)')+'"><div class="card-title"><span class="ico">'+ic(s[2])+'</span><div><h3>'+esc(s[1])+'</h3></div></div><div class="lead" style="color:var(--ink-soft);font-size:.95rem;line-height:1.7;margin-top:8px">'+md(v)+'</div></div>'; }); }
    h+=listCard("Practical exercises","i-target",e.exercises,true);
    h+=listCard("Observation exercises","i-eye",e.observationExercises,false);
    h+=listCard("Reflection questions","i-bulb",e.reflection,false);
    var conn="";
    function grp(label,items,builder){ if(!items||!items.length) return; conn+='<div style="margin-bottom:12px"><div class="bl-h">'+esc(label)+'</div>'+items.map(builder).join("")+'</div>'; }
    grp("Cross-links",e.crossLinks,function(id){ var rb=bibleById(id); return '<span class="chiplink" data-go="bibles/'+id+'">'+ic("i-layers")+esc(rb?rb.title:id)+'</span>'; });
    grp("Blackmagic Camera",e.cameraRefs,function(id){ var cb=bibleById("camera"),ce=cb&&(cb.entries||[]).find(function(x){return x.id===id;}); return '<span class="chiplink" data-go="bibles/camera/'+id+'">'+ic("i-camera")+esc(ce?ce.title:id)+'</span>'; });
    grp("DaVinci Resolve",e.davinciRefs,function(id){ return '<span class="chiplink" data-go="bibles/davinci/'+id+'">'+ic("i-film")+esc(id)+'</span>'; });
    grp("Related projects",e.relatedProjects,function(id){ return '<span class="chiplink" data-go="curriculum/'+id+'">'+ic("i-camera")+esc(id)+'</span>'; });
    grp("Portfolio case studies",e.relatedPortfolio,function(id){ return '<span class="chiplink" data-go="portfolio">'+ic("i-star")+esc(id)+'</span>'; });
    grp("Related SOPs",e.relatedSOPs,function(id){ return '<span class="chiplink" data-go="sops/'+id+'">'+ic("i-list")+esc(id)+'</span>'; });
    if(conn) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-graph")+'</span><div><h3>Connections</h3></div></div><div style="margin-top:12px">'+conn+'</div></div>';
    if(e.references&&e.references.length){ h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-ext")+'</span><div><h3>References</h3></div></div><ul class="list">'+e.references.map(function(rf){return '<li><a href="'+esc(rf.url)+'" target="_blank" rel="noopener">'+esc(rf.label)+'</a></li>';}).join("")+'</ul></div>'; }
    if(e.related&&e.related.length){ h+='<div class="backlinks"><div class="bl-h">Related in this Bible</div>'+e.related.map(function(rid){var re=(b.entries||[]).find(function(x){return x.id===rid;}); return re?'<span class="chiplink" data-go="bibles/'+b.id+'/'+re.id+'">'+ic("i-layers")+esc(re.title)+'</span>':"";}).join("")+'</div>'; }
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

  /* ---- SKILL TREE + progressive mastery ---- */
  var MASTERY=["Not Introduced","Introduced","Studying","Practiced","Applied","Reviewed","Portfolio Ready","Client Ready","Teaching Others","Mastered"];
  var STAGE_COLORS=["var(--line-strong)","var(--c6)","var(--c3)","var(--c1)","var(--c1)","var(--primary)","var(--c2)","var(--watch)","var(--c4)","var(--good)"];
  function stageIndex(st){ var i=MASTERY.indexOf(st); return i<0?0:i; }
  function stageColor(st){ return STAGE_COLORS[stageIndex(st)]; }
  function skillStage(id){ var s=store.get("skills",{}); return (s[id]&&s[id].stage)||"Not Introduced"; }
  function setSkillStage(id,stage){ var s=store.get("skills",{}); s[id]=s[id]||{history:[]};
    if(stageIndex(stage)>stageIndex(s[id].stage||"Not Introduced")||s[id].stage!==stage){ (s[id].history=s[id].history||[]).push({stage:stage,date:todayKey()}); }
    s[id].stage=stage; store.set("skills",s); }
  function skillById(id){ return (NS.skills||[]).find(function(s){return s.id===id;}); }
  function projectById(id){ return (NS.curriculum||[]).find(function(p){return p.id===id;}); }
  function projectsForSkill(id){ return (NS.curriculum||[]).filter(function(p){return (p.skills||[]).some(function(s){return s.skillId===id;});}); }
  function stepper(st){ var idx=stageIndex(st); return '<div class="stepper">'+MASTERY.map(function(m,i){ var cls=i<idx?'done':(i===idx?'now':''); return '<div class="st '+cls+'">'+esc(m)+'</div>'; }).join("")+'</div>'; }

  function skillPage(s){
    var st=skillStage(s.id);
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="skills">Skill Tree</a>'+ic("i-chevron")+'<span>'+esc(s.name)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(s.name)+'</h1><p class="psub">'+esc(s.blurb)+'</p></div><span class="mstage" style="background:'+stageColor(st)+'">'+esc(st)+'</span></div>'+
      '<div class="card"><div class="card-title"><span class="ico">'+ic("i-activity")+'</span><div><h3>Mastery</h3><div class="val">earned by application + review, not reading</div></div></div>'+stepper(st)+
      '<div class="field" style="margin-top:14px"><label>Set current stage</label><select class="input" data-skillset="'+s.id+'">'+MASTERY.map(function(m){return '<option'+(m===st?' selected':'')+'>'+esc(m)+'</option>';}).join("")+'</select></div>'+
      '<div class="note note--you">'+ic("i-bulb")+'<span>Completing a project that lists this skill advances it automatically. Update it here manually in the meantime.</span></div></div>';
    if(s.outcomes&&s.outcomes.length) h+=listCard("Business outcomes it drives","i-cash",s.outcomes,false);
    var conn="";
    function grp(label,items,builder){ if(!items||!items.length) return; conn+='<div style="margin-bottom:12px"><div class="bl-h">'+esc(label)+'</div>'+items.map(builder).join("")+'</div>'; }
    grp("Taught & extended by Bibles",s.bibles,function(id){ var b=bibleById(id); return '<span class="chiplink" data-go="bibles/'+id+'">'+ic("i-layers")+esc(b?b.title:id)+'</span>'; });
    grp("Advanced by projects",projectsForSkill(s.id).map(function(p){return p.id;}),function(id){ var p=projectById(id); return '<span class="chiplink" data-go="curriculum/'+id+'">'+ic("i-camera")+esc(p?p.title:id)+'</span>'; });
    grp("Builds on",s.dependsOn,function(id){ var d=skillById(id); return '<span class="chiplink" data-go="skills/'+id+'">'+ic("i-graph")+esc(d?d.name:id)+'</span>'; });
    if(conn) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-graph")+'</span><div><h3>Connections</h3></div></div><div style="margin-top:12px">'+conn+'</div></div>';
    return h;
  }
  VIEWS.skills = function(r){
    if(r.param){ var s=skillById(r.param); return s?skillPage(s):VIEWS._placeholder(r); }
    var html=head("Skill Tree","Skills are a graph, not a checklist — each one is grown by the projects that apply it and validated by reviews. Mastery is earned, not read.","Skill Tree");
    (NS.skillBranches||[]).forEach(function(br){
      var items=(NS.skills||[]).filter(function(s){return s.branch===br.id;}); if(!items.length) return;
      html+='<div class="sec-head" style="margin-top:30px"><p class="eyebrow">'+esc(br.label)+'</p><h2 style="font-size:1.4rem">'+esc(br.label)+'</h2><p>'+esc(br.blurb)+'</p></div>'+
        '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">'+items.map(function(s){ var st=skillStage(s.id);
          return '<div class="skillnode" data-go="skills/'+s.id+'" style="--sc:'+stageColor(st)+'"><span class="sname">'+esc(s.name)+'</span><div class="sblurb">'+esc(s.blurb)+'</div><div style="margin-top:9px"><span class="mstage" style="background:'+stageColor(st)+'">'+esc(st)+'</span></div></div>'; }).join("")+'</div>';
    });
    return html;
  };
  VIEWS.skills.after = function(){ Array.prototype.forEach.call(document.querySelectorAll("[data-skillset]"),function(el){ el.addEventListener("change",function(){ setSkillStage(el.getAttribute("data-skillset"),el.value); render(); }); }); };

  /* ---- CURRICULUM (project-based apprenticeship) ---- */
  function researchURL(platform,q){ var e=encodeURIComponent(q); switch((platform||"").toLowerCase()){
    case "google images": return "https://www.google.com/search?tbm=isch&q="+e;
    case "pinterest": return "https://www.pinterest.com/search/pins/?q="+e;
    case "instagram": return "https://www.instagram.com/explore/tags/"+encodeURIComponent(q.replace(/[^a-z0-9]/gi,""))+"/";
    case "youtube": return "https://www.youtube.com/results?search_query="+e;
    case "behance": return "https://www.behance.net/search/projects?search="+e;
    default: return "https://www.google.com/search?q="+e; } }
  function secCard(title,icon,bodyHtml,accent){ return '<div class="card'+(accent?' cat':'')+'"'+(accent?(' style="--bc:'+accent+'"'):'')+'><div class="card-title"><span class="ico">'+ic(icon)+'</span><div><h3>'+esc(title)+'</h3></div></div>'+bodyHtml+'</div>'; }
  function skillChips(p){ if(!p.skills||!p.skills.length) return ""; return '<div class="card"><div class="card-title"><span class="ico">'+ic("i-activity")+'</span><div><h3>Skills it will advance</h3></div></div><div style="margin-top:10px">'+p.skills.map(function(s){var sk=skillById(s.skillId);return '<span class="chiplink" data-go="skills/'+s.skillId+'">'+ic("i-activity")+esc(sk?sk.name:s.skillId)+'</span>';}).join("")+'</div></div>'; }
  function renderWorkflow(title,icon,wf,accent){
    if(!wf) return "";
    if(Array.isArray(wf)) return listCard(title,icon,wf,true);
    var h='<div class="card cat" style="--bc:'+(accent||'var(--primary)')+'"><div class="card-title"><span class="ico">'+ic(icon)+'</span><div><h3>'+esc(title)+'</h3>'+(wf.page?'<div class="val">'+esc(wf.page)+'</div>':'')+'</div></div>';
    if(wf.intro) h+='<p class="lead" style="color:var(--ink)">'+md(wf.intro)+'</p>';
    if(wf.steps) h+='<ol class="steps">'+wf.steps.map(function(s){var t=(typeof s==="string")?s:(s.do||""); var why=(s&&s.why)?' '+s.why:''; return '<li><div>'+md(t+why)+'</div></li>';}).join("")+'</ol>';
    if(wf.grid) h+='<div class="minigrid" style="--m:3;margin-top:14px">'+wf.grid.map(function(c){return '<div class="cell'+(c.lever?' lever':'')+'"><div class="t">'+esc(c.t)+'</div><div class="v">'+esc(c.v)+(c.sub?' <small>'+esc(c.sub)+'</small>':'')+'</div></div>';}).join("")+'</div>';
    if(wf.note) h+='<div class="note note--'+(wf.noteType==="warn"?"warn":"you")+'">'+ic(wf.noteType==="warn"?"i-warn":"i-bulb")+'<span>'+md(wf.note)+'</span></div>';
    return h+'</div>';
  }
  function projectPage(p){
    var ph=(NS.curriculumPhases||[]).find(function(x){return x.id===p.phase;});
    var acc=ph?ph.accent:'var(--primary)';
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="curriculum">Curriculum</a>'+ic("i-chevron")+'<span>'+esc(p.title)+'</span></div>'+
      '<div class="phead"><div><div class="eyebrow">Project '+String(p.order).padStart(2,"0")+(ph?' · '+esc(ph.label):'')+'</div><h1 class="ptitle" style="margin-top:10px">'+esc(p.title)+'</h1>'+(p.blurb?'<p class="psub">'+esc(p.blurb)+'</p>':'')+'</div></div>';
    if(p.businessType||p.client) h+='<div class="row" style="margin-top:6px">'+(p.businessType?'<span class="pill pill--brand">'+esc(p.businessType)+'</span>':'')+(p.client?'<span class="tag">'+esc(p.client)+'</span>':'')+'</div>';
    if(p.status!=="available"){
      h+='<div class="empty" style="margin-top:20px">'+ic("i-camera")+'<p style="margin-top:12px;font-size:1rem;color:var(--ink-soft)"><b>Planned engagement.</b></p><p style="max-width:50ch;margin:8px auto 0">The full brief, shot list, workflow, deliverables and pricing are authored as their own unit. This project will advance the skills below.</p></div>';
      return h+skillChips(p);
    }
    if(p.gearChips) h+='<div class="chips">'+p.gearChips.map(function(c){return '<span class="tnode">'+ic(c.icon)+esc(c.label)+'</span>';}).join("")+'</div>';
    h+='<div class="stats" style="--n:3;margin-top:18px">'+
      '<div class="stat"><div class="big">'+(p.shots?p.shots.length:'—')+'</div><div class="lbl">Shots</div><div class="sub">'+esc(p.reelLength||"")+' final</div></div>'+
      '<div class="stat" style="--cat:var(--c2)"><div class="big" style="font-size:1.4rem;margin-top:8px">'+esc((p.timeBudget||"—").split("·")[0].trim())+'</div><div class="lbl">Time budget</div><div class="sub">'+esc(p.timeBudget||"")+'</div></div>'+
      '<div class="stat" style="--cat:var(--c4)"><div class="big">'+(p.deliverables?p.deliverables.length:0)+'</div><div class="lbl">Deliverables</div><div class="sub">Real business assets</div></div></div>';
    if(p.brief) h+=secCard("The brief","i-target",'<ul class="list" style="--bc:'+acc+'">'+
      (p.brief.objective?'<li><b>Objective.</b> '+md(p.brief.objective)+'</li>':'')+
      (p.brief.audience?'<li><b>Audience.</b> '+md(p.brief.audience)+'</li>':'')+
      (p.brief.psychology?'<li><b>Customer psychology.</b> '+md(p.brief.psychology)+'</li>':'')+
      (p.brief.positioning?'<li><b>Luxury positioning.</b> '+md(p.brief.positioning)+'</li>':'')+'</ul>',acc);
    if(p.creativeDirection) h+=secCard("Creative direction","i-palette",'<p class="lead" style="color:var(--ink)">'+md(p.creativeDirection)+'</p>');
    if(p.viralAutopsy){ var va=p.viralAutopsy; h+=secCard("Why it stops the scroll","i-eye",
      '<ul class="list">'+(va.triggers||[]).map(function(t){return '<li><b>'+esc(t.k)+'.</b> '+md(t.body)+'</li>';}).join("")+'</ul>'+
      (va.borrow?'<div class="note note--done">'+ic("i-star")+'<span><b>Borrow from the pros.</b> '+md(va.borrow)+'</span></div>':'')); }
    if(p.storyboard){ var sb=p.storyboard,body='';
      if(sb.beats) body+='<div class="track">'+sb.beats.map(function(b){return '<div class="seg seg--'+(b.seg||'flat')+'" style="flex:1"><span class="sname">'+esc(b.name)+'</span><span class="srange">'+esc(b.range||"")+'</span></div>';}).join("")+'</div>';
      if(sb.light) body+='<div class="note note--you">'+ic("i-clock")+'<span><b>Best light.</b> '+md(sb.light)+'</span></div>';
      if(sb.playback) body+='<div class="playback"><div class="ph">'+ic("i-activity")+' Picture it playing on Instagram</div>'+sb.playback.map(function(x){return '<div class="beat"><span class="tc">'+esc(x.tc)+'</span><span>'+md(x.body)+'</span></div>';}).join("")+(sb.land?'<p class="land">'+md(sb.land)+'</p>':'')+'</div>';
      h+=secCard("Storyboard","i-map",body); }
    if(p.locations) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-map")+'</span><div><h3>Where to shoot this</h3><div class="val">real spots to scout — Shimla &amp; around</div></div></div><ul class="list">'+p.locations.map(function(l){return '<li><b>'+esc(l.name)+'</b> — '+esc(l.area)+'. '+md(l.why)+' <a class="chiplink" href="'+esc(l.maps)+'" target="_blank" rel="noopener">'+ic("i-pin")+'Open in Maps</a></li>';}).join("")+'</ul><div class="note note--warn">'+ic("i-warn")+'<span>Scouting suggestions from a quick web scan — verify they\'re still open and suitable, and always ask permission before filming inside a business.</span></div></div>';
    if(p.shots) p.shots.forEach(function(sh){
      var body='<p class="lead" style="color:var(--ink)"><b>Purpose:</b> '+md(sh.purpose)+'</p>';
      if(sh.settings) body+='<div class="minigrid" style="--m:3;margin-top:14px">'+sh.settings.map(function(c){return '<div class="cell'+(c.lever?' lever':'')+'"><div class="t">'+esc(c.t)+'</div><div class="v">'+esc(c.v)+(c.sub?' <small>'+esc(c.sub)+'</small>':'')+'</div></div>';}).join("")+'</div>';
      var g2=''; if(sh.brightness)g2+='<li><b>Exposure.</b> '+md(sh.brightness)+'</li>'; if(sh.framing)g2+='<li><b>Framing.</b> '+md(sh.framing)+'</li>'; if(sh.mistakes)g2+='<li><b>Common mistake.</b> '+md(sh.mistakes)+'</li>';
      if(g2) body+='<ul class="list" style="margin-top:14px">'+g2+'</ul>';
      if(sh.capture) body+='<div class="capture"><div class="ch">'+ic("i-walk")+' How to capture it</div>'+(sh.capture.intro?'<p class="intro">'+md(sh.capture.intro)+'</p>':'')+'<ol>'+(sh.capture.steps||[]).map(function(x){return '<li>'+md(x)+'</li>';}).join("")+'</ol>'+(sh.inspo?'<a class="inspo" href="'+esc(sh.inspo.url)+'" target="_blank" rel="noopener">'+ic("i-compass")+esc(sh.inspo.label)+'</a>':'')+'</div>';
      if(sh.ideas) body+='<ul class="list" style="--bc:'+acc+';margin-top:12px">'+sh.ideas.map(function(x){return '<li>'+md(x)+'</li>';}).join("")+'</ul>';
      h+='<div class="card cat" style="--bc:'+acc+'"><div class="card-top"><div class="card-title"><span class="ico">'+ic("i-camera")+'</span><div><h3>'+esc(sh.name)+'</h3>'+(sh.role?'<div class="val">'+esc(sh.role)+'</div>':'')+'</div></div>'+(sh.lens?'<span class="pill pill--brand">'+esc(sh.lens)+'</span>':'')+'</div>'+body+'</div>';
    });
    h+=renderWorkflow("Editing","i-film",p.editing,"var(--c3)");
    h+=renderWorkflow("Colour","i-palette",p.color,"var(--c4)");
    h+=renderWorkflow("Audio","i-mic",p.audio,"var(--c5)");
    if(p.exportNote) h+=secCard("Export","i-arrow",'<p class="lead" style="color:var(--ink)">'+md(p.exportNote)+'</p>');
    if(p.monetization||p.pricing){ var pb=''; if(p.monetization)pb+='<p class="lead" style="color:var(--ink)">'+md(p.monetization)+'</p>';
      if(p.pricing)pb+='<ul class="list" style="--bc:var(--c2);margin-top:8px">'+(p.pricing.quote?'<li><b>Quote.</b> '+md(p.pricing.quote)+'</li>':'')+(p.pricing.upsell?'<li><b>Upsell.</b> '+md(p.pricing.upsell)+'</li>':'')+(p.pricing.retainer?'<li><b>Retainer.</b> '+md(p.pricing.retainer)+'</li>':'')+'</ul>';
      h+=secCard("The money","i-cash",pb); }
    if(p.deliverables){ var prog=(store.get("projDeliv",{})[p.id])||{};
      h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-check")+'</span><div><h3>Deliverables</h3><div class="val">the real business assets</div></div></div>'+
        p.deliverables.map(function(d){var on=!!prog[d.id]; return '<div class="check'+(on?' on':'')+'" data-deliv="'+p.id+'|'+d.id+'"><span class="box">'+ic("i-check")+'</span><span class="lab">'+esc(d.label)+'</span></div>';}).join("")+'</div>'; }
    if(p.skills){ var done=store.get("projDone",{})[p.id];
      h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-graph")+'</span><div><h3>Skills this project advances</h3></div></div><div style="margin-top:10px">'+p.skills.map(function(s){var sk=skillById(s.skillId); return '<span class="chiplink" data-go="skills/'+s.skillId+'">'+ic("i-activity")+esc(sk?sk.name:s.skillId)+(s.toStage?' → '+esc(s.toStage):'')+'</span>';}).join("")+'</div>'+
        '<div class="row" style="margin-top:14px">'+(done?'<span class="pill pill--good">Completed '+esc(done)+'</span>':'<span class="btn btn--primary" data-complete="'+p.id+'">'+ic("i-check")+' Mark complete &amp; advance skills</span>')+'</div></div>'; }
    if(p.bibleUpdates) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-layers")+'</span><div><h3>Bible updates</h3><div class="val">what this project teaches the manuals</div></div></div><ul class="list">'+p.bibleUpdates.map(function(b){var bb=bibleById(b.bibleId); return '<li><b><a data-go="bibles/'+b.bibleId+'">'+esc(bb?bb.title:b.bibleId)+'</a>:</b> '+md(b.note)+'</li>';}).join("")+'</ul></div>';
    if(p.research) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-search")+'</span><div><h3>Research</h3></div></div><div style="margin-top:10px">'+p.research.map(function(rq){return '<a class="inspo" style="margin:0 8px 8px 0" href="'+esc(researchURL(rq.platform,rq.query))+'" target="_blank" rel="noopener">'+ic("i-ext")+esc(rq.platform)+': '+esc(rq.query)+'</a>';}).join("")+'</div></div>';
    h+=listCard("Reflection","i-bulb",p.reflection,false);
    h+=listCard("Review questions","i-flag",p.reviewQuestions,false);
    return h;
  }
  VIEWS.curriculum = function(r){
    if(r.param){ var p=projectById(r.param); return p?projectPage(p):VIEWS._placeholder(r); }
    var html=head("Curriculum","A project-based apprenticeship. Each project is a real hospitality engagement that ships business assets and moves skills forward — theory only serves the project.","Curriculum");
    (NS.curriculumPhases||[]).forEach(function(ph){
      var items=(NS.curriculum||[]).filter(function(p){return p.phase===ph.id;}); if(!items.length) return;
      html+='<article class="card cat" style="--bc:'+ph.accent+';margin-top:18px"><div class="card-top"><div class="card-title"><span class="ico">'+ic(ph.icon)+'</span><div><h3>'+esc(ph.label)+'</h3><div class="val">'+esc(ph.blurb)+'</div></div></div></div>'+
        '<div class="cardgrid" style="margin-top:16px">'+items.map(function(p){ var avail=p.status==="available";
          return '<div class="'+(avail?'tile':'tile lock')+'" style="--dc:'+ph.accent+'"'+(avail?(' data-go="curriculum/'+p.id+'"'):'')+'><div class="tn">PROJECT '+String(p.order).padStart(2,"0")+' '+ic(avail?"i-arrow":"i-lock")+'</div><div class="tt">'+esc(p.title)+'</div><div class="td">'+esc(p.blurb)+'</div><div class="go">'+(avail?'Open':'Planned')+' '+ic(avail?"i-arrow":"i-lock")+'</div></div>'; }).join("")+'</div></article>';
    });
    return html;
  };

  /* ---- CREATIVE DIRECTOR (eye-training) ---- */
  function cdLog(){ return store.get("cdlog",[])||[]; }
  function cdDrillById(id){ return (NS.cdDrills||[]).find(function(d){return d.id===id;}); }
  function cdTypeById(id){ return (NS.cdTypes||[]).find(function(t){return t.id===id;}); }
  function cdTodayDrill(){ var d=NS.cdDrills||[]; if(!d.length) return null; return d[Math.floor(Date.now()/86400000)%d.length]; }
  function cdDrillCard(d){ var t=cdTypeById(d.type)||{accent:'var(--primary)',label:d.type,icon:'i-eye'};
    return '<div class="tile" data-go="creative-director/'+d.id+'" style="--dc:'+t.accent+'"><div class="tn">'+ic(t.icon)+' '+esc(t.label.toUpperCase())+'</div><div class="tt">'+esc(d.title)+'</div><div class="td">'+esc(d.prompt.slice(0,92))+'…</div><div class="go">Begin '+ic("i-arrow")+'</div></div>'; }
  function cdDrillPage(d){
    var t=cdTypeById(d.type)||{accent:'var(--primary)',label:d.type,icon:'i-eye'};
    var mine=cdLog().filter(function(e){return e.drillId===d.id;});
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="creative-director">Creative Director</a>'+ic("i-chevron")+'<span>'+esc(d.title)+'</span></div>'+
      '<div class="phead"><div><div class="eyebrow">'+esc(t.label)+'</div><h1 class="ptitle" style="margin-top:10px">'+esc(d.title)+'</h1></div></div>'+
      '<div class="card cat" style="--bc:'+t.accent+'"><div class="card-title"><span class="ico">'+ic(t.icon)+'</span><div><h3>The challenge</h3></div></div><p class="lead" style="color:var(--ink);font-size:1rem">'+md(d.prompt)+'</p></div>'+
      listCard("What to look for","i-eye",d.lookFor,false);
    if(d.research) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-search")+'</span><div><h3>Reference</h3></div></div><div style="margin-top:10px"><a class="inspo" href="'+esc(researchURL(d.research.platform,d.research.query))+'" target="_blank" rel="noopener">'+ic("i-ext")+esc(d.research.platform)+': '+esc(d.research.query)+'</a></div></div>';
    var cc="";
    if(d.bibles&&d.bibles.length) cc+='<div style="margin-bottom:12px"><div class="bl-h">Study in the Bibles</div>'+d.bibles.map(function(id){var b=bibleById(id);return '<span class="chiplink" data-go="bibles/'+id+'">'+ic("i-layers")+esc(b?b.title:id)+'</span>';}).join("")+'</div>';
    if(d.skills&&d.skills.length) cc+='<div><div class="bl-h">Trains the skills</div>'+d.skills.map(function(id){var s=skillById(id);return '<span class="chiplink" data-go="skills/'+id+'">'+ic("i-activity")+esc(s?s.name:id)+'</span>';}).join("")+'</div>';
    if(cc) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-graph")+'</span><div><h3>Connections</h3></div></div><div style="margin-top:12px">'+cc+'</div></div>';
    h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-edit")+'</span><div><h3>Your analysis</h3><div class="val">write what you noticed</div></div></div><div class="field" style="margin-top:12px"><textarea class="input" id="cdnotes" placeholder="What did you see? What would you change? What will you steal?"></textarea></div><div class="row"><span class="btn btn--primary" data-cdsave="'+d.id+'">'+ic("i-check")+' Save observation</span></div></div>';
    if(mine.length) h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-book")+'</span><div><h3>Your past observations</h3><div class="val">'+mine.length+' logged</div></div></div>'+mine.slice().reverse().map(function(e){return '<div style="padding:12px 0;border-top:1px solid var(--line)"><div style="font-family:\'JetBrains Mono\',monospace;font-size:.64rem;color:var(--ink-faint);display:flex;justify-content:space-between"><span>'+esc(e.date)+'</span><span class="chiplink" data-cddel="'+e.id+'" style="padding:1px 8px">'+ic("i-trash")+'delete</span></div><div style="margin-top:6px;color:var(--ink-soft);font-size:.93rem;line-height:1.6">'+md(e.notes)+'</div></div>';}).join("")+'</div>';
    return h;
  }
  VIEWS["creative-director"] = function(r){
    if(r.param){ var d=cdDrillById(r.param); return d?cdDrillPage(d):VIEWS._placeholder(r); }
    var today=cdTodayDrill(), log=cdLog();
    var html=head("Creative Director","Train the eye before the hand. One real observation a day — out in the world, not on a screen — compounds into taste no tutorial can teach.","Creative Director");
    html+='<div class="stats" style="--n:2;margin-top:18px"><div class="stat"><div class="big">'+log.length+'</div><div class="lbl">Observations logged</div><div class="sub">Every entry sharpens your judgment</div></div>'+
      '<div class="stat" style="--cat:var(--c4)"><div class="big" style="font-size:1.35rem;margin-top:10px">'+esc(today?today.title:"—")+'</div><div class="lbl">Today\'s challenge</div><div class="sub">Rotates daily</div></div></div>';
    if(today){ var tt=cdTypeById(today.type)||{accent:'var(--primary)',icon:'i-eye',label:today.type};
      html+='<div class="card cat" style="--bc:'+tt.accent+';margin-top:18px"><div class="card-top"><div class="card-title"><span class="ico">'+ic(tt.icon)+'</span><div><h3>Today\'s eye-training</h3><div class="val">'+esc(tt.label)+'</div></div></div></div><p class="lead" style="color:var(--ink)">'+md(today.prompt)+'</p><div class="row" style="margin-top:14px"><span class="btn btn--primary" data-go="creative-director/'+today.id+'">'+ic("i-eye")+' Begin today’s challenge</span></div></div>'; }
    (NS.cdTypes||[]).forEach(function(t){
      var items=(NS.cdDrills||[]).filter(function(d){return d.type===t.id;}); if(!items.length) return;
      html+='<div class="sec-head" style="margin-top:28px"><p class="eyebrow">'+esc(t.label)+'</p><h2 style="font-size:1.3rem">'+esc(t.label)+'</h2><p>'+esc(t.blurb)+'</p></div><div class="cardgrid">'+items.map(function(d){return cdDrillCard(d);}).join("")+'</div>';
    });
    return html;
  };

  /* ---- BUSINESS CRM ---- */
  var CRM_STAGES=[["lead","Leads","var(--c6)"],["prospect","Prospects","var(--c3)"],["client","Clients","var(--c1)"],["past","Past clients","var(--ink-faint)"]];
  function crmAll(){ return store.get("crm",[])||[]; }
  function crmById(id){ return crmAll().find(function(c){return c.id===id;}); }
  function fval(id){ var el=document.getElementById(id); return el?String(el.value).trim():""; }
  function uid(){ return Date.now()+"-"+Math.random().toString(36).slice(2,7); }
  function stageLabel(s){ var f=CRM_STAGES.find(function(x){return x[0]===s;}); return f?f[1]:s; }
  function stageColor2(s){ var f=CRM_STAGES.find(function(x){return x[0]===s;}); return f?f[2]:'var(--primary)'; }
  function field(label,id,v){ return '<div class="field"><label>'+esc(label)+'</label><input class="input" id="'+id+'" value="'+esc(v||"")+'"></div>'; }
  function areaField(label,id,v){ return '<div class="field"><label>'+esc(label)+'</label><textarea class="input" id="'+id+'">'+esc(v||"")+'</textarea></div>'; }
  function selectField(label,id,opts,sel){ return '<div class="field"><label>'+esc(label)+'</label><select class="input" id="'+id+'">'+opts.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===sel?' selected':'')+'>'+esc(o[1])+'</option>';}).join("")+'</select></div>'; }
  function crmClientPage(c){
    var h='<div class="crumb"><a data-go="today">Home</a>'+ic("i-chevron")+'<a data-go="crm">Business CRM</a>'+ic("i-chevron")+'<span>'+esc(c.name)+'</span></div>'+
      '<div class="phead"><div><h1 class="ptitle">'+esc(c.name)+'</h1><p class="psub">'+esc(c.businessType||"")+'</p></div><span class="mstage" style="background:'+stageColor2(c.stage)+'">'+esc(stageLabel(c.stage))+'</span></div>';
    h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-edit")+'</span><div><h3>Details</h3></div></div>'+
      field("Name","crm-name",c.name)+
      selectField("Stage","crm-stage",CRM_STAGES.map(function(s){return [s[0],s[1]];}),c.stage)+
      '<div class="grid g2">'+field("Business type","crm-type",c.businessType)+field("Source","crm-source",c.source)+'</div>'+
      '<div class="grid g2">'+field("Contact","crm-contact",c.contact)+field("Retainer (₹/mo)","crm-retainer",c.retainer)+'</div>'+
      field("Next action","crm-next",c.nextAction)+
      areaField("Notes","crm-notes",c.notes)+
      '<div class="row"><span class="btn btn--primary" data-crmsave="'+c.id+'">'+ic("i-check")+' Save</span><span class="btn" data-crmdel="'+c.id+'">'+ic("i-trash")+' Delete</span></div></div>';
    h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-flag")+'</span><div><h3>Follow-ups</h3></div></div>'+
      ((c.followUps&&c.followUps.length)?c.followUps.map(function(f){return '<div class="check'+(f.done?' on':'')+'" data-crmfu="'+c.id+'|'+f.id+'"><span class="box">'+ic("i-check")+'</span><span class="lab">'+esc(f.text)+(f.date?' · '+esc(f.date):'')+'</span></div>';}).join(""):'<p class="lead" style="color:var(--ink-faint)">No follow-ups yet.</p>')+
      '<div class="row" style="margin-top:12px"><input class="input" id="crm-fu" placeholder="Add a follow-up…" style="flex:1;min-width:160px"><span class="btn" data-crmfuadd="'+c.id+'">'+ic("i-plus")+' Add</span></div></div>';
    h+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-cash")+'</span><div><h3>Quotes</h3></div></div>'+
      ((c.quotes&&c.quotes.length)?'<table class="table"><tr><th>Item</th><th>₹</th><th></th></tr>'+c.quotes.map(function(q){return '<tr><td>'+esc(q.label)+'</td><td>₹'+(+q.amount||0).toLocaleString("en-IN")+'</td><td><span class="chiplink" data-crmqdel="'+c.id+'|'+q.id+'">'+ic("i-trash")+'</span></td></tr>';}).join("")+'</table>':'<p class="lead" style="color:var(--ink-faint)">No quotes yet.</p>')+
      '<div class="row" style="margin-top:12px"><input class="input" id="crm-q-label" placeholder="Quote item" style="flex:2;min-width:140px"><input class="input" id="crm-q-amt" placeholder="₹" style="flex:1;min-width:80px"><span class="btn" data-crmqadd="'+c.id+'">'+ic("i-plus")+' Add</span></div></div>';
    return h;
  }
  VIEWS.crm = function(r){
    if(r.param){ var c=crmById(r.param); return c?crmClientPage(c):VIEWS._placeholder(r); }
    var all=crmAll();
    var html=head("Business CRM","Leads → prospects → clients → past. This is the money pipeline — the work the studio runs on.","Business CRM");
    html+='<div class="stats" style="--n:4;margin-top:18px">'+CRM_STAGES.map(function(s){var n=all.filter(function(c){return c.stage===s[0];}).length; return '<div class="stat" style="--cat:'+s[2]+'"><div class="big">'+n+'</div><div class="lbl">'+esc(s[1])+'</div></div>';}).join("")+'</div>';
    html+='<div class="card" style="margin-top:18px"><div class="card-title"><span class="ico">'+ic("i-plus")+'</span><div><h3>Add a lead</h3></div></div>'+
      '<div class="grid g2">'+field("Name","crm-new-name","")+field("Business type","crm-new-type","")+'</div>'+
      '<div class="grid g2">'+field("Source","crm-new-source","")+field("Contact","crm-new-contact","")+'</div>'+
      field("Next action","crm-new-next","")+
      '<div class="row"><span class="btn btn--primary" data-crmadd="1">'+ic("i-check")+' Add to pipeline</span></div></div>';
    CRM_STAGES.forEach(function(s){
      var items=all.filter(function(c){return c.stage===s[0];}); if(!items.length) return;
      html+='<div class="sec-head" style="margin-top:24px"><p class="eyebrow">'+esc(s[1])+'</p></div><div class="cardgrid">'+items.map(function(c){return '<div class="tile" data-go="crm/'+c.id+'" style="--dc:'+s[2]+'"><div class="tn">'+esc((c.businessType||"client").toUpperCase())+'</div><div class="tt">'+esc(c.name)+'</div>'+(c.nextAction?'<div class="td">→ '+esc(c.nextAction)+'</div>':'')+'<div class="go">Open '+ic("i-arrow")+'</div></div>';}).join("")+'</div>';
    });
    if(!all.length) html+='<div class="empty">'+ic("i-users")+'<p style="margin-top:12px">No clients yet. Add your first lead above.</p></div>';
    return html;
  };

  /* ---- BUSINESS DASHBOARD ---- */
  function bizMetrics(){
    var inc=store.get("income",[])||[]; var crm=crmAll();
    var revenue=inc.reduce(function(a,b){return a+(+b.amount||0);},0);
    var now=new Date(); var ym=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0");
    var monthRev=inc.filter(function(x){return (x.date||"").slice(0,7)===ym;}).reduce(function(a,b){return a+(+b.amount||0);},0);
    var retainer=crm.filter(function(c){return c.stage==="client";}).reduce(function(a,b){return a+(+b.retainer||0);},0);
    var hours=inc.reduce(function(a,b){return a+(+b.hours||0);},0);
    var projInc=inc.filter(function(x){return x.type!=="retainer";});
    var avgProj=projInc.length?Math.round(revenue/projInc.length):0;
    var ehr=hours?Math.round(revenue/hours):0;
    var clients=crm.filter(function(c){return c.stage==="client"||c.stage==="past";}).length;
    var conv=crm.length?Math.round(clients/crm.length*100):0;
    var ltv=clients?Math.round(revenue/clients):0;
    var done=Object.keys(store.get("projDone",{})).length;
    var port=(store.get("portfolio",[])||[]).length;
    return {revenue:revenue,monthRev:monthRev,retainer:retainer,hours:hours,avgProj:avgProj,ehr:ehr,clients:clients,conv:conv,ltv:ltv,done:done,port:port,inc:inc};
  }
  VIEWS.business = function(){
    var m=bizMetrics(), im=incomeMilestone(), revPct=im.next?Math.min(100,Math.round(im.total/im.next*100)):100;
    var html=head("Business Dashboard","The numbers that tell the truth — computed live from your CRM and logged income. Sell outcomes, raise rates, watch the effective hourly rate.","Business Dashboard");
    html+='<div class="stats" style="--n:4;margin-top:18px">'+
      '<div class="stat"><div class="big" style="font-size:1.9rem">₹'+m.revenue.toLocaleString("en-IN")+'</div><div class="lbl">Total revenue</div><div class="sub">all logged income</div></div>'+
      '<div class="stat" style="--cat:var(--c3)"><div class="big" style="font-size:1.9rem">₹'+m.monthRev.toLocaleString("en-IN")+'</div><div class="lbl">This month</div></div>'+
      '<div class="stat" style="--cat:var(--c2)"><div class="big" style="font-size:1.9rem">₹'+m.retainer.toLocaleString("en-IN")+'</div><div class="lbl">Retainers / mo</div><div class="sub">recurring</div></div>'+
      '<div class="stat" style="--cat:var(--c4)"><div class="big">'+m.clients+'</div><div class="lbl">Clients</div></div></div>';
    html+='<div class="card" style="margin-top:18px"><div class="card-title"><span class="ico">'+ic("i-target")+'</span><div><h3>Revenue milestone</h3><div class="val">next: ₹'+(im.next/1000)+'k</div></div></div><div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--ink-faint);font-family:\'JetBrains Mono\',monospace"><span>₹'+im.total.toLocaleString("en-IN")+'</span><span>'+revPct+'%</span></div><div class="progbar" style="margin-top:6px"><i style="width:'+revPct+'%"></i></div></div></div>';
    html+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-activity")+'</span><div><h3>Key metrics</h3><div class="val">computed live</div></div></div><div class="minigrid" style="--m:3;margin-top:6px">'+
      '<div class="cell"><div class="t">Conversion</div><div class="v">'+m.conv+'%</div></div>'+
      '<div class="cell"><div class="t">Avg project value</div><div class="v">₹'+m.avgProj.toLocaleString("en-IN")+'</div></div>'+
      '<div class="cell lever"><div class="t">Effective hourly rate</div><div class="v">₹'+m.ehr.toLocaleString("en-IN")+' <small>/hr</small></div></div>'+
      '<div class="cell"><div class="t">Client LTV</div><div class="v">₹'+m.ltv.toLocaleString("en-IN")+'</div></div>'+
      '<div class="cell"><div class="t">Projects shipped</div><div class="v">'+m.done+'</div></div>'+
      '<div class="cell"><div class="t">Hours logged</div><div class="v">'+m.hours+'</div></div></div>'+
      '<div class="note note--you">'+ic("i-bulb")+'<span>Effective hourly rate is the number that tells the truth about a client. Log hours with each payment to keep it honest.</span></div></div>';
    html+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-plus")+'</span><div><h3>Log income</h3></div></div>'+
      '<div class="grid g2">'+field("Amount (₹)","inc-amt","")+selectField("Type","inc-type",[["project","Project"],["retainer","Retainer"]],"project")+'</div>'+
      '<div class="grid g2">'+field("Source / client","inc-src","")+field("Hours worked","inc-hours","")+'</div>'+
      '<div class="row"><span class="btn btn--primary" data-incadd="1">'+ic("i-check")+' Add income</span></div></div>';
    if(m.inc.length) html+='<div class="card"><div class="card-title"><span class="ico">'+ic("i-cash")+'</span><div><h3>Recent income</h3></div></div><table class="table"><tr><th>Date</th><th>Source</th><th>Type</th><th>₹</th><th></th></tr>'+m.inc.slice().reverse().map(function(x){return '<tr><td>'+esc(x.date)+'</td><td>'+esc(x.source||"")+'</td><td>'+esc(x.type||"")+'</td><td>₹'+(+x.amount||0).toLocaleString("en-IN")+'</td><td><span class="chiplink" data-incdel="'+x.id+'">'+ic("i-trash")+'</span></td></tr>';}).join("")+'</table></div>';
    return html;
  };

  /* ---- CREATIVE BRAIN ---- */
  var BRAIN_TYPES=[["idea","Idea","i-bulb"],["observation","Observation","i-eye"],["business","Business insight","i-bag"],["light","Light","i-sun"],["texture","Texture","i-layers"],["colour","Colour","i-palette"],["audio","Audio","i-mic"],["client","Client idea","i-users"],["win","Win","i-star"],["mistake","Mistake","i-warn"]];
  function brainAll(){ return store.get("brain",[])||[]; }
  function brainTypeOf(id){ var f=BRAIN_TYPES.find(function(x){return x[0]===id;}); return f||[id,id,"i-bulb"]; }
  VIEWS.brain = function(r){
    var all=brainAll(), filter=r.param||"", shown=filter?all.filter(function(e){return e.type===filter;}):all;
    var html=head("Creative Brain","Ideas, observations, light, textures, wins and mistakes — the raw material your work is made from. Capture fast, find it later.","Creative Brain");
    html+='<div class="card" style="margin-top:6px"><div class="card-title"><span class="ico">'+ic("i-plus")+'</span><div><h3>Capture</h3></div></div>'+
      '<div class="grid g2">'+selectField("Type","brain-type",BRAIN_TYPES.map(function(t){return [t[0],t[1]];}),"idea")+field("Title (optional)","brain-title","")+'</div>'+
      areaField("What’s on your mind?","brain-body","")+
      field("Tags (comma-separated)","brain-tags","")+
      '<div class="row"><span class="btn btn--primary" data-brainadd="1">'+ic("i-check")+' Save to brain</span></div></div>';
    html+='<div class="row" style="margin:4px 0 14px"><span class="tag" data-go="brain">All ('+all.length+')</span>'+BRAIN_TYPES.map(function(t){var n=all.filter(function(e){return e.type===t[0];}).length; return n?'<span class="tag" data-go="brain/'+t[0]+'">'+esc(t[1])+' ('+n+')</span>':'';}).join("")+'</div>';
    if(!shown.length){ html+='<div class="empty">'+ic("i-bulb")+'<p style="margin-top:12px">'+(all.length?'Nothing in this filter.':'Your brain is empty. Capture your first thought above.')+'</p></div>'; return html; }
    html+=shown.slice().reverse().map(function(e){var t=brainTypeOf(e.type);
      return '<div class="card cat" style="--bc:var(--c1);padding:18px 20px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="pill pill--brand">'+esc(t[1])+'</span><span style="font-family:\'JetBrains Mono\',monospace;font-size:.62rem;color:var(--ink-faint)">'+esc(e.date)+' <span class="chiplink" data-braindel="'+e.id+'" style="padding:1px 7px">'+ic("i-trash")+'</span></span></div>'+(e.title?'<h3 style="font-size:1.1rem;margin-top:8px">'+esc(e.title)+'</h3>':'')+'<div class="lead" style="color:var(--ink-soft);margin-top:'+(e.title?'4px':'10px')+'">'+md(e.body)+'</div>'+((e.tags&&e.tags.length)?'<div class="row" style="margin-top:10px">'+e.tags.map(function(tg){return '<span class="tag">#'+esc(tg)+'</span>';}).join("")+'</div>':'')+'</div>';
    }).join("");
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
    var dv=e.target.closest("[data-deliv]"); if(dv){ var pp=dv.getAttribute("data-deliv").split("|"); var pd=store.get("projDeliv",{}); pd[pp[0]]=pd[pp[0]]||{}; pd[pp[0]][pp[1]]=!pd[pp[0]][pp[1]]; store.set("projDeliv",pd); render(); return; }
    var cpl=e.target.closest("[data-complete]"); if(cpl){ var pid=cpl.getAttribute("data-complete"); var pr=projectById(pid); if(pr&&pr.skills){ pr.skills.forEach(function(s){ if(s.toStage) setSkillStage(s.skillId,s.toStage); }); } var dn=store.get("projDone",{}); dn[pid]=todayKey(); store.set("projDone",dn); render(); return; }
    var cs=e.target.closest("[data-cdsave]"); if(cs){ var ta=document.getElementById("cdnotes"); var v=ta?ta.value.trim():""; if(v){ var did=cs.getAttribute("data-cdsave"); var dd=cdDrillById(did); var lg=cdLog(); lg.push({id:Date.now()+"-"+Math.random().toString(36).slice(2,7),date:todayKey(),drillId:did,type:dd?dd.type:"",title:dd?dd.title:"",notes:v}); store.set("cdlog",lg); if(stageIndex(skillStage("creative-direction"))<1) setSkillStage("creative-direction","Introduced"); } render(); return; }
    var cdd=e.target.closest("[data-cddel]"); if(cdd){ var did2=cdd.getAttribute("data-cddel"); store.set("cdlog",cdLog().filter(function(x){return x.id!==did2;})); render(); return; }
    if(e.target.closest("[data-crmadd]")){ var nm=fval("crm-new-name"); if(nm){ var a=crmAll(); a.push({id:uid(),name:nm,stage:"lead",businessType:fval("crm-new-type"),source:fval("crm-new-source"),contact:fval("crm-new-contact"),nextAction:fval("crm-new-next"),notes:"",retainer:"",followUps:[],quotes:[],createdAt:todayKey()}); store.set("crm",a); } render(); return; }
    var csv=e.target.closest("[data-crmsave]"); if(csv){ var a2=crmAll(); var c2=a2.find(function(x){return x.id===csv.getAttribute("data-crmsave");}); if(c2){ c2.name=fval("crm-name")||c2.name; c2.stage=fval("crm-stage"); c2.businessType=fval("crm-type"); c2.source=fval("crm-source"); c2.contact=fval("crm-contact"); c2.retainer=fval("crm-retainer"); c2.nextAction=fval("crm-next"); c2.notes=fval("crm-notes"); store.set("crm",a2); } render(); return; }
    var cdl=e.target.closest("[data-crmdel]"); if(cdl){ store.set("crm",crmAll().filter(function(x){return x.id!==cdl.getAttribute("data-crmdel");})); go("crm"); return; }
    var cfu=e.target.closest("[data-crmfu]"); if(cfu){ var pr2=cfu.getAttribute("data-crmfu").split("|"); var a3=crmAll(); var c3=a3.find(function(x){return x.id===pr2[0];}); if(c3){ var f=(c3.followUps||[]).find(function(y){return y.id===pr2[1];}); if(f){ f.done=!f.done; store.set("crm",a3); } } render(); return; }
    var cfa=e.target.closest("[data-crmfuadd]"); if(cfa){ var tv=fval("crm-fu"); if(tv){ var a4=crmAll(); var c4=a4.find(function(x){return x.id===cfa.getAttribute("data-crmfuadd");}); if(c4){ (c4.followUps=c4.followUps||[]).push({id:uid(),text:tv,date:todayKey(),done:false}); store.set("crm",a4); } } render(); return; }
    var cqa=e.target.closest("[data-crmqadd]"); if(cqa){ var ql=fval("crm-q-label"), qa=fval("crm-q-amt"); if(ql){ var a5=crmAll(); var c5=a5.find(function(x){return x.id===cqa.getAttribute("data-crmqadd");}); if(c5){ (c5.quotes=c5.quotes||[]).push({id:uid(),label:ql,amount:qa,status:"sent"}); store.set("crm",a5); } } render(); return; }
    var cqd=e.target.closest("[data-crmqdel]"); if(cqd){ var pr3=cqd.getAttribute("data-crmqdel").split("|"); var a6=crmAll(); var c6=a6.find(function(x){return x.id===pr3[0];}); if(c6){ c6.quotes=(c6.quotes||[]).filter(function(y){return y.id!==pr3[1];}); store.set("crm",a6); } render(); return; }
    if(e.target.closest("[data-incadd]")){ var am=fval("inc-amt"); if(am){ var inc=store.get("income",[])||[]; inc.push({id:uid(),date:todayKey(),amount:+am||0,source:fval("inc-src"),type:fval("inc-type"),hours:+fval("inc-hours")||0}); store.set("income",inc); } render(); return; }
    var icd=e.target.closest("[data-incdel]"); if(icd){ store.set("income",(store.get("income",[])||[]).filter(function(x){return x.id!==icd.getAttribute("data-incdel");})); render(); return; }
    if(e.target.closest("[data-brainadd]")){ var bb=fval("brain-body"); if(bb){ var br=brainAll(); br.push({id:uid(),date:todayKey(),type:fval("brain-type"),title:fval("brain-title"),body:bb,tags:fval("brain-tags").split(",").map(function(s){return s.trim();}).filter(Boolean)}); store.set("brain",br); } render(); return; }
    var brd=e.target.closest("[data-braindel]"); if(brd){ store.set("brain",brainAll().filter(function(x){return x.id!==brd.getAttribute("data-braindel");})); render(); return; }
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
