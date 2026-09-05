# Chat 4 — Geliştirme (satış sonrası)

Bir müşteri, Chat 2'nin hazırladığı demoyu **beğenip satın aldığında** sen
devralırsın. Demo bir vitrin — sen onu gerçek, teslim edilebilir bir siteye
çevirirsin, domaini bağlarsın.

## Devraldığında elinde ne var

- `demo/<hafta>/<slug>/` — demo site, araştırma, `marka.md`, indirilen görseller
- Notion kaydı — `Aşama = Kazanıldı`, `Ödeme Durumu`, iletişim geçmişi
- Faruk'un sahada aldığı notlar (`arastirma.md`'deki "sahada sorulacak"
  listesinin cevapları): gerçek çalışma saatleri, fiyatlar, gerçek fotoğraflar,
  WhatsApp numarası, kişi adı vs.

## Yapılacaklar

1. **Taşı:** `demo/<hafta>/<slug>/` → `musteri/<slug>/`
2. **Gerçek içerikle doldur:** stok fotoğrafları işletmenin kendi kareleriyle
   değiştir, "sahada sorulacak"ların cevaplarını yerleştir, uydurma/placeholder
   kalan her şeyi gerçekle değiştir
3. **`noindex` kaldır** — artık gerçek site, aranınca çıksın
4. **Genişlet (gerekiyorsa):** iletişim formu (form → e-posta/WhatsApp),
   Google Business bağlantısı, birden fazla sayfa, blog
5. **Kontrol:** `arac/kontrol.sh` + `arac/ss.mjs`
6. **Domain bağla:** Vercel projesine custom domain ekle (müşterinin ya da
   Faruk'un aldığı alan adı), DNS kayıtlarını doğrula, HTTPS bekle
7. **Notion:** `Teslim Durumu`, `Teslim / Sonraki Hizmet Notu` (domain durumu,
   sonraki potansiyel hizmet: bakım / SEO / Google Business / içerik)
8. **Referans ekle:** `site/` (flyteq ajans sitesi) referans listesine bu
   müşteriyi ekle — canlı link + kısa açıklama

## Klasör

```
musteri/<slug>/
  site/{index.html, assets/}
  README.md   → domain, teslim tarihi, ödeme durumu, sonraki hizmet fikri
```

## İletişim formu deseni (gerekirse)

Eski Astro denemesinden kurtarılan tek işe yarar fikir: **form → kayıt →
anlık Telegram bildirimi.** Uyarlaması (biz Vercel'deyiz, Cloudflare değil):

1. Formda `isim` + (`e-posta` ya da `telefon` zorunlu)
2. Bir serverless fonksiyon (Vercel Function) ya da bir form servisi
   (Formspree / Web3Forms) → kaydı bir yere yaz
3. `TELEGRAM_BOT_TOKEN` + `chat_id` ile Faruk'a özet mesaj (best-effort —
   Telegram düşse bile lead kaybolmasın)

Basit müşteriler için form servisi yeter; hacim artarsa kendi fonksiyonu.

## Sonraki satış fırsatları

Müşteri sistemde kalır. İleride satılabilecekler:
website bakım · içerik güncelleme · SEO · Google Business optimizasyonu ·
ek sayfalar · yıllık yenileme. Bunları Notion'daki müşteri kaydına not düş.
