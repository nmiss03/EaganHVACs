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
    icon: "clipboard",
    title: "1. Tell us what you need",
    body: "Answer a few quick questions about your home and the issue — a broken furnace, an aging AC, a new system, or just a tune-up. It takes about a minute, and there's no cost.",
  },
  {
    icon: "shield",
    title: "2. We match you with vetted local pros",
    body: "We connect your request with independent, licensed HVAC contractors in our network who serve your city and handle your type of job — so you're not cold-calling strangers.",
  },
  {
    icon: "phoneCall",
    title: "3. You compare multiple quotes",
    body: "Contractors reach out — usually within the hour during business hours — so you can compare pricing, timelines, and approaches side by side. You choose who to work with, if anyone.",
  },
  {
    icon: "home",
    title: "4. Your chosen pro does the work",
    body: "The contractor you pick performs the work directly. We're not in the truck — our job is done once you've got quotes you trust and the information to choose confidently.",
  },
];

const vetting: string[] = [
  "Licensed for HVAC work in Minnesota",
  "Carries current insurance",
  "Established local presence in the communities they serve",
  "Track record of professional, quality workmanship",
  "Willing to provide upfront, itemized quotes",
];

const promises: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "dollar",
    title: "Always free for homeowners",
    body: "We never charge you for quotes or referrals. There's no fee to use the service and no obligation to hire anyone.",
  },
  {
    icon: "shield",
    title: "Your information is protected",
    body: "We share your request only with the contractors matched to your job, so they can reach out about your project — never sold to unrelated third parties.",
  },
  {
    icon: "bolt",
    title: "Fast, real responses",
    body: "Most homeowners hear back within the hour during business hours, with same-day and 24/7 options available for genuine emergencies.",
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
        title="Compare Trusted Local HVAC Quotes — Free"
        intro={[
          `${site.name} is a free service that helps Twin Cities homeowners compare quotes from independent, licensed HVAC contractors. We don't perform the work ourselves — we save you the time and uncertainty of finding trustworthy pros and comparing your options.`,
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
                eyebrow="Our standards"
                title="How we choose the contractors in our network"
                description="We're selective about who we send to your door. Every contractor in our network meets these standards:"
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
              {site.name} is a free matching and comparison service, not an HVAC
              contractor. All heating and cooling work is performed by the independent,
              licensed contractors in our network. We don&rsquo;t dispatch our own
              technicians or perform installations — our role is to help you find and
              compare trustworthy local pros with confidence.
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
        heading="Ready to compare your options?"
        sub="Tell us what you need and start comparing free quotes from vetted local HVAC contractors — no cost, no obligation."
      />
    </>
  );
}
