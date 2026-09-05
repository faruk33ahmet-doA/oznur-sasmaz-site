# Mekanik referansı — görsel şablon DEĞİL

> ⚠️ `index.html` bir **tasarım şablonu değildir.** Kopyalayıp doldurursan
> jenerik AI sitesi çıkar — bir kez öyle oldu, `arac/YONLER.md`'deki yasaklı
> listesi o denetimden çıktı.
>
> **Her site sıfırdan, o işletmeye seçilmiş bir yönle tasarlanır.**
> Buradan alınacak olan yalnızca **çalıştığı doğrulanmış mekaniklerdir.**

## Her yerel işletme sitesinde bulunması ZORUNLU olanlar

Tasarım ne olursa olsun bunlar olacak. Dönüşümün tamamı bunlarda.

- [ ] `tel:` linki — mobilde tek dokunuşla arama
- [ ] WhatsApp linki
- [ ] Google Maps yol tarifi linki + gömülü harita
- [ ] **Mobilde sabit alt eylem çubuğu** (Ara / WhatsApp / Yol tarifi) — esnaf sitesinde
      dönüşümün büyük kısmı burada; tasarıma uydur ama kaldırma
- [ ] Adres, açık yazılmış
- [ ] `<title>`, `meta description`, `canonical`, OG etiketleri, `theme-color`
- [ ] `schema.org` `application/ld+json` — doğru işletme tipi
- [ ] Teklif demosuysa: `<meta name="robots" content="noindex,nofollow">`
- [ ] Her `<img>`'de gerçek `width`/`height` + anlamlı `alt`
- [ ] `figure{margin:0}` — tarayıcı varsayılanı 1em 40px, tam kanama görselleri içeri iter
- [ ] **`img{height:auto}`** — `height="1375"` özniteliği sunum ipucu olarak CSS
      `height`e dönüşüp `aspect-ratio`'yu eziyor; görsel dikey ezilir. İki projede
      ısırdı, sıfırlamaya mutlaka ekle
- [ ] `:hover`, `:focus-visible`, `:active` — her etkileşimli öğede
- [ ] `prefers-reduced-motion` desteği
- [ ] Tek dosya, build yok, framework yok

## Doğrulanmış kod parçaları

**Telefon biçimleri** — üçü farklı, karıştırma:
```
tel:+905530484816        ·  görünen: 0553 048 48 16  ·  wa.me/905530484816   (+ YOK)
```

**Maps yol tarifi**
```
https://www.google.com/maps/dir/?api=1&destination=<URL-encoded işletme adı + adres>
```

**Maps gömme** — API anahtarı gerekmez. Şu adres 301 ile kalıcı `pb=` biçimine döner;
`curl -sI` ile `redirect_url`'i al ve **onu** kullan (tek atlama daha az):
```
https://maps.google.com/maps?q=<URL-encoded adres>&output=embed
```

**Favicon** — data URI, dosya yok:
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23<zemin>'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-size='20' fill='%23<vurgu>' text-anchor='middle'%3E<harf>%3C/text%3E%3C/svg%3E">
```

**Alt çubuk için sayfa sonu boşluğu** — çubuk son bölümü örtmesin:
```js
var bar=document.querySelector('.actions');
function fit(){var h=(bar&&getComputedStyle(bar).display!=='none')?bar.offsetHeight:0;
  document.documentElement.style.setProperty('--bar',h+'px');}
fit(); addEventListener('resize',fit);
```
```css
body{padding-bottom:var(--bar);}
```

`index.html` içinde bu mekaniklerin çalışan hâli duruyor — bakmak için aç, **kopyalamak
için değil.**

## Görseller

- Hedef oranlar: kapak 4:5 veya 3:4 · lookbook kareleri değişken · geniş bant ~21:9 ·
  OG 1200×630
- Her görsel 600 KB altı, `quality=76-80`, `progressive`
- **Konuyu doğrula**: indirilen fotoğrafın gerçekten ne gösterdiğine *bak*. Bayan
  kuaförüne erkek berberi, "salon içi" diye yıkama karesi koymak bir kez oldu.
- Stok kullanıldıysa `arastirma.md`'ye yaz ve teslimde Faruk'a söyle.

## İçerik politikası — tasarımdan bağımsız, değişmez

- Doğrulanmayan hiçbir şey siteye girmez: çalışma saati, fiyat, kuruluş yılı, ödül.
- Müşteri yorumu **birebir ve o işletmeye ait** olacak. Değilse bölüm silinir.
- Uydurma sayı yok. Tek gerçek sayı, dört uydurmadan iyidir.
