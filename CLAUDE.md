# FlyTeq — Ajans İşletim Sistemi

Bu klasör, Ahmet Faruk Doğan'ın **FlyTeq** web ajansının tüm işini tek yerden
yürüttüğü sistemdir. Ayrı bir admin panel yok — ajan (Claude / Codex) doğrudan
araçları çalıştırır, GitHub'a push eder, Vercel'e deploy eder, Notion CRM'i
günceller. Bilgisayardan bağımsız çalışması gereken basit takip işleri
`otomasyon/` altında GitHub Actions ile yürür.

> **Bu dosya ve `AGENTS.md` aynı içeriktedir.** Claude `CLAUDE.md`'yi, Codex
> `AGENTS.md`'yi okur. Birini değiştiren diğerini de günceller.

---

## ⚠️ BU KLASÖRDEN HİÇBİR ŞEY SİLİNMEZ

Bu klasör ajans merkezidir. İçinde birden fazla iş yan yana yaşar: ajans satış
sistemi + Öznur'un sitesi + ajansın kendi sitesi. Bir kısmını "ilgisiz proje"
sanıp silme, `.gitignore`'a ekleyip engelleme, git geçmişini resetleme **YOK**.
Daha önce bir oturum bunu yaptı, tüm sistem silindi, reflog'dan kurtarıldı.
Bir şey yanlış yerde duruyorsa kullanıcıya sor, taşı — silme. Müşteri kaydı,
demo, referans, öğrenilmiş teknik kural asla gereksiz yere silinmez.

---

## İş modeli — bugün

FlyTeq şu anda tek ana hizmet satıyor: **internet sitesi olmayan / kötü olan
işletmeyi bul → o daha talep etmeden ona özel demo hazırla → demoyu sat.**

```
işletme bul → araştır → uygun olanları seç → demo hazırla → Notion'a işle
→ Ahmet WhatsApp'tan ulaşsın → cevap yoksa 3 gün sonra telefon
→ müşteri kabul → ÖN ÖDEME → son düzenlemeler → alan adı → canlı site → referans
```

Gelir üreten ana sistem budur. Dağıtma.

## İş modeli — uzun vade

FlyTeq uzun vadede KOBİ'lerin iş süreçlerini yapay zekâ ve otomasyonla
dönüştüren bir yapı olacak (satış, müşteri takibi, WhatsApp, randevu, pazarlama,
içerik, raporlama, müşteri hizmetleri…). Ama **şimdi bu hizmetler aktif
satılmaz.** Önce FlyTeq kendi içinde kullanır; çalıştığı kanıtlananlar sonra
müşteriye uyarlanır. Araştırması Chat 6'da.

---

## 6 Ajan modeli

İş altı role bölünmüştür. Her rol ayrı bir sohbette çalışır. **Kullanıcı sana
hangi chat olduğunu söyleyecek** — o numaranın dosyasını aç, rolünü oku.
Ahmet'in ana giriş noktası **Chat 1 (Yönetici)**.

| # | Chat | Dosya | Rolü |
|---|---|---|---|
| 1 | **Yönetici** | `chatlar/1-yonetici.md` | Her şeyi izler, Notion'dan durumu okur, Ahmet'e sade günlük/haftalık rapor verir. İş üretmez. |
| 2 | **Satış** | `chatlar/2-satis.md` | Soğuk satış: Bursa geneli işletme bul → ~20 araştır → en iyi 6 → demo → Ahmet'i satışa hazırla. Ana gelir. |
| 3 | **Müşteri İşleri** | `chatlar/3-musteri-isleri.md` | **Ön ödeme sonrası** demoyu gerçek siteye çevir + domain + teslim + referans. Dışarıdan gelen hazır işler (Öznur) de burada. |
| 4 | **Pazarlama** | `chatlar/4-pazarlama.md` | İçerik sistemi kur: yapılan işler, işletmelere faydalı içerik, yapay zekâ dönüşümü. Haftada 3, Ahmet onayına. |
| 5 | **Gelişim** | `chatlar/5-gelisim.md` | Hattı ölç ve iyileştir, skill sürümle, tekrar eden hataları hatta yansıt, mimariyi tutarlı tut, otomatik ajanı denetle. |
| 6 | **Yapay Zekâ Dönüşümü** | `chatlar/6-yapay-zeka-donusumu.md` | Sektör sektör KOBİ otomasyon fırsatlarını araştır. Önce FlyTeq içinde dene. Şimdilik satmaz. |

