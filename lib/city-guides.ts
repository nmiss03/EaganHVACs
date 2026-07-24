import type { IconName } from "@/components/ui/Icon";
import { getLocation } from "@/lib/content";

/**
 * Data layer for the reusable City Guide system that powers
 * /locations/[slug]/best-hvac-companies.
 *
 * The guide is an honest, educational "how to choose an HVAC company"
 * framework — NOT a fabricated "top 10 best companies" listicle. We do not
 * rank companies or invent reviews. Shared educational content (evaluation
 * criteria, red flags, the comparison worksheet, quote-comparison guidance,
 * and Minnesota-wide considerations) lives here as exported constants because
 * that advice is genuinely non-city-specific. The per-city `CityGuide` fields
 * (intro, localNotes, cityFaqs) keep every page unique.
 */

export interface CityGuideFaq {
  question: string;
  answer: string;
}

export interface CityLocalNote {
  icon: IconName;
  title: string;
  body: string;
}

export interface CityGuide {
  /** MUST equal a slug in `locations` (lib/content.ts). */
  slug: string;
  /** Human-readable "last updated" label, e.g. "July 2026". */
  updated: string;
  /** Machine-readable date for Article schema (ISO). */
  dateModified: string;
  /** Estimated reading time in minutes. */
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Unique-per-city hero intro paragraphs. */
  heroIntro: string[];
  /** Unique-per-city lead paragraphs for the "why it matters" section. */
  intro: string[];
  /** City-specific notes: climate, housing stock, permits, utilities. */
  localNotes: CityLocalNote[];
  /** 3–4 unique FAQs that mention the city by name. */
  cityFaqs: CityGuideFaq[];
}

/* ------------------------------------------------------------------ */
/*  Shared educational content (identical, and correct, for every city) */
/* ------------------------------------------------------------------ */

/** Why the installer — not just the equipment — decides how a system performs. */
export const WHY_SELECTION_MATTERS: string[] = [
  "It is tempting to shop for a furnace or air conditioner the way you'd shop for an appliance — pick a good brand, find the lowest price, done. But HVAC is not a product you buy; it's a system that gets built into your home. The same equipment can last five years or twenty, and run near its rated efficiency or well below it, depending almost entirely on who installs it and how carefully.",
  "Industry research has long pointed to installation quality — not brand — as the biggest variable in how a system performs. Improper sizing, sloppy ductwork, a wrong refrigerant charge, or a skipped commissioning step can quietly rob a system of a large share of its rated efficiency and shorten its life, and studies have identified poor installation as a leading contributor to early equipment failure. The comparison, then, is really about the company: their sizing method, their crews, their warranty, and how they treat you after the check clears.",
  "That is why this guide teaches you how to evaluate companies rather than handing you a ranked list. We don't rate or rank contractors, and we'd be suspicious of any site that claims to — the right company depends on your home, your budget, and the quotes in front of you. Use the criteria, worksheet, and checklists below to run your own fair comparison.",
];

export interface EvaluationCriterion {
  icon: IconName;
  title: string;
  description: string;
}

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    icon: "shield",
    title: "Licensing & insurance",
    description:
      "Confirm the company holds a current Minnesota contractor's license and carries both liability insurance and workers' compensation. Ask for the license number and verify it — legitimate companies share it without hesitation, and unlicensed work can void your homeowner's insurance and equipment warranty.",
  },
  {
    icon: "gauge",
    title: "Load calculation, not rule-of-thumb sizing",
    description:
      "The right size depends on your home's square footage, insulation, windows, and layout — not a guess based on the old unit. Ask whether they perform a Manual J load calculation. Oversized systems short-cycle, cost more, and leave rooms uncomfortable for the next 15+ years.",
  },
  {
    icon: "wrench",
    title: "Installation quality",
    description:
      "How a system is installed determines how long it lasts and how efficiently it runs. Ask who does the work (in-house crews vs. subcontractors), how they handle ductwork and refrigerant charge, and whether they commission and test the system before leaving.",
  },
  {
    icon: "badgeCheck",
    title: "Warranty terms — labor vs. parts",
    description:
      "The manufacturer's parts warranty is only half the story. The labor warranty is what the company itself stands behind, and it varies enormously — from 90 days to 10 years. A long labor warranty signals a company that expects its own installs to hold up.",
  },
  {
    icon: "dollar",
    title: "Financing & payment terms",
    description:
      "For a replacement, ask what financing is offered and what it truly costs — the promotional rate, the term, and any deferred-interest catch. Be wary of any company that demands a large cash deposit upfront; a modest deposit with the balance on completion is normal.",
  },
  {
    icon: "clipboard",
    title: "Permits & inspections",
    description:
      "Furnace and AC replacements require a mechanical permit and an inspection in most Minnesota cities. A reputable company pulls the permit in its own name — never asks you to. Permits protect you at resale and confirm the work met code.",
  },
  {
    icon: "phoneCall",
    title: "Post-install support & maintenance",
    description:
      "The relationship shouldn't end when the truck leaves. Ask what the first year looks like if something's wrong, who registers the manufacturer warranty, and whether they offer a maintenance plan — and exactly what it includes.",
  },
];

