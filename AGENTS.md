# FlyTeq — Ajans Operasyon Merkezi

Bu klasör, Ahmet Faruk Doğan'ın **FlyTeq** web ajansının tüm işini tek yerden
yürüttüğü sistemdir. Ayrı bir admin panel yok — ajan (Claude / Codex) doğrudan
araçları çalıştırır, GitHub'a push eder, Vercel'e deploy eder, Notion CRM'i
günceller.

> **Bu dosya ve `CLAUDE.md` aynı içeriktedir.** Codex `AGENTS.md`'yi, Claude
> `CLAUDE.md`'yi okur. Birini değiştiren diğerini de günceller.

**En genel amaç:** Ajanlarla otomatik yeni müşteri bul → onlara önceden demo
site hazırla → sat. Satılırsa demoyu gerçek siteye çevir + domain bağla.
Satılan her müşteri bir **referans** olur, ajansın kendi sitesine eklenir.
Bunun dışında çevreden gelen işler (Öznur Şaşmaz gibi) de burada yönetilir.

---

## ⚠️ BU KLASÖRDEN HİÇBİR ŞEY SİLİNMEZ

Bu klasör ajans merkezidir. İçinde birden fazla iş yan yana yaşar:
ajans satış sistemi + Öznur'un sitesi + ajansın kendi sitesi. Bir kısmını
"ilgisiz proje" sanıp silme, `.gitignore`'a ekleyip engelleme, git geçmişini
resetleme **YOK**. Daha önce bir oturum bunu yaptı, tüm sistem silindi,
reflog'dan kurtarıldı. Bir şey yanlış yerde duruyorsa kullanıcıya sor, taşı —
silme.

---

## 5 Chat modeli

İş beş role bölünmüştür. Her rol ayrı bir sohbette çalışır. **Kullanıcı sana
hangi chat olduğunu söyleyecek** — o numaranın dosyasını aç, rolünü oku:

| # | Chat | Dosya | Rolü |
|---|---|---|---|
| 1 | **Sistem** | `chatlar/1-sistem.md` | Mimari, klasör düzeni, CLAUDE.md/AGENTS.md sahipliği, Notion yapısı, git/yedek |
| 2 | **Satış** | `chatlar/2-satis.md` | Soğuk satış: müşteri bul → demo yap → sat. Görükle/Özlüce + Bursa geneli |
| 3 | **Dış işler** | `chatlar/3-dis-isler.md` | Çevreden gelen işler (Öznur gibi): site + domain |
| 4 | **Geliştirme** | `chatlar/4-gelistirme.md` | Satılan demoyu gerçek siteye çevir + domain bağla |
| 5 | **Bakım** | `chatlar/5-bakim.md` | Yeni skill araştır, hattı iyileştir, haftalık otomatik ajanı denetle |

Kullanıcı "sen chat 2'sin" derse: `chatlar/2-satis.md`'yi oku, ona göre çalış.
Belirtmezse sor. Bir chat kendi dosyasına ait bir şey geliştirirse o dosyayı
günceller.

---

## Klasör yapısı

```
flyteq son/                (git reposu: oznur-sasmaz-site — public; ileride flyteq'e dönebilir)
├── CLAUDE.md / AGENTS.md   ← bu doküman (Claude + Codex okur), aynı içerik
├── chatlar/               ← 5 rol dosyası
├── arac/                  ← üretim araçları
│   ├── marka.mjs             Instagram + Google Haritalar araştırma (görsel, metin, palet, künye)
│   ├── sitekontrol.mjs       mevcut sitenin gerçekten çalışıp çalışmadığını Chrome'da ölçer
│   ├── kontrol.sh            demo kalite kontrolü (token, görsel, tel, schema, sızıntı)
│   ├── ss.mjs                mobil + masaüstü tam sayfa ekran görüntüsü + yatay taşma raporu
│   ├── YONLER.md             hangi işletmeye hangi tasarım yönü verildi (tekrar yasağı)
│   └── sablon/               MEKANİK referansı — kopyalanacak görsel şablon DEĞİL
├── demo/                  ← haftalık soğuk-satış demoları
│   └── <YYYY-AA-GG>_<YYYY-AA-GG>/<isletme-slug>/
│       ├── arastirma.md · plan.md · marka.md · ig/ · site/{index.html, assets/}
├── musteri/              ← satılan / teslim edilen müşteriler = referanslar
│   └── <slug>/site/ · README.md
├── site/                 ← FlyTeq'in kendi ajans sitesi kaynağı (referansları musteri/'den alır)
├── index.html + assets/  ← Öznur Şaşmaz'ın sitesi (Chat 3'ün işi, kökte duruyor)
├── Referanslar/          ← referans site klonları (gitignore'lu, yerel)
├── .claude/skills/       ← Claude için — 3 skill otomatik yüklenir
└── .agents/skills/       ← Codex için — aynı 3 skill (senkron tutulur)
```

