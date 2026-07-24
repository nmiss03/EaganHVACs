import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works | Compare Local HVAC Quotes Free",
  description:
    "How Eagan HVACs works: tell us what you need, we match you with vetted local HVAC contractors, and you compare multiple free quotes. No cost, no obligation, no spam.",
  alternates: { canonical: "/how-it-works" },
};

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "gauge",
    title: "1. Start with the free tools",
    body: "Estimate your project cost, check how much life your system has left, run the repair-vs-replace numbers, or score a quote — in about a minute, with no signup.",
  },
  {
    icon: "clipboard",
    title: "2. Learn what's fair",
    body: "Read honest Minnesota cost guides, rebate breakdowns, and troubleshooting help so you understand the decision — and a fair price — before anyone quotes you.",
  },
  {
    icon: "phoneCall",
    title: "3. Get and compare your own quotes",
    body: "Contact two or three local contractors, get written quotes, and compare them side by side using our checklist and quote analyzer. You stay in control the whole way.",
  },
  {
    icon: "home",
    title: "4. Hire with confidence",
    body: "Choose the contractor and price that's right for your home and hire them directly. We're independent — we're not in the truck and we take no cut.",
  },
];

const vetting: string[] = [
  "Is licensed for HVAC work in Minnesota — ask for the license number",
  "Carries current liability insurance (and workers' comp for crews)",
  "Has an established local presence and genuine, verifiable reviews",
  "Provides an upfront, itemized written quote before any work begins",
  "Runs a proper load calculation (Manual J) for a replacement, not a rule-of-thumb guess",
];

const promises: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "dollar",
    title: "Always free, no signup",
    body: "Every tool and guide is free, and the calculators never require a phone number or email. There's nothing to buy here.",
  },
  {
    icon: "shield",
    title: "Your privacy is protected",
    body: "The tools run in your browser. If you download a guide and share your email, we never sell it — and there's no spam.",
  },
  {
    icon: "badgeCheck",
    title: "Genuinely unbiased",
    body: "We don't sell equipment, install systems, or take contractor commissions, so we have no reason to steer you toward any product or company.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "How It Works", href: "/how-it-works" },
        ]}
      />
      <PageHero
        eyebrow="How It Works"
        icon="clipboard"
        title="How to Make a Confident HVAC Decision"
        intro={[
          `${site.name} is a free, independent resource for Twin Cities homeowners. We don't sell, install, or repair anything — we give you the tools, honest cost data, and guides to understand your options and hire the right local contractor yourself. Here's how to use it.`,
        ]}
      />

      {/* The 4 steps */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="The process"
            title="From question to confident decision"
            description="Four simple steps — and you're in control at every one."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.title} className="rounded-xl border border-navy-900/[0.07] bg-white p-6 shadow-card">
                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-navy-900 p-3 text-accent-400">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Vetting standards */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                align="left"
                eyebrow="Vetting checklist"
                title="How to vet an HVAC contractor yourself"
                description="You hire the contractor directly, so vet them before you sign. Make sure whoever you choose:"
              />
            </div>
            <ul className="space-y-3.5">
              {vetting.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-navy-900/[0.07] bg-white p-4 text-navy-800 shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Promises */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <SectionTitle eyebrow="Our promise to homeowners" title="What you can count on" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {promises.map((p) => (
              <div key={p.title} className="rounded-xl border border-navy-900/[0.07] bg-white p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/[0.05] text-accent-600">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Honest disclosure */}
          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6 text-center">
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-navy-900">A note on how we operate:</strong>{" "}
              {site.name} is an independent information resource, not an HVAC
              contractor. We don&rsquo;t sell, install, or repair equipment, we don&rsquo;t
              dispatch technicians, and we&rsquo;re not affiliated with any contractor. Our
              only role is to give you the tools and honest information to make a smart
              decision and hire a qualified local pro yourself.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Want the full picture?{" "}
              <Link
                href="/about#methodology"
                className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
              >
                Read about who we are and how we research our guides
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTABand
        heading="Ready to start?"
        sub="Grab the free Buyer's Kit or jump into the tools — everything you need to plan your project and hire the right local contractor with confidence."
      />
    </>
  );
}
