import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LastUpdated } from "@/components/ui/LastUpdated";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/lib/site";
import { CostEstimator } from "@/components/tools/CostEstimator";
import { FinancingCalculator } from "@/components/tools/FinancingCalculator";
import { HeatPumpVsFurnace } from "@/components/tools/HeatPumpVsFurnace";
import { LifespanCalculator } from "@/components/tools/LifespanCalculator";
import { QuoteAnalyzer } from "@/components/tools/QuoteAnalyzer";
import { RebateChecker } from "@/components/tools/RebateChecker";
import { RepairReplaceCalculator } from "@/components/tools/RepairReplaceCalculator";
import { KitCapture } from "@/components/sections/KitCapture";
import { absoluteUrl } from "@/lib/content";
import { getTool, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: absoluteUrl(`/tools/${tool.slug}`),
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const otherTools = tools.filter((t) => t.slug !== tool.slug);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${site.url}/#organization` },
    description: tool.metaDescription,
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: tool.title, href: `/tools/${tool.slug}` },
        ]}
      />
      <PageHero eyebrow="Free tool" icon={tool.icon} title={tool.h1} intro={tool.intro} />

      <section className="bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <LastUpdated updated={tool.updated} className="mb-6" />
            {tool.slug === "hvac-cost-estimator" ? <CostEstimator /> : null}
            {tool.slug === "repair-or-replace" ? <RepairReplaceCalculator /> : null}
            {tool.slug === "system-lifespan" ? <LifespanCalculator /> : null}
            {tool.slug === "hvac-financing-calculator" ? <FinancingCalculator /> : null}
            {tool.slug === "heat-pump-vs-furnace" ? <HeatPumpVsFurnace /> : null}
            {tool.slug === "hvac-quote-analyzer" ? <QuoteAnalyzer /> : null}
            {tool.slug === "minnesota-hvac-rebate-checker" ? <RebateChecker /> : null}
            <KitCapture source={`tool-${tool.slug}`} className="mt-8" />
          </div>
        </Container>
      </section>

      {otherTools.length > 0 ? (
        <section className="bg-slate-50 py-14 lg:py-16">
          <Container>
            <SectionTitle eyebrow="More tools" title="Keep exploring" />
            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              {otherTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-bold text-navy-900">{t.title}</span>
                  <Icon name="arrowRight" className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTABand
        heading="Ready to see real numbers?"
        sub="A calculator is a great start — a written quote from a local pro is the real answer. Compare free quotes with no obligation."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
    </>
  );
}
