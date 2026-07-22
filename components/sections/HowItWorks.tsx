import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="How The Platform Works"
            title="Understand first. Compare second. Decide on your terms."
            description="We built the order homeowners actually want: education and honest numbers before anyone asks for your phone number."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting dashed line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-navy-200 lg:block"
          />
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 120}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-accent-400 shadow-card-hover">
                <Icon name={step.icon} className="h-8 w-8" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 font-display text-sm font-bold text-navy-950">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/tools/hvac-cost-estimator" size="lg">
            Start With the Cost Estimator
            <Icon name="arrowRight" className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/how-it-works" variant="white" size="lg">
            See the full process
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