/** Explanatory copy shown above the fillable comparison worksheet. */
export const COMPARISON_INTRO: string[] = [
  "We don't rank HVAC companies, and this table isn't a scoreboard — it's a worksheet you fill in yourself. Get two or three quotes, then use the blank rows below to capture the same details from each company side by side so you're comparing like for like instead of just comparing bottom-line prices.",
  "Verify every offering directly with each company — don't assume. Print this page or copy the grid, and jot down what you learn on each call or visit.",
];

export const COMPARISON_COLUMNS: string[] = [
  "Contractor",
  "Services offered",
  "Emergency service",
  "Financing",
  "Warranty",
  "Notes",
];

export const COMPARISON_ROW_LABELS: string[] = [
  "Contractor 1",
  "Contractor 2",
  "Contractor 3",
];

/** How to compare quotes apples-to-apples. */
export const QUOTE_COMPARISON_INTRO: string[] = [
  "Two quotes with a $2,000 gap can be identical value or worlds apart — the total price tells you almost nothing on its own. Before you compare numbers, make each quote describe the same job. A written, itemized quote should give you everything you need to line them up:",
];

export const QUOTE_COMPARISON_POINTS: string[] = [
  "Equipment model numbers — so you can confirm each quote is for comparable equipment, not a premium unit vs. a builder-grade one",
  "Efficiency ratings (AFUE for furnaces, SEER2 for AC) — higher costs more upfront but lowers monthly bills and may unlock rebates",
  "Sizing method — a Manual J load calculation, not a guess based on the old system",
  "Full scope of work — ductwork modifications, new line sets, thermostat, condensate handling, and haul-away of the old equipment",
  "Permit — is it included and pulled by the contractor?",
  "Warranty — both the manufacturer's parts coverage and the company's own labor warranty, in writing",
  "Rebates and who files them — which specific models qualify, and whether the contractor handles the paperwork",
];

export const QUOTE_COMPARISON_OUTRO =
  "Once all three quotes describe the same scope, a lower price is meaningful. A quote that's cheaper because it skips the permit, reuses undersized ductwork, or carries a 90-day labor warranty isn't actually cheaper — it just moved the cost to later.";

export interface RedFlag {
  flag: string;
  why: string;
}

export const RED_FLAGS: RedFlag[] = [
  {
    flag: "Quotes a replacement without inspecting your home",
    why: "Proper sizing requires a site visit and a load calculation. A price quoted over the phone or from a photo is a guess — and usually an oversized one.",
  },
  {
    flag: "Pressure tactics and \"today-only\" pricing",
    why: "Legitimate pricing survives a night of thought. A discount that vanishes if you don't sign on the spot is a sales tactic, not a deal.",
  },
  {
    flag: "Won't pull a permit — or says you don't need one",
    why: "Replacements require a permit and inspection in most Minnesota cities. Skipping it can bite you at resale and with your insurer, and hides whether the work met code.",
  },
  {
    flag: "Demands a large cash deposit upfront",
    why: "A modest deposit is normal; a demand for most of the cost in cash before any work is a warning sign. Reputable companies bill the balance on completion.",
  },
  {
    flag: "No written, itemized quote",
    why: "If it isn't in writing with model numbers, scope, and warranty spelled out, you can't compare it fairly or hold anyone to it. A number on the back of a card isn't a quote.",
  },
  {
    flag: "A price dramatically below everyone else",
    why: "When one bid is far under the rest, look for what's missing — a smaller or lower-efficiency unit, no permit, a short labor warranty, or reused ductwork. Cheap and comparable are rarely the same quote.",
  },
  {
    flag: "No license number or proof of insurance",
    why: "If a company won't put its Minnesota license number on the quote or show proof of insurance, walk away. Unlicensed, uninsured work leaves you exposed if something goes wrong.",
  },
];

