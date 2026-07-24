import { Icon } from "@/components/ui/Icon";
import type { Dataset } from "@/lib/datasets/types";
import { isDatasetPopulated } from "@/lib/datasets";

/**
 * Renders any Dataset<Row> generically from its column definitions, always
 * accompanied by its provenance. When a dataset has no verified rows yet, it
 * renders a methodology-first panel instead of an empty table — so a page can
 * ship honestly before the data is collected, and light up automatically once
 * rows are added. It never invents a value: a null cell shows a muted
 * "verify with source" rather than a number.
 */
export function DatasetTable<Row>({ dataset }: { dataset: Dataset<Row> }) {
  const { meta, columns, rows } = dataset;
  const populated = isDatasetPopulated(dataset);

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white shadow-card">
      <div className="border-b border-navy-900/[0.08] p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-700">
          Dataset
        </p>
        <h2 className="mt-1 font-display text-xl font-extrabold text-navy-900">
          {meta.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{meta.description}</p>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
          {meta.coverage ? (
            <div>
              <dt className="inline font-semibold text-navy-700">Coverage: </dt>
              <dd className="inline">{meta.coverage}</dd>
            </div>
          ) : null}
          {meta.unit ? (
            <div>
              <dt className="inline font-semibold text-navy-700">Unit: </dt>
              <dd className="inline">{meta.unit}</dd>
            </div>
          ) : null}
          <div>
            <dt className="inline font-semibold text-navy-700">Last reviewed: </dt>
            <dd className="inline">{meta.lastReviewed}</dd>
          </div>
        </dl>
      </div>

      {populated ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-navy-900/10">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-5 py-3 font-display font-bold text-navy-900 ${
                      c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""
                    }`}
                  >
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 ? "bg-slate-50/60" : ""}>
                  {columns.map((c) => {
                    const value = c.accessor(row);
                    const empty = value === null || value === undefined || value === "";
                    return (
                      <td
                        key={c.key}
                        className={`px-5 py-3 text-slate-700 ${
                          c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""
                        }`}
                      >
                        {c.render ? (
                          c.render(row)
                        ) : empty ? (
                          <span className="text-slate-400">verify with source</span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start gap-3 rounded-xl border border-accent-200 bg-accent-50/50 p-4">
            <Icon name="clipboard" className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
            <div>
              <p className="text-sm font-bold text-navy-900">
                We&rsquo;re building this dataset with verified figures only.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Rather than publish estimates or numbers we can&rsquo;t stand behind, this
                table stays empty until each value is transcribed from its primary
                source. Here&rsquo;s exactly how it will be built:
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{meta.methodology}</p>
        </div>
      )}

      <div className="border-t border-navy-900/[0.08] p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Sources</p>
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
