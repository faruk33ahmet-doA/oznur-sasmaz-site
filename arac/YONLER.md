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

Kullanıldı: ~~Bodoni Moda~~, ~~Archivo~~, ~~Bricolage Grotesque~~, ~~Karla~~, ~~Familjen Grotesk~~, ~~Figtree~~.

*(Public Sans + IBM Plex Mono ile bir Swiss denemesi yapıldı ama markanın moru göz ardı edildiği
için çöpe gitti — tekrar kullanılabilirler.)*

Başlık adayları: Newsreader · Public Sans · GT Sectra benzeri (Literata, Petrona) · Anton ·
Archivo Expanded · Rozha One · Familjen Grotesk ·
Big Shoulders Display · DM Serif Display · Zilla Slab · Unbounded · Gloock

Gövde adayları: Work Sans · IBM Plex Mono (teknik) · IBM Plex Sans · Hanken Grotesk ·
Source Sans 3 · Manrope · Figtree · Commissioner
