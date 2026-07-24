/**
 * Source of truth for the free "Minnesota HVAC Buyer's Kit" lead magnet.
 * Shared by the on-site kit page and the welcome email so they never drift.
 */

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
  { label: "New furnace", range: "$4,000 – $9,000" },
  { label: "Central air conditioner", range: "$4,500 – $9,500" },
  { label: "Furnace + AC together", range: "$8,000 – $16,500" },
  { label: "Cold-climate heat pump", range: "$8,000 – $18,000" },
];

/** Minnesota rebate & tax-credit cheat sheet. Programs, not dollar amounts. */
export const kitRebates: { program: string; covers: string }[] = [
  {
    program: "Xcel Energy (electric)",
    covers: "Rebates on qualifying central AC, air-source & cold-climate heat pumps, and smart thermostats.",
  },
  {
    program: "CenterPoint Energy (gas)",
    covers: "Rebates on qualifying high-efficiency (95%+ AFUE) furnaces and boilers.",
  },
  {
    program: "Federal tax credit (25C)",
    covers: "30% of qualifying equipment cost, up to annual caps — heat pumps have the highest cap (up to $2,000).",
  },
];
