"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { track } from "@/lib/track";

type Priority = "bills" | "upfront" | "carbon" | "comfort";
type Cooling = "yes" | "no";
type Heating = "gas" | "electric";

const priorityOptions: { value: Priority; label: string }[] = [
  { value: "bills", label: "Lowest monthly bills" },
  { value: "upfront", label: "Lowest upfront cost" },
  { value: "carbon", label: "Lower carbon footprint" },
  { value: "comfort", label: "Best comfort" },
];
const coolingOptions: { value: Cooling; label: string }[] = [
  { value: "yes", label: "Yes — I need or am replacing AC too" },
  { value: "no", label: "No — my AC works fine" },
];
const heatingOptions: { value: Heating; label: string }[] = [
  { value: "gas", label: "Natural gas furnace" },
  { value: "electric", label: "Electric, propane, or none" },
];

interface Recommendation {
  tag: string;
  icon: IconName;
  title: string;
  why: string[];
}

function recommend(priority: Priority, cooling: Cooling, heating: Heating): Recommendation {
  if (heating === "electric") {
    return {
      tag: "Cold-climate heat pump",
      icon: "gauge",
      title: "A cold-climate heat pump is likely your best move",
      why: [
        "Because you don't rely on gas heat, a single cold-climate heat pump can handle both heating and cooling — and it's dramatically cheaper to run than electric resistance heat.",
        "Modern cold-climate models are rated to heat efficiently well below 0°F, which matters in Minnesota.",
        "Heat pumps qualify for significant utility rebates and federal tax credits that offset the higher upfront cost.",
        "A contractor may add a small backup heat source sized for extreme cold snaps — worth asking about.",
      ],
    };
  }
  // Gas furnace present
  if (priority === "upfront") {
    return {
      tag: "High-efficiency furnace",
      icon: "flame",
      title: `A high-efficiency gas furnace${cooling === "yes" ? " (plus a new AC)" : ""} fits best`,
      why: [
        "With gas already at your home and lowest upfront cost as your priority, a high-efficiency (96%+ AFUE) furnace is hard to beat.",
        cooling === "yes"
          ? "Pairing it with a new AC covers cooling at the same time and saves on shared installation labor."
          : "Since your AC still works, you only pay for the furnace now.",
        "High-efficiency furnaces still qualify for CenterPoint Energy rebates.",
        "When your AC eventually needs replacing, that's the natural moment to reconsider a heat pump.",
      ],
    };
  }
  // Gas + priority is bills / carbon / comfort
  if (cooling === "yes") {
    return {
      tag: "Dual-fuel (heat pump + furnace)",
      icon: "gauge",
      title: "A dual-fuel system is the Minnesota sweet spot for you",
      why: [
        "A cold-climate heat pump handles most of the heating season efficiently, and your gas furnace takes over automatically on the coldest days — the best of both.",
        "The heat pump cools in summer too, so it replaces your AC — you get heating and cooling from one upgrade.",
        "Dual-fuel systems typically qualify for the largest stack of utility rebates plus the federal tax credit.",
        "You get lower bills and lower carbon without giving up reliable gas heat when it's -20°F.",
      ],
    };
  }
  // Gas + bills/carbon/comfort + AC still works
  return {
    tag: "Furnace now, heat pump later",
    icon: "flame",
    title: "Replace the furnace now — and plan a heat pump when your AC retires",
    why: [
      "Since your AC still works, replacing it now to add a heat pump means paying to remove a functional unit — usually not cost-effective yet.",
      "A high-efficiency furnace now keeps upfront cost reasonable and lowers your gas bill immediately.",
      "The cost-effective moment to switch to a heat pump (or dual-fuel) is when your AC needs replacing anyway — plan for it then.",
      "Ask any contractor to quote a dual-fuel option too, so you can compare the numbers for your home.",
    ],
  };
}

export function HeatPumpVsFurnace() {
  const [priority, setPriority] = useState<Priority | null>(null);
  const [cooling, setCooling] = useState<Cooling | null>(null);
  const [heating, setHeating] = useState<Heating | null>(null);
  const [result, setResult] = useState<Recommendation | null>(null);

  const ready = priority && cooling && heating;

  function handleSubmit() {
    if (!priority || !cooling || !heating) return;
    const rec = recommend(priority, cooling, heating);
    setResult(rec);
    track("tool_heatpump_vs_furnace", { priority, cooling, heating, result: rec.tag });
  }

  function Group<T extends string>({
    legend,
    options,
    value,
    onSelect,
  }: {
    legend: string;
    options: { value: T; label: string }[];
    value: T | null;
    onSelect: (v: T) => void;
  }) {
    return (
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-navy-900">{legend}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onSelect(o.value); setResult(null); }}
              aria-pressed={value === o.value}
              className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                value === o.value
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <Group legend="What matters most to you?" options={priorityOptions} value={priority} onSelect={setPriority} />
        <Group legend="Do you also need cooling?" options={coolingOptions} value={cooling} onSelect={setCooling} />
        <Group legend="What heats your home today?" options={heatingOptions} value={heating} onSelect={setHeating} />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!ready}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600 disabled:pointer-events-none disabled:opacity-50"
        >
          See my recommendation
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {result ? (
        <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-6" role="status" aria-live="polite">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
              <Icon name={result.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Based on your answers, lean toward
              </p>
              <p className="font-display text-lg font-extrabold text-navy-900">{result.tag}</p>
            </div>
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-navy-900">{result.title}</h3>
          <ul className="mt-3 space-y-2.5">
            {result.why.map((w) => (
              <li key={w.slice(0, 24)} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.4} />
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#inquiry"
              onClick={() => track("cta_from_tool", { tool: "heatpump_vs_furnace" })}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-colors hover:bg-accent-600"
            >
              Compare quotes for this
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link
              href="/services/heat-pumps"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              Learn about heat pumps
            </Link>
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        This is a starting point, not a substitute for a contractor's load calculation
        and in-home assessment. Every home is different — use this to ask sharper
        questions when you compare quotes.
      </p>
    </div>
  );
}
