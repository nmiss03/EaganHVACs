import { Icon } from "@/components/ui/Icon";

export interface Source {
  label: string;
  url?: string;
}

/**
 * A consistent, cited source list. One primitive for every "where this came
 * from" block on the site — research snapshots, dataset panels, methodology
 * notes — so sourcing always looks and behaves the same. External links open
 * in a new tab with rel="noopener"; sources without a URL render as plain text
 * (we cite the origin even when there's no link).
 */
export function SourceList({
  sources,
  title = "Sources",
  className = "",
}: {
  sources: Source[];
  title?: string;
  className?: string;
}) {
  if (!sources.length) return null;
  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
        {sources.map((s) => (
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
  );
}
