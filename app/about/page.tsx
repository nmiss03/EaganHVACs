import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { StickyToc, type TocSection } from "@/components/cityguide/StickyToc";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { absoluteUrl, locations } from "@/lib/content";
import { site } from "@/lib/site";

const path = "/about";
const title = "About Eagan HVACs | Our Mission & Editorial Methodology";
const description =
  "Who we are, why an independent HVAC platform exists, and exactly how we research guides, build tools, and set cost ranges — plus our editorial standards and what to verify yourself.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    title,
    description,
    url: absoluteUrl(path),
    images: [`${site.url}/opengraph-image`],
  },
};

const SECTIONS: TocSection[] = [
  { id: "mission", label: "Our mission" },
  { id: "how-we-help", label: "How we help" },
  { id: "independence", label: "Why we stay independent" },
  { id: "referrals", label: "Our model" },
  { id: "methodology", label: "Methodology" },
  { id: "sources", label: "Sources" },
  { id: "editorial-standards", label: "Editorial standards" },
  { id: "transparency", label: "Transparency" },
  { id: "contact", label: "Contact" },
];

const HELP_CARDS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "gauge",
    title: "Free planning tools",
    body: "Cost estimators, a repair-or-replace calculator, and a lifespan estimator that give you an honest, Minnesota-specific answer in under a minute — no phone number, no signup.",
  },
  {
    icon: "clipboard",
    title: "Honest homeowner guides",
    body: "Plain-language cost breakdowns, rebate explainers, seasonal maintenance calendars, and troubleshooting help — written to inform a decision, not to sell you one.",
  },
  {
    icon: "badgeCheck",
    title: "A framework for comparing quotes",
    body: "A quote analyzer, a comparison checklist, and the exact questions to ask — so when you gather your own written quotes from local contractors, you can compare them fairly and spot the fair one.",
  },
];

const METHODOLOGY: { icon: IconName; title: string; points: string[] }[] = [
  {
    icon: "clipboard",
    title: "How our guides are researched",
    points: [
      "We start from published, verifiable sources: industry associations and standards, Minnesota utility program pages (Xcel Energy, CenterPoint), and manufacturer specifications for equipment sizing and efficiency.",
      "We write for the Twin Cities specifically — cold-climate heat pump behavior, sidewall-vent snow blockages, and our long heating season — rather than recycling generic national copy.",
    ],
  },
  {
    icon: "dollar",
    title: "How cost ranges are determined",
    points: [
      "Every price we publish is a regional planning range, deliberately kept broad to reflect the real spread across home size, efficiency tier, ductwork, and season.",
      "These ranges are not quotes. The only real number is a written quote after a technician has seen your system — which is exactly why comparing two or three quotes matters.",
    ],
  },
  {
    icon: "gauge",
    title: "How our tools are built",
    points: [
      "Our calculators apply published rules of thumb — typical equipment lifespans, the repair-cost-versus-age heuristic, and Twin Cities installed-price bands.",
      "The logic is transparent: each tool explains the assumptions behind its output, and none of them capture your contact information to produce a result.",
    ],
  },
  {
    icon: "badgeCheck",
    title: "One reference dataset behind every number",
    points: [
      "Every cost range, equipment lifespan, efficiency rating, and rebate figure on the site is drawn from a single internal reference dataset — so a number can't say one thing on a city page and another on a calculator.",
      "When a figure changes, it changes in one place and updates everywhere, and the reconciliation is documented rather than silently overwritten.",
    ],
  },
  {
    icon: "clock",
    title: "Review & update cadence",
    points: [
      "Content is reviewed periodically and revised when programs, prices, or best practices change. The date on each guide and tool reflects its most recent review.",
      "The information across this site is current as of July 2026.",
    ],
  },
];

