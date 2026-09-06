# Deluxe Güzellik Salonu — site planı

## Konumlandırma
Mudanya Halitpaşa'da güzellik salonu. Site "mudanya güzellik salonu" / "mudanya
protez tırnak" arayanı ve Instagram'dan geleni; hizmetleri, işi (tırnak
fotoğrafları), konumu ve randevu yolunu tek ekranda karşılar.

## Tasarım yönü
**Swiss / tipografik ızgara — iş vitrini.** Gerekçe: ellerin temiz yüzeylerde,
disiplinli çekilmiş yüksek çözünürlüklü fotoğrafları var; katı 12 kolon ızgara
+ bol beyaz + tek vurgu, bu fotoğrafların rengini öne çıkarır. Son demolarda
kullanılan yönlerden (art deco, endüstriyel, brütalist) ayrışır. **Paris Kuaför
"editoryal/lookbook"tu** — bu farklı: dergi düzeni değil, katı Swiss ızgara;
farklı palet (sıcak kağıt + terracotta, kemik + vermilyon değil); farklı tip.

- **Tip:** Archivo (genişletilmiş `wdth 125` — Swiss poster başlığı) + Work Sans (gövde). İkisi de havuzda kullanılmadı.
- **Palet (60/30/10):** 60 sıcak kağıt `#fbf8f5`/`#f2ece6` · 30 koyu kahve-siyah `#211c1a` · 10 terracotta/gül `#b06b4e` (kendi fotoğraflarındaki ten/kahve tonlarından örneklendi).
- **Düzen:** 12 kolon ızgara her bölümde görünür; ince saç çizgileri (hairline) bölüm ayıracı; hizmetler bir "Swiss dizin" (başlık solda, numaralı liste sağda); katı 3×2 foto ızgarası; asimetrik hero (6 kolon metin + 5 kolon foto).
- **Hareket:** yok (Swiss = sakin, disiplinli). Sadece :hover/:focus.
- **İmza detay:** `01 —`, `02 —` monospace-benzeri numaralı dizin; tam genişlik "Mudanya sahili + kırmızı manikür" fotoğraf şeridi (konum + iş bir arada).

`YONLER.md` yasaklıları: başlıkta serif-italik vurgu yok, renkli kenarlıklı kart yok, 3'lü ikon kartı yok, her bölümde fade-up yok, gradyan yok, sabit tek kapsayıcı refleksi yok (12 kolon ızgara farklı genişlikler veriyor).

## Hedef aramalar
- **Birincil: "mudanya güzellik salonu"** → title + tek H1
- "mudanya protez tırnak" · "mudanya kalıcı makyaj" · "mudanya microblading kaş"
- "mudanya jel tırnak" · "halitpaşa güzellik salonu" · "mudanya cilt bakımı"

## Bölümler
1. **Hero** — 6/5 kolon: sol metin (H1 "Mudanya'da güzellik salonu", randevu CTA, 4,5/40 puanı), sağ manikür fotoğrafı. KALIR.
2. **Hizmetler (Swiss dizin)** — protez tırnak & manikür · kalıcı makyaj · cilt bakımı · lazer epilasyon. Açıklama var, **fiyat YOK**. KALIR.
3. **Galeri** — katı 3×2 ızgara, tırnak işi (kırmızı, pembe, nail art, French…). KALIR.
4. **Sahil şeridi** — tam genişlik, Mudanya denizinde manikürlü el. KALIR.
5. **Hakkında** — split: Seda Ardıç'ın salonu, Halitpaşa konumu, "tek yerde" hizmet. KALIR.
6. **Yorumlar** — **SİL** (40 yorum var ama birebir metin yok). Faruk getirince Chat 3.
7. **Randevu & iletişim** — koyu bölüm: adres, telefon(lar), WhatsApp, saatler, Instagram, gömülü harita + "Haritada aç". KALIR.
8. **Mobil alt çubuk** — Ara · WhatsApp · Yol tarifi. KALIR.

## İçerik (uydurma yok)
- H1: "Mudanya'da güzellik salonu"
- Hero p: 4 hizmet + "randevuyla çalışıyoruz"
- Hizmet açıklamaları: bio'daki 4 başlık, sade tanım. Tırnak açıklamasında fotoğraflardan görülen (jel, kalıcı oje, French, nail art). **Kalıcı makyaj / cilt / lazer'i sahada doğrula — görsel kanıt zayıf.**
- 4,5 / 40 Google (Maps, doğrulanabilir). Yorum metni yok.
- Seda Ardıç adı (Bulurum kaydından). Kuruluş yılı yok.
- Fiyat, "Mudanya'nın en iyisi", emoji, ünlem YOK.

## Görseller
| slot | dosya | ne |
|---|---|---|
| hero | assets/hero.jpg (post-02) | parlak nude manikür |
| g1..g6 | assets/g1-g6.jpg | tırnak işi çeşitleri |
| strip | assets/strip.jpg (post-11) | Mudanya sahilinde manikürlü el |
| about | assets/about.jpg (post-12) | French detay |
| og | hero'nun yatay hâli | 1200×630 |
Hepsi işletmenin kendi Instagram'ı (hepsi tırnak). Diğer hizmet görselleri sahada
çekilecek; teslimde söylenecek.

## Yayın
- Alan adı önerisi: `deluxeguzellikmudanya.com`
- Platform: **Netlify** (site adı `deluxe-guzellik-mudanya`)
- Repo: `deluxe-guzellik-mudanya-demo` (private)
