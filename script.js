const R=[
["1.1","Planif. y Diseño del Paisaje I",1,"","","",1],["1.2","Sistemas de Rep. Geométrica",1,"","","",1],["1.3","Química General",1,"","","",0],["1.4","Botánica General",1,"","","",0],["1.5","Física Aplicada",1,"","","",0],["1.6","Vegetación I",1,"","1.4","1.4",0],["1.7","Química Biológica",1,"","","",0],["1.8","Material. Elem. y Proced. de Constr.",1,"","","",0],["1.9","Botánica Sistemática",0,"","1.4","1.4",0],
["2.1","Planif. y Dis. del Paisaje II",0,"","1.1,1.2,1.6","",1],["2.2","Morfología y Comunicación I",0,"","1.2","",1],["2.3","Vegetación II",0,"","1.6","1.4,1.6",0],["2.4","Fisiología Vegetal",0,"","1.4,1.7","1.4,1.7",0],["2.5","Edafología",0,"","1.7","1.7",0],["2.6","Climatología y Fenología",0,"","1.9","1.9",0],["2.7","Topografía",0,"","1.2","1.2",0],["2.8","Instalaciones y Equipamientos",0,"","1.5,1.8","1.5,1.8",0],
["3.1","Planif. y Dis. del Paisaje III",0,"","2.1,2.2","",1],["3.2","Morfología y Comunicación II",0,"","1.1,2.2","",1],["3.3","Historia de la Arq. Paisajista I",0,"","1.1","1.1",0],["3.4","Geografía",0,"","2.1","2.1",0],["3.5","Ecología",0,"","1.9,2.4,2.5,2.6","1.9,2.4,2.5,2.6",0],["3.6","Fitogeografía",0,"","1.9,2.6,2.7","1.9,2.6,2.7",0],["3.7","Manejo del Suelo y la Vegetación",0,"","2.3,2.4,2.6,2.7,2.8","2.3,2.4,2.6,2.7,2.8",0],["3.8","MO: Materias optativas I",0,"","","",1],
["4.1","Planif. y Dis. de Paisaje IV",0,"","3.1,3.2","",1],["4.2","Historia de la Arq. Paisajista II",0,"3.3","3.1","3.3",0],["4.3","Planeamiento Urbano y Regional",0,"","3.1,3.2,3.4","3.4",0],["4.5","Trabajo Final o de Intensificación",0,"","3.1,3.2,4.7","ALL",0],["4.6","Práctica Profesional",0,"","3.1,3.7","3.1,3.7",0],["4.7","Ecología del Paisaje",0,"","3.5,3.6","3.5,3.6",0],["4.8","MO: Materias optativas II",0,"3.1,3.2,4.7","","ALL",0]];
const sp=s=>s&&s!="ALL"?s.split(","):[];
const M=R.map(r=>({id:r[0],n:r[1],cbc:r[2],ct:sp(r[3]),cf:sp(r[4]),ff:r[5]=="ALL"?"ALL":sp(r[5]),nf:r[6]}));
const by=Object.fromEntries(M.map(m=>[m.id,m]));
const ids=M.map(m=>m.id);
const LV=["1er año","2do año","3er año","4to año"];
let S={cbc:false,s:{}},sel=null,flt="all";
try{const x=JSON.parse(localStorage.getItem("paisaje-correlativas")||"null");if(x&&x.s)S=x}catch(e){}
const save=()=>{try{localStorage.setItem("paisaje-correlativas",JSON.stringify(S))}catch(e){}};
const st=i=>S.s[i]||0;const pre=i=>!!(S.p&&S.p[i]);
const ffl=m=>m.ff=="ALL"?ids.filter(i=>i!=m.id&&!(m.id=="4.8"&&i=="4.5")):m.ff;
const cbcOk=m=>true;
const can=m=>cbcOk(m)&&[...m.ct,...m.cf].every(i=>st(i)==2);
const finOk=m=>st(m.id)==1&&ffl(m).every(i=>st(i)==2);
const deps=m=>[...new Set([...m.ct,...m.cf,...(m.ff=="ALL"?[]:m.ff)])];
function anc(i,o=new Set){deps(by[i]).forEach(d=>{if(!o.has(d)){o.add(d);anc(d,o)}});return o}
function desc(i){const o=new Set(),q=[i];while(q.length){const x=q.pop();M.forEach(m=>{if(!o.has(m.id)&&deps(m).includes(x)){o.add(m.id);q.push(m.id)}})}return o}
function miss(i,o=new Set()){const m=by[i];m.ct.forEach(d=>{if(st(d)<2&&!o.has(d)){o.add(d);miss(d,o)}});m.cf.forEach(d=>{if(st(d)<2&&!o.has(d)){o.add(d);miss(d,o)}});return o}
const cls=m=>st(m.id)==2?"ap":st(m.id)==1?"cur":pre(m.id)?"pre":can(m)?"en":"blk";
const tree=document.getElementById("tree"),svg=document.getElementById("svg");
LV.forEach((l,k)=>{const c=document.createElement("div");c.className="col";c.innerHTML="<h2>"+l+"</h2>"+M.filter(m=>m.id[0]==k+1).map(m=>'<div class="c" data-id="'+m.id+'" tabindex="0" role="button"><small>'+m.id+'</small><span>'+m.n+'</span><button class="k" data-chk="'+m.id+'" title="Marcar como aprobada" aria-label="Marcar '+m.id+' como aprobada"></button></div>').join("");tree.appendChild(c)});
const chips=document.getElementById("chips");
[["all","Todas"],["en","Habilitadas para cursar"],["pend","Pendientes"],["ap","Aprobadas"]].forEach(([k,t])=>{const b=document.createElement("button");b.className="chip";b.textContent=t;b.dataset.k=k;chips.appendChild(b)});
const setSt=(i,v,p)=>{S.p=S.p||{};delete S.p[i];if(p)S.p[i]=1;S.s[i]=v;if(!v)delete S.s[i]};
function render(){
 const U=sel?anc(sel):null,D=sel?desc(sel):null;
 let a=0,c=0,e=0;
 M.forEach(m=>{const s=st(m.id);if(s==2)a++;else if(s==1)c++;else if(can(m))e++;
  const el=tree.querySelector('[data-id="'+m.id+'"]'),k=cls(m);
  el.className="c "+k+(sel==m.id?" sel":"")+(U&&U.has(m.id)?" up":"")+(D&&D.has(m.id)?" dn":"");
  const rel=!sel||sel==m.id||U.has(m.id)||D.has(m.id);
  const ok=flt=="all"||(flt=="en"&&s==0&&can(m))||(flt=="pend"&&s<2)||(flt=="ap"&&s==2);
  if(!rel||!ok)el.classList.add("dim");
  el.querySelector(".k").setAttribute("aria-pressed",s==2);
  const fin=finOk(m);el.querySelector("small").textContent=m.id+(fin?" · final habilitado":"");});
 nA.textContent=a;nC.textContent=c;nE.textContent=e;document.getElementById("pct").textContent=Math.round(a/M.length*100)+"% aprobado";
 document.getElementById("prog").innerHTML='<i style="width:'+a/M.length*100+'%;background:var(--ok)"></i><i style="width:'+c/M.length*100+'%;background:var(--cur)"></i>';
 chips.querySelectorAll(".chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k==flt));
 panel();edges();check();save();
}
function tags(l,f){return l.map(i=>'<button class="tag '+(f(i)?"y":"n")+'" data-go="'+i+'">'+(f(i)?"✓ ":"")+i+" "+by[i].n+"</button>").join("")}
function panel(){
 const p=document.getElementById("panel");
 if(!sel){p.innerHTML='<h3>Elegí una materia</h3><p class="sub" style="margin:0">Vas a ver sus requeridas, a qué materias habilita y cómo marcarla.</p>';return}
 const m=by[sel],s=st(sel);let h='<h3>'+m.id+" · "+m.n+"</h3>";
 const cur=s==2?"2":s==1?"1":pre(sel)?"pre":"0",a0=can(m)?"Habilitada":"Bloqueada";h+='<div class="row st">'+(m.nf?[["0",a0],["2","Aprobada"],["pre","Previa"]]:[["0",a0],["1","Cursada"],["2","Aprobada"],["pre","Previa"]]).map(([v,t])=>'<button data-set="'+v+'" aria-pressed="'+(cur==v)+'">'+t+"</button>").join("")+"</div>";
 if(m.ct.length)h+='<div class="row"><em>Cursar · aprobada de</em>'+tags(m.ct,i=>st(i)==2)+"</div>";
 if(m.cf.length)h+='<div class="row"><em>Cursar · final aprobado de</em>'+tags(m.cf,i=>st(i)==2)+"</div>";
 if(!m.nf){const f=ffl(m);h+='<div class="row"><em>Rendir final · finales de</em>'+(f.length?(m.ff=="ALL"?'<span class="tag '+(f.every(i=>st(i)==2)?"y":"n")+'">el resto de la carrera aprobada ('+f.filter(i=>st(i)==2).length+"/"+f.length+")</span>":tags(f,i=>st(i)==2)):'<span class="tag y">sin finales previos</span>')+"</div>"}
 const ms=[...miss(sel)].sort(),cb=false;
 h+='<div class="row"><em>Te falta para cursarla</em>'+(ms.length||cb?(cb?'<span class="tag n">CBC</span>':"")+tags(ms,()=>false):'<span class="tag y">nada: ya podés cursarla</span>')+"</div>";
 const dd=[...desc(sel)].sort();
 h+='<div class="row"><em>Habilita a</em>'+(dd.length?tags(dd,i=>st(i)==2):'<span class="tag">ninguna materia</span>')+"</div>";
 h+='<div class="row"><button class="btn s" data-prev>Marcar todas las previas como aprobadas</button></div>';
 p.innerHTML=h;
}
function edges(){
 const t=tree.getBoundingClientRect();svg.setAttribute("width",tree.scrollWidth);svg.setAttribute("height",tree.scrollHeight);
 if(!sel){svg.innerHTML="";return}
 const U=anc(sel),D=desc(sel);U.add(sel);D.add(sel);let o="";
 const pt=i=>{const r=tree.querySelector('[data-id="'+i+'"]').getBoundingClientRect();return{l:r.left-t.left,r:r.right-t.left,y:r.top-t.top+r.height/2}};
 M.forEach(m=>deps(m).forEach(d=>{
  const up=U.has(m.id)&&U.has(d),dn=D.has(m.id)&&D.has(d);if(!up&&!dn)return;
  const a=pt(d),b=pt(m.id);let path;
  if(Math.abs(a.l-b.l)<5)path="M"+a.r+","+a.y+" C"+(a.r+36)+","+a.y+" "+(b.r+36)+","+b.y+" "+b.r+","+b.y;
  else{const dx=Math.max(30,Math.abs(b.l-a.r)/2);path="M"+a.r+","+a.y+" C"+(a.r+dx)+","+a.y+" "+(b.l-dx)+","+b.y+" "+b.l+","+b.y}
  o+='<path d="'+path+'" fill="none" stroke="var(--'+(up?"up":"dn")+')" stroke-width="2" opacity=".85"/>'}));
 svg.innerHTML=o;
}
document.addEventListener("click",e=>{
 const k=e.target.closest("[data-chk]"),c=e.target.closest(".c"),g=e.target.closest("[data-go]"),s=e.target.closest("[data-set]"),ch=e.target.closest(".chip");
 if(k){const i=k.dataset.chk;setSt(i,st(i)==2?0:2)}
 else if(c)sel=sel==c.dataset.id?null:c.dataset.id;
 else if(g)sel=g.dataset.go;
 else if(s){const v=s.dataset.set;setSt(sel,v=="pre"?0:+v,v=="pre")}
 else if(e.target.closest("[data-prev]")){anc(sel).forEach(i=>setSt(i,2))}
 else if(ch){flt=ch.dataset.k;award("filtros")}
 else return;
 render();
});
document.addEventListener("keydown",e=>{if((e.key=="Enter"||e.key==" ")&&e.target.classList.contains("c")){e.preventDefault();e.target.click()}});
addEventListener("resize",edges);
const $=i=>document.getElementById(i);
const req=m=>[...new Set([...m.ct,...m.cf,...ffl(m)])],hv={};
const hgt=i=>hv[i]||(hv[i]=1+Math.max(0,...M.filter(x=>req(x).includes(i)).map(x=>hgt(x.id))));
function sim(u,n){
 const done=new Set(M.filter(m=>st(m.id)==2).map(m=>m.id));
 let left=M.filter(m=>st(m.id)<2).map(m=>m.id);const plan=[];
 for(let t=0;left.length&&t<40;t++){
  const cap=u=="c"?n:(t%2?Math.floor(n/2):Math.ceil(n/2));
  const fr=left.filter(i=>st(i)==1&&ffl(by[i]).every(d=>done.has(d)));
  const take=left.filter(i=>st(i)==0&&req(by[i]).every(d=>done.has(d))).sort((a,b)=>hgt(b)-hgt(a)||(a<b?-1:1)).slice(0,cap);
  if(!fr.length&&!take.length&&cap>0)break;
  plan.push({take,fr});[...take,...fr].forEach(i=>done.add(i));left=left.filter(i=>!done.has(i));
 }
 return{plan,left};
}
function tdate(t){const mo=new Date().getMonth();let y=new Date().getFullYear(),c=1;if(mo>=7)y++;else if(mo>=2)c=2;const i=c-1+t;return{y:y+Math.floor(i/2),c:i%2+1}}
const ora={u:"c",n:3};
function oracle(){
 const a=M.filter(m=>st(m.id)==2).length,lft=M.length-a,{plan,left}=sim(ora.u,ora.n);
 $("opr").textContent="Progreso: "+a+" de "+M.length+" aprobadas.";
 $("olbl").textContent="Materias por "+(ora.u=="c"?"cuatrimestre":"año");$("obdg").textContent=ora.n;
 let big,sm="";
 if(!lft)big="¡Carrera completa!";
 else if(left.length){big="No se puede calcular";sm="Revisá las materias marcadas."}
 else{const d=tdate(plan.length-1);big=(d.c==1?"Julio":"Diciembre")+" de "+d.y;sm="(Faltan "+lft+" materias · "+plan.length+" cuatrimestres)"}
 $("obig").textContent=big;$("osm").textContent=sm;
 $("opl").innerHTML=plan.map((p,t)=>{const d=tdate(t),l=[...p.take,...p.fr].map(i=>i+" "+by[i].n).join(" · ");return'<p><b>'+(d.c==1?"1er":"2do")+" cuat. "+d.y+":</b> "+(l||"descanso")+"</p>"}).join("");
}
function oset(u){ora.u=u;const c=u=="c",r=$("orng");r.min=c?1:2;r.max=c?6:12;ora.n=c?3:6;r.value=ora.n;$("omin").textContent="RELAX ("+r.min+")";$("omax").textContent="TRYHARD ("+r.max+")";$("oseg").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.u==u));oracle()}
$("orBtn").onclick=()=>{oracle();$("ob").hidden=false;$("ox").focus()};
$("ox").onclick=()=>{$("ob").hidden=true};
$("ob").addEventListener("click",e=>{if(e.target==$("ob"))$("ob").hidden=true});
$("orng").oninput=e=>{ora.n=+e.target.value;oracle()};
$("oseg").addEventListener("click",e=>{const b=e.target.closest("[data-u]");if(b)oset(b.dataset.u)});
document.addEventListener("keydown",e=>{if(e.key=="Escape")$("ob").hidden=true});
oset("c");
const ACH=[
{id:"pasos",i:"👣",n:"Primeros pasos",d:"Aprobá tu primera materia."},
{id:"a1",i:"🌱",n:"Primer año completo",d:"Aprobá todas las materias de 1er año."},
{id:"a2",i:"🌿",n:"Segundo año completo",d:"Aprobá todas las materias de 2do año."},
{id:"a3",i:"🌳",n:"Tercer año completo",d:"Aprobá todas las materias de 3er año."},
{id:"a4",i:"🎓",n:"Cuarto año completo",d:"Aprobá todas las materias de 4to año."},
{id:"filtros",i:"🧭",n:"Explorar configuraciones",d:"Usá los filtros de materias."},
{id:"oficial",i:"📄",n:"Información oficial",d:"Visitá el plan de estudio oficial."},
{id:"profecia",i:"🔮",n:"La profecía",d:"Consultá el Oráculo."},
{id:"creditos",i:"❤️",n:"Créditos y agradecimientos",d:"Visitá el LinkedIn del desarrollador."}];
const AI=Object.fromEntries(ACH.map(a=>[a.id,a])),tq=[];
let first=true,tb=false;
function toast(t){tq.push(t);if(!tb)nt()}
function nt(){const t=tq.shift();if(!t){tb=false;return}tb=true;const e=$("toast");e.textContent=t;e.hidden=false;setTimeout(()=>{e.hidden=true;setTimeout(nt,250)},3200)}
function achUI(){const n=ACH.filter(a=>S.a&&S.a[a.id]).length;$("achBtn").textContent="🏆 Logros "+n+"/"+ACH.length;$("apr").textContent="Desbloqueados: "+n+" de "+ACH.length;$("alist").innerHTML=ACH.map(a=>'<div class="ach'+(S.a&&S.a[a.id]?" on":"")+'"><span class="ai">'+a.i+'</span><div><b>'+a.n+'</b><small>'+a.d+'</small></div></div>').join("")}
function award(id,q){if(!S.a)S.a={};if(S.a[id])return;S.a[id]=Date.now();if(!q)toast("🏆 Logro desbloqueado: "+AI[id].n);achUI();save()}
function check(){const q=first;first=false;if(M.some(m=>st(m.id)==2))award("pasos",q);[1,2,3,4].forEach(k=>{if(M.filter(m=>m.id[0]==k).every(m=>st(m.id)==2))award("a"+k,q)});achUI()}
$("achBtn").onclick=()=>{achUI();$("ab").hidden=false;$("ax").focus()};
$("ax").onclick=()=>{$("ab").hidden=true};
$("ab").addEventListener("click",e=>{if(e.target==$("ab"))$("ab").hidden=true});
document.addEventListener("keydown",e=>{if(e.key=="Escape")$("ab").hidden=true});
$("orBtn").addEventListener("click",()=>award("profecia"));
["click","auxclick"].forEach(v=>{$("planBtn").addEventListener(v,()=>award("oficial"));document.querySelector(".fr a").addEventListener(v,()=>award("creditos"))});





 
 
 
 
 
 
 
 






render();
