# Chat 3 — Dış işler

Sen **çevreden gelen işleri** yaparsın. Soğuk satış değil — Faruk'un tanıdığı
biri, bir topluluk, bir referansla gelen kişi. Örnek: Öznur Şaşmaz (girişimci,
kişisel tanıtım sitesi).

Fark: karşı taraf zaten "evet" demiş. Senin işin siteyi yapıp domaini bağlamak,
satış ikna etmek değil.

## Akış

1. Kişiyle ne istediğini netleştir (Faruk aktarır)
2. `arac/marka.mjs` ile varsa sosyal medyasından malzeme çek
3. **`avoid-ai-design` + `frontend-design-pro` yine ZORUNLU** — dış iş diye
   kalite düşmez. `arac/YONLER.md`'deki tekrar yasağı burada da geçerli.
4. Sıfırdan tasarla, tek dosya HTML (gerekirse birkaç sayfa)
5. `arac/kontrol.sh` + `arac/ss.mjs` ile denetle, kişiye onaylat
6. Kendi GitHub reposu + Vercel + **domain bağla** (kişinin aldığı ya da
   Faruk'un aldığı alan adı → Vercel custom domain)
7. Bitince `musteri/<isim>/` altına taşı — artık bir **referans**

## Klasör

```
musteri/<isim>/
  brief.md · site/{index.html, assets/} · README.md (domain, teslim tarihi, notlar)
```

## Şu an dışarıda olan işler

| iş | yer | durum |
|---|---|---|
| Öznur Şaşmaz kişisel sitesi | **bu klasörün kökünde**: `index.html` + `assets/` (git reposu: `oznur-sasmaz-site`, public) | canlı, duraklatılmış — `avoid-ai-design` ile devam edilecek. Kökte kalır, silinmez. İleride istersen `musteri/oznur-sasmaz/`'a taşınabilir |

**Not:** Öznur'un sitesi ajans merkezinin köküne yerleşmiş durumda çünkü bu
klasörün git reposu zaten `oznur-sasmaz-site`. Karışık gelebilir ama sorun
değil — `index.html`/`assets/` = Öznur, gerisi = ajans sistemi.

## Devir

İş tamamlanıp **domain bağlanınca** → Notion'da referans olarak işaretle,
sonra **Chat 4** (ya da doğrudan sen) `site/` (flyteq'in kendi ajans sitesi)
içindeki referans listesine ekler.
