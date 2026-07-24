import type { Dataset, PriceIndexRow } from "@/lib/datasets/types";

/**
 * Minnesota HVAC Price Index — SCAFFOLD ONLY.
 *
 * `rows` is intentionally empty. Installed-price data must be built from
 * collected, dated quote samples — not invented — before it appears here.
 * Until then, pages render the methodology and point users to the Cost
 * Estimator for a modeled range.
 */
export const priceIndexDataset: Dataset<PriceIndexRow> = {
  meta: {
    id: "minnesota-hvac-price-index",
    title: "Minnesota HVAC Price Index",
    description:
      "Typical installed price ranges for heating and cooling equipment in the Twin Cities, by system type and efficiency tier.",
    coverage: "Twin Cities metro",
    unit: "Installed price, USD, before rebates",
    lastReviewed: "July 2026",
    methodology:
      "Ranges are built from a rolling sample of real, dated homeowner quotes and published contractor pricing, then reported as a low-to-high band rather than a single number. We never publish a figure we cannot tie to collected samples; where a segment has too few samples to be reliable, it is left blank. These are planning ranges, not quotes — your home's size, access, and equipment choices move the final price.",
    sources: [
      { label: "Aggregated homeowner quote samples (dated)" },
      { label: "Published contractor and manufacturer pricing" },
    ],
  },
  columns: [
    { key: "system", header: "System", accessor: (r) => r.system },
    { key: "efficiencyTier", header: "Efficiency", accessor: (r) => r.efficiencyTier ?? null },
    { key: "metro", header: "Area", accessor: (r) => r.metro ?? null },
    { key: "low", header: "Typical low", align: "right", accessor: (r) => r.lowUsd },
    { key: "high", header: "Typical high", align: "right", accessor: (r) => r.highUsd },
  ],
  rows: [],
};

export function getPriceIndexDataset(): Dataset<PriceIndexRow> {
  return priceIndexDataset;
}
