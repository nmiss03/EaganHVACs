import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { absoluteUrl } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Exclusive HVAC Leads in the Twin Cities | Partner With Eagan HVACs",
  description:
    "Exclusive, un-shared HVAC leads from local Minnesota homeowners — never resold to your competitors. No long contracts. Your first leads free. Claim your south-metro city.",
  alternates: { canonical: "/for-contractors" },
  // Kept live at its URL as a ready asset for outreach later, but not
  // indexed or surfaced publicly until the site has real traffic/proof.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Get Exclusive HVAC Leads in the Twin Cities | Eagan HVACs",
    description:
      "Exclusive HVAC leads from local homeowners — never shared with competitors. No long contracts. Your first leads free.",
    url: absoluteUrl("/for-contractors"),
  },
};

const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "HVAC lead partnership — [Your Company]"
)}&body=${encodeURIComponent(
  "Hi — I run an HVAC company in the Twin Cities and I'd like to hear about exclusive leads.\n\nCompany:\nCity / service area:\nServices you want leads for (repair / install / maintenance):\nBest phone number:\n"
)}`;

const painPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "x",
    title: "The same lead, sold four times",
    body: "Angi, Thumbtack, and Networx resell every lead to a handful of your competitors. You're racing three other trucks to the same driveway before you've even called.",
  },
  {
    icon: "dollar",
    title: "$80–$300 for a coin flip",
    body: "You pay full price whether the homeowner answers or not — for a tire-kicker who filled out five forms and is only price-shopping.",
  },
  {
    icon: "clock",
    title: "No control, no relationship",
    body: "You can't pause it, you can't pick your city cleanly, and the homeowner never knew your name — they knew the aggregator's.",
  },
];

const offer: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Exclusive — never shared",
    body: "Every lead in your city and service line goes to you and only you. You're not racing anyone to the phone.",
  },
  {
    icon: "sparkles",
    title: "Your first leads are free",
    body: "Prove it works on your own jobs before a dollar changes hands. If the leads aren't real and local, you owe nothing.",
  },
  {
    icon: "badgeCheck",
    title: "No contracts, flat per-lead rate",
    body: "Month-to-month, cancel anytime. After the free trial you pay one agreed flat rate per qualified lead — no markup roulette.",
  },
];

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clipboard",
    title: "A homeowner finds us",
    body: "Minnesota homeowners land on our tools and cost guides while researching a repair or replacement, then request a quote.",
  },
  {
    icon: "shield",
    title: "We qualify & route it to you",
    body: "We capture the job type, city, timeline, and contact details, then hand the lead straight to you — exclusively.",
  },
  {
    icon: "phone",
    title: "You close it",
    body: "You reach out under your own name and win the job. We never touch the quote, the work, or your pricing.",
  },
];

const compare: { label: string; us: boolean; them: boolean }[] = [
  { label: "Lead goes to one contractor only", us: true, them: false },
  { label: "Try the leads free before paying", us: true, them: false },
  { label: "Flat, agreed per-lead price", us: true, them: false },
  { label: "Month-to-month, cancel anytime", us: true, them: false },
  { label: "Local Minnesota brand homeowners trust", us: true, them: false },
  { label: "You keep the homeowner relationship", us: true, them: false },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Are these really exclusive?",
    a: "Yes. Each lead is sent to a single contractor for that city and service line. We do not resell it — that is the entire point.",
  },
  {
    q: "What does a lead cost?",
    a: "After your free trial leads, you pay one flat rate per qualified lead that we agree on before you start. No surge pricing, no per-click billing, no long-term commitment.",
  },
  {
    q: "How many leads will I get?",
    a: "We're an early-stage, fast-growing Minnesota HVAC platform, so we're honest about volume: it starts as a trickle and grows as our content ranks. That's exactly why founding partners get free trial leads and locked-in rates now.",
  },
  {
    q: "What's a 'qualified' lead?",
    a: "A real Minnesota homeowner in your service area who asked for a quote and gave working contact details for a repair, replacement, or maintenance job — not a bot, not out of area, not a wrong number.",
  },
  {
    q: "Can I claim a specific city or suburb?",
    a: "Yes. Exclusivity is by city and service line, first come first served. If you want Eagan furnace installs, that territory is yours while our agreement is active.",
  },
];

export default function ForContractorsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Exclusive HVAC Lead Generation for Twin Cities Contractors",
    serviceType: "HVAC lead generation",
    areaServed: { "@type": "State", name: "Minnesota" },
    provider: { "@id": `${site.url}/#organization` },
    url: absoluteUrl("/for-contractors"),
    description:
      "Exclusive, un-shared HVAC leads from local Minnesota homeowners for licensed heating and cooling contractors in the Twin Cities south metro.",
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "For Contractors", href: "/for-contractors" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900" aria-label="Introduction">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-navy-600/30 blur-3xl" />
          <div className="absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-accent-500/10 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full text-white/[0.035]">
            <defs>
              <pattern id="fc-hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M44 0H0v44" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fc-hero-grid)" />
          </svg>
        </div>

        <Container className="relative py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100 backdrop-blur">
              <Icon name="wrench" className="h-4 w-4 text-accent-400" />
              For HVAC Contractors
            </p>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
              Exclusive HVAC leads in the south metro — yours alone, never resold.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-100/85">
              Eagan HVACs sends local Minnesota homeowners who are ready to book a
              repair, replacement, or tune-up straight to one contractor: you. No
              shared leads, no bidding war, no long contract — and your first leads
              are free.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={mailtoHref} size="lg">
                Claim your city
                <Icon name="arrowRight" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="ghost" size="lg">
                <Icon name="phone" className="h-5 w-5 text-accent-400" />
                Call {site.phone}
              </ButtonLink>
            </div>
            <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-7 sm:grid-cols-2">
              {[
                { icon: "shield" as IconName, label: "Exclusive — never shared" },
                { icon: "sparkles" as IconName, label: "First leads free" },
                { icon: "badgeCheck" as IconName, label: "No long-term contract" },
                { icon: "mapPin" as IconName, label: "Local Minnesota brand" },
              ].map((b) => (
                <li key={b.label} className="flex items-center gap-3 text-sm font-semibold text-navy-100">
                  <Icon name={b.icon} className="h-5 w-5 shrink-0 text-accent-400" />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <SectionDivider fill="white" className="relative" />
      </section>

      {/* The problem */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="The lead-gen you're used to"
            title="Shared leads are a broken deal"
            description="If you've bought leads from the big aggregators, you already know the feeling. Here's what you're actually paying for."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painPoints.map((p, i) => (
              <Reveal as="div" key={p.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-navy-900/[0.07] bg-slate-50 p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The offer */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="A better deal"
            title="Exclusive leads, proven before you pay"
            description="We only make money when you make money — so we hand you the first leads free and let the results do the talking."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offer.map((o, i) => (
              <Reveal as="div" key={o.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-navy-900/[0.07] bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                    <Icon name={o.icon} className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="How it works" title="From homeowner to your inbox" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="div" key={s.title} delay={i * 80}>
                <div className="relative h-full rounded-xl border border-navy-900/[0.07] bg-slate-50 p-6 shadow-card">
                  <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-navy-900/[0.08]">
                    {i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent-600 shadow-card">
                    <Icon name={s.icon} className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="Head to head" title="Eagan HVACs vs. shared-lead aggregators" />
          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border border-navy-900/[0.08] bg-white shadow-card">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-navy-900/[0.08] bg-navy-900 px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
              <span>What you get</span>
              <span className="w-20 text-center text-accent-400">Us</span>
              <span className="w-20 text-center text-navy-100/70">Them</span>
            </div>
            {compare.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-navy-900/[0.06] px-6 py-4 last:border-b-0"
              >
                <span className="text-sm font-medium text-navy-800">{row.label}</span>
                <span className="flex w-20 justify-center">
                  <Icon name="check" className="h-5 w-5 text-emerald-600" strokeWidth={2.5} />
                </span>
                <span className="flex w-20 justify-center">
                  <Icon name="x" className="h-5 w-5 text-slate-300" strokeWidth={2.5} />
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="Straight answers" title="Contractor FAQ" />
          <div className="mx-auto mt-12 max-w-2xl divide-y divide-navy-900/[0.08]">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-base font-bold text-navy-900">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-16 lg:pb-24" aria-label="Get started">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-navy-900 px-7 py-12 text-center shadow-card-hover sm:px-14 lg:py-16">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -left-24 -top-24 h-[280px] w-[280px] rounded-full bg-navy-600/40 blur-3xl" />
              <div className="absolute -bottom-24 -right-20 h-[300px] w-[300px] rounded-full bg-accent-500/15 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Claim your city before a competitor does
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-navy-100/80">
                Exclusivity is one contractor per city and service line. Tell us where
                you work and what jobs you want, and we&rsquo;ll set up your free trial leads.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink href={mailtoHref} size="lg">
                  Email us to get started
                  <Icon name="arrowRight" className="h-5 w-5" />
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="ghost" size="lg">
                  <Icon name="phone" className="h-5 w-5 text-accent-400" />
                  {site.phone}
                </ButtonLink>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-navy-100/60">
                Eagan HVACs is an independent Minnesota HVAC information platform. We
                connect homeowners with licensed local contractors — we don&rsquo;t perform
                heating or cooling work ourselves.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
