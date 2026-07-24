import type { Dataset, RebateProgramRow } from "@/lib/datasets/types";

/**
 * Minnesota HVAC Rebate Database — SCAFFOLD ONLY.
 *
 * `rows` is intentionally empty. Rebate amounts change each program year and
 * must be transcribed directly from the utility/IRS source before they appear
 * here. Until then, pages render the methodology instead of numbers.
 */
export const rebateDataset: Dataset<RebateProgramRow> = {
  meta: {
    id: "minnesota-rebate-database",
    title: "Minnesota HVAC Rebate Database",
    description:
      "Utility and federal incentives available to Minnesota homeowners for high-efficiency heating and cooling equipment.",
    coverage: "Minnesota (Xcel Energy, CenterPoint Energy, and federal programs)",
    unit: "Incentive amount per qualifying installation",
    lastReviewed: "July 2026",
    methodology:
      "Each program is transcribed directly from the provider's official rebate page or, for tax credits, the IRS. We record only figures we can verify against the primary source, and we re-check amounts every program year. Where a current amount cannot be confirmed, the entry is left blank and links to the source rather than showing an estimate.",
    sources: [
      { label: "Xcel Energy — Rebates & Programs", url: "https://www.xcelenergy.com" },
      { label: "CenterPoint Energy — Rebates", url: "https://www.centerpointenergy.com" },
      { label: "IRS — Energy Efficient Home Improvement Credit (25C)", url: "https://www.irs.gov" },
    ],
  },
  columns: [
    { key: "provider", header: "Provider", accessor: (r) => r.provider },
    { key: "equipment", header: "Equipment", accessor: (r) => r.equipment },
    { key: "program", header: "Program", accessor: (r) => r.program },
    { key: "amount", header: "Incentive", align: "right", accessor: (r) => r.amount },
    { key: "eligibility", header: "Key eligibility", accessor: (r) => r.eligibility ?? null },
  ],
  rows: [],
};

export function getRebateDataset(): Dataset<RebateProgramRow> {
  return rebateDataset;
}
