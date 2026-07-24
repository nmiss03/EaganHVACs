import { KitCapture } from "@/components/sections/KitCapture";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const reassurances = [
  {
    icon: "dollar",
    title: "100% free — no catch",
    description: "Every tool and guide is free, and the calculators never ask for a phone number.",
  },
  {
    icon: "shield",
    title: "No sales calls, ever",
    description: "We don't sell, install, or repair anything, so nothing here is built to push you toward a purchase.",
  },
  {
    icon: "badgeCheck",
    title: "Unbiased Minnesota data",
    description: "Cost ranges, rebates, and advice written for Twin Cities homes — so you hire from a position of knowledge.",
  },
] as const;

export function InquirySection() {
  return (
    <section
      id="inquiry"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-navy-100/70 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionTitle
                align="left"
                eyebrow="When You're Ready"
                title="Hire your HVAC contractor with confidence"
                description="Used the tools? Read the guides? The last step is getting your own quotes and comparing them well. Grab the free Buyer's Kit — the checklist, the questions to ask, fair price ranges, and the rebate cheat sheet — so you walk into every quote already knowing what a fair deal looks like."
              />
            </Reveal>
            <ul className="mt-10 space-y-6">
              {reassurances.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 80} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-card">
                    <Icon name={item.icon} className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={280}>
              <Link
                href="/how-it-works"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
              >
                See how to use this platform to decide
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <KitCapture source="home-inquiry" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