Kullanıcı "sen chat 2'sin" derse: `chatlar/2-satis.md`'yi oku, ona göre çalış.
Belirtmezse sor. Bir chat kendi dosyasına ait bir şey geliştirirse o dosyayı
günceller (mimari değişikliği Chat 5 onaylatır).

### Ajanlar arası devir

```
Satış → ön ödeme alındı → Müşteri İşleri
Müşteri İşleri → site teslim edildi → Pazarlama
Satış sonucu / Pazarlama sonucu → Gelişim
Gelişim → diğer ajanlara değişiklik önerisi (Ahmet onayıyla)
FlyTeq içinde çalışan bir otomasyon → Yapay Zekâ Dönüşümü'ne hizmet adayı
Yönetici → hepsini okur, Ahmet'e raporlar (devretmez)
```

---

## Klasör yapısı

```
flyteq son/                (git reposu: oznur-sasmaz-site — public)
├── CLAUDE.md / AGENTS.md   ← bu doküman (Claude + Codex okur), aynı içerik
├── chatlar/               ← 6 rol dosyası
├── arac/                  ← üretim araçları
│   ├── marka.mjs             Instagram + Google Haritalar araştırma (görsel, metin, palet, künye)
│   ├── sitekontrol.mjs       mevcut sitenin gerçekten çalışıp çalışmadığını Chrome'da ölçer
│   ├── kontrol.sh            demo kalite kontrolü (token, görsel, tel, schema, sızıntı)
│   ├── ss.mjs                mobil + masaüstü tam sayfa ekran görüntüsü + yatay taşma raporu
│   ├── YONLER.md             hangi işletmeye hangi tasarım yönü verildi (tekrar yasağı)
│   └── sablon/               MEKANİK referansı — kopyalanacak görsel şablon DEĞİL
├── otomasyon/             ← bilgisayardan bağımsız çalışan işler (GitHub Actions)
│   ├── notion-sabah-kontrol/ her sabah satış takibi (3 gün kuralı, geciken görev)
│   └── haftalik-demo/        haftalık otomatik demo ajanının TANIMI
├── demo/                  ← haftalık soğuk-satış demoları
│   └── <YYYY-AA-GG>_<YYYY-AA-GG>/<isletme-slug>/
│       ├── arastirma.md · plan.md · marka.md · ig/ · site/{index.html, assets/}
├── musteri/              ← satılan / teslim edilen müşteriler = referanslar
│   └── <slug>/site/ · README.md
├── site/                 ← FlyTeq'in kendi ajans sitesi kaynağı
├── pazarlama/            ← içerik fikirleri + hazır bekleyen içerikler
├── gelisim/kayitlar/     ← geliştirme önerileri (Sorun/Kanıt/Ders/Öneri/Sonuç/Durum)
├── yapay-zeka-donusumu/  ← sektör sektör otomasyon araştırmaları
├── index.html + assets/  ← Öznur Şaşmaz'ın sitesi (Chat 3'ün işi, kökte duruyor)
├── Referanslar/          ← referans site klonları (gitignore'lu, yerel)
├── .claude/skills/       ← Claude için — 3 skill otomatik yüklenir
└── .agents/skills/       ← Codex için — aynı 3 skill (senkron tutulur)
```

---

## Skill'ler

`.claude/skills/` (Claude) ve `.agents/skills/` (Codex) — **ikisi de aynı**,
değişiklik birine yapılınca diğerine kopyalanır. Zincir **bozulmaz.**

| skill | ne zaman | ne yapar |
|---|---|---|
| `musteri-bul` | "müşteri bul", "bu haftanın listesi" | Bursa'da (bölge bölge) ~20 işletme araştır, puanla, en iyi 6'yı Notion'a yazar |
| `site-plani` | "<slug> için plan", "şu işletmeyi araştır" | `arac/marka.mjs` çalıştırır, derin araştırma, tasarım yönü önerir, `arastirma.md` + `plan.md` |
| `site-yap` | "<slug> sitesini yap", "demoyu kur" | **`avoid-ai-design` + `frontend-design-pro` yükler**, sıfırdan tasarlar, kontrol eder, onay sonrası GitHub repo + Vercel |

**Built-in tasarım skill'leri (kurulum yok, `site-yap` her seferinde yükler):**
- `avoid-ai-design` — AI "slop" kalıplarını tespit edip kırar. 12 estetik yön +
  tam tell kataloğu.
- `frontend-design-pro` — üretim kalitesinde arayüz + gerçek görsel veya doğru
  görsel-üretim prompt'u.
- `design` — karmaşık/çok sayfalı işlerde önce mockup çıkarıp onaylatmak için.

