import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site, bylineName, editorial } from "@/lib/site";

/**
 * Visible authorship / E-E-A-T box for research content. It states who
 * researches and maintains the page, that the site is independent, and links
 * to the methodology and editorial policy — the experience/trust signals a
 * reader (and Google's quality systems) look for on money/cost content.
 *
 * Uses the real byline entity: a named individual when one is configured, and
 * an honest editorial-team credit otherwise. Never a fabricated persona.
 */
export function AuthorBox({ updated, className = "" }: { updated?: string; className?: string }) {
  const name = bylineName();
  const isPerson = Boolean(editorial.person);

  return (
    <aside
      aria-label="About the author"
      className={`rounded-2xl border border-navy-900/[0.08] bg-slate-50 p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
          <Icon name={isPerson ? "badgeCheck" : "shield"} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
            {isPerson ? "Written & maintained by" : "Researched & maintained by"}
          </p>
          <p className="mt-0.5 font-display text-base font-bold text-navy-900">
            {name}
            {isPerson && editorial.person?.jobTitle ? (
              <span className="font-normal text-slate-500"> · {editorial.person.jobTitle}</span>
            ) : null}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {editorial.person?.bio ??
              `${site.name} is an independent Minnesota HVAC resource. We don't sell, install, or repair equipment, so this guidance isn't shaped by a sale — every figure is drawn from one sourced, dated reference dataset.`}
            {updated ? ` Last reviewed ${updated}.` : ""}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
            <Link href="/about#methodology" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
              How we research
            </Link>
            <Link href="/editorial-policy" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
              Editorial policy
            </Link>
            <Link href="/about#sources" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800">
              Our sources
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
