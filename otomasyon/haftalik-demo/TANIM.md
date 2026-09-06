# Haftalık otomatik demo ajanı — TANIM

Zamanlanmış bir cloud routine (Pazar 23:00 gibi). Chat 2'nin pipeline'ını koşar
ama **yayınlamaz.** Denetimi Chat 5 (Gelişim).

## Adımlar

1. `cd "flyteq son"` (veya cloud checkout)
2. `/musteri-bul` — bir bölge seç (Notion `Hafta` geçmişine bakarak sırayla),
   ~20 araştır, puanla, en iyi 6'yı Notion'a `Araştırıldı` yaz. Altısı farklı
   sektör. Tekrar engelle (Notion'daki mevcut işletmeler).
3. Her aday için sırayla:
   - `node arac/marka.mjs demo/<hafta>/<slug> --ig=<kullanıcı> --maps="<ad + semt>"`
   - `/site-plani <slug>` — araştırma + plan, yön seçimi `arac/YONLER.md`'ye göre
   - `/site-yap <slug>` — **publish adımına GELMEDEN durur.**
     `avoid-ai-design` + `frontend-design-pro` yüklenir, sıfırdan tasarlanır,
     `arac/kontrol.sh` + `arac/ss.mjs` çalışır, ekran görüntüsü alınır
4. Notion'da hepsi `Demo Durumu = Hazır`, `Aşama = Demo Hazırlanıyor`
   (Demo Hazır değil — Ahmet onaylayınca Chat 2 `Demo Hazır` yapar)
5. `git add -A && git commit && git push`
6. Ahmet'e özet bildirim: "6 demo hazır, onay bekliyor" + ekran görüntüleri

## Deploy YOK

Pazartesi Ahmet her birine bakar → "şunu yayınla" / "şunu revize et". Yayın
Chat 2'nin `/site-yap` publish adımıyla elle yapılır. Böylece hiçbir zayıf demo
canlıya çıkmaz — otomasyon üretimi yapar, kaliteyi Ahmet + tasarım skill'leri
garanti eder.

## Kurulum durumu

Henüz zamanlanmadı. Eski `flyteq-weekly-leads` ajanının yerini alacak.
Chat 5, `/schedule` ile kuracak (Ahmet onayıyla). O ajan HTML üretmeden önce
mutlaka `avoid-ai-design` + `frontend-design-pro` yüklemeli — eski ajan
yüklemiyordu, çıktılar zayıftı.
