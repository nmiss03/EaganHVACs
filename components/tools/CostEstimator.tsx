"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { track } from "@/lib/track";

type SystemKey = "furnace" | "ac" | "both" | "heatpump";
type SizeKey = "small" | "medium" | "large";
type TierKey = "standard" | "high";

/**
 * Twin Cities installed-price ranges. Kept deliberately as broad planning
 * ranges (consistent with /resources/hvac-cost-guide-minnesota) so the tool
 * never poses as a quote. Sourced from typical regional pricing bands.
 */
const baseRanges: Record<SystemKey, [number, number]> = {
  furnace: [4000, 9000],
  ac: [4500, 9500],
  both: [8000, 16500],
  heatpump: [8000, 18000],
};

const systemLabels: Record<SystemKey, { label: string; icon: IconName }> = {
  furnace: { label: "Furnace", icon: "flame" },
  ac: { label: "Central AC", icon: "snowflake" },
  both: { label: "Furnace + AC", icon: "gauge" },
  heatpump: { label: "Heat pump", icon: "gauge" },
};

const sizeLabels: Record<SizeKey, string> = {
  small: "Under 1,500 sq ft",
  medium: "1,500 – 2,500 sq ft",
  large: "Over 2,500 sq ft",
};

const sizeShift: Record<SizeKey, number> = { small: 0, medium: 0.35, large: 0.7 };

function estimate(system: SystemKey, size: SizeKey, tier: TierKey): [number, number] {
  const [floor, ceiling] = baseRanges[system];
  const span = ceiling - floor;
  // Home size positions you within the band; tier widens toward the top.
  const start = sizeShift[size];
  const tierLift = tier === "high" ? 0.2 : 0;
  const low = floor + span * Math.min(start + tierLift, 0.65);
  const high = floor + span * Math.min(start + 0.35 + tierLift + (tier === "high" ? 0.15 : 0), 1);
  // Round to the nearest $100 for a clean, honestly-imprecise range.
  return [Math.round(low / 100) * 100, Math.round(high / 100) * 100];
}

function money(n: number): string {
  return `$${n.toLocaleString()}`;
}

export function CostEstimator() {
  const [system, setSystem] = useState<SystemKey>("furnace");
  const [size, setSize] = useState<SizeKey>("medium");
  const [tier, setTier] = useState<TierKey>("high");
  const [result, setResult] = useState<[number, number] | null>(null);

  function handleEstimate() {
    const r = estimate(system, size, tier);
    setResult(r);
    track("tool_cost_estimator", {
      system,
      size,
      tier,
      low: r[0],
      high: r[1],
    });
  }

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">
            What are you replacing?
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(systemLabels) as SystemKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => { setSystem(k); setResult(null); }}
                aria-pressed={system === k}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition-colors ${
                  system === k
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                <Icon name={systemLabels[k].icon} className="h-5 w-5" />
                {systemLabels[k].label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">Home size</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(sizeLabels) as SizeKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => { setSize(k); setResult(null); }}
                aria-pressed={size === k}
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  size === k
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                {sizeLabels[k]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">
            Efficiency level
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(["standard", "high"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => { setTier(k); setResult(null); }}
                aria-pressed={tier === k}
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  tier === k
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                {k === "standard" ? "Standard efficiency" : "High efficiency"}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={handleEstimate}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          Estimate my project cost
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {result ? (
        <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6" role="status" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Typical Twin Cities installed range
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold text-navy-900">
            {money(result[0])} – {money(result[1])}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
              Includes equipment, labor, permits, and disposal of the old system
            </li>
            {tier === "high" ? (
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
                High-efficiency systems qualify for utility rebates and federal tax
                credits that can cut thousands off this range
              </li>
            ) : null}
            <li className="flex items-start gap-2.5">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
              Ductwork changes, tight access, and emergency timing can push higher
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#inquiry"
              onClick={() => track("cta_from_tool", { tool: "cost_estimator" })}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-colors hover:bg-accent-600"
            >
              Compare real quotes free
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link
              href="/resources/minnesota-hvac-rebates"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              See which rebates you can claim
            </Link>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is an educational planning range for the Twin Cities metro, not a quote.
        Real pricing depends on your specific home and equipment — the only accurate
        number comes from a contractor who has seen your system, which is exactly why
        comparing two or three quotes is worth it.
      </p>
    </div>
  );
}