`site-yap` ilk ikisini yüklemekle **yükümlü**. Atlanırsa jenerik AI sitesi çıkar
(bir kez oldu). İleride pazarlama becerileri de eklenecek (Chat 4).

**SEO — `seo-sistemi` skill'i:**
- **Demo aşaması (Chat 2):** demo `noindex` kalır ama **SEO temeli her sitede
  kurulur** — `site-plani` araştırmada "hedef aramalar"ı çıkarır, `site-yap`
  bunlara göre title/H1/metin + tam LocalBusiness schema yazar.
- **Satış sonrası (Chat 3):** `noindex` kalkınca `seo-sistemi` **tam çalışır**
  (anahtar kelime, sayfa içi, `sitemap.xml`, `robots.txt`, schema, blog).
  Ölçüm Search Console ile, teslimden haftalar sonra.

---

## Notion CRM — tek gerçek kaynak

Satış/müşteri durumu Notion'da, repoda değil:
https://app.notion.com/p/7c80366bbfc745118364f5b45c838066

- Veritabanı: `Ajans — Müşteri Takibi` — data source `2868f57d-f231-4f8b-90ea-81f598f2f438`
- Aşamalar: Yeni Lead → Araştırıldı → Demo Hazırlanıyor → Demo Hazır →
  İlk Temas Yapıldı → Cevap Bekleniyor → Görüşme → Teklif Verildi →
  **Kazanıldı** (ancak `Ödeme Durumu = Ön Ödeme Alındı` olunca) / Kaybedildi
- Anahtar alanlar: Aşama · Bölge · Sektör · Öncelik · **Uygunluk Puanı** ·
  Website Durumu · Yanıt Durumu · **WhatsApp Gönderildi (+Tarihi)** · **Arandı** ·
  Sonraki Aksiyon (+Tarihi) · Son Temas Kanalı (+Tarihi) · Kayıp Nedeni ·
  **Ön Ödeme Alındı** · Anlaşma Tutarı · Ödeme Durumu · Demo Durumu / URL / Tarihi ·
  Teslim / Sonraki Hizmet Notu · Hafta · Slug
- Görünümler: Demo Kuyruğu · Cevap Bekleyenler · Follow-up'lar · Sıcak Lead'ler ·
  Görüşme/Teklif · Kazanılanlar · Kaybedilenler · Sektöre Göre · Tüm Lead'ler
- Telefondan güncellenir. **Her ajan güncel durumu Notion'dan okur** — Claude'un
  sohbet hafızası değil. Ahmet Notion'da "Görüşme" yaptıysa gerçek durum odur.
- İleride ayrı veritabanları açılabilir (Müşteri İşleri, Pazarlama, Gelişim,
  Yapay Zekâ Dönüşümü) — ilk öncelik satış sistemi.

---

## Bilgisayar kapalıyken çalışan sistem (`otomasyon/`)

Claude ve VS Code sürekli açık olmak zorunda değil. Basit tarih/kural işleri
yapay zekâya bırakılmaz — GitHub Actions ile bulutta çalışır.

- **`otomasyon/notion-sabah-kontrol/`** — her sabah çalışır. Kontrol: WhatsApp
  gönderilmiş mi + 3 gün geçmiş mi + cevap var mı + bugün aranmalı mı + geciken
  görev var mı. Gerekirse `Sonraki Aksiyon = Telefonla Ara`,
  `Sonraki Aksiyon Tarihi = bugün` yapar. Düz kod — Claude API kullanmaz.
