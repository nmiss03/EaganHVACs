import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/** Routes the two homeowner mindsets — "something's wrong now" vs
 * "planning ahead" — to the right path immediately, near the top. */
export function TwoPaths() {
  return (
    <section className="bg-white pb-4 pt-16 lg:pt-20" aria-label="Where to start">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {/* Type A — urgent */}
          <Reveal>
            <div className="group flex h-full flex-col rounded-2xl border border-navy-900/[0.08] bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                <Icon name="bolt" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-navy-900">
                Something&rsquo;s wrong right now
              </h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">
                Furnace out, AC not cooling, or a strange noise you can&rsquo;t
                ignore? Get matched with a licensed local pro and compare quotes
                fast — 24/7 for real emergencies.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#inquiry"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-accent-600"
                >
                  Compare Local Quotes
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
                >
                  <Icon name="phone" className="h-4 w-4 text-accent-500" />
                  Call now
                </a>
              </div>
            </div>
          </Reveal>

          {/* Type B — researching */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col rounded-2xl border border-navy-900/[0.08] bg-navy-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent-300">
                <Icon name="sparkles" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-white">
                Planning ahead
              </h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-navy-100/75">
                Budgeting for a replacement or just want to understand your
                options? Start with the free tools and honest cost guides —
                no phone number required.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
                >
                  Explore Homeowner Tools
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Read the guides
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
