import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { serviceDetails } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HVAC Services in Eagan, MN | Heating & Cooling Repair & Install",
  description:
    "Explore HVAC services in Eagan, MN and the south metro: furnace repair, AC repair, installation, maintenance, indoor air quality, and 24/7 emergency service.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Our Services"
        icon="wrench"
        title="HVAC Services in Eagan, MN & the South Metro"
        intro={[
          "Whatever your home's heating and cooling needs, we connect you with trusted local pros who get it done right. Explore our services below — each links to details, common signs you need it, and answers to the questions homeowners ask most.",
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {serviceDetails.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-navy-900">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.intro[0]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                  Learn more
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        heading="Ready to get comfortable again?"
        sub={`Tell us what's going on and a trusted local pro will reach out fast. Serving ${site.address.city} and the surrounding south metro.`}
      />
    </>
  );
}
