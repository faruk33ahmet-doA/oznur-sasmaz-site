---
name: site-yap
description: Onaylanan plandan, o işletmeye özel seçilmiş bir tasarım yönüyle sıfırdan tek dosya HTML demo site tasarlar, AI-slop denetiminden geçirir, ekran görüntüsü alır ve onay sonrası ayrı GitHub reposu + Netlify ya da Vercel'e yayınlar. Kullanıcı "<slug> sitesini yap", "demoyu kur", "siteyi yayınla" dediğinde kullanılır.
---

# Site Yap

Girdi: `demo/<hafta>/<slug>/plan.md`. Çıktı: çalışan demo, sonra canlı Vercel linki.

## 0. ZORUNLU — önce tasarım skill'lerini yükle

Tek satır kod yazmadan önce, **her seferinde**:

1. `Skill(avoid-ai-design)` — tell kataloğu ve estetik yön listesi
2. `Skill(frontend-design-pro)` — tek yöne bağlanma ve görsel sistemi
3. `arac/YONLER.md` oku — hangi yönler kullanılmış, hangi hamleler yasak

Bu adım atlanamaz. Atlanınca ne olduğu `arac/YONLER.md`'nin yasaklılar listesinde yazıyor.

## 1. Bir yöne bağlan

`aesthetic-directions.md`'den **tek bir yön** seç. Seçerken:

- İşletmenin işi ve müşterisi neyi hak ediyor? (portfolyo işi → lookbook;
  teknik servis → endüstriyel; çocuk/eğlence → oyuncu; kuyum → art deco…)
- **`YONLER.md`'de son 3 işletmede kullanılan yönü seçme.** Tekrar = slop.
- Font çiftini de oradaki havuzdan, kullanılmamışlardan seç.

Yönü yazıya dök, sonra kod yaz: **tip çifti · palet duruşu (60/30/10, hâkim renk kim) ·
düzen duruşu · tek hareket fikri · bir imza detay.**

## 2. Sıfırdan tasarla

`arac/sablon/index.html`'i **kopyalama.** O bir mekanik referansı, görsel şablon değil.
`arac/sablon/README.md`'deki **zorunlu parçalar listesini** karşıla, gerisini yön belirlesin.

Her sitede farklı olmalı: düzen iskeleti, bölüm sıralaması, hizmetlerin sunum biçimi
(liste / içindekiler / tablo / anlatı / zaman çizelgesi — kart olmak zorunda değil),
tipografik ölçek, hareket fikri.

`YONLER.md`'deki **yasaklılar listesindeki hiçbir hamle kullanılamaz.**

## 2b. SEO temeli (demo `noindex` kalsa da kurulur)

`plan.md`'deki **"hedef aramalar"** listesine göre:

- **`<title>` ≤ 60 karakter**, hedef arama başta: "Mudanya deniz manzaralı
  kahvaltı — İncir Cafe" gibi (marka adı değil, aramanın kendisi başta).
- **`meta description` ≤ 155 karakter**, tıklamaya davet eden, semt + hizmet geçen.
- **Tek `<h1>`**, o da hedef aramayı doğal içersin. Sonra `<h2>`/`<h3>` hiyerarşisi.
- **`LocalBusiness` (veya alt tipi: `Restaurant`, `HairSalon`, `VeterinaryCare`…)
  JSON-LD**: `name`, tam `address`, `telephone`, `openingHoursSpecification`
  (7 gün), `geo` varsa, `image`, `sameAs` (Instagram). Uydurma alan yazma.
- `<meta property="og:*">` + `canonical` + `theme-color` + `lang="tr"`.
- Her `<img>` betimleyici `alt` (semt/konu geçsin, "resim1" değil).
- Semantik yapı: `<header> <main> <section> <footer>`, landmark'lar.
- **`<meta name="robots" content="noindex,nofollow">` KALIR** — teklif aşaması.
  Chat 3 satış sonrası kaldırır ve `seo-sistemi` skill'iyle tam SEO yapar.

## 3. Kontrol et

```bash
bash arac/kontrol.sh <slug>
```
Kalan `{{TOKEN}}`, eksik görsel, 600 KB üstü dosya, `tel:`/maps/OG/schema varlığı,
şablon metni sızıntısı, boş `alt`.

## 4. Ekran görüntüsü al ve KENDİN BAK

```bash
node arac/ss.mjs <slug> <scratchpad-klasörü>
```
Mobil (390×844, 2x) + masaüstü (1440×900) tam sayfa PNG, artı yatay taşma raporu.

Düz `chrome --headless --screenshot` kullanma — macOS'ta pencere minimum genişliğe
sıkışıp sahte kırpılma gösterir.

