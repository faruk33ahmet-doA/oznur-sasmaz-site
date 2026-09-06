# WhatsApp ilk mesaj otomasyonu

Demo `Demo Hazır` olan işletmelere **ilk WhatsApp mesajını otomatik gönderir.**

## Yöntem: yerel zamanlanmış script (launchd)

Cowork / bulut değil. `gonder.mjs` düz Node kodu — Claude API kullanmaz. Mac
açıkken ve Chrome'da WhatsApp Web oturumu açıkken çalışır. Cowork'ün istediği
"cihaz onayı / device binding" derdi yok.

> WhatsApp Web canlı bir tarayıcı oturumu ister; hiçbir yöntem bilgisayar
> tamamen kapalıyken çalışamaz. Bu script "Mac açık + Chrome açık" olduğu
> sürece 10:15'te sessizce işini yapar.

## Ne yapar

`Aşama = Demo Hazır` + `Demo URL` dolu + `Telefon` dolu + `WhatsApp Gönderildi`
boş + Kazanıldı/Kaybedildi değil olan leadleri Notion'dan çeker →
`Uygunluk Puanı` (yoksa `Öncelik`) sırasına göre **günde en fazla 6**'sına
`mesaj-sablonu.md`'deki sabit metni gönderir → Notion'u `İlk Temas Yapıldı`
yapar → `otomasyon/durum/whatsapp-son-gonderim.md` yazar ve commit'ler.

Cevap gelmezse `notion-sabah-kontrol` 3 gün sonra `Telefonla Ara` der —
aramayı Ahmet yapar. **Follow-up mesajı otomatik değil.**

## Dosyalar

| dosya | ne |
|---|---|
| `gonder.mjs` | asıl script |
| `calistir.sh` | launchd bunu çağırır (script + durum commit) |
| `space.flyteq.whatsapp-ilk-mesaj.plist` | launchd tanımı (şablon) |
| `mesaj-sablonu.md` | gönderilen metin + sektör cümleleri (kaynak) |

## Kurulum (bir kez)

1. **Chrome + WhatsApp Web.** Chrome'da `web.whatsapp.com`'a giriş yapılı,
   telefon eşleştirilmiş olsun. macOS'ta bu terminale/otomasyona
   **Erişilebilirlik** izni ver (Sistem Ayarları → Gizlilik ve Güvenlik →
   Erişilebilirlik) — tuş vuruşu göndermek için gerekli.
2. **Notion token.** `otomasyon/whatsapp-ilk-mesaj/.notion-token` dosyası
   oluştur, içine internal integration secret'ı yaz (gitignore'lu). Ya da
   plist'teki `EnvironmentVariables` içine yaz. Integration `Ajans — Müşteri
   Takibi` veritabanının Connections'ında ekli olmalı.
3. **Test — kuru:**
   ```bash
   node otomasyon/whatsapp-ilk-mesaj/gonder.mjs --dry --skip-time
   ```
   Kimin, hangi numaraya, hangi metin. Notion'a yazmaz, mesaj göndermez.
4. **Test — gerçek (1 kayıt):** Notion'da bir demoyu geçici `Demo Hazır` yap,
   telefonu kendi test numaran olsun, sonra:
   ```bash
   node otomasyon/whatsapp-ilk-mesaj/gonder.mjs --skip-time
   ```
   Chrome'da açılışı izle, mesaj gitti mi bak, Notion güncellendi mi kontrol et.
5. **Zamanla:**
   ```bash
   cp "otomasyon/whatsapp-ilk-mesaj/space.flyteq.whatsapp-ilk-mesaj.plist" \
      ~/Library/LaunchAgents/
   # plist içindeki BURAYA_NOTION_TOKEN'ı doldur (ya da .notion-token kullan, satırı sil)
   launchctl load ~/Library/LaunchAgents/space.flyteq.whatsapp-ilk-mesaj.plist
   ```
   Artık her gün 10:15'te çalışır; script Pazar'ı ve 10:00–19:00 dışını kendi eler.

## Durdurma

```bash
launchctl unload ~/Library/LaunchAgents/space.flyteq.whatsapp-ilk-mesaj.plist
```

## Değişmez kurallar

- **Bir numaraya ömür boyu tek otomatik mesaj.** `WhatsApp Gönderildi` ✓ olana
  bir daha dokunulmaz.
- **Sadece `mesaj-sablonu.md`'deki metin.** Serbest üretim yok, fiyat/garanti yok.
- **Günlük tavan 6** (`gonder.mjs` içinde `CAP`).
- Aşama geçişi yalnız `Demo Hazır → İlk Temas Yapıldı`.
- Geçersiz numara: gönderilmez, `Sonraki Aksiyon = Telefonla Ara` yazılır.

## Bilinen sınır

Script "WhatsApp'ta kayıtlı değil" ekranını göremiyor (ekran okuma yok).
Numara gerçek ama WhatsApp'sızsa mesaj sessizce düşer; cevap gelmeyince 3 gün
kuralı devreye girer, Ahmet telefonla arar. Sorun olmaz ama farkında ol.

## Test edildi

2026-09-06/07 — İncir Cafe demosu test numarasına bu yolla gönderildi,
gönderim mekanizması (Chrome aç → AppleScript boşluk-sil-Enter) çalışıyor.
