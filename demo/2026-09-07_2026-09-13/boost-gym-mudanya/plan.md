# Boost Gym Mudanya — site planı

## Konumlandırma
Güzelyalı'da spor salonu. Site "mudanya spor salonu" arayanı ve Instagram'dan
geleni; ekipmanı, konumu, saatleri ve deneme dersi/üyelik yolunu tek ekranda
karşılar.

## Tasarım yönü
**Brütalist — güç antrenmanı.** Gerekçe: brütalizm (ham, sert kontrast, dev
tipografi, çıplak ızgara) doğrudan güç/disiplin dili; spor salonuna oturur. Son
demolarda kullanılan yönlerden (editoryal, karanlık-neon stüdyo, organik, art
deco, endüstriyel) ayrışır. **Merikafit de pilates/spor + karanlıktı — bu
YÜZDEN Boost açık zeminli:** beton krem + siyah + kırmızı. Merikafit'in mor-gece
+ neon-glow dilini tekrarlamaz.

- **Tip:** Big Shoulders Display (atletik sıkışık display — Chicago spor estetiği) + Public Sans (gövde). İkisi de havuzda kullanılmadı.
- **Palet (60/30/10):** 60 beton krem `#f2efe9`/`#e8e4dd` · 30 siyah `#161514` · 10 **kırmızı** `#d22e28` (işletmenin dış cephe bant rengi — kendi markası).
- **Düzen:** asimetrik 2 kolon hero (dev başlık siyahta | tam-bleed squat rack fotoğrafı), kalın kırmızı bant yapısal ayraç (kendi cephe bantları gibi), 3px kalın çizgili "içeride ne var" satırları, çıplak 3'lü foto ızgarası (6px aralık).
- **Hareket:** yok. Sadece :hover/:focus.
- **İmza detay:** kalın kırmızı bant (8px) bölüm sınırlarında — işletmenin dış cephesindeki kırmızı bantların dijital karşılığı. Bölüm başlıklarında dev kırmızı `01`/`02` numaraları. Kırmızı slogan şeridinde işletmenin **kendi duvar yazısı** ("Too much but never enough").

`YONLER.md` yasaklıları: serif-italik başlık vurgusu yok, renkli kenarlıklı kart yok, 3'lü ikon kartı yok, her bölümde fade-up yok, gradyan yok, her yüzeyde aynı yuvarlaklık yok (zaten köşe yok).

## Hedef aramalar
- **Birincil: "mudanya spor salonu"** → title + tek H1
- "mudanya gym" · "güzelyalı spor salonu" · "mudanya fitness üyelik"
- "mudanya personal trainer" · "mudanya kadın erkek spor salonu"

## Bölümler
1. **Hero** — 2 kolon, dev H1 "Mudanya'da spor salonu", deneme dersi + ara CTA, squat rack fotoğrafı. KALIR.
2. **Kırmızı slogan şeridi** — "Too much — but never enough" (kendi duvar yazıları). KALIR.
3. **01 İçeride ne var** — serbest ağırlık · makineler · kardiyo · personal training. Açıklama var, **fiyat YOK**. KALIR.
4. **Dış cephe şeridi** — tam genişlik, BOOST GYM tabelası. KALIR.
5. **02 Salon** — 3 kare (üye + barbell, üye + makine, dumbbell rafı). KALIR.
6. **Split** — salon zemini fotoğrafı | "Excuses değil, çalışma" + konum + deneme dersi daveti. KALIR.
7. **Yorumlar** — **SİL** (6 yorum, birebir metin yok). Faruk getirince Chat 3.
8. **İletişim** — siyah bölüm: adres, telefon, WhatsApp, saatler, gömülü harita + "Haritada aç". KALIR.
9. **Mobil alt çubuk** — Ara · WhatsApp · Yol tarifi. KALIR.

## İçerik (uydurma yok)
- H1: "Mudanya'da spor salonu"
- Hero p: "Serbest ağırlık, plate-loaded makineler, kardiyo ve birebir çalışma. Sabahtan gece geç saate kadar açık." (kesin saat "her gün 09:00-22:00 (gün bazında değişebilir)" — Maps sadece Pazartesi verdi)
- İçeride ne var: fotoğraflardan doğrulanan ekipman (dumbbell/barbell/squat/bench görülüyor, makine görülüyor, koşu bandı görünüyor). "Kardiyo bölümü" — cihaz sayısı verilmedi.
- Slogan şeridi ve split başlığı: işletmenin kendi duvar yazıları.
- Fiyat, üye sayısı, "Bursa'nın en iyisi" gibi ifade YOK. Emoji/ünlem YOK.

## Görseller
| slot | dosya | ne |
|---|---|---|
| hero | assets/hero.jpg (post-08) | squat kafesi + bench + turuncu duvar |
| strip | assets/strip.jpg (post-09) | dış cephe tabelası |
| g1 | assets/g1.jpg (post-01) | barbell ile üye |
| g2 | assets/g2.jpg (post-04) | makinede üye |
| g3 | assets/g3.jpg (post-07) | dumbbell rafı |
| floor | assets/floor.jpg (post-06) | salon zemini + "excuses" duvar yazısı |
| og | hero'nun yatay hâli | 1200×630 |
Bazı kareler düşük çözünürlük — sahada gerçek çekimle değişecek.

## Yayın
- Alan adı önerisi: `boostgymmudanya.com`
- Platform: **Netlify** (site adı `boost-gym-mudanya`)
- Repo: `boost-gym-mudanya-demo` (private)
