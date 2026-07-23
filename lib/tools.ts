import type { IconName } from "@/components/ui/Icon";

export interface ToolMeta {
  slug: string;
  icon: IconName;
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  /** Human-readable last-reviewed date, shown via <LastUpdated>. */
  updated: string;
}

export const tools: readonly ToolMeta[] = [
  {
    slug: "hvac-quote-analyzer",
    icon: "clipboard",
    title: "HVAC Quote Analyzer",
    short:
      "Paste in what your contractor's quote includes and get a completeness score plus the exact questions to ask before you sign.",
    metaTitle: "HVAC Quote Analyzer | Is Your Furnace/AC Quote Complete?",
    metaDescription:
      "Free HVAC quote analyzer. Check whether a furnace, AC, or heat pump quote is complete and comparable, get a completeness score, and see the exact questions to ask.",
    h1: "HVAC Quote Analyzer",
    intro: [
      "Got a quote for a new furnace, AC, or heat pump? Before you sign, find out whether it actually gives you enough to compare fairly. This free analyzer scores your quote's completeness and hands you the exact questions to ask the contractor about anything that's missing.",
    ],
    updated: "July 2026",
  },
  {
    slug: "hvac-cost-estimator",
    icon: "dollar",
    title: "HVAC Cost Estimator",
    short:
      "See a real Twin Cities price range for a new furnace, AC, or heat pump before you talk to anyone.",
    metaTitle: "HVAC Cost Estimator | Furnace & AC Replacement Prices MN",
    metaDescription:
      "Free HVAC cost estimator for the Twin Cities. Get a real installed price range for a new furnace, AC, or heat pump by home size and efficiency — no phone call required.",
    h1: "HVAC Cost Estimator for the Twin Cities",
    intro: [
      "Most HVAC websites won't show you a price until you're on the phone. This free estimator gives you an honest, Twin Cities-specific installed price range for a new furnace, air conditioner, or heat pump in seconds — so you walk into your quotes already knowing the ballpark and can spot a fair one.",
    ],
    updated: "July 2026",
  },
  {
    slug: "repair-or-replace",
    icon: "gauge",
    title: "Repair or Replace Calculator",
    short: "Should you fix your system or replace it? Get a data-based answer in 30 seconds.",
    metaTitle: "Repair or Replace HVAC Calculator | Free Decision Tool",
    metaDescription:
      "Should you repair or replace your furnace or AC? This free calculator uses system age and repair cost to give you a clear, honest recommendation.",
    h1: "Repair or Replace? HVAC Decision Calculator",
    intro: [
      "One of the hardest calls a homeowner faces is whether to keep repairing an aging furnace or air conditioner — or invest in a replacement. This free tool applies the industry rules of thumb (system age, repair cost, and typical lifespan) to give you a clear, unbiased starting point in about 30 seconds.",
    ],
    updated: "July 2026",
  },
  {
    slug: "system-lifespan",
    icon: "clock",
    title: "HVAC Lifespan Estimator",
    short: "See how many years of life your furnace, AC, or heat pump likely has left.",
    metaTitle: "HVAC Lifespan Calculator | How Long Will My System Last?",
    metaDescription:
      "Estimate how many years of life your furnace, AC, heat pump, or boiler has left, based on typical Minnesota lifespans and your maintenance history.",
    h1: "HVAC Lifespan Estimator",
    intro: [
      "Knowing roughly how much life your equipment has left turns a stressful surprise into a plan. This estimator uses typical Minnesota lifespans and your maintenance history to show where your system stands — so you can budget for replacement on your terms instead of during an emergency.",
    ],
    updated: "July 2026",
  },
  {
    slug: "hvac-financing-calculator",
    icon: "dollar",
    title: "HVAC Financing Calculator",
    short:
      "Estimate the monthly payment on a new furnace, AC, or heat pump — and see how term and rate change it.",
    metaTitle: "HVAC Financing Calculator | Monthly Payment Estimator",
    metaDescription:
      "Free HVAC financing calculator. Estimate your monthly payment on a new furnace, AC, or heat pump by amount, term, and rate — and see total interest before you finance.",
    h1: "HVAC Financing & Monthly Payment Calculator",
    intro: [
      "A new system is a big number, but most homeowners don't pay it all at once — they finance it, and what actually matters is the monthly payment. This free calculator shows your estimated payment by amount, term, and rate, so you can see what fits your budget before you talk to anyone.",
    ],
    updated: "July 2026",
  },
  {
    slug: "heat-pump-vs-furnace",
    icon: "gauge",
    title: "Heat Pump vs. Furnace Tool",
    short:
      "Answer a few questions and get a clear, Minnesota-specific lean between a heat pump, a furnace, or a dual-fuel system.",
    metaTitle: "Heat Pump vs Furnace Minnesota | Free Decision Tool",
    metaDescription:
      "Should you get a heat pump or a furnace in Minnesota? Answer a few questions and get an honest, cold-climate-specific recommendation — plus rebates and next steps.",
    h1: "Heat Pump vs. Furnace: Minnesota Decision Tool",
    intro: [
      "Heat pumps have become a genuinely good option for Minnesota homes — but they aren't right for every home or every priority. This tool asks a few quick questions and gives you an honest, cold-climate-specific lean, with the reasoning spelled out so you can talk to contractors with confidence.",
    ],
    updated: "July 2026",
  },
  {
    slug: "minnesota-hvac-rebate-checker",
    icon: "badgeCheck",
    title: "Minnesota HVAC Rebate Checker",
    short:
      "Tell us your utility and what you're installing, and see the Xcel, CenterPoint, and federal rebate programs you likely qualify for.",
    metaTitle: "Minnesota HVAC Rebate Checker | Xcel & CenterPoint Rebates",
    metaDescription:
      "Free Minnesota HVAC rebate checker. Pick your utility and equipment to see the Xcel Energy, CenterPoint Energy, and federal tax-credit programs you likely qualify for on a new furnace, AC, or heat pump.",
    h1: "Minnesota HVAC Rebate Checker",
    intro: [
      "Minnesota homeowners leave real money on the table because rebates are scattered across utilities and the federal tax code. Tell us who your electric and gas providers are and what you're planning to install, and this free tool routes you straight to the Xcel Energy, CenterPoint Energy, and federal programs that most likely apply — so you know what to ask about before you sign.",
    ],
    updated: "July 2026",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}
