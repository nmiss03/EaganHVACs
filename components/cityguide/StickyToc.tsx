import { Container } from "@/components/ui/Container";
import { LastUpdated } from "@/components/ui/LastUpdated";

export interface TocSection {
  id: string;
  label: string;
}

/**
 * Server-rendered "On this page" anchor nav. Renders as a sticky horizontal
 * strip below the hero — a horizontal scroll on small screens — which fits the
 * site's full-width alternating-section layout better than a fixed sidebar.
 * Sections it points at must set matching `id` + `scroll-mt-*` values.
 *
 * Optionally shows the guide's read time and last-updated date on the left.
 */
export function StickyToc({
  sections,
  meta,
}: {
  sections: TocSection[];
  meta?: { updated: string; readMinutes: number };
}) {
  return (
    <nav
      aria-label="On this page"
      className="no-print sticky top-16 z-30 border-b border-navy-900/[0.06] bg-white/95 backdrop-blur-md"
    >
      <Container className="flex items-center gap-4 py-3">
        {meta ? (
          <div className="hidden shrink-0 border-r border-navy-900/10 pr-4 md:block">
            <LastUpdated updated={meta.updated} readMinutes={meta.readMinutes} />
          </div>
        ) : null}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-navy-400 sm:inline">
            On this page
          </span>
          <ul className="flex items-center gap-1.5">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-900/[0.06] hover:text-navy-900"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}
