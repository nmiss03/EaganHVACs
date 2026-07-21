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
import { absoluteUrl, getServiceDetail, locations, serviceDetails } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "HVACBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      telephone: site.phoneHref.replace("tel:", ""),
    },
    areaServed: locations.map((l) => ({ "@type": "City", name: `${l.name}, MN` })),
  };

  const otherServices = serviceDetails.filter((s) => s.slug !== service.slug);

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

      <FaqList
        title={`${service.title} — common questions`}
        faqs={service.faqs}
      />

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
        heading={`Need ${service.title.toLowerCase()} today?`}
        sub={`Get connected with a trusted, licensed local pro serving ${site.address.city} and the south metro — free quotes, upfront pricing, fast response.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
