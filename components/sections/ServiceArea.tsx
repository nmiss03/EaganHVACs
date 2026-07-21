import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { locations } from "@/lib/content";
import { site } from "@/lib/site";

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
                eyebrow="Service Area"
                title="Proudly serving Eagan and the south metro"
                description="Based right here in Dakota County, our contractor network covers Eagan and the surrounding communities — so help is never far away."
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
                Just outside these areas?{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
                >
                  Give us a call
                </a>{" "}
                — we can usually still help.
              </p>
            </Reveal>
          </div>

          {/* Stylized radius map */}
          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-navy-100 via-navy-50 to-white shadow-card">
              <svg className="absolute inset-0 h-full w-full text-navy-900/[0.05]" aria-hidden="true">
                <defs>
                  <pattern id="map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M36 0H0v36" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="absolute h-[85%] w-[85%] rounded-full border border-navy-200/80" />
                <span className="absolute h-[62%] w-[62%] rounded-full border border-navy-200" />
                <span className="absolute h-[38%] w-[38%] rounded-full border border-navy-300 bg-navy-100/40" />
                <span className="absolute h-[38%] w-[38%] animate-pulse-ring rounded-full bg-accent-400/20" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-glow">
                  <Icon name="mapPin" className="h-7 w-7" />
                </span>
                <p className="font-display text-lg font-extrabold text-navy-900">
                  Eagan, MN
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">
                  Service radius map placeholder
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
