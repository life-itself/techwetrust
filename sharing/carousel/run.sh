#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=== Installing puppeteer ==="
npm install puppeteer 2>/dev/null

echo "=== Installing Chrome for Puppeteer ==="
npx puppeteer browsers install chrome 2>/dev/null

echo "=== Rendering carousel ==="
node render.mjs

echo ""
echo "=== Done! ==="
echo "Files created in: $(pwd)"
ls -lh carousel.mp4 carousel.gif 2>/dev/null
