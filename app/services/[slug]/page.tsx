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
import { ResearchSnapshot } from "@/components/ui/ResearchSnapshot";
import { ToolCard } from "@/components/tools/ToolCard";
import { absoluteUrl, getServiceDetail, allServiceDetails, locations } from "@/lib/content";
import { site } from "@/lib/site";
import { getArticle } from "@/lib/articles";
import { getTool } from "@/lib/tools";
import { faqPageSchema } from "@/lib/schema";

/** Service → the tools and guides that best satisfy that service's intent. */
const SERVICE_LINKS: Record<string, { tools: string[]; articles: string[] }> = {
  "furnace-repair": {
    tools: ["repair-or-replace", "hvac-quote-analyzer", "hvac-cost-estimator"],
    articles: ["furnace-repair-cost", "furnace-not-working-troubleshooting", "questions-to-ask-hvac-contractor"],
  },
  "ac-repair": {
    tools: ["repair-or-replace", "hvac-quote-analyzer", "hvac-cost-estimator"],
    articles: ["ac-repair-cost", "ac-not-cooling", "questions-to-ask-hvac-contractor"],
  },
  "installation-replacement": {
    tools: ["hvac-cost-estimator", "heat-pump-vs-furnace", "hvac-quote-analyzer"],
    articles: ["furnace-replacement-cost", "ac-replacement-cost", "hvac-cost-guide-minnesota"],
  },
  "maintenance-tune-ups": {
    tools: ["system-lifespan", "repair-or-replace"],
    articles: ["minnesota-hvac-maintenance-calendar", "furnace-repair-cost"],
  },
  "indoor-air-quality": {
    tools: ["hvac-cost-estimator"],
    articles: ["minnesota-hvac-maintenance-calendar"],
  },
  "emergency-hvac": {
    tools: ["repair-or-replace", "hvac-quote-analyzer"],
    articles: ["furnace-not-working-troubleshooting", "ac-not-cooling", "furnace-repair-cost"],
  },
  "heat-pumps": {
    tools: ["heat-pump-vs-furnace", "minnesota-hvac-rebate-checker", "hvac-cost-estimator"],
    articles: ["heat-pump-replacement-cost", "minnesota-hvac-rebates", "hvac-cost-guide-minnesota"],
  },
  "thermostats": {
    tools: ["minnesota-hvac-rebate-checker"],
    articles: ["minnesota-hvac-rebates"],
  },
  "duct-cleaning": {
    tools: ["hvac-quote-analyzer"],
    articles: ["minnesota-hvac-maintenance-calendar"],
  },
};

/** A handful of top city guides to seed the service × city topical graph. */
const FEATURED_CITY_SLUGS = ["eagan", "burnsville", "bloomington", "apple-valley", "lakeville", "savage"];

export function generateStaticParams() {
  return allServiceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`/services/${service.slug}`),
    url: absoluteUrl(`/services/${service.slug}`),
    name: service.h1,
    description: service.metaDescription,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "Thing", name: service.title },
    inLanguage: "en-US",
  };

  const faqSchema = faqPageSchema(service.faqs);

  const otherServices = allServiceDetails.filter((s) => s.slug !== service.slug);

  const links = SERVICE_LINKS[service.slug] ?? { tools: [], articles: [] };
  const relatedTools = links.tools
    .map(getTool)
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const relatedArticles = links.articles
    .map(getArticle)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const featuredCities = FEATURED_CITY_SLUGS
    .map((s) => locations.find((l) => l.slug === s))
    .filter((l): l is (typeof locations)[number] => Boolean(l));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <PageHero
        eyebrow={service.tagline}
        icon={service.icon}
        title={service.h1}
        intro={service.intro}
      />

      {/* Signs you need this service */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-4xl">
            <ResearchSnapshot updated="July 2026" />
          </div>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                align="left"
                eyebrow="When to call"
                title={`Signs you need ${service.title.toLowerCase()}`}
              />
              <ul className="mt-8 space-y-3.5">
                {service.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3 text-navy-800">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    <span className="text-[15px] leading-relaxed">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle
                align="left"
                eyebrow="What's included"
                title="What a local pro will do"
              />
              <div className="mt-8 space-y-5">
                {service.included.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-navy-900/[0.07] bg-slate-50 p-5"
                  >
                    <h3 className="font-display text-base font-bold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related tools & guides — the topical graph */}
      {relatedTools.length > 0 || relatedArticles.length > 0 ? (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <SectionTitle
              eyebrow="Free tools & guides"
              title={`Plan your ${service.title.toLowerCase()} with confidence`}
              description="Independent tools and in-depth guides that turn this page into real numbers for your home — before you talk to a contractor."
            />
            {relatedTools.length > 0 ? (
              <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            ) : null}
            {relatedArticles.length > 0 ? (
              <div className="mx-auto mt-4 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/resources/${a.slug}`}
                    className="group flex flex-col rounded-xl border border-navy-900/[0.07] bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-700">
                      {a.category}
                    </span>
                    <span className="mt-1.5 font-display text-sm font-bold leading-snug text-navy-900 group-hover:text-accent-700">
                      {a.title}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <FaqList
        title={`${service.title} — common questions`}
        faqs={service.faqs}
      />

      {/* Internal links: this service in nearby cities */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="By city"
            title={`${service.title} across the south metro`}
            description={`${service.title} costs and considerations are similar across the Twin Cities — here are the local homeowner guides for the cities we cover.`}
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCities.map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent-500" />
                <span className="font-display text-sm font-bold text-navy-900">
                  {service.title.split(" ")[0]} in {l.name}, MN
                </span>
                <Icon name="arrowRight" className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Internal links: other services */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle eyebrow="More services" title="Explore our other HVAC services" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy-900">
                  {s.title}
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

      <CTABand
        heading={`Weighing ${service.title.toLowerCase()}?`}
        sub={`Use our free tools and honest cost guides to understand fair pricing and hire the right local contractor in ${site.address.city} and the south metro — no sales calls, no obligation.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
