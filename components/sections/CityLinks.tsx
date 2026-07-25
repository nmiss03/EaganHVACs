import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { locations } from "@/lib/content";

/**
 * A compact strip of city-guide links, used to make the topical graph
 * bidirectional: tools and articles link back into the local buying guides
 * the location pages link out from. Server component, no client JS.
 *
 * Pass `heading`/`description` to tailor the framing to the host page.
 */
export function CityLinks({
  heading = "HVAC guides for Twin Cities homeowners",
  description = "Local cost ranges, common problems, rebates, and how to hire — a homeowner buying guide for each south-metro city.",
  slugs,
  tone = "light",
}: {
  heading?: string;
  description?: string;
  /** Which cities to feature; defaults to a representative south-metro set. */
  slugs?: string[];
  tone?: "light" | "slate";
}) {
  const featured = (
    slugs ?? [
      "eagan",
      "burnsville",
      "bloomington",
      "apple-valley",
      "lakeville",
      "savage",
      "rosemount",
      "inver-grove-heights",
    ]
  )
    .map((s) => locations.find((l) => l.slug === s))
    .filter((l): l is (typeof locations)[number] => Boolean(l));

  if (featured.length === 0) return null;

  return (
    <section className={tone === "slate" ? "bg-slate-50 py-14 lg:py-16" : "bg-white py-14 lg:py-16"}>
      <Container>
        <SectionTitle eyebrow="By city" title={heading} description={description} />
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) => (
            <Link
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="group flex items-center gap-2.5 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent-500" />
              <span className="font-display text-sm font-bold text-navy-900">{l.name}, MN</span>
              <Icon name="arrowRight" className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link
            href="/locations"
            className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-4 hover:text-accent-800"
          >
            See all Twin Cities HVAC city guides →
          </Link>
        </p>
      </Container>
    </section>
  );
}
