# Kullanılan tasarım yönleri

`avoid-ai-design` kataloğunun en sert uyarısı: **aynı "güvenli ayrıksı" yönü her seferinde
tekrar etmek, skill'in kendi slop'unu üretmesidir.** Bu dosya onu engeller.

**Kural: son 3 işletmede kullanılan yön tekrar seçilemez.** Yeni site yapmadan önce bu
tabloyu oku, kullanılmamış bir yön seç, sonra buraya satır ekle.

Yön listesi `~/.claude/skills/avoid-ai-design/references/aesthetic-directions.md` içinde:
brütalist · editoryal · Swiss · retro-fütürist · organik · lüks · oyuncu · art deco ·
endüstriyel · maksimalist · sıcak minimal · monospace/terminal

| tarih | işletme | sektör | yön | tip çifti | hâkim renk | imza detay |
|---|---|---|---|---|---|---|
| 2026-09-04 | Paris Kuaför Görükle | bayan kuaförü | **moda editoryali / lookbook** | Bodoni Moda + Archivo | kemik beyazı + vermilyon | dergi içindekiler sayfası olarak dev Bodoni rakamlar; kayan hizmet şeridi |
| 2026-09-04 | ~~Görükle Çiçekçi~~ *(iptal — sitesi çalışıyormuş)* | çiçekçi | **maksimalist** | Bricolage Grotesque + Karla | koyu şişe yeşili + fuşya | üst üste binen kolaj; renk bloklu satırlar; yüklenişte kademeli yerleşme |
| 2026-09-04 | Merikafit Pilates Görükle | pilates stüdyosu | **stüdyonun kendi ışığı** (karanlık oda + neon) | Familjen Grotesk + Figtree | mor gece `#150e24` + neon `#c9a6ff`, yeşil `#6f9a52` seyrek | işletmenin **kendi neon sloganı** başlık olarak, yüklenişte bir kez yanıyor |
| 2026-09-06 | İncir Cafe (Mudanya) | kafe / kahvaltı | **nostaljik kıyı / organik** | Gloock + Hanken Grotesk | krem `#f4efe2` + soluk deniz mavisi-yeşili `#dcebe8`/`#a9cfcb`, zeytin `#6f7d52` + marmelat `#bd7a24` %10 | zeytin dalı SVG bölüm işareti (kendi reçel etiketlerinden) + Mudanya karo çini şeridi (SVG, düşük opaklık) bölüm ayıracı; hero fotoğrafında kemer köşe |
| 2026-09-07 | Livane Pastanesi (Mudanya) | pastane / fırın | **art deco / klasik şekerci ambalajı** | DM Serif Display + Commissioner | sıcak krem `#f4e8d3`/`#faf3e6` + espresso `#2b1a12` + yanık altın `#b07d3a` %10 | yelpaze/güneş ışını deco cetvel (SVG, ince altın çizgiler yarım daireden) bölüm ayıracı, hero'daki bir kez kendini çiziyor; simetrik ortalanmış menü-kartı omurgası; tam genişlik dış cephe tabela şeridi |
| 2026-09-07 | EDZ Barbershop / Semih Ediz (Mudanya) | berber / erkek kuaförü | **endüstriyel / atölye iş kartı** | Anton + IBM Plex Sans + IBM Plex Mono | kömür `#161615`/`#242826` + teal `#23423f` (kendi duvar rengi) + pirinç/amber `#c98a3c` %10 | hizmet listesi bir atölye iş fişi: `01`/`02` monospace numaralar, kesikli çizgi ayraçlar, "// randevuda netleşir" yorum satırı; asimetrik 2 kolon hero (metin + tam-bleed koltuk); hareket YOK |
| 2026-09-07 | Boost Gym (Mudanya) | spor salonu / fitness | **brütalist / güç antrenmanı** | Big Shoulders Display + Public Sans | beton krem `#f2efe9`/`#e8e4dd` + siyah `#161514` + kırmızı `#d22e28` (kendi cephe bant rengi) %10 | kalın 8px kırmızı bant yapısal ayraç (kendi dış cephe bantları); dev kırmızı `01`/`02` bölüm numaraları; kırmızı slogan şeridinde işletmenin kendi duvar yazısı; **Merikafit karanlıktı diye bu AÇIK zeminli** |
| 2026-09-07 | Deluxe Güzellik Salonu (Mudanya) | güzellik salonu / tırnak | **Swiss / tipografik 12-kolon ızgara** | Archivo (wdth 125) + Work Sans | sıcak kağıt `#fbf8f5`/`#f2ece6` + koyu kahve `#211c1a` + terracotta/gül `#b06b4e` %10 | görünür 12 kolon ızgara + ince saç çizgisi ayraçlar; hizmetler "Swiss dizin" (başlık solda, numaralı liste sağda); `01 —`/`02 —` numaralandırma; tam genişlik Mudanya sahili foto şeridi; **Paris Kuaför editoryaldi — bu katı Swiss ızgara, farklı** |
| 2026-09-07 | Aslı Veteriner Muayenehanesi (Mudanya) | veteriner | **sıcak minimal / güven veren** | Newsreader + Manrope | sıcak krem `#faf6f1`/`#f1e9e0` + sıcak mürekkep `#39322e` + gül `#c97d8c` (kendi pembe rozetinden) + soluk mavi-gri `#7d94a6` (saatler bandı) | pati SVG logo (kendi logolarından sade); mavi tam genişlik "geç saate kadar açığız" saat bandı; 2×3 tek-çerçeve hizmet ızgarası (yüzen kart DEĞİL). **İncir organik-kıyıydı — bu yumuşak minimal, farklı.** İlk denemede H1'de serif-italik kelime vardı, T3 diye kaldırıldı |

