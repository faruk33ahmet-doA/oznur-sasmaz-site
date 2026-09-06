# Notion sabah satış kontrolü

Bilgisayar / VS Code / Claude kapalıyken de her sabah çalışır. **Claude API
kullanmaz** — sadece tarih ve kural işlemi. Masraf: sıfır (GitHub Actions
ücretsiz dakika).

## Ne yapar

1. **WhatsApp'a 3 gün cevap yok** → `Sonraki Aksiyon = Telefonla Ara`,
   `Sonraki Aksiyon Tarihi = bugün`
2. **Geçmişte kalmış aksiyon tarihi** → bugüne çeker (Yönetici'nin "Bugün"
   listesine düşsün)
3. Özeti `otomasyon/durum/son-kontrol.md`'ye yazar — **Chat 1 (Yönetici) bunu okur**

Aşama'yı değiştirmez, müşteriye dokunmaz.

## Kurulum (Ahmet yapar — bir kez)

1. **Notion internal integration** oluştur: https://www.notion.so/my-integrations
   → "New integration" → workspace seç → **Internal Integration Secret**'i kopyala
2. `Ajans — Müşteri Takibi` veritabanını aç → `...` → **Connections** →
   oluşturduğun integration'ı ekle (yoksa script 404 alır)
3. GitHub'da bu repo (`oznur-sasmaz-site`) → Settings → Secrets and variables →
   Actions → **New repository secret**:
   `NOTION_TOKEN` = kopyaladığın secret
4. **Workflow'u ekle:** `otomasyon/notion-sabah-kontrol/workflow-ornegi.yml`
   dosyasını `.github/workflows/notion-sabah-kontrol.yml` olarak kopyala ve
   commit'le. (Claude'un OAuth token'ı `workflow` scope'una sahip olmadığı için
   `.github/workflows/` altına push edemiyor — bunu Ahmet elle yapar ya da
   `gh` CLI `workflow` yetkisiyle.)
5. Test: Actions sekmesi → "Notion sabah kontrol" → **Run workflow** (elle)

## Yerel test

```bash
NOTION_TOKEN=secret_xxx node otomasyon/notion-sabah-kontrol/kontrol.mjs --dry
```
`--dry` Notion'a yazmaz, sadece ne yapacağını gösterir.

## Bağlı Notion alanları

`WhatsApp Gönderildi` (checkbox) · `WhatsApp Gönderim Tarihi` (date) ·
`Arandı` (checkbox) · `Yanıt Durumu` · `Sonraki Aksiyon` ·
`Sonraki Aksiyon Tarihi` · `Aşama`

Bu alanlar Notion'da mevcut. Ahmet WhatsApp gönderince `WhatsApp Gönderildi`'yi
işaretler + `WhatsApp Gönderim Tarihi`'ni girer; gerisini otomasyon yapar.
