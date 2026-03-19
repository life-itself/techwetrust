# In Tech we Trust

In Tech We Trust paper, research and talks.

This essay explores our late modern relationship with technology, and asks what kind of inner shift might help a future society to find a wiser path.

## Materials

- White Paper: paper.md
    - Published here https://secondrenaissance.net/papers/tech
    - Announcements are here: https://news.lifeitself.org/p/new-white-paper-in-tech-we-trust (but essentially identical to launch page).
- Talk in 2024: https://docs.google.com/presentation/d/1llOM7hCN9cbWtAT1BNd0C73VEGKFvAX5eXK7L6UZB04/edit?slide=id.g3011f0d607d_0_10#slide=id.g3011f0d607d_0_10

## Slides

The presentation slides are built as a single self-contained HTML file (`in-tech-we-trust-presentation-2026-03-18.html`) with all CSS and JS inline. Images are in `assets/slides/`.

- **View**: open `in-tech-we-trust-presentation-2026-03-18.html` in a browser. Navigate with arrow keys, space, or scroll.
- **Edit content**: edit `in-tech-we-trust-presentation-2026-03-18.md` (the source of truth for slide content), then update the HTML file to match.
- **Edit styling**: edit the CSS variables in `:root` at the top of the HTML file.

### Exporting to PDF

Uses Playwright to screenshot each slide at 4:3 (1440x1080) and assemble into a PDF.

```sh
# Prerequisites (one-time)
npm install playwright
npx playwright install chromium

# Generate PDF
node export-pdf.mjs
```

This produces `in-tech-we-trust-presentation-2026-03-18.pdf`.

### Image credits

- Trinity/Nagasaki: US Government, public domain, via Wikimedia Commons
- Earthrise (Apollo 8): William Anders / NASA, public domain, via Wikimedia Commons
- Thich Nhat Hanh: Duc (Pixiduc), CC BY 2.0, via Wikimedia Commons
- Wildfire (Rim Fire): US Forest Service, public domain, via Wikimedia Commons
- Phone at night: Unsplash
- Bali rice terraces: Radoslav Bali, Unsplash
- Galloping horse painting: Fen Zeng
- Medieval castle (Carcassonne): Unsplash
- Mycelium cyanotype: source TBC
- Praying hands: In Tech We Trust cover art

### Abstract

Modern humanity doesn’t simply make use of technology; we perceive the world in its image, and invest it with sacred authority to guide our choices. Now we’re approaching a precipice, with tech galloping ahead of our capacity to use it wisely. A new essay explores the foundations of these dysfunctional tendencies within the modern cultural paradigm, and considers the shifts in worldview and inner capacity that might support a future society to choose more wisely the forces we unleash.

### Summary

[Copied from publication page but excluding intro]

As far back as we can trace homo sapiens, we find evidence that technology has been part of human existence. But the speed and scale at which it shapes our lives today is unprecedented. Once a helpful servant, tech has become a dysfunctional master; a cultural ideology in its own right. It’s no longer an exaggeration to suggest that modern technology is a god -- commanding faith, reverence and moral authority, and eclipsing human values in our collective choices. A residual faith in human reason sustains the illusion of freedom, while the tools we invite into our lives distort our attention, behaviour and relationship with each other and the world. 

The acceleration of AI brings this pattern into sharp focus; fuelled by a race-to-the-bottom dynamic where competition overwhelms collective restraint.

Our collective action problems are rooted in a worldview of separateness -- but there are other ways to see ourselves. The paradigm shift we need is intimated in the Buddhist concept of *interbeing.* The understanding that nothing exists in isolation contains, by extension, a simple truth: nobody wins a competition that ends in shared destruction.

A future society that survives its own technologies will understand that freedom depends not only upon choice, but the capacity to choose wisely -- grounded in a fuller account of human nature, and our radical interdependency.

