# İncir Cafe — site planı

## Konumlandırma
Mudanya sahilinde 12 bin takipçili, işi yürüyen bir kahvaltı-kafe. Site, hafta
sonu Mudanya'ya gelen aileyi/çifti **"burada kahvaltı edelim"e** ikna edecek:
deniz manzarası + ev yapımı + gün boyu kahvaltı. İkincil: ev yapımı ürün
(reçel/kurabiye) ve rezervasyon.

## Tasarım yönü önerisi
**"Eski Mudanya evi" — nostaljik kıyı** (avoid-ai-design: *organik / sıcak minimal*
kesişimi, kullanılmamış).

Son 3 işletme: moda editoryali (Paris), maksimalist (Görükle Çiçekçi, iptal),
stüdyonun kendi ışığı (Merikafit) — bu yön hiçbirine benzemiyor.

- **Tip çifti:** başlık **Gloock** (yumuşak yüksek kontrastlı serif, kitabi-sıcak) ·
  gövde **Hanken Grotesk**. İkisi de font havuzunda kullanılmadı.
- **Palet duruşu (60/30/10):** 60 krem `#f4efe2` zemin · 30 soluk deniz
  mavisi-yeşili `#a9cfcb` + zeytin `#6f7d52` · 10 marmelat altını `#c6862f`,
  incir moru `#6d3b4a` çok seyrek. Gradyan yok, parlayan gölge yok.
- **Düzen duruşu:** tek sütun değil — asimetrik. Deniz fotoğrafları tam kanama
  (bleed), metin blokları içeride dar kolonda. Menü/hizmet **kart değil**:
  el yazısı defter / fiyat listesi dokusu gibi tek sütun dökümü.
- **Tek hareket fikri:** sayfa açılırken hero fotoğrafı çok hafif yakınlaşmadan
  yerine oturur (bir kez, `prefers-reduced-motion` ile kapanır). Başka
  scroll animasyonu yok.
- **İmza detay:** Mudanya'nın **desenli karo çini** motifi (post-02'deki zemin)
  — SVG ile tek renk, düşük opaklık; bölüm ayıracı ve footer üstü şerit olarak.
  İkinci imza: reçel kavanozu kapağındaki **kesik keten kenar** — bölüm
  başlıklarının altında düzensiz kenarlı ince şerit.

## Bölümler (sırayla)
1. **Hero** — deniz camı önünde serpme kahvaltı (post-03). Üstte marquee
   hissi veren "İncir Cafe" (kendi tabela fotoğrafı post-09 küçük değil; başlık
   tipografik, tabela fotoğrafı mekân bölümünde). Alt: "Mudanya sahilinde,
   1 numara. Gün boyu kahvaltı, 09:00–00:30." + [Ara] [Yol tarifi] [WhatsApp]
2. **Gün boyu kahvaltı** — 2–3 cümle anlatı + serpme kahvaltı ve waffle
   fotoğrafı. Fiyat **sahada doğrulanınca** eklenir, yoksa yok.
3. **Ev yapımı** — marmelat kavanozları (post-05) + fırın rafı (post-01).
   "Reçel, marmelat, kurabiye — hepsi burada, kavanozda." Kargo bilgisi
   sahadan gelirse eklenir.
4. **Mekân** — bina/marquee (post-09) + iç mekân karo çini (post-02).
   "2007'den beri" (doğrulanırsa) · deniz manzarası · balkon.
5. **Yorumlar** — SADECE Faruk gerçek Google yorumu getirirse. Gelmezse bölüm YOK.
6. **Buluşalım / iletişim** — adres açık yazı + gömülü harita + yol tarifi +
   tel + WhatsApp + Instagram + çalışma saatleri. Rezervasyon notu (sahadan).
7. **Mobil sabit alt çubuk:** Ara · WhatsApp · Yol tarifi

Küçük hediye/peluş köşesi: mekân bölümünde tek cümle, ayrı bölüm değil.

## Zorunlu parçalar (arac/sablon/README.md)
tel: linki · WhatsApp linki · Maps yol tarifi + gömülü harita · mobil sabit alt
çubuk · açık adres · title/description/canonical/OG/theme-color · schema.org
`Restaurant`/`CafeOrCoffeeShop` JSON-LD · `noindex` (demo) · her img'de
width/height + alt · `figure{margin:0}` · `img{height:auto}` · hover/focus-visible/
active · prefers-reduced-motion · tek dosya.

## Görseller (site/assets/)
| slot | kaynak | dosya adı |
|---|---|---|
| hero | ig/post-03 | hero.jpg |
| kahvaltı | ig/post-03 kırpım veya post-06/12 | g1.jpg |
| ev yapımı — kavanoz | ig/post-05 | g2.jpg |
| ev yapımı — fırın rafı | ig/post-01 | g3.jpg |
| mekân — bina/marquee | ig/post-09 | g4.jpg |
| mekân — iç / karo çini | ig/post-02 | hakkinda.jpg |
| paylaşım görseli | post-09 yatay kırpım | og.jpg |

Hepsi `sips -Z 1600 --setProperty formatOptions 72` ile küçültülecek, <600KB.
Konu doğrulaması: her fotoğrafa bakıldı (yukarıdaki eşleme doğru).

## Metin kuralları
Türkçe, sıcak ama ucuz değil. Emoji/ünlem yok. "keşfedin/deneyimleyin" yok.
Somut: "gün boyu kahvaltı", "kavanozda ev yapımı marmelat", "sahil yürüyüş
yolunun üstünde". Uydurma fiyat/yıl/yorum YOK.

## Yayın
- alan adı önerisi: `incircafemudanya.com` (müsaitlik sonra)
- vercel proje adı: `incir-cafe-mudanya`
- repo adı: `incir-cafe-mudanya-demo` (private)
