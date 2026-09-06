#!/usr/bin/env node
/**
 * FlyTeq — WhatsApp ilk mesaj göndericisi (yerel, launchd ile Pazartesi 10:15)
 *
 * Notion'a BAĞLANMAZ. Sadece yerel `kuyruk.json`'u okur, mesajları Chrome'da
 * WhatsApp Web üzerinden gönderir, sonucu `gonderildi.json` + durum dosyasına
 * yazar. Notion güncellemesini bir ajan (Chat 1/2) `gonderildi.json`'a bakarak
 * yapar.
 *
 * Haftalık model: Pazar gecesi ajan `kuyruk.json`'u hazırlar (6 lead) →
 * Pazartesi 10:15 bu script gönderir.
 *
 * Claude API YOK, token YOK. Mac açık + Chrome'da WhatsApp Web (kişisel ya da
 * Business hesabı — ikisi de olur) girişli olmalı. Erişilebilirlik izni gerekli.
 *
 * Kurulum + kurallar: README.md · mesaj metni: mesaj-sablonu.md
 *
 * Bayraklar:
 *   --dry          göndermeden sadece ne yapacağını yaz
 *   --skip-time    Pazartesi / 10:00–19:00 kontrolünü atla (test için)
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";

const CAP = 6;                 // haftalık parti — bir çalıştırmada en fazla
const WINDOW = [10, 19];       // TR saati 10:00–19:00
const SEND_DAY = 1;            // sadece Pazartesi (0=Paz, 1=Pzt)
const DRY = process.argv.includes("--dry");
const SKIP_TIME = process.argv.includes("--skip-time");
const AGENCY = "flyteq.space";

const KUYRUK = new URL("./kuyruk.json", import.meta.url);
const SONUC = new URL("./gonderildi.json", import.meta.url);
const DURUM = new URL("../durum/whatsapp-son-gonderim.md", import.meta.url);

// mesaj-sablonu.md ile aynı — sektöre göre tek değer cümlesi
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const osa = (s) => execFileSync("osascript", ["-e", s], { encoding: "utf8" }).trim();

function normalizePhone(raw) {
  if (!raw) return null;
  let d = String(raw).replace(/[^\d]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = "9" + d;
  if (d.length === 10 && d.startsWith("5")) d = "90" + d;
  return d.length === 12 && d.startsWith("905") ? d : null;
}
function buildMessage({ isletme, demo_url, sektor, mesaj }) {
  if (mesaj && mesaj.trim()) return mesaj.trim();   // kuyrukta hazır metin varsa onu kullan
  const deger = DEGER[sektor] || DEGER_VARSAYILAN;
  return [
    `Merhaba, ben Ahmet. FlyTeq web ajansını yönetiyorum: ${AGENCY}`,
    ``,
    `${isletme} için, siz talep etmeden bir örnek site hazırladım: ${demo_url}`,
    ``,
    `Hedefim iki şey: işletmeyi Google aramalarında üst sıralara taşımak ve siteyi gören kişiyi gerçek müşteriye çevirmek. ${deger}`,
    ``,
    `Uygun olduğunuzda göz atın; beğenirseniz detayları konuşalım.`,
  ].join("\n");
}
function chromeOpen(url) {
  osa(`
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
end tell`);
}
function chromePressSend() {
  osa(`
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
end tell`);
}

const gonderildi = [];
const atlandi = [];
let bekleyen = 0;
let hata = null;

async function main() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  if (!SKIP_TIME) {
    const h = now.getHours();
    if (now.getDay() !== SEND_DAY || h < WINDOW[0] || h >= WINDOW[1]) {
      hata = `Gün/saat dışı (${now.toString()}) — sadece Pazartesi 10:00–19:00`;
      return;
    }
  }
  if (!fs.existsSync(KUYRUK)) { hata = "kuyruk.json yok — Pazar gecesi hazırlanmalı"; return; }

  let kuyruk;
  try { kuyruk = JSON.parse(fs.readFileSync(KUYRUK, "utf8")); }
  catch (e) { hata = "kuyruk.json okunamadı: " + e.message; return; }

  const leadler = (kuyruk.leadler || []).slice();
  bekleyen = Math.max(0, leadler.length - CAP);
  const sira = leadler.slice(0, CAP);

  for (const L of sira) {
    const isletme = (L.isletme || "?").trim();
    const tel = normalizePhone(L.telefon);
    if (!tel) { atlandi.push({ isletme, neden: `numara geçersiz (${L.telefon})`, notion_page_id: L.notion_page_id || null }); continue; }
    if (!L.demo_url) { atlandi.push({ isletme, neden: "demo_url boş", notion_page_id: L.notion_page_id || null }); continue; }

    const msg = buildMessage({ isletme, demo_url: L.demo_url, sektor: L.sektor, mesaj: L.mesaj });
    const url = `https://web.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(msg)}`;

    if (DRY) {
      gonderildi.push({ isletme, telefon: tel, demo_url: L.demo_url, notion_page_id: L.notion_page_id || null, dry: true });
      console.log(`\n--- ${isletme} (${tel}) ---\n${msg}\n`);
      continue;
    }

    chromeOpen(url);
    await sleep(12000);
    chromePressSend();
    await sleep(3500);
    gonderildi.push({
      isletme, telefon: tel, demo_url: L.demo_url,
      notion_page_id: L.notion_page_id || null,
      mesaj: msg, ts: new Date().toISOString(),
    });
    await sleep(5000);
  }
}

main()
  .catch((e) => { hata = String(e && e.stack || e); process.exitCode = 1; })
  .finally(() => {
    const sonuc = {
      calisti: new Date().toISOString(),
      dry: DRY,
      hafta: null,
      gonderildi, atlandi, bekleyen,
      hata: hata || null,
      notion_guncellendi: false,   // ajan Notion'u güncelleyince true yapar
    };
    try {
      if (fs.existsSync(KUYRUK)) sonuc.hafta = (JSON.parse(fs.readFileSync(KUYRUK, "utf8")).hafta) || null;
    } catch {}
    if (!DRY) fs.writeFileSync(SONUC, JSON.stringify(sonuc, null, 2) + "\n");

    const md = [
      `# WhatsApp ilk mesaj — ${new Date().toISOString().slice(0, 16).replace("T", " ")}${DRY ? " (DRY)" : ""}`,
      ``,
      hata ? `> ${hata}\n` : "",
      `## Gönderildi: ${gonderildi.length}`,
      gonderildi.length ? gonderildi.map((x) => `- ${x.isletme} · ${x.telefon} · ${x.demo_url}`).join("\n") : "- yok",
      ``,
      `## Atlandı: ${atlandi.length}`,
      atlandi.length ? atlandi.map((x) => `- ${x.isletme} — ${x.neden}`).join("\n") : "- yok",
      ``,
      `## Tavan (${CAP}) nedeniyle bekleyen: ${bekleyen}`,
      ``,
      gonderildi.length && !DRY ? `_Notion güncellemesi bekliyor: gonderildi.json_` : "",
      ``,
    ].join("\n");
    fs.mkdirSync(new URL("../durum/", import.meta.url), { recursive: true });
    fs.writeFileSync(DURUM, md);
    console.log("\n" + md);
  });
