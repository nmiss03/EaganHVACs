"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";

const terms = [24, 36, 60, 84, 120] as const;
const rates = [
  { label: "0% promo", value: 0 },
  { label: "7.99%", value: 7.99 },
  { label: "9.99%", value: 9.99 },
  { label: "12.99%", value: 12.99 },
] as const;

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

function money(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

export function FinancingCalculator() {
  const [amount, setAmount] = useState(9000);
  const [term, setTerm] = useState<number>(60);
  const [rate, setRate] = useState<number>(9.99);

  const payment = monthlyPayment(amount, rate, term);
  const totalPaid = payment * term;
  const totalInterest = totalPaid - amount;

  function report(next: { term?: number; rate?: number }) {
    const t = next.term ?? term;
    const r = next.rate ?? rate;
    track("tool_financing", {
      amount,
      term: t,
      rate: r,
      payment: Math.round(monthlyPayment(amount, r, t)),
    });
  }

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="fin-amount" className="text-sm font-semibold text-navy-900">
              Amount to finance
            </label>
            <span className="font-display text-lg font-extrabold text-navy-900">
              {money(amount)}
            </span>
          </div>
          <input
            id="fin-amount"
            type="range"
            min={3000}
            max={20000}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            onMouseUp={() => report({})}
            onTouchEnd={() => report({})}
            className="w-full accent-accent-500"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>$3,000</span>
            <span>$20,000</span>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">Term</legend>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {terms.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTerm(t); report({ term: t }); }}
                aria-pressed={term === t}
                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                  term === t
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                {t} mo
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">
            Interest rate (APR)
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {rates.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => { setRate(r.value); report({ rate: r.value }); }}
                aria-pressed={rate === r.value}
                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                  rate === r.value
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Result */}
      <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6" role="status" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Estimated monthly payment
        </p>
        <p className="mt-1 font-display text-3xl font-extrabold text-navy-900">
          {money(payment)}<span className="text-lg font-bold text-slate-400">/mo</span>
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">Total of payments</dt>
            <dd className="font-display text-base font-bold text-navy-900">{money(totalPaid)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Total interest</dt>
            <dd className="font-display text-base font-bold text-navy-900">
              {rate === 0 ? "$0" : money(totalInterest)}
            </dd>
          </div>
        </dl>

        <ul className="mt-5 space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2.5">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
            Many HVAC contractors offer promotional 0% or low-APR financing on new systems — worth asking each one.
          </li>
          <li className="flex items-start gap-2.5">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
            <span>
              Rebates and tax credits reduce the amount you finance — see the{" "}
              <Link href="/resources/minnesota-hvac-rebates" className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 hover:text-accent-600">
                Minnesota rebates guide
              </Link>.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
            A high-efficiency system's lower energy bills can offset part of the monthly payment.
          </li>
        </ul>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#inquiry"
            onClick={() => track("cta_from_tool", { tool: "financing_calculator" })}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-colors hover:bg-accent-600"
          >
            Compare quotes with financing
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link
            href="/tools/hvac-cost-estimator"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
          >
            Estimate your project cost first
          </Link>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is an educational estimate, not a loan offer. Your actual APR, term, and
        payment depend on the lender and your credit. Contractors quote financing
        directly — use this to understand what fits your budget before you do.
      </p>
    </div>
  );
}
