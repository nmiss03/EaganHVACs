"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";

type EquipmentKey = "furnace" | "ac" | "heatpump" | "boiler" | "waterheater";

const equipment: Record<EquipmentKey, { label: string; icon: "flame" | "snowflake" | "gauge" | "wind" | "thermometer"; low: number; high: number }> = {
  furnace: { label: "Gas furnace", icon: "flame", low: 15, high: 20 },
  ac: { label: "Central AC", icon: "snowflake", low: 12, high: 17 },
  heatpump: { label: "Heat pump", icon: "gauge", low: 12, high: 15 },
  boiler: { label: "Boiler", icon: "thermometer", low: 20, high: 30 },
  waterheater: { label: "Water heater", icon: "wind", low: 8, high: 12 },
};

export function LifespanCalculator() {
  const [type, setType] = useState<EquipmentKey>("furnace");
  const [age, setAge] = useState(10);
  const [maintained, setMaintained] = useState(true);
  const [done, setDone] = useState(false);

  const eq = equipment[type];
  const expected = maintained ? eq.high : Math.round((eq.low + eq.high) / 2);
  const remaining = Math.max(0, expected - age);
  const pct = Math.min(100, Math.round((age / expected) * 100));

  let status: { label: string; tone: string };
  if (age >= eq.high) status = { label: "Past typical lifespan", tone: "text-accent-700" };
  else if (age >= eq.low) status = { label: "In the replacement window", tone: "text-accent-700" };
  else if (pct >= 60) status = { label: "Second half of life — start planning", tone: "text-navy-800" };
  else status = { label: "Plenty of life left", tone: "text-green-700" };

  function handleCheck() {
    setDone(true);
    track("tool_lifespan", { equipment: type, age, maintained, remaining });
  }

  return (
    <div className="rounded-xl border border-navy-900/[0.08] bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-6">
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-navy-900">Equipment type</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.keys(equipment) as EquipmentKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setType(k)}
                aria-pressed={type === k}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${
                  type === k
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 bg-white text-navy-800 hover:bg-navy-50"
                }`}
              >
                <Icon name={equipment[k].icon} className="h-4 w-4 shrink-0" />
                {equipment[k].label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="ls-age" className="mb-2 flex items-center justify-between text-sm font-semibold text-navy-900">
            Current age <span className="text-accent-700">{age} years</span>
          </label>
          <input
            id="ls-age"
            type="range"
            min={0}
            max={35}
            value={age}
            onChange={(e) => { setAge(Number(e.target.value)); setDone(false); }}
            className="w-full accent-accent-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-navy-800">
          <input
            type="checkbox"
            checked={maintained}
            onChange={(e) => { setMaintained(e.target.checked); setDone(false); }}
            className="h-5 w-5 rounded accent-accent-500"
          />
          Serviced with regular annual maintenance
        </label>

        <button
          type="button"
          onClick={handleCheck}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          Estimate remaining life
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {done ? (
        <div className="mt-6 rounded-xl border border-navy-900/[0.08] bg-slate-50 p-5" role="status" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <p className={`font-display text-lg font-bold ${status.tone}`}>{status.label}</p>
            <p className="text-sm font-semibold text-navy-700">{age} / ~{expected} yrs</p>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-navy-100">
            <div
              className={`h-full rounded-full ${pct >= 80 ? "bg-accent-500" : pct >= 60 ? "bg-accent-400" : "bg-green-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            A well-maintained {eq.label.toLowerCase()} typically lasts {eq.low}–{eq.high} years in Minnesota's climate.
            {remaining > 0
              ? ` Yours has roughly ${remaining} year${remaining === 1 ? "" : "s"} of expected life remaining.`
              : " Yours is at the point where comparing replacement options now — before a failure — usually pays off."}
          </p>
          <Link
            href={remaining <= 3 ? "/#inquiry" : "/resources/minnesota-hvac-maintenance-calendar"}
            onClick={() => track("cta_from_tool", { tool: "lifespan" })}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4 hover:text-accent-600"
          >
            {remaining <= 3 ? "Compare replacement quotes" : "See the maintenance calendar to reach the high end"}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Estimates use typical Minnesota equipment lifespans and are educational only — actual
        life depends on usage, installation quality, and maintenance history.
      </p>
    </div>
  );
}
