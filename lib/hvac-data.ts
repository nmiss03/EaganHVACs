/**
 * ============================================================================
 * CANONICAL HVAC REFERENCE DATA — the single source of truth for every
 * factual HVAC figure used anywhere on the site.
 * ============================================================================
 *
 * Every hardcoded cost range, equipment lifespan, efficiency rating, rebate
 * amount, and rule-of-thumb threshold lives HERE and nowhere else. Calculators,
 * article prose, comparison tables, datasets, and marketing components all
 * import from this module. If a number needs to change, it changes in one place
 * and propagates everywhere automatically — no drift, no contradictions.
 *
 * Rules for maintaining this file:
 *   1. A factual value may appear in exactly one constant below and nowhere
 *      else in the codebase.
 *   2. Never invent or estimate. Values are editorial planning figures for the
 *      Twin Cities market or industry-standard specifications; sourcing notes
 *      live alongside each block.
 *   3. Ranges are honest low-to-high bands, not single points.
 *
 * All monetary figures are Twin Cities (MN) installed prices, before rebates,
 * in current USD. All lifespans are typical, well-maintained Minnesota-climate
 * expectations.
 */

/** A low-to-high inclusive numeric band. */
export type Range = readonly [low: number, high: number];

/** A named year span for equipment life. */
export interface YearSpan {
  readonly low: number;
  readonly high: number;
}

// ---------------------------------------------------------------------------
// 1. INSTALLED SYSTEM COST RANGES (Twin Cities, before rebates)
//    Consumed by: CostEstimator, QuoteAnalyzer, tool-content cost snapshot,
//    buyer's-kit price sheet, cost-guide + replacement-cost articles.
// ---------------------------------------------------------------------------

export type SystemKey = "furnace" | "ac" | "furnaceAndAc" | "heatPump";

export const COST_RANGES: Record<SystemKey, Range> = {
  /** New gas furnace, installed. */
  furnace: [4000, 9000],
  /** Central air conditioner, installed. */
  ac: [4500, 9500],
  /** Furnace + AC replaced together (shared labor/mobilization). */
  furnaceAndAc: [8000, 16500],
  /** Cold-climate (ccASHP) heat pump, installed. */
  heatPump: [8000, 18000],
} as const;

// ---------------------------------------------------------------------------
// 2. EQUIPMENT LIFESPANS (years, typical, well-maintained, MN climate)
//    Consumed by: LifespanCalculator, RepairReplaceCalculator, and lifespan
//    prose across tool-content and articles.
// ---------------------------------------------------------------------------

export type EquipmentKey =
  | "furnace"
  | "ac"
  | "heatPump"
  | "boiler"
  | "waterHeater";

export const LIFESPANS: Record<EquipmentKey, YearSpan> = {
  furnace: { low: 15, high: 20 },
  ac: { low: 12, high: 17 },
  heatPump: { low: 12, high: 15 },
  boiler: { low: 20, high: 30 },
  waterHeater: { low: 8, high: 12 },
} as const;

// ---------------------------------------------------------------------------
// 3. EFFICIENCY RATINGS
//    Consumed by: RebateChecker, HeatPumpVsFurnace, QuoteAnalyzer checklist,
//    cost/replacement articles, buyer's kit, city guides, rebate dataset, FAQ.
// ---------------------------------------------------------------------------

/** Gas-furnace AFUE (Annual Fuel Utilization Efficiency), in whole percent. */
export const FURNACE_AFUE = {
  /** Non-condensing builder-grade baseline. */
  standard: 80,
  /**
   * Condensing / rebate-recommended high-efficiency threshold. This is the
   * single canonical "high-efficiency furnace" number — everywhere the site
   * describes a high-efficiency furnace it resolves to this value.
   */
  highEfficiency: 95,
} as const;

