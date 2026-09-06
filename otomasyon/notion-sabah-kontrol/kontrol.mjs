#!/usr/bin/env node
/**
 * FlyTeq — Notion sabah satış kontrolü
 *
 * Bilgisayardan bağımsız çalışır (GitHub Actions cron). Claude API KULLANMAZ —
 * sadece tarih ve kural işlemi. Notion REST API (2022-06-28).
 *
 * Kurallar:
 *  1. WhatsApp gönderilmiş + üzerinden >=3 gün geçmiş + hâlâ "Cevap Bekleniyor"
 *     + henüz aranmamış  →  Sonraki Aksiyon = "Telefonla Ara", Tarihi = bugün
 *  2. Sonraki Aksiyon Tarihi geçmişte kalmış + aktif kayıt
 *     →  Tarihi = bugün (Yönetici'nin "Bugün" listesine düşsün)
 *
 * Değişmez: Aşama'yı değiştirmez, müşteriye dokunmaz, para harcamaz.
 * Çıktı: otomasyon/durum/son-kontrol.md (Yönetici bunu okur)
 *
 * ENV:  NOTION_TOKEN  (GitHub repo secret)
 */

const TOKEN = process.env.NOTION_TOKEN;
const DB = "7c80366b-bfc7-4511-8364-f5b45c838066";
const NV = "2022-06-28";
const DRY = process.argv.includes("--dry");

if (!TOKEN) { console.error("NOTION_TOKEN yok"); process.exit(1); }

const H = {
  "Authorization": `Bearer ${TOKEN}`,
  "Notion-Version": NV,
  "Content-Type": "application/json",
};

const today = new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) =>
  Math.floor((Date.parse(b) - Date.parse(a)) / 86400000);

const KAPALI = ["Kazanıldı", "Kaybedildi"];

async function queryAll() {
  const out = [];
  let cursor;
  do {
    const r = await fetch(`https://api.notion.com/v1/databases/${DB}/query`, {
      method: "POST",
      headers: H,
      body: JSON.stringify(cursor ? { start_cursor: cursor, page_size: 100 } : { page_size: 100 }),
    });
    if (!r.ok) throw new Error(`query ${r.status}: ${await r.text()}`);
    const j = await r.json();
    out.push(...j.results);
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  return out;
}

function prop(page, name) { return page.properties[name]; }
const getSelect = (p) => p?.select?.name ?? null;
const getCheckbox = (p) => p?.checkbox ?? false;
const getDate = (p) => p?.date?.start ?? null;
const getTitle = (p) => (p?.title ?? []).map((t) => t.plain_text).join("");

async function patch(pageId, properties) {
  if (DRY) return;
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH", headers: H, body: JSON.stringify({ properties }),
  });
  if (!r.ok) throw new Error(`patch ${r.status}: ${await r.text()}`);
}

const main = async () => {
  const pages = await queryAll();
  const aramaGerek = [];
  const tarihGuncellendi = [];
  const bugunListesi = [];

  for (const pg of pages) {
    const ad = getTitle(prop(pg, "İşletme"));
    const asama = getSelect(prop(pg, "Aşama"));
    if (KAPALI.includes(asama)) continue;

    const waGonderildi = getCheckbox(prop(pg, "WhatsApp Gönderildi"));
    const waTarih = getDate(prop(pg, "WhatsApp Gönderim Tarihi"));
    const yanit = getSelect(prop(pg, "Yanıt Durumu"));
    const arandi = getCheckbox(prop(pg, "Arandı"));
    const sonrakiAksiyon = getSelect(prop(pg, "Sonraki Aksiyon"));
    const sonrakiTarih = getDate(prop(pg, "Sonraki Aksiyon Tarihi"));

    // Kural 1: WhatsApp'a 3 gün cevap yok → telefonla ara
    if (waGonderildi && waTarih && !arandi &&
        yanit === "Cevap Bekleniyor" &&
        daysBetween(waTarih, today) >= 3) {
      await patch(pg.id, {
        "Sonraki Aksiyon": { select: { name: "Telefonla Ara" } },
        "Sonraki Aksiyon Tarihi": { date: { start: today } },
      });
      aramaGerek.push(`${ad} (WhatsApp ${waTarih}, ${daysBetween(waTarih, today)} gün)`);
      continue;
    }

    // Kural 2: geçmiş kalmış aksiyon tarihini bugüne çek
    if (sonrakiTarih && sonrakiTarih < today &&
        sonrakiAksiyon && sonrakiAksiyon !== "İşlem Yok") {
      await patch(pg.id, {
        "Sonraki Aksiyon Tarihi": { date: { start: today } },
      });
      tarihGuncellendi.push(`${ad} — ${sonrakiAksiyon} (${sonrakiTarih} → bugün)`);
      continue;
    }

    // Bilgi: bugün yapılacaklar
    if (sonrakiTarih && sonrakiTarih <= today &&
        sonrakiAksiyon && sonrakiAksiyon !== "İşlem Yok") {
      bugunListesi.push(`${ad} — ${sonrakiAksiyon}`);
    }
  }

  const md = [
    `# Sabah kontrol — ${today}${DRY ? " (DRY RUN)" : ""}`,
    ``,
    `## Bugün aranacaklar (3 gün cevap yok)`,
    aramaGerek.length ? aramaGerek.map((x) => `- ${x}`).join("\n") : "- yok",
    ``,
    `## Tarihi bugüne çekilen geciken görevler`,
    tarihGuncellendi.length ? tarihGuncellendi.map((x) => `- ${x}`).join("\n") : "- yok",
    ``,
    `## Bugünün aksiyon listesi (bilgi)`,
    bugunListesi.length ? bugunListesi.map((x) => `- ${x}`).join("\n") : "- yok",
    ``,
    `_Toplam aktif kayıt: ${pages.filter((p) => !KAPALI.includes(getSelect(prop(p, "Aşama")))).length}_`,
    ``,
  ].join("\n");

  const fs = await import("node:fs");
  fs.mkdirSync(new URL("../durum/", import.meta.url), { recursive: true });
  fs.writeFileSync(new URL("../durum/son-kontrol.md", import.meta.url), md);
  console.log(md);
};

main().catch((e) => { console.error(e); process.exit(1); });