## Marka rengi kuraldan önce gelir

Katalog mor/gradyan konusunda sert uyarıyor (**C1, C3**) — ama **işletmenin markası
zaten morsa, o mor bir refleks değil bir gözlemdir.** Merikafit'te logo, duvardaki
neon tabela ve stüdyo ışığı mor; paleti `arac/marka.mjs` ile indirilen kendi
fotoğraflarından örnekledim. Kobalt seçtiğim ilk deneme çöpe gitti.

Ayrım şu: rengi **örnekleyip belgeliyorsan** seçmişsindir. Katalog kuralı, rengi
*seçmeden* varsayılana düşmeye karşı. Yine de disiplin şart — gradyan yok, parlayan
kutu gölgesi yok, gövde metni AA kontrastında.

## Yasaklılar — yönden bağımsız, her sitede

Katalogdan çıkan, tekrar etmemesi gereken hamleler:

- Başlıkta tek kelimelik serif-italik vurgu (`<em>`) — **T3, Claude imzası**
- Renkli sol/üst kenarlıklı kart — **K4**
- Üç/dört özdeş ikonlu özellik kartı — **L2**
- Jenerik 3'lü istatistik şeridi — **L4** (tek gerçek sayıyı başka türlü sun)
- Refleks `backdrop-blur` menü — **K3**
- Her bölümde büyük harf, harf aralıklı etiket — **T5**
- Her bölümde aynı `fade-up` kaydırma animasyonu — **M1**
- Mor/indigo→mavi gradyan, gradyan başlık metni — **C1, C6**
- Inter / Roboto / system-ui tek başına; Space Grotesk, Geist, Syne, Sora,
  Instrument Serif, Fraunces'i "ayrıksı görüneyim" diye seçmek — **T1, T2**
- Sabit tek kapsayıcı genişliği (`max-w-7xl` refleksi) — **L6**
- CTA metnine yapıştırılmış ok karakteri (→) — **CP3**
- Her yüzeyde aynı köşe yuvarlaklığı + yumuşak gölge — **K2**

## Font havuzu (tekrar etmemek için)

Kullanıldı: ~~Bodoni Moda~~, ~~Archivo~~, ~~Bricolage Grotesque~~, ~~Karla~~, ~~Familjen Grotesk~~, ~~Figtree~~, ~~Gloock~~, ~~Hanken Grotesk~~, ~~DM Serif Display~~, ~~Commissioner~~, ~~Anton~~, ~~IBM Plex Sans~~, ~~IBM Plex Mono~~, ~~Big Shoulders Display~~, ~~Public Sans~~, ~~Archivo (Expanded)~~, ~~Work Sans~~, ~~Newsreader~~, ~~Manrope~~.

*(Public Sans + IBM Plex Mono ile bir Swiss denemesi yapıldı ama markanın moru göz ardı edildiği
için çöpe gitti — tekrar kullanılabilirler.)*

Başlık adayları: Newsreader · Public Sans · GT Sectra benzeri (Literata, Petrona) · Anton ·
Archivo Expanded · Rozha One · Familjen Grotesk ·
Big Shoulders Display · DM Serif Display · Zilla Slab · Unbounded · Gloock

Gövde adayları: Work Sans · IBM Plex Mono (teknik) · IBM Plex Sans · Hanken Grotesk ·
Source Sans 3 · Manrope · Figtree · Commissioner
