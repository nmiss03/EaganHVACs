import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { site } from "@/lib/site";

/** Static "product output" previews — they demonstrate what each tool
 * returns so a homeowner understands the platform before reading copy.
 * Values are illustrative examples, labeled as such. */
const previews: ReadonlyArray<{
  slug: string;
  icon: IconName;
  tool: string;
  input: string;
  render: React.ReactNode;
}> = [
  {
    slug: "hvac-cost-estimator",
    icon: "dollar",
    tool: "Cost Estimator",
    input: "New furnace · 2,000 sq ft",
    render: (
      <span className="font-display text-xl font-extrabold text-navy-900">
        $6,400 – $9,200
      </span>
    ),
  },
  {
    slug: "repair-or-replace",
    icon: "gauge",
    tool: "Repair or Replace",
    input: "18-yr furnace · $1,900 fix",
    render: (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent-700">
        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
        Lean replace
      </span>
    ),
  },
  {
    slug: "system-lifespan",
    icon: "clock",
    tool: "System Lifespan",
    input: "AC installed 2012",
    render: (
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-navy-100">
          <span className="block h-full w-[78%] rounded-full bg-accent-500" />
        </span>
        <span className="text-sm font-bold text-navy-900">~3 yrs left</span>
      </span>
    ),
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900" aria-label="Introduction">
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

      <Container className="relative pb-20 pt-14 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-accent-400" />
                <span className="relative h-2 w-2 rounded-full bg-accent-400" />
              </span>
              The Minnesota Homeowner&rsquo;s HVAC Platform
            </p>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Know your options{" "}
              <span className="relative inline-block text-accent-400">
                before
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  className="absolute -bottom-1 left-0 w-full text-accent-500/60"
                  preserveAspectRatio="none"
                >
                  <path d="M3 9c30-6 78-7 114-3" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              you spend thousands on HVAC.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy-100/85">
              Free tools and honest Minnesota cost guides — then compare quotes
              from licensed local contractors when you&rsquo;re ready.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/tools" size="lg">
                Explore Homeowner Tools
                <Icon name="arrowRight" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="/#inquiry" variant="ghost" size="lg">
                Compare Local Quotes
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-navy-100/60">
              No heat or cooling right now?{" "}
              <a
                href={site.phoneHref}
                className="font-semibold text-navy-100 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-300"
              >
                Call {site.phone}
              </a>{" "}
              for the 24/7 network line.
            </p>
          </div>

          {/* Product preview: the tools, demonstrated */}
          <div className="animate-fade-in">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur sm:p-4">
              <p className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-100/60">
                See what you&rsquo;ll get — example results
              </p>
              <div className="space-y-2.5">
                {previews.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/tools/${p.slug}`}
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                          {p.tool}
                        </span>
                        <Icon
                          name="arrowRight"
                          className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {p.input}
                      </span>
                      <span className="mt-1.5 block">{p.render}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SectionDivider fill="white" className="relative" />
    </section>
  );
}
