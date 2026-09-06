#!/bin/bash
# launchd bunu çağırır. gonder.mjs'i çalıştırır, durum dosyasını commit'ler.
set -u
REPO="/Users/ahmetfarukdogan/Desktop/flyteq son"
cd "$REPO" || exit 1
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"

node otomasyon/whatsapp-ilk-mesaj/gonder.mjs "$@"
code=$?

git add otomasyon/durum/whatsapp-son-gonderim.md 2>/dev/null
if ! git diff --cached --quiet 2>/dev/null; then
  git commit -q -m "WhatsApp ilk mesaj: otomatik gönderim $(date +%F)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" && git push -q 2>/dev/null || true
fi
exit $code
