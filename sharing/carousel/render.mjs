/**
 * Renders carousel.html to MP4 and GIF using Puppeteer + ffmpeg.
 *
 * Usage:
 *   npx puppeteer browsers install chrome
 *   node render.mjs
 *
 * Output: carousel.mp4 and carousel.gif
 */

import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import { mkdirSync, rmSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_FILE = resolve(__dirname, 'carousel.html');
const FRAMES_DIR = resolve(__dirname, '.frames');
const OUTPUT_MP4 = resolve(__dirname, 'carousel.mp4');
const OUTPUT_GIF = resolve(__dirname, 'carousel.gif');

const WIDTH = 1080;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_S = 12; // one full animation cycle
const TOTAL_FRAMES = FPS * DURATION_S;

async function main() {
  // Clean up and create frames directory
  rmSync(FRAMES_DIR, { recursive: true, force: true });
  mkdirSync(FRAMES_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${WIDTH},${HEIGHT}`],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  // Load the HTML file
  await page.goto(`file://${HTML_FILE}`, { waitUntil: 'networkidle0' });

  // Wait a moment for fonts to load
  await new Promise(r => setTimeout(r, 1000));

  // Pause all animations at t=0
  await page.evaluate(() => {
    document.getAnimations().forEach(a => a.pause());
  });

  console.log(`Capturing ${TOTAL_FRAMES} frames at ${FPS}fps...`);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    // Set all animations to the correct time
    const timeMs = (i / FPS) * 1000;
    await page.evaluate((t) => {
      document.getAnimations().forEach(a => {
        a.currentTime = t;
      });
    }, timeMs);

    // Small delay to let the browser render
    await new Promise(r => setTimeout(r, 20));

    const frameNum = String(i).padStart(5, '0');
    await page.screenshot({
      path: `${FRAMES_DIR}/frame_${frameNum}.png`,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    if (i % FPS === 0) {
      console.log(`  ${Math.round((i / TOTAL_FRAMES) * 100)}%`);
    }
  }

  console.log('  100%');
  await browser.close();

  // Stitch frames into MP4
  console.log('Creating MP4...');
  execSync(
    `ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%05d.png" ` +
    `-c:v libx264 -pix_fmt yuv420p -crf 18 "${OUTPUT_MP4}"`,
    { stdio: 'inherit' }
  );

  // Create GIF (smaller palette for file size)
  console.log('Creating GIF...');
  execSync(
    `ffmpeg -y -i "${OUTPUT_MP4}" ` +
    `-vf "fps=15,scale=540:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" ` +
    `"${OUTPUT_GIF}"`,
    { stdio: 'inherit' }
  );

  // Clean up frames
  rmSync(FRAMES_DIR, { recursive: true, force: true });

  console.log(`\nDone!\n  MP4: ${OUTPUT_MP4}\n  GIF: ${OUTPUT_GIF}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
