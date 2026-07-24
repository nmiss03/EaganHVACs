import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { KitCapture } from "@/components/sections/KitCapture";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PrintButton } from "@/components/ui/PrintButton";
import { absoluteUrl } from "@/lib/content";
import { site } from "@/lib/site";
import {
  kitChecklist,
  kitPrices,
  kitQuestions,
  kitRebates,
} from "@/lib/buyers-kit";

export const metadata: Metadata = {
  title: "Free Minnesota HVAC Buyer's Kit | Checklist, Questions & Rebates",
  description:
    "A free kit for Minnesota homeowners: the HVAC quote-comparison checklist, the exact questions to ask a contractor, fair Twin Cities price ranges, and the Xcel/CenterPoint rebate cheat sheet.",
  alternates: { canonical: "/minnesota-hvac-buyers-kit" },
  openGraph: {
    title: "Free Minnesota HVAC Buyer's Kit",
    description:
      "The quote-comparison checklist, questions to ask, fair price ranges, and Minnesota rebate cheat sheet — free.",
    url: absoluteUrl("/minnesota-hvac-buyers-kit"),
  },
};

export default function BuyersKitPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compare HVAC quotes in Minnesota",
    description:
      "Use the Minnesota HVAC Buyer's Kit — a checklist, questions to ask, fair price ranges, and rebate cheat sheet — to compare heating and cooling quotes with confidence.",
    url: absoluteUrl("/minnesota-hvac-buyers-kit"),
    step: kitChecklist.map((label, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: label,
    })),
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Buyer's Kit", href: "/minnesota-hvac-buyers-kit" },
        ]}
      />

      {/* Header */}
      <section className="bg-navy-900">
        <Container className="py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100">
              <Icon name="clipboard" className="h-4 w-4 text-accent-400" />
              Free homeowner kit
            </p>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl">
              The Minnesota HVAC Buyer&rsquo;s Kit
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-100/85">
              Everything you need to walk into your quotes informed and walk out
              confident — the comparison checklist, the questions to ask, fair Twin
              Cities price ranges, and the rebate cheat sheet. Free, no strings.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PrintButton />
              <a
                href="#email-kit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Icon name="mail" className="h-4 w-4 text-accent-400" />
                Email it to me
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14">
            {/* Checklist */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">
                  The quote-comparison checklist
                </h2>
              </div>
              <p className="mt-3 text-slate-600">
                A trustworthy replacement quote should include every one of these. Anything
                missing is a question to ask before you sign.
              </p>
              <ul className="mt-5 space-y-3">
                {kitChecklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-navy-900/[0.07] bg-slate-50 px-4 py-3"
                  >
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" strokeWidth={2.5} />
                    <span className="text-sm font-medium text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/tools/hvac-quote-analyzer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800"
              >
                Score a real quote with the Quote Analyzer
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            {/* Questions */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon name="quote" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">
                  The exact questions to ask
                </h2>
              </div>
              <ol className="mt-5 space-y-3">
                {kitQuestions.map((q, i) => (
                  <li key={q} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs font-bold text-accent-700">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-navy-800">{q}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prices */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon name="dollar" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">
                  Fair Twin Cities price ranges
                </h2>
              </div>
              <p className="mt-3 text-slate-600">
                Typical installed prices before rebates. If a quote is far outside these,
                ask why.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-navy-900/[0.08]">
                {kitPrices.map((p, i) => (
                  <div
                    key={p.label}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-navy-800">{p.label}</span>
                    <span className="font-display text-sm font-bold text-navy-900">{p.range}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/tools/hvac-cost-estimator"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800"
              >
                Estimate your home&rsquo;s cost
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            {/* Rebates */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon name="badgeCheck" className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">
                  Minnesota rebate cheat sheet
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {kitRebates.map((r) => (
                  <li
                    key={r.program}
                    className="rounded-xl border border-navy-900/[0.07] bg-slate-50 px-4 py-3"
                  >
                    <span className="block font-display text-sm font-bold text-navy-900">
                      {r.program}
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-600">{r.covers}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Rebate amounts change every program year — always verify current values with
                your utility.
              </p>
              <Link
                href="/tools/minnesota-hvac-rebate-checker"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800"
              >
                Check which rebates apply to you
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            {/* Email capture */}
            <div id="email-kit" className="scroll-mt-24">
              <KitCapture
                source="buyers-kit-page"
                title="Want a copy in your inbox?"
                blurb="We'll email you this whole kit to keep — plus the occasional Minnesota rebate and cost update. No spam, unsubscribe anytime."
              />
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
