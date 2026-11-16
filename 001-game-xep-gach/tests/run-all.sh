#!/bin/sh
# Chạy toàn bộ test: sh tests/run-all.sh (từ thư mục 001-game-xep-gach)
cd "$(dirname "$0")/.." || exit 1
set -e
node tests/check-levels.js mobile.html > /dev/null && echo "check-levels OK"
node tests/check-econ.js mobile.html
for f in tests/t*.js; do node tests/run-headless.js "$f"; done
echo "ALL PASS"
