import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { FaqList } from "@/components/landing/FaqList";
import { PageHero } from "@/components/landing/PageHero";
import { ComparisonFramework } from "@/components/cityguide/ComparisonFramework";
import { EvaluationCriteria } from "@/components/cityguide/EvaluationCriteria";
import { QuestionChecklist } from "@/components/cityguide/QuestionChecklist";
import { ReadingProgress } from "@/components/cityguide/ReadingProgress";
import { RedFlags } from "@/components/cityguide/RedFlags";
import { StickyToc, type TocSection } from "@/components/cityguide/StickyToc";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  COMPARISON_COLUMNS,
  COMPARISON_INTRO,
  COMPARISON_ROW_LABELS,
  EVALUATION_CRITERIA,
  INTERVIEW_CHECKLIST,
  MINNESOTA_CONSIDERATIONS,
  MINNESOTA_CONSIDERATIONS_INTRO,
  QUOTE_COMPARISON_INTRO,
  QUOTE_COMPARISON_OUTRO,
  QUOTE_COMPARISON_POINTS,
  RED_FLAGS,
  WHY_SELECTION_MATTERS,
  cityGuides,
  getCityGuide,
} from "@/lib/city-guides";
import { absoluteUrl, getLocation } from "@/lib/content";
import { site } from "@/lib/site";

