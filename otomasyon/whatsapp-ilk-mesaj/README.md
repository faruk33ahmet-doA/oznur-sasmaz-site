# WhatsApp ilk mesaj otomasyonu

Haftanın 6 demosuna **ilk WhatsApp mesajını otomatik gönderir.**

## Model (haftalık)

```
Pazar gecesi   → ajan 6 demoyu hazırlar + kuyruk.json'u yazar
Pazartesi 10:15 → gonder.mjs kuyruğu okur, 6 mesajı Chrome/WhatsApp Web'den gönderir
Pazartesi öğlen → ajan gonderildi.json'a bakıp Notion'u günceller
3 gün cevap yok → notion-sabah-kontrol "Telefonla Ara" der → Ahmet arar
```

## Neden bu tasarım

- **Notion / token yok.** Script hiçbir yere bağlanmaz — sadece yerel
  `kuyruk.json` okur, `gonderildi.json` yazar. Kuyruğu ajan (Notion erişimi
  olan sohbet) hazırlar, sonucu ajan Notion'a işler.
- **Cowork / bulut yok.** Cowork'ün "cihaz onayı" derdi yok. WhatsApp Web zaten
  canlı tarayıcı istiyor — hiçbir yöntem Mac kapalıyken çalışamaz. Bu script
  Mac açıkken Pazartesi 10:15'te sessizce işini yapar.
- **Düz kod**, `notion-sabah-kontrol` gibi — Claude API kullanmaz.

## WhatsApp Business ile de çalışır (önerilir)

`web.whatsapp.com`, Business uygulamasıyla da bağlanıyor. Business hesabını
web'e bağlarsan **script değişmez**, aynı çalışır. Kazanç: işletme profili
(adres, saat, `flyteq.space`, açıklama) mesajın yanında görünür → daha
güvenilir, hesap daha az riske girer. Business'a geçmek en temiz adım.

## Dosyalar

| dosya | ne |
|---|---|
| `gonder.mjs` | gönderici — `kuyruk.json` → WhatsApp → `gonderildi.json` |
| `calistir.sh` | launchd bunu çağırır (+ özet commit) |
| `space.flyteq.whatsapp-ilk-mesaj.plist` | launchd tanımı (Pazartesi 10:15) |
| `kuyruk-ornegi.json` | kuyruk şablonu — `kuyruk.json` olarak kopyalanır (gitignore) |
| `mesaj-sablonu.md` | gönderilen metin + sektör cümleleri (kaynak) |

## `kuyruk.json` biçimi

```json
{
  "hafta": "2026-09-08",
  "leadler": [
    { "isletme": "İncir Cafe",
      "telefon": "0224 544 91 95",
      "demo_url": "https://incir-cafe-mudanya.netlify.app",
      "sektor": "kafe / restoran",
      "notion_page_id": "3d30..." }
  ]
}
```
`sektor` → mesajdaki değer cümlesini seçer. `mesaj` alanı doldurulursa şablon
yerine o metin gider. `notion_page_id` sync için — zorunlu değil.

## Kurulum (bir kez)

### 1. Chrome + WhatsApp Web
Chrome'da `web.whatsapp.com`'a giriş yapılı olsun (kişisel ya da Business
hesabı). Telefon eşleştirilmiş kalsın.

### 2. Erişilebilirlik izni
Script tuş vuruşu gönderiyor (`osascript` → System Events). macOS bunu
engelliyor. Sistem Ayarları → Gizlilik ve Güvenlik → **Erişilebilirlik**:
- Testi VS Code terminalinden yapacaksan → **VS Code**'u aç (yaptın).
- launchd otomatik çalışınca macOS `osascript` için bir kez daha sorabilir;
  çıkan uyarıda izin ver ya da listede `osascript`'i aç.

### 3. Kuru test (kimseye mesaj gitmez)
```bash
cd "/Users/ahmetfarukdogan/Desktop/flyteq son"
cp otomasyon/whatsapp-ilk-mesaj/kuyruk-ornegi.json otomasyon/whatsapp-ilk-mesaj/kuyruk.json
# kuyruk.json'a kendi test numaranı yaz
node otomasyon/whatsapp-ilk-mesaj/gonder.mjs --dry --skip-time
```
Kimin, hangi numaraya, hangi metin — ekrana yazar.

