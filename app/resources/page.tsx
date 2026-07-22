import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { articleCategories, articles } from "@/lib/articles";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "HVAC Resource Center | Guides for Minnesota Homeowners",
  description:
    "Honest, Minnesota-specific HVAC guides: costs, rebates, maintenance, troubleshooting, and how to hire a contractor. Learn before you decide.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
      />
      <PageHero
        eyebrow="Homeowner Resource Center"
        icon="clipboard"
        title="HVAC Guides for Minnesota Homeowners"
        intro={[
          "Straight, practical answers written for homeowners — not sales pitches. Understand costs, claim every rebate, keep your system alive longer, and know exactly what to ask before you hire. Learn first; compare quotes when you're ready.",
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <Container>
          {articleCategories.map((category) => {
            const inCategory = articles.filter((a) => a.category === category);
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent-700">
                  {category}
                </h2>
                <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {inCategory.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/resources/${article.slug}`}
                      className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                    >
                      <h3 className="font-display text-lg font-bold leading-snug text-navy-900">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {article.intro[0]?.slice(0, 130)}…
                      </p>
                      <span className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Icon name="clock" className="h-3.5 w-3.5" />
                        {article.readMinutes} min read
                        <span className="ml-auto inline-flex items-center gap-1 font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                          Read
                          <Icon name="arrowRight" className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Cross-link to tools */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <SectionTitle
            eyebrow="Interactive tools"
            title="Prefer a quick answer? Try a calculator"
            description="Our free tools turn these guides into a personalized recommendation in seconds."
          />
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy-900">{t.title}</span>
                <Icon name="arrowRight" className="ml-auto h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        heading="Done researching? Compare local quotes."
        sub="Get free, no-obligation quotes from vetted local HVAC contractors serving the Twin Cities south metro."
      />
    </>
  );
}
