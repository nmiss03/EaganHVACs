import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { absoluteUrl } from "@/lib/content";
import { site, bylineName } from "@/lib/site";

const path = "/editorial-policy";
const title = "Editorial Policy & Standards";
const description =
  "How Eagan HVACs researches, reviews, sources, dates, and corrects its HVAC cost guidance — and how we stay independent. Our editorial standards in plain language.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "article", title, description, url: absoluteUrl(path) },
};

const PRINCIPLES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clipboard",
    title: "Primary sources first",
    body: "Guidance is built from verifiable primary sources — utility program pages (Xcel Energy, CenterPoint Energy), the IRS, the Minnesota Departments of Commerce and Labor & Industry, ENERGY STAR, and manufacturer specifications — not recycled from other blogs. Sources are listed on our About page and cited at the point of the claim where practical.",
  },
  {
    icon: "dollar",
    title: "One reference dataset, honest ranges",
    body: "Every cost, lifespan, efficiency, and rebate figure comes from a single internal reference dataset, so a number cannot say one thing on a city page and another on a calculator. Prices are published as broad planning ranges, never fake single-dollar precision, because honest HVAC pricing is a range.",
  },
  {
    icon: "shield",
    title: "Independent, with no seller's incentive",
    body: "We are not an HVAC contractor and do not sell, install, or repair equipment, run a contractor network, or take commissions for referrals. Nothing we publish is shaped by a sale. If we ever introduce advertising or another revenue source, it will be clearly labeled and kept separate from editorial.",
  },
  {
    icon: "badgeCheck",
    title: "No fabrication, ever",
    body: "We do not invent statistics, prices, reviews, ratings, or testimonials, and we do not publish structured data that misrepresents what a page is. If a figure can't be verified from a primary source, we mark it as needing verification and link you to the source rather than guess.",
  },
];

const PROCESS: { step: string; body: string }[] = [
  {
    step: "Research",
    body: "We gather the relevant primary sources for the topic and the Twin Cities market specifically — cold-climate equipment behavior, local utilities, permits, and our long heating season.",
  },
  {
    step: "Write & reconcile",
    body: "Every quantitative claim is pulled from the shared reference dataset. New figures are reconciled against existing ones so the site stays internally consistent.",
  },
  {
    step: "Review",
    body: "Content is reviewed for accuracy, clarity, and whether it actually answers a real homeowner question before it publishes. Sections that don't earn their place are cut.",
  },
  {
    step: "Date & re-check",
    body: "Guides and tools carry a review date. We re-check when programs, prices, or best practices change — rebate amounts and tax-credit rules especially, since they move yearly.",
  },
];

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Editorial Policy", href: path },
        ]}
      />

      <PageHero
        eyebrow="Editorial standards"
        icon="clipboard"
        title="Our editorial policy"
        intro={[
          `How ${site.name} researches, sources, dates, and corrects its HVAC guidance — and how we stay independent. Content is researched and maintained by the ${bylineName()}, and reviewed before it publishes.`,
        ]}
      />

      {/* Principles */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="What we hold ourselves to"
            title="The standards behind every page"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex h-full flex-col rounded-xl border border-navy-900/[0.07] bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy-900">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle align="left" eyebrow="How content is made" title="From source to published page" />
            <ol className="mt-8 space-y-5">
              {PROCESS.map((s, i) => (
                <li key={s.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-accent-400">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-navy-900">{s.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Corrections */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle align="left" eyebrow="Corrections" title="Found something wrong? Tell us" />
            <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
              Accuracy matters more to us than being first. If you spot an out-of-date
              rebate, a price that no longer reflects the market, or anything incorrect,
              email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                {site.email}
              </a>{" "}
              and we&rsquo;ll verify it against the primary source and fix it. Material
              corrections are reflected in the page&rsquo;s review date.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
              For the full list of the sources we rely on and what you should always
              verify yourself, see our{" "}
              <Link href="/about#sources" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                methodology and sources
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTABand
        heading="Independent guidance you can check yourself."
        sub={`${site.name} is a free, independent resource for Minnesota homeowners — every figure is sourced, dated, and correctable.`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
