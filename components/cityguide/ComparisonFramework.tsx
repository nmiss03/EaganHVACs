/**
 * A fillable comparison worksheet — NOT a ranking of companies. Homeowners
 * enter what they learn from each contractor into the blank cells so they can
 * compare like for like. We intentionally render empty, fill-in-the-blank
 * cells rather than fabricated data.
 */
export function ComparisonFramework({
  columns,
  rowLabels,
  intro,
}: {
  columns: string[];
  rowLabels: string[];
  intro: string[];
}) {
  return (
    <div>
      <div className="max-w-3xl">
        {intro.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="mt-3 text-[15px] leading-relaxed text-slate-600 first:mt-0"
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-navy-900/[0.08] shadow-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Blank worksheet for comparing HVAC contractors side by side.
          </caption>
          <thead>
            <tr className="bg-navy-900 text-white">
              {columns.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-4 py-3.5 font-display text-sm font-bold ${
                    i === 0 ? "w-40" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((label, ri) => (
              <tr
                key={label}
                className={ri % 2 === 1 ? "bg-slate-50/60" : "bg-white"}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap border-b border-navy-900/[0.06] px-4 py-5 text-left align-top font-display font-bold text-navy-900"
                >
                  {label}
                </th>
                {columns.slice(1).map((col) => (
                  <td
                    key={col}
                    className="border-b border-l border-navy-900/[0.06] px-4 py-5 align-top"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-5 w-full rounded border border-dashed border-navy-900/15"
                    />
                    <span className="sr-only">Blank — fill in {col.toLowerCase()}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is a framework you fill in yourself — we don't rank companies or
        collect this data for you. Verify every detail directly with each
        contractor.
      </p>
    </div>
  );
}
