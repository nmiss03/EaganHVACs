/**
 * Resource-center guides. Each article is genuinely useful, Minnesota-
 * specific homeowner content — the editorial template that keeps future
 * additions consistent and non-duplicative.
 */

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  readMinutes: number;
  intro: string[];
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
    intro: [
      "The most common question homeowners ask — and the one most HVAC websites dodge — is \"what will this cost me?\" Exact prices depend on your home and equipment, but the ranges below reflect what Twin Cities homeowners typically pay, so you can spot a fair quote and a suspicious one.",
      "One important note: these are planning ranges, not promises. The only real number is a written quote after a technician has seen your system — which is exactly why comparing two or three quotes matters.",
    ],
    sections: [
      {
        heading: "Typical furnace repair costs",
        paragraphs: [
          "Most furnace repairs fall between $150 and $600. The part matters less than you'd think — labor, diagnosis, and availability drive much of the price.",
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
          "In the Twin Cities, a new furnace typically runs $4,000–$9,000 installed, central AC $4,500–$9,500, and a cold-climate heat pump $8,000–$18,000 before rebates. High-efficiency equipment sits at the top of each range but earns utility rebates and lower bills every month.",
          "Installation quality moves these numbers more than brand does. A properly sized, properly installed mid-tier system outperforms a premium unit installed badly.",
        ],
      },
      {
        heading: "What makes your price higher or lower",
        list: [
          "System size (a 3,000 sq ft two-story needs more capacity than a rambler)",
          "Efficiency rating (95%+ AFUE furnaces and 16+ SEER2 ACs cost more upfront)",
          "Ductwork condition — modifications add cost",
          "Accessibility: tight utility rooms and finished basements slow installs",
          "Season — emergency winter replacements price higher than shoulder-season ones",
          "Rebates: Xcel and CenterPoint rebates plus federal credits can offset thousands",
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
    related: ["questions-to-ask-hvac-contractor", "minnesota-hvac-rebates"],
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
  },
  {
    slug: "minnesota-hvac-rebates",
    category: "Rebates & Incentives",
    title: "Minnesota HVAC Rebates & Tax Credits: What You Can Claim",
    metaTitle: "Minnesota HVAC Rebates & Tax Credits Guide",
    metaDescription:
      "Xcel Energy and CenterPoint rebates, federal tax credits for heat pumps and high-efficiency systems — what Minnesota homeowners can claim and how to stack them.",
    updated: "July 2026",
    readMinutes: 5,
    intro: [
      "Minnesota homeowners leave real money on the table every year by not claiming HVAC incentives. Between utility rebates and federal tax credits, a high-efficiency upgrade can come in thousands of dollars cheaper than sticker price — if you know what to claim and who files it.",
      "Program amounts change yearly, so treat the figures below as a map of what exists and verify current amounts with your utility or contractor before buying.",
    ],
    sections: [
      {
        heading: "Utility rebates (Xcel Energy & CenterPoint)",
        paragraphs: [
          "Both major Twin Cities utilities pay rebates on qualifying high-efficiency equipment. Electric rebates typically come from Xcel (AC, heat pumps, smart thermostats) and gas rebates from CenterPoint (furnaces, boilers). Typical categories:",
        ],
        list: [
          "High-efficiency furnaces (95%+ AFUE) — commonly $100–$500",
          "High-efficiency central AC — commonly $100–$500",
          "Air-source and cold-climate heat pumps — commonly $500–$2,000+",
          "Smart thermostats — commonly $25–$75",
          "AC tune-up rebates in some program years",
        ],
      },
      {
        heading: "Federal tax credits (Energy Efficient Home Improvement Credit)",
        paragraphs: [
          "The federal 25C credit covers 30% of qualifying project costs, with caps per equipment type: up to $600 for qualifying ACs and furnaces, and up to $2,000 per year for qualifying heat pumps. This is a tax credit — it reduces what you owe dollar-for-dollar — and it resets annually, which rewards phasing projects across tax years.",
        ],
      },
      {
        heading: "How to stack incentives",
        list: [
          "Utility rebate + federal credit can be combined on the same equipment",
          "Ask each contractor which specific model numbers qualify — 'high efficiency' isn't enough",
          "Confirm in writing who files the rebate paperwork (good contractors handle it)",
          "Keep the AHRI certificate and invoice — you'll need them for the tax credit",
          "Income-qualified households may have access to additional state programs — worth asking your utility",
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
          "Usually the installing contractor files utility rebates on your behalf; the federal tax credit you claim yourself with your tax return (IRS Form 5695), using the invoice and manufacturer certificate.",
      },
      {
        question: "Do heat pumps really get the biggest incentives?",
        answer:
          "Yes — heat pumps currently draw the largest combined incentives (up to $2,000 federal plus utility rebates), which is a big part of why cold-climate heat pumps have surged in Minnesota.",
      },
    ],
    related: ["hvac-cost-guide-minnesota", "questions-to-ask-hvac-contractor"],
    relatedServices: ["heat-pumps", "installation-replacement", "thermostats"],
    relatedTools: ["hvac-cost-estimator"],
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
    intro: [
      "Minnesota is one of the hardest climates in America on HVAC equipment: -20°F stretches in January, 95°F humidity in July, and a system that never really gets a season off. A little seasonal discipline prevents most emergency breakdowns — here's the calendar we'd give any Twin Cities homeowner.",
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
          "In sub-zero weather, no heat is an emergency — pipes can freeze within hours. Contractors in our network run 24/7 emergency service across the south metro, and an after-hours call costs far less than a burst pipe.",
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
          "For no-heat emergencies in winter, contractors in our network offer same-day and 24/7 dispatch across Eagan and the south metro — most homeowners get a callback within the hour.",
      },
    ],
    related: ["minnesota-hvac-maintenance-calendar", "hvac-cost-guide-minnesota"],
    relatedServices: ["furnace-repair", "emergency-hvac"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articleCategories: readonly string[] = [
  ...new Set(articles.map((a) => a.category)),
];
