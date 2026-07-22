import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { tools } from "@/lib/tools";

/** Per-tool "answers this question" + example output, so the showcase
 * demonstrates value instead of only naming the tool. */
const preview: Record<string, { answers: string; example: string }> = {
  "hvac-cost-estimator": {
    answers: "What will a new system cost me?",
    example: "e.g. $6,400 – $9,200 installed",
  },
  "repair-or-replace": {
    answers: "Should I fix it or replace it?",
    example: "e.g. “Lean toward replacement”",
  },
  "system-lifespan": {
    answers: "How many years do I have left?",
    example: "e.g. ~3 years remaining",
  },
};

export function FeaturedTools() {
  return (
    <section id="tools" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Free Homeowner Tools"
            title="Answer the big questions in under a minute"
            description="No phone number required, no sales call afterward. These free tools give you honest, Minnesota-specific answers before you talk to anyone."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {tools.map((tool, i) => (
            <Reveal key={tool.slug} delay={i * 90}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-900/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-400">
                  <Icon name={tool.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-accent-700">
                  {preview[tool.slug]?.answers}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {tool.short}
                </p>
                <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-navy-700">
                  {preview[tool.slug]?.example}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Under a minute · Free
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                  Try the tool
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Future tools placeholder — honest, not fake */}
          <Reveal delay={tools.length * 90}>
            <div className="flex h-full flex-col rounded-xl border-2 border-dashed border-navy-200 bg-slate-50/60 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy-400 shadow-sm">
                <Icon name="sparkles" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-700">
                More tools on the way
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                A Minnesota rebate finder and an energy-savings calculator are
                next on our list — built the same way: free, honest, and
                no phone number required.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                In development
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