/** Only cities that actually have guide data get a page. */
export function generateStaticParams() {
  return cityGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCityGuide(slug);
  if (!guide) return {};
  const path = `/locations/${guide.slug}/best-hvac-companies`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: absoluteUrl(path),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

const RELATED_TOOLS = [
  { href: "/tools/hvac-quote-analyzer", icon: "clipboard", label: "HVAC Quote Analyzer" },
  { href: "/tools/hvac-cost-estimator", icon: "dollar", label: "HVAC Cost Estimator" },
  { href: "/tools/repair-or-replace", icon: "gauge", label: "Repair or Replace Calculator" },
  { href: "/tools/system-lifespan", icon: "clock", label: "HVAC Lifespan Estimator" },
] as const;

const RELATED_RESOURCES = [
  {
    href: "/resources/hvac-cost-guide-minnesota",
    icon: "clipboard",
    label: "What HVAC Really Costs in Minnesota",
  },
  {
    href: "/resources/questions-to-ask-hvac-contractor",
    icon: "check",
    label: "15 Questions to Ask a Contractor",
  },
  {
    href: "/resources/minnesota-hvac-rebates",
    icon: "sparkles",
    label: "Minnesota HVAC Rebates & Tax Credits",
  },
] as const;

const SECTIONS: TocSection[] = [
  { id: "why-it-matters", label: "Why it matters" },
  { id: "what-to-evaluate", label: "What to evaluate" },
  { id: "comparison-worksheet", label: "Comparison worksheet" },
  { id: "comparing-quotes", label: "Comparing quotes" },
  { id: "minnesota-factors", label: "Minnesota factors" },
  { id: "red-flags", label: "Red flags" },
  { id: "interview-checklist", label: "Interview checklist" },
  { id: "faqs", label: "FAQs" },
];

export default async function CityGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getCityGuide(slug);
  if (!guide) notFound();
  const location = getLocation(guide.slug);
  if (!location) notFound();

  const path = `/locations/${guide.slug}/best-hvac-companies`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.metaTitle,
    description: guide.metaDescription,
    url: absoluteUrl(path),
    dateModified: guide.dateModified,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: absoluteUrl(path),
    about: `Choosing an HVAC company in ${location.name}, ${location.county}, Minnesota`,
  };

  return (
    <>
      <ReadingProgress />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Area", href: "/locations" },
          { label: `${location.name}, MN`, href: `/locations/${location.slug}` },
          { label: "Choosing an HVAC Company", href: path },
        ]}
      />

      <PageHero
        eyebrow="Homeowner's Buyer's Guide"
        icon="clipboard"
        title={guide.h1}
        intro={guide.heroIntro}
      />

      <StickyToc
        sections={SECTIONS}
        meta={{ updated: guide.updated, readMinutes: guide.readMinutes }}
      />

      {/* Why choosing the right installer matters */}
      <section id="why-it-matters" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Why it matters"
              title="The company matters more than the brand"
            />
            <div className="mt-6 space-y-4">
              {guide.intro.map((p) => (
                <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
              {WHY_SELECTION_MATTERS.map((p) => (
                <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What to evaluate */}
      <section id="what-to-evaluate" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="What to evaluate"
            title="Seven things that separate great companies from the rest"
            description="Score every company you talk to against the same criteria — these are the factors that actually determine how your system performs and how you're treated."
          />
          <div className="mt-12">
            <EvaluationCriteria criteria={EVALUATION_CRITERIA} />
          </div>
        </Container>
      </section>

      {/* Comparison worksheet */}
      <section id="comparison-worksheet" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            align="left"
            eyebrow="Comparison worksheet"
            title="Compare companies side by side — the honest way"
          />
          <div className="mt-8">
            <ComparisonFramework
              columns={[...COMPARISON_COLUMNS]}
              rowLabels={[...COMPARISON_ROW_LABELS]}
              intro={COMPARISON_INTRO}
            />
          </div>
        </Container>
      </section>

      {/* How to compare quotes properly */}
      <section id="comparing-quotes" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Comparing quotes"
              title="How to compare quotes apples-to-apples"
            />
            <div className="mt-6 space-y-4">
              {QUOTE_COMPARISON_INTRO.map((p) => (
                <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-6 space-y-2.5">
              {QUOTE_COMPARISON_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700"
                >
                  <Icon
                    name="check"
                    className="mt-1 h-4 w-4 shrink-0 text-accent-500"
                    strokeWidth={2.4}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700">
              {QUOTE_COMPARISON_OUTRO}
            </p>
          </div>
        </Container>
      </section>

      {/* Minnesota-specific considerations */}
      <section id="minnesota-factors" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Minnesota factors"
            title="Cold-climate considerations for the Twin Cities"
            description={MINNESOTA_CONSIDERATIONS_INTRO[0]}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {MINNESOTA_CONSIDERATIONS.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card"
              >
                <h3 className="font-display text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* City-specific local notes */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-700">
              Local notes for {location.name}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {guide.localNotes.map((note) => (
                <div key={note.title} className="flex flex-col">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                    <Icon name={note.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-navy-900">
                    {note.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Red flags */}
      <section id="red-flags" className="scroll-mt-32 bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Red flags"
            title="Warning signs worth walking away from"
            description="Any one of these on its own is a reason to slow down and ask more questions — or to cross a company off your list."
          />
          <div className="mt-12">
            <RedFlags flags={RED_FLAGS} />
          </div>
        </Container>
      </section>

      {/* Interview checklist */}
      <section id="interview-checklist" className="scroll-mt-32 bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Interview checklist"
            title="Your contractor interview checklist"
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <QuestionChecklist city={location.name} groups={INTERVIEW_CHECKLIST} />
          </div>
        </Container>
      </section>

      {/* City FAQs (emits FAQPage schema) */}
      <div id="faqs" className="scroll-mt-32">
        <FaqList
          eyebrow="FAQ"
          title={`Choosing an HVAC company in ${location.name} — common questions`}
          faqs={guide.cityFaqs}
        />
      </div>

      {/* Related resources */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Keep going"
            title="Free tools & guides to help you decide"
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-700">
                Interactive tools
              </p>
              <div className="mt-4 space-y-3">
                {RELATED_TOOLS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                      <Icon name={t.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-navy-900">
                      {t.label}
                    </span>
                    <Icon
                      name="arrowRight"
                      className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-navy-700">
                Read next
              </p>
              <div className="mt-4 space-y-3">
                {RELATED_RESOURCES.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-navy-900">
                      {r.label}
                    </span>
                    <Icon
                      name="arrowRight"
                      className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        heading="Ready to compare quotes from vetted local pros?"
        sub={`${site.name} connects ${location.name} homeowners with trusted, licensed local contractors so you can compare quotes side by side — free, and with no obligation.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
