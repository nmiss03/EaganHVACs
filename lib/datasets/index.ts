import { site } from "@/lib/site";
import type { Dataset, DatasetMeta } from "@/lib/datasets/types";

export * from "@/lib/datasets/types";
export { getRebateDataset, rebateDataset } from "@/lib/datasets/rebates";
export { getPriceIndexDataset, priceIndexDataset } from "@/lib/datasets/price-index";
export { getPermitDataset, permitDataset } from "@/lib/datasets/permits";

/** True once a dataset has at least one verified row to display. */
export function isDatasetPopulated<Row>(dataset: Dataset<Row>): boolean {
  return dataset.rows.length > 0;
}

/** Formats a USD low–high band, or null when either bound is missing. */
export function formatUsdRange(
  low: number | null | undefined,
  high: number | null | undefined
): string | null {
  if (low == null || high == null) return null;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return `${fmt(low)} – ${fmt(high)}`;
}

/**
 * schema.org Dataset JSON-LD for a dataset page. Emitting this only makes
 * sense once a dataset is populated and has its own URL, which is why no page
 * calls it yet — it's here so a future dataset page can add valid structured
 * data with one line.
 */
export function datasetJsonLd(meta: DatasetMeta, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: meta.title,
    description: meta.description,
    url,
    isAccessibleForFree: true,
    dateModified: meta.lastReviewed,
    creator: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    ...(meta.coverage ? { spatialCoverage: meta.coverage } : {}),
    ...(meta.sources.length
      ? {
          citation: meta.sources.map((s) => s.label),
          ...(meta.sources.find((s) => s.url)
            ? { isBasedOn: meta.sources.filter((s) => s.url).map((s) => s.url) }
            : {}),
        }
      : {}),
  };
}
