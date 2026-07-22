import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { locations } from "@/lib/content";
import { cityGuides } from "@/lib/city-guides";

export const metadata: Metadata = {
  title: "HVAC Service Area | Eagan, MN & South Metro Cities We Serve",
  description:
    "Eagan HVACs serves Eagan and the surrounding south metro, including Apple Valley, Burnsville, Rosemount, Lakeville, Inver Grove Heights, and more. Find your city.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Area", href: "/locations" },
        ]}
      />
      <PageHero
        eyebrow="Service Area"
        icon="mapPin"
        title="HVAC Service Across Eagan & the South Metro"
        intro={[
          "Based in Eagan, we connect homeowners across Dakota County and the surrounding south metro with trusted local HVAC pros. Find your city below for local heating and cooling service details.",
        ]}
      />

      {cityGuides.length > 0 ? (
        <section className="bg-white pt-16 lg:pt-20">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-700">
              City buyer&rsquo;s guides
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityGuides.map((guide) => {
                const loc = locations.find((l) => l.slug === guide.slug);
                return (
                  <Link
                    key={guide.slug}
                    href={`/locations/${guide.slug}/best-hvac-companies`}
                    className="group flex items-center gap-4 rounded-xl border border-accent-200 bg-accent-50/50 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                      <Icon name="clipboard" className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-navy-900">
                      How to choose an HVAC company in {loc?.name ?? guide.slug}
                    </span>
                    <Icon
                      name="arrowRight"
                      className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600 transition-colors group-hover:bg-navy-900">
                  <Icon name="mapPin" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-navy-900">
                    {location.name}, MN
                  </span>
                  <span className="text-xs text-slate-500">{location.county}</span>
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
        heading="Don't see your city?"
        sub="We serve the broader south metro — give us a call and we can usually still help with your heating and cooling needs."
      />
    </>
  );
}
