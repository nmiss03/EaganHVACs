import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ToolCard } from "@/components/tools/ToolCard";
import { site } from "@/lib/site";
import { CostEstimator } from "@/components/tools/CostEstimator";
import { FinancingCalculator } from "@/components/tools/FinancingCalculator";
import { HeatPumpVsFurnace } from "@/components/tools/HeatPumpVsFurnace";
import { LifespanCalculator } from "@/components/tools/LifespanCalculator";
import { QuoteAnalyzer } from "@/components/tools/QuoteAnalyzer";
import { RebateChecker } from "@/components/tools/RebateChecker";
import { RepairReplaceCalculator } from "@/components/tools/RepairReplaceCalculator";
import { KitCapture } from "@/components/sections/KitCapture";
import { ToolPillar } from "@/components/tools/ToolPillar";
import { absoluteUrl } from "@/lib/content";
import { getTool, tools } from "@/lib/tools";
import { getToolContent } from "@/lib/tool-content";

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
  const pillar = getToolContent(tool.slug);

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
            {tool.slug === "hvac-cost-estimator" ? <CostEstimator /> : null}
            {tool.slug === "repair-or-replace" ? <RepairReplaceCalculator /> : null}
            {tool.slug === "system-lifespan" ? <LifespanCalculator /> : null}
            {tool.slug === "hvac-financing-calculator" ? <FinancingCalculator /> : null}
            {tool.slug === "heat-pump-vs-furnace" ? <HeatPumpVsFurnace /> : null}
            {tool.slug === "hvac-quote-analyzer" ? <QuoteAnalyzer /> : null}
            {tool.slug === "minnesota-hvac-rebate-checker" ? <RebateChecker /> : null}
          </div>

          {tool.slug === "repair-or-replace" ? (
            <div className="mx-auto mt-10 max-w-3xl">
              <ContentImage
                src="/site-images/repair-or-replace-infographic.webp"
                alt="Repair-or-replace decision flowchart: if the system has trouble, assess whether it's a minor issue (simple, low-cost fix — system remains viable) or a significant problem (major failure, frequent breakdowns), then weigh a cost-benefit analysis of repair cost versus a new-system investment."
                width={1800}
                height={1005}
                caption="How the repair-or-replace decision flows — the calculator above turns this logic into a recommendation for your system."
                sizes="(min-width: 768px) 48rem, 100vw"
              />
            </div>
          ) : null}
        </Container>
      </section>

      {pillar ? <ToolPillar tool={tool} content={pillar} /> : null}

      <section className="bg-white pb-14 lg:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <KitCapture source={`tool-${tool.slug}`} />
          </div>
        </Container>
      </section>

      {otherTools.length > 0 ? (
        <section className="bg-slate-50 py-14 lg:py-16">
          <Container>
            <SectionTitle eyebrow="More tools" title="Keep exploring" />
            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              {otherTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
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
