import type { Dataset, PermitRow } from "@/lib/datasets/types";

/**
 * Minnesota HVAC Permit Database — SCAFFOLD ONLY.
 *
 * `rows` is intentionally empty. Permit rules and fees must be transcribed
 * from each municipality's building department before they appear here.
 */
export const permitDataset: Dataset<PermitRow> = {
  meta: {
    id: "minnesota-hvac-permit-database",
    title: "Minnesota HVAC Permit Requirements",
    description:
      "Whether a mechanical permit is required for HVAC replacement in south-metro cities, and the typical fee and inspection expectations.",
    coverage: "Dakota, Scott, and Hennepin county cities",
    unit: "Per municipality",
    lastReviewed: "July 2026",
    methodology:
      "Requirements are transcribed from each city's building or inspections department. Because fees and rules change, every entry links to the municipal source and shows a last-reviewed date. Where a city's rule cannot be confirmed, the entry is left blank rather than assumed.",
    sources: [{ label: "Municipal building / inspections departments" }],
  },
  columns: [
    { key: "city", header: "City", accessor: (r) => r.city },
    { key: "county", header: "County", accessor: (r) => r.county ?? null },
    {
      key: "permitRequired",
      header: "Permit required?",
      accessor: (r) =>
        r.permitRequired === null ? null : r.permitRequired ? "Yes" : "No",
    },
    { key: "typicalFee", header: "Typical fee", align: "right", accessor: (r) => r.typicalFee },
    {
      key: "inspectionRequired",
      header: "Inspection?",
      accessor: (r) =>
        r.inspectionRequired === null ? null : r.inspectionRequired ? "Yes" : "No",
    },
  ],
  rows: [],
};

export function getPermitDataset(): Dataset<PermitRow> {
  return permitDataset;
}
