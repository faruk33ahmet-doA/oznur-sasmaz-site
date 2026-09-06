# EDZ Barbershop — site planı

## Konumlandırma
Mudanya Mütareke'de randevulu erkek kuaförü. Site, "mudanya berber" arayanı ve
Instagram'dan gelen kişiyi; hizmetleri, adresi, saatleri ve randevu yolunu tek
ekranda karşılar.

## Tasarım yönü
**Endüstriyel / atölye — barbershop iş kartı.** Gerekçe: berberlik bir zanaat;
endüstriyel dil (koyu zemin, sert tipografi, teknik detay) bu işe oturur. Son
demolarda kullanılan yönlerden (editoryal, karanlık-neon stüdyo, organik kıyı,
art deco) ayrışır. Merikafit de karanlıktı ama o mor gece + neon glow sloganıydı;
bu **kömür + teal + pirinç**, glow yok, iş-kartı estetiği.

- **Tip:** Anton (sıkışık başlık) + IBM Plex Sans (gövde) + IBM Plex Mono (hizmet kartı / etiketler). Üçü de havuzda kullanılmadı.
- **Palet (60/30/10):** 60 kömür `#161615`/`#1f2321` · 30 teal `#23423f` (işletmenin kendi duvar rengi — Merikafit dersi: markanın gerçek rengini örnekle) · 10 pirinç/amber `#c98a3c` (vurgu).
- **Düzen:** asimetrik 2 kolon hero (metin | tam-bleed koltuk fotoğrafı), kesikli çizgili "hizmet fişi", 3'lü sıkı foto ızgarası (2px çizgi aralık).
- **Hareket:** yok (endüstriyel = sakin). Sadece :hover/:focus geçişleri.
- **İmza detay:** hizmet listesi bir **atölye iş fişi** gibi — `01`, `02` monospace numaralar, kesikli çizgi ayraçlar, "// randevuda netleşir" yorum satırı.

`YONLER.md` yasaklıları: başlıkta serif-italik vurgu yok (em sadece renk vurgusu, italik değil), renkli kenarlıklı kart yok, 3'lü ikon kartı yok, her bölümde fade-up yok, gradyan yok.

## Hedef aramalar
- **Birincil: "mudanya berber"** → title + tek H1
- "mudanya erkek kuaförü" · "mudanya fade saç kesimi" · "mütareke berber"
- "mudanya sakal tıraşı ustura" · "mudanya randevulu berber" · "mudanya çocuk saç kesimi"

## Bölümler
1. **Hero** — 2 kolon: sol metin (H1 "Mudanya'da berber ve erkek kuaförü", randevu CTA), sağ koltuk fotoğrafı tam-bleed. KALIR.
2. **Hizmetler (iş fişi)** — saç kesimi · sakal · saç+sakal · çocuk · şekillendirme. Açıklama var, **fiyat/süre YOK** (doğrulanmadı). "randevuda netleşir". KALIR.
3. **Foto ızgarası** — 3 kare: fade kesim, sakal (ustura), uzun saç. KALIR.
4. **Semih Ediz** — split: ekip fotoğrafı | kısa metin (kurucu, Creative Cutting eğitimi — sahada doğrulanınca, ürün satışı). KALIR.
5. **Yorumlar** — **SİL** (gerçek yorum yok). Faruk getirince Chat 3 ekler.
6. **Randevu & iletişim** — teal bölüm: adres, telefon, WhatsApp, saatler, gömülü harita + "Haritada aç" yedeği. KALIR.
7. **Mobil alt çubuk** — Ara · WhatsApp · Yol tarifi. KALIR.

## İçerik (uydurma yok)
- H1: "Mudanya'da berber ve erkek kuaförü"
- Hero p: "Fade ve anatomik saç kesimi, sakal şekillendirme ve çocuk kesimi. Randevuyla çalışıyoruz — sıra beklemiyorsunuz."
- Hizmet açıklamaları: teknik ama sade (fade/makas işi, ustura ile sakal, sakin çocuk ortamı). Süre/fiyat yok.
- "Creative Cutting eğitimi" → sahada doğrulanınca. Şimdilik "işi kişiye göre kesim ve düzenli bakım üzerine kurdu".
- Slogan "Private grooming experience" hero tag'inde (kendi tabelalarından).
- Emoji/ünlem yok.

## Görseller
| slot | dosya | ne |
|---|---|---|
| hero | assets/hero.jpg (post-02) | ışıklı deri berber koltuğu |
| g1 | assets/g1.jpg (post-01) | dokulu fade, yandan |
| g2 | assets/g2.jpg (post-04) | ustura ile sakal |
| g3 | assets/g3.jpg (post-05) | uzun saç sonucu, teal duvar |
| hakkinda | assets/hakkinda.jpg (post-09) | ekip / dükkân önü |
| og | hero'nun yatay hâli | 1200×630 |
Sahada gerçek fotoğrafla değiştirilecek; teslimde söylenecek.

## Yayın
- Alan adı önerisi: `edzbarbershop.com` / `.com.tr`
- Platform: **Netlify** (site adı `edz-barbershop-mudanya`)
- Repo: `edz-barbershop-mudanya-demo` (private)
