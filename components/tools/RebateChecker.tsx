"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";

type Electric = "xcel" | "other";
type Gas = "centerpoint" | "other" | "none";

const equipItems = [
  { id: "furnace", label: "High-efficiency gas furnace" },
  { id: "ac", label: "Central air conditioner" },
  { id: "heatpump", label: "Cold-climate heat pump" },
  { id: "thermostat", label: "Smart thermostat" },
] as const;

interface Program {
  name: string;
  detail: string;
}

/** Routes homeowners to the rebate/credit PROGRAMS that likely apply — not
 * dollar amounts, which change yearly. Every result says "verify current
 * amounts," so the tool stays accurate over time and never fabricates. */
function matchPrograms(
  electric: Electric,
  gas: Gas,
  equip: Record<string, boolean>
): Program[] {
  const out: Program[] = [];
  let federal = false;

  if (equip.heatpump) {
    out.push({
      name: electric === "xcel" ? "Xcel Energy — Air-Source Heat Pump rebate" : "Your electric utility's heat pump rebate",
      detail:
        electric === "xcel"
          ? "Xcel offers rebates on qualifying cold-climate heat pumps. Larger, more efficient systems typically earn more."
          : "Many Minnesota electric utilities and co-ops offer heat pump rebates — check your provider's rebate page.",
    });
    federal = true;
  }
  if (equip.ac) {
    out.push({
      name: electric === "xcel" ? "Xcel Energy — Central AC rebate" : "Your electric utility's central AC rebate",
      detail:
        electric === "xcel"
          ? "Xcel rebates scale with SEER2 efficiency — the higher the rating, the larger the rebate."
          : "Check your electric utility for a central AC rebate; most tie the amount to SEER2 efficiency.",
    });
    federal = true;
  }
  if (equip.furnace) {
    out.push({
      name:
        gas === "centerpoint"
          ? "CenterPoint Energy — High-Efficiency Furnace rebate"
          : gas === "other"
            ? "Your gas utility's high-efficiency furnace rebate"
            : "High-efficiency furnace rebate (gas utilities)",
      detail:
        gas === "centerpoint"
          ? "CenterPoint offers rebates on qualifying high-efficiency (95%+ AFUE) gas furnaces."
          : "Gas utilities across Minnesota commonly rebate 95%+ AFUE furnaces — check your provider.",
    });
    federal = true;
  }
  if (equip.thermostat) {
    const utils =
      electric === "xcel" || gas === "centerpoint" ? "Xcel Energy and CenterPoint Energy both" : "Most Minnesota utilities";
    out.push({
      name: "Smart thermostat rebate",
      detail: `${utils} offer rebates on qualifying Wi-Fi/smart thermostats — often a quick, easy one to claim.`,
    });
  }

  if (federal) {
    out.push({
      name: "Federal tax credit (Energy Efficient Home Improvement Credit, 25C)",
      detail:
        "Covers 30% of the cost of qualifying high-efficiency equipment up to annual IRS limits — heat pumps have a higher cap than furnaces or AC. Confirm current limits and eligibility with a tax professional.",
    });
  }
  return out;
}

export function RebateChecker() {
  const [electric, setElectric] = useState<Electric | null>(null);
  const [gas, setGas] = useState<Gas | null>(null);
  const [equip, setEquip] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Program[] | null>(null);

  const anyEquip = Object.values(equip).some(Boolean);
  const ready = electric && gas && anyEquip;

  function check() {
    if (!electric || !gas || !anyEquip) return;
    const programs = matchPrograms(electric, gas, equip);
    setResult(programs);
    track("tool_rebate_checker", {
      electric,
      gas,
      equip: Object.keys(equip).filter((k) => equip[k]).join(","),
      programs: programs.length,
    });
  }

  const pill = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
      active ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
    }`;

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">Your electric utility</legend>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => { setElectric("xcel"); setResult(null); }} aria-pressed={electric === "xcel"} className={pill(electric === "xcel")}>Xcel Energy</button>
            <button type="button" onClick={() => { setElectric("other"); setResult(null); }} aria-pressed={electric === "other"} className={pill(electric === "other")}>Other / co-op</button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">Your gas utility</legend>
          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => { setGas("centerpoint"); setResult(null); }} aria-pressed={gas === "centerpoint"} className={pill(gas === "centerpoint")}>CenterPoint</button>
            <button type="button" onClick={() => { setGas("other"); setResult(null); }} aria-pressed={gas === "other"} className={pill(gas === "other")}>Other</button>
            <button type="button" onClick={() => { setGas("none"); setResult(null); }} aria-pressed={gas === "none"} className={pill(gas === "none")}>No gas</button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">What are you considering? (Check all that apply)</legend>
          <div className="grid gap-2">
            {equipItems.map((e) => (
              <label
                key={e.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  equip[e.id] ? "border-navy-900/20 bg-navy-50" : "border-navy-900/10 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!equip[e.id]}
                  onChange={() => { setEquip((c) => ({ ...c, [e.id]: !c[e.id] })); setResult(null); }}
                  className="h-4 w-4 shrink-0 accent-accent-500"
                />
                <span className="text-navy-800">{e.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={check}
          disabled={!ready}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600 disabled:pointer-events-none disabled:opacity-50"
        >
          Show my likely rebates
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {result ? (
        <div className="mt-6 space-y-4" role="status" aria-live="polite">
          <div className="rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Programs you may qualify for
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-navy-900">
              {result.length} likely {result.length === 1 ? "program" : "programs"}
            </p>
            <ul className="mt-4 space-y-4">
              {result.map((p) => (
                <li key={p.name} className="flex items-start gap-3">
                  <Icon name="badgeCheck" className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span>
                    <span className="block font-display text-sm font-bold text-navy-900">{p.name}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-slate-600">{p.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resources/minnesota-hvac-rebates"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Read the full rebates guide
              <Icon name="arrowRight" className="h-4 w-4 text-accent-400" />
            </Link>
            <Link
              href="/tools/hvac-cost-estimator"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              Estimate your project cost
            </Link>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This tool routes you to the rebate and tax-credit programs that commonly
        apply in Minnesota — it doesn&rsquo;t quote exact amounts, which change each
        program year. Always confirm current rebate values and eligibility directly
        with your utility and a tax professional before you count on them.
      </p>
    </div>
  );
}
