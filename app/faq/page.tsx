import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LastUpdated } from "@/components/ui/LastUpdated";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { allServiceDetails } from "@/lib/content";

export const metadata: Metadata = {
  title: "HVAC FAQs | Costs, Repairs & Advice for Eagan, MN Homeowners",
  description:
    "Answers to the HVAC questions Eagan homeowners ask most: repair costs, furnace problems, AC sizing, system lifespan, repair vs. replace, and more.",
  alternates: { canonical: "/faq" },
};

interface FaqGroup {
  title: string;
  faqs: { question: string; answer: string }[];
}

const faqGroups: FaqGroup[] = [
  {
    title: "Costs & pricing",
    faqs: [
      {
        question: "How much does AC repair cost in Eagan?",
        answer:
          "Most common AC repairs in the Eagan area — capacitors, contactors, fan motors — fall in the low hundreds of dollars, while refrigerant leaks or compressor issues cost more. A reputable contractor gives you an upfront written price after diagnosis, and the diagnostic fee is often applied to the repair — so you're not surprised by the bill.",
      },
      {
        question: "How much does furnace repair cost?",
        answer:
          "Simple fixes like a flame sensor cleaning or ignitor replacement are typically inexpensive; blower motors and control boards cost more. The honest answer is that no one can price a repair before diagnosing it — which is why an upfront, written estimate before any work begins is non-negotiable. Insist on one from any contractor you consider.",
      },
      {
        question: "How much does a new furnace or AC cost in Minnesota?",
        answer:
          "A full system replacement typically runs several thousand dollars depending on size, efficiency rating, and installation complexity. High-efficiency equipment costs more upfront but qualifies for Xcel Energy and CenterPoint rebates and lowers bills every month. (The federal 25C tax credit expired at the end of 2025.) Replacement quotes are always free.",
      },
      {
        question: "Are HVAC estimates free?",
        answer:
          "Estimates for replacements and new installations are typically free from most contractors. Repair visits usually carry a standard diagnostic fee — quoted before the visit — which is often credited toward the repair itself. Everything on Eagan HVACs is always free.",
      },
      {
        question: "Are there rebates for high-efficiency HVAC in Minnesota?",
        answer:
          "Yes. Xcel Energy and CenterPoint Energy offer rebates for qualifying high-efficiency furnaces, air conditioners, heat pumps, and smart thermostats. (The federal 25C tax credit expired at the end of 2025, so 2026 savings come from utility rebates and the pending state program.) A good local installer helps you claim what you qualify for.",
      },
    ],
  },
  {
    title: "Repair or replace?",
    faqs: [
      {
        question: "Should I repair or replace my furnace?",
        answer:
          "A useful rule of thumb: if your furnace is past 15 years old and the repair costs more than a third of a new system, replacement usually wins financially. Below that, repair is often the smart call. A good technician will show you real numbers for both paths — never pressure.",
      },
      {
        question: "How long should an HVAC system last?",
        answer:
          "In Minnesota's climate, furnaces typically last 15–20 years and air conditioners 12–17, with heat pumps in a similar range. Annual maintenance is the biggest factor in reaching the high end of those ranges.",
      },
      {
        question: "Is it worth replacing my furnace and AC at the same time?",
        answer:
          "If both are near end of life, yes — combining them saves on labor, and matched systems run more efficiently together. If one is significantly newer, replacing just the failing unit usually makes more sense.",
      },
      {
        question: "My AC uses R-22 refrigerant. What does that mean?",
        answer:
          "R-22 was phased out in 2020, so recharging an R-22 system is expensive and gets worse every year. If your system still runs on it, plan for replacement rather than sinking money into repairs that depend on a discontinued refrigerant.",
      },
    ],
  },
  {
    title: "Common problems",
    faqs: [
      {
        question: "Why is my furnace blowing cold air?",
        answer:
          "The usual culprits: a thermostat set to 'fan on' instead of 'auto,' a dirty flame sensor, a failed ignitor, or an overheating furnace that shut off its burners for safety. Some are five-minute fixes; some need a technician — a diagnostic pinpoints it quickly.",
      },
      {
        question: "Why is my AC running but not cooling the house?",
        answer:
          "Most often it's low refrigerant from a leak, a frozen evaporator coil, a failing capacitor, or a dirty outdoor condenser. Check your filter first — a badly clogged filter alone can cripple cooling — then call for a diagnostic if that doesn't fix it.",
      },
      {
        question: "Why does my system turn on and off repeatedly?",
        answer:
          "Short cycling can come from an oversized system, a clogged filter, a failing thermostat, refrigerant issues, or overheating. It wears equipment fast and spikes bills, so it's worth diagnosing promptly rather than living with it.",
      },
      {
        question: "What's that smell when I turn my furnace on?",
        answer:
          "A brief dusty burning smell at the start of heating season is normal — that's summer dust burning off. A persistent electrical or burning-plastic smell, or anything like rotten eggs (gas), is not: shut the system down and call right away.",
      },
    ],
  },
  {
    title: "Sizing & efficiency",
    faqs: [
      {
        question: "What size AC do I need for my house?",
        answer:
          "It depends on square footage, insulation, windows, ceiling heights, and sun exposure — which is why proper installers run a Manual J load calculation instead of guessing by square footage alone. Oversized systems short cycle and dehumidify poorly; undersized ones run constantly. Sizing right matters more than brand.",
      },
      {
        question: "What furnace efficiency (AFUE) should I choose in Minnesota?",
        answer:
          "With our long heating season, high-efficiency condensing furnaces (95%+ AFUE) usually pay off in Minnesota and qualify for utility rebates. Your installer can compare lifetime operating costs of the options for your actual usage.",
      },
      {
        question: "Do smart thermostats really lower bills?",
        answer:
          "Yes — typically around 8% on heating and cooling, more if your schedule is away-heavy. In a Minnesota heating season that adds up quickly, which is why a professionally installed and configured smart thermostat is one of the fastest-payback upgrades.",
      },
      {
        question: "How often should I change my furnace filter?",
        answer:
          "Basic 1-inch filters: every 1–3 months. Thicker media filters: every 6–12 months. Homes with pets or allergies should lean toward the shorter end. A clogged filter is the single most common cause of avoidable HVAC problems.",
      },
    ],
  },
  {
    title: "Timing & hiring",
    faqs: [
      {
        question: "How fast can I get HVAC help in an emergency?",
        answer:
          "For a no-heat or no-cooling emergency, most Twin Cities HVAC companies offer same-day and 24/7 service — call a licensed local contractor directly and they'll prioritize it. Routine repairs and tune-ups are typically scheduled within 1–2 business days.",
      },
      {
        question: "What areas does Eagan HVACs cover?",
        answer:
          "Our guides, tools, and cost data focus on Eagan and the surrounding south metro, including Apple Valley, Burnsville, Rosemount, Inver Grove Heights, Mendota Heights, Lakeville, Savage, Prior Lake, Shakopee, Bloomington, and nearby communities.",
      },
      {
        question: "How do I know an HVAC contractor is licensed and insured?",
        answer:
          "In Minnesota, ask any contractor for their state license number and current proof of insurance before work begins, and confirm the license on the state's licensing lookup. Our contractor-questions guide walks you through exactly what to verify.",
      },
      {
        question: "When should I schedule seasonal maintenance?",
        answer:
          "AC tune-ups in spring before the first heat wave; furnace tune-ups in early fall before the first cold snap. Booking ahead of peak season means better appointment availability and catches problems before the weather stresses your system.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((group) => group.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />
      <PageHero
        eyebrow="Homeowner answers"
        icon="clipboard"
        title="HVAC Questions, Answered Honestly"
        intro={[
          "Straight, unbiased answers to the questions Minnesota homeowners ask most — costs, common problems, repair-or-replace decisions, and how to get the most from your system. Want to go deeper? The free tools and guides break each one down.",
        ]}
      />

      <div className="border-b border-navy-900/[0.06] bg-white">
        <Container className="py-3.5">
          <LastUpdated updated="July 2026" />
        </Container>
      </div>

      {faqGroups.map((group, gi) => (
        <section
          key={group.title}
          className={`py-14 lg:py-16 ${gi % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <Container>
            <SectionTitle eyebrow={`Part ${gi + 1}`} title={group.title} />
            <div className="mx-auto mt-9 max-w-3xl space-y-4">
              {group.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-navy-900/[0.08] bg-white shadow-card transition-shadow open:shadow-card-hover"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-6 font-display text-base font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-700 transition-all duration-300 group-open:rotate-180 group-open:bg-accent-500 group-open:text-white">
                      <Icon name="chevronDown" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* Internal links to service pages */}
      <section className="bg-slate-50 py-14 lg:py-16">
        <Container>
          <SectionTitle
            eyebrow="Go deeper"
            title="Detailed guides for every service"
            description="Each service page covers warning signs, what a pro will do, and service-specific questions."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServiceDetails.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy-900">{s.title}</span>
                <Icon
                  name="arrowRight"
                  className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        heading="Still have a question about your system?"
        sub="Describe what's going on and a trusted local pro will give you a straight answer — free quotes, no pressure."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
