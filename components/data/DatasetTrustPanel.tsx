import { Icon } from "@/components/ui/Icon";
import type { DatasetMeta } from "@/lib/datasets/types";

/**
 * The trust header shown above any dataset: exactly how fresh the data is,
 * where it comes from, how it's verified, and when to re-check. Reusable across
 * the Rebate Database, Price Index, and Permit Database so every dataset makes
 * the same accuracy promises visibly.
 */
export function DatasetTrustPanel({ meta }: { meta: DatasetMeta }) {
  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white shadow-card">
      <div className="grid gap-px overflow-hidden rounded-t-xl bg-navy-900/[0.06] sm:grid-cols-2">
        <div className="bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
            <Icon name="badgeCheck" className="h-4 w-4" />
            Last verified
          </p>
          <p className="mt-1 font-display text-lg font-extrabold text-navy-900">
            {meta.lastReviewed}
          </p>
        </div>
        <div className="bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent-700">
            <Icon name="clock" className="h-4 w-4" />
            When to re-check
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {meta.recheckGuidance ?? "Confirm current figures with the official source before you rely on them."}
          </p>
        </div>
      </div>

      <div className="border-t border-navy-900/[0.08] p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <Icon name="clipboard" className="h-4 w-4 text-navy-600" />
          Verification methodology
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{meta.methodology}</p>
      </div>

      <div className="border-t border-navy-900/[0.08] p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <Icon name="shield" className="h-4 w-4 text-navy-600" />
          Primary sources
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {meta.sources.map((s) => (
            <li key={s.label} className="flex items-start gap-2">
              <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-500" strokeWidth={2.4} />
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-navy-300 underline-offset-2 hover:text-navy-900"
                >
                  {s.label}
                </a>
              ) : (
                <span>{s.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
