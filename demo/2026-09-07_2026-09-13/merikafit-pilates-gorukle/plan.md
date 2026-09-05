# Merikafit Pilates Görükle — site planı

## Konumlandırma

**Görükle'de 5,0 puanlı ama görünmez olan stüdyoyu, "Görükle pilates" arayan kadının
karşısına çıkarmak ve rezervasyonu telefona/WhatsApp'a taşımak.**

Rakipler (Özlüce'de üç stüdyo) sitelerinde saat ve "Randevu Al" gösteriyor. Merikafit'in
elinde daha iyi bir puan var ama gösterecek yeri yok. Sitenin işi: **açık saatleri,
kimin için olduğunu ve nasıl rezervasyon yapılacağını üç saniyede söylemek.**

## Tasarım yönü — **Swiss / uluslararası tipografik**

`ajans/YONLER.md`: kullanılan yönler *moda editoryali* (Paris) ve *maksimalist*
(çiçekçi). İkisi de tekrar edilemez.

Neden Swiss: Pilatesin kendisi hizalama, ölçü ve kontrol üzerine kurulu bir disiplin.
Katalogdaki tarif — *"katı modüler ızgara, sola dayalı, matematiksel boşluk, yapı olarak
beyaz alan; ızgara tasarımın kendisidir"* — dersin içeriğini birebir anlatıyor.

Kolay olan seçim "organik/wellness" olurdu (adaçayı yeşili + yumuşak serif); her pilates
stüdyosu onu yapıyor, yani refleks. Swiss hem daha doğru hem daha ayrıksı.

| karar | değer |
|---|---|
| **Tip** | **Public Sans** tek aile, 300/400/600/800 — Swiss disiplini tek gro­tesk ister. Etiket ve sayılar için **IBM Plex Mono**. İkisi de havuzda kullanılmamış; Bodoni/Archivo/Bricolage/Karla tekrarı yok. |
| **Palet (60/30/10)** | hâkim **kâğıt** `#f4f4f1` · ikincil **mürekkep** `#111210` ve gri kademeler · sinyal **kobalt** `#1b44c8` yalnız vurgu. Paris'in vermilyonu, çiçekçinin fuşyası değil. |
| **Düzen** | katı 12 sütun, her şey sola dayalı, saç teli çizgiler, matematiksel dikey ritim. Fotoğraflar ızgaraya oturur, taşmaz. |
| **Hareket** | **yok.** Paris'te kayan şerit, çiçekçide yerleşme animasyonu vardı; burada kısıtlamanın kendisi hamle. Sadece keskin `:hover`/`:focus-visible` geçişleri. |
| **İmza** | **ızgaranın görünür kılınması** — bölüm başlıklarında mono sütun numaraları (`01 / 04`), saç teli ayraçlar ve gerçek bir program tablosu. |

Köşe yuvarlaklığı: **0**, her yerde. Gölge yok. Ayrım çizgiyle kurulur.

## Bölümler

| bölüm | karar |
|---|---|
| Üst bar | **kalıyor** — saç teli alt çizgi, mono nav, blur yok |
| Kapak | **kalıyor** — sola dayalı başlık + ızgaraya oturan tek geniş fotoğraf |
| Künye şeridi | **kalıyor** — kadınlara özel · reformer · MultiSport Plus · 5,0 puan. **Uydurma sayı yok**, hepsi kaynaklı |
| Dersler | **kalıyor** — numaralı liste, kart değil. Sadece doğrulanan iki ders: reformer grup + hamile |
| Reformer şeridi | **kalıyor** — tam kanama, yan yana dizili reformerlar |
| Saatler | **kalıyor** — ✅ Benefit Systems'ten doğrulandı, mono tablo |
| Gelmeden önce | **kalıyor** — rezervasyon zorunlu, temiz havlu + ayakkabı (kaynaklı, gerçekten faydalı) |
| Stüdyo kareleri | **kalıyor** — 4 eşit hücre, Swiss ızgara disiplini |
| Yorumlar | **SİLİNDİ** — 11 değerlendirme var, tek yorum metni okunamadı |
| Fiyatlar | **SİLİNDİ** — hiçbir kaynakta yok |
| Eğitmenler | **SİLİNDİ** — gerçek isim/sertifika doğrulanamadı |
| İletişim + harita | **kalıyor** |
| Mobil alt çubuk | **kalıyor** — Ara / WhatsApp / Yol tarifi |

Ek: `<meta name="robots" content="noindex,nofollow">`.

## İçerik

- **Ad:** Merikafit Pilates Stüdyosu · **Tel:** 0534 978 36 03
  (`+905349783603` / wa `905349783603`)
- **Adres:** Dumlupınar Mah., Cevizlik Cd., Atıcılar Sitesi 25D-C, Nilüfer / Bursa
- **Instagram:** @merikafit.studyo
- **Kapak başlığı:** *Kadınlara özel reformer pilates. Görükle'de.* — kim için olduğu
  ilk satırda; hedef kitlenin aradığı tam bu
- **Saatler:** Pzt–Cum 09:00–22:00 · Cmt 09:00–13:00 · Paz kapalı (⚠️ teyit)
- **Schema:** `HealthAndBeautyBusiness` + `openingHoursSpecification`

Metinde geçmeyecekler: fiyat, ders programı saatleri, eğitmen adı, kuruluş yılı,
müşteri yorumu, uydurma "500+ üye" tarzı sayı.

## Görseller

Sekizi de Pexels stok (`arastirma.md` → görsel kaynakları). Sahada stüdyonun kendi
fotoğraflarıyla değiştirilecek; **müşteriye söylenecek.**

## Yayın

- repo: `merikafit-pilates-gorukle-demo` (**private**)
- vercel: `merikafit-pilates-gorukle`
- alan adı: **`merikafit.com` DNS'te boş görünüyor** — sahada söylenecek somut kanca