### 4. Gerçek test (1 kayıt, kendi numaran)
`kuyruk.json`'da tek satır bırak, telefon = kendi test numaran. Sonra:
```bash
node otomasyon/whatsapp-ilk-mesaj/gonder.mjs --skip-time
```
Chrome'da açılışı izle → mesaj gitti mi bak → `gonderildi.json` +
`otomasyon/durum/whatsapp-son-gonderim.md` doğru mu kontrol et.

### 5. Zamanla (her Pazartesi 10:15)
```bash
cp "otomasyon/whatsapp-ilk-mesaj/space.flyteq.whatsapp-ilk-mesaj.plist" \
   ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/space.flyteq.whatsapp-ilk-mesaj.plist
```
Test tetikleme (beklemeden): `launchctl start space.flyteq.whatsapp-ilk-mesaj`
Loglar: `/tmp/flyteq-whatsapp-ilk-mesaj.log` ve `.err`

## Durdurma
```bash
launchctl unload ~/Library/LaunchAgents/space.flyteq.whatsapp-ilk-mesaj.plist
```

## Değişmez kurallar

- **Haftada bir parti, en fazla 6** (`gonder.mjs` içinde `CAP`).
- **Sadece Pazartesi 10:00–19:00** (script kendi eler).
- **Sadece `mesaj-sablonu.md`'deki metin.** Serbest üretim yok, fiyat/garanti yok.
- Bir numaraya tek mesaj — kuyruğu hazırlayan ajan tekrarı engeller
  (Notion `WhatsApp Gönderildi` kontrolü).
- Geçersiz numara: gönderilmez, `gonderildi.json` "atlandı"ya yazılır.

## Gönderim doğrulama

Script, gönderdikten sonra son giden mesajda demo linki var mı diye bakar
(Chrome JS). Bunun çalışması için Chrome'da **View → Developer → "Allow
JavaScript from Apple Events"** açık olmalı. Açık değilse gönderim yine kaydolur
ama `gonderildi.json`'da `dogrulandi: false` + durum dosyasında
"⚠ doğrulanmadı — telefonu kontrol et" yazar.

## launchd izin notu

İlk otomatik çalışmada macOS `osascript` için Erişilebilirlik izni isteyebilir
(VS Code'a verilen izin launchd'ye geçmez). İstek çıkarsa onayla; kaçırırsan
`/tmp/flyteq-whatsapp-ilk-mesaj.err`'e bak, gerekirse Sistem Ayarları →
Erişilebilirlik'te `osascript`'i ekle ve `launchctl start
space.flyteq.whatsapp-ilk-mesaj` ile tekrar tetikle.

## Bilinen sınır

"WhatsApp'ta kayıtlı değil" ekranı ayrıca yakalanmıyor. Numara gerçek ama
WhatsApp'sızsa mesaj düşebilir; cevap gelmeyince 3 gün kuralı Ahmet'i telefona
yönlendirir.

## Ajanın işi (Chat 1/2 — token gerektiren kısım burada, insan onaylı)

- **Pazar gecesi:** demolar `Demo Hazır` olunca, Notion'dan uygun leadleri
  (`Demo Hazır` + `Demo URL` + `Telefon` + `WhatsApp Gönderildi` boş) çek,
  en iyi 6'yı `kuyruk.json`'a yaz.
- **Pazartesi:** `gonderildi.json`'u oku, gönderilen her lead için Notion:
  `WhatsApp Gönderildi` ✓, `WhatsApp Gönderim Tarihi`, `Aşama = İlk Temas
  Yapıldı`, `Yanıt Durumu = Cevap Bekleniyor`, `Son Temas Kanalı = WhatsApp`,
  `WhatsApp Mesaj Metni`. Atlananlar için `Sonraki Aksiyon = Telefonla Ara`.
  Sonra `gonderildi.json`'da `notion_guncellendi: true` yap.

## Test edildi

2026-09-06/07 — gönderim mekanizması (Chrome aç → AppleScript boşluk-sil-Enter)
İncir Cafe demosuyla test numarasına doğrulandı.
