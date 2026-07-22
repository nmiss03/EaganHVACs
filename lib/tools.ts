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
}

export const tools: readonly ToolMeta[] = [
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
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}
