# Image assets

Drop image files you want on the site into **this folder** (`/public/images/`).

Next.js serves everything under `public/` at the site root, so a file saved as
`public/images/furnace-diagram.svg` is reachable at `/images/furnace-diagram.svg`
and can be wired into any page.

## How to add one
1. Upload the file here (via the GitHub web UI: **Add file → Upload files**, into
   `public/images/`).
2. Tell me the filename and which page/section it belongs on, plus a one-line
   description for its alt text.
3. I'll wire it in (with proper `alt` text, responsive sizing, and lazy loading)
   and verify it on the page.

## What belongs here (per the image strategy)
Educational visuals only — **no stock photos, no technicians, no decorative
imagery.** Good candidates:
- Screenshots of our own calculators (result states)
- Decision trees / flowcharts (repair-vs-replace, "do I qualify?")
- Comparison graphics and cost breakdowns
- Process diagrams ("how we research")
- Equipment illustrations (SVG preferred)
- Minnesota climate / data graphics

## Formats & naming
- Prefer **SVG** for diagrams/illustrations (crisp, tiny, theme-friendly);
  **PNG/WebP** for screenshots.
- Use lowercase, hyphenated names: `repair-vs-replace-tree.svg`,
  `cost-estimator-result.png`.
- Keep raster files reasonably sized (target < 200 KB) so page speed stays fast.
