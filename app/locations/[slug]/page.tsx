import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { FaqList } from "@/components/landing/FaqList";
import { PageHero } from "@/components/landing/PageHero";
import { ToolCard } from "@/components/tools/ToolCard";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCityGuide } from "@/lib/city-guides";
import { absoluteUrl, getLocation, locations } from "@/lib/content";
import { services, site } from "@/lib/site";
import { getArticle } from "@/lib/articles";
import { getTool } from "@/lib/tools";
import { kitQuestions } from "@/lib/buyers-kit";
import {
  COST_RANGES,
  FURNACE_REPAIR_RANGE,
  LIFESPANS,
  usd,
  usdRange,
  yearsRange,
} from "@/lib/hvac-data";

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
  const title = `${location.name} HVAC Guide: Furnace & AC Repair, Costs`;
  const description = `Independent ${location.name}, MN HVAC guide: real furnace & AC repair costs, replacement pricing, emergency HVAC, rebates, and how to hire and compare local contractors — before you call.`;
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

// Tools and guides this local buying guide links into (the topical graph).
const RELATED_TOOL_SLUGS = [
  "hvac-cost-estimator",
  "repair-or-replace",
  "hvac-quote-analyzer",
  "heat-pump-vs-furnace",
  "minnesota-hvac-rebate-checker",
  "system-lifespan",
] as const;

