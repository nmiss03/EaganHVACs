import { PrintButton } from "@/components/cityguide/PrintButton";

export interface ChecklistGroupItem {
  heading: string;
  items: string[];
}

/**
 * Printable contractor-interview checklist. Checkbox-styled items grouped by
 * topic. The whole block is styled to print cleanly (global print rules hide
 * the site chrome; `print-avoid-break` keeps groups intact across pages).
 */
export function QuestionChecklist({
  city,
  groups,
}: {
  city: string;
  groups: ChecklistGroupItem[];
}) {
  return (
    <div className="rounded-2xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h3 className="font-display text-xl font-bold text-navy-900">
            Print this and take it to every appointment
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Good companies will happily answer every one of these. Check each box
            as you go so you can compare answers afterward.
          </p>
        </div>
        <PrintButton city={city} />
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.heading} className="print-avoid-break">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-700">
              {group.heading}
            </h4>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 rounded-[0.3rem] border-2 border-navy-900/25 bg-white"
                  />
                  <span className="text-[15px] leading-snug text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
