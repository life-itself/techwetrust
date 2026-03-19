import { chromium } from 'playwright';
import { resolve } from 'path';

const WIDTH = 1440;
const HEIGHT = 1080;
const SLIDE_COUNT = 38;
const OUTPUT = 'in-tech-we-trust-presentation-2026-03-18.pdf';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
  });

  const filePath = resolve('in-tech-we-trust-presentation-2026-03-18.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.waitForTimeout(2000);

  // Disable scroll-snap and smooth scrolling so we can position precisely
  await page.addStyleTag({
    content: `
      html { scroll-snap-type: none !important; scroll-behavior: auto !important; }
      .slide { scroll-snap-align: none !important; }
      .keyboard-hint { display: none !important; }
      .nav-dots { display: none !important; }
      .progress-bar { display: none !important; }
      /* Make all reveals visible for PDF */
      .reveal, .reveal-slow, .reveal-scale {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .slide-list li {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .slide-section .section-title,
      .slide-subsection .subsection-title {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    `,
  });

  // Screenshot each slide and combine into PDF
  const screenshots = [];
  for (let i = 0; i < SLIDE_COUNT; i++) {
    // Scroll to exact slide position
    await page.evaluate((idx) => {
      const slide = document.querySelectorAll('.slide')[idx];
      if (slide) slide.scrollIntoView({ behavior: 'instant' });
    }, i);
    await page.waitForTimeout(300);

    const screenshot = await page.screenshot({ type: 'png' });
    screenshots.push(screenshot);
    process.stdout.write(`Captured slide ${i + 1}/${SLIDE_COUNT}\n`);
  }

  // Create a new page that lays out all screenshots for PDF printing
  const pdfPage = await browser.newPage();
  const imagesHtml = screenshots
    .map((buf, i) => {
      const b64 = buf.toString('base64');
      return `<div class="page"><img src="data:image/png;base64,${b64}"></div>`;
    })
    .join('\n');

  await pdfPage.setContent(`
    <html>
    <style>
      * { margin: 0; padding: 0; }
      @page { size: ${WIDTH}px ${HEIGHT}px; margin: 0; }
      .page {
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        page-break-after: always;
        overflow: hidden;
      }
      .page:last-child { page-break-after: auto; }
      .page img { width: 100%; height: 100%; object-fit: contain; }
    </style>
    <body>${imagesHtml}</body>
    </html>
  `, { waitUntil: 'load' });

  await pdfPage.pdf({
    path: OUTPUT,
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
  });

  console.log(`\nSaved ${OUTPUT} (${SLIDE_COUNT} slides at ${WIDTH}x${HEIGHT})`);
  await browser.close();
}

main().catch(console.error);
