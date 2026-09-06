# WhatsApp ilk mesaj — Cowork görev talimatı

Bu metnin tamamı Claude Cowork'te **zamanlanmış bir göreve** yapıştırılır
(kurulum: `README.md`). Görev her tetiklendiğinde Claude aşağıdakileri yapar.

Gereken bağlantılar: **Notion** connector + **Chrome eklentisi** (WhatsApp
Web'de oturum açık olmalı).

---

## Ayarlar (Ahmet değiştirir)

- `GÜNLÜK_TAVAN = 6` — bir çalıştırmada en fazla kaç işletmeye mesaj gider
- `SAAT_PENCERESI = 10:00–19:00`, `GÜNLER = Pazartesi–Cumartesi` (TR saati)
- Notion data source: `collection://2868f57d-f231-4f8b-90ea-81f598f2f438`
- Repo: `flyteq son` (oznur-sasmaz-site)

---

## Adımlar

### 1. Saat kontrolü
TR saati `SAAT_PENCERESI` dışındaysa veya gün `GÜNLER` dışındaysa: hiçbir şey
yapma, "saat dışı, atlandı" yaz, bitir.

### 2. Uygun leadleri çek
Notion'da şu koşulların **hepsini** sağlayan kayıtlar:

- `Aşama = Demo Hazır`
- `Demo URL` dolu
- `Telefon` dolu
- `WhatsApp Gönderildi` boş/false
- `Aşama` ∉ {Kazanıldı, Kaybedildi}

### 3. Sırala ve kes
`Uygunluk Puanı` (yoksa `Öncelik`: Sıcak > Ilık > Soğuk) azalan sırada.
İlk `GÜNLÜK_TAVAN` kaydı al. Gerisi sonraki çalıştırmaya kalır.

### 4. Her lead için sırayla

**a. Telefonu normalize et** → `90XXXXXXXXXX` (12 hane, TR cep `905...`).
- Boşluk/parantez/`+` temizle. `0` ile başlıyorsa başına `9` ekle
  (`0530...` → `90530...`). `5` ile başlıyorsa başına `90`.
- 12 haneli `905` ile başlamıyorsa: **gönderme.** Notion'a not düş
  (adım 4f "atlandı" varyantı), sıradakine geç.

**b. Mesajı kur** — `otomasyon/whatsapp-ilk-mesaj/mesaj-sablonu.md`'yi oku.
Sadece slotları doldur:
- `{isletme}` = `İşletme`
- `{demo_url}` = `Demo URL`
- `{deger_cumlesi}` = `Sektör`'e göre şablondaki tablodan **seç**
Serbest cümle ekleme, metni yeniden yazma.

**c. Chrome'da aç:**
```
https://web.whatsapp.com/send?phone=90XXXXXXXXXX&text=<URL-encoded mesaj>
```
Sohbetin ve hazır metnin yüklenmesini bekle (~10 sn).

**d. Geçersiz numara kontrolü.** "Telefon numarası geçersiz / WhatsApp'ta
kayıtlı değil" ekranı çıktıysa: **gönderme.** Notion:
`Sonraki Aksiyon = Telefonla Ara`, `Sonraki Aksiyon Tarihi = bugün`,
`WhatsApp Mesaj Metni = "WhatsApp'ta kayıtlı değil — telefonla aranacak"`.
Sekmeyi kapat, sıradakine geç.

**e. Gönder.** Mesajı gönder (Enter veya gönder butonu). Ekran görüntüsü al
(görev loguna). Gönderildiğini doğrula (mesaj baloncuğu göründü mü).

**f. Notion'u güncelle** (`notion-update-page`):
- `WhatsApp Gönderildi` = ✓
- `WhatsApp Gönderim Tarihi` = bugün
- `İlk Temas Tarihi` = bugün (boşsa)
- `Aşama` = `İlk Temas Yapıldı`
- `Yanıt Durumu` = `Cevap Bekleniyor`
- `Son Temas Kanalı` = `WhatsApp`, `Son Temas Tarihi` = bugün
- `Sonraki Aksiyon` = `İşlem Yok` (3 gün kuralını sabah otomasyonu işletir)
- `WhatsApp Mesaj Metni` = gönderilen tam metin
- `Temas Sayısı` = (varsa +1, yoksa 1)

### 5. Özet yaz
`otomasyon/durum/whatsapp-son-gonderim.md` dosyasına yaz (üzerine):
```
# WhatsApp ilk mesaj — <tarih saat>
Gönderildi: <n>
- <İşletme> · <numara> · <demo_url>
Atlandı: <m>
- <İşletme> · <neden: numara geçersiz / WhatsApp'ta yok>
Tavan nedeniyle bekleyen: <k>
```

### 6. Commit
`otomasyon/durum/` altına yazdıysan:
```
git add -A && git commit -m "WhatsApp ilk mesaj: <n> gönderildi <tarih>

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" && git push
```

---

## Değişmez kurallar

1. **Bir numaraya ömür boyu tek otomatik mesaj.** `WhatsApp Gönderildi` ✓ olan
   kayda bir daha dokunma. İkinci temas (follow-up, arama) otomatik değil —
   `notion-sabah-kontrol` 3 gün sonra `Telefonla Ara` diyor, aramayı Ahmet yapar.
2. **Şablon dışına çıkma.** Fiyat, garanti, uydurma özellik, emoji, ünlem yok.
3. **Şüphede dur.** Numara / işletme eşleşmesi / metin doğruluğundan emin
   değilsen gönderme, Notion'a not düş, Ahmet'e bırak.
4. **Aşama geçişi yalnız** `Demo Hazır → İlk Temas Yapıldı`. Başka aşamaya
   dokunma. `Kazanıldı` / `Kaybedildi` kayıtlara hiç dokunma.
5. **Günlük tavanı aşma.** Kalanları bir sonraki çalıştırmaya bırak.
6. **Kill switch:** Cowork'te görevi durdur (pause). Acil durumda ilk adım budur.

---

## Test edildi

2026-09-06 — İncir Cafe demosu (`incir-cafe-mudanya.netlify.app`) test
numarasına (`530 508 58 14`) elle bu yolla gönderildi, mekanizma çalışıyor.
Şablon `mesaj-sablonu.md`'de sabit.