/** Central-AC SEER2 efficiency tiers (2023 rating standard). */
export const AC_SEER2 = {
  /** Budget-conscious replacement. */
  standard: { min: 14, max: 15 },
  /** Best balance for most Minnesota homes. */
  mid: { min: 16, max: 17 },
  /** Lowest bills, top rebate eligibility (18 and up). */
  high: { min: 18 },
  /** Threshold at/above which an AC counts as more-than-standard efficiency. */
  aboveStandardThreshold: 16,
} as const;

// ---------------------------------------------------------------------------
// 4. RULES OF THUMB / DECISION THRESHOLDS
//    Consumed by: RepairReplaceCalculator + its pillar prose.
// ---------------------------------------------------------------------------

/**
 * The "$5,000 rule": multiply equipment age (years) by repair cost ($); if the
 * product exceeds this threshold, lean toward replacement.
 */
export const REPAIR_REPLACE_RULE_USD = 5000;

// ---------------------------------------------------------------------------
// 5. INCENTIVES — FEDERAL 25C (historical; EXPIRED for 2026+ installs)
//    Consumed by: rebate dataset, rebates guide + heat-pump articles,
//    tool-content, rebate-database page. Never present as currently claimable.
// ---------------------------------------------------------------------------

export const FEDERAL_25C = {
  name: "Energy Efficient Home Improvement Credit (25C)",
  /** Share of qualifying equipment cost the credit historically covered. */
  ratePct: 30,
  /** Historical annual cap for a qualifying furnace or AC, in USD. */
  capFurnaceAcUsd: 600,
  /** Historical annual cap for a qualifying heat pump, in USD. */
  capHeatPumpUsd: 2000,
  effectiveDate: "2023-01-01",
  /** Last day equipment placed in service could qualify (OBBBA, 2025). */
  expirationDate: "2025-12-31",
} as const;

// ---------------------------------------------------------------------------
// 6. MISC RECURRING FACTS
// ---------------------------------------------------------------------------

/** Typical furnace repair bill (parts + labor), Twin Cities. */
export const FURNACE_REPAIR_RANGE: Range = [150, 600];

/** Typical energy savings from a properly configured smart thermostat. */
export const SMART_THERMOSTAT_SAVINGS_PCT = 8;

// ===========================================================================
// FORMATTERS — the canonical way to render the values above as text, so the
// numbers themselves never get retyped inside a string literal.
// ===========================================================================

/** `4000` -> `"$4,000"`. */
export function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/**
 * `[4000, 9000]` -> `"$4,000–$9,000"`.
 * @param sep dash/separator between the two values (default en dash, no spaces)
 * @param plus append `"+"` to the high end (e.g. "$7,500–$9,500+")
 */
export function usdRange(
  range: Range,
  { sep = "–", plus = false }: { sep?: string; plus?: boolean } = {}
): string {
  return `${usd(range[0])}${sep}${usd(range[1])}${plus ? "+" : ""}`;
}

/** `{low:15,high:20}` -> `"15–20"` (no "years" suffix). */
export function yearsRange(
  span: YearSpan,
  { sep = "–" }: { sep?: string } = {}
): string {
  return `${span.low}${sep}${span.high}`;
}

/** `95` -> `"95%+ AFUE"` (the standard way to render a furnace-efficiency threshold). */
export function afuePlus(pct: number): string {
  return `${pct}%+ AFUE`;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/** `"2025-12-31"` -> `"December 31, 2025"`. Parses as a plain calendar date (no timezone). */
export function longDate(iso: string): string {
  const parts = iso.split("-");
  const year = Number(parts[0]);
  const monthIndex = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  return `${MONTHS[monthIndex] ?? ""} ${day}, ${year}`;
}

/** Canonical long-form label for when the federal 25C credit expired. */
export const FEDERAL_25C_EXPIRATION_LABEL = longDate(FEDERAL_25C.expirationDate);

/** Canonical year the federal 25C credit expired (e.g. for "end of 2025" phrasing). */
export const FEDERAL_25C_EXPIRATION_YEAR = Number(
  FEDERAL_25C.expirationDate.slice(0, 4)
);
