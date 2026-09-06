# Livane Pastanesi — site planı

## Konumlandırma
Mudanya'da "sabah taze ekmek/börek + gün içi pasta-kahve molası" noktası. Site,
Instagram'daki 22K'lık kitleyi ve Google'da "mudanya pastane" arayanı; menüyü,
konumu, saatleri ve pasta siparişini tek ekranda görecek şekilde karşılar.

## Tasarım yönü önerisi
**Art Deco — klasik pastane / şekerci ambalajı.** Gerekçe: markanın kendi kimliği
zaten altın el yazısı bir wordmark; art deco, pastane/şekerci tabela ve kutu
geleneğinin doğal dili (simetri, altın çizgi işi, yelpaze/güneş motifi). Son 3–4
demoda kullanılan yönlerden (editoryal, karanlık stüdyo, nostaljik kıyı/organik)
net ayrışıyor — özellikle İncir Cafe da bir Mudanya yeme-içme işi olduğu için
onun "organik kıyı" dilini TEKRARLAMAMAK şart.

- **Tip çifti:** DM Serif Display (başlık, yüksek kontrastlı didone) + Commissioner (gövde). İkisi de font havuzunda kullanılmadı.
- **Palet (60/30/10):** 60 sıcak krem `#f2e6d2` zemin · 30 espresso kahve `#2b1a12` (metin + çizgi işi) · 10 yanık altın/karamel `#b07d3a` (vurgu, kendi wordmark'larının altını).
- **Düzen duruşu:** simetrik, ortadan hizalı bir "menü kartı" omurgası; geniş kenar boşlukları; bölümler ince altın deco cetvelle ayrılıyor.
- **Tek hareket:** yüklenişte üstteki ince deco çerçeve bir kez kendini çiziyor (`prefers-reduced-motion` korumalı). Başka animasyon yok.
- **İmza detay:** yelpaze/güneş ışını deco cetvel (SVG, ince altın çizgiler yarım daireden yayılıyor) — pastane kutusu mührü gibi bölüm ayıracı.

`YONLER.md` yasaklıları: başlıkta serif-italik tek kelime vurgusu yok, renkli
kenarlıklı kart yok, 3'lü ikon kartı yok, fade-up her bölümde yok, gradyan yok,
her yüzeyde aynı yuvarlaklık yok. Deco çizgi işi düz çizgi, yumuşak gölge değil.

## Hedef aramalar
- **Birincil: "mudanya pastane"** → title + tek H1
- "mudanya fırın taze ekmek" · "ömerbey pastane" · "mudanya doğum günü pastası sipariş"
- "mudanya börek poğaça" · "mudanya deniz caddesi pastane" · "mudanya profiterol ekler"

## Bölümler
1. **Hero** — ortalanmış wordmark muamelesi, H1 "Mudanya'da pastane" temalı, dış cephe/tatlı görseli, saat + "Yol tarifi" + "Ara". KALIR.
2. **Her gün fırından** — ekmek · simit · poğaça · börek. Anlatı + ince liste (kart DEĞİL). Sabah taze çıkış vurgusu (saat sahada doğrulanınca). KALIR.
3. **Pasta & tatlı** — profiterol · ekler · çilekli kruvasan · çikolatalı rulo · pasta. Deco çerçeveli galeri (3–5 görsel). KALIR.
4. **Mekan & konum** — iç mekân karesi, "Ömerbey, deniz caddesi üzerinde", çay/kahve eşliğinde oturma. KALIR.
5. **Yorumlar** — **SİL.** Gerçek Google yorumu elde edilemedi (Sınırlı görünüm). Faruk 4–6 ekran görüntüsü getirince Chat 3 ekler. Şimdilik sadece hero'da "4,9 ★ · 28 değerlendirme" satırı (sayı Maps'ten, doğrulanabilir).
6. **Sipariş & iletişim** — pasta/doğum günü siparişi (kaç gün önceden — sahada), WhatsApp `0544 614 80 08`, tam adres, gömülü Google harita + "Haritada aç" yedek linki. KALIR.
7. **Mobil alt eylem çubuğu** — Ara · WhatsApp · Yol tarifi. KALIR (esnaf sitesinde dönüşüm burada).

## İçerik (Türkçe taslak — uydurma yok)
- **Hero H1:** "Mudanya'da pastane ve fırın" · alt: "Ömerbey, deniz caddesi. Sabah taze ekmek ve börek, gün boyu pasta ve kahve."
- **Her gün fırından:** "Fırından günlük çıkan ekmek, simit, poğaça ve börek. Sabahın erken saatinden itibaren tezgâhta." (kesin saat sahada eklenecek)
- **Pasta & tatlı:** "Profiterol, ekler, çilekli kruvasan, çikolatalı rulo ve pasta çeşitleri. Özel gün pastaları sipariş üzerine hazırlanır." (önceden sipariş süresi sahada)
- **Mekan:** "Ömerbey Mahallesi, deniz caddesi üzerindeyiz. Çay ya da kahvenizi yanında bir dilim tatlıyla içmek için oturma alanımız var."
- **İletişim:** adres açık yazılı, telefon `0544 614 80 08`, WhatsApp aynı numara, çalışma saati (7 gün — sahada), harita.
- Sahibi/polislik hikâyesi: **sahada doğrulanmadan siteye girmez.** Doğrulanırsa "Mekan" bölümüne 1 cümle.
- Emoji yok, ünlem yok, fiyat yok (doğrulanmadı).

## Görseller
| slot | dosya | ne gösteriyor | not |
|---|---|---|---|
| hero | ig/post-12 (kırpılmış) veya post-05 | dış cephe tabelası / tekli tatlı + çay | post-12 alt yazısı kırpılacak |
| g1 | ig/post-01 | vitrin / teşhir dolabı | temiz |
| g2 | ig/post-07 | çikolatalı profiterol tepsisi | temiz, iştah açıcı |
| g3 | ig/post-05 | tekli pasta + çay, mermer masa | temiz |
| hakkinda | ig/post-09 (üstten kırp) | iç mekân, altın tabela + bitki duvarı | küçük yazı kırpılacak |
| og | hero'nun yatay hâli | paylaşım görseli | 1200×630 |
Hepsi işletmenin kendi Instagram'ından. Sahada gerçek fotoğrafla değiştirilecek —
teslimde "fotoğraflarınızı kullandım, beğenmezseniz çıkarırım" denecek.

## Yayın
- Alan adı önerisi: `livanepastanesi.com`
- Platform: **Netlify** (varsayılan; site adı `livane-pastanesi-mudanya`)
- Repo: `livane-pastanesi-mudanya-demo` (private)
