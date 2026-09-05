#!/usr/bin/env node
// Demo sitenin mobil + masaüstü tam sayfa ekran görüntüsü.
// Bağımlılık yok — Chrome DevTools Protocol'ü Node'un yerleşik WebSocket'i ile sürer.
//
// Kullanım:  node arac/ss.mjs <slug> [cikti-klasoru]
// Çıktı:     <cikti>/<slug>-mobil.png  ve  <cikti>/<slug>-masaustu.png
// Ayrıca ekranda yatay taşma (overflow) raporu verir.

import { spawn } from "node:child_process";
import { mkdtemp, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import http from "node:http";
import { createReadStream, statSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const slug = process.argv[2];
const outDir = process.argv[3] || ".";
if (!slug) { console.error("kullanım: node arac/ss.mjs <slug> [cikti-klasoru]"); process.exit(2); }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// demo/<hafta>/<slug>/site — hafta klasörünü aramayla bul
const siteDir = (() => {
  const demo = path.join(root, "demo");
  const cands = [path.join(demo, slug, "site")];
  if (existsSync(demo)) {
    for (const wk of readdirSync(demo, { withFileTypes: true }).filter(d => d.isDirectory()))
      cands.push(path.join(demo, wk.name, slug, "site"));
  }
  const hit = cands.find(c => existsSync(path.join(c, "index.html")));
  if (!hit) {
    console.error(`bulunamadı: demo/*/${slug}/site/index.html`);
    process.exit(1);
  }
  return hit;
})();

const MIME = { ".html":"text/html;charset=utf-8", ".css":"text/css", ".js":"text/javascript",
  ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".webp":"image/webp",
  ".svg":"image/svg+xml", ".avif":"image/avif", ".ico":"image/x-icon", ".woff2":"font/woff2" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const f = path.join(siteDir, path.normalize(p).replace(/^(\.\.[/\\])+/, ""));
  try {
    if (!statSync(f).isFile()) throw 0;
    res.writeHead(200, { "content-type": MIME[path.extname(f).toLowerCase()] || "application/octet-stream" });
    createReadStream(f).pipe(res);
  } catch { res.writeHead(404).end("404"); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/`;

const profile = await mkdtemp(path.join(tmpdir(), "ss-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

const wsUrl = await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error("Chrome başlamadı")), 20000);
  let buf = "";
  chrome.stderr.on("data", d => {
    buf += d;
    const m = buf.match(/ws:\/\/[^\s]+/);
    if (m) { clearTimeout(t); res(m[0]); }
  });
});

const ws = new WebSocket(wsUrl);
await new Promise(r => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener("message", e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const i = ++id; pending.set(i, m => m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params, sessionId }));
});

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S("Page.enable"); await S("Runtime.enable");

await mkdir(path.resolve(outDir), { recursive: true });
const views = [
  { name: "mobil",    width: 390,  height: 844, mobile: true,  scale: 2 },
  { name: "masaustu", width: 1440, height: 900, mobile: false, scale: 1 },
];

const report = [];
for (const v of views) {
  await S("Emulation.setDeviceMetricsOverride", {
    width: v.width, height: v.height, deviceScaleFactor: v.scale, mobile: v.mobile,
  });
  if (v.mobile) await S("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

  await Promise.all([
    S("Page.navigate", { url }),
    new Promise(r => {
      const h = e => {
        const m = JSON.parse(e.data);
        if (m.method === "Page.loadEventFired" && m.sessionId === sessionId) {
          ws.removeEventListener("message", h); r();
        }
      };
      ws.addEventListener("message", h);
    }),
  ]);
  await new Promise(r => setTimeout(r, 2500)); // font + görsel

  // Tam sayfa çekimde: reveal animasyonlarını bitir, lazy görselleri zorla yükle.
  // (captureBeyondViewport görünüm alanına girmeyen lazy <img>'leri yüklemez.)
  await S("Runtime.evaluate", {
    awaitPromise: true, returnByValue: true, expression: `(async()=>{
      document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));
      // src'si olmayan (lightbox gibi) <img>'leri sayma
      const imgs=[...document.images].filter(i=>(i.getAttribute('src')||'').trim());
      imgs.forEach(i=>{ i.loading='eager'; i.removeAttribute('loading'); });
      // yeniden tetiklemek için src'yi kendine ata
      imgs.forEach(i=>{ const s=i.currentSrc||i.src; if(s) i.src=s; });
      await Promise.all(imgs.map(i=>i.complete&&i.naturalWidth
        ? Promise.resolve()
        : new Promise(r=>{ i.addEventListener('load',r,{once:true});
                           i.addEventListener('error',r,{once:true});
                           setTimeout(r,8000); })));
      if (document.fonts) await document.fonts.ready;
      return imgs.filter(i=>!i.naturalWidth).map(i=>i.getAttribute('src'));
    })()` }).then(({ result }) => {
      const broken = result.value || [];
      if (broken.length) console.log(`  ! ${v.name}: yüklenemeyen görsel → ${broken.join(", ")}`);
    });
  await new Promise(r => setTimeout(r, 600));

  // yatay taşma raporu
  const { result } = await S("Runtime.evaluate", {
    returnByValue: true, expression: `(()=>{
      const vw = document.documentElement.clientWidth;
      // overflow:hidden/clip bir ata içindeyse taşma görünmez — kayan şerit gibi
      // kasıtlı desenleri yanlış işaretlememek için bunları ele.
      const clipped = el => {
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          const o = getComputedStyle(n);
          if (/hidden|clip|auto|scroll/.test(o.overflowX)) return true;
        }
        return false;
      };
      const over = [...document.querySelectorAll('body *')]
        .filter(el => el.getBoundingClientRect().right > vw + 1 && !clipped(el))
        .slice(0, 8)
        .map(el => el.tagName.toLowerCase() + (el.className && typeof el.className==='string' ? '.'+el.className.trim().split(/\\s+/).join('.') : '')
             + ' → ' + Math.round(el.getBoundingClientRect().right) + 'px');
      return { vw, scrollW: document.documentElement.scrollWidth, over };
    })()` });
  report.push({ view: v.name, ...result.value });

  const { data } = await S("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  const file = path.join(path.resolve(outDir), `${slug}-${v.name}.png`);
  await writeFile(file, Buffer.from(data, "base64"));
  console.log(`✓ ${file}`);
}

ws.close(); chrome.kill(); server.close();

console.log("\n── yatay taşma ──");
let bad = false;
for (const r of report) {
  const ok = r.scrollW <= r.vw + 1;
  if (!ok) bad = true;
  console.log(`${ok ? "✓" : "✗"} ${r.view}: görünür ${r.vw}px / içerik ${r.scrollW}px`);
  r.over.forEach(o => console.log("    " + o));
}

// Chrome profilini temizle — kapanışı yazmayı bitirsin diye biraz bekle
await new Promise(r => setTimeout(r, 700));
await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }).catch(() => {});
process.exit(bad ? 1 : 0);
