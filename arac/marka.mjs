#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   MARKA ARAŞTIRMASI — tek komut
   İşletmenin sosyal medyasından ve Google Haritalar kaydından tasarım
   malzemesi toplar: fotoğraflar · renk paleti · dil/ton · künye.

   node arac/marka.mjs <çıktı-klasörü> [--ig=<kullanıcı>] [--maps="<arama>"] [--max=12]

   Çıktı:  <klasör>/marka.md      okunacak brif
           <klasör>/marka.json    ham veri
           <klasör>/ig/*.jpg      indirilen görseller

   NE ÇALIŞIR / NE ÇALIŞMAZ (ölçüldü, tahmin değil):
     ✓ Instagram gönderi görselleri 1280px, açıklamalar, beğeniler, profil foto
     ✓ Bio + öne çıkan hikâye BAŞLIKLARI (hizmet listesi verir)
     ✓ Haritalar künyesi: adres, telefon, çalışma saati, kategori, plus code
     ✗ Instagram hikâye İÇERİĞİ — giriş istiyor
     ✗ Haritalar YORUMLARI — Google bu istemciye "Sınırlı görünüm" veriyor
     ✗ Haritalar foto galerisi — tek küçük kapak fotoğrafı geliyor
   Alınamayanları Faruk telefonundan ekran görüntüsüyle getirir.
   ═══════════════════════════════════════════════════════════════════════════ */

import { spawn } from "node:child_process";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const args = process.argv.slice(2);
const outDir = args.find(a => !a.startsWith("--"));
const arg = k => { const a = args.find(x => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
const IG = (arg("ig") || "").replace(/^@/, "");
const MAPS = arg("maps");
const MAX = Number(arg("max") || 12);

if (!outDir || (!IG && !MAPS)) {
  console.error('kullanım: node arac/marka.mjs <klasör> [--ig=<kullanıcı>] [--maps="<arama>"] [--max=12]');
  process.exit(2);
}
const root = path.resolve(outDir);
const imgDir = path.join(root, "ig");
await mkdir(imgDir, { recursive: true });

/* ── Chrome ─────────────────────────────────────────────────────────────── */
const prof = await mkdtemp(path.join(tmpdir(), "marka-"));
const chrome = spawn(CHROME, ["--headless=new","--disable-gpu","--hide-scrollbars","--no-first-run",
  "--no-default-browser-check","--remote-debugging-port=0",`--user-data-dir=${prof}`,
  "--lang=tr-TR","--window-size=1400,1600","about:blank"], { stdio:["ignore","ignore","pipe"] });
const wsUrl = await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error("Chrome başlamadı")), 20000); let b = "";
  chrome.stderr.on("data", d => { b += d; const m = b.match(/ws:\/\/[^\s]+/); if (m) { clearTimeout(t); res(m[0]); } });
});
const ws = new WebSocket(wsUrl);
await new Promise(r => ws.addEventListener("open", r, { once: true }));
let id = 0; const pend = new Map(); const subs = new Set();
ws.addEventListener("message", e => { const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else subs.forEach(f => f(m)); });
const send = (method, params = {}, sid) => new Promise((res, rej) => { const i = ++id;
  pend.set(i, m => m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params, sessionId: sid })); });
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S("Page.enable"); await S("Runtime.enable");
await S("Emulation.setUserAgentOverride", {
  userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  acceptLanguage:"tr-TR,tr" });

const go = async (url, wait = 3500) => {
  await Promise.race([
    Promise.all([S("Page.navigate", { url }), new Promise(r => {
      const h = m => { if (m.method === "Page.loadEventFired" && m.sessionId === sessionId) { subs.delete(h); r(); } };
      subs.add(h); })]),
    new Promise(r => setTimeout(r, 22000)),
  ]);
  await new Promise(r => setTimeout(r, wait));
};
const ev = async expr => (await S("Runtime.evaluate", { returnByValue:true, awaitPromise:true, expression:expr })).result.value;