---

## Skill'ler

`.claude/skills/` (Claude) ve `.agents/skills/` (Codex) — **ikisi de aynı**,
değişiklik birine yapılınca diğerine kopyalanır.

| skill | ne zaman | ne yapar |
|---|---|---|
| `musteri-bul` | "müşteri bul", "bu haftanın listesi" | Bursa'da web sitesi olmayan/kötü 6 işletme (hepsi farklı sektör), Notion'a yazar |
| `site-plani` | "<slug> için plan", "şu işletmeyi araştır" | `arac/marka.mjs` çalıştırır, derin araştırma, tasarım yönü önerir, `arastirma.md` + `plan.md` |
| `site-yap` | "<slug> sitesini yap", "demoyu kur" | **`avoid-ai-design` + `frontend-design-pro` yükler**, sıfırdan tasarlar, kontrol eder, onay sonrası GitHub repo + Vercel |

**Built-in tasarım skill'leri (kurulum yok):**
- `avoid-ai-design` — AI'nin varsayılan "slop" kalıplarını (mor-mavi gradyan,
  Inter fontu, ortalı 3 kart hero, düz shadcn, glassmorphism) tespit edip kırar.
  12 estetik yön + tam tell kataloğu.
- `frontend-design-pro` — üretim kalitesinde arayüz + gerçek görsel
  (Unsplash/Pexels) veya doğru görsel-üretim prompt'u.
- `design` — karmaşık/çok sayfalı işlerde önce mockup çıkarıp onaylatmak için.

`site-yap` her seferinde ilk ikisini yüklemekle **yükümlü**. Atlanırsa jenerik
AI sitesi çıkar (bir kez oldu, `arac/YONLER.md`'deki yasaklı listesi o
denetimden çıktı). Koomook/claude-frontend-skills incelendi, kurulmadı
(4 sabit tema, bakımsız, tekrar riski).

---

## Notion CRM

Satış/müşteri takibi Notion'da, repoda değil:
https://app.notion.com/p/7c80366bbfc745118364f5b45c838066

- Veritabanı: `Ajans — Müşteri Takibi` (30 alan)
- Dashboard: `Yerel Satış CRM` — Aksiyon Sırası (Bugün+Gecikenler), Bu Hafta,
  Pipeline (board), Sıcak Lead'ler
- Aşamalar: Yeni Lead → Araştırıldı → Demo Hazırlanıyor → Demo Hazır →
  İlk Temas Yapıldı → Cevap Bekleniyor → Görüşme → Teklif Verildi →
  Kazanıldı / Kaybedildi
- Telefondan güncellenir, her chat okuyabilir. Tek gerçek kaynak — repoda
  ayrı bir PIPELINE dosyası tutulmaz.
- Şu an 13 işletme kayıtlı (2 demo hazır, 9 araştırıldı, 2 elendi).

---

## Ajansın kendi sitesi (flyteq.space)

Bu, müşteri demolarından **ayrı** bir konu — FlyTeq'in kendi tanıtım sitesi.

- Domain: `flyteq.space`
- Kaynak: `site/` klasörü (düz statik HTML/JS, build yok)
- Veri: Supabase projesi `flyteq-agency`, `references` tablosu — portföy/referans
  verisi. Supabase'te satır düzenlemek siteyi anında günceller.
- Barındırma: Netlify (bu site için). **Müşteri demoları Vercel'e gider** —
  ikisi ayrı, çakışmaz.
- Satılan her müşteri (`musteri/<slug>/`) buraya referans olarak eklenir.

---

## Değişmez kurallar (tüm chat'ler)

1. **Bu klasörden bir şey silme.** Yukarıdaki uyarıya bak.
2. **Uydurma yok.** Çalışma saati, fiyat, kuruluş yılı, ödül, müşteri yorumu —
   kaynağı yoksa siteye girmez. Gerçek Google yorumu yoksa bölüm silinir.
