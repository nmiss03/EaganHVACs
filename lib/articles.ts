/**
 * Resource-center guides. Each article is genuinely useful, Minnesota-
 * specific homeowner content — the editorial template that keeps future
 * additions consistent and non-duplicative.
 *
 * All factual figures (costs, efficiency, incentives) come from the canonical
 * lib/hvac-data module so article prose can never contradict the calculators.
 */

import {
  COST_RANGES,
  LIFESPANS,
  FURNACE_AFUE,
  AC_SEER2,
  FEDERAL_25C,
  FEDERAL_25C_EXPIRATION_LABEL,
  FEDERAL_25C_EXPIRATION_YEAR,
  FURNACE_REPAIR_RANGE,
  usd,
  usdRange,
  yearsRange,
  afuePlus,
} from "@/lib/hvac-data";

/** A real, wired-in content image (served from /public/site-images). */
export interface ArticleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ArticleSection {
  heading: string;
  /** Optional short label for the on-page table of contents (defaults to heading). */
  tocLabel?: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  /** Highlighted advisory box. */
  callout?: { tone: "tip" | "warning" | "note"; title?: string; text: string };
  /** Two-column pros & cons block. */
  prosCons?: { pros: string[]; cons: string[] };
  /**
   * A real image (`src` set) or a placeholder container (`label` only, ready
   * for future photography).
   */
  image?: { label?: string } & Partial<ArticleImage>;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  readMinutes: number;
  /** Optional lead image shown at the top of the article body. */
  leadImage?: ArticleImage;
  intro: string[];
  /** Optional TL;DR shown before the body. */
  keyTakeaways?: string[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  /** Slugs of related articles for cross-linking. */
  related: string[];
  /** Service slugs this article should funnel toward. */
  relatedServices: string[];
  /** Tool slugs this article naturally pairs with (same intent, deeper). */
  relatedTools?: string[];
}

export const articles: readonly Article[] = [
  {
    slug: "hvac-cost-guide-minnesota",
    category: "Cost Guides",
    title: "What HVAC Repairs & Replacements Really Cost in Minnesota",
    metaTitle: "Minnesota HVAC Cost Guide | Repair & Replacement Prices",
    metaDescription:
      "Typical costs for furnace repair, AC repair, and full system replacement in the Twin Cities — what drives price, and how to compare quotes fairly.",
    updated: "July 2026",
    readMinutes: 7,
    leadImage: {
      src: "/site-images/minnesota-home-winter.webp",
      alt: "A modern two-story Minnesota home in the snow with an outdoor heat pump / condenser unit beside the house.",
      width: 1600,
      height: 1195,
      caption: "HVAC costs in Minnesota are shaped by our long, cold heating season — plan for the climate, not a national average.",
    },
    intro: [
      "The most common question homeowners ask — and the one most HVAC websites dodge — is \"what will this cost me?\" Exact prices depend on your home and equipment, but the ranges below reflect what Twin Cities homeowners typically pay, so you can spot a fair quote and a suspicious one.",
      "One important note: these are planning ranges, not promises. The only real number is a written quote after a technician has seen your system — which is exactly why comparing two or three quotes matters.",
    ],
    sections: [
      {
        heading: "Typical furnace repair costs",
        paragraphs: [
          `Most furnace repairs fall between ${usd(FURNACE_REPAIR_RANGE[0])} and ${usd(FURNACE_REPAIR_RANGE[1])}. The part matters less than you'd think — labor, diagnosis, and availability drive much of the price.`,
        ],
        table: {
          headers: ["Repair", "Typical range"],
          rows: [
            ["Flame sensor cleaning/replacement", "$80 – $250"],
            ["Hot surface ignitor", "$150 – $350"],
            ["Blower motor", "$400 – $1,500"],
            ["Control board", "$400 – $1,200"],
            ["Draft inducer motor", "$300 – $900"],
            ["Heat exchanger (often replace instead)", "$1,500+"],
          ],
        },
      },
      {
        heading: "Typical AC repair costs",
        table: {
          headers: ["Repair", "Typical range"],
          rows: [
            ["Capacitor", "$150 – $400"],
            ["Contactor", "$150 – $400"],
            ["Refrigerant leak find & recharge", "$400 – $1,500"],
            ["Condenser fan motor", "$300 – $700"],
            ["Evaporator coil", "$1,000 – $2,500"],
            ["Compressor (often replace instead)", "$1,500 – $3,000"],
          ],
        },
      },
      {
        heading: "Full replacement costs",
        paragraphs: [
          `In the Twin Cities, a new furnace typically runs ${usdRange(COST_RANGES.furnace)} installed, central AC ${usdRange(COST_RANGES.ac)}, and a cold-climate heat pump ${usdRange(COST_RANGES.heatPump)} before rebates. You can narrow these down for your own home with our [HVAC cost estimator](/tools/hvac-cost-estimator). High-efficiency equipment sits at the top of each range but earns [Minnesota utility rebates](/resources/minnesota-hvac-rebates) and lower bills every month.`,
          "Installation quality moves these numbers more than brand does. A properly sized, properly installed mid-tier system outperforms a premium unit installed badly.",
        ],
      },
      {
        heading: "What makes your price higher or lower",
        list: [
          "System size (a 3,000 sq ft two-story needs more capacity than a rambler)",
          `Efficiency rating (${afuePlus(FURNACE_AFUE.highEfficiency)} furnaces and ${AC_SEER2.aboveStandardThreshold}+ SEER2 ACs cost more upfront)`,
          "Ductwork condition — modifications add cost",
          "Accessibility: tight utility rooms and finished basements slow installs",
          "Season — emergency winter replacements price higher than shoulder-season ones",
          `Rebates: Xcel and CenterPoint utility rebates can offset hundreds to thousands (the federal 25C credit expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR})`,
        ],
      },
      {
        heading: "How to compare quotes fairly",
        paragraphs: [
          "Never compare bottom-line prices alone. Make sure each quote lists equipment model numbers, efficiency ratings, labor warranty, whether permits are included, and what happens with your old equipment. A quote that's $1,500 cheaper but skips the permit and offers a 90-day labor warranty isn't actually cheaper.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do HVAC quotes vary so much between companies?",
        answer:
          "Overhead, warranty length, equipment tier, and how carefully the job was scoped all differ. A big spread usually means the quotes aren't for the same scope — compare line items, not just totals.",
      },
      {
        question: "Is it cheaper to replace furnace and AC together?",
        answer:
          "Usually, yes — shared labor and matched-system efficiency mean replacing both at once typically costs 10–20% less than doing them separately within a few years of each other.",
      },
      {
        question: "Do contractors charge for replacement quotes?",
        answer:
          "Reputable contractors quote replacements for free. Diagnostic visits for repairs usually carry a fee that's often credited toward the work.",
      },
    ],
    related: ["twin-cities-hvac-cost-report-2026", "questions-to-ask-hvac-contractor", "minnesota-hvac-rebates"],
    relatedServices: ["installation-replacement", "furnace-repair", "ac-repair"],
    relatedTools: ["hvac-cost-estimator", "repair-or-replace"],
  },
  {
    slug: "questions-to-ask-hvac-contractor",
    category: "Hiring & Quotes",
    title: "15 Questions to Ask an HVAC Contractor Before You Hire",
    metaTitle: "Questions to Ask an HVAC Contractor | Hiring Checklist",
    metaDescription:
      "The 15 questions that separate great HVAC contractors from the rest — licensing, quotes, sizing, warranties — plus the red flags that should end the conversation.",
    updated: "July 2026",
    readMinutes: 6,
    intro: [
      "The difference between a great HVAC experience and an expensive mistake usually comes down to questions asked before any work starts. Print this list, or keep it open during your quote appointments — good contractors will happily answer every one.",
      "For a step-by-step framework that puts these questions in context, our [guide to choosing an HVAC company](/locations/eagan/best-hvac-companies) walks through how to evaluate and compare contractors side by side.",
    ],
    sections: [
      {
        heading: "Licensing and protection",
        list: [
          "1. Are you licensed for HVAC work in Minnesota, and can I see the license number?",
          "2. Are you insured and bonded — and will you provide proof?",
          "3. Will this job require a permit, and do you pull it (not me)?",
        ],
      },
      {
        heading: "About the quote",
        list: [
          "4. Is this quote itemized — equipment model numbers, labor, permit, disposal?",
          "5. How long is the quote valid?",
          "6. What exactly is not included?",
          "7. Are there financing options, and what's the true cost with financing?",
        ],
      },
      {
        heading: "About the work (replacements)",
        list: [
          "8. Did you perform a Manual J load calculation, or size by square footage?",
          "9. Why this equipment size and efficiency for my home specifically?",
          "10. Will you inspect and address my ductwork, or just swap the box?",
          "11. Which rebates does this equipment qualify for, and who files them?",
        ],
      },
      {
        heading: "After the install",
        list: [
          "12. What's the labor warranty (not just the manufacturer's parts warranty)?",
          "13. Who registers the equipment warranty — you or me?",
          "14. What does the first year of service look like if something's wrong?",
          "15. Do you offer maintenance plans, and what do they actually include?",
        ],
      },
      {
        heading: "Red flags that should end the conversation",
        table: {
          headers: ["Red flag", "Why it matters"],
          rows: [
            ["Quote over the phone without seeing the system", "Serious sizing requires a site visit"],
            ["Pressure to sign today for a 'special price'", "Legitimate pricing survives a day of thought"],
            ["No license number on the quote or truck", "Unlicensed work voids insurance and permits"],
            ["'We don't need a permit'", "Permits protect you at resale and with insurance"],
            ["Sizing by square footage alone", "Skipping load calculation causes comfort problems for 15+ years"],
          ],
        },
      },
    ],
    faqs: [
      {
        question: "How many quotes should I get?",
        answer:
          "Three is the sweet spot for replacements — enough to see the price range and different approaches without dragging the process out. For simple repairs, one trusted diagnosis is often enough.",
      },
      {
        question: "Should I always pick the cheapest quote?",
        answer:
          "No — pick the best scope at a fair price. The cheapest quote often omits permits, skimps on warranty, or reuses undersized ductwork. Use the itemization to find why prices differ.",
      },
      {
        question: "How do I verify a Minnesota contractor's license?",
        answer:
          "Ask for the license number and check it with the Minnesota Department of Labor and Industry's license lookup. Reputable contractors volunteer this without hesitation.",
      },
    ],
    related: ["hvac-cost-guide-minnesota", "minnesota-hvac-rebates"],
    relatedServices: ["installation-replacement", "maintenance-tune-ups"],
    relatedTools: ["hvac-quote-analyzer", "hvac-cost-estimator"],
  },
  {
    slug: "minnesota-hvac-rebates",
    category: "Rebates & Incentives",
    title: "Minnesota HVAC Rebates & Tax Credits: What You Can Claim",
    metaTitle: "Minnesota HVAC Rebates & Tax Credits Guide",
    metaDescription:
      "Xcel Energy and CenterPoint Energy rebates for heat pumps and high-efficiency systems, the expired federal 25C credit, and Minnesota's pending state program — what homeowners can actually claim in 2026 and how to stack it.",
    updated: "July 2026",
    readMinutes: 5,
    intro: [
      `Minnesota homeowners leave real money on the table every year by not claiming HVAC incentives. Utility rebates from Xcel Energy and CenterPoint Energy can knock hundreds to a few thousand dollars off a high-efficiency upgrade — you can see how the pre-rebate numbers look with our [HVAC cost estimator](/tools/hvac-cost-estimator) — if you know what to claim and who files it. (One big change for 2026: the federal 25C tax credit expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR} — details below.)`,
      "Program amounts change yearly, so treat the figures below as a map of what exists and verify current amounts with your utility or contractor before buying. Not sure which ones apply to you? Our [Minnesota rebate checker](/tools/minnesota-hvac-rebate-checker) matches your utility and equipment to the programs you likely qualify for in about 20 seconds.",
    ],
    sections: [
      {
        heading: "Utility rebates (Xcel Energy & CenterPoint)",
        paragraphs: [
          "Both major Twin Cities utilities pay rebates on qualifying high-efficiency equipment. Electric rebates typically come from Xcel (AC, heat pumps, smart thermostats) and gas rebates from CenterPoint (furnaces, boilers). Typical categories:",
        ],
        list: [
          `High-efficiency furnaces (${afuePlus(FURNACE_AFUE.highEfficiency)}) — commonly $100–$500`,
          "High-efficiency central AC — commonly $100–$500",
          "Air-source and cold-climate heat pumps — commonly $500–$2,000+",
          "Smart thermostats — commonly $25–$75",
          "AC tune-up rebates in some program years",
        ],
      },
      {
        heading: `Federal tax credit (25C) — expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}`,
        paragraphs: [
          `**Important update:** the federal ${FEDERAL_25C.name} was ended early by 2025 legislation and is **no longer available for equipment placed in service after ${FEDERAL_25C_EXPIRATION_LABEL}**. Through ${FEDERAL_25C_EXPIRATION_YEAR} it covered ${FEDERAL_25C.ratePct}% of qualifying cost, capped at up to ${usd(FEDERAL_25C.capFurnaceAcUsd)} for a qualifying AC or furnace and up to ${usd(FEDERAL_25C.capHeatPumpUsd)} for a qualifying [cold-climate heat pump](/services/heat-pumps).`,
          "If you installed qualifying equipment on or before December 31, 2025, you may still claim it on your 2025 federal return (IRS Form 5695) — a tax professional can confirm. For any 2026 project, do not count on a federal credit; focus on the utility rebates above and the pending state program below. Our [rebate database](/minnesota-hvac-rebate-database) tracks the current status of each program with links to the official source.",
        ],
      },
      {
        heading: "The pending Minnesota state program (HEAR)",
        paragraphs: [
          "Minnesota is expected to launch federally funded Home Energy Rebates (often called HEAR) for income-qualified households, which would add incentives for heat pumps and efficiency upgrades. As of this writing the program has not opened to applications in Minnesota and no start date has been announced, so treat it as pending — don't factor it into a purchase until the Department of Commerce opens it. Check the [rebate database](/minnesota-hvac-rebate-database) for the latest verified status.",
        ],
      },
      {
        heading: "How to stack what's available",
        list: [
          "Combine an electric-utility rebate (Xcel) with a gas-utility rebate (CenterPoint) on a dual-fuel system",
          "Ask each contractor which specific model numbers qualify — 'high efficiency' isn't enough",
          "Confirm in writing who files the rebate paperwork (good contractors handle it)",
          "Keep the AHRI certificate and invoice for your records",
          "Income-qualified households may qualify for enhanced utility rebates and the pending state program — worth asking your utility",
        ],
      },
    ],
    faqs: [
      {
        question: "Do rebates apply to repairs?",
        answer:
          "Generally no — rebates target new high-efficiency equipment and sometimes tune-ups. Repairs don't qualify, which is one factor in repair-vs-replace math for older systems.",
      },
      {
        question: "Who files the rebate paperwork?",
        answer:
          `Usually the installing contractor files utility rebates on your behalf. The federal 25C credit — available only for equipment installed through the end of ${FEDERAL_25C_EXPIRATION_YEAR} — was claimed by the homeowner on their own federal return using IRS Form 5695. It is not available for 2026 installations.`,
      },
      {
        question: "Do heat pumps really get the biggest incentives?",
        answer:
          `Heat pumps still draw the largest utility rebates in Minnesota, which is a big part of why cold-climate heat pumps have surged here. Note that the federal credit that once added up to ${usd(FEDERAL_25C.capHeatPumpUsd)} expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}, so a 2026 heat pump relies on utility rebates (and the pending state program).`,
      },
    ],
    related: ["hvac-cost-guide-minnesota", "questions-to-ask-hvac-contractor"],
    relatedServices: ["heat-pumps", "installation-replacement", "thermostats"],
    relatedTools: ["minnesota-hvac-rebate-checker", "hvac-cost-estimator"],
  },
  // (remaining articles below)
  {
    slug: "minnesota-hvac-maintenance-calendar",
    category: "Maintenance",
    title: "The Minnesota HVAC Maintenance Calendar (Season by Season)",
    metaTitle: "Minnesota HVAC Maintenance Calendar | Seasonal Checklist",
    metaDescription:
      "A season-by-season HVAC maintenance checklist built for Minnesota's climate — what to do yourself, what to schedule, and when to do it.",
    updated: "July 2026",
    readMinutes: 5,
    leadImage: {
      src: "/site-images/replacing-furnace-filter.webp",
      alt: "A homeowner sliding a clean pleated air filter into a high-efficiency furnace.",
      width: 1500,
      height: 1120,
      caption: "Changing the furnace filter on schedule is the single easiest task on the Minnesota HVAC maintenance calendar.",
    },
    intro: [
      "Minnesota is one of the hardest climates in America on HVAC equipment: -20°F stretches in January, 95°F humidity in July, and a system that never really gets a season off. A little seasonal discipline plus a professional [seasonal tune-up](/services/maintenance-tune-ups) prevents most emergency breakdowns — here's the calendar we'd give any Twin Cities homeowner.",
    ],
    sections: [
      {
        heading: "Year-round (every 1–3 months)",
        list: [
          "Check your furnace filter monthly; replace 1-inch filters every 1–3 months, media filters every 6–12",
          "Keep supply and return vents unblocked by rugs and furniture",
          "Glance at the thermostat batteries twice a year if it isn't hardwired",
        ],
      },
      {
        heading: "Spring (April–May)",
        list: [
          "Schedule your AC tune-up before the first heat wave — appointment slots vanish in June",
          "Rinse the outdoor condenser coil gently with a hose; clear cottonwood fluff",
          "Trim vegetation to keep two feet of clearance around the outdoor unit",
          "Test the AC on the first 70°F day, not the first 90°F day",
        ],
      },
      {
        heading: "Summer (June–August)",
        list: [
          "Watch for ice on refrigerant lines — that's a service call, not a wait-and-see",
          "Check the condensate drain for clogs if you see water near the furnace",
          "Consider a dehumidifier if indoor humidity stays above 55%",
        ],
      },
      {
        heading: "Fall (September–October)",
        list: [
          "Schedule your furnace tune-up before the first freeze — this is the highest-value appointment of the year",
          "Replace the filter before heavy heating season",
          "Test heat on the first cool day; listen for new noises",
          "If you have a humidifier, replace the water panel and set it for winter",
        ],
      },
      {
        heading: "Winter (November–March)",
        list: [
          "Keep sidewall intake/exhaust PVC pipes clear of snow and ice after every storm — blocked vents are a leading cause of no-heat calls",
          "Never let the house drop below 55°F when traveling (frozen pipes cost far more than heat)",
          "If the furnace short cycles or the CO detector chirps, call same-day",
        ],
      },
    ],
    faqs: [
      {
        question: "Is annual professional maintenance actually necessary?",
        answer:
          "Yes — beyond catching failing parts early, most manufacturers require documented annual maintenance to keep parts warranties valid, and utilities sometimes rebate tune-ups.",
      },
      {
        question: "When is the cheapest time to schedule HVAC work?",
        answer:
          "Shoulder seasons — April–May and September–October. Contractors have availability, and you're not paying emergency-demand premiums or waiting days during a heat wave.",
      },
      {
        question: "Why does my furnace stop when it snows?",
        answer:
          "High-efficiency furnaces vent through sidewall PVC pipes that drifting snow can block, tripping a safety shutdown. Clearing the pipes often restores heat instantly — check this before calling.",
      },
    ],
    related: ["furnace-not-working-troubleshooting", "hvac-cost-guide-minnesota"],
    relatedServices: ["maintenance-tune-ups", "furnace-repair", "duct-cleaning"],
    relatedTools: ["system-lifespan"],
  },
  {
    slug: "furnace-not-working-troubleshooting",
    category: "Troubleshooting",
    title: "Furnace Not Working? 7 Safe Checks Before You Call",
    metaTitle: "Furnace Not Working | 7 Safe DIY Checks (Minnesota Guide)",
    metaDescription:
      "No heat? Run these 7 safe checks first — thermostat, filter, switches, snow-blocked vents — then know exactly when to stop and call a pro.",
    updated: "July 2026",
    readMinutes: 5,
    intro: [
      "A dead furnace on a January night is frightening, but a surprising share of no-heat calls end with a fix the homeowner could have done in five minutes. Run these checks in order — they're safe, free, and require no tools. Then know where the line is: anything beyond this list belongs to a licensed technician.",
      "Safety first: if you smell gas, leave the house immediately and call your gas utility from outside. Don't flip switches on the way out.",
    ],
    sections: [
      {
        heading: "The 7 checks, in order",
        list: [
          "1. Thermostat: set to HEAT (not cool/off), temperature above room temp, fresh batteries if battery-powered",
          "2. Furnace power switch: the light-switch-looking toggle on or near the furnace gets bumped more often than you'd think — make sure it's ON",
          "3. Breaker panel: look for a tripped furnace breaker; reset it once (if it trips again, stop and call)",
          "4. Filter: a fully clogged filter overheats the furnace and shuts it down; replace it and give the furnace 30 minutes",
          "5. Intake/exhaust pipes: outside, clear snow, ice, and frost from the white PVC pipes — the #1 Minnesota-specific cause of winter shutdowns",
          "6. Condensate: if you see water around a high-efficiency furnace, the drain may be clogged or the trap frozen — clear what you can safely reach",
          "7. Front panel: the blower door must be fully seated to release the safety switch — press it firmly closed",
        ],
      },
      {
        heading: "What the error light means",
        paragraphs: [
          "Most furnaces flash a status LED visible through a small window. A steady light usually means normal; patterned flashing is an error code keyed to a chart on the furnace door. Note the pattern before you call — telling the technician \"three flashes, pause, repeat\" can speed the diagnosis and sometimes the quote.",
        ],
      },
      {
        heading: "When to stop DIY and call",
        list: [
          "Any gas smell — leave first, call from outside",
          "Breaker trips a second time",
          "Furnace starts, then shuts down repeatedly (short cycling)",
          "The CO detector has gone off — ventilate and get out, then call",
          "You've done all seven checks and still have no heat",
        ],
        paragraphs: [
          "In sub-zero weather, no heat is an emergency — pipes can freeze within hours. Most Twin Cities HVAC companies run [24/7 emergency service](/services/emergency-hvac), and an after-hours call costs far less than a burst pipe. If your furnace is aging and no-heat calls are becoming routine, it may be time to [weigh repair against replacement](/tools/repair-or-replace).",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my furnace running but blowing cold air?",
        answer:
          "Often the thermostat fan is set to ON (circulating unheated air), the flame sensor is dirty, or the furnace overheated and locked out its burners. Set fan to AUTO and swap the filter first; if it persists, book a diagnostic.",
      },
      {
        question: "Is it safe to reset my furnace breaker?",
        answer:
          "Once, yes. If it trips again, something is genuinely wrong — repeated resets can damage equipment or worse. Leave it off and call.",
      },
      {
        question: "How fast can someone come for no heat?",
        answer:
          "For no-heat emergencies in winter, most Twin Cities HVAC companies offer same-day and 24/7 service — call a licensed local contractor directly and they'll prioritize getting a technician to you.",
      },
    ],
    related: ["furnace-repair-cost", "minnesota-hvac-maintenance-calendar", "hvac-cost-guide-minnesota"],
    relatedServices: ["furnace-repair", "emergency-hvac"],
    relatedTools: ["repair-or-replace", "system-lifespan", "hvac-cost-estimator"],
  },
  {
    slug: "furnace-replacement-cost",
    category: "Cost Guides",
    title: "Furnace Replacement Cost in Minnesota: What You'll Really Pay",
    metaTitle: "Furnace Replacement Cost Minnesota (2026) | Real Price Ranges",
    metaDescription:
      "What a new furnace really costs in the Twin Cities in 2026 — by efficiency and home size — plus the rebates that lower it and how to compare quotes fairly.",
    updated: "July 2026",
    readMinutes: 8,
    leadImage: {
      src: "/site-images/modern-furnace-utility-room.webp",
      alt: "A modern high-efficiency gas furnace installed in a utility room, with PVC intake/exhaust venting and insulated ductwork.",
      width: 1500,
      height: 1120,
      caption: "A modern high-efficiency furnace with sidewall PVC venting — the kind of installation a Twin Cities replacement typically produces.",
    },
    intro: [
      "A new furnace is one of the largest single purchases a Minnesota homeowner makes, and it almost always happens under pressure — usually the week the old one dies in January. The goal of this guide is to take the pressure off: to show you what a furnace replacement actually costs in the Twin Cities, what moves the price up or down, and how to tell a fair quote from a padded one.",
      "These are real planning ranges, not a sales pitch. The only exact number is a written quote after a contractor has seen your home — which is exactly why comparing two or three quotes is worth the effort. When you want a personalized figure in seconds, the [HVAC cost estimator](/tools/hvac-cost-estimator) turns these ranges into a number for your specific home.",
    ],
    keyTakeaways: [
      `Most Twin Cities furnace replacements run **${usdRange(COST_RANGES.furnace)}** installed, depending on efficiency and home size.`,
      `High-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) furnaces cost more up front but qualify for [Minnesota rebates and tax credits](/resources/minnesota-hvac-rebates) and lower your gas bill every winter.`,
      "The quality of the installation affects lifespan and efficiency as much as the brand — a great furnace installed poorly won't last.",
      "If your furnace is under ~15 years old, run the numbers before replacing — the [repair-or-replace tool](/tools/repair-or-replace) gives a quick, unbiased read.",
    ],
    sections: [
      {
        heading: "What a new furnace costs in the Twin Cities",
        tocLabel: "Cost ranges",
        paragraphs: [
          "Installed price — meaning equipment, labor, permit, and removal of the old unit — is what matters, not the sticker price of the furnace itself. Here's how the ranges typically break down by efficiency in the Minnesota market.",
        ],
        table: {
          headers: ["Furnace type", "Efficiency (AFUE)", "Typical installed range"],
          rows: [
            ["Standard efficiency", `${FURNACE_AFUE.standard}%`, "$4,000 – $6,000"],
            ["High efficiency", `${FURNACE_AFUE.highEfficiency}%+`, "$5,500 – $8,000"],
            ["Premium / modulating", "96–98%+", "$7,000 – $9,000+"],
          ],
        },
        callout: {
          tone: "note",
          title: "Why Minnesota leans high-efficiency",
          text: `With our long heating season, the monthly savings from a ${FURNACE_AFUE.highEfficiency}%+ furnace add up faster here than almost anywhere in the country — which is why high-efficiency models are the common recommendation for MN homes, and why the rebates exist.`,
        },
      },
      {
        heading: "What drives your price up or down",
        tocLabel: "Price factors",
        list: [
          "Efficiency rating (AFUE) — higher efficiency equipment costs more but lowers operating cost",
          "Furnace size (BTU) — correctly sized for your home via a load calculation, not a rule of thumb",
          "Single-stage vs. two-stage vs. modulating burners — more comfort and efficiency, higher cost",
          "Existing ductwork, gas line, and venting — modifications add labor",
          "Whether it's paired with a new AC or coil at the same time (often cheaper together)",
          "Emergency vs. planned timing — mid-winter no-heat replacements can carry a premium",
        ],
      },
      {
        heading: "Should you repair instead?",
        tocLabel: "Repair vs replace",
        paragraphs: [
          "Replacement isn't always the right call. A useful rule of thumb: if the furnace is under 15 years old and the repair costs less than about a third of a new system, repair usually wins. Past 15 years — or facing a cracked heat exchanger — replacement is typically the sounder investment.",
        ],
        callout: {
          tone: "tip",
          title: "Get an unbiased read in 30 seconds",
          text: "The [repair-or-replace calculator](/tools/repair-or-replace) applies the age-and-cost math for you, so you walk into quotes already knowing which direction makes financial sense.",
        },
      },
      {
        heading: "Rebates and tax credits that lower the cost",
        tocLabel: "Rebates",
        paragraphs: [
          `A high-efficiency furnace's higher price is partly offset by incentives. CenterPoint Energy offers rebates on qualifying high-efficiency gas furnaces. (The federal 25C credit that once applied to the most efficient models expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}, so for 2026 the savings come from utility rebates.) Amounts change, so verify current figures — our [Minnesota rebates guide](/resources/minnesota-hvac-rebates) and [rebate database](/minnesota-hvac-rebate-database) track what's available and who qualifies.`,
        ],
      },
      {
        heading: "Replace now, or wait?",
        tocLabel: "Now vs. wait",
        prosCons: {
          pros: [
            "Planned (off-season) replacements avoid the mid-winter emergency premium",
            "You have time to gather and compare multiple quotes",
            "A new high-efficiency system starts lowering your gas bill immediately",
            "You can capture current rebates before programs change",
          ],
          cons: [
            "Up-front cost is significant if the current furnace still works",
            "Financing means monthly payments (though often less than the energy savings)",
            "Prices and rebates can shift year to year in either direction",
          ],
        },
      },
      {
        heading: "How to compare furnace quotes fairly",
        tocLabel: "Compare quotes",
        paragraphs: [
          "The single biggest mistake is comparing a low number against a high number without checking what's inside each. Make the quotes apples-to-apples:",
        ],
        list: [
          "Same efficiency (AFUE) and comparable equipment tier on every quote",
          "A load calculation to justify the size — not just 'same size as the old one'",
          "Permit included (required in Minnesota) and who pulls it",
          "Written scope: venting, gas line, thermostat, and old-unit removal",
          "Labor warranty length, not just the manufacturer's parts warranty",
        ],
        callout: {
          tone: "warning",
          title: "A price far below the rest is a red flag",
          text: "When one bid is dramatically cheaper, look for what's missing — a smaller or lower-efficiency unit, no permit, reused parts, or a short labor warranty. Cheap and comparable are rarely the same quote.",
        },
      },
    ],
    faqs: [
      {
        question: "How much does a new furnace cost in Minnesota?",
        answer:
          `Most Twin Cities furnace replacements fall between ${usd(COST_RANGES.furnace[0])} and ${usd(COST_RANGES.furnace[1])} installed. Standard ${FURNACE_AFUE.standard}% AFUE units sit at the low end; high-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) modulating furnaces reach the top. Home size, ductwork, and installation complexity move you within that range.`,
      },
      {
        question: `Is a high-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) furnace worth it in Minnesota?`,
        answer:
          "For most Minnesota homes, yes. Our long heating season means the monthly savings recover the price difference faster than in warmer states, and high-efficiency models qualify for rebates and tax credits that narrow the up-front gap.",
      },
      {
        question: "How long does furnace installation take?",
        answer:
          "A straightforward furnace swap is usually a one-day job. Adding or modifying ductwork, venting, or a gas line — or installing a furnace and AC together — can extend it to a second day.",
      },
      {
        question: "Should I replace my furnace and AC at the same time?",
        answer:
          "If both are near end of life, replacing them together often saves on labor and ensures the two systems are matched for efficiency. If your AC is significantly newer, replacing just the furnace usually makes more sense.",
      },
    ],
    related: ["hvac-cost-guide-minnesota", "minnesota-hvac-rebates", "questions-to-ask-hvac-contractor"],
    relatedServices: ["installation-replacement", "furnace-repair"],
    relatedTools: ["hvac-quote-analyzer", "hvac-cost-estimator", "hvac-financing-calculator"],
  },
  {
    slug: "ac-replacement-cost",
    category: "Cost Guides",
    title: "AC Replacement Cost in Minnesota: 2026 Price Guide",
    metaTitle: "AC Replacement Cost Minnesota (2026) | Central Air Prices",
    metaDescription:
      "What a new central air conditioner costs in the Twin Cities in 2026 — by SEER2 efficiency and home size — plus rebates, SEER2 rules, and how to compare quotes.",
    updated: "July 2026",
    readMinutes: 8,
    intro: [
      "Central air is easy to take for granted until the first 90-degree, high-humidity stretch of a Minnesota July — and then a failing AC becomes urgent fast. This guide lays out what a new central air conditioner actually costs in the Twin Cities, how the new SEER2 efficiency standard affects price, and how to compare quotes without overpaying.",
      "As with any big HVAC decision, these are honest planning ranges rather than a quote. For a number tailored to your home, the [HVAC cost estimator](/tools/hvac-cost-estimator) takes about a minute and asks for no phone number.",
    ],
    keyTakeaways: [
      `Most Twin Cities central AC replacements run **${usdRange(COST_RANGES.ac)}** installed, depending on size and efficiency.`,
      "SEER2 is the current efficiency rating — higher SEER2 costs more up front but lowers summer electric bills and can unlock [Xcel Energy rebates](/resources/minnesota-hvac-rebates).",
      "AC and furnace share the indoor coil and blower, so replacing a very old furnace at the same time is often more cost-effective than doing them separately.",
      "If your system still uses discontinued R-22 refrigerant, repairs are expensive and getting worse — replacement is usually the better path.",
    ],
    sections: [
      {
        heading: "What a new central AC costs",
        tocLabel: "Cost ranges",
        paragraphs: [
          "Installed price includes the outdoor condenser, indoor coil, refrigerant, labor, permit, and old-unit removal. Ranges vary mainly by system size (measured in tons) and SEER2 efficiency.",
        ],
        table: {
          headers: ["Efficiency (SEER2)", "Typical use", "Installed range"],
          rows: [
            [`Standard (~${AC_SEER2.standard.min}–${AC_SEER2.standard.max} SEER2)`, "Budget-conscious replacement", "$4,500 – $6,500"],
            [`Mid efficiency (${AC_SEER2.mid.min}–${AC_SEER2.mid.max} SEER2)`, "Best balance for most homes", "$6,000 – $8,000"],
            [`High efficiency (${AC_SEER2.high.min}+ SEER2)`, "Lowest bills, rebate-eligible", "$7,500 – $9,500+"],
          ],
        },
        callout: {
          tone: "note",
          title: "What is SEER2?",
          text: "SEER2 is the efficiency rating that replaced SEER in 2023 — higher numbers mean lower operating cost. You don't need the highest number available; a mid-range SEER2 is the sweet spot for most Minnesota homes, since our cooling season is shorter than our heating season.",
        },
      },
      {
        heading: "What drives your price up or down",
        tocLabel: "Price factors",
        list: [
          "System size (tons) — set by a load calculation for your home, not guesswork",
          "SEER2 efficiency rating — higher efficiency costs more but lowers electric bills",
          "Single-stage vs. two-stage compressor — better comfort and humidity control at higher cost",
          "Condition of your existing coil, line set, and electrical",
          "Whether the furnace/air handler is being replaced at the same time",
          "Emergency mid-heat-wave replacement vs. a planned off-season install",
        ],
      },
      {
        heading: "Repair or replace your AC?",
        tocLabel: "Repair vs replace",
        paragraphs: [
          "If your AC is under about 12 years old and the repair is modest, fixing it usually makes sense. But two situations tip strongly toward replacement: a failed compressor (often nearly the cost of a new system) and any system still running on R-22 refrigerant, which was phased out in 2020 and is now expensive and scarce.",
        ],
        callout: {
          tone: "tip",
          title: "Not sure which way to go?",
          text: "The [repair-or-replace calculator](/tools/repair-or-replace) weighs your system's age against the repair cost and gives you a clear, unbiased starting point before you talk to anyone.",
        },
      },
      {
        heading: "Rebates that lower the cost",
        tocLabel: "Rebates",
        paragraphs: [
          `Xcel Energy offers rebates on qualifying high-efficiency central air conditioners, which can meaningfully narrow the gap between a mid- and high-efficiency unit. (The federal 25C credit that once applied to the most efficient systems expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}.) Because amounts change each program year, confirm current figures — the [Minnesota rebates guide](/resources/minnesota-hvac-rebates) and [rebate database](/minnesota-hvac-rebate-database) cover what's available.`,
        ],
      },
      {
        heading: "Standard vs. high-efficiency AC",
        tocLabel: "Efficiency tradeoff",
        prosCons: {
          pros: [
            "High-efficiency units noticeably lower summer electric bills",
            "Two-stage compressors dehumidify better — a real comfort gain in humid MN summers",
            "Higher-efficiency systems qualify for utility rebates and tax credits",
            "Quieter operation than older single-stage units",
          ],
          cons: [
            "Higher up-front cost than a standard-efficiency unit",
            "Payback period is longer here than in hot climates (shorter cooling season)",
            "The very highest SEER2 tiers rarely pay off for an average Minnesota home",
          ],
        },
      },
      {
        heading: "How to compare AC quotes fairly",
        tocLabel: "Compare quotes",
        list: [
          "Same SEER2 rating and comparable equipment tier across all quotes",
          "A load calculation justifying the tonnage — an oversized AC short-cycles and dehumidifies poorly",
          "Matched indoor coil included (a new condenser on an old coil underperforms)",
          "Permit included and who pulls it",
          "Labor warranty length, plus how the manufacturer's parts warranty gets registered",
        ],
        callout: {
          tone: "warning",
          title: "Beware the mismatched-coil quote",
          text: "A cheap quote that reuses your old indoor coil can cost you efficiency and reliability. For a comparable system, the coil should be replaced or matched — make sure every quote states it.",
        },
      },
    ],
    faqs: [
      {
        question: "How much does a new AC cost in Minnesota?",
        answer:
          "Most Twin Cities central AC replacements run $4,500 to $9,500 installed. Standard-efficiency units sit at the low end; high-efficiency, rebate-eligible systems reach the top. Size (tonnage), SEER2 rating, and whether the coil is replaced move you within that range.",
      },
      {
        question: "What SEER2 rating should I choose in Minnesota?",
        answer:
          "A mid-range SEER2 (around 16–17) is the sweet spot for most Minnesota homes. Because our cooling season is relatively short, the highest SEER2 tiers usually take too long to pay back — though they may still make sense if you're staying long-term or want maximum comfort.",
      },
      {
        question: "My AC uses R-22 refrigerant — should I replace it?",
        answer:
          "Likely yes. R-22 was phased out in 2020, so recharging an R-22 system is expensive and gets worse every year. Rather than sink money into a discontinued refrigerant, most homeowners are better off replacing the system.",
      },
      {
        question: "Should I replace my AC and furnace together?",
        answer:
          "They share the indoor coil and blower, so if your furnace is also near end of life, replacing both together saves on labor and ensures the systems are matched. If your furnace is newer, replacing just the AC usually makes more sense.",
      },
    ],
    related: ["hvac-cost-guide-minnesota", "minnesota-hvac-rebates", "questions-to-ask-hvac-contractor"],
    relatedServices: ["installation-replacement", "ac-repair"],
    relatedTools: ["hvac-quote-analyzer", "hvac-cost-estimator", "hvac-financing-calculator"],
  },
  {
    slug: "ac-not-cooling",
    category: "Troubleshooting",
    title: "AC Not Cooling? A Twin Cities Homeowner's Troubleshooting Guide",
    metaTitle: "AC Not Cooling? 8 Causes & Fixes (Before You Call a Pro)",
    metaDescription:
      "Your AC is running but not cooling? Work through the quick checks a Twin Cities homeowner can do safely, the common causes, and when to call a pro — before you overpay.",
    updated: "July 2026",
    readMinutes: 7,
    intro: [
      "When your air conditioner runs but the house won't cool — usually on the first 90-degree day of a Minnesota summer — a few minutes of checking can save you a service call, or at least tell you what you're dealing with. This guide walks through what you can safely check yourself, the most common causes, and when it's genuinely time to call a pro.",
      "If it turns out you do need a repair, our [AC repair cost guide](/resources/ac-repair-cost) shows what common fixes run in the Twin Cities so you're not caught off guard.",
    ],
    keyTakeaways: [
      "Start with the three free checks: **thermostat setting, air filter, and the breaker** — they solve a surprising share of no-cooling calls.",
      "A **frozen indoor coil** (ice on the copper lines) is common — turn the system off and let it thaw before running it again.",
      "Warm air plus a running outdoor unit often points to **low refrigerant, a failed capacitor, or a dirty condenser** — those need a technician.",
      "Never keep running an AC that's iced up or short-cycling — you can damage the compressor, which is the most expensive part to replace.",
    ],
    sections: [
      {
        heading: "First, the quick checks you can do safely",
        tocLabel: "Quick checks",
        list: [
          "Thermostat: set to COOL and a few degrees below room temperature; set the fan to AUTO, not ON (ON runs the blower without cooling, which feels like warm air).",
          "Air filter: a clogged filter chokes airflow and is the single most common cause of weak cooling. Replace it if it's dirty.",
          "Breaker: check that the AC's breaker hasn't tripped; a heat pump/AC often has both an indoor and outdoor disconnect.",
          "Outdoor unit: make sure it's running and not buried in cottonwood fluff, grass clippings, or debris — it needs clear airflow.",
          "Vents & registers: confirm supply registers are open and returns aren't blocked by furniture.",
        ],
        callout: {
          tone: "warning",
          title: "See ice on the unit? Shut it off.",
          text: "Ice on the refrigerant lines or indoor coil means the system is frozen. Running it that way risks the compressor. Switch the system OFF (fan to ON to help it thaw), give it a few hours, and replace the filter — if it freezes again, it needs a technician.",
        },
      },
      {
        heading: "The common causes when the quick checks don't fix it",
        tocLabel: "Common causes",
        table: {
          headers: ["Symptom", "Likely cause", "Who fixes it"],
          rows: [
            ["Running, blowing warm air", "Low refrigerant (leak), failed capacitor", "Technician"],
            ["Weak airflow / ice on lines", "Dirty filter or coil, frozen evaporator", "You + technician"],
            ["Outdoor unit won't start / hums", "Failed capacitor or contactor", "Technician"],
            ["Cools some rooms, not others", "Ductwork, sizing, or airflow balance", "Technician"],
            ["Short cycles on and off", "Oversized system, refrigerant, or controls", "Technician"],
          ],
        },
        paragraphs: [
          "Low refrigerant is worth calling out: an AC doesn't 'use up' refrigerant, so if it's low, there's a leak. Simply topping it off without finding the leak is a temporary and increasingly expensive fix — ask any technician to locate the leak first.",
        ],
      },
      {
        heading: "When to call a pro (and what it costs)",
        tocLabel: "When to call",
        paragraphs: [
          "If the free checks don't restore cooling — or you see ice, hear the outdoor unit humming without starting, or smell anything electrical — it's time for a technician. Most no-cooling repairs are diagnosed with a standard service fee, and common fixes like a capacitor are inexpensive. See typical prices in the [AC repair cost guide](/resources/ac-repair-cost), and if your system is old, the [repair-or-replace calculator](/tools/repair-or-replace) helps you decide whether to fix it at all.",
        ],
        callout: {
          tone: "tip",
          title: "Got a repair quote already?",
          text: "Run it through the [HVAC quote analyzer](/tools/hvac-quote-analyzer) to check it's complete and see what to ask before you approve the work.",
        },
      },
    ],
    faqs: [
      {
        question: "Why is my AC running but not cooling the house?",
        answer:
          "The most common reasons are a dirty air filter choking airflow, a frozen evaporator coil, low refrigerant from a leak, or a failed run capacitor. Check and replace the filter first; if that doesn't fix it within a few hours, it likely needs a technician.",
      },
      {
        question: "Why is my AC freezing up?",
        answer:
          "Ice forms when airflow drops or refrigerant is low — often a clogged filter, a dirty coil, or a leak. Turn the system off, set the fan to ON to thaw it, replace the filter, and if it freezes again, have a pro check the coil and refrigerant.",
      },
      {
        question: "Should I add refrigerant to my AC myself?",
        answer:
          "No. Refrigerant handling requires EPA certification, and low refrigerant means there's a leak that needs to be found and repaired — not just topped off. It's also easy to overcharge a system and cause damage. This one's for a licensed technician.",
      },
      {
        question: "How much does it cost to fix an AC that isn't cooling?",
        answer:
          "It depends on the cause: a capacitor is often a few hundred dollars, while a refrigerant leak repair or compressor issue costs more. See the AC repair cost guide for typical Twin Cities ranges, and always get the diagnosis in writing.",
      },
    ],
    related: ["ac-repair-cost", "furnace-not-working-troubleshooting", "minnesota-hvac-maintenance-calendar"],
    relatedServices: ["ac-repair", "emergency-hvac", "maintenance-tune-ups"],
    relatedTools: ["repair-or-replace", "hvac-quote-analyzer"],
  },
  {
    slug: "ac-repair-cost",
    category: "Cost Guides",
    title: "AC Repair Cost in Minnesota: What Common Fixes Really Run",
    metaTitle: "AC Repair Cost Minnesota | Capacitor, Refrigerant & More",
    metaDescription:
      "What common AC repairs cost in the Twin Cities — capacitor, refrigerant leak, fan motor, coil, compressor — plus how to avoid overpaying and when repair beats replacement.",
    updated: "July 2026",
    readMinutes: 6,
    intro: [
      "When your AC quits, the first question is \"what's this going to cost?\" Most repairs are far less dramatic than the worst-case number in your head — but a few are expensive enough that replacement becomes the smarter move. Here's what common central-AC repairs actually run in the Twin Cities, and how to make sure you're paying a fair price.",
      "If your system is older, don't fix it on autopilot — run the numbers with the [repair-or-replace calculator](/tools/repair-or-replace) first.",
    ],
    keyTakeaways: [
      "Most common AC repairs run **$150–$700**; refrigerant, coil, and compressor jobs cost more.",
      "A **capacitor** — one of the most frequent failures — is usually one of the cheapest fixes.",
      "**Low refrigerant means a leak.** Pay to find and fix the leak, not just to top it off.",
      "If a repair costs more than about a third of a new system and your AC is 12+ years old, replacement usually wins.",
    ],
    sections: [
      {
        heading: "Typical AC repair costs in the Twin Cities",
        tocLabel: "Repair costs",
        table: {
          headers: ["Repair", "Typical range"],
          rows: [
            ["Capacitor", "$150 – $400"],
            ["Contactor", "$150 – $400"],
            ["Condenser fan motor", "$300 – $700"],
            ["Refrigerant leak find & recharge", "$400 – $1,500"],
            ["Evaporator coil", "$1,000 – $2,500"],
            ["Compressor (often replace system instead)", "$1,500 – $3,000"],
          ],
        },
        paragraphs: [
          "These include parts and labor. The diagnostic fee (typically quoted upfront) is often applied toward the repair if you proceed.",
        ],
      },
      {
        heading: "What drives the price",
        tocLabel: "Price factors",
        list: [
          "The part itself — a capacitor is cheap; a coil or compressor is not",
          "Refrigerant type — older R-22 systems are expensive to recharge and getting worse",
          "Whether the leak is found and repaired vs. a temporary top-off",
          "Emergency, evening, or weekend timing",
          "Your system's age and parts availability",
        ],
        callout: {
          tone: "note",
          title: "The R-22 trap",
          text: "If your AC uses discontinued R-22 refrigerant, a leak repair plus recharge can cost more than the system is worth. If a technician mentions R-22, ask directly whether repair still makes financial sense.",
        },
      },
      {
        heading: "Repair or replace?",
        tocLabel: "Repair vs replace",
        paragraphs: [
          "A failed compressor or a leaking evaporator coil on an older system is usually the tipping point toward replacement, because you're spending half the cost of a new unit on one part of an aging system. The [repair-or-replace calculator](/tools/repair-or-replace) weighs your system's age against the repair cost, and the [AC replacement cost guide](/resources/ac-replacement-cost) shows what a new system runs if you go that way.",
        ],
      },
      {
        heading: "How to avoid overpaying",
        tocLabel: "Avoid overpaying",
        list: [
          "Get the diagnosis and price in writing before approving the work",
          "For anything over ~$1,000, get a second opinion",
          "Ask whether the quote finds and fixes a refrigerant leak or just recharges",
          "On big repairs, ask for the replacement number too, so you can compare",
        ],
        callout: {
          tone: "tip",
          title: "Check any repair quote in 60 seconds",
          text: "Paste your quote's details into the [HVAC quote analyzer](/tools/hvac-quote-analyzer) to see whether it's complete and what to ask before you sign off.",
        },
      },
    ],
    faqs: [
      {
        question: "How much does AC repair cost in Minnesota?",
        answer:
          "Most common central-AC repairs run $150–$700 — a capacitor or contactor at the low end, a fan motor in the middle. Refrigerant leak repairs, evaporator coils, and compressors cost more, often $1,000–$3,000, which is when replacement starts to make more sense.",
      },
      {
        question: "Why is my AC repair so expensive?",
        answer:
          "Big AC repair bills usually involve refrigerant work, a coil, or a compressor — expensive parts and labor on their own, and worse if your system uses discontinued R-22 refrigerant. For repairs over about a third of a new system's cost on an older unit, replacement is often the better value.",
      },
      {
        question: "Is a capacitor replacement expensive?",
        answer:
          "No — a run capacitor is one of the most common and least expensive AC repairs, typically a few hundred dollars including labor. It's also one of the most frequent causes of an outdoor unit that hums but won't start.",
      },
      {
        question: "Should I repair or replace my air conditioner?",
        answer:
          "If your AC is under about 12 years old and the repair is modest, fixing it usually makes sense. A failed compressor, a leaking coil, or an R-22 system tips the decision toward replacement — run your numbers through the repair-or-replace calculator.",
      },
    ],
    related: ["ac-not-cooling", "ac-replacement-cost", "hvac-cost-guide-minnesota"],
    relatedServices: ["ac-repair", "installation-replacement"],
    relatedTools: ["repair-or-replace", "hvac-quote-analyzer", "hvac-cost-estimator"],
  },
  {
    slug: "furnace-repair-cost",
    category: "Cost Guides",
    title: "Furnace Repair Cost in Minnesota: Common Repairs & Prices",
    metaTitle: "Furnace Repair Cost Minnesota | Ignitor, Blower & More",
    metaDescription:
      "What common furnace repairs cost in the Twin Cities — flame sensor, ignitor, blower motor, control board, heat exchanger — plus no-heat pricing and when to replace instead.",
    updated: "July 2026",
    readMinutes: 6,
    leadImage: {
      src: "/site-images/repair-vs-replace-matrix.webp",
      alt: "Decision matrix comparing HVAC repair considerations (age and warranty status, frequency of issues, cost of repairs) against replacement considerations (system efficiency, long-term savings), leading to a short-term monitor solution or a long-term investment.",
      width: 1800,
      height: 1344,
      caption: "A quick way to frame the repair-vs-replace decision before you commit to a furnace repair.",
    },
    intro: [
      "A furnace that quits in a Minnesota winter feels like an emergency — and the price uncertainty makes it worse. The good news: many furnace repairs are inexpensive and same-day. Here's what common furnace repairs actually cost in the Twin Cities, so you can tell a fair price from a padded one, even at 10 PM in January.",
      "If your furnace is getting on in years, check whether repair even makes sense with the [repair-or-replace calculator](/tools/repair-or-replace) before you commit.",
    ],
    keyTakeaways: [
      `Most furnace repairs run **${usdRange(FURNACE_REPAIR_RANGE)}**; blower motors, control boards, and heat exchangers cost more.`,
      "A dirty **flame sensor** or a failed **ignitor** — both cheap — cause a large share of no-heat calls.",
      "A **cracked heat exchanger** is a safety issue that usually means replacement, not repair.",
      "No-heat emergency visits on nights and weekends carry a premium — ask about it upfront.",
    ],
    sections: [
      {
        heading: "Typical furnace repair costs in the Twin Cities",
        tocLabel: "Repair costs",
        table: {
          headers: ["Repair", "Typical range"],
          rows: [
            ["Flame sensor cleaning/replacement", "$80 – $250"],
            ["Hot surface ignitor", "$150 – $350"],
            ["Draft inducer motor", "$300 – $900"],
            ["Control/circuit board", "$400 – $1,200"],
            ["Blower motor", "$400 – $1,500"],
            ["Heat exchanger (usually replace furnace)", "$1,500+"],
          ],
        },
        paragraphs: [
          "Parts and labor included. The diagnostic fee is usually quoted upfront and often credited toward the repair.",
        ],
      },
      {
        heading: "What drives the price",
        tocLabel: "Price factors",
        list: [
          "The failed part — a flame sensor is cheap; a blower motor or board is not",
          "No-heat emergency timing (nights, weekends, holidays)",
          "Your furnace's age and whether parts are still available",
          "High-efficiency (condensing) furnaces have more parts that can fail",
        ],
        callout: {
          tone: "warning",
          title: "A gas smell is not a repair — it's an emergency",
          text: "If you smell gas near the furnace, leave the house, don't touch switches, and call your gas utility and 911 from outside first. Only address the furnace itself once you're safe.",
        },
      },
      {
        heading: "Repair or replace?",
        tocLabel: "Repair vs replace",
        paragraphs: [
          "A cracked heat exchanger is the clearest replacement trigger — it's a carbon-monoxide safety issue, and the part costs so much that a new furnace is usually the better spend. Beyond that, the rule of thumb holds: if the repair is more than about a third of a new furnace and yours is past 15 years, replace it. The [furnace replacement cost guide](/resources/furnace-replacement-cost) shows what new systems run.",
        ],
      },
      {
        heading: "How to avoid overpaying",
        tocLabel: "Avoid overpaying",
        list: [
          "Get the diagnosis and price in writing before work begins",
          "Ask what the emergency/after-hours premium is before booking, if it's not a true emergency",
          "For repairs over ~$800 on an older furnace, get the replacement number too",
          "Be wary of a heat-exchanger 'crack' diagnosis with no photo — ask to see it",
        ],
        callout: {
          tone: "tip",
          title: "Sanity-check any repair quote",
          text: "Run the details through the [HVAC quote analyzer](/tools/hvac-quote-analyzer) to confirm it's complete and see the questions to ask before you approve it.",
        },
      },
    ],
    faqs: [
      {
        question: "How much does furnace repair cost in Minnesota?",
        answer:
          `Most furnace repairs run ${usdRange(FURNACE_REPAIR_RANGE)} — a flame sensor or ignitor at the low end, a blower motor or control board higher. A cracked heat exchanger is the exception: it's a safety issue that usually means replacing the furnace rather than repairing it.`,
      },
      {
        question: "Why won't my furnace stay lit?",
        answer:
          "A furnace that lights then shuts off is often a dirty flame sensor — a cheap, common fix. It can also be a failing ignitor or a safety switch doing its job. A technician can pinpoint it quickly, and it's usually an inexpensive repair.",
      },
      {
        question: "Is it worth repairing a 20-year-old furnace?",
        answer:
          "Often not, especially for a major part. Past 15–20 years, if the repair runs more than about a third of a new furnace, replacement usually makes more financial sense — and a new high-efficiency unit lowers your gas bill. Run the numbers with the repair-or-replace tool.",
      },
      {
        question: "How fast can someone fix a no-heat furnace?",
        answer:
          "For no-heat emergencies in winter, most Twin Cities HVAC companies offer same-day and 24/7 service. Common parts like ignitors and flame sensors are usually carried on the truck for on-the-spot repairs — ask when you call.",
      },
    ],
    related: ["furnace-not-working-troubleshooting", "furnace-replacement-cost", "hvac-cost-guide-minnesota"],
    relatedServices: ["furnace-repair", "emergency-hvac", "installation-replacement"],
    relatedTools: ["repair-or-replace", "hvac-quote-analyzer", "hvac-cost-estimator"],
  },
  {
    slug: "heat-pump-replacement-cost",
    category: "Cost Guides",
    title: "Heat Pump Cost in Minnesota: Cold-Climate Ranges for 2026",
    metaTitle: "Heat Pump Cost in Minnesota (2026 Cold-Climate Ranges)",
    metaDescription:
      "What a cold-climate heat pump really costs in Minnesota — installed price ranges, what drives the price, dual-fuel vs. full heat pump, rebates, and whether it's worth it in our winters.",
    updated: "July 2026",
    readMinutes: 8,
    leadImage: {
      src: "/site-images/minnesota-home-winter.webp",
      alt: "A Minnesota home in winter with an outdoor cold-climate heat pump / condenser unit beside the house.",
      width: 1600,
      height: 1195,
      caption:
        "Cold-climate heat pumps now heat Minnesota homes through sub-zero winters — this guide covers what they cost here.",
    },
    intro: [
      `A cold-climate heat pump is one of the biggest shifts in Minnesota home heating in a generation: a single system that both heats and cools, runs efficiently well below 0°F, and earns the largest utility rebates in the state. The catch is the sticker — a heat pump costs more up front than a like-for-like furnace or AC. This guide lays out what one actually costs installed in the Twin Cities, what moves the price, and how to weigh it honestly against a furnace.`,
      `These are planning ranges, not a quote. The only exact number is a written quote after a contractor runs a load calculation for your home — which is exactly why comparing two or three quotes matters. To turn these ranges into a number for your house, use the [HVAC cost estimator](/tools/hvac-cost-estimator); to weigh the system type, use the [heat pump vs. furnace tool](/tools/heat-pump-vs-furnace).`,
    ],
    keyTakeaways: [
      `A cold-climate heat pump typically runs **${usdRange(COST_RANGES.heatPump)}** installed in the Twin Cities, before rebates — more than a furnace up front, but it replaces your AC too.`,
      "Modern cold-climate (ccASHP) models are rated to heat efficiently well below 0°F; a **dual-fuel** setup pairs one with your gas furnace for the coldest days.",
      "Heat pumps draw the **largest Minnesota utility rebates** of any HVAC equipment — a major part of the real cost.",
      `The federal 25C tax credit that once helped **expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}**, so 2026 projects rely on utility rebates and the pending state program.`,
    ],
    sections: [
      {
        heading: "What a cold-climate heat pump costs in Minnesota",
        tocLabel: "Cost ranges",
        paragraphs: [
          `Installed price means equipment, labor, permit, and removal of the old system. In the Twin Cities, a ducted cold-climate heat pump typically lands in the ${usdRange(COST_RANGES.heatPump)} range before rebates. Where you fall inside that band depends mostly on your home's size, the system's efficiency, and whether your electrical panel and ductwork need work.`,
          "The configuration matters as much as the equipment. Here's how the common Minnesota setups compare in broad terms:",
        ],
        table: {
          headers: ["Configuration", "What it is", "Relative cost"],
          rows: [
            ["Ducted cold-climate heat pump", "Replaces AC and does most or all heating through existing ducts", `${usdRange(COST_RANGES.heatPump)}`],
            ["Dual-fuel (heat pump + gas furnace)", "Heat pump for mild/shoulder seasons, furnace takes over in deep cold", "Heat pump range + furnace cost; often the largest rebate stack"],
            ["Ductless mini-split", "For homes without ducts, additions, or room-by-room zones", "Single zone can be less; multi-zone can meet or exceed a ducted system"],
          ],
        },
        callout: {
          tone: "note",
          title: "Why the range is wide",
          text: "Heat pump pricing spans more than a furnace because sizing, cold-climate performance, electrical capacity, and ducted-vs-ductless all move the number. A load calculation is what turns this range into a real figure.",
        },
      },
      {
        heading: "What drives your heat pump price up or down",
        tocLabel: "Price factors",
        list: [
          "Home size and heating load — a proper Manual J calculation, not a rule of thumb, sets the capacity you need",
          "Cold-climate rating — true ccASHP models that hold capacity below 0°F cost more than mild-climate units, but they're what Minnesota needs",
          "Ducted vs. ductless — using good existing ductwork is cheaper than adding mini-split heads",
          "Electrical work — some homes need a panel or circuit upgrade for a heat pump, which adds cost",
          "Dual-fuel integration — keeping and tying in your gas furnace as backup adds equipment but buys deep-cold reliability",
          "Efficiency tier (HSPF2 / SEER2) — higher-rated systems cost more up front and earn larger rebates",
        ],
      },
      {
        heading: "Heat pump vs. furnace: the Minnesota math",
        tocLabel: "Vs. a furnace",
        paragraphs: [
          `A high-efficiency furnace (${afuePlus(FURNACE_AFUE.highEfficiency)}) is cheaper up front and unbeatable in deep cold, but it only heats — you still need an AC. A cold-climate heat pump costs more initially but replaces both, runs efficiently for most of the Minnesota heating season, and earns the biggest rebates. The cost-effective moment to switch is usually when your AC is due for replacement anyway, since replacing a working AC just to add a heat pump means paying to remove a functional unit.`,
          "For many Twin Cities homes the sweet spot is dual-fuel: the heat pump carries the mild and shoulder seasons efficiently, and the gas furnace takes over automatically when it's -20°F. The [heat pump vs. furnace tool](/tools/heat-pump-vs-furnace) weighs the trade-off for your priorities, and the [repair-or-replace calculator](/tools/repair-or-replace) helps time it.",
        ],
      },
      {
        heading: "Rebates and incentives for Minnesota heat pumps",
        tocLabel: "Rebates",
        paragraphs: [
          `Heat pumps draw the largest utility rebates in Minnesota, which is a big reason cold-climate models have surged here — and a big part of the real, after-rebate cost. Xcel Energy (electric) rebates the heat pump; in a dual-fuel setup, CenterPoint Energy (gas) may also rebate the furnace, stacking the incentives.`,
          `One important 2026 change: the federal Energy Efficient Home Improvement Credit (25C) that once added up to ${usd(FEDERAL_25C.capHeatPumpUsd)} toward a qualifying heat pump expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}. It is not available for 2026 installs. Amounts change every program year, so confirm current figures with the [Minnesota rebates guide](/resources/minnesota-hvac-rebates), the [rebate database](/minnesota-hvac-rebate-database), and the [rebate checker](/tools/minnesota-hvac-rebate-checker) rather than counting on a stale number.`,
        ],
      },
      {
        heading: "Is a cold-climate heat pump worth it in Minnesota?",
        tocLabel: "Worth it?",
        prosCons: {
          pros: [
            "One system heats and cools — replaces your AC too",
            "Efficient for most of the heating season; lower operating cost than resistance heat",
            "Largest Minnesota utility rebates of any HVAC equipment",
            "Lower carbon footprint, especially on a cleaner grid",
          ],
          cons: [
            "Higher up-front cost than a like-for-like furnace or AC",
            "May need electrical upgrades in some homes",
            "In deep cold, an all-electric heat pump leans on backup heat (why dual-fuel is popular here)",
            "Requires a contractor genuinely experienced with cold-climate sizing",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "How much does a heat pump cost in Minnesota?",
        answer: `A cold-climate heat pump typically runs ${usdRange(COST_RANGES.heatPump)} installed in the Twin Cities before rebates. Home size, efficiency, ductwork, electrical, and whether it's a dual-fuel setup move you within that range. Use the HVAC cost estimator for a range tailored to your home.`,
      },
      {
        question: "Do heat pumps actually work in Minnesota winters?",
        answer: "Yes — modern cold-climate (ccASHP) heat pumps are rated to heat efficiently well below 0°F, which is why they've become common in Minnesota. For the coldest snaps, many homeowners choose a dual-fuel system that switches to a gas furnace automatically.",
      },
      {
        question: "Is a heat pump cheaper to run than a furnace?",
        answer: "For much of the Minnesota heating season a cold-climate heat pump is efficient and can lower operating cost, and it also handles cooling. In deep cold its efficiency drops, which is why dual-fuel setups pair it with a furnace for the worst days. Your exact savings depend on rates and your home.",
      },
      {
        question: "Are there rebates for heat pumps in Minnesota?",
        answer: `Yes — heat pumps earn the largest utility rebates in Minnesota (via Xcel Energy, plus CenterPoint on the furnace in dual-fuel setups). Note the federal 25C tax credit expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}, so 2026 projects rely on utility rebates and the pending state program. Check current amounts in the rebate database.`,
      },
    ],
    related: ["furnace-replacement-cost", "ac-replacement-cost", "minnesota-hvac-rebates", "hvac-cost-guide-minnesota"],
    relatedServices: ["heat-pumps", "installation-replacement"],
    relatedTools: ["heat-pump-vs-furnace", "hvac-cost-estimator", "minnesota-hvac-rebate-checker"],
  },
  {
    slug: "twin-cities-hvac-cost-report-2026",
    category: "Cost Report",
    title: "Twin Cities HVAC Cost Report 2026: What Homeowners Actually Pay",
    metaTitle: "Twin Cities HVAC Cost Report (2026 Data) — EaganHVACs",
    metaDescription:
      "An independent 2026 report on Twin Cities HVAC costs: furnace, AC, and heat pump replacement and repair ranges, the efficiency premium, the rebate landscape, and the expired federal tax credit. Free to cite.",
    updated: "July 2026",
    readMinutes: 9,
    leadImage: {
      src: "/site-images/home-hvac-collage.webp",
      alt: "A montage of Twin Cities home HVAC equipment: furnaces, central air conditioners, a heat pump, a smart thermostat, and ductwork.",
      width: 1536,
      height: 1024,
      caption: "What Twin Cities homeowners pay to replace and repair the systems that keep a Minnesota home comfortable — 2026 data.",
    },
    intro: [
      "Most HVAC pricing online is either hidden behind a phone call or copied from national averages that are thousands of dollars off for our market. This report is different: it's an independent, plainly-sourced snapshot of what heating and cooling actually costs Twin Cities homeowners in 2026 — replacement and repair ranges, the efficiency premium, and the rebate landscape after the federal tax credit expired.",
      "Every figure here comes from the same internal reference dataset that powers our calculators, so the numbers are consistent across the whole site. Ranges are deliberately broad, because honest HVAC pricing is a range, not a single number. You're free to cite this report — see [how to cite it](#how-to-cite) at the end.",
    ],
    keyTakeaways: [
      `A furnace replacement runs **${usdRange(COST_RANGES.furnace)}** installed; central AC **${usdRange(COST_RANGES.ac)}**; both together **${usdRange(COST_RANGES.furnaceAndAc)}**; a cold-climate heat pump **${usdRange(COST_RANGES.heatPump)}** — all before rebates.`,
      `Most furnace repairs land between **${usdRange(FURNACE_REPAIR_RANGE)}**; the part matters less than labor, diagnosis, and availability.`,
      "The biggest single change for 2026: the **federal 25C tax credit expired** at the end of 2025, so incentives now come from Minnesota utility rebates (largest for heat pumps) and the pending state program.",
      "Installation quality moves lifetime cost more than brand does — a right-sized, well-installed mid-tier system beats a premium unit installed poorly.",
    ],
    sections: [
      {
        heading: "Replacement cost by system (Twin Cities, installed, before rebates)",
        tocLabel: "Replacement costs",
        paragraphs: [
          "These are full installed prices — equipment, labor, permit, and removal of the old system — for a standard replacement in an existing home with usable ductwork. Lifespans are typical, well-maintained expectations in Minnesota's climate.",
        ],
        table: {
          headers: ["System", "Installed range", "Typical lifespan"],
          rows: [
            ["Gas furnace", usdRange(COST_RANGES.furnace), `${yearsRange(LIFESPANS.furnace)} years`],
            ["Central air conditioner", usdRange(COST_RANGES.ac), `${yearsRange(LIFESPANS.ac)} years`],
            ["Furnace + AC (replaced together)", usdRange(COST_RANGES.furnaceAndAc), "—"],
            ["Cold-climate heat pump", usdRange(COST_RANGES.heatPump), `${yearsRange(LIFESPANS.heatPump)} years`],
            ["Boiler", "Varies by system", `${yearsRange(LIFESPANS.boiler)} years`],
          ],
        },
      },
      {
        heading: "The efficiency premium: what higher ratings cost",
        tocLabel: "Efficiency premium",
        paragraphs: [
          `Higher efficiency costs more up front and earns larger rebates. For furnaces, the jump is from a standard ${FURNACE_AFUE.standard}% AFUE unit to a high-efficiency condensing furnace (${afuePlus(FURNACE_AFUE.highEfficiency)}). For central AC, efficiency is measured in SEER2:`,
        ],
        table: {
          headers: ["AC efficiency tier", "SEER2", "Typical use"],
          rows: [
            ["Standard", `~${AC_SEER2.standard.min}–${AC_SEER2.standard.max}`, "Budget-conscious replacement"],
            ["Mid-efficiency", `${AC_SEER2.mid.min}–${AC_SEER2.mid.max}`, "Best balance for most Minnesota homes"],
            ["High-efficiency", `${AC_SEER2.high.min}+`, "Lowest bills, top rebate eligibility"],
          ],
        },
        callout: {
          tone: "note",
          title: "Minnesota leans high-efficiency",
          text: "With our long heating season, the monthly savings from a high-efficiency furnace add up faster here than almost anywhere in the country — which is why high-efficiency models are the common recommendation and why the rebates exist.",
        },
      },
      {
        heading: "Typical repair costs",
        tocLabel: "Repair costs",
        paragraphs: [
          `Most furnace repairs run ${usdRange(FURNACE_REPAIR_RANGE)} — a flame sensor or ignitor at the low end, a blower motor or control board higher. A cracked heat exchanger is the exception: it's a safety issue that usually means replacing the furnace. Common AC repairs (a capacitor, contactor, or fan motor) tend to be a few hundred dollars; a refrigerant leak or a failed compressor is where costs climb and repair-versus-replace enters the picture.`,
          "As a rule of thumb, once a system is past its typical lifespan and a repair would cost more than about a third of a new system, replacement usually wins on total cost. Our [repair-or-replace calculator](/tools/repair-or-replace) applies that math to your specific system.",
        ],
      },
      {
        heading: "The 2026 rebate landscape",
        tocLabel: "Rebates",
        paragraphs: [
          `Incentives materially change the real cost of high-efficiency equipment, and 2026 looks different from prior years. The headline: the federal Energy Efficient Home Improvement Credit (25C) — historically ${FEDERAL_25C.ratePct}% of cost, up to ${usd(FEDERAL_25C.capFurnaceAcUsd)} for a furnace or AC and ${usd(FEDERAL_25C.capHeatPumpUsd)} for a heat pump — expired ${FEDERAL_25C_EXPIRATION_LABEL} and is not available for 2026 installs.`,
          "What remains: Minnesota utility rebates. Xcel Energy (electric) rebates central AC, heat pumps, and smart thermostats; CenterPoint Energy (gas) rebates high-efficiency furnaces and boilers. Heat pumps draw the largest rebates. Amounts change every program year, so we don't quote them — verify current figures in our [rebate database](/minnesota-hvac-rebate-database).",
        ],
      },
      {
        heading: "What drives Twin Cities prices",
        tocLabel: "Price drivers",
        list: [
          "Climate: a demanding heating season pushes homeowners toward cold-climate and high-efficiency equipment sized for real Minnesota loads",
          "Home size and ductwork: larger homes and duct modifications add capacity and labor",
          "Efficiency tier: high-efficiency and modulating equipment costs more up front",
          "Electrical and venting: heat pump panel upgrades or new sidewall venting add cost",
          "Season and urgency: emergency winter replacements price higher than off-season work",
          "Install quality: the single biggest driver of lifetime cost, more than brand",
        ],
      },
      {
        heading: "Methodology",
        tocLabel: "Methodology",
        paragraphs: [
          "Figures are editorial planning ranges for the Twin Cities metro, derived from published contractor pricing, manufacturer equipment costs, typical local labor, and Minnesota utility program structures — reviewed and reconciled against a single internal reference dataset so no figure contradicts another across the site.",
          "We express prices as broad low-to-high bands rather than single points, and we do not apply rebates inside the ranges (incentives change yearly). We never invent statistics or carry a prior year's rebate amount forward. For the full list of primary sources and our review process, see our [editorial policy](/editorial-policy) and [methodology](/about#methodology).",
        ],
      },
      {
        heading: "How to cite this report",
        tocLabel: "How to cite",
        paragraphs: [
          "This report is free to cite and reference. If you use these figures, please attribute them to EaganHVACs and link back to this page so readers can see the methodology and current data.",
          "Suggested citation: \"Twin Cities HVAC Cost Report 2026,\" EaganHVACs, https://www.eaganhvacs.com/resources/twin-cities-hvac-cost-report-2026.",
        ],
        callout: {
          tone: "tip",
          title: "Journalists & bloggers",
          text: "Want the underlying breakdowns or a specific figure verified for a story? Email us and we'll help — we'd rather you cite an accurate number than a national average that's wrong for Minnesota.",
        },
      },
    ],
    faqs: [
      {
        question: "How much does HVAC replacement cost in the Twin Cities in 2026?",
        answer: `Before rebates: a furnace runs ${usdRange(COST_RANGES.furnace)} installed, central AC ${usdRange(COST_RANGES.ac)}, both together ${usdRange(COST_RANGES.furnaceAndAc)}, and a cold-climate heat pump ${usdRange(COST_RANGES.heatPump)}. Your exact price depends on home size, efficiency, ductwork, and access.`,
      },
      {
        question: "Did HVAC costs change in 2026?",
        answer: `The biggest change is incentives, not equipment prices: the federal 25C tax credit expired ${FEDERAL_25C_EXPIRATION_LABEL}, so 2026 projects rely on Minnesota utility rebates (largest for heat pumps) and the state's pending program rather than the federal credit.`,
      },
      {
        question: "Can I use these figures on my own site?",
        answer: "Yes — this report is free to cite with attribution to EaganHVACs and a link back to this page so readers can see the methodology. Email us if you need a specific figure verified for a story.",
      },
    ],
    related: ["hvac-cost-guide-minnesota", "furnace-replacement-cost", "ac-replacement-cost", "heat-pump-replacement-cost"],
    relatedServices: ["installation-replacement", "heat-pumps"],
    relatedTools: ["hvac-cost-estimator", "repair-or-replace", "minnesota-hvac-rebate-checker"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articleCategories: readonly string[] = [
  ...new Set(articles.map((a) => a.category)),
];
