import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { allServiceDetails } from "@/lib/content";

/** Compact directory of service pages — key internal links plus a fast
 * path for homeowners who arrive with a specific problem. */
export function ServicesStrip() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Something broken right now?"
            title="Jump straight to your problem"
            description="Each service guide covers warning signs, what a repair involves, and honest answers — then connects you with local pros when you're ready."
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServiceDetails.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy-900">
                  {service.title}
                </span>
                <Icon
                  name="arrowRight"
                  className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
