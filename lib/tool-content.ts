/**
 * Long-form pillar content for each existing calculator. Rendered by
 * <ToolPillar> beneath the interactive tool (which stays above the fold).
 *
 * Prose fields are arrays of paragraphs and support inline internal links via
 * the [text](/path) syntax handled by renderInline — this is how the tool
 * pages weave into the site's topical graph. No figures here are invented:
 * cost bands mirror the ranges the calculators themselves use, lifespans and
 * efficiency terms are industry-standard, and rebate specifics defer to the
 * rebate guide and each utility rather than quoting amounts.
 *
 * All numeric figures come from the canonical lib/hvac-data module.
 */

import {
  COST_RANGES,
  FURNACE_AFUE,
  REPAIR_REPLACE_RULE_USD,
  FEDERAL_25C,
  FEDERAL_25C_EXPIRATION_YEAR,
  usd,
  usdRange,
  afuePlus,
} from "@/lib/hvac-data";

export interface ToolExample {
  title: string;
  /** Supports [text](/path) inline links and **bold**. */
  body: string;
}

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolLink {
  label: string;
  href: string;
}

export interface ToolContent {
  overview: string[];
  whatItDoes: string[];
  whenToUse: string[];
  howItWorks: string[];
  methodology: string[];
  assumptions: string[];
  limitations: string[];
  examples: ToolExample[];
  commonMistakes: string[];
  /** Optional — only where a repair-vs-replace framing is relevant. */
  repairVsReplace?: string[];
  faqs: ToolFaq[];
  nextSteps: string[];
  relatedGuides: ToolLink[];
  /** Slugs of related tools. */
  relatedTools: string[];
  /** When true, the renderer surfaces a rebate cross-link. */
  relatedRebates?: boolean;
  /**
   * Optional at-a-glance range visualization (shared-scale cost bands),
   * rendered near the top of the pillar. Only presents figures the page's
   * prose already states — a visual summary, not new data.
   */
  costSnapshot?: {
    title: string;
    note?: string;
    scaleMax: number;
    bars: { label: string; low: number; high: number }[];
  };
}

