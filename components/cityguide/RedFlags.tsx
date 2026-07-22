import { Icon } from "@/components/ui/Icon";

export interface RedFlagItem {
  flag: string;
  why: string;
}

/**
 * Callout-style list of warning signs. Uses red tones (from the default
 * Tailwind palette) for clear semantic "stop" signalling, on-brand cards.
 */
export function RedFlags({ flags }: { flags: RedFlagItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {flags.map((f) => (
        <div
          key={f.flag}
          className="print-avoid-break flex gap-4 rounded-xl border border-red-200 bg-red-50/70 p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Icon name="x" className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div>
            <h3 className="font-display text-[15px] font-bold text-navy-900">
              {f.flag}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {f.why}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