export interface ChecklistGroup {
  heading: string;
  items: string[];
}

/** Printable contractor-interview checklist. */
export const INTERVIEW_CHECKLIST: ChecklistGroup[] = [
  {
    heading: "Credentials & protection",
    items: [
      "Are you licensed for HVAC work in Minnesota? What's the license number?",
      "Are you insured and bonded, and can you show proof?",
      "Who does the installation — your own crews or subcontractors?",
      "Do you pull the permit, and is the inspection included?",
    ],
  },
  {
    heading: "The quote",
    items: [
      "Is the quote itemized with equipment model numbers, labor, permit, and disposal?",
      "How long is the quote valid?",
      "What exactly is not included?",
      "What financing is available, and what does it truly cost over the term?",
    ],
  },
  {
    heading: "Sizing & installation",
    items: [
      "Did you perform a Manual J load calculation, or size by square footage?",
      "Why this equipment size and efficiency for my home specifically?",
      "Will you inspect and address my ductwork, or just swap the equipment?",
      "How do you verify the refrigerant charge and commission the system?",
    ],
  },
  {
    heading: "Warranty & aftercare",
    items: [
      "What's the labor warranty — not just the manufacturer's parts warranty?",
      "Who registers the equipment warranty, you or me?",
      "What does the first year of service look like if something's wrong?",
      "Which rebates does this equipment qualify for, and who files them?",
    ],
  },
];

/** Minnesota-wide considerations (shared across every MN city guide). */
export const MINNESOTA_CONSIDERATIONS_INTRO: string[] = [
  "Minnesota is one of the most demanding HVAC climates in the country — long sub-zero stretches in winter, humid 90°F days in summer, and a system that rarely gets a season off. A company that installs here every week thinks about the following; make sure yours does too.",
];

export interface MinnesotaConsideration {
  title: string;
  body: string;
}

export const MINNESOTA_CONSIDERATIONS: MinnesotaConsideration[] = [
  {
    title: "Cold-climate sizing",
    body: "Heating equipment should be sized to your local design temperature, not padded \"just in case.\" An oversized furnace short-cycles, wears faster, and heats unevenly. Ask which design temperature the load calculation used.",
  },
  {
    title: "Heat pumps & dual-fuel",
    body: "Modern cold-climate heat pumps heat efficiently well below zero, and many Minnesota homes pair one with a gas furnace in a dual-fuel setup — the heat pump handles most of the season and the furnace takes over on the coldest days. If a company won't discuss it, that's worth noting.",
  },
  {
    title: "Furnace efficiency & venting",
    body: "High-efficiency (95%+ AFUE) condensing furnaces vent through sidewall PVC that can clog with snow and ice. Sizing, venting routes, and combustion-air supply all matter for both safety and reliability through a Minnesota winter.",
  },
  {
    title: "Indoor air quality",
    body: "Because homes here stay sealed for months, winter dryness and summer humidity are real comfort issues. Ask whether whole-home humidification, filtration, or ventilation should be part of the plan rather than an afterthought.",
  },
  {
    title: "Rebates & tax credits",
    body: "Xcel Energy (electric) and CenterPoint Energy (gas) offer rebates on qualifying high-efficiency equipment, with the largest utility incentives going to heat pumps. Note that the federal Energy Efficient Home Improvement Credit (25C) expired at the end of 2025 and is not available for 2026 installs. Program amounts change often, so verify current amounts with your utility and confirm which specific models qualify.",
  },
];

/* ------------------------------------------------------------------ */
/*  Per-city guide data                                                */
/* ------------------------------------------------------------------ */

