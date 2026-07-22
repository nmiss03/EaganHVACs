import { ButtonLink } from "@/components/ui/Button";
import { ComfortIllustration } from "@/components/ui/ComfortIllustration";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { site, trustBadges } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900" aria-label="Introduction">
      {/* Layered background: glows + blueprint grid */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-navy-600/30 blur-3xl" />
        <div className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-accent-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full text-white/[0.035]">
          <defs>
            <pattern id="hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0v44" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950/40" />
      </div>

      <Container className="relative pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-accent-400" />
                <span className="relative h-2 w-2 rounded-full bg-accent-400" />
              </span>
              The Minnesota Homeowner&rsquo;s HVAC Platform
            </p>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Make{" "}
              <span className="relative inline-block text-accent-400">
                smarter
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  className="absolute -bottom-1 left-0 w-full text-accent-500/60"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9c30-6 78-7 114-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              HVAC decisions — before you spend thousands.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/85">
              Free cost estimators, honest Minnesota pricing guides, and
              side-by-side quotes from licensed local contractors. Understand
              your options first — then compare quotes when you&rsquo;re ready.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tools" size="lg">
                Explore Homeowner Tools
                <Icon name="arrowRight" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/#inquiry" variant="ghost" size="lg">
                Compare Local Quotes
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-navy-100/60">
              Emergency? Skip ahead:{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-navy-100 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-300"
              >
                call {site.phone}
              </a>{" "}
              for the 24/7 network line.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 border-t border-white/10 pt-8 sm:grid-cols-2">
              {trustBadges.map((badge) => (
                <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
              ))}
            </ul>
          </div>

          {/* Visual: framed illustration with honest proof cards */}
          <div className="relative animate-fade-in lg:pl-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.4rem] bg-gradient-to-br from-white/15 via-white/5 to-transparent"
              />
              <div
                role="img"
                aria-label="Illustration of a comfortable home with heating and cooling airflow"
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 shadow-2xl"
              >
                <svg className="absolute inset-0 h-full w-full text-white/[0.05]" aria-hidden="true">
                  <defs>
                    <pattern id="hero-ph" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M30 0H0v30" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-ph)" />
                </svg>
                <ComfortIllustration
                  tone="dark"
                  className="absolute inset-x-0 top-0 h-[78%] w-full p-4"
                />
                {/* stat strip — all true platform facts */}
                <dl className="absolute inset-x-0 bottom-0 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-navy-950/50 backdrop-blur">
                  {[
                    { value: "3", label: "Free planning tools" },
                    { value: "16", label: "Cities covered" },
                    { value: "$0", label: "Cost to homeowners" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col px-3 py-3.5 text-center sm:py-4">
                      <dt className="order-2 mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-navy-100/60">
                        {stat.label}
                      </dt>
                      <dd className="order-1 font-display text-lg font-extrabold text-white sm:text-xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Floating card: free comparison */}
              <div className="absolute -left-3 top-[40%] rounded-xl bg-white p-4 shadow-card-hover sm:-left-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <Icon name="dollar" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">Compare multiple quotes</p>
                    <p className="text-xs text-slate-500">Always free · No obligation</p>
                  </div>
                </div>
              </div>

              {/* Floating emergency chip */}
              <div className="absolute -top-4 right-2 flex items-center gap-2 rounded-full bg-white py-2 pl-2.5 pr-4 shadow-card-hover sm:-right-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                  <Icon name="bolt" className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold text-navy-900">
                  24/7 Emergency Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SectionDivider fill="white" className="relative" />
    </section>
  );
}
