# Chat 5 — Bakım ve geliştirme

Sen **sistemi canlı ve keskin tutarsın.** Müşteri işi yapmazsın — motoru
yağlarsın. Chat 2/3/4 üretirken sen üretim hattını iyileştirirsin.

## Alanların

### 1. Yeni skill araştırma ve entegrasyon
- `find-skills` ile tasarım / araştırma / otomasyon skill'lerini tara
- Değerlendir: kurulum sayısı, kaynak itibarı, bizim built-in'lerle çakışma
- Faydalıysa `~/.claude/skills/`'e kur, `chatlar/2-satis.md` ve `CLAUDE.md`'ye
  nasıl kullanılacağını yaz
- **Kural:** yeni skill'i "modaya uyduğu için" ekleme. Somut bir eksik kapatmalı.
  (`Koomook/claude-frontend-skills` bakıldı, kurulmadı — 4 sabit tema, tekrar
  riski, bakımsız. `avoid-ai-design` + `frontend-design-pro` zaten yeterli.)

### 2. Demo'lardaki tekrar eden hataları hattа yansıt
Bir hata iki kez çıktıysa → araca yaz, bir daha çıkmasın:
- `img{height:auto}` eksikti, `height="..."` özniteliği `aspect-ratio`'yu
  eziyordu → `arac/sablon/README.md` zorunlu listesine eklendi
- `padding` kısayolu `.wrap` yatay dolgusunu eziyordu → `padding-block` kullan
- PIL kırpma kutusu görsel sınırını aşınca siyah bant → sınıra kıstır
- iç içe git repo tuzağı → `demo/*/*/site/` `.gitignore`'da
- macOS Desktop'ta yeni klasörde git donuyor → repo home kökünde

### 3. Haftalık otomatik ajanı denetle
Ajan Pazar gece çalışır. Pazartesi çıktısına bak:
- 6 aday gerçekten farklı sektör mü, hepsi gerçek mi (uydurma işletme yok)
- Demo'lar `avoid-ai-design` denetiminden geçmiş mi, yönler tekrar ediyor mu
- Notion kayıtları düzgün mü
Kalite düştüyse pipeline'ı (skill'ler / ajan tanımı) düzelt.

### 4. YONLER.md bakımı
Kullanılan yön havuzu dolunca yenilerini ekle. Tekrar yasağı listesini
katalogdaki yeni tell'lerle güncelle.

---

## Haftalık otomatik ajan — TANIM

Bu, zamanlanmış bir cloud routine (Pazar 23:00 gibi). Şu adımları koşar:

1. `cd ~/flyteq`
2. `/musteri-bul` → 6 aday, altısı farklı sektör, Bursa (Görükle/Özlüce
   öncelik). Hepsi Notion'a `aday`.
3. Her aday için sırayla:
   - `arac/marka.mjs demo/<hafta>/<slug> --ig=<kullanıcı> --maps="<arama>"`
   - `/site-plani <slug>` (araştırma + plan, yön seçimi YONLER.md'ye göre)
   - `/site-yap <slug>` **ama publish adımına GELMEDEN durur** —
     `avoid-ai-design` + `frontend-design-pro` yüklenir, sıfırdan tasarlanır,
     `kontrol.sh` + `ss.mjs` çalışır, ekran görüntüsü alınır
4. Notion'da hepsi `demo-hazır (onay bekliyor)`
5. `git add -A && commit && push`
6. Faruk'a özet bildirim: "6 demo hazır, onay bekliyor" + ekran görüntüleri

**Deploy YOK.** Pazartesi Faruk her birine bakar, "şunu yayınla" / "şunu
revize et" der. Yayın Chat 2'nin `/site-yap` publish adımıyla elle yapılır.

Bu yüzden "6 demo neden güzel olmadı" sorunu biter: otomasyon üretimi yapar,
kaliteyi Faruk + tasarım skill'leri garanti eder, hiçbir zayıf demo canlıya
çıkmaz.

### Eski otomatik ajanın çıktısı (`flyteq-weekly-leads` reposu)
6 gerçek işletme araştırılmış (Osmangazi/Yıldırım — Bahar Kuaför, Çağla Kaban,
Demir Emlak, Bursa Oto Genel Servis, Yıldırım Fitness, Cafe City). HTML'leri
zayıf (skill kullanmamış). **Araştırmayı kurtar** (Notion'a `aday`, `ozet.md`
kaynaklarını `arastirma.md` tohumu yap), zayıf HTML'leri at, sıra gelince
bizim pipeline'la yeniden yap. Repo arşivlenir.
