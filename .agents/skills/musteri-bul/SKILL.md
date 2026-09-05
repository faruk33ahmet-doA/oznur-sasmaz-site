---
name: musteri-bul
description: Bursa Görükle/Özlüce/Nilüfer çevresinde web sitesi olmayan ya da sitesi kötü olan yerel işletmeleri bulup aday listesi çıkarır ve Notion CRM (https://app.notion.com/p/7c80366bbfc745118364f5b45c838066)'ye yazar. Kullanıcı "müşteri bul", "aday çıkar", "yeni işletme ara", "bu haftanın listesi" dediğinde kullanılır.
---

# Müşteri Bul

Amaç: sahada ziyaret edilebilecek **6 aday** çıkarmak — 3'ü sitesi olmayan, 3'ü sitesi
kötü olan. Çıktı Faruk'un telefonda açıp tek tek bakacağı bir tablo.

**Hafta klasörü.** İlk iş: haftanın pazartesi–pazar aralığını hesapla
(`date -v+mon +%F` ve `date -v+mon -v+6d +%F`) ve klasörü aç:

```
demo/<YYYY-AA-GG>_<YYYY-AA-GG>/        ← hafta
  <isletme-slug>/                      ← her işletme kendi klasöründe
    arastirma.md · plan.md · site/
```

**Konseptler farklı olsun.** 6 adayın altısı da farklı sektörden olacak — hepsi kafe
ya da hepsi kuaför olmayacak. Sebep: her işletme farklı bir tasarım yönü hak ediyor
(`arac/YONLER.md`), aynı sektörden iki site aynı yöne kayar.

## 0. Girdiyi netle

Varsayılanlar: bölge `Bursa Görükle / Özlüce / Nilüfer`, adet `6` (3 sitesiz + 3 kötü site).
Kullanıcı sektör belirtmediyse **sorma**, karışık getir ama şu önceliği kullan:

Yüksek dönüşüm (görsel işi + randevu işi, site eksikliği acıtır):
kafe/kahveci · restoran/esnaf lokantası · berber/kuaför · güzellik & cilt bakımı ·
diş kliniği/poliklinik · veteriner · oto servis/kaporta/lastik · spor salonu/pilates ·
pastane/fırın · çiçekçi · fotoğrafçı · emlak · özel ders/kurs · petshop · kuyumcu

Düşük öncelik (atla): zincir markalar, bayiler, franchise, zaten iyi sitesi olanlar,
kamu kurumları, büyük hastaneler.

Görükle özelinde: üniversite (BTÜ/Uludağ) çevresi olduğu için öğrenciye satan işletmeler
(kafe, yurt/apart, kırtasiye, kuaför, yemek) yoğun ve rekabet yüksek — site eksiği
burada en çok acıtır. Özlüce/Nilüfer tarafı daha aile/orta-üst segment: klinik, güzellik,
oto servis, restoran ağırlıklı.

## 1. Tara

`mcp__claude_ai_Firecrawl__firecrawl_search` ve `WebSearch` ile **paralel** birden çok
sorgu at. Sorgu kalıpları (sektörü değiştirerek 8–12 sorgu):

```
görükle kafe                      görükle <sektör> instagram
özlüce <sektör>                   nilüfer <sektör> google maps
görükle <sektör> telefon          bursa görükle <sektör> yorumları
```

Firecrawl'a `limit: 10` ver. Maps liste sayfaları, Instagram profilleri, yerel rehber
siteleri (bursa rehber, sayfa.com.tr benzeri) ve varsa işletmenin kendi sitesi hedef.

Aday havuzunu ~20 işletmeye çıkar, sonra ele.

## 2. Her aday için doğrula

Bunları topla — **uydurma**, bulamadıysan `?` yaz:

- İsim, sektör, semt/ilçe
- Telefon (varsa)
- Google Maps linki — `https://www.google.com/maps/search/?api=1&query=<işletme+adı+görükle+bursa>`
  biçimi yeterli, tıklanınca açılır
- Instagram / Facebook linki
- **Mevcut site:** var / yok. Varsa URL.

Site VARSA `WebFetch` ile aç ve şuna bak — biri bile tutuyorsa "kötü site" sayılır:
- mobilde bozuk / `viewport` meta yok
- son güncelleme çok eski, telif yılı 2019 ve öncesi
- Wix/Blogspot ücretsiz alt alan adı, reklam bandı
- HTTPS yok, sertifika hatası
- açılmıyor, "hesap askıya alındı", park edilmiş alan adı
- tek sayfa iletişim bilgisi bile yok, fotoğraf yok
- Flash/tablo düzeni, 2010'lar teması

### ⚠️ "Site açılmıyor" kararını BURADAN veremezsin

Bu makineden yapılan istekler (curl, WebFetch, hatta headless Chrome) barındırma
firmalarının bot/coğrafya engeline takılıyor. **503 veya 403 görmen sitenin ölü olduğu
anlamına gelmez.**

Gerçek vaka: `goruklecicekci.com` üç ayrı yöntemle 503 verdi, "mağaza kapalı" diye
koca bir demo kuruldu — site Faruk'un telefonunda sorunsuz açıldı. Demo çöpe gitti.

**Kural:** Bir siteyi "ölü/bozuk" diye pitch'e koymadan önce **Faruk telefonundan açacak.**
Listeye `⚠️ 503 aldım — TELEFONDAN AÇ, doğrula` diye yaz, kesin dille yazma.

İstisna: `*.business.site` adresleri. Google bu ürünü **Mart 2024'te tamamen kapattı**;
404'ü Google'ın kendi sunucusundan geliyor, IP engeli değil. Bunlar gerçekten ölü.

Yardımcı araç — sitenin *kalitesini* ölçer (açılıyorsa):
```bash
node arac/sitekontrol.mjs <url> [--shots=<klasör>]
```
viewport meta, telif yılı, platform (WordPress/Wix/business.site), görsel sayısı,
metin uzunluğu ve HTTP durumunu raporlar. Ama erişilebilirlik kararını yine Faruk verir.

## 3. Ele ve sırala

6'ya indir: 3 `site yok` + 3 `site kötü`. Seçerken:

- Instagram'ında bol fotoğraf olan işletmeyi öne al — demo hazırlamak kolay ve etkileyici olur.
- Google yorumu 20+ olan işletme öne — işi yürüyor, bütçesi var.
- Birbirine yakın adresleri aynı güne denk getir — Faruk yürüyerek gidecek.
- **Aynı sektörden ikinci bir işletme alma.** Altısı da farklı sektör.

Her adaya `slug` ver: küçük harf, Türkçe karakter sadeleşmiş, tireli. Ör. `kahve-duragi-gorukle`.

## 4. Yaz ve sun

Notion CRM içindeki `<!-- TABLO BAŞLANGIÇ -->` / `<!-- TABLO SON -->` arasına
satırları ekle (Edit ile, mevcut satırları bozmadan). Durum `aday`, tarih bugün (YYYY-AA-GG).

Sonra kullanıcıya sohbette **aynı tabloyu** göster + her aday için 1 satır gerekçe:

```
### Sitesi yok
1. **Kahve Durağı** · kafe · Görükle Sanayi Cd.
   Instagram'da 400+ fotoğraf, 180 Google yorumu, hiç sitesi yok. Demo için görsel bol.
   Maps: <link> · IG: <link> · Tel: <numara>
```

Bitirince tek soru sor: **"Hangilerine gideceksin? Onayladığın slug'ları söyle,
`/site-plani <slug>` ile araştırmaya başlayayım."**

## Kurallar

- Telefon/adres uydurma. Bulamadın → `?` ve nota "telefonu sahada al".
- Aynı işletmeyi iki kez ekleme — önce `Notion CRM`'yi oku, mevcut slug'ları çıkar.
- Kullanıcı adına kimseyle iletişime geçme. Bu skill sadece araştırır ve yazar.
- Zincir/franchise tespit edersen atla, listeye alma.
