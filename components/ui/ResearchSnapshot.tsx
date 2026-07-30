import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LastUpdated } from "@/components/ui/LastUpdated";
import { SourceList, type Source } from "@/components/ui/SourceList";
import { site } from "@/lib/site";

interface ResearchSnapshotProps {
  /** Human-readable last-updated date, e.g. "July 2026". */
  updated: string;
  readMinutes?: number;
  /** Who maintains it. Defaults to the editorial team — never a fabricated named author. */
  reviewedBy?: string;
  /** Optional one-line "the short version" takeaway. */
  snapshot?: string;
  /** Optional sources reviewed for this page. */
  sources?: Source[];
  methodologyHref?: string;
  className?: string;
}

/**
 * The editorial-authority header for research content (articles, tools, city
 * guides). It surfaces the trust signals a reader making a $15k decision looks
 * for — when it was last updated, that the site is independent, and a link to
 * how the research is done — using only true, verifiable statements (no
 * invented author credentials). Server component; no client JS.
 */
export function ResearchSnapshot({
  updated,
  readMinutes,
  reviewedBy = `the ${site.name} editorial team`,
  snapshot,
  sources,
  methodologyHref = "/about#methodology",
  className = "",
}: ResearchSnapshotProps) {
  return (
    <aside
      aria-label="Research snapshot"
      className={`rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
          <Icon name="badgeCheck" className="h-4 w-4" />
          Independent research
        </p>
        <LastUpdated updated={updated} readMinutes={readMinutes} />
      </div>

      {snapshot ? (
        <p className="mt-3 text-[15px] leading-relaxed text-navy-900">
          <span className="font-semibold">The short version:</span> {snapshot}
        </p>
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Researched and maintained by {reviewedBy}. We&rsquo;re independent — we don&rsquo;t
        sell, install, or repair HVAC equipment, so this guidance isn&rsquo;t shaped by a
        sale.{" "}
        <Link
          href={methodologyHref}
          className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800"
        >
          How we research &rarr;
        </Link>
      </p>

      {sources?.length ? (
        <SourceList sources={sources} className="mt-4 border-t border-navy-900/[0.06] pt-4" />
      ) : null}
    </aside>
  );
}
