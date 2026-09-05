---
name: site-plani
description: Onaylanan bir işletmeyi derinlemesine araştırır, fotoğraflarını indirir ve o işletmeye özel site planı (bölümler, Türkçe metin taslağı, palet, görsel listesi) çıkarır. Kullanıcı "<slug> için plan çıkar", "şu işletmeyi araştır", "site planı yap" dediğinde kullanılır.
---

# Site Planı

Girdi: Notion CRM'deki bir slug. Çıktı: `arastirma.md`, `plan.md` ve indirilmiş görseller.
Bu skill site YAZMAZ — sadece siteyi yazacak olan için malzeme hazırlar.

## 0. Hazırlık

```
demo/<hafta>/<slug>/
  arastirma.md
  plan.md
  site/assets/
```
klasörlerini oluştur. `Notion CRM`'de durumu `arastiriliyor` yap.

## 1. Derin araştırma

Tek bir `general-purpose` alt-ajanı başlat (arka planda değil, sonucunu bekle) ve şunları
istet — **kaynak URL'siz hiçbir bilgi kabul etme**:

- Google Maps kaydı: tam adres, telefon, çalışma saatleri (7 gün), puan, yorum sayısı
- En iyi 5–8 Google yorumunun **birebir metni** + yazan kişinin adı
- Instagram: kullanıcı adı, biyografi, takipçi, son gönderilerin konusu, öne çıkan görseller
- Hizmet/menü kalemleri ve varsa fiyatlar
- İşletmenin hikâyesi: kuruluş yılı, sahibi/ustası, ne ile biliniyor
- Mevcut sitesi varsa: tam kritik (mobil, hız, tasarım, içerik — madde madde)
- Aynı semtte 2–3 rakip ve onların siteleri (varsa) — biz neyi daha iyi yapacağız

## 2. Görselleri indir

Site "bol fotoğraf" üzerine kurulacak, görsel en kritik malzeme.

### ÖNCE BUNU ÇALIŞTIR — marka araştırması

```bash
node arac/marka.mjs demo/<hafta>/<slug> --ig=<kullanıcı> --maps="<işletme adı + semt>"
```
Tek komut. Gerçek Chrome'da çalışır (curl/WebFetch bunların hiçbirini alamıyor):

| kaynak | gelenler |
|---|---|
| Instagram | gönderi görselleri **1280px**, açıklamalar, beğeniler, profil fotoğrafı, bio, **öne çıkan hikâye başlıkları** |
| Google Haritalar | adres, **telefon**, çalışma saati, plus code, kapak fotoğrafı |
| hesaplanan | **renk paleti** (kendi görsellerinden örneklenir) + **dil/ton** (sık kelimeler, örnek cümleler) |

Çıktı: `marka.md` (okunacak brif) · `marka.json` (ham) · `ig/*.jpg`

**`marka.md`'yi oku, sonra üç şey yap:**
1. **Paleti `marka.md`'deki tablodan kur.** Uydurma. Merikafit'te logo ve duvardaki
   neon mordu; ben kobalt seçmiştim, site çöpe gitti.
2. **Kontak sayfası yapıp görsellere bak.** Üzerinde yazı bindirmesi olanları ele.
3. **Öne çıkan hikâye başlıklarını hizmet listesi gibi oku.** Merikafit'te "CADILLAC"
   ve "DİYETİSYEN" böyle çıktı — ikisi de klasik aramada kaçmıştı. Açıklamalarda
   slogan ve müşteri yorumu da bulunur.

Kırparken kutuyu **her zaman görsel sınırlarına kıstır** — PIL taşan kırpmayı
siyahla doldurur, fark etmezsen siteye siyah bantlı fotoğraf koyarsın.

**Alınamayanlar** (`marka.md` bunları listeler): Instagram hikâye *içeriği* giriş
istiyor; Google Haritalar yorumları "Sınırlı görünüm" nedeniyle kapalı. İkisini de
Faruk telefonundan ekran görüntüsüyle getirir — listeye yaz.

Yedek kaynak sırası: (1) Google Maps işletme fotoğrafları, (2) mevcut sitesi,
(3) Facebook sayfası.

`curl -L -o` ile indir → `demo/<hafta>/<slug>/site/assets/`. Hedef **8–12 kare**,
sonra en iyi 6–8'i kullanılacak.