const data = { fetchedAt:new Date().toISOString(), ig:null, maps:null, palette:[], dil:null, files:[], eksik:[] };

/* ── 1) INSTAGRAM ───────────────────────────────────────────────────────── */
if (IG) {
  console.log(`▸ Instagram: @${IG}`);
  await go(`https://www.instagram.com/${IG}/`, 4500);
  await ev(`(()=>{const b=[...document.querySelectorAll('span,button,div')].find(e=>/^(devamı|more)$/i.test((e.textContent||'').trim())); if(b)b.click(); return 1;})()`);
  await new Promise(r => setTimeout(r, 1200));
  const p = await ev(`(()=>{
    const t=(document.body?document.body.innerText:'');
    const codes=[...document.querySelectorAll('a[href*="/p/"],a[href*="/reel/"]')]
      .map(a=>(a.getAttribute('href')||'').match(/\\/(?:p|reel)\\/([A-Za-z0-9_-]+)/)).filter(Boolean).map(m=>m[1]);
    const pic=[...document.images].find(i=>/profil resmi|profile picture/i.test(i.alt||''));
    const g=re=>{const m=t.match(re);return m?m[1]:null;};
    // öne çıkan hikâye başlıkları — hizmet listesi verir
    const hl=[...document.querySelectorAll('li,button,div')].map(e=>(e.textContent||'').trim())
      .filter(x=>x.length>1&&x.length<22&&/^[A-ZÇĞİÖŞÜ0-9💜🎊🎉✨ &.]+$/.test(x));
    return {bio:t.slice(0,1400), followers:g(/([\\d.,KMB]+)\\s*takipçi/i)||g(/([\\d.,KMB]+)\\s*followers/i),
      posts:g(/([\\d.,KMB]+)\\s*gönderi/i)||g(/([\\d.,KMB]+)\\s*posts/i),
      profilePic:pic?(pic.currentSrc||pic.src):null, codes:[...new Set(codes)], highlights:[...new Set(hl)].slice(0,16)};
  })()`);
  console.log(`  takipçi ${p.followers ?? "?"} · gönderi ${p.posts ?? "?"} · kod ${p.codes.length}`);
  if (p.highlights.length) console.log(`  öne çıkanlar: ${p.highlights.join(" · ")}`);

  const posts = [];
  for (const code of p.codes.slice(0, MAX)) {
    try {
      await go(`https://www.instagram.com/p/${code}/embed/captioned/`, 2500);
      const d = await ev(`(()=>{
        const im=[...document.images].map(i=>({src:i.currentSrc||i.src,w:i.naturalWidth,h:i.naturalHeight}))
          .filter(i=>i.src&&!/rsrc\\.php|static\\./.test(i.src)).sort((a,b)=>b.w*b.h-a.w*a.h)[0];
        const t=(document.body?document.body.innerText:'').replace(/\\s+/g,' ');
        return {img:im||null, likes:(t.match(/([\\d.,]+)\\s*beğenme/)||t.match(/([\\d.,]+)\\s*likes?/)||[])[1]||null, text:t.slice(0,800)};
      })()`);
      if (d.img && d.img.w >= 320) {
        posts.push({ code, likes:d.likes, w:d.img.w, h:d.img.h, src:d.img.src, text:d.text });
        console.log(`  ✓ ${code} ${d.img.w}x${d.img.h}${d.likes?" · "+d.likes+" beğeni":""}`);
      }
    } catch { /* tek gönderi atlanabilir */ }
  }
  data.ig = { user:IG, followers:p.followers, posts:p.posts, bio:p.bio, highlights:p.highlights, items:posts };

  console.log("▸ görseller indiriliyor…");
  const list = [];
  if (p.profilePic) list.push({ name:"profil.jpg", src:p.profilePic });
  posts.forEach((x,i) => list.push({ name:`post-${String(i+1).padStart(2,"0")}.jpg`, src:x.src }));
  for (const it of list) {
    try {
      const b64 = await ev(`(async()=>{const r=await fetch(${JSON.stringify(it.src)}); if(!r.ok)return null;
        const b=await r.arrayBuffer(); let s=''; const u=new Uint8Array(b);
        for(let i=0;i<u.length;i++)s+=String.fromCharCode(u[i]); return btoa(s);})()`);
      if (!b64) { console.log(`  ! ${it.name}`); continue; }
      const buf = Buffer.from(b64, "base64");
      await writeFile(path.join(imgDir, it.name), buf);
      data.files.push({ file:`ig/${it.name}`, kb:Math.round(buf.length/1024) });
      console.log(`  ✓ ${it.name} ${Math.round(buf.length/1024)}KB`);
    } catch { console.log(`  ! ${it.name}`); }
  }

  /* ── renk paleti: görselleri tarayıcıda tuvale çizip örnekle ─────────── */
  console.log("▸ renk paleti çıkarılıyor…");
  const srcs = [p.profilePic, ...posts.slice(0,8).map(x=>x.src)].filter(Boolean);
  data.palette = await ev(`(async()=>{
    const srcs=${JSON.stringify(srcs)};
    const bucket=new Map();
    for(const s of srcs){
      try{
        const r=await fetch(s); const bmp=await createImageBitmap(await r.blob());
        const c=new OffscreenCanvas(120,120), x=c.getContext('2d');
        x.drawImage(bmp,0,0,120,120);
        const d=x.getImageData(0,0,120,120).data;
        for(let i=0;i<d.length;i+=4){
          const R=d[i],G=d[i+1],B=d[i+2];
          const mx=Math.max(R,G,B), mn=Math.min(R,G,B), l=(mx+mn)/510;
          const sat=mx===mn?0:(l>0.5?(mx-mn)/(510-mx-mn):(mx-mn)/(mx+mn));
          if(sat<0.20||l<0.10||l>0.92) continue;           // gri ve uçları ele
          const k=[R>>5<<5,G>>5<<5,B>>5<<5].join(',');
          bucket.set(k,(bucket.get(k)||0)+1);
        }
      }catch{}
    }
    const hex=n=>n.toString(16).padStart(2,'0');
    return [...bucket.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,n])=>{
      const [R,G,B]=k.split(',').map(Number);
      const mx=Math.max(R,G,B),mn=Math.min(R,G,B);
      let h=0; if(mx!==mn){const d2=mx-mn;
        h = mx===R ? ((G-B)/d2+(G<B?6:0)) : mx===G ? ((B-R)/d2+2) : ((R-G)/d2+4); h*=60;}
      return {hex:'#'+hex(R)+hex(G)+hex(B), hue:Math.round(h), light:Math.round((mx+mn)/510*100), n};
    });
  })()`);
  data.palette.forEach(c => console.log(`  ${c.hex}  ton ${String(c.hue).padStart(3)}°  parlaklık ${c.light}%`));

  /* ── dil / ton ───────────────────────────────────────────────────────── */
  const stop = new Set(("ve ile bir bu şu o da de ki için gibi çok daha en ama fakat veya ya ise her sen siz biz ben "+
    "olarak kadar sonra önce göre üzere hem ne mi mu mı mü var yok olan olur oldu etmek yapmak beğenme takipçi gönderi "+
    "merikafit studyo com www http https reels orijinal ses profili gör instagram beğen yorum yap paylaş kaydet")
    .split(/\s+/));
  const words = new Map();
  for (const it of posts) {
    for (const w of (it.text.toLowerCase().match(/[a-zçğıöşü]{4,}/g) || [])) {
      if (stop.has(w)) continue; words.set(w, (words.get(w)||0)+1);
    }
  }
  data.dil = {
    sik: [...words.entries()].sort((a,b)=>b[1]-a[1]).slice(0,18).map(([w,n])=>`${w} (${n})`),
    ornek: posts.slice(0,3).map(x => x.text.replace(/\s+/g,' ').slice(0,220)),
  };
  data.eksik.push("Instagram öne çıkan hikâyelerinin İÇERİĞİ — giriş istiyor. Başlıklar alındı, içerik alınamadı.");
}

