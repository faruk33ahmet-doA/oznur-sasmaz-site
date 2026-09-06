# Aslı Veteriner Muayenehanesi — site planı

## Konumlandırma
Güzelyalı'da veteriner muayenehanesi. Site "mudanya veteriner" arayanı ve acil
durumdaki hayvan sahibini; hizmetleri, geç saate kadar açık olduğunu, konumu ve
telefonu tek ekranda karşılar.

## Tasarım yönü
**Sıcak minimal — güven veren, yumuşak.** Gerekçe: veteriner = kaygılı hayvan
sahibini sakinleştirmesi gereken bir yer; yumuşak sıcak tonlar, okunaklı serif,
hafif yuvarlatma bu tonu verir. Son demolarda kullanılan yönlerden (art deco,
endüstriyel, brütalist, Swiss) net ayrışır. **İncir Cafe "organik/nostaljik
kıyı"ydı** — o kırsal-kıyı, çini şeritli; bu farklı: yumuşak minimal, pati
motifi, gül + soluk mavi-gri.

- **Tip:** Newsreader (sıcak edebi serif başlık) + Manrope (gövde). İkisi de havuzda kullanılmadı.
- **Palet (60/30/10):** 60 sıcak krem `#faf6f1`/`#f1e9e0` · 30 sıcak mürekkep `#39322e` · 10 gül `#c97d8c` (işletmenin **pembe "VETERINER" rozetinden** örneklendi) + soluk mavi-gri `#7d94a6` (saatler bölümü için sakin ikincil — medikal ipucu).
- **Düzen:** 2 kolon hero (metin | yuvarlatılmış fotoğraf), 2×3 hizmet ızgarası (tek çerçeveli tablo, yüzen kart DEĞİL), tam genişlik mavi "saatler" bandı, 2 kolon konum, 3'lü kare foto galeri.
- **Hareket:** yok. Sadece :hover/:focus.
- **İmza detay:** pati (paw) SVG logo — kendi pembe pati logolarının sadeleştirilmiş hâli; mavi "geç saate kadar açığız" bandında büyük serif saat aralığı.

`YONLER.md` yasaklıları: **başlıkta serif-italik tek kelime vurgusu YAPILMADI** (ilk denemede vardı, kaldırıldı — T3); renkli kenarlıklı kart yok; 3'lü ikon kartı yok; her bölümde fade-up yok; gradyan yok. Yuvarlatma sadece foto + tek ızgara + rozet/butonda — "her yüzeyde aynı yuvarlaklık" değil.

## Hedef aramalar
- **Birincil: "mudanya veteriner"** → title + tek H1
- "mudanya veteriner kliniği" · "güzelyalı veteriner" · "mudanya veteriner acil"
- "mudanya köpek aşısı" · "mudanya kedi veteriner" · "mudanya veteriner geç saat"

## Bölümler
1. **Hero** — 2 kolon: metin (H1 "Mudanya'da veteriner muayenehanesi", 21:00 rozeti, ara + WhatsApp), ekip fotoğrafı. KALIR.
2. **Neler yapıyoruz** — 2×3 hizmet ızgarası. Genel/evrensel hizmetler, **fiyat YOK, spesifik ameliyat iddiası YOK**. KALIR.
3. **Saatler bandı** — mavi, "geç saate kadar açığız" + "Pzt–Cmt 09:00–21:00". KALIR (ana satış noktası).
4. **Konum** — 2 kolon: dış cephe fotoğrafı | Güzelyalı adresi, "ilk gelişte aşı karnesi getirin", yol tarifi butonu. KALIR.
5. **Galeri** — 3 kare (ekip+köpek candid, köpek bakımı, akşam dış cephe). KALIR.
6. **Yorumlar** — **SİL** (marka.mjs puan/yorum alamadı). Faruk getirince Chat 3.
7. **İletişim** — krem bölüm: adres, telefon, WhatsApp, saatler, gömülü harita + "Haritada aç". KALIR.
8. **Mobil alt çubuk** — Ara · WhatsApp · Yol tarifi. KALIR.

## İçerik (uydurma yok)
- H1: "Mudanya'da veteriner muayenehanesi"
- Hizmetler: sadece evrensel muayenehane hizmetleri. Kısırlaştırma/operasyon **yazılmadı** (muayenehane ≠ poliklinik, kaynak yok).
- "Otoparkı var" — sitede geçiyor, **sahada doğrula ya da çıkar**.
- Puan/yorum sayısı YOK (alınamadı). Hekim adı YOK (bilinmiyor).
- Emoji/ünlem YOK.

## Görseller
| slot | dosya | ne |
|---|---|---|
| hero | assets/ekip.jpg (post-01) | 5 kişilik ekip + tabela |
| konum | assets/dis.jpg (post-06) | dış cephe |
| galeri | assets/g-ekip2, g-bakim, g-gece | candid + bakım + akşam cephe |
| og | ekip'in yatay hâli | 1200×630 |
Klinik iç mekân / cihaz yok — sahada çekilecek, teslimde söylenecek.

## Yayın
- Alan adı önerisi: `asliveterinermudanya.com`
- Platform: **Netlify** (site adı `asli-veteriner-mudanya`)
- Repo: `asli-veteriner-mudanya-demo` (private)
