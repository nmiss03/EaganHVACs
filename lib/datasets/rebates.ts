import type { Dataset, RebateProgramRow } from "@/lib/datasets/types";
import { FEDERAL_25C, FEDERAL_25C_EXPIRATION_LABEL, usd } from "@/lib/hvac-data";

/**
 * Minnesota HVAC Rebate Database.
 *
 * Integrity rules for this file:
 *  - A program is listed only when its existence is documented by the official
 *    provider.
 *  - A dollar `amount` is filled in ONLY when confirmed directly from a primary
 *    source. During this review the utility rebate pages were not machine-
 *    accessible (HTTP 403), so utility amounts are left null and marked
 *    "verify at source" rather than reproduced from second-hand figures.
 *  - Expired programs are kept for historical context and clearly labeled;
 *    they never render as currently claimable.
 *  - We never estimate, extrapolate, or carry a prior year's amount forward.
 */
export const rebateDataset: Dataset<RebateProgramRow> = {
  meta: {
    id: "minnesota-rebate-database",
    title: "Minnesota HVAC Rebate Database",
    description:
      "The heating and cooling incentives available to Minnesota homeowners — which programs are active, which have expired, and where to confirm current amounts.",
    coverage: "Minnesota (Xcel Energy, CenterPoint Energy, state, and federal programs)",
    unit: "Incentive per qualifying installation",
    lastReviewed: "July 2026",
    methodology:
      "Each program is listed only when its existence is documented by the official provider. A dollar amount appears only when we can confirm it directly from the provider's official rebate page or the IRS. When a primary source can't be accessed to confirm a current figure, the amount is marked \"verify at source\" with a direct link, rather than reproduced from second-hand estimates. Expired programs are kept for historical context and clearly labeled. We never estimate, extrapolate, or carry a prior year's amount forward.",
    recheckGuidance:
      "Utility rebate amounts and eligibility change at least once a year — and sometimes mid-year. Always confirm the current figure on the provider's official page (linked with each program) before you purchase, and re-check within the same program year in which you install.",
    sources: [
      { label: "Xcel Energy — Programs & Rebates (official)", url: "https://www.xcelenergy.com/programs_and_rebates" },
      { label: "CenterPoint Energy — Rebates (official)", url: "https://www.centerpointenergy.com/en-us/residential/save-energy-money/rebates" },
      { label: "Minnesota Dept. of Commerce — Energy programs", url: "https://mn.gov/commerce/energy/" },
      { label: "IRS — Energy Efficient Home Improvement Credit (25C)", url: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit" },
    ],
  },
  columns: [
    { key: "provider", header: "Provider", accessor: (r) => r.provider },
    { key: "equipment", header: "Equipment", accessor: (r) => r.equipment },
    { key: "program", header: "Program", accessor: (r) => r.program },
    { key: "amount", header: "Amount", align: "right", accessor: (r) => r.amount },
    { key: "status", header: "Status", accessor: (r) => r.status },
  ],
  rows: [
    {
      id: "federal-25c",
      provider: "Federal (IRS)",
      providerType: "federal",
      equipment: "Heat pumps, high-efficiency furnaces & AC",
      program: "Energy Efficient Home Improvement Credit (25C)",
      amount: null,
      eligibility: `Historically ${FEDERAL_25C.ratePct}% of qualifying equipment cost, up to annual caps (up to ${usd(FEDERAL_25C.capFurnaceAcUsd)} for a qualifying furnace or AC; up to ${usd(FEDERAL_25C.capHeatPumpUsd)} for a qualifying heat pump).`,
      incomeRestriction: null,
      status: "expired",
      effectiveDate: FEDERAL_25C.effectiveDate,
      expirationDate: FEDERAL_25C.expirationDate,
      lastVerified: "July 2026",
      source: {
        label: "IRS — Energy Efficient Home Improvement Credit (25C)",
        url: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
      },
      notes: `Expired for equipment placed in service after ${FEDERAL_25C_EXPIRATION_LABEL} (terminated early by the One Big Beautiful Bill Act, 2025). It is NOT available for 2026 installations. Equipment installed on or before ${FEDERAL_25C_EXPIRATION_LABEL} may still be claimed on your 2025 federal return (IRS Form 5695) — confirm with a tax professional.`,
    },
    {
      id: "xcel-heat-pump",
      provider: "Xcel Energy",
      providerType: "electric-utility",
      equipment: "Air-source / cold-climate heat pump",
      program: "Residential heat pump rebate",
      amount: null,
      eligibility: "Qualifying efficiency tiers; rebate typically scales with efficiency.",
      incomeRestriction: "Income-qualified households may receive enhanced amounts.",
      status: "active",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: { label: "Xcel Energy — Programs & Rebates", url: "https://www.xcelenergy.com/programs_and_rebates" },
      notes: "Program is offered; current amount not verified from the primary source in this review — confirm on Xcel's official rebate page.",
    },
    {
      id: "xcel-central-ac",
      provider: "Xcel Energy",
      providerType: "electric-utility",
      equipment: "Central air conditioner",
      program: "Residential cooling rebate",
      amount: null,
      eligibility: "Qualifying SEER2 efficiency tiers.",
      incomeRestriction: null,
      status: "active",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: { label: "Xcel Energy — Programs & Rebates", url: "https://www.xcelenergy.com/programs_and_rebates" },
      notes: "Program is offered; current amount not verified from the primary source in this review — confirm on Xcel's official rebate page.",
    },
    {
      id: "xcel-thermostat",
      provider: "Xcel Energy",
      providerType: "electric-utility",
      equipment: "Smart thermostat",
      program: "Smart thermostat rebate",
      amount: null,
      eligibility: "Qualifying Wi-Fi / smart thermostats.",
      incomeRestriction: null,
      status: "active",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: { label: "Xcel Energy — Programs & Rebates", url: "https://www.xcelenergy.com/programs_and_rebates" },
      notes: "Program is offered; current amount not verified from the primary source in this review — confirm on Xcel's official rebate page.",
    },
    {
      id: "centerpoint-furnace",
      provider: "CenterPoint Energy",
      providerType: "gas-utility",
      equipment: "High-efficiency gas furnace (95%+ AFUE)",
      program: "Residential furnace rebate",
      amount: null,
      eligibility: "Qualifying 95%+ AFUE gas furnaces.",
      incomeRestriction: "Income-qualified households may receive enhanced amounts.",
      status: "active",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: {
        label: "CenterPoint Energy — Rebates",
        url: "https://www.centerpointenergy.com/en-us/residential/save-energy-money/rebates",
      },
      notes: "Program is offered; current amount not verified from the primary source in this review — confirm on CenterPoint's official rebate page.",
    },
    {
      id: "centerpoint-dual-fuel",
      provider: "CenterPoint Energy",
      providerType: "gas-utility",
      equipment: "Dual-fuel heat pump (with gas furnace)",
      program: "Dual-fuel heat pump rebate",
      amount: null,
      eligibility: "Heat pump paired with a qualifying high-efficiency gas furnace.",
      incomeRestriction: null,
      status: "active",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: {
        label: "CenterPoint Energy — Rebates",
        url: "https://www.centerpointenergy.com/en-us/residential/save-energy-money/rebates",
      },
      notes: "Program is offered; current amount not verified from the primary source in this review — confirm on CenterPoint's official rebate page.",
    },
    {
      id: "mn-hear",
      provider: "Minnesota Dept. of Commerce",
      providerType: "state",
      equipment: "Heat pumps & efficiency upgrades (income-qualified)",
      program: "Home Energy Rebates (HEAR / HOMES)",
      amount: null,
      eligibility: "Federally funded, state-administered; income-qualified households.",
      incomeRestriction: "Income-qualified; larger amounts for lower-income households.",
      status: "pending",
      effectiveDate: null,
      expirationDate: null,
      lastVerified: "July 2026",
      source: { label: "Minnesota Dept. of Commerce — Energy programs", url: "https://mn.gov/commerce/energy/" },
      notes:
        "Not yet launched in Minnesota as of last verification (July 2026); no application date announced. Do not count on this program until the state opens applications — check the Department of Commerce for the official launch.",
    },
  ],
};

export function getRebateDataset(): Dataset<RebateProgramRow> {
  return rebateDataset;
}
