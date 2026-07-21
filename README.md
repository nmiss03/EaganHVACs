# Eagan HVACs

Premium marketing & lead-generation site for a local HVAC service in Eagan, MN.
Built with Next.js (App Router), TypeScript (strict), and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Inquiry email delivery

The inquiry form posts to `POST /api/inquiry`. Without configuration it logs
inquiries to the server console (fine for local dev). To deliver emails, set:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key — enables real email delivery |
| `INQUIRY_TO_EMAIL` | Inbox that receives inquiries (defaults to the site email) |
| `INQUIRY_FROM_EMAIL` | Verified sender address |

## Project structure

```
app/                 Routes, layout, API route, SEO (sitemap, robots, icons)
components/
  layout/            Header, Footer, StickyCTA, LegalPage
  sections/          Home page sections (Hero, Services, FAQ, InquiryForm, …)
  seo/               JSON-LD structured data
  ui/                Reusable primitives (Button, Container, Icon, Reveal, …)
lib/site.ts          All business content & site configuration in one place
```

Business details (phone, email, services, reviews, FAQs, service areas) live in
`lib/site.ts` — edit that file to update site content.

## Notes

- Server components by default; client JS is limited to the header menu, the
  inquiry form, and a tiny scroll-reveal wrapper.
- All imagery uses fixed-aspect placeholder containers, ready to be swapped
  for real photography without layout shift.
