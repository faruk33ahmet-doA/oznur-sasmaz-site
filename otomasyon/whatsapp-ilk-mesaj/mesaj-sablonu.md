# WhatsApp ilk mesaj — sabit şablon

Otomasyon bu metni gönderir. **Serbest metin üretilmez** — sadece aşağıdaki
slotlar doldurulur. Metni değiştirmek istiyorsan burayı düzenle; `GOREV.md`
buradan okur.

## Metin

```
Merhaba, ben Ahmet. FlyTeq web ajansını yönetiyorum: flyteq.space

{isletme} için, siz talep etmeden bir örnek site hazırladım: {demo_url}

Hedefim iki şey: işletmeyi Google aramalarında üst sıralara taşımak ve siteyi gören kişiyi gerçek müşteriye çevirmek. {deger_cumlesi}

Uygun olduğunuzda göz atın; beğenirseniz detayları konuşalım.
```

## Slotlar

| slot | kaynak | kural |
|---|---|---|
| `{isletme}` | Notion `İşletme` | birebir |
| `{demo_url}` | Notion `Demo URL` | boşsa **gönderme** |
| `{deger_cumlesi}` | sektöre göre aşağıdan seç | tek cümle, olduğu gibi |

## Değer cümleleri (sektöre göre — sadece seç, yazma)

| Sektör | Cümle |
|---|---|
| kafe / restoran · pastane / fırın · cağ döner | Menü, konum ve rezervasyon telefonda tek ekranda. |
| kuaför · berber · güzellik salonu | Hizmetler, çalışma saatleri ve randevu telefonda tek ekranda. |
| veteriner · diş / klinik | Hizmetler, adres ve iletişim telefonda tek dokunuşta. |
| pilates / spor | Dersler, program ve iletişim telefonda tek ekranda. |
| çiçekçi | Ürünler, konum ve sipariş için iletişim telefonda tek ekranda. |
| oto servis | Verdiğiniz hizmetler, konum ve telefon tek ekranda. |
| emlak · eğitim · kırtasiye · aktar · diğer | İşletmeyi arayan kişi ihtiyacı olan bilgiyi telefonda tek ekranda buluyor. |

## Kurallar (humanize-writing skill'ine göre)

- Em dash yok, ünlem yok, emoji yok.
- Abartılı vaad yok ("satışlarınızı 10'a katlarız" gibi) — WhatsApp'ta güven düşürür.
- Kısa + orta cümle karışık, konuşma dili.
- Uydurma yok: fiyat, süre, garanti verme.
- Tek link demo, bir link ajans sitesi (flyteq.space). Başka link yok.
- Numaranın sahibi doğrulanamıyorsa gönderme.

## Değişiklik geçmişi

- 2026-09-06 — ilk sürüm. İncir Cafe testinde `530 508 58 14` numarasına
  gönderilerek doğrulandı.
