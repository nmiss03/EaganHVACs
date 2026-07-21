import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services, type Service } from "@/lib/site";

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
      <span
        aria-hidden="true"
        className="absolute inset-x-7 top-0 h-[3px] scale-x-0 rounded-full bg-accent-500 transition-transform duration-300 group-hover:scale-x-100"
      />
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
        <Icon name={service.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {service.description}
      </p>
      <ul className="mt-5 space-y-2.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-navy-800">
            <Icon
              name="check"
              className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
              strokeWidth={2.2}
            />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/#inquiry"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-900 transition-colors hover:text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
      >
        Request this service
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Our Services"
            title="Every heating & cooling problem, handled"
            description="From emergency furnace repair to full system replacement, local pros are ready to keep your home comfortable in every season."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
