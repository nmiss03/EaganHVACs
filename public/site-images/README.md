# Site images

Upload image files you want on the site into **this folder**
(`/public/site-images/`).

Next.js serves everything under `public/` at the site root, so a file saved as
`public/site-images/example.webp` is reachable at `/site-images/example.webp`
and can be wired into any page.

## How to add one
1. Upload the file here (GitHub web UI: **Add file → Upload files**, into
   `public/site-images/`).
2. Tell me the filename and which page/section it belongs on.
3. I'll wire it in (with proper `alt` text, responsive sizing via `next/image`,
   fixed aspect ratio so it never shifts layout, and lazy loading) and verify it
   on the page.

## What belongs here (accuracy rules)
This site is an **independent** HVAC decision platform, so every image has to
pass the same bar as the writing:

- **No full-page mockups.** Upload the actual graphic (a diagram, a chart, a
  photo, a ribbon) — not a screenshot of a fake webpage with a fake nav bar.
- **No contractor / lead-gen calls to action** baked into the image
  (e.g. "Find Local Pros", "Get quotes from trusted professionals"). We are not
  a contractor and don't run a pro network.
- **No figures that contradict the site's data.** Any cost, lifespan, or
  efficiency number shown *in* an image must match the canonical values in
  `lib/hvac-data.ts` (e.g. cold-climate heat pump **$8,000–$18,000**, not
  "$6,000–$12,000"). When in doubt, leave numbers off the image and let the page
  state them.
- **No unverified stats** (e.g. "10,000+ homeowners helped", "$1,000+ saved").
- **Educational or brand imagery only** — no stock "smiling technician" filler.

If a graphic would be more accurate rebuilt in code (comparison tables, decision
trees), I can generate it as native inline SVG from our own data instead.

## Formats & naming
- Prefer **SVG** for diagrams; **WebP/PNG** for photos and ribbons.
- Lowercase, hyphenated filenames (e.g. `heat-pump-vs-furnace.svg`).
- Keep raster files small (roughly **< 250 KB**) so page speed stays fast — I can
  compress/convert on upload if needed.

## Currently in use
| File | Where it's used |
|---|---|
| `home-ribbon.webp` | Homepage top masthead ribbon |
| `home-hvac-collage.webp` | Homepage "What we help you decide" visual band |