/* ── 2) GOOGLE HARİTALAR ────────────────────────────────────────────────── */
if (MAPS) {
  console.log(`▸ Google Haritalar: ${MAPS}`);
  await go(`https://www.google.com/maps/search/${encodeURIComponent(MAPS)}?hl=tr`, 9000);
  data.maps = await ev(`(()=>{
    const g=re=>{const e=[...document.querySelectorAll('[aria-label]')].find(x=>re.test(x.getAttribute('aria-label')||''));
      return e?e.getAttribute('aria-label').replace(re,'').trim():null;};
    const t=(document.body?document.body.innerText:'').replace(/\\s+/g,' ');
    // Google'ın üst menü çipleri kategori DEĞİL — ele
    const NAV=new Set(['Restoranlar','Oteller','Yapılacaklar','Toplu Taşıma','Otopark','Eczaneler',"ATM'ler",
                       'Kaydedildi','Son öğeler','Uygulamayı indir','Daha fazla bilgi','Oturum aç']);
    const cat=[...document.querySelectorAll('button[jsaction*="category"], button')]
      .map(b=>(b.textContent||'').trim())
      .find(x=>x && x.length>2 && x.length<32 && !NAV.has(x) &&
                /(Salonu?|Restoran|Kafe|Kuaför|Klinik|Mağaza|Servis|Fırın|Çiçekçi|Veteriner|Stüdyo|Merkezi?|Dükkan|Pastane|Lokanta|Berber|Spor|Eczane|Market)/i.test(x));
    const img=[...document.images].map(i=>i.currentSrc||i.src).find(s=>/googleusercontent|ggpht/.test(s));
    return {
      isim:(document.title||'').replace(/ - Google Haritalar.*/,'').trim(),
      adres:g(/^Adres:\\s*/), tel:g(/^Telefon:\\s*/),
      saatBugun:(()=>{const e=[...document.querySelectorAll('[aria-label]')].find(x=>/Çalışma saatlerini kopyala/.test(x.getAttribute('aria-label')||''));
        return e?e.getAttribute('aria-label').replace(/, ?Çalışma saatlerini kopyala/,'').trim():null;})(),
      plusCode:g(/^Plus code:\\s*/), kategori:cat||null, kapakFoto:img||null,
      puan:(t.match(/([0-5],[0-9])\\s*\\(?([\\d.]+)?\\s*(yorum|değerlendirme)/i)||[])[0]||null,
      sinirliGorunum:/Sınırlı görünüm/i.test(t),
    };
  })()`);
  // Google'ın üst menü çipleri kategori sanılabiliyor — son süzgeç
  const NAVTR=["restoranlar","oteller","yapılacaklar","toplutaşıma","otopark","eczaneler","atmler",
               "kaydedildi","sonöğeler","uygulamayıindir","dahafazlabilgi","oturumaç"].map(x=>x.replace(/[^\p{L}]/gu,""));
  // \s görünmez karakterleri (U+200B vb.) yakalamıyor — harf dışını tamamen at
  const norm=x=>(x||"").replace(/[^\p{L}]/gu,"").toLocaleLowerCase("tr");
  if (data.maps.kategori && NAVTR.includes(norm(data.maps.kategori))) data.maps.kategori = null;
  Object.entries(data.maps).forEach(([k,v]) => v && console.log(`  ${k}: ${String(v).slice(0,90)}`));
  if (data.maps.sinirliGorunum) {
    data.eksik.push("Google Haritalar YORUMLARI — Google bu istemciye \"Sınırlı görünüm\" veriyor, yorum sekmesi açılmıyor.");
    data.eksik.push("Google Haritalar FOTOĞRAF GALERİSİ — sadece tek kapak fotoğrafı geliyor.");
  }
}