export const cityGuides: readonly CityGuide[] = [
  {
    slug: "eagan",
    updated: "July 2026",
    dateModified: "2026-07-01",
    readMinutes: 9,
    metaTitle: "How to Choose an HVAC Company in Eagan, MN (2026 Guide)",
    metaDescription:
      "A homeowner's guide to choosing an HVAC company in Eagan, MN. Learn what to evaluate, how to compare quotes fairly, the red flags to avoid, and questions to ask — plus a printable checklist and comparison worksheet.",
    h1: "How to Choose an HVAC Company in Eagan, MN",
    heroIntro: [
      "Hiring the right company for a furnace or AC replacement in Eagan is a bigger decision than the equipment itself — the quality of the install determines how long your system lasts and how efficiently it runs for the next 15 to 20 years. This guide walks you through how to evaluate and compare local companies honestly, without relying on someone else's \"best of\" list.",
      "We're a homeowner-education platform, not an HVAC contractor, so we have no company to sell you. Instead, use the criteria, worksheet, and checklists below to run your own fair comparison and hire with confidence.",
    ],
    intro: [
      "Eagan's housing mix — from the established homes around Cedar Grove and Wescott to newer builds near Lexington South and Thomas Lake — means there's no one-size-fits-all system, and no single \"best\" company for every home. The right choice depends on your house, your budget, and the specific quotes in front of you.",
    ],
    localNotes: [
      {
        icon: "home",
        title: "Aging housing stock",
        body: "Many Eagan homes built in the 1980s and '90s are now reaching the age where original furnaces and air conditioners need replacement. That makes proper load calculation especially important — decades of siding, window, and insulation upgrades mean the old unit's size is often no longer the right size.",
      },
      {
        icon: "clipboard",
        title: "Permits go through the City of Eagan",
        body: "Furnace and AC replacements require a mechanical permit and inspection through the City of Eagan's building inspections division. A reputable contractor pulls this permit in its own name and schedules the inspection — you should never be asked to pull it yourself.",
      },
      {
        icon: "bolt",
        title: "Xcel Energy & CenterPoint utilities",
        body: "Most Eagan homes are served by Xcel Energy for electricity and CenterPoint Energy for natural gas. Both utilities offer rebates on qualifying high-efficiency equipment — ask each company which specific models qualify and who files the paperwork, and verify current rebate amounts before you buy.",
      },
    ],
    cityFaqs: [
      {
        question: "Do I need a permit to replace a furnace or AC in Eagan?",
        answer:
          "Yes. Furnace and air conditioner replacements require a mechanical permit and an inspection through the City of Eagan. A licensed contractor pulls the permit in its own name and schedules the inspection as part of the job — if a company tells you no permit is needed, treat that as a red flag.",
      },
      {
        question: "How many HVAC quotes should I get in Eagan?",
        answer:
          "For a replacement, three is the sweet spot — enough to see the price range and different approaches without dragging out the process. Use the comparison worksheet on this page to capture the same details from each Eagan company so you're comparing like for like.",
      },
      {
        question: "Which utilities serve Eagan homes, and do they offer HVAC rebates?",
        answer:
          "Most Eagan homes use Xcel Energy for electricity and CenterPoint Energy for natural gas. Both offer rebates on qualifying high-efficiency furnaces, air conditioners, heat pumps, and smart thermostats. Rebate amounts change each program year, so ask your contractor which models qualify and verify current amounts with the utility.",
      },
      {
        question: "Are heat pumps a good choice for Eagan's climate?",
        answer:
          "They can be. Modern cold-climate heat pumps heat efficiently well below zero, and many Eagan homeowners pair one with a gas furnace in a dual-fuel setup so the heat pump handles most of the season and the furnace covers the coldest days. Heat pumps also currently draw the largest combined rebates and tax credits — worth asking any company you interview to price out.",
      },
    ],
  },
];

export function getCityGuide(slug: string): CityGuide | undefined {
  return cityGuides.find((g) => g.slug === slug);
}

/** Guides paired with their location record, for listing/wiring. */
export function getCityGuideWithLocation(slug: string) {
  const guide = getCityGuide(slug);
  if (!guide) return undefined;
  const location = getLocation(guide.slug);
  if (!location) return undefined;
  return { guide, location };
}