const RELATED_ARTICLE_SLUGS = [
  "hvac-cost-guide-minnesota",
  "furnace-replacement-cost",
  "ac-replacement-cost",
  "furnace-repair-cost",
  "questions-to-ask-hvac-contractor",
  "minnesota-hvac-rebates",
  "minnesota-hvac-maintenance-calendar",
] as const;

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const cityGuide = getCityGuide(location.slug);
  const relatedTools = RELATED_TOOL_SLUGS.map(getTool).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );
  const relatedArticles = RELATED_ARTICLE_SLUGS.map(getArticle).filter(
    (a): a is NonNullable<typeof a> => Boolean(a),
  );
  const nearbyLinks = location.nearby
    .map((name) => locations.find((l) => l.name === name))
    .filter((l): l is (typeof locations)[number] => Boolean(l));

  const localFaqs = [
    {
      question: `How much does furnace repair cost in ${location.name}?`,
      answer: `Most furnace repairs in the ${location.name} area run about ${usdRange(FURNACE_REPAIR_RANGE)} — a flame sensor or ignitor at the low end, a blower motor or control board higher. A cracked heat exchanger is the exception and usually points to replacement. See our [furnace repair cost guide](/resources/furnace-repair-cost) for the full breakdown, and run any bid through the [quote analyzer](/tools/hvac-quote-analyzer).`,
    },
    {
      question: `How much does it cost to replace a furnace or AC in ${location.name}?`,
      answer: `In ${location.name} and the wider Twin Cities market, expect roughly ${usdRange(COST_RANGES.furnace)} installed for a furnace, ${usdRange(COST_RANGES.ac)} for central AC, ${usdRange(COST_RANGES.furnaceAndAc)} to replace both together, and ${usdRange(COST_RANGES.heatPump)} for a cold-climate heat pump — before rebates. The [HVAC cost estimator](/tools/hvac-cost-estimator) narrows it to your home.`,
    },
    {
      question: `Who do I call for emergency HVAC or no-heat repair in ${location.name}?`,
      answer: `${site.name} is an independent resource, not a contractor — we don't dispatch technicians. For a no-heat or no-cooling emergency in ${location.name}, call a licensed local HVAC company that offers 24/7 service directly. Our cost guides help you recognize a fair emergency price so you're not overcharged in a rush.`,
    },
    {
      question: `Do I need a permit for HVAC replacement in ${location.name}?`,
      answer: `Yes — replacing a furnace, AC, or heat pump in ${location.name} requires a mechanical permit, issued through ${location.permitAuthority}. A licensed contractor normally pulls it as part of the job; a quote that skips the permit is a red flag. Confirm it's included in writing before you sign.`,
    },
    {
      question: `Are heat pumps worth it for ${location.name} homeowners?`,
      answer: `Increasingly, yes. Modern cold-climate heat pumps heat efficiently well below 0°F and draw the largest Minnesota utility rebates. Whether one fits your ${location.name} home depends on your current heating, ductwork, and priorities — the [heat pump vs. furnace tool](/tools/heat-pump-vs-furnace) weighs it for you.`,
    },
    {
      question: `How do I find a good HVAC contractor in ${location.name}?`,
      answer: `Ask any ${location.name} contractor for their Minnesota license number and proof of insurance, get the full quote in writing with equipment model numbers, and compare at least two or three on the same scope. Our [quote analyzer](/tools/hvac-quote-analyzer) and [contractor-questions guide](/resources/questions-to-ask-hvac-contractor) walk you through exactly what to check.`,
    },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`/locations/${location.slug}`),
    url: absoluteUrl(`/locations/${location.slug}`),
    name: `HVAC in ${location.name}, MN: Furnace Repair, AC & Cost Guide`,
    description: `An independent local guide to heating and cooling in ${location.name}, ${location.county}: furnace and AC repair costs, replacement pricing, emergency HVAC, heat pumps, rebates, permits, and how to hire a qualified local contractor.`,
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "City", name: `${location.name}, Minnesota` },
    inLanguage: "en-US",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip inline-link markup for the plain-text schema value.
        text: f.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };

  // In-guide jump nav (server-rendered anchors — no client JS).
  const toc: { id: string; label: string }[] = [
    { id: "problems", label: `Common problems` },
    { id: "repair-costs", label: `Repair costs` },
    { id: "replacement-costs", label: `Replacement costs` },
    { id: "repair-or-replace", label: `Repair or replace` },
    { id: "emergency", label: `Emergency HVAC` },
    { id: "contractor", label: `Choosing a contractor` },
    { id: "permits", label: `Permits & utilities` },
    { id: "heat-pumps", label: `Heat pumps & rebates` },
    { id: "maintenance", label: `Maintenance` },
  ];

  const h2 = "font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-[1.7rem]";
  const p = "mt-3 text-[15px] leading-relaxed text-slate-700";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/locations" },
          { label: `${location.name}, MN`, href: `/locations/${location.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`${location.name}, ${location.county}`}
        icon="mapPin"
        title={`HVAC in ${location.name}, MN: Furnace, AC & Heating Guide`}
        intro={[location.intro]}
      />

      {/* In-guide jump nav */}
      <section className="border-b border-navy-900/[0.06] bg-white">
        <Container>
          <nav aria-label="In this guide" className="flex gap-x-5 gap-y-2 overflow-x-auto py-4 text-sm">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="whitespace-nowrap font-semibold text-navy-700 underline decoration-accent-300 decoration-2 underline-offset-4 transition-colors hover:text-accent-700"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Understanding HVAC in {City} + common problems */}
      <section id="problems" className="scroll-mt-24 bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Understanding HVAC in {location.name}</h2>
            <p className={p}>{location.localNote}</p>
            <p className={p}>
              {location.name} sits in the Twin Cities metro, which means a demanding
              climate on both ends of the year — sub-zero stretches that push a furnace
              hard in winter and humid 90&deg;F days that tax an air conditioner in
              summer. Equipment here rarely gets a season off, so both the failures below
              and the replacement math are shaped by Minnesota&rsquo;s weather.
            </p>

            <h3 className="mt-8 font-display text-lg font-bold text-navy-900">
              Typical HVAC problems in {location.name} homes
            </h3>
            <ul className="mt-4 space-y-2.5">
              {location.commonProblems.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5">
                <p className="font-display text-sm font-bold text-navy-900">
                  Furnace problems in a Minnesota winter
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  No heat, short-cycling, a blower that won&rsquo;t stop, or a red-flag
                  cracked heat exchanger. Start with our{" "}
                  <Link href="/resources/furnace-not-working-troubleshooting" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                    furnace troubleshooting guide
                  </Link>{" "}
                  before you call.
                </p>
              </div>
              <div className="rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5">
                <p className="font-display text-sm font-bold text-navy-900">
                  AC problems in a Minnesota summer
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Warm air, weak airflow, ice on the lines, or a unit that won&rsquo;t
                  start. Our{" "}
                  <Link href="/resources/ac-not-cooling" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                    AC-not-cooling guide
                  </Link>{" "}
                  helps you spot the fixable ones.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Repair costs */}
      <section id="repair-costs" className="scroll-mt-24 bg-slate-50 py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Furnace &amp; AC repair costs in {location.name}</h2>
            <p className={p}>
              Most furnace repairs in {location.name} run about{" "}
              <strong>{usdRange(FURNACE_REPAIR_RANGE)}</strong>, with the part mattering
              less than you&rsquo;d think — labor, diagnosis, and availability drive much
              of the price. Common AC repairs (a capacitor, contactor, or fan motor) tend
              to be a few hundred dollars; a refrigerant leak or compressor is where costs
              climb and repair-versus-replace enters the picture.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/resources/furnace-repair-cost" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="flame" className="h-4 w-4 text-accent-500" /> Furnace repair costs
              </Link>
              <Link href="/resources/ac-repair-cost" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="snowflake" className="h-4 w-4 text-accent-500" /> AC repair costs
              </Link>
              <Link href="/tools/hvac-quote-analyzer" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="clipboard" className="h-4 w-4 text-accent-500" /> Analyze a repair quote
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Replacement costs */}
      <section id="replacement-costs" className="scroll-mt-24 bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Furnace &amp; HVAC replacement costs in {location.name}</h2>
            <p className={p}>
              Installed replacement prices in {location.name} track the wider Twin Cities
              market. These are planning ranges before any rebate — the{" "}
              <Link href="/tools/hvac-cost-estimator" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                cost estimator
              </Link>{" "}
              narrows them to your home&rsquo;s size and efficiency.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-navy-900/10">
                    <th className="py-2.5 pr-4 font-display font-bold text-navy-900">System</th>
                    <th className="py-2.5 pr-4 font-display font-bold text-navy-900">Typical installed range</th>
                    <th className="py-2.5 font-display font-bold text-navy-900">Typical lifespan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy-900/[0.06]">
                    <td className="py-2.5 pr-4 font-medium text-navy-800">Gas furnace</td>
                    <td className="py-2.5 pr-4 text-slate-600">{usdRange(COST_RANGES.furnace)}</td>
                    <td className="py-2.5 text-slate-600">{yearsRange(LIFESPANS.furnace)} yrs</td>
                  </tr>
                  <tr className="border-b border-navy-900/[0.06]">
                    <td className="py-2.5 pr-4 font-medium text-navy-800">Central air conditioner</td>
                    <td className="py-2.5 pr-4 text-slate-600">{usdRange(COST_RANGES.ac)}</td>
                    <td className="py-2.5 text-slate-600">{yearsRange(LIFESPANS.ac)} yrs</td>
                  </tr>
                  <tr className="border-b border-navy-900/[0.06]">
                    <td className="py-2.5 pr-4 font-medium text-navy-800">Furnace + AC together</td>
                    <td className="py-2.5 pr-4 text-slate-600">{usdRange(COST_RANGES.furnaceAndAc)}</td>
                    <td className="py-2.5 text-slate-600">—</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-navy-800">Cold-climate heat pump</td>
                    <td className="py-2.5 pr-4 text-slate-600">{usdRange(COST_RANGES.heatPump)}</td>
                    <td className="py-2.5 text-slate-600">{yearsRange(LIFESPANS.heatPump)} yrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Twin Cities installed ranges, before rebates. Your exact price depends on
              home size, efficiency, ductwork, and access.
            </p>
          </div>
        </Container>
      </section>

      {/* Repair or replace */}
      <section id="repair-or-replace" className="scroll-mt-24 bg-slate-50 py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Repair or replace? A quick framework for {location.name} homeowners</h2>
            <p className={p}>
              A useful rule of thumb: if your system is past its typical lifespan (
              {yearsRange(LIFESPANS.furnace)} years for a furnace,{" "}
              {yearsRange(LIFESPANS.ac)} for an AC) and a repair would cost more than about
              a third of a new system, replacement usually wins. Below that, repair is
              often the smart call. Don&rsquo;t decide under pressure during a breakdown —
              run the numbers first.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tools/repair-or-replace" className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
                Run the repair-or-replace tool
                <Icon name="arrowRight" className="h-4 w-4 text-accent-400" />
              </Link>
              <Link href="/tools/system-lifespan" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                Check your system&rsquo;s remaining life
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Emergency HVAC */}
      <section id="emergency" className="scroll-mt-24 bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Emergency HVAC in {location.name}: what homeowners should know</h2>
            <p className={p}>
              A furnace that quits in a {location.name} January feels like a crisis, and
              that pressure is exactly when homeowners overpay. {site.name} doesn&rsquo;t
              dispatch technicians — but here&rsquo;s how to handle it well:
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                "First, run through the quick, safe checks (thermostat, power/breaker, furnace switch, filter) in our furnace troubleshooting guide — a surprising share of no-heat calls are these.",
                "If it's genuinely down, call a licensed local HVAC company that offers 24/7 emergency service. Ask for the diagnostic fee and the repair price before work starts.",
                "Use our cost guides to sanity-check the number — emergency and after-hours work costs more, but it shouldn't be wildly out of line with typical repair ranges.",
                "If the system is old and the emergency repair is expensive, ask about a temporary fix so you can compare replacement quotes calmly rather than deciding at midnight.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Callout tone="note" className="mt-5" title="We're a resource, not a repair company">
              {`${site.name} is an independent Minnesota HVAC guide. We help you understand and compare — we don't perform repairs, install equipment, or dispatch technicians.`}
            </Callout>
          </div>
        </Container>
      </section>

      {/* Choosing a contractor + questions + comparing quotes */}
      <section id="contractor" className="scroll-mt-24 bg-slate-50 py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Choosing an HVAC contractor in {location.name}</h2>
            <p className={p}>
              The quality of the installation affects how long your system lasts and how
              efficiently it runs as much as the equipment brand does. A good {location.name}{" "}
              contractor is licensed and insured in Minnesota, runs a load calculation
              (Manual&nbsp;J) instead of guessing at size, pulls the permit, and puts an
              itemized quote in writing. {cityGuide ? (
                <>
                  Our{" "}
                  <Link href={`/locations/${location.slug}/best-hvac-companies`} className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                    guide to choosing an HVAC company in {location.name}
                  </Link>{" "}
                  covers how to evaluate and compare them honestly.
                </>
              ) : null}
            </p>

            <h3 className="mt-8 font-display text-lg font-bold text-navy-900">
              Questions every {location.name} homeowner should ask before hiring
            </h3>
            <ul className="mt-4 space-y-2.5">
              {kitQuestions.slice(0, 6).map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-700">
                  <Icon name="quote" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  <span>&ldquo;{q}&rdquo;</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-white p-5">
              <p className="font-display text-sm font-bold text-navy-900">How to compare multiple quotes</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Get two or three written quotes on the same scope, then line them up on
                equipment, efficiency, warranty, and what&rsquo;s included. The{" "}
                <Link href="/tools/hvac-quote-analyzer" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2">
                  quote analyzer
                </Link>{" "}
                scores how complete each one is and hands you the questions to ask about
                anything missing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Permits & utilities */}
      <section id="permits" className="scroll-mt-24 bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Permits &amp; utilities in {location.name}</h2>
            <p className={p}>
              Replacing a furnace, AC, or heat pump in {location.name} requires a{" "}
              <strong>mechanical permit</strong>, issued through {location.permitAuthority}.
              A licensed contractor normally pulls it and schedules the inspection — a quote
              that skips the permit to look cheaper is a red flag, because the permit and
              inspection are what verify the work was done to code.
            </p>
            <p className={p}>
              On the utility side, most {location.name} homes are served by{" "}
              <strong>Xcel Energy</strong> for electricity and{" "}
              <strong>CenterPoint Energy</strong> for natural gas — the two utilities that
              fund the biggest local HVAC rebates. Confirm your providers on a recent bill,
              since they determine which rebate programs you can claim.
            </p>
          </div>
        </Container>
      </section>

      {/* Heat pumps & rebates */}
      <section id="heat-pumps" className="scroll-mt-24 bg-slate-50 py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Heat pumps &amp; rebates for {location.name} homeowners</h2>
            <p className={p}>
              Cold-climate heat pumps have surged in Minnesota because they heat
              efficiently well below 0&deg;F, cool in summer, and earn the largest utility
              rebates — and many {location.name} homeowners now weigh one at replacement
              time, often as a dual-fuel setup with the existing furnace as backup. Note
              that the federal 25C tax credit expired at the end of 2025, so 2026 projects
              rely on utility rebates and the pending state program.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tools/heat-pump-vs-furnace" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="gauge" className="h-4 w-4 text-accent-500" /> Heat pump vs. furnace
              </Link>
              <Link href="/minnesota-hvac-rebate-database" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="badgeCheck" className="h-4 w-4 text-accent-500" /> Rebate database
              </Link>
              <Link href="/tools/minnesota-hvac-rebate-checker" className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                <Icon name="dollar" className="h-4 w-4 text-accent-500" /> Check your rebates
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Maintenance */}
      <section id="maintenance" className="scroll-mt-24 bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={h2}>Maintenance &amp; seasonal HVAC calendar for {location.name}</h2>
            <p className={p}>
              In a climate this hard on equipment, seasonal upkeep is the cheapest way to
              avoid an emergency and to reach the high end of a system&rsquo;s lifespan —
              and on newer homes it&rsquo;s often required to keep the manufacturer warranty
              valid. Change filters on schedule, have the furnace checked before winter and
              the AC before summer, and keep the outdoor unit clear.
            </p>
            <div className="mt-5">
              <Link href="/resources/minnesota-hvac-maintenance-calendar" className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
                See the Minnesota HVAC maintenance calendar
                <Icon name="arrowRight" className="h-4 w-4 text-accent-400" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services searched for */}
      <section className="bg-slate-50 py-14 lg:py-16">
        <Container>
          <SectionTitle
            eyebrow="Local services"
            title={`HVAC services ${location.name} homeowners search for`}
            description={`What each job involves and what to expect from a qualified local contractor — so you know the work before you pay for it.`}
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
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                  Read the guide
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related tools */}
      <section className="bg-white py-14 lg:py-16">
        <Container>
          <SectionTitle eyebrow="Free tools" title={`Tools for your ${location.name} HVAC decision`} />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Related guides */}
      <section className="bg-slate-50 py-14 lg:py-16">
        <Container>
          <SectionTitle eyebrow="Related guides" title="Go deeper before you decide" />
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className="group flex flex-col rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-700">{a.category}</span>
                <span className="mt-1.5 font-display text-base font-bold leading-snug text-navy-900 group-hover:text-accent-700">
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FaqList title={`${location.name} HVAC — frequently asked questions`} faqs={localFaqs} />

      {/* Nearby cities */}
      {nearbyLinks.length > 0 ? (
        <section className="bg-slate-50 py-14 lg:py-16">
          <Container>
            <SectionTitle eyebrow="Nearby" title="HVAC guides for nearby cities" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyLinks.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent-500" />
                  <span className="font-display text-sm font-bold text-navy-900">{l.name}, MN</span>
                  <Icon name="arrowRight" className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTABand
        heading={`Planning an HVAC project in ${location.name}?`}
        sub={`Use our free tools and honest cost guides to understand fair pricing and hire the right ${location.county} contractor with confidence — no sales calls, no obligation.`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
