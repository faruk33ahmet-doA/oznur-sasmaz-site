# Chat 3 — Müşteri İşleri (teslim)

**Başlangıç şartı: ön ödeme alındı** (Notion `Ödeme Durumu = Ön Ödeme Alındı`,
`Aşama = Kazanıldı`). Sen Chat 2'nin hazırladığı demoyu **gerçek müşteri
sitesine** çevirir, domaini bağlar, teslim edersin.

> **Dışarıdan gelen hazır işler de buradadır.** Ahmet'in tanıdığı biri /
> topluluk / referansla gelen kişi (örn. Öznur Şaşmaz kişisel sitesi). Fark:
> soğuk satış yok, karşı taraf zaten "evet" demiş. İş yine aynı: sıfırdan
> tasarla → onaylat → domain bağla → `musteri/`'ye koy → referans yap.
> Öznur'un sitesi şu an bu klasörün **kökünde** (`index.html` + `assets/`,
> repo `oznur-sasmaz-site`), duraklatılmış. Kökte kalır, silinmez.

## Devraldığında elinde ne var

- `demo/<hafta>/<slug>/` — demo site, `arastirma.md`, `plan.md`, `marka.md`, görseller
- Notion kaydı — `Aşama = Kazanıldı`, `Ödeme Durumu`, iletişim geçmişi
- Ahmet'in sahadan getirdiği notlar = `arastirma.md`'deki "sahada sorulacak"
  listesinin cevapları: gerçek çalışma saatleri, fiyatlar, gerçek fotoğraflar,
  WhatsApp numarası, kişi adı, logo

## Müşteriden bilgi isterken

İşletmenin dijital kanallarından **zaten bilinen şeyi tekrar sorma.** Sadece
doğrulat veya eksiği iste. Kontrol listesi: ön ödeme · son istekler · alan adı ·
telefon · WhatsApp · adres · logo · değişecek fotoğraflar · değişecek metinler ·
eksik bilgiler.

## Yapılacaklar

1. **Taşı:** `demo/<hafta>/<slug>/` → `musteri/<slug>/`
2. **Gerçek içerik:** stok fotoğrafları işletmenin kendi kareleriyle değiştir,
   "sahada sorulacak"ların cevaplarını yerleştir, placeholder kalan her şeyi
   gerçekle değiştir. `avoid-ai-design` + `frontend-design-pro` **yine ZORUNLU**,
   `arac/YONLER.md` tekrar yasağı geçerli.
3. **`noindex` kaldır** — artık gerçek site, aranınca çıksın
4. **Genişlet (gerekiyorsa):** iletişim formu, Google Business bağlantısı,
   ek sayfa, blog
5. **Kontrol:** `arac/kontrol.sh` + `arac/ss.mjs`
6. **Canlı kontrol:** mobil · masaüstü · `tel:` · WhatsApp linki · yol tarifi ·
   sosyal medya linkleri · yanlış demo metni kalmadı mı
7. **Domain bağla:** Vercel projesine custom domain, DNS doğrula, HTTPS bekle
8. **Notion:** `Teslim / Sonraki Hizmet Notu` (domain durumu + sonraki fırsat:
   bakım / SEO / Google Business / içerik). Ödeme tamamlandıysa
   `Ödeme Durumu = Tamamen Ödendi`.
9. **`musteri/<slug>/README.md`** yaz: domain, teslim tarihi, ödeme durumu,
   sonraki hizmet fikri
10. **Referans ekle:** flyteq.space `references` tablosuna satır
    (Supabase `flyteq-agency`) — canlı link + kısa açıklama. Site anında güncellenir.

## Klasör

```
musteri/<slug>/
  site/{index.html, assets/}
  README.md   → domain · teslim tarihi · ödeme durumu · sonraki hizmet fikri
```

## İletişim formu deseni (gerekirse)

**form → kayıt → anlık Telegram bildirimi:**

1. Formda `isim` + (`e-posta` ya da `telefon` zorunlu)
2. Form servisi (Formspree / Web3Forms) veya Vercel Function → kaydı yaz
3. `TELEGRAM_BOT_TOKEN` + `chat_id` ile Ahmet'e özet (best-effort — Telegram
   düşse bile lead kaybolmasın)

Basit müşteride form servisi yeter; hacim artarsa kendi fonksiyonu.

## Devir

Teslim edilen iş → **Chat 4 (Pazarlama)** için içerik kaynağı (önce/sonra,
ekran kaydı, proje hikâyesi). Notion kaydı sistemde kalır; ileride satılabilir:
bakım · içerik · SEO · Google Business · ek sayfa · yıllık yenileme.
