import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/landing/FaqList";
import { Icon } from "@/components/ui/Icon";
import { StickyToc, type TocSection } from "@/components/cityguide/StickyToc";
import { ResearchSnapshot } from "@/components/ui/ResearchSnapshot";
import { RangeBar } from "@/components/ui/RangeBar";
import { renderInline } from "@/lib/render-inline";
import { getTool, type ToolMeta } from "@/lib/tools";
import type { ToolContent } from "@/lib/tool-content";

const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <>
    {paragraphs.map((p) => (
      <p key={p.slice(0, 28)} className="mt-3 text-[15px] leading-relaxed text-slate-700">
        {renderInline(p)}
      </p>
    ))}
  </>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-4 space-y-2.5">
    {items.map((item) => (
      <li key={item.slice(0, 28)} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
        <span>{renderInline(item)}</span>
      </li>
    ))}
  </ul>
);

function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-28 font-display text-2xl font-bold text-navy-900 first:mt-0">
      {children}
    </h2>
  );
}

/**
 * Renders the long-form pillar content beneath a calculator: the tool stays
 * above the fold (rendered by the page), and this component adds the
 * comprehensive resource — methodology, examples, FAQs, and the internal-link
 * graph out to related guides, tools, and rebate content.
 */
export function ToolPillar({ tool, content }: { tool: ToolMeta; content: ToolContent }) {
  const relatedTools = content.relatedTools
    .map((slug) => getTool(slug))
    .filter((t): t is ToolMeta => Boolean(t));

  // Build the "On this page" nav from the sections that are actually present.
  const toc: TocSection[] = [
    { id: "overview", label: "Overview" },
    { id: "what-it-does", label: "What it does" },
    { id: "when-to-use", label: "When to use it" },
    { id: "how-it-works", label: "How it works" },
    { id: "methodology", label: "Methodology" },
    { id: "assumptions", label: "Assumptions" },
    { id: "limitations", label: "Limitations" },
    { id: "examples", label: "Examples" },
    { id: "common-mistakes", label: "Common mistakes" },
    ...(content.repairVsReplace ? [{ id: "repair-or-replace", label: "Repair vs. replace" }] : []),
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <StickyToc sections={toc} />

      <section className="bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ResearchSnapshot updated={tool.updated} className="mb-10" />

            {content.costSnapshot ? (
              <figure className="mb-10 rounded-xl border border-navy-900/[0.08] bg-white p-5 shadow-card sm:p-6">
                <figcaption className="font-display text-base font-bold text-navy-900">
                  {content.costSnapshot.title}
                </figcaption>
                {content.costSnapshot.note ? (
                  <p className="mt-1 text-xs text-slate-500">{content.costSnapshot.note}</p>
                ) : null}
                <div className="mt-4 space-y-3.5">
                  {content.costSnapshot.bars.map((b) => (
                    <RangeBar
                      key={b.label}
                      label={b.label}
                      low={b.low}
                      high={b.high}
                      scaleMax={content.costSnapshot!.scaleMax}
                    />
                  ))}
                </div>
              </figure>
            ) : null}

            <Heading id="overview">Overview</Heading>
            <Prose paragraphs={content.overview} />

            <Heading id="what-it-does">What this calculator does</Heading>
            <Prose paragraphs={content.whatItDoes} />

            <Heading id="when-to-use">When to use it</Heading>
            <Prose paragraphs={content.whenToUse} />

            <Heading id="how-it-works">How the calculation works</Heading>
            <Prose paragraphs={content.howItWorks} />

            <Heading id="methodology">Methodology</Heading>
            <Prose paragraphs={content.methodology} />

            <Heading id="assumptions">Assumptions it makes</Heading>
            <Bullets items={content.assumptions} />

            <Heading id="limitations">Limitations</Heading>
            <Bullets items={content.limitations} />

            <Heading id="examples">Worked examples</Heading>
            <div className="mt-5 space-y-4">
              {content.examples.map((ex) => (
                <div
                  key={ex.title}
                  className="rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5"
                >
                  <p className="font-display text-base font-bold text-navy-900">{ex.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
                    {renderInline(ex.body)}
                  </p>
                </div>
              ))}
            </div>

            <Heading id="common-mistakes">Common mistakes to avoid</Heading>
            <Bullets items={content.commonMistakes} />

            {content.repairVsReplace ? (
              <>
                <Heading id="repair-or-replace">When to repair vs. replace</Heading>
                <Prose paragraphs={content.repairVsReplace} />
              </>
            ) : null}
          </div>
        </Container>
      </section>

      <div id="faq" className="scroll-mt-28">
        <FaqList
          eyebrow="FAQ"
          title={`${tool.title} — questions homeowners ask`}
          faqs={content.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        />
      </div>

      {/* Internal-link graph out of the tool */}
      <section className="bg-slate-50 py-14 lg:py-16" aria-label="Keep researching">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
              <p className="font-display text-lg font-bold text-navy-900">Your next steps</p>
              <Prose paragraphs={content.nextSteps} />
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
                  Related guides
                </p>
                <ul className="mt-4 space-y-2.5">
                  {content.relatedGuides.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="group inline-flex items-start gap-2 text-[15px] font-semibold text-navy-900 hover:text-accent-700"
                      >
                        <Icon
                          name="arrowRight"
                          className="mt-1 h-4 w-4 shrink-0 text-accent-500 transition-transform group-hover:translate-x-0.5"
                        />
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
                  Related calculators
                </p>
                <ul className="mt-4 space-y-2.5">
                  {relatedTools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tools/${t.slug}`}
                        className="group inline-flex items-start gap-2 text-[15px] font-semibold text-navy-900 hover:text-accent-700"
                      >
                        <Icon
                          name={t.icon}
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-500"
                        />
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {content.relatedRebates ? (
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Planning an upgrade?{" "}
                    <Link
                      href="/resources/minnesota-hvac-rebates"
                      className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800"
                    >
                      Check Minnesota rebates &amp; tax credits
                    </Link>{" "}
                    before you buy.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
