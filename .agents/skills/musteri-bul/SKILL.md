---
name: musteri-bul
description: Bursa genelinde (bölge bölge) web sitesi olmayan ya da sitesi kötü olan yerel işletmeleri araştırıp puanlar, en iyi 6'yı seçer ve Notion CRM (https://app.notion.com/p/7c80366bbfc745118364f5b45c838066)'ye yazar. Kullanıcı "müşteri bul", "aday çıkar", "yeni işletme ara", "bu haftanın listesi" dediğinde kullanılır.
---

# Müşteri Bul

Amaç: seçilen bölgede **~20 işletme araştır → puanla → en iyi 6'yı seç.** Çıktı
Ahmet'in telefonda açıp tek tek bakacağı bir tablo.

**Sabit "3 sitesiz + 3 kötü site" kuralı YOK.** En iyi fırsat hangisiyse o.
Genelde sitesi yok/ölü olanlar daha yüksek puan alır ama tek ölçüt değil.

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

## 0. Girdiyi netle + tekrar engelle

**Bölge.** Kullanıcı bölge verdiyse onu kullan. Vermediyse bir bölge / mantıklı
bölge grubu seç ve söyle: `Nilüfer (Görükle/Özlüce dahil)` · `Osmangazi` ·
`Yıldırım` · `Mudanya` · `Gemlik` · `İnegöl` · `Gürsu` · `Kestel`. Tüm Bursa'yı
tek seferde tarama — bölge bölge git. Notion `Hafta` alanına son kullanılan
bölgeleri bak, sırayla ilerle.

**Tekrar engelle.** Önce Notion'u oku (aşağıdaki SQL veya `notion-fetch`).
Daha önce **Araştırıldı / Demo Hazırlanıyor / Demo Hazır / herhangi bir temas /
Kazanıldı** olan işletmeyi yeni aday olarak getirme. `Kaybedildi` olanları
`Kayıp Nedeni`'ne göre süre geçmişse tekrar değerlendirebilirsin (İhtiyaç Yok /
Kendisi Yapacak → 6 ay; Zamanlama / Cevap Yok / Ulaşılamadı → 3 ay; Fiyat →
sonraki kampanya). Mevcut `İşletme` adlarını ve `Slug`'ları listeye çıkar,
eşleşeni ele.

Adet varsayılanı: ~20 araştır, **6 seç**. Kullanıcı sektör belirtmediyse
**sorma**, karışık getir ama şu önceliği kullan:

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

## 3. Puanla ve seç

Her işletmeye **Uygunluk Puanı** (0–100) ver:

| ölçüt | ağırlık |
|---|---|
| site yok / ölü / 404 (en yüksek), kötü site (orta), var-idare eder (düşük) | 30 |
| Instagram güncel + bol gerçek fotoğraf (demo malzemesi) | 20 |
| Google yorumu sayısı (20+ = işi yürüyor, bütçe var) + puan | 15 |
| ulaşılabilir telefon / WhatsApp | 10 |
| internete gerçek ihtiyaç (randevu/görsel işi = yüksek) | 15 |
| profesyonel görünüm + gerçek/ödeyebilir işletme | 10 |

En yüksek 6'yı seç. Ek kurallar:
- **Altısı da farklı sektör** (aynı sektörden ikinci işletme alma — aynı tasarım
  yönüne kayar).
- Birbirine yakın adresleri aynı güne denk getir.
- Zincir/franchise, kamu, büyük hastane = listeye alma.

Her adaya `slug` ver: küçük harf, Türkçe karakter sadeleşmiş, tireli. Ör. `kahve-duragi-gorukle`.

## 4. Yaz ve sun

Seçilen 6 işletmeyi Notion'a **yeni sayfa** olarak ekle (`notion-create-pages`,
data source `2868f57d-f231-4f8b-90ea-81f598f2f438`). Alanlar:

| alan | değer |
|---|---|
| İşletme | ad (title) |
| Aşama | `Araştırıldı` |
| Bölge | ilçe (`Görükle`/`Özlüce`/`Nilüfer`/`diğer` — Bursa ilçesiyse `diğer` + Hafta'ya yaz) |
| Sektör | uygun seçenek |
| Website Durumu | `Yok` / `Ölü / 404` / `Kötü` |
| Uygunluk Puanı | 0–100 |
| Öncelik | puana göre `Sıcak` (75+) / `Ilık` (50–74) / `Soğuk` (<50) |
| Telefon · WhatsApp · Instagram · Maps · Mevcut Website | bulunanlar |
| Google Puanı · Google Yorum Sayısı | varsa |
| Slug | slug |
| Hafta | `<YYYY-AA-GG>_<YYYY-AA-GG>` hafta klasörü + bölge adı |
| Demo Durumu | `Hazırlanacak` |
| Sonraki Aksiyon | `İşlem Yok` (Ahmet seçtikten sonra plan aşamasında değişir) |

20'lik havuzun elenen 14'ünü Notion'a **yazma** (kirlilik yapar) — sadece
sohbette "araştırıldı, elendi" diye kısa geç.

Sonra kullanıcıya sohbette tablo göster + her aday için 1 satır gerekçe:

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