3. **"Site ölü" kararı ajandan verilemez.** curl/WebFetch/headless Chrome
   hosting botu engeline takılıp 503/403 verebilir. Faruk telefonundan açıp
   doğrular. İstisna: `*.business.site` (Google Mart 2024'te kapattı). Kalite
   ölçümü için `arac/sitekontrol.mjs` var ama son karar Faruk'un.
4. **Fotoğraf önce işletmenin kendisinden.** `arac/marka.mjs` Instagram
   kareleri indirir. Yoksa stok, ama `arastirma.md`'ye yazılır ve sahada
   "fotoğraflarınızı koyunca daha iyi olacak" denir.
5. **Tasarım yönü tekrar edilemez.** `arac/YONLER.md` — son 3 işletmede
   kullanılan yön yeni işletmede seçilemez. Marka rengi işletmenin kendi
   logosundan/görselinden örneklenir (Merikafit'te mor göz ardı edildi, site
   çöpe gitti).
6. **Tek dosya HTML.** Framework yok, build yok, CSS/JS ayrı dosya yok.
   Sadece Google Fonts dışarıdan. (İstisna: ajansın kendi sitesi `site/` —
   orada Supabase entegrasyonu var.)
7. **Her demo `noindex`** — teklif aşamasında. Chat 4 satış sonrası kaldırır.
8. **Her önemli iş sonrası:** `git add -A && git commit && git push`.
9. **Aynı anda tek işletme.** Biri bitmeden sonrakine geçme.

---

## Öğrenilen dersler (tekrarlama)

- **Bu klasörün geçmişi bir kez silindi** — bir oturum ajans sistemini
  "ilgisiz" sanıp resetledi. Reflog'dan kurtarıldı. Bir daha: uyarı bölümüne bak.
- **macOS Desktop'ta YENİ klasör = git donması.** Var olan klasörde git
  çalışıyor; ama `~/Desktop/<yepyeni>` altında git komutları sessizce
  (görünür onay penceresi olmadan) sonsuza kadar bekliyor. Yeni repo açman
  gerekirse home kökünde (`~/...`) aç.
- **İç içe git repo tuzağı.** `demo/*/*/site/` kendi reposuna push edilince
  dış repoda gitlink oluşuyor, `git status` iç repoya dalıp donuyor.
  `.gitignore`'da `demo/*/*/site/`.
- **`img{height:auto}` şart.** `<img height="1375">` özniteliği CSS `height`e
  dönüşüp `aspect-ratio`'yu eziyor, görsel dikey eziliyor. İki projede ısırdı.
- **`padding` kısayolu `.wrap` yatay dolgusunu eziyor** — bölüm dolgusu için
  `padding-block` kullan.
- **PIL kırpma kutusu görsel sınırını aşınca siyah bant** — kutuyu her zaman
  görsel boyutlarına kıstır.
- **`marka.mjs` sınırları:** Instagram hikâye *içeriği* ve Google Haritalar
  *yorumları* alınamıyor (giriş / "Sınırlı görünüm"). Bunları Faruk telefondan
  ekran görüntüsüyle getirir. Gönderi görselleri, açıklamalar, künye alınıyor.
- **Notion DDL tuzağı:** `ALTER COLUMN SET SELECT(...)` yerinde değiştirmek
  yerine `"X 1"` diye yeni kolon açabiliyor. Drop + rename ayrı çağrılarda.

---

## Bu klasör DIŞINDA olanlar

| ne | yer | not |
|---|---|---|
| `~/flyteq/` (yerel) + GitHub `flyteq-sistem` (private) | ev dizini | Bu sistemin **yedeği**. Birkaç gün dursun, sonra silinebilir; GitHub yedek kalır |
| Paris Kuaför demo | GitHub `paris-kuafor-gorukle-demo` · `paris-kuafor-gorukle.vercel.app` | Chat 2 üretti, canlı, satış bekliyor |
| Merikafit Pilates demo | GitHub `merikafit-pilates-gorukle-demo` · `merikafit-pilates-gorukle.vercel.app` | Chat 2 üretti, canlı, satış bekliyor |
| Arşivlenmiş eski denemeler | GitHub `flyteq`, `flytewq.agency`, `flytewqagency`, `flyteq-agency-site`, `flyteq-weekly-leads` | hepsi arşivlendi, dokunma |