/** Primary sources we rely on — cited so readers can verify them directly. */
const SOURCES: { label: string; detail: string; href: string }[] = [
  {
    label: "Xcel Energy",
    detail: "Minnesota electric rebate programs for heat pumps, AC, and thermostats.",
    href: "https://www.xcelenergy.com",
  },
  {
    label: "CenterPoint Energy",
    detail: "Minnesota natural-gas rebates for high-efficiency furnaces and boilers.",
    href: "https://www.centerpointenergy.com",
  },
  {
    label: "IRS — Energy Efficient Home Improvement Credit (25C)",
    detail: "Federal tax-credit rules and history (the credit expired after 2025).",
    href: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
  },
  {
    label: "Minnesota Dept. of Commerce",
    detail: "State energy programs and the pending Home Energy Rebates (HEAR).",
    href: "https://mn.gov/commerce/",
  },
  {
    label: "Minnesota Dept. of Labor & Industry (DLI)",
    detail: "Contractor licensing lookup and mechanical permit requirements.",
    href: "https://www.dli.mn.gov",
  },
  {
    label: "ENERGY STAR",
    detail: "Equipment efficiency criteria (AFUE, SEER2, HSPF2) and product standards.",
    href: "https://www.energystar.gov",
  },
];

const VERIFY: string[] = [
  "Current rebate and tax-credit amounts — confirm figures with Xcel Energy, CenterPoint Energy, and the IRS before you buy, since programs change yearly.",
  "Contractor licensing — verify any contractor's license directly with the Minnesota Department of Labor and Industry (DLI) license lookup.",
  "Actual pricing — treat our ranges as a map, and rely on written, itemized quotes for the real cost of your specific job.",
];

