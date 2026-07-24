import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { FaqList } from "@/components/landing/FaqList";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCityGuide } from "@/lib/city-guides";
import { absoluteUrl, getLocation, locations } from "@/lib/content";
import { services, site, whyUs } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  const title = `HVAC Repair in ${location.name}, MN | Furnace & AC Service`;
  const description = `Trusted HVAC repair and installation in ${location.name}, MN. Local furnace repair, AC service, and 24/7 emergency help from vetted ${location.county} pros. Free quotes.`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/locations/${location.slug}`),
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`/locations/${location.slug}`),
    url: absoluteUrl(`/locations/${location.slug}`),
    name: `HVAC Guide for ${location.name}, MN Homeowners`,
    description: `An independent local guide to heating and cooling in ${location.name}, ${location.county}: climate, common HVAC issues, costs, rebates, permits, and how to hire a qualified local contractor.`,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "City", name: `${location.name}, Minnesota` },
    inLanguage: "en-US",
  };

  const localFaqs = [
    {
      question: `Where can I get emergency HVAC service in ${location.name}?`,
      answer: `Many Twin Cities HVAC companies offer 24/7 emergency service. For a no-heat or no-cooling emergency in ${location.name}, call a licensed local contractor directly and they'll prioritize it — our cost guides help you recognize a fair price even in a rush.`,
    },
    {
      question: `How much does HVAC work cost in ${location.name}?`,
      answer: `Costs in ${location.name} track the broader Twin Cities market — roughly $4,000–$9,000 for a furnace and $4,500–$9,500 for central AC installed, before rebates. Use our free cost estimator for a range tailored to your home.`,
    },
    {
      question: `How do I find a licensed HVAC contractor in ${location.name}?`,
      answer: `Ask any contractor for their Minnesota license number and proof of insurance, get the quote in writing, and compare at least two or three. Our free quote analyzer and contractor-questions guide walk you through exactly what to check.`,
    },
  ];

  const nearbyLinks = location.nearby
    .map((name) => locations.find((l) => l.name === name))
    .filter((l): l is (typeof locations)[number] => Boolean(l));

  const cityGuide = getCityGuide(location.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Area", href: "/locations" },
          { label: `${location.name}, MN`, href: `/locations/${location.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`${location.name}, ${location.county}`}
        icon="mapPin"
        title={`HVAC Repair & Installation in ${location.name}, MN`}
        intro={[location.intro]}
      />

      {/* City buyer's guide feature card */}
      {cityGuide ? (
        <section className="bg-white pt-16 lg:pt-20">
          <Container>
            <Link
              href={`/locations/${location.slug}/best-hvac-companies`}
              className="group flex flex-col gap-5 rounded-2xl border border-accent-200 bg-accent-50/50 p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400 shadow-glow">
                <Icon name="clipboard" className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-700">
                  <Icon name="sparkles" className="h-3.5 w-3.5" />
                  New guide
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  How to choose an HVAC company in {location.name}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  A free homeowner's guide to evaluating and comparing local
                  contractors honestly — what to check, how to compare quotes,
                  red flags, and a printable interview checklist.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-800">
                Read the guide
                <Icon name="arrowRight" className="h-4 w-4 text-accent-400" />
              </span>
            </Link>
          </Container>
        </section>
      ) : null}

      {/* Services offered locally */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Local services"
            title={`HVAC services ${location.name} homeowners search for`}
            description={`From furnace repair to full system replacement, here's what each service involves and what to expect from a qualified local contractor in ${location.name}.`}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                  Learn more
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Local context + neighborhoods */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                align="left"
                eyebrow="Local knowledge"
                title={`Serving homeowners across ${location.name}`}
              />
              <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                {location.localNote}
              </p>
              <div className="mt-6">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-700">
                  Local neighborhoods
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {location.neighborhoods.map((n) => (
                    <li
                      key={n}
                      className="rounded-full border border-navy-900/[0.08] bg-white px-3.5 py-1.5 text-sm text-navy-800"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 rounded-xl border border-navy-900/[0.08] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
                  Local snapshot
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">County</dt>
                    <dd className="font-semibold text-navy-900">{location.county}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Cost &amp; rebate market</dt>
                    <dd className="text-right font-semibold text-navy-900">Twin Cities metro</dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-navy-900/[0.06] pt-3 text-sm leading-relaxed text-slate-600">
                  Pricing and incentives in {location.name} track the wider Twin Cities
                  market. Use the{" "}
                  <Link
                    href="/tools/hvac-cost-estimator"
                    className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800"
                  >
                    cost estimator
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/minnesota-hvac-rebate-database"
                    className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800"
                  >
                    rebate database
                  </Link>{" "}
                  for local numbers.
                </p>
              </div>
            </div>
            <ul className="space-y-6">
              {whyUs.map((item) => (
                <li key={item.title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-card">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <FaqList
        title={`HVAC in ${location.name} — common questions`}
        faqs={localFaqs}
      />

      {/* Nearby cities internal links */}
      {nearbyLinks.length > 0 ? (
        <section className="bg-slate-50 py-16 lg:py-20">
          <Container>
            <SectionTitle eyebrow="Nearby" title="We also serve these nearby cities" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyLinks.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent-500" />
                  <span className="font-display text-sm font-bold text-navy-900">
                    {l.name}, MN
                  </span>
                  <Icon
                    name="arrowRight"
                    className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTABand
        heading={`Planning an HVAC project in ${location.name}?`}
        sub={`Use our free tools and honest cost guides to plan your project and hire the right ${location.county} contractor with confidence — no sales calls, no obligation.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
