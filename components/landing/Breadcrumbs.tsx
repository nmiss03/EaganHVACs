import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { absoluteUrl } from "@/lib/content";

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Accessible breadcrumb trail plus matching BreadcrumbList JSON-LD so
 * Google can render the breadcrumb in search results.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-navy-900/[0.06] bg-white">
      <Container className="py-3.5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span className="font-medium text-navy-900" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-accent-600"
                    >
                      {item.label}
                    </Link>
                    <Icon
                      name="chevronDown"
                      className="h-3.5 w-3.5 -rotate-90 text-navy-300"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
