#!/usr/bin/env node
// Bir işletmenin sitesi GERÇEKTEN çalışıyor mu?  Kullanım: node arac/sitekontrol.mjs <url> [<url>...]
//
// NEDEN VAR: curl ve WebFetch bot korumasına takılıp 403/503 dönebiliyor.
// Görükle Çiçekçi'de tam bu oldu — curl 503 dedi, site aslında çalışıyordu ve
// koca bir demo boşa gitti. "Site ölü" kararı ASLA curl'e bakarak verilmez.
//
// Bu araç sayfayı gerçek Chrome'da açar ve şunları raporlar:
//   HTTP durumu · sayfa başlığı · görünür metin uzunluğu · viewport meta (mobil)
//   telif yılı · WordPress/Wix vb. platform izi · konsol hataları · ekran görüntüsü

import { spawn } from "node:child_process";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const urls = process.argv.slice(2).filter(a => !a.startsWith("--"));
const shotDir = (process.argv.find(a => a.startsWith("--shots=")) || "").split("=")[1];
if (!urls.length) { console.error("kullanım: node arac/sitekontrol.mjs <url> [--shots=<klasör>]"); process.exit(2); }

const profile = await mkdtemp(path.join(tmpdir(), "sk-"));
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

const wsUrl = await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error("Chrome başlamadı")), 20000);
  let buf = "";
  chrome.stderr.on("data", d => {
    buf += d; const m = buf.match(/ws:\/\/[^\s]+/);
    if (m) { clearTimeout(t); res(m[0]); }
  });
});

const ws = new WebSocket(wsUrl);
await new Promise(r => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map(); const listeners = new Set();
ws.addEventListener("message", e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else listeners.forEach(fn => fn(m));
});
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const i = ++id;
  pending.set(i, m => m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params, sessionId }));
});

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S("Page.enable"); await S("Runtime.enable"); await S("Network.enable");
// gerçek bir tarayıcı gibi görün
await S("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

let verdictBad = false;

for (const raw of urls) {
  const url = /^https?:\/\//.test(raw) ? raw : "https://" + raw;
  let status = null, statusText = "", finalUrl = url;
  const errors = [];

  const onMsg = m => {
    if (m.sessionId !== sessionId) return;
    if (m.method === "Network.responseReceived" && m.params.type === "Document") {
      if (status === null) { status = m.params.response.status; statusText = m.params.response.statusText; finalUrl = m.params.response.url; }
    }
    if (m.method === "Runtime.exceptionThrown") errors.push("JS: " + (m.params.exceptionDetails?.text || "?"));
  };
  listeners.add(onMsg);

  try {
    await Promise.race([
      Promise.all([
        S("Page.navigate", { url }),
        new Promise(r => {
          const h = m => { if (m.method === "Page.loadEventFired" && m.sessionId === sessionId) { listeners.delete(h); r(); } };
          listeners.add(h);
        }),
      ]),
      new Promise(r => setTimeout(r, 25000)),
    ]);
  } catch (e) { errors.push(String(e.message)); }
  await new Promise(r => setTimeout(r, 2500));

  const { result } = await S("Runtime.evaluate", {
    returnByValue: true, expression: `(()=>{
      const t = document.body ? document.body.innerText.trim() : "";
      const html = document.documentElement.outerHTML;
      const plat = [];
      if (/wp-content|wp-includes/i.test(html)) plat.push("WordPress");
      if (/woocommerce/i.test(html))            plat.push("WooCommerce");
      if (/wix\\.com|wixstatic/i.test(html))     plat.push("Wix");
      if (/shopify/i.test(html))                plat.push("Shopify");
      if (/blogspot|blogger/i.test(html))       plat.push("Blogger");
      if (/business\\.site/i.test(location.host))plat.push("Google Business Site");
      const vp = document.querySelector('meta[name="viewport"]');
      const yrs = (t.match(/(19|20)\\d{2}/g) || []).map(Number).filter(y=>y>=2000&&y<=2030);
      return {
        title: (document.title||"").trim(),
        textLen: t.length,
        head: t.slice(0,180).replace(/\\s+/g," "),
        viewport: vp ? vp.getAttribute("content") : null,
        platform: plat,
        imgs: document.images.length,
        maxYear: yrs.length ? Math.max(...yrs) : null,
        https: location.protocol === "https:",
      };
    })()` });
  const r = result.value;
  listeners.delete(onMsg);

  // karar
  const dead = status === null || status >= 400 || r.textLen < 120;
  const problems = [];
  if (!r.viewport)                 problems.push("viewport meta YOK → mobilde bozuk");
  if (r.maxYear && r.maxYear <= 2021) problems.push(`en yeni yıl ${r.maxYear} → içerik eski`);
  if (!r.https)                    problems.push("HTTPS yok");
  if (r.platform.includes("Google Business Site")) problems.push("Google Business Site (Mart 2024'te kapatıldı)");
  if (r.imgs < 3)                  problems.push(`sadece ${r.imgs} görsel`);
  if (dead) verdictBad = true;

  console.log(`\n━━ ${url}`);
  console.log(`   HTTP        ${status ?? "yanıt yok"} ${statusText}`);
  if (finalUrl !== url) console.log(`   yönlendi    ${finalUrl}`);
  console.log(`   başlık      ${r.title || "(yok)"}`);
  console.log(`   metin       ${r.textLen} karakter · ${r.imgs} görsel`);
  if (r.head) console.log(`   ilk satır   ${r.head}`);
  console.log(`   platform    ${r.platform.join(", ") || "belirlenemedi"}`);
  console.log(`   viewport    ${r.viewport || "YOK"}`);
  console.log(`   KARAR       ${dead ? "❌ ÖLÜ / AÇILMIYOR" : problems.length ? "⚠️  ÇALIŞIYOR ama sorunlu" : "✅ ÇALIŞIYOR ve düzgün"}`);
  problems.forEach(p => console.log(`               · ${p}`));
  errors.slice(0,3).forEach(e => console.log(`   hata        ${e}`));

  if (shotDir) {
    const { data } = await S("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
    const f = path.join(path.resolve(shotDir), url.replace(/^https?:\/\//,"").replace(/[^a-z0-9.-]/gi,"_") + ".png");
    await writeFile(f, Buffer.from(data, "base64"));
    console.log(`   görüntü     ${f}`);
  }
}

ws.close(); chrome.kill();
await new Promise(r => setTimeout(r, 600));
await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }).catch(() => {});
process.exit(verdictBad ? 1 : 0);