ws.close(); chrome.kill();
await new Promise(r => setTimeout(r, 600));
await rm(prof, { recursive:true, force:true, maxRetries:5 }).catch(()=>{});

/* ── 3) BRİF YAZ ────────────────────────────────────────────────────────── */
await writeFile(path.join(root, "marka.json"), JSON.stringify(data, null, 2));

const L = [];
L.push(`# Marka araştırması`, ``, `Toplandı: ${data.fetchedAt.slice(0,10)}`, ``);
if (data.maps) {
  const m = data.maps;
  L.push(`## Künye — Google Haritalar`, ``, `| alan | değer |`, `|---|---|`);
  [["İsim",m.isim],["Kategori",m.kategori],["Adres",m.adres],["Telefon",m.tel],
   ["Bugünün saati",m.saatBugun],["Plus code",m.plusCode],["Puan",m.puan]]
    .filter(([,v])=>v).forEach(([k,v])=>L.push(`| ${k} | ${v} |`));
  L.push(``);
}
if (data.ig) {
  L.push(`## Instagram — @${data.ig.user}`, ``,
    `Takipçi **${data.ig.followers ?? "?"}** · gönderi **${data.ig.posts ?? "?"}**`, ``);
  if (data.ig.highlights.length) {
    L.push(`**Öne çıkan hikâyeler** (çoğu zaman hizmet listesidir — kontrol et):`,
      data.ig.highlights.map(h=>`\`${h}\``).join(" · "), ``);
  }
  L.push(`<details><summary>Bio (ham)</summary>`, ``, "```",
    data.ig.bio.split("\n").filter(x=>x.trim()).slice(0,14).join("\n"), "```", `</details>`, ``);
}
if (data.palette.length) {
  L.push(`## Renk paleti — kendi görsellerinden örneklendi`, ``,
    `**Paleti buradan kur. Uydurma.**`, ``, `| hex | ton | parlaklık | ağırlık |`, `|---|---|---|---|`);
  data.palette.forEach(c => L.push(`| \`${c.hex}\` | ${c.hue}° | ${c.light}% | ${c.n} |`));
  const hues = data.palette.map(c=>c.hue);
  const ad = (a,b)=>Math.min(Math.abs(a-b),360-Math.abs(a-b));
  const tight = hues.every(h=>ad(h,hues[0])<45);
  L.push(``, tight
    ? `→ Tonlar dar bir aralıkta (**${hues[0]}° civarı**). Markanın tek hâkim rengi bu; hâkim zemin ve vurgu ondan türetilmeli.`
    : `→ Tonlar dağınık. En ağır iki rengi hâkim/vurgu olarak seç, gerisini ele.`, ``);
}
if (data.dil) {
  L.push(`## Dil ve ton`, ``, `Açıklamalarda en sık geçen kelimeler:`, ``,
    data.dil.sik.join(" · "), ``, `Örnek cümleleri:`, ``,
    ...data.dil.ornek.map(x=>`> ${x}`), ``,
    `→ Site metnini bu dile yaklaştır; kendi kelimelerini kullan.`, ``);
}
if (data.files.length) {
  L.push(`## İndirilen görseller`, ``, `${data.files.length} dosya → \`ig/\``, ``,
    `Kullanmadan önce **kontak sayfası yapıp bak** — üzerinde yazı bindirmesi olanları ele.`,
    `Kırparken kutuyu görsel sınırlarına kıstır, yoksa siyah bant oluşur.`, ``);
}
L.push(`## Alınamayanlar — Faruk telefonundan getirecek`, ``,
  ...(data.eksik.length ? data.eksik.map(x=>`- ${x}`) : [`- (yok)`]), ``);
L.push(`## Telif`, ``,
  `Bu görseller **işletmenin kendi içeriğidir.** Teklif demosunda kullanmak makul`,
  `(repo private, sayfa \`noindex\`) ama sahada **"fotoğraflarınızı kullandım,`,
  `beğenmezseniz çıkarırım"** denmeli.`, ``);

await writeFile(path.join(root, "marka.md"), L.join("\n"));
console.log(`\n▸ brif  → ${path.join(root,"marka.md")}`);
console.log(`▸ ham   → ${path.join(root,"marka.json")}`);
console.log(`▸ görsel→ ${imgDir}  (${data.files.length} dosya)`);
