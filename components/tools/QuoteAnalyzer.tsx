"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { track } from "@/lib/track";

type Equip = "furnace" | "ac" | "both" | "heatpump";

const equipOptions: { value: Equip; label: string; icon: IconName }[] = [
  { value: "furnace", label: "Furnace", icon: "flame" },
  { value: "ac", label: "Central AC", icon: "snowflake" },
  { value: "both", label: "Furnace + AC", icon: "gauge" },
  { value: "heatpump", label: "Heat pump", icon: "gauge" },
];

const ranges: Record<Equip, [number, number]> = {
  furnace: [4000, 9000],
  ac: [4500, 9500],
  both: [8000, 16500],
  heatpump: [8000, 18000],
};

/** Each item a comparable, trustworthy quote should include. Missing items
 * become the questions to ask — the completeness score is checked/total. */
const checklist: { id: string; label: string; question: string }[] = [
  { id: "models", label: "Specific equipment make & model numbers", question: "What are the exact make and model numbers of the equipment you're quoting?" },
  { id: "efficiency", label: "Efficiency rating (AFUE / SEER2) stated", question: "What's the efficiency rating — AFUE for the furnace, SEER2 for the AC?" },
  { id: "sizing", label: "A load calculation or sizing justification", question: "Did you run a load calculation (Manual J), or how did you size this system for my home?" },
  { id: "permit", label: "Permit included", question: "Is the required Minnesota permit included in this price, and will you pull it?" },
  { id: "laborWarranty", label: "Labor warranty length stated", question: "How long is your labor warranty, separate from the manufacturer's parts warranty?" },
  { id: "partsWarranty", label: "Manufacturer parts warranty & registration", question: "What's the manufacturer's parts warranty, and will you register it so I get the full term?" },
  { id: "lineItems", label: "Line-item breakdown (equipment vs. labor)", question: "Can you give me an itemized breakdown of equipment versus labor?" },
  { id: "removal", label: "Old-equipment removal & disposal", question: "Does the price include removing and disposing of the old system?" },
  { id: "written", label: "The full price in writing", question: "Can I get the complete quote in writing before I decide?" },
  { id: "timeline", label: "Timeline / start date", question: "What's the expected timeline and start date?" },
];

interface Result {
  score: number;
  band: { label: string; tone: "good" | "ok" | "thin" | "bad"; note: string };
  missing: typeof checklist;
  priceNote: string | null;
}

const bands = {
  good: { label: "Thorough", cls: "text-green-700", bar: "bg-green-500" },
  ok: { label: "Decent", cls: "text-accent-700", bar: "bg-accent-500" },
  thin: { label: "Thin", cls: "text-accent-700", bar: "bg-accent-500" },
  bad: { label: "Very thin", cls: "text-red-700", bar: "bg-red-500" },
} as const;

function priceContext(equip: Equip, amount: number): string | null {
  if (!amount || amount <= 0) return null;
  const [low, high] = ranges[equip];
  if (amount < low * 0.85)
    return "This is below the typical Twin Cities range. A low price isn't automatically bad — but ask what's behind it (a smaller or lower-efficiency unit, reused parts, or a missing permit are common reasons).";
  if (amount > high * 1.15)
    return "This is above the typical Twin Cities range. That can be legitimate — premium or modulating equipment, ductwork changes, or a tricky install — but ask what specifically justifies the higher price.";
  return "This falls within the typical Twin Cities range for this equipment, which is a good sign. Completeness (below) matters more than the number alone.";
}