const STANDARDS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "No fabricated reviews or rankings",
    body: "We do not invent testimonials, star ratings, or \"best of\" rankings. If we haven't verified something, we don't publish it as fact.",
  },
  {
    icon: "dollar",
    title: "No pay-for-placement, ever",
    body: "We don't rank contractors, run a \"top companies\" list, or take money to feature anyone. No business can buy a mention, a better position, or an endorsement on this site.",
  },
  {
    icon: "check",
    title: "Clear disclosure",
    body: "We're upfront that we're an independent information resource — not an HVAC contractor and not a lead broker. The work is always done by the licensed pros you choose and vet yourself.",
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Eagan HVACs",
    url: absoluteUrl(path),
    description,
    mainEntity: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About & Methodology", href: path },
        ]}
      />

      <PageHero
        eyebrow="About Us"
        icon="badgeCheck"
        title="An independent HVAC platform, built for Minnesota homeowners"
        intro={[
          `${site.name} is a free, independent resource that helps Twin Cities homeowners understand their heating and cooling options and compare the quotes they gather from licensed local contractors. We don't perform HVAC work ourselves — and that independence is the whole point.`,
        ]}
      />

      <StickyToc sections={SECTIONS} meta={{ updated: "July 2026", readMinutes: 6 }} />

      {/* Mission */}
      <section id="mission" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Our mission"
              title="Why we exist"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                Replacing a furnace or air conditioner is one of the larger
                purchases a homeowner makes, yet the process is stacked against
                them: prices are hidden until you're on the phone, high-pressure
                sales tactics are common, and it's genuinely hard to tell a fair
                quote from an inflated one.
              </p>
              <p>
                We founded {site.name} in 2026 to fix that information gap for the
                south metro. Our mission is simple — give homeowners the honest
                costs, free planning tools, and plain-language guidance they need
                to make a confident decision <em>before</em> anyone quotes them,
                then make it easy to compare trustworthy local pros side by side.
              </p>
              <p>
                Everything here is free for homeowners, written for Minnesota's
                climate, and structured so our interests line up with yours.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How we help */}
      <section id="how-we-help" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="How we help"
            title="Three ways we make HVAC decisions easier"
            description="Learn first, decide on your terms, and compare quotes only when you're ready."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
            {HELP_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Independence */}
      <section id="independence" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Why we stay independent"
              title="We don't do the work — on purpose"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                {site.name} is not an HVAC contractor. We don't dispatch our own
                technicians, sell equipment, or perform installations. That's a
                deliberate design choice, not a limitation.
              </p>
              <p>
                Because we never do the work, we have no system to sell you and no
                incentive to upsell. We don't earn more when you buy a bigger unit
                or approve an unnecessary repair. Our only job is to help you
                understand your options and choose well — so the guidance you read
                here is free of the conflict that shapes so much HVAC advice.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-accent-200 bg-accent-50/50 p-6">
              <p className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-800">
                <Icon
                  name="shield"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
                  strokeWidth={2}
                />
                <span>
                  Independence in one line: <strong>the contractors you choose do
                  the work; we just help you choose.</strong> No upsell incentive,
                  because there's nothing for us to upsell.
                </span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Referral philosophy */}
      <section id="referrals" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Our model"
              title="Free for homeowners, and genuinely independent"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                Using {site.name} is always free for homeowners — there is no fee
                to use our tools, read our guides, or download the Buyer&rsquo;s Kit,
                and there&rsquo;s nothing to buy.
              </p>
              <p>
                We&rsquo;re an independent information resource, not a contractor and
                not a lead broker. We don&rsquo;t sell, install, or repair equipment,
                and we don&rsquo;t take commissions for sending you to any company — so
                nothing here is designed to steer you toward a sale.
              </p>
              <p>
                At every step, you&rsquo;re the one deciding. You use the tools and
                guides to understand your options, gather your own written quotes
                from local contractors, and choose who — if anyone — to hire. Our
                job is done once you have the information to choose with confidence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Methodology — major anchored section */}
      <section id="methodology" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Methodology"
            title="How this content is actually made"
            description="Trust should be earned, so here's exactly how we research guides, set cost ranges, and build the tools you rely on."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
            {METHODOLOGY.map((block) => (
              <div
                key={block.title}
                className="flex h-full flex-col rounded-xl border border-navy-900/[0.07] bg-white p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name={block.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {block.title}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {block.points.map((point) => (
                    <li
                      key={point.slice(0, 24)}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <Icon
                        name="check"
                        className="mt-1 h-4 w-4 shrink-0 text-accent-500"
                        strokeWidth={2.4}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* What to verify independently */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-navy-900/[0.08] bg-slate-50 p-6 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-bold text-navy-900">
              What you should verify independently
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We aim to be accurate, but some things change faster than any guide
              and some things only apply to your exact situation. Always confirm
              these yourself:
            </p>
            <ul className="mt-5 space-y-3">
              {VERIFY.map((item) => (
                <li
                  key={item.slice(0, 24)}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-800"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources we cite */}
          <div id="sources" className="mx-auto mt-10 max-w-4xl scroll-mt-32">
            <h3 className="font-display text-xl font-bold text-navy-900">
              Sources we cite
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Our guidance is built from primary sources — the utilities, agencies,
              and standards bodies that actually set the programs and specifications.
              Here are the main ones, so you can check them yourself.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {SOURCES.map((s) => (
                <li key={s.label} className="rounded-xl border border-navy-900/[0.08] bg-white p-4 shadow-card">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-sm font-bold text-navy-900 underline decoration-accent-300 underline-offset-2 hover:text-accent-700"
                  >
                    {s.label}
                  </a>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Editorial standards */}
      <section id="editorial-standards" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Editorial standards"
            title="The rules we hold ourselves to"
            description="Honest by structure, not just by promise — these standards are how we keep it that way."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
            {STANDARDS.map((s) => (
              <div
                key={s.title}
                className="flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparency statement */}
      <section id="transparency" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Transparency"
              title="Where we stand"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                {site.name} is an independent information resource for homeowners
                across {locations.length} south-metro cities. We are not a licensed
                HVAC contractor, we don&rsquo;t perform heating or cooling work, and we
                don&rsquo;t operate a contractor network or sell your information as a
                lead.
              </p>
              <p>
                The site is free for homeowners. We don&rsquo;t charge you, we
                don&rsquo;t take commissions from contractors, and we don&rsquo;t accept
                payment to influence our guidance or what we publish as fact. If we
                ever introduce advertising or another revenue source, it will be
                clearly labeled and kept separate from our editorial work. If we get
                something wrong, we want to hear about it and fix it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Contact"
              title="Questions, corrections, or feedback"
            />
            <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
              Our team reads every message. Reach out any time — especially if you
              spot something that should be updated.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-xl border border-navy-900/[0.08] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Email
                  </span>
                  <span className="block truncate font-display text-sm font-bold text-navy-900">
                    {site.email}
                  </span>
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-xl border border-navy-900/[0.08] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Phone
                  </span>
                  <span className="block font-display text-sm font-bold text-navy-900">
                    {site.phone}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        heading="Learn first. Compare quotes when you're ready."
        sub={`${site.name} is a free, independent resource that helps Twin Cities homeowners understand costs and compare the quotes they gather from licensed local contractors — no cost, no obligation.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    </>
  );
}
