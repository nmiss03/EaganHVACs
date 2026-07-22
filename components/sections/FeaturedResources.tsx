import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { articles } from "@/lib/articles";

export function FeaturedResources() {
  const featured = articles.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-navy-100/60 blur-3xl"
      />
      <Container className="relative">
        <Reveal>
          <SectionTitle
            eyebrow="Homeowner Resource Center"
            title="Learn before you spend"
            description="Practical, Minnesota-specific guides written to answer your questions completely — not to collect your phone number."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {featured.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <Link
                href={`/resources/${article.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-navy-900/[0.05] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-navy-700">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {article.readMinutes} min read
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-navy-900 transition-colors group-hover:text-accent-600">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {article.intro[0]?.slice(0, 150)}…
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                  Read the guide
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-navy-900/15 bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            Browse all guides & resources
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
