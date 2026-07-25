/**
 * Shared dataset architecture.
 *
 * These types define a generic, reusable shape for the structured Minnesota
 * datasets planned for later sprints (Rebate Database, Price Index, Permit
 * Database). Nothing here is populated yet — the row arrays live in the
 * per-dataset modules and are intentionally empty until real, verified data
 * is collected. The goal of this file is only to let a future sprint add a
 * dataset (types + rows + a page) cleanly, with no rework of the plumbing.
 *
 * Design rules baked in:
 *  - Every dataset carries its own provenance (sources + methodology + review
 *    date) so we never present a number without saying where it came from.
 *  - Amount/price fields are nullable. A missing value renders as "verify with
 *    the source," never as a fabricated figure.
 */

import type { ReactNode } from "react";

/** A citable origin for a dataset's values. */
export interface DatasetSource {
  label: string;
  /** Canonical URL for the source, when one exists. */
  url?: string;
}

/** Provenance and framing shared by every dataset. */
export interface DatasetMeta {
  /** Stable id, e.g. "minnesota-rebate-database". */
  id: string;
  title: string;
  /** One-sentence description of what the dataset covers. */
  description: string;
  /** Geographic / topical scope, e.g. "Twin Cities south metro". */
  coverage?: string;
  /** Human-readable unit note, e.g. "Installed price, USD, before rebates". */
  unit?: string;
  /** Month/year the data was last reviewed, e.g. "July 2026". */
  lastReviewed: string;
  /** How the values are gathered and verified — always shown to the reader. */
  methodology: string;
  /** Plain-language guidance on when a reader should re-check the source. */
  recheckGuidance?: string;
  /** Where the numbers come from. */
  sources: DatasetSource[];
}

/** How to align a column's cells. */
export type CellAlign = "left" | "right" | "center";

/**
 * A single column definition. `accessor` pulls a display value from a row;
 * `render` (optional) overrides it with custom markup (e.g. a badge). Keeping
 * columns data-driven lets one <DatasetTable> render any dataset.
 */
export interface DatasetColumn<Row> {
  key: string;
  header: string;
  align?: CellAlign;
  /** Returns the plain-text value for a cell (used for empty/fallback logic). */
  accessor: (row: Row) => string | number | null | undefined;
  /** Optional rich renderer; falls back to the accessor value when omitted. */
  render?: (row: Row) => ReactNode;
}

/** A fully-described dataset: provenance + columns + rows. */
export interface Dataset<Row> {
  meta: DatasetMeta;
  columns: DatasetColumn<Row>[];
  rows: Row[];
}

/* ------------------------------------------------------------------ */
/* Domain row shapes — empty-ready. Populate in a later sprint.        */
/* ------------------------------------------------------------------ */

/**
 * Program lifecycle status.
 *  - active: program exists and is currently offered by the provider.
 *  - pending: announced/expected but not yet launched.
 *  - expired: no longer available (kept for historical context).
 *  - requires_verification: existence or amount not confirmed from a primary source.
 */
export type RebateStatus = "active" | "pending" | "expired" | "requires_verification";

/**
 * One rebate or tax-credit program (Rebate Database). Designed for ongoing
 * maintenance: every row carries its own effective/expiration/last-verified
 * dates and its official source, so a maintainer can re-verify one program
 * without touching the rest, and readers can see exactly how fresh each entry
 * is. The `amount` is null unless it has been confirmed from a primary source
 * — a null renders as "verify current amount," never as an invented number.
 */
export interface RebateProgramRow {
  id: string;
  /** Program provider, e.g. "Xcel Energy", "CenterPoint Energy", "Federal (IRS)". */
  provider: string;
  /** Provider category, used for grouping and icons. */
  providerType: "electric-utility" | "gas-utility" | "state" | "federal";
  /** Equipment the program applies to, e.g. "Cold-climate heat pump". */
  equipment: string;
  program: string;
  /** Confirmed amount from a primary source, else null (requires verification). */
  amount: string | null;
  /** Eligibility summary in plain language. */
  eligibility?: string;
  /** Income restriction / income-qualified enhancement, if any. */
  incomeRestriction?: string | null;
  status: RebateStatus;
  /** When the program took effect, if known. */
  effectiveDate?: string | null;
  /** When the program ends, if known/applicable. */
  expirationDate?: string | null;
  /** Date this specific row was last checked against its source. */
  lastVerified: string;
  /** Official source for this program — always present so readers can confirm. */
  source: DatasetSource;
  /** Any caveat a reader must know (uncertainty, pending status, etc.). */
  notes?: string;
}

/** One installed-price data point (Price Index). */
export interface PriceIndexRow {
  system: string;
  /** Efficiency tier label, e.g. "High-efficiency (95%+ AFUE)". */
  efficiencyTier?: string;
  metro?: string;
  lowUsd: number | null;
  highUsd: number | null;
  source?: DatasetSource;
}

/** One municipality's HVAC permit requirements (Permit Database). */
export interface PermitRow {
  city: string;
  county?: string;
  /** Whether a mechanical/HVAC permit is required for a replacement. */
  permitRequired: boolean | null;
  typicalFee: string | null;
  inspectionRequired: boolean | null;
  source?: DatasetSource;
}