Adlandırma: `hero.jpg` (en güçlü tek kare), `g1.jpg`…`g6.jpg` (galeri),
`hakkinda.jpg` (usta/ekip/mekân içi), `og.jpg` (paylaşım görseli, hero'nun yatay hâli).

İndirdikten sonra:
```bash
# 1600px'e küçült + jpeg kalite 72 (macOS yerleşik)
sips -Z 1600 --setProperty format jpeg --setProperty formatOptions 72 <dosya> --out <dosya>
```
Her görselin **kaynak URL'sini** `arastirma.md`'de "Görsel kaynakları" tablosuna yaz —
telif ayıklamasını Faruk yapacak.

İndirme başarısız olursa (Instagram engelliyor vb.) zorlama; `arastirma.md`'ye
"şu görselleri Faruk elle indirsin" listesi bırak ve devam et.

Hiç görsel bulunamazsa: `frontend-design-pro` skill'inden Unsplash/Pexels doğrudan
link al, ama `plan.md`'de **"stok görsel — sahada gerçek fotoğrafla değiştirilecek"**
diye açıkça işaretle.

## 3. `arastirma.md` yaz

```markdown
# <İşletme adı> — araştırma
slug: <slug> · tarih: <YYYY-AA-GG>

## Künye
sektör / adres / telefon / Maps / Instagram / çalışma saatleri / puan + yorum sayısı

## Ne yapıyor
2–3 paragraf. Kaynaklı.

## Google yorumları (birebir)
> "..." — Ad, tarih

## Mevcut site kritiği
(yoksa: "site yok — <alan adı> müsait mi kontrol edildi")
- madde madde sorunlar

## Rakipler
| işletme | site | bizim farkımız |

## Görsel kaynakları
| dosya | kaynak URL | ne |

## Bilinmeyenler — sahada sorulacak
- [ ] ...

## Satış açısı
Faruk kapıdan girince söyleyeceği 2 cümle.
```

## 4. `plan.md` yaz

```markdown
# <İşletme adı> — site planı

## Konumlandırma
Tek cümle: bu site kimi, neye ikna edecek?

## Tasarım yönü önerisi
`arac/YONLER.md`'yi oku (son 3'te kullanılan yön tekrar edilemez), sonra
avoid-ai-design'ın `aesthetic-directions.md` listesinden **tek bir yön** öner ve
gerekçelendir. Yanına: tip çifti, palet duruşu (hâkim/ikincil/vurgu — 60/30/10),
düzen duruşu, tek hareket fikri, bir imza detay.
Nihai kararı `site-yap` verir ama buradan çıkan öneri başlangıç noktasıdır.

## Bölümler
Sırayla, hangileri kalacak hangisi silinecek. Silinecekse gerekçesi.

## İçerik
Bölüm bölüm, her bölümün Türkçe metni. `arac/sablon/README.md`'deki
**zorunlu parçalar** listesinin tamamı karşılanmalı (tel / WhatsApp / harita /
mobil alt çubuk / schema / OG). Doldurulamayan bölüm: "SİL — gerekçe".

## Görseller
| slot | dosya | ne gösteriyor |

## Yayın
alan adı önerisi · vercel proje adı · repo adı
```

## Metin kuralları

- Türkçe, sade, esnaf ağzına yakın ama ucuz değil. "Sizin için en iyisini sunuyoruz"
  gibi boş cümle yok.
- Somut ol: "2011'den beri Görükle'de", "günlük taze çekim", "randevusuz gelebilirsiniz".
- **Uydurma yok.** Ödül, sertifika, yıl, müşteri sayısı — kaynağı yoksa yazma.
- Yorumlar birebir gerçek Google yorumu. Gerçek yorum yoksa yorumlar bölümünü sil.
- Fiyat: kaynaktan doğrulanmadıysa fiyat satırını sil, "fiyat bilgisi için arayın" deme,
  sadece sil.
- Metinlerde emoji yok, ünlem yok, "keşfedin/deneyimleyin" gibi kalıp yok.
- Tasarım kararlarında `avoid-ai-design` ve `frontend-design-pro` skill'leri ZORUNLU.
- `arac/YONLER.md`'deki yasaklı hamleler listesi bağlayıcıdır.

## 5. Bitir

`Notion CRM`'de durumu `plan-hazir` yap. Kullanıcıya sun:
- 5–8 satırlık özet (konumlandırma, palet, bölümler, kaç görsel indirildi)
- İndirilen görselleri `SendUserFile` ile gönder ki telefonundan bakabilsin
- `arastirma.md`'deki "sahada sorulacak" listesi
- Soru: **"Onaylıyor musun? `/site-yap <slug>` ile siteyi kurayım."**
