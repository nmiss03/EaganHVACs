import { Icon, type IconName } from "@/components/ui/Icon";
import type { RebateProgramRow, RebateStatus } from "@/lib/datasets/types";

const statusStyle: Record<RebateStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending — not yet launched", cls: "bg-amber-100 text-amber-800" },
  expired: { label: "Expired", cls: "bg-red-100 text-red-700" },
  requires_verification: { label: "Needs verification", cls: "bg-slate-200 text-slate-700" },
};

const providerIcon: Record<RebateProgramRow["providerType"], IconName> = {
  "electric-utility": "bolt",
  "gas-utility": "flame",
  state: "mapPin",
  federal: "shield",
};

/**
 * Renders rebate programs as trust-forward cards. It never shows an invented
 * amount: a program with no primary-source-verified figure displays a
 * "verify current amount" link to the official page instead of a number, and
 * expired programs are visibly marked and never presented as claimable.
 */
export function RebateTable({ rows }: { rows: RebateProgramRow[] }) {
  return (
    <div className="grid gap-4">
      {rows.map((r) => {
        const s = statusStyle[r.status];
        return (
          <div
            key={r.id}
            className={`rounded-xl border bg-white p-5 shadow-card sm:p-6 ${
              r.status === "expired" ? "border-red-200" : "border-navy-900/[0.08]"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900/[0.05] text-navy-700">
                  <Icon name={providerIcon[r.providerType]} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-navy-900">{r.provider}</p>
                  <p className="text-xs text-slate-500">{r.equipment}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${s.cls}`}>{s.label}</span>
            </div>

            <p className="mt-4 font-display text-base font-bold text-navy-900">{r.program}</p>

            {/* Amount — never fabricated */}
            <div className="mt-2">
              {r.status === "expired" ? (
                <p className="text-sm font-semibold text-red-700">
                  Not available{r.expirationDate ? ` (ended ${r.expirationDate})` : ""}
                </p>
              ) : r.status === "pending" ? (
                <p className="text-sm font-semibold text-amber-700">Not yet available</p>
              ) : r.amount ? (
                <p className="font-display text-lg font-extrabold text-navy-900">{r.amount}</p>
              ) : (
                <a
                  href={r.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:text-accent-800"
                >
                  Verify current amount at the source
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {r.eligibility ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-navy-800">Eligibility: </span>
                {r.eligibility}
              </p>
            ) : null}
            {r.incomeRestriction ? (
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-navy-800">Income: </span>
                {r.incomeRestriction}
              </p>
            ) : null}

            {r.notes ? (
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
                {r.notes}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-900/[0.06] pt-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="badgeCheck" className="h-3.5 w-3.5 text-accent-500" />
                Last verified {r.lastVerified}
              </span>
              {r.effectiveDate ? <span>Effective {r.effectiveDate}</span> : null}
              {r.expirationDate ? <span>Expires {r.expirationDate}</span> : null}
              <a
                href={r.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-navy-700 underline decoration-navy-300 underline-offset-2 hover:text-navy-900"
              >
                Official source
                <Icon name="arrowRight" className="h-3 w-3" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
