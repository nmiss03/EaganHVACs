import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ToolMeta } from "@/lib/tools";

/**
 * A calculator preview card — the reusable way the site presents its tools as
 * products, not footnotes. It shows the tool's icon, name, and one-line value
 * proposition with a clear "open the tool" affordance, so a reader browsing an
 * article or a tool page understands what each calculator does before clicking.
 *
 * `featured` renders the emphasized, full-width variant used to surface the
 * single most relevant tool early in an article's reading flow. Server
 * component; no client JS.
 */
export function ToolCard({
  tool,
  featured = false,
  className = "",
}: {
  tool: ToolMeta;
  featured?: boolean;
  className?: string;
}) {
  if (featured) {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className={`group flex flex-col gap-4 rounded-xl border border-accent-200 bg-accent-50/40 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:flex-row sm:items-center sm:gap-5 sm:p-6 ${className}`}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400 shadow-glow">
          <Icon name={tool.icon} className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
            Free interactive tool
          </p>
          <p className="mt-0.5 font-display text-base font-bold text-navy-900">{tool.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{tool.short}</p>
        </div>
        <span className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-navy-800">
          Open the tool
          <Icon name="arrowRight" className="h-4 w-4 text-accent-400" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex h-full flex-col rounded-xl border border-navy-900/[0.08] bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-accent-400">
          <Icon name={tool.icon} className="h-5 w-5" />
        </span>
        <span className="font-display text-sm font-bold text-navy-900">{tool.title}</span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{tool.short}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 group-hover:text-accent-800">
        Open the tool
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
