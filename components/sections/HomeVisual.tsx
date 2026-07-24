import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

/**
 * A homeowner-oriented visual band showing the real equipment and decisions
 * this platform helps with — furnaces and ductwork, central air, heat pumps,
 * smart thermostats, and the kind of side-by-side comparisons and cost
 * estimates our free tools produce. Educational context imagery (not a sales
 * hero): it orients a first-time visitor to what "an HVAC decision" actually
 * involves in a Minnesota home. Lazy-loaded and fixed-ratio to protect layout
 * stability.
 */
export function HomeVisual() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <Container>
        <SectionTitle
          eyebrow="What we help you decide"
          title="From furnaces to heat pumps — the real equipment and trade-offs"
          description="Central air, gas furnaces, cold-climate heat pumps, ductwork, and smart thermostats — our free tools turn these choices into clear Minnesota numbers before you talk to a contractor."
        />
        <figure className="mx-auto mt-10 max-w-4xl">
          <Image
            src="/site-images/home-hvac-collage.webp"
            alt="A collage of Minnesota home HVAC equipment and decisions: a snowy suburban home, an outdoor central air conditioner, a smart thermostat set to 72°F, a basement gas furnace with ductwork, a living room with a fireplace, a rooftop unit above the Minneapolis skyline, a homeowner reviewing an inspection checklist, an air-conditioner-versus-heat-pump comparison panel, and a laptop showing an HVAC cost estimator."
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="h-auto w-full rounded-2xl border border-navy-900/[0.08] shadow-card"
          />
          <figcaption className="mt-3 text-center text-xs text-slate-500">
            The equipment and comparisons our free tools and guides cover for Minnesota homeowners.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
