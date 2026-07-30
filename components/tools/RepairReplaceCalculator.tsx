"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";
import { LIFESPANS, REPAIR_REPLACE_RULE_USD, usd } from "@/lib/hvac-data";

type SystemType = "furnace" | "ac";

interface Result {
  verdict: "repair" | "lean-repair" | "lean-replace" | "replace";
  headline: string;
  explanation: string;
}

/**
 * Repair-vs-replace decision aid. Uses the widely-used "$5,000 rule"
 * (age × repair cost) plus age thresholds — educational, not a quote. The
 * lifespan threshold and the rule's dollar figure come from the canonical
 * {@link LIFESPANS} / {@link REPAIR_REPLACE_RULE_USD} data.
 */
function evaluate(age: number, repairCost: number, system: SystemType): Result {
  const lifespan = LIFESPANS[system].high;
  const fiveKScore = age * repairCost;

  if (age >= lifespan) {
    return {
      verdict: "replace",
      headline: "Replacement is likely the smarter investment",
      explanation: `At ${age} years, this system is at or past the typical ${lifespan}-year lifespan for a ${system === "furnace" ? "furnace" : "central AC"}. Putting ${formatMoney(repairCost)} into it rarely pays off when a failure is statistically near. Comparing replacement quotes now — on your schedule, not during a breakdown — usually wins.`,
    };
  }
  if (fiveKScore >= REPAIR_REPLACE_RULE_USD) {
    return {
      verdict: "lean-replace",
      headline: "Leaning toward replacement",
      explanation: `The common "${usd(REPAIR_REPLACE_RULE_USD)} rule" multiplies age by repair cost: ${age} × ${formatMoney(repairCost)} = ${formatMoney(fiveKScore)}, which is above ${usd(REPAIR_REPLACE_RULE_USD)}. That's the zone where many homeowners come out ahead replacing — but it's close enough that a second opinion and a replacement quote are worth getting.`,
    };
  }
  if (age >= lifespan * 0.6) {
    return {
      verdict: "lean-repair",
      headline: "Repair is reasonable — but start planning",
      explanation: `At ${age} years the repair math still favors fixing it, but you're in the second half of this system's life. Repair now, and start budgeting for replacement in the next few years so you're not deciding during an emergency.`,
    };
  }
  return {
    verdict: "repair",
    headline: "Repair is almost certainly the right call",
    explanation: `A ${age}-year-old system with a ${formatMoney(repairCost)} repair has plenty of life left. Fix it, keep up with annual maintenance, and you'll likely get many more seasons before replacement is on the table.`,
  };
}

function formatMoney(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

const verdictStyles: Record<Result["verdict"], string> = {
  repair: "bg-green-50 text-green-800 border-green-200",
  "lean-repair": "bg-green-50 text-green-800 border-green-200",
  "lean-replace": "bg-accent-50 text-accent-800 border-accent-200",
  replace: "bg-accent-50 text-accent-800 border-accent-200",
};

export function RepairReplaceCalculator() {
  const [system, setSystem] = useState<SystemType>("furnace");
  const [age, setAge] = useState(12);
  const [repairCost, setRepairCost] = useState(800);
  const [result, setResult] = useState<Result | null>(null);

  function handleCalculate() {
    const r = evaluate(age, repairCost, system);
    setResult(r);
    track("tool_repair_replace", { system, age, repair_cost: repairCost, verdict: r.verdict });
  }

  const leanReplace = result?.verdict === "replace" || result?.verdict === "lean-replace";

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">
            Which system?
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(["furnace", "ac"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSystem(s)}
                aria-pressed={system === s}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  system === s
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                <Icon name={s === "furnace" ? "flame" : "snowflake"} className="h-4 w-4" />
                {s === "furnace" ? "Furnace" : "Central AC"}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="rr-age" className="mb-2 flex items-center justify-between text-sm font-semibold text-navy-900">
            System age <span className="text-accent-700">{age} years</span>
          </label>
          <input
            id="rr-age"
            type="range"
            min={1}
            max={30}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-accent-500"
          />
        </div>

        <div>
          <label htmlFor="rr-cost" className="mb-2 block text-sm font-semibold text-navy-900">
            Estimated repair cost
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <input
              id="rr-cost"
              type="number"
              min={0}
              step={50}
              value={repairCost}
              onChange={(e) => setRepairCost(Number(e.target.value))}
              className="w-full rounded-xl border border-navy-900/15 bg-white py-3 pl-8 pr-4 text-[15px] text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          See my recommendation
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {result ? (
        <div className={`mt-6 rounded-xl border p-5 ${verdictStyles[result.verdict]}`} role="status" aria-live="polite">
          <p className="font-display text-lg font-bold">{result.headline}</p>
          <p className="mt-2 text-sm leading-relaxed">{result.explanation}</p>
          <Link
            href="/#inquiry"
            onClick={() => track("cta_from_tool", { tool: "repair_replace" })}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold underline decoration-2 underline-offset-4"
          >
            {leanReplace ? "Compare free replacement quotes" : "Get a repair quote from a local pro"}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is an educational estimate based on common industry rules of thumb, not a
        quote or professional diagnosis. Your best next step is a written assessment from a
        licensed contractor.
      </p>
    </div>
  );
}