export function QuoteAnalyzer() {
  const [amount, setAmount] = useState("");
  const [equip, setEquip] = useState<Equip>("both");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Result | null>(null);

  function toggle(id: string) {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
    setResult(null);
  }

  function analyze() {
    const hits = checklist.filter((c) => checked[c.id]).length;
    const score = Math.round((hits / checklist.length) * 100);
    const missing = checklist.filter((c) => !checked[c.id]);
    const tone: Result["band"]["tone"] =
      score >= 85 ? "good" : score >= 60 ? "ok" : score >= 35 ? "thin" : "bad";
    const note =
      tone === "good"
        ? "This looks like a comparable, well-documented quote. Line it up against one or two others on the same terms."
        : tone === "ok"
          ? "A solid quote with a few gaps. Fill them in before you compare it against others."
          : tone === "thin"
            ? "Missing enough detail that it's hard to compare fairly. Get the items below in writing first."
            : "Too little detail to trust the number yet. Ask for the missing items before making any decision.";
    const res: Result = {
      score,
      band: { label: bands[tone].label, tone, note },
      missing,
      priceNote: priceContext(equip, Number(amount.replace(/[^0-9]/g, ""))),
    };
    setResult(res);
    track("tool_quote_analyzer", { equip, amount: Number(amount.replace(/[^0-9]/g, "")) || 0, score });
  }

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="qa-amount" className="mb-2 block text-sm font-semibold text-navy-900">
              Quote amount <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                id="qa-amount"
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setResult(null); }}
                placeholder="8,500"
                className="w-full rounded-xl border border-navy-900/15 bg-white py-2.5 pl-7 pr-4 text-[15px] text-navy-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25"
              />
            </div>
          </div>
          <div>
            <span className="mb-2 block text-sm font-semibold text-navy-900">Equipment quoted</span>
            <div className="grid grid-cols-4 gap-1.5">
              {equipOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { setEquip(o.value); setResult(null); }}
                  aria-pressed={equip === o.value}
                  title={o.label}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 text-[10px] font-semibold transition-colors ${
                    equip === o.value
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                  }`}
                >
                  <Icon name={o.icon} className="h-4 w-4" />
                  {o.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-navy-900">
            Check everything your written quote includes
          </legend>
          <div className="grid gap-2">
            {checklist.map((c) => (
              <label
                key={c.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  checked[c.id]
                    ? "border-navy-900/20 bg-navy-50"
                    : "border-navy-900/10 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={() => toggle(c.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent-500"
                />
                <span className="text-navy-800">{c.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={analyze}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          Analyze my quote
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {result ? (
        <div className="mt-6 space-y-5" role="status" aria-live="polite">
          {/* Score */}
          <div className="rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Completeness score
              </p>
              <p className={`font-display text-sm font-bold ${bands[result.band.tone].cls}`}>
                {result.band.label}
              </p>
            </div>
            <p className="mt-1 font-display text-3xl font-extrabold text-navy-900">{result.score}%</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-navy-100">
              <div className={`h-full rounded-full ${bands[result.band.tone].bar}`} style={{ width: `${result.score}%` }} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{result.band.note}</p>
            {result.priceNote ? (
              <p className="mt-3 rounded-lg bg-white p-3 text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-navy-900">On the price: </span>
                {result.priceNote}
              </p>
            ) : null}
          </div>

          {/* Missing + questions */}
          {result.missing.length > 0 ? (
            <div className="rounded-xl border border-accent-200 bg-accent-50/50 p-6">
              <p className="font-display text-base font-bold text-navy-900">
                Ask the contractor these {result.missing.length} question{result.missing.length > 1 ? "s" : ""}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Each one fills a gap that makes quotes hard to compare fairly.
              </p>
              <ul className="mt-4 space-y-3">
                {result.missing.map((m) => (
                  <li key={m.id} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800">
                    <Icon name="quote" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                    <span>&ldquo;{m.question}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-green-200 bg-green-50/60 p-6">
              <p className="flex items-center gap-2 font-display text-base font-bold text-green-800">
                <Icon name="check" className="h-5 w-5" strokeWidth={2.4} />
                Nothing major missing
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                This quote covers the essentials. Get one or two more on the same terms and compare them side by side.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#inquiry"
              onClick={() => track("cta_from_tool", { tool: "quote_analyzer" })}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-colors hover:bg-accent-600"
            >
              Get more quotes to compare
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link
              href="/resources/questions-to-ask-hvac-contractor"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              More questions to ask
            </Link>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is an educational tool, not a professional evaluation of your quote. It
        checks whether a quote is complete and comparable — not whether the equipment
        or price is right for your home. Always compare multiple written quotes and
        rely on a licensed contractor's in-home assessment.
      </p>
    </div>
  );
}