export const toolContent: Record<string, ToolContent> = {
  "hvac-cost-estimator": {
    overview: [
      "Most HVAC websites hide prices until you're on the phone with a salesperson. That leaves you negotiating blind. This estimator does the opposite: it gives you an honest, Twin Cities-specific installed price range for a new furnace, air conditioner, or heat pump in a few seconds, using the same variables a good contractor uses to build a quote — the type of system, its efficiency, and the size of your home.",
      "The number it returns is a **planning range, not a quote**. No online tool can price your exact job, because your home's ductwork, electrical, access, and the specific equipment you choose all move the final figure. What the range does is tell you the ballpark — so when real quotes land, you can immediately see which ones are fair, which are padded, and which are suspiciously cheap. Pair it with our [HVAC cost guide for Minnesota](/resources/hvac-cost-guide-minnesota) for the full breakdown of what drives each number.",
    ],
    whatItDoes: [
      "You choose the system you're pricing (furnace, AC, both together, or a heat pump), your home size, and an efficiency tier. The estimator returns a low-to-high installed range — equipment plus labor plus the normal parts of a standard replacement — for the Twin Cities market. It's built to answer the first question every homeowner has, \"roughly how much am I looking at?\", without a phone call or an email.",
      "Because it's built for Minnesota, the ranges reflect what actually happens here: cold-climate equipment, a heavy heating season, and local labor rates — not a national average that's often thousands of dollars off for our market.",
    ],
    whenToUse: [
      "Use it at the very start of a project, before you talk to anyone. If your furnace is aging, your AC is on its last summer, or you're simply budgeting for a replacement you know is coming, a realistic number lets you plan and save with confidence.",
      "It's also the fastest way to sanity-check a quote you've already received. If a bid lands far above or below the range, that's your cue to ask why — which is exactly what the [HVAC Quote Analyzer](/tools/hvac-quote-analyzer) helps you do line by line.",
    ],
    howItWorks: [
      `The estimator starts from a base installed range for each system type in the Twin Cities: roughly ${usdRange(COST_RANGES.furnace)} for a furnace, ${usdRange(COST_RANGES.ac)} for central AC, ${usdRange(COST_RANGES.furnaceAndAc)} for a furnace and AC replaced together, and ${usdRange(COST_RANGES.heatPump)} for a cold-climate heat pump. These bands already account for both equipment and professional installation.`,
      `It then adjusts within (and slightly beyond) that band for the two variables that move price the most: home size, because a larger home needs more capacity and often more ductwork, and efficiency, because a high-efficiency furnace (${afuePlus(FURNACE_AFUE.highEfficiency)}) or high-SEER2 AC costs more up front than a builder-grade unit. The result is a tighter range tailored to your inputs rather than a single national average.`,
    ],
    methodology: [
      "The base ranges are editorial estimates for the Twin Cities market, derived from published contractor pricing, manufacturer equipment costs, and typical local labor — reviewed and updated over time. They are deliberately expressed as wide low-to-high bands rather than a single number, because honest HVAC pricing is a range, not a point.",
      "We don't apply rebates or tax credits inside the estimate, on purpose: incentive amounts change every program year, and applying a stale figure would make the number wrong. Instead, price the equipment here, then subtract current incentives separately using the [Minnesota rebates guide](/resources/minnesota-hvac-rebates) and the [rebate checker](/tools/minnesota-hvac-rebate-checker). When our [Price Index dataset](/resources/hvac-cost-guide-minnesota) is published, these ranges will be cross-checked against collected, dated quote samples.",
    ],
    assumptions: [
      "A standard replacement in an existing home with usable ductwork — not new construction or a first-time ductwork install.",
      "Professional installation by a licensed contractor, including removal of the old equipment and a permit.",
      "Twin Cities-area labor rates; costs in greater Minnesota can differ.",
      "Equipment sized correctly for the home; an oversized system costs more and performs worse.",
      "Pricing before any utility rebate is applied (the federal 25C tax credit expired at the end of 2025).",
    ],
    limitations: [
      "It cannot see your home. Difficult access, undersized returns, electrical upgrades for a heat pump, or new venting can add cost the tool doesn't know about.",
      "It doesn't price add-ons like new ductwork, zoning, a humidifier, or indoor-air-quality equipment.",
      "It reflects typical ranges, not the cheapest or most premium ends of the market.",
      "It is not a substitute for an in-home load calculation (Manual J), which is the only way to size a system correctly.",
    ],
    examples: [
      {
        title: "Aging furnace in a 1,800 sq ft Eagan rambler",
        body: "A homeowner planning ahead prices a mid-efficiency furnace replacement and sees a range in the mid-single-thousands. Knowing that, they set a savings target, wait for an off-season quote, and use the [furnace replacement cost guide](/resources/furnace-replacement-cost) to understand which line items to expect. When two bids come in, both fall inside the range — so the decision comes down to warranty and reputation, not price anxiety.",
      },
      {
        title: "Furnace and AC failing the same year",
        body: `Replacing both together lands in the ${usdRange(COST_RANGES.furnaceAndAc)} band rather than paying two separate mobilization and labor charges. The homeowner then checks the [heat pump vs. furnace tool](/tools/heat-pump-vs-furnace) to see whether a dual-fuel setup makes sense before committing, since replacing both at once is the ideal moment to reconsider the system type.`,
      },
    ],
    commonMistakes: [
      "Treating the estimate as a quote and expecting a contractor to match it exactly — it's a planning range, not a bid.",
      "Shopping on price alone. A bid below the range is often incomplete; see what's missing with the [Quote Analyzer](/tools/hvac-quote-analyzer).",
      "Forgetting rebates and tax credits, which can meaningfully lower the real cost of high-efficiency equipment.",
      "Skipping the load calculation and letting a contractor size by rule of thumb, which leads to an oversized, short-cycling system.",
      "Comparing a builder-grade quote to a high-efficiency quote as if they're the same purchase.",
    ],
    repairVsReplace: [
      "If your current system still has years left, a replacement estimate is only half the picture — the other half is whether replacing now beats repairing. Run your situation through the [Repair or Replace calculator](/tools/repair-or-replace) and check remaining life with the [System Lifespan estimator](/tools/system-lifespan). As a rule of thumb, once a system is past its typical lifespan and a repair costs more than about a third of a new system, replacement usually wins on total cost.",
    ],
    faqs: [
      {
        q: "Is this an actual quote?",
        a: "No. It's a planning range for the Twin Cities market. Only an in-home visit and a load calculation can produce a real, binding quote for your home.",
      },
      {
        q: "Why is the range so wide?",
        a: "Because honest HVAC pricing is a range. Home size, efficiency, ductwork condition, access, and equipment brand all move the number. A single figure would be more precise-looking but less honest.",
      },
      {
        q: "Does the estimate include rebates?",
        a: "No — rebate and tax-credit amounts change yearly, so we price the equipment here and let you subtract current incentives separately using the rebates guide and rebate checker.",
      },
      {
        q: "How much does a new furnace cost in Minnesota?",
        a: `A typical installed furnace runs about ${usdRange(COST_RANGES.furnace)} in the Twin Cities, with high-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) models at the upper end. The estimator narrows that by home size and efficiency.`,
      },
      {
        q: "Is a heat pump really that much more than a furnace?",
        a: `A cold-climate heat pump (${usdRange(COST_RANGES.heatPump)} installed) costs more up front, but it both heats and cools, qualifies for the largest incentives, and lowers operating cost. The heat-pump-vs-furnace tool weighs the trade-off for a Minnesota home.`,
      },
    ],
    nextSteps: [
      "Have your ballpark? Next, understand what a fair quote should contain and pressure-test any bid you receive with the [Quote Analyzer](/tools/hvac-quote-analyzer). Before you buy high-efficiency equipment, subtract current incentives with the [rebate checker](/tools/minnesota-hvac-rebate-checker), and if you'll finance the purchase, see the monthly payment with the [financing calculator](/tools/hvac-financing-calculator). When you're ready to talk to contractors, bring the [questions every homeowner should ask](/resources/questions-to-ask-hvac-contractor).",
    ],
    relatedGuides: [
      { label: "HVAC cost guide for Minnesota", href: "/resources/hvac-cost-guide-minnesota" },
      { label: "Furnace replacement cost", href: "/resources/furnace-replacement-cost" },
      { label: "AC replacement cost", href: "/resources/ac-replacement-cost" },
      { label: "Minnesota rebates & tax credits", href: "/resources/minnesota-hvac-rebates" },
    ],
    relatedTools: ["hvac-quote-analyzer", "minnesota-hvac-rebate-checker", "hvac-financing-calculator", "heat-pump-vs-furnace"],
    relatedRebates: true,
    costSnapshot: {
      title: "Typical Twin Cities installed ranges",
      note: "Before rebates. Bars share one scale, so you can compare systems at a glance.",
      scaleMax: COST_RANGES.heatPump[1],
      bars: [
        { label: "Furnace", low: COST_RANGES.furnace[0], high: COST_RANGES.furnace[1] },
        { label: "Central AC", low: COST_RANGES.ac[0], high: COST_RANGES.ac[1] },
        { label: "Furnace + AC together", low: COST_RANGES.furnaceAndAc[0], high: COST_RANGES.furnaceAndAc[1] },
        { label: "Cold-climate heat pump", low: COST_RANGES.heatPump[0], high: COST_RANGES.heatPump[1] },
      ],
    },
  },

  "repair-or-replace": {
    overview: [
      "The hardest call an HVAC owner faces isn't which brand to buy — it's whether to keep fixing an aging system or invest in a new one. Repair another year, and you might pour money into equipment that fails next winter anyway. Replace too early, and you spend thousands you didn't need to. This calculator turns that gut decision into a data-based starting point using the same factors a trustworthy technician weighs: your system's age, the cost of the repair in front of you, and how that compares to a replacement.",
      "It won't make the decision for you, and it isn't a substitute for a technician's eyes on your equipment. What it does is cut through the pressure of the moment — often a cold night with a dead furnace — so you can see, calmly and objectively, which way the numbers lean.",
    ],
    whatItDoes: [
      "You enter the system type, its age, and the price of the repair you're considering. The tool weighs that repair cost against the system's remaining useful life and the cost of replacement, then gives you a clear lean: repair, replace, or a genuine toss-up that comes down to your budget and risk tolerance.",
      "It's designed for the two moments this question arises: an unexpected breakdown with a repair bill on the table, and proactive planning when a system is simply getting old and you're deciding whether to get ahead of it.",
    ],
    whenToUse: [
      "Use it the moment a technician hands you a repair quote on an older system, before you say yes. It's also useful during calm planning — if your furnace or AC is approaching the end of its [typical lifespan](/tools/system-lifespan), running the numbers now helps you replace on your terms instead of during an emergency in January.",
      "If the system is newer and the repair is minor, the answer is almost always \"repair,\" and the tool will say so. It earns its keep on the genuinely close calls.",
    ],
    howItWorks: [
      "The logic combines two well-known industry rules of thumb. The first is the age test: every system has a typical lifespan (roughly 15–20 years for a gas furnace, 12–15 for central AC and heat pumps), and the closer you are to it, the weaker the case for a big repair. The second is the cost test: when a repair costs more than about a third to a half of a new system, replacement usually becomes the better long-term value.",
      `A widely used shorthand is the "${usd(REPAIR_REPLACE_RULE_USD)} rule" — multiply the equipment's age by the repair cost, and if the result exceeds ${usd(REPAIR_REPLACE_RULE_USD)}, lean toward replacement. The tool blends these signals rather than relying on any single one, because a $400 repair on a 20-year-old furnace and a $1,800 repair on an 8-year-old one are very different decisions.`,
    ],
    methodology: [
      "The lifespan thresholds are industry-standard ranges, the same ones used in the [System Lifespan estimator](/tools/system-lifespan). The cost thresholds (the one-third rule, the 50% rule, and the age-times-cost heuristic) are long-standing contractor rules of thumb, not proprietary formulas — we use them because they're transparent and you can check the math yourself.",
      "Crucially, the tool leaves the numbers you can verify — the repair quote, the system's age — in your hands, and only applies the comparison. It never invents a replacement price; for that, it points you to the [cost estimator](/tools/hvac-cost-estimator) so both sides of the comparison come from figures you can see.",
    ],
    assumptions: [
      "The repair quote you enter is accurate and covers the full fix, not a temporary patch.",
      "The system has been reasonably maintained; a neglected system reaches end-of-life sooner.",
      "Typical Minnesota usage — a long, hard heating season for furnaces and heat pumps.",
      "Replacement cost is estimated separately, using the cost estimator, so both sides are comparable.",
      "Safety issues (a cracked heat exchanger, for example) override the math — those mean replace, regardless of cost.",
    ],
    limitations: [
      "It can't assess condition. A well-kept 16-year-old furnace may outlast a neglected 12-year-old one; only a technician can judge wear.",
      "It doesn't factor in efficiency gains — a new system can cut energy bills enough to change the math in favor of replacing.",
      "It doesn't know about safety defects, which are automatic replace signals a calculator can't detect.",
      "It assumes one repair; a system needing its second or third repair in a year tilts strongly toward replacement even if each repair is small.",
    ],
    examples: [
      {
        title: "$900 control board on an 18-year-old furnace",
        body: "Age × cost = 18 × 900 = $16,200, far past the $5,000 threshold, and the furnace is at the end of its [expected life](/tools/system-lifespan). The tool leans firmly toward replacement. The homeowner prices a new system with the [cost estimator](/tools/hvac-cost-estimator), checks [rebates](/tools/minnesota-hvac-rebate-checker), and plans a replacement rather than sinking $900 into equipment that may fail again.",
      },
      {
        title: "$250 capacitor on a 7-year-old AC",
        body: "Age × cost = 7 × 250 = $1,750, well under the threshold, and the unit is barely half its expected life. The tool says repair — clearly. Spending thousands to replace a system with years left would be the expensive mistake here.",
      },
    ],
    commonMistakes: [
      "Letting a high-pressure sales pitch during a breakdown push a replacement that the numbers don't support.",
      "Repairing an old system twice in one season instead of stepping back and comparing total cost to replacement.",
      "Ignoring a cracked heat exchanger or other safety defect because the repair-vs-replace math \"says repair\" — safety wins.",
      "Comparing the repair to a bargain-basement replacement quote; use a realistic installed range instead.",
      "Forgetting that a new system's lower energy bills and available rebates change the true cost of replacing.",
    ],
    repairVsReplace: [
      "The short version: repair when the system is under about 75% of its typical lifespan and the fix is modest; replace when it's past its lifespan, the repair is large, safety is in question, or you're facing repeated breakdowns. When it's a genuine toss-up, let three things break the tie — energy savings from a new high-efficiency system, available [Minnesota rebates](/resources/minnesota-hvac-rebates), and how long you plan to stay in the home. If you're staying put and the incentives are strong, replacing early often pays for itself faster than people expect.",
    ],
    faqs: [
      {
        q: `What is the ${usd(REPAIR_REPLACE_RULE_USD)} rule?`,
        a: `Multiply the equipment's age in years by the repair cost. If the result is over ${usd(REPAIR_REPLACE_RULE_USD)}, lean toward replacement. It's a quick sanity check, not a hard law — the calculator blends it with lifespan and other signals.`,
      },
      {
        q: "At what age should I stop repairing my furnace?",
        a: "There's no hard cutoff, but once a gas furnace passes about 15 years, big-ticket repairs rarely pay off, and past 20 years replacement is usually the smarter money. Central AC and heat pumps hit that point a few years sooner.",
      },
      {
        q: "Does a safety problem change the answer?",
        a: "Yes, completely. A cracked heat exchanger, a refrigerant leak in a failing compressor, or an electrical hazard means replace — regardless of what the cost math says.",
      },
      {
        q: "Should I replace my furnace and AC at the same time?",
        a: "If both are near end-of-life, replacing together saves on labor and lets you match the systems for efficiency. If only one is failing and the other is young, replace just the one that needs it.",
      },
      {
        q: "How do I know my system's real remaining life?",
        a: "Use the System Lifespan estimator for a data-based estimate from age and maintenance history, and have a technician confirm condition before a major repair.",
      },
    ],
    nextSteps: [
      "Leaning toward replacement? Price it with the [cost estimator](/tools/hvac-cost-estimator), then lower that number with current [rebates and tax credits](/tools/minnesota-hvac-rebate-checker) and see the monthly payment with the [financing calculator](/tools/hvac-financing-calculator). Leaning toward repair? Make sure the quote is fair — the [furnace repair cost](/resources/furnace-repair-cost) and [AC repair cost](/resources/ac-repair-cost) guides show what common fixes should run. Either way, get the work in writing and ask the [right questions](/resources/questions-to-ask-hvac-contractor).",
    ],
    relatedGuides: [
      { label: "Furnace repair cost", href: "/resources/furnace-repair-cost" },
      { label: "AC repair cost", href: "/resources/ac-repair-cost" },
      { label: "Furnace replacement cost", href: "/resources/furnace-replacement-cost" },
      { label: "Questions to ask an HVAC contractor", href: "/resources/questions-to-ask-hvac-contractor" },
    ],
    relatedTools: ["system-lifespan", "hvac-cost-estimator", "minnesota-hvac-rebate-checker", "hvac-quote-analyzer"],
    relatedRebates: true,
  },

  "system-lifespan": {
    overview: [
      "A dead furnace on the coldest night of the year isn't just an emergency — it's an expensive one, because you're forced to buy under pressure. Knowing roughly how much life your equipment has left turns that surprise into a plan. This estimator uses your system's age, type, and maintenance history to show where it stands against typical Minnesota lifespans, so you can budget for replacement on your terms.",
      "Nothing predicts the exact day a system will fail — maintenance, installation quality, and plain luck all play a part. But a good estimate of remaining life is one of the most useful things a homeowner can have, because it changes a reactive, panicked purchase into a deliberate, well-shopped one.",
    ],
    whatItDoes: [
      "You enter the equipment type, its age, and how well it's been maintained. The tool returns an estimate of remaining useful life and a plain-language read on where you are — plenty of runway, start planning, or replacement is likely near — plus what that means for how you should budget.",
      "It's built to be used early and repeatedly: check a system when you buy a home, when a warranty ends, and every couple of years as equipment ages, so a replacement never catches you flat-footed.",
    ],
    whenToUse: [
      "Use it when you move into a home with equipment of unknown age, when your system starts needing repairs, or simply once a year as part of planning. If the estimate shows you're within a few years of end-of-life, that's the signal to start setting money aside and watching for off-season deals — and to run the [repair-or-replace numbers](/tools/repair-or-replace) the next time a repair comes up.",
    ],
    howItWorks: [
      "The tool starts from the typical lifespan for each equipment type in a cold climate: roughly 15–20 years for a gas furnace, 12–15 for a central air conditioner, 12–15 for a heat pump (which runs year-round and so wears faster than an AC), and 15–30 for a boiler. It then adjusts remaining life up or down based on your maintenance history, because a system that's had annual tune-ups reliably outlasts one that's been ignored.",
      "The output is a range, not a countdown clock. It tells you which phase of life your equipment is in so you can act accordingly — not a false-precision expiration date.",
    ],
    methodology: [
      "The base lifespans are industry-standard figures reflecting Minnesota's demanding heating season, and they're the same ranges used by the [repair-or-replace calculator](/tools/repair-or-replace). The maintenance adjustment reflects a well-documented reality: neglected equipment — dirty coils, clogged filters, skipped tune-ups — fails years earlier than maintained equipment. When our HVAC lifespan dataset is published, these estimates will be backed by aggregated equipment-longevity data.",
      "We deliberately keep the estimate honest by expressing it as a range and pairing it with the advice to have a technician confirm condition. A calculator can estimate from age; only inspection can catch a failing part.",
    ],
    assumptions: [
      "Typical Minnesota climate and usage — a long heating season that works furnaces and heat pumps hard.",
      "The age you enter is the equipment's actual install date, not the home's build date, which can differ.",
      "Maintenance history is honestly reported; \"well maintained\" means documented annual service.",
      "The system was correctly sized and installed originally; a poor install shortens life.",
      "No known safety defect — those override lifespan entirely.",
    ],
    limitations: [
      "Age is a strong predictor but not a guarantee; individual units vary widely.",
      "It can't detect a specific failing component — a technician can.",
      "It doesn't account for a major past repair that effectively reset part of the system's life.",
      "Brand and installation quality matter and aren't captured by age alone.",
    ],
    examples: [
      {
        title: "16-year-old furnace with annual tune-ups",
        body: "At 16 years a gas furnace is near the end of its typical 15–20 year range, but a well-maintained one may have a few years left. The tool flags \"start planning.\" The homeowner begins budgeting, checks [available rebates](/tools/minnesota-hvac-rebate-checker) for a future high-efficiency upgrade, and knows that the next significant repair should trigger the [repair-or-replace decision](/tools/repair-or-replace).",
      },
      {
        title: "10-year-old AC that's never been serviced",
        body: "A central AC's typical life is 12–15 years, but a decade of skipped maintenance can pull that in. The tool shortens the estimate accordingly. The takeaway isn't panic — it's to book a tune-up now (see the [maintenance calendar](/resources/minnesota-hvac-maintenance-calendar)) and start a replacement fund, because this unit is closer to the end than its age alone suggests.",
      },
    ],
    commonMistakes: [
      "Using the home's build year instead of the equipment's install date, which can be off by a decade.",
      "Assuming a system will last the full range with no maintenance — neglect shortens life significantly.",
      "Waiting for total failure to think about replacement, which forces an emergency purchase at a bad price.",
      "Overlooking that a heat pump wears faster than an AC because it runs in winter too.",
      "Ignoring rising energy bills, which often signal a system losing efficiency near end-of-life.",
    ],
    repairVsReplace: [
      "Lifespan is the input; the [repair-or-replace calculator](/tools/repair-or-replace) is where you act on it. Once this estimator shows your system is past about three-quarters of its expected life, treat the next big repair as a replacement decision rather than an automatic fix. Getting ahead of it lets you shop in the off-season, capture [rebates](/resources/minnesota-hvac-rebates), and avoid paying an emergency premium.",
    ],
    faqs: [
      {
        q: "How long does a furnace last in Minnesota?",
        a: "A well-maintained gas furnace typically lasts 15–20 years here. Our hard heating season means furnaces work more than in milder climates, so annual maintenance matters for reaching the upper end.",
      },
      {
        q: "How long does central AC last?",
        a: "About 12–15 years for central air conditioning in Minnesota. Coastal-humidity climates can be harder on units, but our freeze-thaw cycles and neglect are the bigger local factors.",
      },
      {
        q: "Do heat pumps last as long as furnaces?",
        a: "Usually a bit less — around 12–15 years — because a heat pump both heats and cools, so it runs year-round and accumulates more hours than an AC that rests all winter.",
      },
      {
        q: "Can maintenance really extend system life?",
        a: "Yes. Documented annual tune-ups keep coils clean, airflow correct, and parts within spec, which reliably adds years compared to a neglected system.",
      },
      {
        q: "My system is old but working fine. Should I replace it?",
        a: "Not necessarily — but you should have a plan. Start a replacement fund, watch for efficiency loss, and let the next major repair trigger a formal repair-or-replace decision.",
      },
    ],
    nextSteps: [
      "If your system is nearing end-of-life, do three things now: keep it healthy with the [seasonal maintenance calendar](/resources/minnesota-hvac-maintenance-calendar), estimate a replacement budget with the [cost estimator](/tools/hvac-cost-estimator), and note the [rebates](/tools/minnesota-hvac-rebate-checker) you'll want to capture. Then, the next time a repair comes up, run the [repair-or-replace calculator](/tools/repair-or-replace) before saying yes.",
    ],
    relatedGuides: [
      { label: "Minnesota HVAC maintenance calendar", href: "/resources/minnesota-hvac-maintenance-calendar" },
      { label: "Furnace replacement cost", href: "/resources/furnace-replacement-cost" },
      { label: "AC replacement cost", href: "/resources/ac-replacement-cost" },
      { label: "Minnesota rebates & tax credits", href: "/resources/minnesota-hvac-rebates" },
    ],
    relatedTools: ["repair-or-replace", "hvac-cost-estimator", "minnesota-hvac-rebate-checker", "heat-pump-vs-furnace"],
    relatedRebates: true,
  },

  "hvac-financing-calculator": {
    overview: [
      "A new furnace, AC, or heat pump is a big number — but most homeowners don't pay it all at once. They finance it, and what actually determines whether a system fits your life isn't the sticker price, it's the monthly payment. This calculator turns a total project cost into an estimated monthly payment, and shows how the term and interest rate change both the payment and the total interest you'll pay over the life of the loan.",
      "Seeing those numbers before you sit across from a salesperson is a quiet superpower. It lets you evaluate a \"$0 down, low monthly\" financing offer for what it really costs, and it keeps you from stretching a loan so long that you pay for the equipment twice.",
    ],
    whatItDoes: [
      "You enter the amount you plan to finance, an interest rate, and a term in months or years. The calculator returns your estimated monthly payment and the total interest over the loan — the two numbers that tell you whether an offer is genuinely affordable or just made to look that way.",
      "It uses standard loan amortization, the same math a lender uses, so the estimate reflects how a real fixed-rate installment loan behaves.",
    ],
    whenToUse: [
      "Use it once you have a project cost — from a real quote or the [cost estimator](/tools/hvac-cost-estimator) — and you're deciding how to pay. It's especially valuable when comparing a contractor's financing offer against a home-equity option or a credit-union loan, because the monthly payment alone can hide a very different total cost.",
    ],
    howItWorks: [
      "The calculator applies the standard amortization formula: the monthly payment is the principal times the monthly interest rate, divided by one minus (one plus the monthly rate) raised to the negative number of payments. In plain terms, it spreads the loan plus interest evenly across every month of the term.",
      "From there, total interest is simply the sum of all payments minus what you borrowed. A longer term lowers the monthly payment but raises total interest; a lower rate cuts both. Watching those two levers move is the whole point — it makes the trade-off visible instead of abstract.",
    ],
    methodology: [
      "This is deterministic math, not an estimate — for the inputs you enter, the payment is exact. What you should treat as an assumption is the rate: promotional \"same-as-cash\" or deferred-interest offers can carry very different real costs if you don't pay them off in the promo window, so enter the true rate, not the teaser.",
      "The calculator doesn't apply rebates. Finance the net cost: subtract any [Minnesota utility rebates](/resources/minnesota-hvac-rebates) you expect to receive from the project total first, then finance what's left, so you're not borrowing money you'll get back. (Note the federal 25C credit expired at the end of 2025, so it no longer reduces the net cost of a 2026 install.)",
    ],
    assumptions: [
      "A standard fixed-rate installment loan with equal monthly payments.",
      "The interest rate you enter is the real APR, not a promotional teaser that later resets.",
      "No prepayment penalty — paying early on most HVAC loans reduces total interest.",
      "The amount financed is the net cost after any down payment, rebates, and tax credits.",
      "Fees rolled into the loan (if any) are included in the amount you enter.",
    ],
    limitations: [
      "It doesn't capture deferred-interest promotions, which can retroactively charge all the interest if not paid off in time.",
      "It doesn't compare loan types (contractor financing vs. HELOC vs. personal loan); enter each separately to compare.",
      "It doesn't account for the tax deductibility of home-equity interest, which can favor a HELOC for some homeowners.",
      "Estimated payment only — your actual lender terms, fees, and credit approval govern the final number.",
    ],
    examples: [
      {
        title: "$10,000 heat pump over 60 months",
        body: "Financing a net cost of $10,000 (after subtracting expected [rebates](/tools/minnesota-hvac-rebate-checker)) at a moderate rate over five years produces a manageable monthly payment and a modest total interest. Stretch the same loan to 120 months and the payment drops — but the total interest roughly doubles. Seeing both side by side makes the trade-off obvious.",
      },
      {
        title: "Evaluating a \"low monthly payment\" sales offer",
        body: "A contractor pitches an attractive monthly figure. Entering the amount, rate, and term reveals a 12-year loan — cheap per month, expensive overall. The homeowner asks for a shorter term and compares it to a credit-union rate, using the [questions-to-ask guide](/resources/questions-to-ask-hvac-contractor) to get the real terms in writing.",
      },
    ],
    commonMistakes: [
      "Choosing a loan by monthly payment alone and ignoring the total interest over the term.",
      "Assuming a \"0% for 18 months\" offer is free without a plan to pay it off before interest kicks in.",
      "Financing the gross price instead of the net cost after utility rebates.",
      "Stretching the term so long that you're still paying for a system near the end of its useful life.",
      "Not shopping the loan; contractor financing is convenient but not always the cheapest.",
    ],
    faqs: [
      {
        q: "How is the monthly payment calculated?",
        a: "With standard loan amortization — principal and interest spread evenly across every payment. The tool uses the same formula a lender uses, so for your inputs the payment is exact.",
      },
      {
        q: "Should I finance an HVAC system or pay cash?",
        a: "If you have the cash and no better use for it, paying cash avoids interest entirely. If financing preserves your emergency fund or the rate is very low, spreading the cost can make sense — just watch the total interest.",
      },
      {
        q: "Does a longer term save me money?",
        a: "No — it lowers the monthly payment but increases total interest. Pick the shortest term whose payment you can comfortably afford.",
      },
      {
        q: "Should I finance before or after rebates?",
        a: "After. Subtract expected utility rebates from the project cost first, then finance only the remaining balance. (The federal 25C credit expired at the end of 2025, so it no longer factors into a 2026 install.)",
      },
      {
        q: "Is contractor financing a good deal?",
        a: "Sometimes. It's convenient and occasionally subsidized, but compare it against a home-equity line or credit-union loan using their real rates before signing.",
      },
    ],
    nextSteps: [
      "Don't have a project cost yet? Start with the [cost estimator](/tools/hvac-cost-estimator). Buying high-efficiency equipment? Subtract [rebates and tax credits](/tools/minnesota-hvac-rebate-checker) before you finance. And when a contractor presents a financing offer, get the rate, term, and any promotional fine print in writing — the [questions to ask an HVAC contractor](/resources/questions-to-ask-hvac-contractor) guide covers exactly what to request.",
    ],
    relatedGuides: [
      { label: "HVAC cost guide for Minnesota", href: "/resources/hvac-cost-guide-minnesota" },
      { label: "Minnesota rebates & tax credits", href: "/resources/minnesota-hvac-rebates" },
      { label: "Questions to ask an HVAC contractor", href: "/resources/questions-to-ask-hvac-contractor" },
    ],
    relatedTools: ["hvac-cost-estimator", "minnesota-hvac-rebate-checker", "hvac-quote-analyzer"],
    relatedRebates: true,
  },

  "heat-pump-vs-furnace": {
    overview: [
      "Heat pumps have quietly become a genuinely good option for Minnesota homes — modern cold-climate models heat efficiently well below zero, and they earn the largest incentives available. But they aren't right for every home or every priority, and the internet is full of advice written for milder climates. This tool asks a few questions about your home, your current system, and what you care about, and gives you an honest, cold-climate-specific lean toward a heat pump, a furnace, or a dual-fuel system that pairs the two.",
      "The goal isn't to sell you on a heat pump — it's to reason through the trade-off the way an unbiased advisor would, with the reasoning spelled out so you can walk into contractor conversations with confidence rather than a sales pitch.",
    ],
    whatItDoes: [
      "You answer a short set of questions — your current heating fuel, whether you also need cooling, your priorities around cost and carbon, and your appetite for a larger upfront investment. The tool weighs those against how each system performs in Minnesota and returns a recommendation with the logic behind it.",
      "It's especially useful at replacement time, when you're already spending on new equipment and it's the natural moment to reconsider the system type rather than defaulting to a like-for-like swap.",
    ],
    whenToUse: [
      "Use it when your furnace or AC is nearing the end of its [useful life](/tools/system-lifespan), when you're building or renovating, or whenever high energy bills or climate goals have you wondering whether a heat pump makes sense. If you're replacing both a furnace and an AC at once, this is the single best moment to run it — you're already buying two systems, so the dual-fuel question is squarely on the table.",
    ],
    howItWorks: [
      "The tool weighs the factors that actually decide this in a cold climate: whether you already need air conditioning (a heat pump provides both heating and cooling in one system), your existing fuel and its cost, how cold your home gets and how well it's insulated, and your priorities on upfront cost, operating cost, and emissions. It then leans toward the option that best fits — often a dual-fuel setup, where a heat pump handles the majority of the season efficiently and a gas furnace takes over on the coldest days.",
      "Because a heat pump both heats and cools, it's frequently compared against buying a furnace and an AC together — which is why the honest comparison, and the incentives, often look better than a first glance suggests.",
    ],
    methodology: [
      `The recommendation logic reflects cold-climate HVAC guidance: cold-climate (ccASHP) heat pumps maintain useful heating output well below 0°F, and dual-fuel systems are a common Minnesota answer because they capture heat-pump efficiency in the shoulder seasons while keeping a furnace's brute-force heat for deep cold. We frame incentives qualitatively — heat pumps still draw the largest utility rebates in Minnesota (the federal 25C credit that once added up to ${usd(FEDERAL_25C.capHeatPumpUsd)} expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}) — and send you to the [rebates guide](/resources/minnesota-hvac-rebates), [rebate database](/minnesota-hvac-rebate-database), and [rebate checker](/tools/minnesota-hvac-rebate-checker) for current amounts rather than quoting figures that change yearly.`,
      "The tool doesn't model your exact energy bills, because that depends on your rates, usage, and insulation. It gives a directional recommendation and the reasoning; a contractor's load calculation and an energy model refine it.",
    ],
    assumptions: [
      "A Minnesota cold climate with a long heating season and real sub-zero stretches.",
      "\"Heat pump\" means a modern cold-climate model, not an older standard heat pump that struggles in deep cold.",
      "Electrical service can accommodate a heat pump, or the cost to upgrade it is considered separately.",
      "If you need cooling, that's counted in the heat pump's favor since it replaces two systems with one.",
      "Incentive availability is directional; confirm current amounts with the rebate tools.",
    ],
    limitations: [
      "It doesn't calculate your exact operating cost, which depends on your electric and gas rates and your home's efficiency.",
      "It doesn't size equipment or assess whether your ductwork and electrical are heat-pump ready.",
      "It gives a lean, not a verdict — a good installer's load calculation and energy model refine the decision.",
      "Rate structures and incentives change and can shift the economics over time.",
    ],
    examples: [
      {
        title: "Furnace and AC both failing, gas home",
        body: "Because the homeowner needs both heating and cooling, a heat pump replaces two systems with one and captures the largest [incentives](/tools/minnesota-hvac-rebate-checker). The tool leans dual-fuel: the heat pump does most of the season efficiently, the new furnace covers the coldest days. They price it with the [cost estimator](/tools/hvac-cost-estimator) and finance the net cost after rebates.",
      },
      {
        title: "Working furnace, just need AC",
        body: "With a healthy furnace and only a cooling need, the tool weighs a straight AC against adding a heat pump for the efficiency and incentives. If the furnace has years of [life left](/tools/system-lifespan), a heat pump added as the cooling system can also cut heating bills in the shoulder seasons — a genuinely appealing option the homeowner might not have considered.",
      },
    ],
    commonMistakes: [
      "Assuming heat pumps \"don't work in Minnesota\" based on old technology — cold-climate models are a different product.",
      "Comparing a heat pump only to a furnace, forgetting it also replaces the air conditioner.",
      "Ignoring dual-fuel, which is often the best Minnesota answer rather than an all-or-nothing choice.",
      "Overlooking the electrical panel; some homes need an upgrade to add a heat pump.",
      "Skipping the incentives, which are largest for heat pumps and materially change the comparison.",
    ],
    faqs: [
      {
        q: "Do heat pumps actually work in Minnesota winters?",
        a: "Modern cold-climate heat pumps heat effectively even below -13°F. Many Minnesota homes pair one with a gas furnace in a dual-fuel setup so the furnace handles the very coldest days.",
      },
      {
        q: "What is a dual-fuel system?",
        a: "A heat pump and a gas furnace working together. The heat pump handles most of the heating season efficiently, and the furnace automatically takes over below a set temperature. It's a popular Minnesota compromise.",
      },
      {
        q: "Is a heat pump cheaper to run than a furnace?",
        a: "Often, for much of the season — a heat pump moves heat rather than burning fuel, so it delivers more heat per dollar in milder temperatures. In deep cold, a gas furnace can be cheaper, which is why dual-fuel exists.",
      },
      {
        q: "Why do heat pumps get bigger rebates?",
        a: "Because utilities and the federal government are incentivizing electrification and efficiency. Heat pumps currently draw the largest combined incentives — check current amounts with the rebate tools.",
      },
      {
        q: "Should I replace my furnace and AC with one heat pump?",
        a: "If both are failing and you want cooling, one heat pump (or a dual-fuel pairing) can replace both. It's the ideal moment to consider it, since you're already buying two systems.",
      },
    ],
    nextSteps: [
      "Leaning toward a heat pump or dual-fuel system? Price it with the [cost estimator](/tools/hvac-cost-estimator), then capture the substantial [heat pump rebates and tax credits](/tools/minnesota-hvac-rebate-checker) — they're the largest incentives available. Read the [heat pump service overview](/services/heat-pumps) to understand what a proper cold-climate install requires, and bring the [right questions](/resources/questions-to-ask-hvac-contractor) so any installer proves they size and set up heat pumps correctly.",
    ],
    relatedGuides: [
      { label: "Heat pump cost in Minnesota", href: "/resources/heat-pump-replacement-cost" },
      { label: "Heat pumps in Minnesota", href: "/services/heat-pumps" },
      { label: "Minnesota rebates & tax credits", href: "/resources/minnesota-hvac-rebates" },
      { label: "HVAC cost guide for Minnesota", href: "/resources/hvac-cost-guide-minnesota" },
    ],
    relatedTools: ["hvac-cost-estimator", "minnesota-hvac-rebate-checker", "system-lifespan", "hvac-financing-calculator"],
    relatedRebates: true,
  },

  "hvac-quote-analyzer": {
    overview: [
      "The single most expensive mistake homeowners make isn't overpaying — it's comparing two quotes that aren't actually comparable. A bid that looks $2,000 cheaper is often cheaper because it leaves something out: the permit, the load calculation, the labor warranty, or the exact equipment model. This analyzer scores how complete a furnace, AC, or heat pump quote is against the items a trustworthy, comparable quote should contain, and hands you the exact questions to ask about anything that's missing.",
      "It's the tool we'd want a friend to use before signing. It doesn't tell you a price is too high — it tells you whether you have enough information to judge the price at all, which is the real problem most homeowners face.",
    ],
    whatItDoes: [
      "You enter what your quote includes — the equipment and which of the key elements are spelled out — and the analyzer returns a completeness score, a plain read on how comparable the quote is, and a tailored list of questions to close the gaps. Run it on each competing bid and you can finally compare apples to apples.",
      "It also gives price context: whether the number sits inside the typical Twin Cities range for that system, so an outlier — high or suspiciously low — gets flagged for a closer look.",
    ],
    whenToUse: [
      "Use it the moment a quote lands in your inbox, and again on every competing bid before you choose. The highest-value moment is right before you sign: a two-minute completeness check can surface the missing permit or the vague equipment model that would have cost you far more later.",
    ],
    howItWorks: [
      "The analyzer checks a quote against ten elements that separate a professional, comparable bid from a napkin number: the exact equipment make and model, the efficiency rating (AFUE or SEER2), a load calculation or sizing justification, whether the permit is included, the labor warranty length, the manufacturer parts warranty and registration, a line-item breakdown of equipment versus labor, old-equipment removal and disposal, the full price in writing, and the timeline. Each item present raises the completeness score; each item missing becomes a specific question to ask.",
      "Alongside the score, it compares the quote amount to the typical installed range for that system type in the Twin Cities, so you get both a completeness read and a rough price sanity check in one place.",
    ],
    methodology: [
      "The ten-item checklist reflects what a fair, comparable HVAC quote contains — the same standard behind the [questions-to-ask-a-contractor guide](/resources/questions-to-ask-hvac-contractor) and the printable [Buyer's Kit](/minnesota-hvac-buyers-kit). The price context uses the same Twin Cities ranges as the [cost estimator](/tools/hvac-cost-estimator), so the two tools tell a consistent story.",
      "The analyzer deliberately scores completeness, not price fairness, because completeness is knowable from the document while true fairness depends on your specific home. A complete quote lets you judge price yourself; an incomplete one hides the very details price depends on.",
    ],
    assumptions: [
      "You're comparing quotes for the same scope of work — like-for-like equipment and the same job.",
      "The quote is a written document, not a verbal estimate; verbal numbers can't be analyzed or held to.",
      "A higher completeness score means a more comparable quote, not automatically a lower price.",
      "Price context uses typical Twin Cities ranges; your exact home can justify a figure above or below.",
    ],
    limitations: [
      "It can't verify that what a quote claims is true — only that the quote states it. Confirm the license, insurance, and warranty independently.",
      "It doesn't judge installation quality, which depends on the crew, not the paperwork.",
      "A complete quote can still be overpriced; use the price context and multiple bids to judge value.",
      "It relies on your reading of the quote; if an item is ambiguous, treat it as missing and ask.",
    ],
    examples: [
      {
        title: "The \"$2,000 cheaper\" bid that wasn't",
        body: "Two quotes, one clearly cheaper. Running both, the cheap one scores low — no permit, no model number, no labor warranty stated. Those omissions are exactly why it's cheaper. The homeowner asks the analyzer's generated questions, the \"cheap\" bid's number rises once the missing items are added, and the two quotes turn out to be nearly identical. See the same logic in the [furnace replacement cost](/resources/furnace-replacement-cost) guide.",
      },
      {
        title: "A complete quote at the top of the range",
        body: "A quote lands above the typical range and the homeowner nearly walks. But it scores a perfect ten — premium variable-speed equipment, a long labor warranty, a documented load calculation. The price context plus the completeness score reveal it's not padding, it's a genuinely higher-spec job. Now the decision is an informed one.",
      },
    ],
    commonMistakes: [
      "Comparing quotes on the bottom-line number without checking whether they cover the same scope.",
      "Accepting a verbal estimate; if it isn't in writing, it can't be analyzed or enforced.",
      "Ignoring a missing permit — pulling it is the contractor's job and protects you at resale.",
      "Overlooking the labor warranty, which is separate from the manufacturer's parts warranty and varies widely.",
      "Assuming the cheapest complete quote is best; weigh warranty, reputation, and equipment quality too.",
    ],
    faqs: [
      {
        q: "How do I know if an HVAC quote is fair?",
        a: "First make sure it's complete — exact model, efficiency rating, permit, warranties, line items, and the full price in writing. A complete quote lets you compare against others and against the typical price range. The analyzer scores that completeness and flags what's missing.",
      },
      {
        q: "What should a furnace or AC quote include?",
        a: "Make and model numbers, AFUE/SEER2 ratings, a load calculation, the permit, labor and parts warranties, an equipment-vs-labor breakdown, old-equipment removal, the full written price, and a timeline. Missing items are questions to ask before signing.",
      },
      {
        q: "Why does a load calculation matter?",
        a: "It's how a contractor sizes the system to your actual home. Without it (a Manual J), they're guessing — and an oversized system costs more, short-cycles, and wears out faster.",
      },
      {
        q: "Is the cheapest quote usually a bad sign?",
        a: "Not always, but a suspiciously low quote is often low because it's incomplete. Score it — if it's missing the permit, warranty, or model, that's why it's cheap.",
      },
      {
        q: "Does a high completeness score mean a good price?",
        a: "It means a comparable, trustworthy quote — not necessarily the lowest price. Use the price context and at least two or three complete quotes to judge value.",
      },
    ],
    nextSteps: [
      "Once your quotes are complete and comparable, sanity-check the numbers against the [cost estimator](/tools/hvac-cost-estimator), lower your net cost with [rebates and tax credits](/tools/minnesota-hvac-rebate-checker), and if you're financing, see the payment with the [financing calculator](/tools/hvac-financing-calculator). Bring the full [Buyer's Kit](/minnesota-hvac-buyers-kit) and the [questions to ask](/resources/questions-to-ask-hvac-contractor) to every contractor conversation.",
    ],
    relatedGuides: [
      { label: "Questions to ask an HVAC contractor", href: "/resources/questions-to-ask-hvac-contractor" },
      { label: "Free Minnesota HVAC Buyer's Kit", href: "/minnesota-hvac-buyers-kit" },
      { label: "Furnace replacement cost", href: "/resources/furnace-replacement-cost" },
      { label: "AC replacement cost", href: "/resources/ac-replacement-cost" },
    ],
    relatedTools: ["hvac-cost-estimator", "minnesota-hvac-rebate-checker", "hvac-financing-calculator", "repair-or-replace"],
    relatedRebates: true,
  },

  "minnesota-hvac-rebate-checker": {
    overview: [
      "Minnesota homeowners leave real money on the table every year, not because they don't qualify for rebates, but because the incentives are scattered across two utilities and a pending state program, and nobody hands you a single list. This checker fixes the discovery problem: tell it your electric and gas providers and what you're planning to install, and it routes you straight to the utility rebate programs you most likely qualify for — and flags what's expired or pending (including the now-ended federal credit) so you don't chase the wrong incentive.",
      "It's deliberately a **program router, not a dollar calculator**. Rebate amounts change every program year, so instead of quoting a figure that could be wrong next month, it names the programs that apply and sends you to the source to confirm the current amount. That keeps it accurate over time and means it never invents a number.",
    ],
    whatItDoes: [
      "You pick your electric utility (Xcel Energy or another provider), your gas utility (CenterPoint Energy, another provider, or none), and the equipment you're considering — a high-efficiency furnace, central AC, cold-climate heat pump, or smart thermostat. It returns the utility and federal programs that commonly apply to that combination, with a plain-language note on each and a link to verify the current amount.",
      "Think of it as the map: it tells you which doors to knock on, so you don't miss the CenterPoint furnace rebate or the federal heat-pump credit simply because you didn't know it existed.",
    ],
    whenToUse: [
      "Use it before you buy any high-efficiency equipment — ideally while you're still choosing a system, because the incentives can change which option is the best value. Heat pumps in particular draw the largest combined incentives, which is often the deciding factor in the [heat-pump-vs-furnace decision](/tools/heat-pump-vs-furnace).",
    ],
    howItWorks: [
      "The checker maps your utility and equipment selections to the programs that commonly apply in Minnesota: electric-side rebates from Xcel (central AC, heat pumps, smart thermostats) and gas-side rebates from CenterPoint (high-efficiency furnaces). It also flags that the federal Energy Efficient Home Improvement Credit (25C) expired at the end of 2025, so you aren't sent chasing an incentive you can no longer use on a 2026 install.",
      "It intentionally stops short of quoting exact dollars. For each program it tells you where to confirm the current amount — because a rebate figure that's right today may be revised at the start of the next program year, and a stale number is worse than no number.",
    ],
    methodology: [
      `Program routing is based on the published incentive structures of Xcel Energy and CenterPoint Energy, and mirrors the [Minnesota rebates guide](/resources/minnesota-hvac-rebates) and the [rebate database](/minnesota-hvac-rebate-database). The federal 25C credit that once applied (${FEDERAL_25C.ratePct}% of cost up to annual caps) expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}; the tool notes this rather than routing you to an incentive you can no longer use.`,
      "This design is a deliberate accuracy choice. Our [Rebate Database](/minnesota-hvac-rebate-database) tracks each program's status and links to the primary source. Because utility amounts change often — and can't always be verified from those sources on demand — the checker names the program and sends you to the official page rather than quoting a figure that might be stale.",
    ],
    assumptions: [
      "You're installing qualifying high-efficiency equipment; base-efficiency models often don't qualify.",
      "Your utilities are correctly identified — programs are utility-specific.",
      "Rebate and credit amounts are confirmed at the source before you rely on them.",
      "The federal 25C tax credit expired December 31, 2025 and is not available for 2026 installations (only claimable for qualifying equipment installed on or before that date).",
      "Programs and amounts change by program year; the router reflects what commonly applies, not a locked figure.",
    ],
    limitations: [
      "It routes to programs; it does not quote current dollar amounts, which you must verify at the source.",
      "It covers the major Minnesota utility and federal programs, not every local co-op or one-off promotion.",
      "It can't confirm your individual eligibility — income-qualified and equipment-specific rules apply.",
      "Tax-credit value depends on your tax situation; confirm with a professional.",
    ],
    examples: [
      {
        title: "Xcel + CenterPoint home installing a heat pump and smart thermostat",
        body: "The checker returns the Xcel air-source heat pump rebate and a smart-thermostat rebate, and notes that the federal 25C credit expired at the end of 2025. The homeowner confirms current amounts via the [rebate database](/minnesota-hvac-rebate-database), subtracts them from the [cost estimate](/tools/hvac-cost-estimator), and finances only the net.",
      },
      {
        title: "Gas furnace replacement, CenterPoint customer",
        body: `For a high-efficiency (${afuePlus(FURNACE_AFUE.highEfficiency)}) furnace, the checker surfaces the CenterPoint furnace rebate. The homeowner asks the installer to confirm the qualifying model numbers and who files the utility paperwork — a question straight from the [contractor questions guide](/resources/questions-to-ask-hvac-contractor).`,
      },
    ],
    commonMistakes: [
      "Buying the equipment before checking incentives, then discovering a more efficient model would have qualified for hundreds more.",
      "Assuming any high-efficiency unit qualifies — programs specify exact efficiency ratings and model lists.",
      "Missing the gas-side rebate because you only checked your electric utility (or vice versa).",
      "Forgetting to ask who files the rebate paperwork; a good contractor usually handles utility rebates for you.",
      "Treating a rebate figure you read months ago as current — always confirm the amount for this program year.",
    ],
    faqs: [
      {
        q: "Why doesn't the tool show exact rebate amounts?",
        a: "Because they change every program year. Quoting a figure that could be revised next month would make the tool wrong. Instead it names the programs that apply and links you to the source to confirm the current amount.",
      },
      {
        q: "What HVAC rebates are available in Minnesota?",
        a: "Broadly: Xcel Energy rebates on qualifying AC, heat pumps, and smart thermostats, and CenterPoint Energy rebates on high-efficiency furnaces. The federal 25C tax credit expired at the end of 2025 and isn't available for 2026 installs; watch for Minnesota's pending state program. See the rebate database for each program's current status.",
      },
      {
        q: "Is there still a federal tax credit for HVAC?",
        a: "No — the federal 25C Energy Efficient Home Improvement Credit expired December 31, 2025 and isn't available for equipment installed in 2026 or later. It can only be claimed for qualifying equipment installed on or before that date, on your 2025 return. For 2026, focus on Xcel and CenterPoint utility rebates and the pending state program.",
      },
      {
        q: "Who files the rebate paperwork?",
        a: "Usually your installing contractor files utility rebates on your behalf. (The federal 25C credit — for equipment installed through 2025 only — was claimed by the homeowner on their own tax return using the equipment documentation.)",
      },
      {
        q: "Do heat pumps really get the biggest incentives?",
        a: `Heat pumps still draw the largest utility rebates in Minnesota, a big reason cold-climate heat pumps have surged here. (The federal credit that once added up to ${usd(FEDERAL_25C.capHeatPumpUsd)} expired at the end of ${FEDERAL_25C_EXPIRATION_YEAR}, so a 2026 heat pump relies on utility rebates and the pending state program.)`,
      },
    ],
    nextSteps: [
      "Found your programs? Read the [Minnesota rebates and tax credits guide](/resources/minnesota-hvac-rebates) to understand how to stack them, then subtract the incentives from your [cost estimate](/tools/hvac-cost-estimator) and finance only the net with the [financing calculator](/tools/hvac-financing-calculator). If you're still choosing a system, the incentives may tip the [heat-pump-vs-furnace decision](/tools/heat-pump-vs-furnace).",
    ],
    relatedGuides: [
      { label: "Minnesota rebates & tax credits", href: "/resources/minnesota-hvac-rebates" },
      { label: "HVAC cost guide for Minnesota", href: "/resources/hvac-cost-guide-minnesota" },
      { label: "Heat pumps in Minnesota", href: "/services/heat-pumps" },
      { label: "Questions to ask an HVAC contractor", href: "/resources/questions-to-ask-hvac-contractor" },
    ],
    relatedTools: ["heat-pump-vs-furnace", "hvac-cost-estimator", "hvac-financing-calculator", "hvac-quote-analyzer"],
    relatedRebates: false,
  },
};

export function getToolContent(slug: string): ToolContent | undefined {
  return toolContent[slug];
}
