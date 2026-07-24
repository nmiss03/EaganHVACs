import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqs, site } from "@/lib/site";

/**
 * Accordion built on native <details>/<summary> — fully keyboard
 * accessible with zero client-side JavaScript.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="FAQ"
            title="Answers to common questions"
            description="Everything homeowners usually ask before spending on HVAC. Want more detail? Explore the full FAQ and the free guides."
          />
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <details className="group rounded-xl border border-navy-900/[0.08] bg-white shadow-card transition-shadow open:shadow-card-hover">
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
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Still have questions?{" "}
            <Link
              href="/faq"
              className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
            >
              Browse all FAQs
            </Link>{" "}
            or{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 transition-colors hover:text-accent-600"
            >
              call {site.phone}
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
