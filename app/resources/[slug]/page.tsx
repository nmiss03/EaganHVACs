import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";
import { CTABand } from "@/components/landing/CTABand";
import { FaqList } from "@/components/landing/FaqList";
import { StickyToc } from "@/components/cityguide/StickyToc";
import { CityLinks } from "@/components/sections/CityLinks";
import { KitCapture } from "@/components/sections/KitCapture";
import { ToolCard } from "@/components/tools/ToolCard";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import { Icon } from "@/components/ui/Icon";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ResearchSnapshot } from "@/components/ui/ResearchSnapshot";
import { articles, getArticle } from "@/lib/articles";
import { renderInline } from "@/lib/render-inline";
import { absoluteUrl, getServiceDetail } from "@/lib/content";
import { site } from "@/lib/site";
import { getTool } from "@/lib/tools";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: absoluteUrl(`/resources/${article.slug}`),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = article.related
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const relatedServices = article.relatedServices
    .map((s) => getServiceDetail(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedTools = (article.relatedTools ?? [])
    .map((s) => getTool(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const tocSections = article.sections.map((s) => ({
    id: slugify(s.tocLabel ?? s.heading),
    label: s.tocLabel ?? s.heading,
  }));
  const showToc = tocSections.length >= 3;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: absoluteUrl(`/resources/${article.slug}`),
    dateModified: "2026-07-01",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`),
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: article.title, href: `/resources/${article.slug}` },
        ]}
      />

      <article>
        <header className="bg-navy-900 py-14 lg:py-16">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-300">
              {article.category}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {article.title}
            </h1>
          </Container>
        </header>

        {showToc ? <StickyToc sections={tocSections} /> : null}

        <div className="bg-white py-14 lg:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <ResearchSnapshot
                updated={article.updated}
                readMinutes={article.readMinutes}
                className="mb-8"
              />
              {article.leadImage ? (
                <ContentImage
                  src={article.leadImage.src}
                  alt={article.leadImage.alt}
                  width={article.leadImage.width}
                  height={article.leadImage.height}
                  caption={article.leadImage.caption}
                  priority
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="mb-8"
                />
              ) : null}
              {article.intro.map((p) => (
                <p key={p.slice(0, 24)} className="mb-4 text-lg leading-relaxed text-slate-700">
                  {renderInline(p)}
                </p>
              ))}

              {article.keyTakeaways?.length ? (
                <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6">
                  <p className="font-display text-base font-bold text-navy-900">
                    Key takeaways
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {article.keyTakeaways.map((k) => (
                      <li
                        key={k.slice(0, 24)}
                        className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-700"
                      >
                        <Icon
                          name="check"
                          className="mt-1 h-4 w-4 shrink-0 text-accent-500"
                          strokeWidth={2.4}
                        />
                        <span>{renderInline(k)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {relatedTools[0] ? (
                <ToolCard tool={relatedTools[0]} featured className="mt-8" />
              ) : null}

              {article.sections.map((section) => (
                <section
                  key={section.heading}
                  id={slugify(section.tocLabel ?? section.heading)}
                  className="mt-10 scroll-mt-28"
                >
                  <h2 className="font-display text-2xl font-bold text-navy-900">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-3 text-[15px] leading-relaxed text-slate-700">
                      {renderInline(p)}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-4 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700">
                          <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.table ? (
                    <div className="mt-5 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b-2 border-navy-900/10">
                            {section.table.headers.map((h) => (
                              <th key={h} className="py-2.5 pr-4 font-display font-bold text-navy-900">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")} className="border-b border-navy-900/[0.06]">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`py-2.5 pr-4 ${ci === 0 ? "font-medium text-navy-800" : "text-slate-600"}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {section.prosCons ? (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-green-200 bg-green-50/60 p-5">
                        <p className="flex items-center gap-2 font-display text-sm font-bold text-green-800">
                          <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />
                          Pros
                        </p>
                        <ul className="mt-3 space-y-2">
                          {section.prosCons.pros.map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-slate-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-red-200 bg-red-50/60 p-5">
                        <p className="flex items-center gap-2 font-display text-sm font-bold text-red-800">
                          <Icon name="x" className="h-4 w-4" strokeWidth={2.6} />
                          Cons
                        </p>
                        <ul className="mt-3 space-y-2">
                          {section.prosCons.cons.map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-slate-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  {section.image?.src ? (
                    <ContentImage
                      src={section.image.src}
                      alt={section.image.alt ?? ""}
                      width={section.image.width ?? 1600}
                      height={section.image.height ?? 1000}
                      caption={section.image.caption}
                      className="mt-6"
                    />
                  ) : section.image ? (
                    <ImagePlaceholder
                      label={section.image.label ?? ""}
                      aspect="video"
                      className="mt-5"
                    />
                  ) : null}
                  {section.callout ? (
                    <Callout
                      tone={section.callout.tone}
                      title={section.callout.title}
                      className="mt-5"
                    >
                      {renderInline(section.callout.text)}
                    </Callout>
                  ) : null}
                </section>
              ))}

              {/* Inline: related interactive tools */}
              {relatedTools.length > 0 ? (
                <div className="mt-12">
                  <p className="font-display text-lg font-bold text-navy-900">
                    Turn this guide into your own numbers
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Free interactive tools that personalize everything above in seconds.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relatedTools.map((t) => (
                      <ToolCard key={t.slug} tool={t} />
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Inline CTA */}
              <div className="mt-8 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6">
                <p className="font-display text-lg font-bold text-navy-900">
                  Put this into action
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Use these free tools and guides to plan your project — then gather your
                  own written quotes from local contractors and compare them with confidence.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedServices.slice(0, 3).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
                    >
                      <Icon name={s.icon} className="h-4 w-4 text-accent-500" />
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <KitCapture source={`article-${article.slug}`} className="mt-8" />
            </div>
          </Container>
        </div>

        <FaqList
          title="Related questions"
          faqs={article.faqs}
        />

        {related.length > 0 ? (
          <section className="bg-slate-50 py-14 lg:py-16">
            <Container>
              <h2 className="text-center font-display text-2xl font-bold text-navy-900">
                Keep reading
              </h2>
              <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/resources/${a.slug}`}
                    className="group flex flex-col rounded-xl border border-navy-900/[0.07] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-700">
                      {a.category}
                    </span>
                    <span className="mt-1.5 font-display text-base font-bold leading-snug text-navy-900 group-hover:text-accent-700">
                      {a.title}
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </article>

      <CityLinks
        tone="slate"
        heading="HVAC guides for your city"
        description="See how this applies where you live — local costs, common problems, permits, and rebates for each south-metro city."
      />

      <CTABand
        heading="Learn first. Compare quotes when you're ready."
        sub={`${site.name} is a free service that connects Twin Cities homeowners with trusted local HVAC contractors.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