- **`otomasyon/haftalik-demo/`** — haftalık otomatik demo ajanının tanımı
  (Chat 2 pipeline'ı, publish YOK). Denetimi Chat 5'te.

Claude şunlar için kullanılır: işletme araştırması, müşteri seçimi, demo
planlama, site üretimi, içerik hazırlama, sonuç yorumlama, analiz, rapor.
Claude şunlar için **kullanılmaz**: 3 gün geçti mi, tarih hesaplama, geciken
kayıt bulma, basit Notion durum değişikliği, zamanlayıcı işler.

---

## Ajansın kendi sitesi (flyteq.space)

Müşteri demolarından **ayrı** — FlyTeq'in kendi tanıtım sitesi.

- Domain: `flyteq.space` · Kaynak: `site/` (düz statik HTML/JS, build yok)
- Veri: Supabase projesi `flyteq-agency` (`eaiezdvooeqabtrmcokl`), `references`
  tablosu. Satır düzenlemek siteyi anında günceller.
- Barındırma: Netlify. **Müşteri demoları Vercel'e gider** — ikisi ayrı.
- Satılıp domainlenen her müşteri buraya referans olarak eklenir (Chat 3).

---

## Değişmez kurallar (tüm chat'ler)

1. **Bu klasörden bir şey silme.** Yukarıdaki uyarıya bak.
2. **Uydurma yok.** Çalışma saati, fiyat, kuruluş yılı, ödül, müşteri yorumu —
   işletmenin kendi kanalından doğrulanmıyorsa siteye girmez. Gerçek yorum yoksa
   bölüm silinir.
3. **"Site ölü" kararı ajandan verilemez.** curl/WebFetch/headless Chrome
   hosting botu engeline takılıp 503/403 verebilir. Ahmet telefonundan açıp
   doğrular. İstisna: `*.business.site` (Google Mart 2024'te kapattı).
4. **Fotoğraf önce işletmenin kendisinden.** `arac/marka.mjs` Instagram kareleri
   indirir. Yoksa stok, ama `arastirma.md`'ye yazılır ve sahada söylenir.
5. **Tasarım yönü tekrar edilemez.** `arac/YONLER.md` — son 3 işletmede kullanılan
   yön seçilemez. Marka rengi işletmenin kendi logosundan/görselinden örneklenir.
6. **Tek dosya HTML.** Framework yok, build yok, ayrı CSS/JS yok. Sadece Google
   Fonts dışarıdan. (İstisna: ajansın kendi sitesi `site/` — Supabase var.)
7. **Her demo `noindex`** — teklif aşamasında. Chat 3 satış sonrası kaldırır.
8. **Her önemli iş sonrası:** `git add -A && git commit && git push`.
9. **Aynı anda tek işletme** (satış demo üretiminde). Biri bitip onay alınmadan
   sonrakine geçme.
10. **Satış "Kazanıldı" = ön ödeme alındı.** Sözlü "tamam" satış değildir.

---

## Öğrenilen dersler (tekrarlama — Chat 5 günceller)

- **Bu klasörün geçmişi bir kez silindi** — bir oturum ajans sistemini "ilgisiz"
  sanıp resetledi. Reflog'dan kurtarıldı.
- **macOS Desktop'ta YENİ klasör = git donması.** Var olan klasörde git çalışır;
  `~/Desktop/<yepyeni>` altında git komutları sessizce sonsuza kadar bekler.
  Yeni repo gerekirse home kökünde (`~/...`) aç.
- **İç içe git repo tuzağı.** `demo/*/*/site/` kendi reposuna push edilince dış
  repoda gitlink oluşuyor, `git status` donuyor. `.gitignore`'da `demo/*/*/site/`.
- **`img{height:auto}` şart.** `<img height="1375">` özniteliği CSS `height`e
  dönüşüp `aspect-ratio`'yu eziyor, görsel dikey eziliyor. İki projede ısırdı.
- **`padding` kısayolu `.wrap` yatay dolgusunu eziyor** — bölüm dolgusu için
  `padding-block` kullan.
- **PIL kırpma kutusu görsel sınırını aşınca siyah bant** — kutuyu görsel
  boyutlarına kıstır.
- **`marka.mjs` sınırları:** Instagram hikâye *içeriği* ve Google Haritalar
  *yorumları* alınamıyor (giriş / "Sınırlı görünüm"). Ahmet telefondan ekran
  görüntüsüyle getirir.
- **Notion DDL tuzağı:** `ALTER COLUMN SET SELECT(...)` yerinde değiştirmek
  yerine yeni kolon açabiliyor. Drop + rename ayrı çağrılarda.
- **Merikafit:** marka rengi (mor) göz ardı edilince site çöpe gitti. Palet
  işletmenin kendi görsellerinden örneklenir.

---

## Bu klasör DIŞINDA olanlar

| ne | yer | not |
|---|---|---|
| `~/flyteq/` (yerel) + GitHub `flyteq-sistem` (private) | ev dizini | Eski 5-chat yapısının yedeği. GitHub yedek kalır, yerel silinebilir |
| Paris Kuaför demo | GitHub `paris-kuafor-gorukle-demo` · `paris-kuafor-gorukle.vercel.app` | Chat 2 üretti, canlı, satış bekliyor |
| Merikafit Pilates demo | GitHub `merikafit-pilates-gorukle-demo` · `merikafit-pilates-gorukle.vercel.app` | Chat 2 üretti, canlı, satış bekliyor |
| Arşivlenmiş eski denemeler | GitHub `flyteq`, `flytewq.agency`, `flytewqagency`, `flyteq-agency-site`, `flyteq-weekly-leads` | arşivlendi, dokunma (weekly-leads araştırması Chat 5'te kurtarılacak) |
