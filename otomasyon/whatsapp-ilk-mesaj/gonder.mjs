#!/usr/bin/env node
/**
 * FlyTeq — WhatsApp ilk mesaj otomasyonu (yerel, launchd ile zamanlanır)
 *
 * Demo `Demo Hazır` olan işletmelere ilk WhatsApp mesajını gönderir.
 * Cowork YOK, Claude API YOK — düz kod. Mac açıkken + Chrome'da WhatsApp Web
 * oturumu açıkken çalışır.
 *
 * Akış: Notion'dan uygun leadleri çek → sırala, günde en fazla CAP → her biri
 * için telefonu normalize et → sabit şablondan mesaj kur → Chrome'da
 * web.whatsapp.com/send aç → gönder (AppleScript) → Notion'u güncelle →
 * otomasyon/durum/whatsapp-son-gonderim.md yaz.
 *
 * Kurulum + kurallar: README.md · mesaj metni: mesaj-sablonu.md
 *
 * ENV: NOTION_TOKEN   (yoksa: otomasyon/whatsapp-ilk-mesaj/.notion-token dosyası)
 * Bayraklar:
 *   --dry          Notion'a yazma, mesaj gönderme — sadece ne yapacağını yaz
 *   --skip-time    saat/gün penceresi kontrolünü atla (test için)
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";

const DB = "7c80366b-bfc7-4511-8364-f5b45c838066";
const NV = "2022-06-28";
const CAP = 6;                       // bir çalıştırmada en fazla kaç mesaj
const WINDOW = [10, 19];             // TR saati 10:00–19:00
const SEND_DAYS = [1, 2, 3, 4, 6];   // Pzt–Cmt (0=Paz)
const DRY = process.argv.includes("--dry");
const SKIP_TIME = process.argv.includes("--skip-time");
const KAPALI = ["Kazanıldı", "Kaybedildi"];
const AGENCY = "flyteq.space";

// mesaj-sablonu.md ile aynı — değer cümleleri sektöre göre
const DEGER = {
  "kafe / restoran": "Menü, konum ve rezervasyon telefonda tek ekranda.",
  "pastane / fırın": "Menü, konum ve rezervasyon telefonda tek ekranda.",
  "cağ döner": "Menü, konum ve rezervasyon telefonda tek ekranda.",
  "kuaför": "Hizmetler, çalışma saatleri ve randevu telefonda tek ekranda.",
  "berber": "Hizmetler, çalışma saatleri ve randevu telefonda tek ekranda.",
  "güzellik salonu": "Hizmetler, çalışma saatleri ve randevu telefonda tek ekranda.",
  "veteriner": "Hizmetler, adres ve iletişim telefonda tek dokunuşta.",
  "diş / klinik": "Hizmetler, adres ve iletişim telefonda tek dokunuşta.",
  "pilates / spor": "Dersler, program ve iletişim telefonda tek ekranda.",
  "çiçekçi": "Ürünler, konum ve sipariş için iletişim telefonda tek ekranda.",
  "oto servis": "Verdiğiniz hizmetler, konum ve telefon tek ekranda.",
};
const DEGER_VARSAYILAN =
  "İşletmeyi arayan kişi ihtiyacı olan bilgiyi telefonda tek ekranda buluyor.";

const TOKEN =
  process.env.NOTION_TOKEN ||
  (fs.existsSync(new URL("./.notion-token", import.meta.url))
    ? fs.readFileSync(new URL("./.notion-token", import.meta.url), "utf8").trim()
    : "");
if (!TOKEN) { console.error("NOTION_TOKEN yok (env ya da .notion-token)"); process.exit(1); }

const H = { Authorization: `Bearer ${TOKEN}`, "Notion-Version": NV, "Content-Type": "application/json" };
const today = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Notion ---------------------------------------------------------------
async function queryAll() {
  const out = [];
  let cursor;
  do {
    const r = await fetch(`https://api.notion.com/v1/databases/${DB}/query`, {
      method: "POST", headers: H,
      body: JSON.stringify(cursor ? { start_cursor: cursor, page_size: 100 } : { page_size: 100 }),
    });
    if (!r.ok) throw new Error(`query ${r.status}: ${await r.text()}`);
    const j = await r.json();
    out.push(...j.results);
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  return out;
}
async function patch(pageId, properties) {
  if (DRY) return;
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH", headers: H, body: JSON.stringify({ properties }),
  });
  if (!r.ok) throw new Error(`patch ${r.status}: ${await r.text()}`);
}
const P = (pg, n) => pg.properties[n];
const sel = (p) => p?.select?.name ?? null;
const chk = (p) => p?.checkbox ?? false;
const num = (p) => (typeof p?.number === "number" ? p.number : null);
const title = (p) => (p?.title ?? []).map((t) => t.plain_text).join("").trim();
const urlv = (p) => p?.url ?? null;
const phonev = (p) => p?.phone_number ?? null;

// --- yardımcılar ---------------------------------------------------------
function normalizePhone(raw) {
  if (!raw) return null;
  let d = String(raw).replace(/[^\d]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = "9" + d;          // 0530... -> 90530...
  if (d.length === 10 && d.startsWith("5")) d = "90" + d;
  if (d.length === 12 && d.startsWith("905")) return d;
  return null;
}
function buildMessage({ ad, demoUrl, sektor }) {
  const deger = DEGER[sektor] || DEGER_VARSAYILAN;
  return [
    `Merhaba, ben Ahmet. FlyTeq web ajansını yönetiyorum: ${AGENCY}`,
    ``,
    `${ad} için, siz talep etmeden bir örnek site hazırladım: ${demoUrl}`,
    ``,
    `Hedefim iki şey: işletmeyi Google aramalarında üst sıralara taşımak ve siteyi gören kişiyi gerçek müşteriye çevirmek. ${deger}`,
    ``,
    `Uygun olduğunuzda göz atın; beğenirseniz detayları konuşalım.`,
  ].join("\n");
}
const osa = (script) => execFileSync("osascript", ["-e", script], { encoding: "utf8" }).trim();

function chromeOpen(url) {
  // Var olan web.whatsapp.com sekmesini yönlendir, yoksa yeni sekme aç.
  const js = `
tell application "Google Chrome"
  activate
  set done to false
  repeat with w in windows
    repeat with t in tabs of w
      if (URL of t) contains "web.whatsapp.com" then
        set URL of t to "${url}"
        set index of w to 1
        set done to true
      end if
    end repeat
  end repeat
  if not done then open location "${url}"
end tell`;
  osa(js);
}
function chromePressSend() {
  // Chrome öne + "boşluk, sil, Enter" — hazır metni WhatsApp'a gerçek yazı
  // saydırıp gönderimi tetikler (düz Enter bazen tutuyor).
  const js = `
tell application "Google Chrome" to activate
delay 1
tell application "System Events"
  tell process "Google Chrome" to set frontmost to true
  delay 0.6
  keystroke " "
  delay 0.3
  key code 51
  delay 0.3
  key code 36
end tell`;
  osa(js);
}

// --- ana ----------------------------------------------------------------
const gonderildi = [];
const atlandi = [];
let bekleyen = 0;

async function main() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  if (!SKIP_TIME) {
    const h = now.getHours();
    if (!SEND_DAYS.includes(now.getDay()) || h < WINDOW[0] || h >= WINDOW[1]) {
      console.log(`Saat/gün dışı (${now.toString()}), atlandı.`);
      return;
    }
  }

  const pages = await queryAll();
  const uygun = pages
    .filter((pg) => {
      const asama = sel(P(pg, "Aşama"));
      return (
        asama === "Demo Hazır" &&
        !KAPALI.includes(asama) &&
        urlv(P(pg, "Demo URL")) &&
        phonev(P(pg, "Telefon")) &&
        !chk(P(pg, "WhatsApp Gönderildi"))
      );
    })
    .sort((a, b) => {
      const pa = num(P(a, "Uygunluk Puanı"));
      const pb = num(P(b, "Uygunluk Puanı"));
      if (pa !== pb) return (pb ?? -1) - (pa ?? -1);
      const rank = { "Sıcak": 3, "Ilık": 2, "Soğuk": 1 };
      return (rank[sel(P(b, "Öncelik"))] ?? 0) - (rank[sel(P(a, "Öncelik"))] ?? 0);
    });

  bekleyen = Math.max(0, uygun.length - CAP);
  const sira = uygun.slice(0, CAP);

  for (const pg of sira) {
    const ad = title(P(pg, "İşletme"));
    const demoUrl = urlv(P(pg, "Demo URL"));
    const sektor = sel(P(pg, "Sektör"));
    const tel = normalizePhone(phonev(P(pg, "Telefon")));

    if (!tel) {
      atlandi.push(`${ad} — numara geçersiz (${phonev(P(pg, "Telefon"))})`);
      await patch(pg.id, {
        "Sonraki Aksiyon": { select: { name: "Telefonla Ara" } },
        "Sonraki Aksiyon Tarihi": { date: { start: today } },
        "WhatsApp Mesaj Metni": { rich_text: [{ text: { content: "WhatsApp için numara geçersiz — telefonla aranacak" } }] },
      });
      continue;
    }

    const msg = buildMessage({ ad, demoUrl, sektor });
    const url = `https://web.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(msg)}`;

    if (DRY) {
      gonderildi.push(`${ad} · ${tel} · ${demoUrl}  [DRY]`);
      console.log(`\n--- ${ad} (${tel}) ---\n${msg}\n`);
      continue;
    }

    chromeOpen(url);
    await sleep(12000);          // sohbet + hazır metin yüklensin
    chromePressSend();
    await sleep(3500);

    const set = {
      "WhatsApp Gönderildi": { checkbox: true },
      "WhatsApp Gönderim Tarihi": { date: { start: today } },
      "Aşama": { select: { name: "İlk Temas Yapıldı" } },
      "Yanıt Durumu": { select: { name: "Cevap Bekleniyor" } },
      "Son Temas Kanalı": { select: { name: "WhatsApp" } },
      "Son Temas Tarihi": { date: { start: today } },
      "Sonraki Aksiyon": { select: { name: "İşlem Yok" } },
      "WhatsApp Mesaj Metni": { rich_text: [{ text: { content: msg } }] },
    };
    if (!P(pg, "İlk Temas Tarihi")?.date?.start) set["İlk Temas Tarihi"] = { date: { start: today } };
    const ts = num(P(pg, "Temas Sayısı"));
    set["Temas Sayısı"] = { number: (ts ?? 0) + 1 };
    await patch(pg.id, set);

    gonderildi.push(`${ad} · ${tel} · ${demoUrl}`);
    await sleep(5000);          // mesajlar arası nefes
  }
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => {
    const md = [
      `# WhatsApp ilk mesaj — ${new Date().toISOString().slice(0, 16).replace("T", " ")}${DRY ? " (DRY)" : ""}`,
      ``,
      `## Gönderildi: ${gonderildi.length}`,
      gonderildi.length ? gonderildi.map((x) => `- ${x}`).join("\n") : "- yok",
      ``,
      `## Atlandı: ${atlandi.length}`,
      atlandi.length ? atlandi.map((x) => `- ${x}`).join("\n") : "- yok",
      ``,
      `## Tavan (${CAP}) nedeniyle bekleyen: ${bekleyen}`,
      ``,
    ].join("\n");
    fs.mkdirSync(new URL("../durum/", import.meta.url), { recursive: true });
    fs.writeFileSync(new URL("../durum/whatsapp-son-gonderim.md", import.meta.url), md);
    console.log("\n" + md);
  });
