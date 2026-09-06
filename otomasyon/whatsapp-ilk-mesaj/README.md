# WhatsApp ilk mesaj otomasyonu

Demo hazır olan işletmelere **ilk WhatsApp mesajını otomatik gönderir.**
Bilgisayar kapalıyken de çalışır — Claude Cowork'te zamanlanmış görev olarak.

Referans fikir: Batuhan'ın "WhatsApp Otomasyonu: Claude Cowork ile Zamanlanmış
Görevler" videosu (youtu.be/0J2qIwJrDjQ). Fark: kaynak Google Sheets değil,
**Notion CRM** — FlyTeq'in tek gerçek kaynağı.

## Ne yapar

`Demo Hazır` + demo linki var + telefonu var + daha WhatsApp atılmamış leadleri
Notion'dan çeker → günde en fazla 6'sına sabit şablondan kısa bir mesaj gönderir
→ Notion'u `İlk Temas Yapıldı` yapar. Cevap gelmezse `notion-sabah-kontrol` 3
gün sonra `Telefonla Ara` diyor, aramayı Ahmet yapar.

## Dosyalar

| dosya | ne |
|---|---|
| `GOREV.md` | Cowork görevine yapıştırılan talimat |
| `mesaj-sablonu.md` | gönderilen mesajın sabit metni + sektör cümleleri |
| `README.md` | bu dosya |

## Kurulum (Ahmet — bir kez)

1. **Chrome eklentisi.** Claude ayarları → Extensions → "Browse extensions" →
   **Google Chrome**'u etkinleştir. Chrome'da `web.whatsapp.com`'a giriş yapılı
   ve oturum açık olmalı (telefon eşleştirilmiş).
2. **Notion bağlantısı** Cowork ortamında etkin olmalı (`Ajans — Müşteri
   Takibi` veritabanına erişimli).
3. **Şablonu onayla.** `mesaj-sablonu.md`'deki metni oku, ton uygun mu bak.
   Değişiklik burada yapılır.
4. **Cowork görevi.** Scheduled → New task → **manuel** → ad: "WhatsApp ilk
   mesaj" → `GOREV.md`'nin tamamını yapıştır → zamanlama: her iş günü **10:15
   TR** (günde 1 kez) → Save.
5. **İlk çalıştırma.** Cowork'te "Run now" ile bir kez elle koştur.
   `otomasyon/durum/whatsapp-son-gonderim.md` + ekran görüntülerine bak. Doğru
   numaralara doğru mesaj gitti mi? Sorun yoksa zamanlamaya bırak.

## Durdurma

Cowork'te görevi **pause** et. Tek adım. Acil durumda ilk yapılacak budur.

## Bağlı Notion alanları

`Aşama` · `Demo URL` · `Telefon` · `WhatsApp Gönderildi` (+Tarihi) ·
`İlk Temas Tarihi` · `Yanıt Durumu` · `Son Temas Kanalı` (+Tarihi) ·
`Sonraki Aksiyon` (+Tarihi) · `WhatsApp Mesaj Metni` · `Temas Sayısı`

Hepsi Notion'da mevcut. `WhatsApp Mesaj Metni` 2026-09-06'da eklendi.

## Neden Cowork, neden düz kod değil

`notion-sabah-kontrol` düz Node script — sadece tarih/kural işi. Bu iş Chrome
sürükler + işletmeye göre karar verir (numara doğrula, geçersiz numara ekranını
tanı, sektör cümlesi seç), o yüzden Claude görevi. Ama **gönderim sabit
şablonla sınırlı** ve günlük tavan var — serbest üretim yok.
