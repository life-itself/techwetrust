# Sharing Carousel

A short animated carousel for social media (Instagram, LinkedIn, Twitter/X) promoting the "In Tech We Trust" white paper and roundtable.

## What it is

A 12-second looping video (1080x1080, square format) with 4 slides that cycle automatically:

1. **Hook**: "What's stopping us from governing AI?"
2. **Twist**: "~~Not bad policy. Not bad tech.~~" (struck through)
3. **Reveal**: "It's a culture that worships technology like a god."
4. **CTA**: Praying hands image + "In Tech We Trust" title + authors

## How it's built

The carousel is a single HTML file (`carousel.html`) with CSS animations. Each slide fades in, holds for ~2.5 seconds, then fades out. The design matches the report cover:

- Background: `#e23232` (sampled from the cover image)
- Font: Source Serif 4 (clean, readable serif)
- Black text on red, matching the cover aesthetic
- Praying hands image cropped from `assets/tech-we-trust-cover.jpg`

To convert the animated HTML into video, `render.mjs` uses Puppeteer to:

1. Open `carousel.html` in a headless browser
2. Step through the CSS animation frame-by-frame (360 frames at 30fps)
3. Screenshot each frame
4. Stitch frames into MP4 using ffmpeg
5. Generate a half-size GIF from the MP4

## Prerequisites

- Node.js
- ffmpeg (`brew install ffmpeg`)

## Usage

```bash
cd sharing/carousel
npm install
npx puppeteer browsers install chrome
node render.mjs
```

This produces:

- `carousel.mp4` — full quality 1080x1080, suitable for Instagram/LinkedIn video posts
- `carousel.gif` — 540x540, smaller file size for platforms that support GIF

You can also preview the animation directly by opening `carousel.html` in a browser.

## Editing

To change the slide content or timing, edit `carousel.html`. The key CSS variables:

- `--red`: background color
- Animation duration is 12s total (3s per slide), controlled by the `cycle` keyframes and `animation-delay` on each `.slide`

To change the output resolution or framerate, edit the constants at the top of `render.mjs`.
