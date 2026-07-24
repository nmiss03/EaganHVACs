# Image assets

Drop image files you want on the site into **this folder** (`/public/images/`).

Next.js serves everything under `public/` at the site root, so a file saved as
`public/images/furnace-diagram.svg` is reachable at `/images/furnace-diagram.svg`
and can be wired into any page.

## How to add one
1. Upload the file here (via the GitHub web UI: **Add file → Upload files**, into
   `public/images/`).
2. Tell me the filename and which page/section it belongs on.
3. I'll wire it in (with proper `alt` text, responsive sizing, and lazy loading)
   and verify it on the page.

## What belongs here
Educational visuals only — **no stock photos, no technicians, no decorative
imagery.** Every image should teach something.

## Formats & naming
- Prefer **SVG** for diagrams/illustrations; **PNG/WebP** for screenshots.
- Lowercase, hyphenated names matching the "File" column below.
- Keep raster files < ~200 KB so page speed stays fast.

---

# Priority image plan (Phase 7)

These are the visuals that would genuinely improve comprehension, in priority
order. Each is a placeholder spec — **no image is fabricated here.** When you
upload one matching the filename, I'll wire it into the placement shown.

| # | Title / File | Purpose | Recommended type | Suggested size | Alt text | Placement |
|---|---|---|---|---|---|---|
| 1 | Repair-vs-Replace decision tree · `repair-vs-replace-tree.svg` | Turn the branch logic (age × repair cost → repair/replace) into a scannable tree; strong share/link candidate | Decision tree (inline SVG) | 1200×800, scales | "Decision tree: when to repair vs. replace an HVAC system based on age and repair cost" | `/tools/repair-or-replace` pillar (top) and the repair-or-replace article |
| 2 | Heat Pump vs Furnace comparison · `heat-pump-vs-furnace.svg` | Side-by-side of upfront cost, operating cost, rebates, cold-climate behavior | Comparison graphic (SVG) | 1200×800 | "Comparison of heat pump vs. gas furnace for a Minnesota home" | `/tools/heat-pump-vs-furnace` pillar; heat-pump content |
| 3 | System lifespan timeline · `hvac-lifespan-timeline.svg` | Install → typical range → replacement window on a time axis | Timeline (SVG) | 1200×400 | "Typical HVAC system lifespan timeline from install to replacement" | `/tools/system-lifespan` pillar |
| 4 | Cost breakdown · `hvac-cost-breakdown.svg` | Where the money goes: equipment vs. labor vs. permit vs. disposal | Data viz / stacked bar (SVG) | 1000×600 | "Breakdown of HVAC replacement cost by equipment, labor, permit, and disposal" | Cost guide article; Cost Estimator pillar |
| 5 | "How we research" process · `how-we-research.svg` | Make the methodology legible at a glance (sources → verify → publish → re-check) | Process diagram (SVG) | 1200×400 | "How Eagan HVACs researches and verifies its guidance" | `/about#methodology`; can back the "How we research" link |
| 6 | Cost Estimator result · `cost-estimator-result.png` | Demonstrate the product at the moment of intent; strong social/OG asset | Screenshot of our own tool (result state) | 1200×900 @2x | "The Eagan HVACs cost estimator showing a Twin Cities price range" | Cost guide article body; OG image for the tool |
| 7 | Quote Analyzer result · `quote-analyzer-result.png` | Show the completeness score + questions output | Screenshot of our own tool | 1200×900 @2x | "The Eagan HVACs quote analyzer scoring an HVAC quote's completeness" | Questions-to-ask article; hiring content |
| 8 | Rebate "Do I qualify?" tree · `rebate-qualify-tree.svg` | Route utility × equipment → applicable programs, visually | Decision tree (SVG) | 1200×800 | "Decision tree for which Minnesota HVAC rebates a homeowner may qualify for" | Rebates guide; near the Rebate Checker |
| 9 | Cold-climate heat pump illustration · `heat-pump-diagram.svg` | Show how a heat pump moves heat (and dual-fuel handoff) | Equipment illustration (SVG) | 1000×700 | "Diagram of how a cold-climate heat pump heats a home, with dual-fuel furnace backup" | Heat-pump service page; heat-pump-vs-furnace content |
| 10 | Minnesota heating-degree-days · `mn-climate-graphic.svg` | Local climate context (why sizing/cold-climate matters here) | Data viz (SVG) | 1000×600 | "Minnesota heating-degree-days by month, showing the demanding winter heating season" | City pages; heat-pump content |

**Notes**
- Fixed aspect ratios are specified so real images swap in with **zero layout
  shift** (Core Web Vitals).
- SVGs are strongly preferred for diagrams — crisp at any size, tiny, and they
  can adapt to light/dark. Screenshots (#6, #7) should be PNG/WebP at 2× for
  clarity, then compressed.
- I can also generate several of the SVG diagrams (#1, #3, #4, #5, #10) directly
  in code as inline SVG components — no upload needed — since they're built from
  our own data. Tell me which you'd like me to build vs. upload.
