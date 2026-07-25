import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { DatasetTrustPanel } from "@/components/data/DatasetTrustPanel";
import { RebateTable } from "@/components/data/RebateTable";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { getRebateDataset, datasetJsonLd } from "@/lib/datasets";
import { absoluteUrl } from "@/lib/content";
import { FEDERAL_25C, FEDERAL_25C_EXPIRATION_LABEL, usd } from "@/lib/hvac-data";

export const metadata: Metadata = {
  title: "Minnesota HVAC Rebate Database | Verified Incentives & Sources",
  description:
    "A maintained, source-linked record of Minnesota HVAC incentives — active Xcel Energy and CenterPoint Energy rebates, the expired federal 25C credit, and the pending state program. We publish amounts only when verified from the official source.",
  alternates: { canonical: "/minnesota-hvac-rebate-database" },
  openGraph: {
    title: "Minnesota HVAC Rebate Database",
    description:
      "Which HVAC incentives Minnesota homeowners can actually use right now — verified against primary sources, with the federal 25C credit's 2025 expiration clearly noted.",
    url: absoluteUrl("/minnesota-hvac-rebate-database"),
  },
};

export default function RebateDatabasePage() {
  const dataset = getRebateDataset();
  const schema = datasetJsonLd(dataset.meta, absoluteUrl("/minnesota-hvac-rebate-database"));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Rebate Database", href: "/minnesota-hvac-rebate-database" },
        ]}
      />

      {/* Header */}
      <section className="bg-navy-900">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100">
              <Icon name="badgeCheck" className="h-4 w-4 text-accent-400" />
              Verified · maintained
            </p>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl">
              Minnesota HVAC Rebate Database
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-100/85">
              A plain-spoken, source-linked record of the heating and cooling incentives Minnesota
              homeowners can actually use — which programs are active, which have expired, and where
              to confirm the current amount. We publish a dollar figure only when we can verify it
              from the official source; everything else links you straight to the provider.
            </p>
          </div>
        </Container>
      </section>

      {/* Important update: federal credit */}
      <section className="bg-white pt-10 lg:pt-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Callout tone="warning" title="Important 2026 update: the federal HVAC tax credit has expired">
              The federal Energy Efficient Home Improvement Credit (25C) — which offered up to
              {" "}{usd(FEDERAL_25C.capHeatPumpUsd)} toward a qualifying heat pump — was ended early by 2025 legislation and is{" "}
              <strong>no longer available for equipment placed in service after {FEDERAL_25C_EXPIRATION_LABEL}</strong>.
              If you installed qualifying equipment on or before that date, you may still claim it
              on your 2025 federal return; a tax professional can confirm. For 2026 projects, focus
              on the Minnesota utility rebates below and watch for the pending state program.
            </Callout>
          </div>
        </Container>
      </section>

      {/* Trust panel */}
      <section className="bg-white pt-10 lg:pt-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <DatasetTrustPanel meta={dataset.meta} />
          </div>
        </Container>
      </section>

      {/* The programs */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-extrabold text-navy-900">
              Programs &amp; incentives
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {dataset.rows.length} programs tracked. A &ldquo;verify current amount&rdquo; link means the
              program is offered but we have not confirmed the exact figure from the primary source in
              this review — always check the official page before you buy.
            </p>
            <div className="mt-6">
              <RebateTable rows={dataset.rows} />
            </div>
          </div>
        </Container>
      </section>

      {/* Next steps / internal links */}
      <section className="bg-slate-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
              <p className="font-display text-lg font-bold text-navy-900">Put this to work</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Match programs to your project with the{" "}
                <Link href="/tools/minnesota-hvac-rebate-checker" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
                  Minnesota rebate checker
                </Link>
                , read how the incentives fit together in the{" "}
                <Link href="/resources/minnesota-hvac-rebates" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
                  rebates &amp; tax credits guide
                </Link>
                , then subtract what you qualify for from a{" "}
                <Link href="/tools/hvac-cost-estimator" className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
                  cost estimate
                </Link>{" "}
                before you talk to contractors.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
