import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/**
 * Thumb-friendly action bar pinned to the bottom of small screens.
 * Hidden on large screens where the header CTA is always visible.
 */
export function StickyCTA() {
  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-navy-900/15 bg-white px-4 py-3.5 text-sm font-semibold text-navy-900 transition-colors active:bg-navy-50"
        >
          <Icon name="phone" className="h-4 w-4 text-accent-500" />
          Call Now
        </a>
        <Link
          href="/#inquiry"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-colors active:bg-accent-600"
        >
          Compare Quotes
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
