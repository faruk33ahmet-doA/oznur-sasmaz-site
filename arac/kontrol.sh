#!/usr/bin/env bash
# Demo site kalite kontrolü.  Kullanım: bash arac/kontrol.sh <slug>
set -uo pipefail

slug="${1:-}"
if [ -z "$slug" ]; then echo "kullanım: bash arac/kontrol.sh <slug>"; exit 2; fi

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# demo/<hafta>/<slug>/site — hafta klasörünü sen bilmek zorunda değilsin, aranır
site=""
for c in "$root"/demo/*/"$slug"/site "$root"/demo/"$slug"/site; do
  [ -f "$c/index.html" ] && { site="$c"; break; }
done
if [ -z "$site" ]; then
  echo "✗ bulunamadı: demo/*/$slug/site/index.html"
  echo "  mevcut işletmeler:"; ls -d "$root"/demo/*/*/ 2>/dev/null | sed "s|$root/|    |"
  exit 1
fi
html="$site/index.html"
fail=0
say(){ printf '%s\n' "$*"; }
bad(){ say "  ✗ $*"; fail=1; }
ok(){  say "  ✓ $*"; }

say "── $slug ──"

[ -f "$html" ] || { bad "index.html yok: $html"; exit 1; }

# 1) doldurulmamış token
say "1. Tokenler"
left=$(grep -o '{{[A-Z0-9_]*}}' "$html" | sort -u)
if [ -n "$left" ]; then
  bad "doldurulmamış token var:"; printf '      %s\n' $left
else ok "hepsi dolu"; fi

# 2) referans verilen görseller var mı
say "2. Görseller"
missing=0
while IFS= read -r src; do
  [ -z "$src" ] && continue
  case "$src" in http*|data:*) continue;; esac
  if [ ! -f "$site/$src" ]; then bad "eksik dosya: $src"; missing=1; fi
done < <(grep -o 'src="[^"]*\.\(jpg\|jpeg\|png\|webp\|avif\)"' "$html" | sed 's/src="//;s/"$//')
[ "$missing" -eq 0 ] && ok "referans verilen tüm görseller yerinde"

count=$(ls -1 "$site/assets" 2>/dev/null | wc -l | tr -d ' ')
if [ "${count:-0}" -lt 4 ]; then bad "assets/ içinde sadece $count dosya — en az 6 görsel hedefle"
else ok "assets/ içinde $count dosya"; fi

# 3) ağır görsel
say "3. Boyut"
heavy=$(find "$site/assets" -type f -size +600k 2>/dev/null)
if [ -n "$heavy" ]; then
  say "  ! 600KB üstü (sıkıştır: sips -Z 1600 --setProperty formatOptions 72):"
  printf '      %s\n' $heavy
else ok "tüm görseller 600KB altı"; fi

total=$(du -sh "$site" 2>/dev/null | cut -f1)
ok "toplam site boyutu: $total"

# 4) zorunlu alanlar
say "4. Zorunlu alanlar"
for pat in 'href="tel:+' 'maps' '<title>' 'og:image' 'application/ld+json'; do
  if grep -qi -- "$pat" "$html"; then ok "$pat"; else bad "eksik: $pat"; fi
done

# 5) placeholder metin sızıntısı
say "5. Sızıntı kontrolü"
for w in "lorem" "ipsum" "örnek metin" "TODO" "Kahve Durağı" "0555 111 22 33"; do
  if grep -qi -- "$w" "$html"; then bad "şablon/örnek metin kalmış: $w"; fi
done
grep -qi "lorem\|ipsum\|TODO\|0555 111 22 33" "$html" || ok "temiz"

# 6) alt metinleri
say "6. Erişilebilirlik"
# grep -c boş sonuçta "0" yazıp 1 döner; `|| echo 0` eklersek çıktı "0\n0" olur.
emptyalt=$(grep -c 'alt=""' "$html" || true)
if [ "${emptyalt:-0}" -gt 1 ]; then bad "$emptyalt adet boş alt=\"\""; else ok "alt metinleri dolu"; fi

say ""
if [ "$fail" -eq 0 ]; then say "SONUÇ: geçti ✓"; else say "SONUÇ: düzeltilecek madde var ✗"; fi
say "Önizleme:  python3 -m http.server 8080 --directory \"$site\"  → http://localhost:8080"
exit "$fail"
