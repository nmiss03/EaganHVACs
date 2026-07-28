/**
 * Reusable JSON-LD (structured data) generators.
 *
 * Centralizing schema here keeps every page's structured data consistent,
 * valid, and honest — one place to model the site as an independent publisher
 * (Organization/WebSite/Article/FAQPage/HowTo/Breadcrumb), never a
 * LocalBusiness. Pages import these instead of hand-rolling JSON-LD.
 */
import { site, authorSchema } from "@/lib/site";

/** Reference to the site's Organization node (defined once in <JsonLd/>). */
export const organizationRef = { "@id": `${site.url}/#organization` };
/** Reference to the site's WebSite node. */
export const webSiteRef = { "@id": `${site.url}/#website` };

/** Strip inline `[text](href)` and `**bold**` markup for plain-text schema values. */
export function plainText(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** FAQPage schema from a list of Q&A (answers may contain inline-link markup). */
export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: plainText(f.answer) },
    })),
  };
}

/** BreadcrumbList schema from ordered {name, url-path} items. */
export function breadcrumbSchema(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Article schema with an ImageObject, real author, and publisher reference. */
export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image?: { src: string; width: number; height: number };
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: url,
    ...(input.image
      ? {
          image: {
            "@type": "ImageObject",
            url: `${site.url}${input.image.src}`,
            width: input.image.width,
            height: input.image.height,
          },
        }
      : {}),
    datePublished: input.datePublished ?? "2026-07-01",
    dateModified: input.dateModified ?? "2026-07-01",
    author: authorSchema(),
    publisher: organizationRef,
    inLanguage: "en-US",
  };
}

/** HowTo schema for genuine step-by-step guidance. */
export function howToSchema(input: {
  name: string;
  description: string;
  steps: ReadonlyArray<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: plainText(s.text),
    })),
  };
}

/** Serialize one or more schema objects into a single JSON-LD string. */
export function jsonLdString(...objects: object[]): string {
  return objects.length === 1 ? JSON.stringify(objects[0]) : JSON.stringify(objects);
}
