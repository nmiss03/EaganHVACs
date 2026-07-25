/**
 * Source of truth for the free "Minnesota HVAC Buyer's Kit" lead magnet.
 * Shared by the on-site kit page and the welcome email so they never drift.
 * All factual figures (prices, efficiency) come from lib/hvac-data.
 */

import {
  COST_RANGES,
  FURNACE_AFUE,
  FEDERAL_25C_EXPIRATION_LABEL,
  usdRange,
  afuePlus,
} from "@/lib/hvac-data";

/** A comparable, trustworthy replacement quote should include every one of these. */
export const kitChecklist: string[] = [
  "Specific equipment make & model numbers",
  "Efficiency rating stated (AFUE for the furnace, SEER2 for the AC)",
  "A load calculation or sizing justification (Manual J)",
  "The required Minnesota permit — included and pulled by the contractor",
  "Labor warranty length, stated separately from the parts warranty",
  "Manufacturer parts warranty, and registration so you get the full term",
  "A line-item breakdown (equipment vs. labor)",
  "Old-equipment removal & disposal",
  "The complete price in writing",
  "A timeline and start date",
];

/** The exact questions to ask before signing anything. */
export const kitQuestions: string[] = [
  "What are the exact make and model numbers of the equipment you're quoting?",
  "What's the efficiency rating — AFUE for the furnace, SEER2 for the AC?",
  "Did you run a load calculation (Manual J), or how did you size this for my home?",
  "Is the required Minnesota permit included in this price, and will you pull it?",
  "How long is your labor warranty, separate from the manufacturer's parts warranty?",
  "What's the manufacturer's parts warranty, and will you register it for me?",
  "Can you give me an itemized breakdown of equipment versus labor?",
  "Does the price include removing and disposing of my old system?",
  "Are you licensed and insured in Minnesota, and can I see proof?",
  "Which rebates and tax credits apply, and who files the rebate paperwork?",
  "Can I get the complete quote in writing before I decide?",
  "What's the expected timeline and start date?",
];

/** Twin Cities installed price ranges, before rebates. Mirrors the cost tools. */
export const kitPrices: { label: string; range: string }[] = [
  { label: "New furnace", range: usdRange(COST_RANGES.furnace, { sep: " – " }) },
  { label: "Central air conditioner", range: usdRange(COST_RANGES.ac, { sep: " – " }) },
  { label: "Furnace + AC together", range: usdRange(COST_RANGES.furnaceAndAc, { sep: " – " }) },
  { label: "Cold-climate heat pump", range: usdRange(COST_RANGES.heatPump, { sep: " – " }) },
];

/** Minnesota rebate & tax-credit cheat sheet. Programs, not dollar amounts. */
export const kitRebates: { program: string; covers: string }[] = [
  {
    program: "Xcel Energy (electric)",
    covers: "Rebates on qualifying central AC, air-source & cold-climate heat pumps, and smart thermostats.",
  },
  {
    program: "CenterPoint Energy (gas)",
    covers: `Rebates on qualifying high-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) furnaces and boilers.`,
  },
  {
    program: "Federal tax credit (25C) — EXPIRED end of 2025",
    covers: `No longer available for equipment installed in 2026 or later (ended ${FEDERAL_25C_EXPIRATION_LABEL}). Only claimable for qualifying equipment installed on or before that date, on your 2025 return.`,
  },
];
