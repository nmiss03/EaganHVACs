import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { locations } from "@/lib/content";

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-navy-100/70 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionTitle
                align="left"
                eyebrow="City guides"
                title="HVAC guides for Eagan & the south metro"
                description="We're based in Eagan and cover the south-metro cities below with independent homeowner guides — local repair and replacement costs, common problems, permits, and rebates for each."
              />
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="flex items-center gap-2 rounded-xl border border-navy-900/[0.07] bg-white px-3.5 py-2.5 text-sm font-medium text-navy-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                    >
                      <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent-500" />
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm text-slate-600">
                Just outside these areas? Our{" "}
                <Link
                  href="/tools"
                  className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
                >
                  free tools and cost data
                </Link>{" "}
                still apply across the Twin Cities metro.
              </p>
            </Reveal>
          </div>

          {/* What every city guide covers */}
          <Reveal delay={150}>
            <div className="mx-auto w-full max-w-md rounded-2xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-700">
                In every city guide
              </p>
              <p className="mt-2 font-display text-lg font-bold text-navy-900">
                What you&rsquo;ll find for your city
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Typical furnace & AC repair and replacement costs",
                  "The HVAC problems common to that city's homes",
                  "Repair-or-replace guidance for your system",
                  "Permit requirements and local utilities",
                  "Which rebates apply — and how to claim them",
                  "How to choose and compare local contractors",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-800">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
