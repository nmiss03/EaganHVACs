import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { PageHero } from "@/components/landing/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free HVAC Tools & Calculators for Minnesota Homeowners",
  description:
    "Free HVAC calculators for Minnesota homeowners: repair-or-replace decision tool and system lifespan estimator. Educate yourself before you spend a dollar.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndexPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
        ]}
      />
      <PageHero
        eyebrow="Free Homeowner Tools"
        icon="gauge"
        title="HVAC Calculators & Decision Tools"
        intro={[
          "Free, no-signup tools to help you make confident HVAC decisions before you spend a dollar. Understand your options first — then, when you're ready, compare quotes from trusted local contractors.",
        ]}
      />

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={tool.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-navy-900">
                  {tool.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {tool.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                  Open tool
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        heading="Know your options? Compare local quotes."
        sub="Every tool here is free and unbiased — use them to understand your options, then hire the right local contractor with confidence."
      />
    </>
  );
}
