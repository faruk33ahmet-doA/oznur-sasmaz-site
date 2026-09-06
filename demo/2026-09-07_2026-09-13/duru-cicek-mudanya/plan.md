# Duru Çiçek Evi — site planı

## Konumlandırma
Ömerbey'de çiçekçi. Site "mudanya çiçekçi" / "mudanya gelin arabası süsleme"
arayanı; hizmetleri, işi (buket + gelin arabası fotoğrafları), konumu ve sipariş
yolunu tek ekranda karşılar.

## Tasarım yönü
**Lüks / koyu — çiçek mücevher gibi.** Gerekçe: işletmenin kendi çiçek
fotoğrafları zaten koyu/dramatik zeminde (kırmızı gül, siyah kutu) — near-black
zemin bu renkleri patlatır (Merikafit dersi: markanın gerçek görsel diline uy).
Son demolarda kullanılan yönlerden (art deco, endüstriyel, brütalist, Swiss,
sıcak minimal) ayrışır. **Merikafit de karanlıktı** ama o mor-gece + neon glow
sloganıydı; bu sıcak-siyah + botanik yeşil, glow YOK, dramatik didone.

- **Tip:** Rozha One (dramatik didone display — lüks/editoryal) + Source Sans 3 (gövde). İkisi de havuzda kullanılmadı.
- **Palet (60/30/10):** 60 sıcak siyah `#14120f`/`#1e1b17` · 30 kemik `#ece4d8` · 10 gül `#c98d95` (kendi gül/kutu tonlarından) + botanik yeşil `#3c5142` (gelin arabası bandı — ikincil, doğal).
- **Düzen:** asimetrik 2 kolon hero (Rozha One başlık siyahta | tam-bleed gül fotoğrafı), ince çizgili hizmet listesi, 4'lü sıkı foto ızgarası (8px aralık), tam genişlik yeşil "gelin arabası" bandı.
- **Hareket:** yok. Sadece :hover/:focus.
- **İmza detay:** çiçekler siyah zeminde tek ışık kaynağı gibi durur; yeşil "gelin arabası süslemesi" bandı — bölgede kimsenin site üzerinden vurgulamadığı hizmet.

`YONLER.md` yasaklıları: başlıkta serif-italik tek kelime vurgusu yok, renkli kenarlıklı kart yok, 3'lü ikon kartı yok, her bölümde fade-up yok, gradyan yok, her yüzeyde aynı yuvarlaklık yok (köşe neredeyse yok).

## Hedef aramalar
- **Birincil: "mudanya çiçekçi"** → title + tek H1
- "mudanya çiçek siparişi" · "ömerbey çiçekçi" · "mudanya gelin arabası süsleme"
- "mudanya buket sipariş" · "mudanya doğum günü çiçeği" · "mudanya çiçek teslimat"

## Bölümler
1. **Hero** — 2 kolon: metin (H1 "Mudanya'da çiçekçi", sipariş CTA, 4,9/16), kırmızı gül fotoğrafı. KALIR.
2. **Ne hazırlıyoruz** — buket & aranjman · özel gün · gelin arabası · açılış & tören. Açıklama var, **fiyat YOK**. KALIR.
3. **Galeri** — 4 kare (kutu aranjman, gül yakın, dükkân, gelin arabası). KALIR.
4. **Gelin arabası bandı** — yeşil, süsleme fotoğrafı + kısa metin + "önceden yaz". KALIR (fark yaratan hizmet).
5. **Yorumlar** — **SİL** (16 yorum var, birebir metin yok). Faruk getirince Chat 3.
6. **Sipariş & iletişim** — adres, telefon, WhatsApp, saatler, gömülü harita + "Haritada aç". KALIR.
7. **Mobil alt çubuk** — Ara · WhatsApp · Yol tarifi. KALIR.

## İçerik (uydurma yok)
- H1: "Mudanya'da çiçekçi"
- Hizmetler: buket/aranjman + gelin arabası (fotoğrafla doğrulandı); özel gün + açılış/tören (sektör-geneli, sahada teyit). **Teslimat sitede vaat EDİLMEDİ** (bilinmiyor) — iletişim metninde "aynı gün siparişler için erken arayın" nötr ifadesi.
- 4,9 / 16 Google (Maps, doğrulanabilir). Yorum metni yok.
- İşletmeci adı yok. Kuruluş yılı yok. Fiyat yok. Emoji/ünlem yok.

## Görseller
| slot | dosya | ne |
|---|---|---|
| hero / g5 / og | assets/hero,g5,og (post-12) | kırmızı gül buketi |
| g1 | assets/g1.jpg (post-11) | karışık kutu aranjman |
| g2 | assets/g2.jpg (post-02) | dükkân dış cephe |
| g3, g4 | assets/g3,g4 (post-03) | 2 gelin arabası |
Hepsi işletmenin kendi Instagram'ı. **Düşük çözünürlük** — sahada yüksek
çözünürlüklü çekim şart; teslimde söylenecek.

## Yayın
- Alan adı önerisi: `durucicekevi.com`
- Platform: **Netlify** (site adı `duru-cicek-mudanya`)
- Repo: `duru-cicek-mudanya-demo` (private)