Sonra PNG'leri **`Read` ile aç ve bak.** Şunları ara:
- `<figure>` kenar boşluğu görseli içeri itmiş mi
- Fotoğrafın konusu doğru mu (bayan kuaförüne erkek berberi koymak bir kez oldu)
- Metin satır bölüyor mu, bölüm boş kalmış mı
- Şüpheli bölgeyi kırpıp büyüterek bak

## 5. Yeniden denetle

`ai-tells-catalog.md`'yi kendi çıktın üzerinde tekrar yürüt. Hiçbir **P0** kalmamalı.
Sonra üç testi uygula:

1. **Gerekçeli mi** — her hamle seçilen yöne mi hizmet ediyor?
2. **Tutarlı mı** — tip, palet, düzen, imza detay birbirini destekliyor mu?
3. **Tekrar değil mi** — son sitelere benziyor mu? Benziyorsa başarısız.

Katalogdan temiz geçmek yeterli değil; üç testi de geçmeli.

Sonra `YONLER.md`'ye satır ekle: tarih, işletme, sektör, yön, tip çifti, hâkim renk,
imza detay.

## 6. Sun ve dur

Ekran görüntülerini `SendUserFile` ile gönder. Şunları yaz: seçilen yön ve gerekçesi,
hangi görsellerin stok olduğu, hangi bölümün neden silindiği, `arastirma.md`'deki
"sahada sorulacak" listesi.

**Onay bekle.** Kullanıcı "tamam" demeden yayına geçme.

## 7. Yayın

**Barındırma: Netlify + Vercel ikisi de kullanılır.** Amaç ücretsiz kotayı
tek platformda tüketmemek. Varsayılan **Netlify**; Vercel'e sıra dönüşümlü
gelir ya da Netlify kotası dolduğunda geçilir. Hangisi olursa olsun: koruma
kapalı, `noindex` kalır, canlı URL curl ile doğrulanır.

Önce repo (her iki yolda da işine yarar):
```bash
cd "demo/<hafta>/<slug>/site"
git init -b main && git add -A
git commit -m "<İşletme adı> — demo site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
gh repo create <slug>-demo --private --source . --push
```

### A. Netlify (varsayılan — digest-deploy, `git` bağlamadan)
```bash
export NETLIFY_TOKEN=<flyteq-netlify-sites hafızasındaki token>
# site oluştur:
curl -s -X POST https://api.netlify.com/api/v1/sites -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/json" -d '{"name":"<slug>"}'
# klasörü deploy et (helper: /tmp/netlify_deploy.py — yoksa hafızadaki tarife göre yeniden yaz):
python3 /tmp/netlify_deploy.py <site_id> "demo/<hafta>/<slug>/site"
```
URL: `https://<slug>.netlify.app`. Zip-upload endpoint'ini KULLANMA (yanlış
content-type). Digest-deploy (path + sha1) doğru olan.

### B. Vercel (dönüşümlü / Netlify kotası dolunca) — Vercel MCP
- `create_git_project` — repo `faruk33ahmet-doA/<slug>-demo`, framework yok (statik)
- Yeni projeler **SSO korumalı açılıyor** — müşteri giriş duvarı görür.
  `update_project_deployment_protection` ile `ssoProtection:{enabled:false}` yap.
- `get_deployment` ile READY ve `target: production` doğrula

Her iki yolda da canlı URL'yi `curl` ile aç: 200 mü, içerik doğru mu, görseller
geliyor mu, harita çalışıyor mu (headless'ta boş görünür, canlıda kontrol et).

Notion: `Aşama = Demo Hazır`, `Demo Durumu = Hazır`, `Demo URL` (hangi platforma
gittiyse o), `Demo Tarihi`.

## 8. Teslim

```
✅ <İşletme adı>
   Demo:  https://<slug>.netlify.app  (veya .vercel.app)
   Repo:  https://github.com/faruk33ahmet-doA/<slug>-demo
   Tel: <numara>  ·  Maps: <link>  ·  IG: <link>

   Tasarım yönü: <yön> — <tek cümle gerekçe>
   Sahada sorulacaklar: …
   Kapıda söyleyeceğin 2 cümle: "<satış açısı>"
```

## Kurallar

- Onaysız repo açma, onaysız deploy etme.
- Müşteriye mail/mesaj gönderme — iletişimi Faruk yüz yüze yapıyor.
- Bu bir **demo teklifi**: sahte yorum, sahte ödül, sahte kayıt üretme.
  Doğrulanmamış çalışma saati/fiyat siteye girmez.
- Tek dosya kalsın. CSS/JS ayırma, framework ekleme, npm kurma.
- **Aynı anda birden fazla işletme üretme.** Biri bitip onay alınmadan sonrakine geçme.
