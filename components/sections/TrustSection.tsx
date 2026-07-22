import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionTitle } from "@/components/ui/SectionTitle";

const pillars: ReadonlyArray<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "dollar",
    title: "We publish real cost ranges",
    description:
      "Most HVAC sites hide prices until you're on the phone. Our cost guides and estimator show honest Twin Cities ranges up front.",
  },
  {
    icon: "sparkles",
    title: "Free tools, no strings",
    description:
      "Every calculator works without a phone number or email. Use them as many times as you like — that's the point.",
  },
  {
    icon: "badgeCheck",
    title: "A vetted, licensed network",
    description:
      "Contractors we connect you with are licensed, insured, and screened for workmanship before they ever reach your door.",
  },
  {
    icon: "shield",
    title: "Your privacy, protected",
    description:
      "Your details go only to the contractor matched to your request — never sold to call lists. No spam, ever.",
  },
  {
    icon: "home",
    title: "Independent by design",
    description:
      "We don't perform HVAC work, so we have no reason to upsell you. The contractors do the work; we help you choose well.",
  },
  {
    icon: "mapPin",
    title: "Built for Minnesota",
    description:
      "Cold-climate heat pumps, -20°F furnace failures, Xcel and CenterPoint rebates — everything here is written for homes like yours.",
  },
];

export function TrustSection() {
  return (
    <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-navy-600/25 blur-3xl" />
        <div className="absolute -right-24 top-10 h-[320px] w-[320px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>
      <Container className="relative py-20 lg:py-28">
        <Reveal>
          <SectionTitle
            tone="dark"
            eyebrow="Why Homeowners Trust Us"
            title="Honest by structure, not just by promise"
            description="No fake reviews, no invented badges — just how the platform actually works, and why that works in your favor."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={(i % 3) * 90}>
              <div className="flex h-full flex-col rounded-xl bg-white/[0.06] p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.1]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/75">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-100 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-300"
          >
            See exactly what happens after you request quotes
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
      <SectionDivider fill="white" className="relative" />
    </section>
  );
}
