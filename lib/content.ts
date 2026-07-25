import type { IconName } from "@/components/ui/Icon";
import { services, site } from "@/lib/site";
import { LIFESPANS, SMART_THERMOSTAT_SAVINGS_PCT } from "@/lib/hvac-data";

/**
 * Long-form, locally-relevant content for the programmatic service and
 * location landing pages. Each entry is written to be genuinely unique so
 * pages rank on their own merits rather than reading as thin/doorway pages.
 */

export interface ServiceDetail {
  slug: string;
  icon: IconName;
  /** Short label used in cards and nav. */
  title: string;
  /** Page <h1>. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string[];
  /** "Signs you need this service" checklist. */
  signs: string[];
  /** What's included / what a pro will do. */
  included: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

const iconBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s.icon])
) as Record<string, IconName>;

export const serviceDetails: readonly ServiceDetail[] = [
  {
    slug: "furnace-repair",
    icon: iconBySlug["furnace-repair"] ?? "flame",
    title: "Furnace & Heating Repair",
    h1: "Furnace Repair in Eagan, MN: Costs, Causes & Hiring Guide",
    metaTitle: "Furnace Repair in Eagan, MN | Costs, Causes & Finding a Pro",
    metaDescription:
      "Furnace not heating in Eagan, MN? An independent guide to what's likely wrong, what furnace and heating repair costs in the south metro, and how to find same-day or 24/7 emergency help from a licensed local contractor.",
    tagline: "No heat is an emergency in a Minnesota winter — here's how to get it fixed right, for a fair price.",
    intro: [
      "When your furnace quits on a sub-zero January night, you need to know what's wrong and what a fair fix costs before you call anyone. This guide covers the common causes of a no-heat furnace, what heating repairs typically run in the Twin Cities, and how to find a licensed local contractor who offers same-day and 24/7 emergency service for every make and model.",
      "From a furnace blowing cold air to short cycling, strange noises, a tripping limit switch, or a system that won't ignite at all, a local pro will diagnose the real problem, explain it in plain language, and give you an upfront price before any work begins — no scare tactics, no surprise fees.",
    ],
    signs: [
      "Furnace is blowing cold or lukewarm air",
      "No heat at all, or the system won't turn on",
      "Frequent cycling on and off (short cycling)",
      "Banging, rattling, or grinding noises",
      "Yellow burner flame instead of blue",
      "Rising heating bills with no change in usage",
    ],
    included: [
      {
        title: "Complete diagnostic",
        description:
          "A technician tests the ignitor, flame sensor, blower motor, gas valve, and control board to find the true cause — not just the symptom.",
      },
      {
        title: "Upfront, written estimate",
        description:
          "You approve a clear price before any repair starts. The diagnostic fee is often applied toward the cost of the fix.",
      },
      {
        title: "Safety inspection",
        description:
          "Every no-heat visit includes a carbon-monoxide and heat-exchanger safety check to keep your family protected.",
      },
    ],
    faqs: [
      {
        question: "How fast can someone repair my furnace?",
        answer:
          "For no-heat emergencies during winter, most Twin Cities HVAC companies offer same-day and 24/7 service — call a licensed local contractor directly and they'll prioritize it. Most non-emergency repairs are scheduled within 1–2 business days.",
      },
      {
        question: "Is it worth repairing an older furnace?",
        answer:
          `If your furnace is under ${LIFESPANS.furnace.low} years old and the repair costs less than about a third of a new system, repair usually makes sense. A technician can show you real numbers for both repair and replacement so you can decide with no pressure.`,
      },
      {
        question: "Why is my furnace blowing cold air?",
        answer:
          "Common causes include a dirty flame sensor, a failed ignitor, a thermostat set to the wrong mode, or an overheating system shutting down the burners. A quick diagnostic pinpoints which one it is.",
      },
    ],
  },
  {
    slug: "ac-repair",
    icon: iconBySlug["ac-repair"] ?? "snowflake",
    title: "AC Repair & Service",
    h1: "AC Repair in Eagan, MN: Costs, Causes & Hiring Guide",
    metaTitle: "AC Repair in Eagan, MN | Costs, Causes & Finding a Pro",
    metaDescription:
      "AC not cooling in Eagan, MN? An independent guide to the common causes, what air conditioning repair costs across all makes and models, and how to find a licensed local contractor with upfront pricing.",
    tagline: "When a heat wave hits, a warm house gets miserable fast — here's how to get cooling back without overpaying.",
    intro: [
      "Minnesota summers swing from mild to sweltering in a matter of hours, and a failed air conditioner turns a comfortable home into a sauna. This guide explains what usually goes wrong, what a fair AC repair costs in the Twin Cities, and how to find a licensed local contractor offering same-day service across Eagan and the surrounding communities.",
      "Whether your system is blowing warm air, leaking water, freezing up, tripping the breaker, or simply not turning on, a trusted pro will find the root cause — low refrigerant, a failed capacitor, a dirty coil, a bad compressor — and quote an honest price before starting any repair.",
    ],
    signs: [
      "AC is running but the air isn't cold",
      "Weak airflow from the vents",
      "Warm and cold rooms throughout the house",
      "Ice on the refrigerant lines or indoor coil",
      "Water pooling around the indoor unit",
      "Loud or repeated clicking, buzzing, or humming",
    ],
    included: [
      {
        title: "Full system check",
        description:
          "The technician measures refrigerant, tests the capacitor and contactor, inspects the coils, and checks airflow to isolate the fault.",
      },
      {
        title: "Honest repair-or-replace advice",
        description:
          "If your system is near end of life, you'll get straight numbers on both repair and replacement — never a hard upsell.",
      },
      {
        title: "All makes and models",
        description:
          "Carrier, Trane, Lennox, Goodman, Rheem, Amana and more — most local HVAC companies service every major brand, so brand alone rarely limits your choice of contractor.",
      },
    ],
    faqs: [
      {
        question: "Can you fix my AC the same day?",
        answer:
          "In most cases yes. During summer, most Twin Cities HVAC companies prioritize no-cooling calls and carry common parts for on-the-spot repairs — ask about same-day availability when you call.",
      },
      {
        question: "Why is my AC running but not cooling?",
        answer:
          "The usual suspects are low refrigerant from a leak, a failed run capacitor, a frozen evaporator coil, or a dirty condenser. A diagnostic quickly identifies which and what the fix costs.",
      },
      {
        question: "How much does AC repair cost?",
        answer:
          "It depends on the part and the system, which is why you always get an upfront written estimate before work begins. Simple fixes like a capacitor are inexpensive; compressor or coil work costs more.",
      },
    ],
  },
  {
    slug: "installation-replacement",
    icon: iconBySlug["installation-replacement"] ?? "gauge",
    title: "Installation & Replacement",
    h1: "Furnace & AC Installation in Eagan, MN: Cost & Buying Guide",
    metaTitle: "Furnace & AC Installation in Eagan, MN | Cost & Buying Guide",
    metaDescription:
      "Replacing your furnace or AC in Eagan, MN? Learn what a right-sized, high-efficiency system should cost and include, plus financing and rebate guidance — so you can compare installer quotes with confidence.",
    tagline: "A new system installed right the first time — sized for your home, not upsold.",
    intro: [
      "A new furnace or air conditioner is a major investment, and the quality of the installation matters as much as the equipment itself. An oversized or poorly installed system wastes energy and wears out early. This guide explains what a proper, right-sized installation should include — so you can tell whether a local installer's quote is doing it correctly with a real load calculation.",
      "You'll get free, no-obligation replacement quotes across Eagan and the south metro, guidance on high-efficiency options that lower your utility bills, and help navigating Minnesota utility rebates and financing so a new system fits your budget.",
    ],
    signs: [
      "Your furnace or AC is 15+ years old",
      "Repairs are getting frequent and expensive",
      "Energy bills keep climbing every season",
      "Some rooms never get comfortable",
      "Your system uses discontinued R-22 refrigerant",
      "You're renovating or adding on to your home",
    ],
    included: [
      {
        title: "Proper load calculation",
        description:
          "Installers size your new system to your home's actual square footage, insulation, and layout — not a rule-of-thumb guess.",
      },
      {
        title: "Rebates & financing guidance",
        description:
          "Get help capturing Xcel Energy and CenterPoint rebates plus flexible financing so efficiency upgrades stay affordable.",
      },
      {
        title: "Clean, code-compliant install",
        description:
          "Licensed, insured crews handle permits and inspections and leave your home tidy when the job is done.",
      },
    ],
    faqs: [
      {
        question: "How much does a new furnace or AC cost?",
        answer:
          "Cost depends on system size, efficiency rating, and your home's setup. That's why replacement quotes are free and itemized — you'll see equipment, labor, and any rebates before you commit.",
      },
      {
        question: "Should I replace my furnace and AC at the same time?",
        answer:
          "If both are near end of life, replacing them together often saves on labor and ensures the two systems are matched for efficiency. A pro can tell you whether that makes sense for your equipment.",
      },
      {
        question: "Are there rebates for high-efficiency systems in Minnesota?",
        answer:
          "Yes. Xcel Energy and CenterPoint Energy offer rebates on qualifying high-efficiency furnaces and air conditioners, and a good installer will help you claim them. Our Minnesota rebates guide and rebate checker show what typically applies.",
      },
    ],
  },
  {
    slug: "maintenance-tune-ups",
    icon: iconBySlug["maintenance-tune-ups"] ?? "wrench",
    title: "Maintenance & Tune-Ups",
    h1: "HVAC Maintenance & Tune-Ups in Eagan, MN: A Homeowner's Guide",
    metaTitle: "HVAC Tune-Ups in Eagan, MN | Furnace & AC Maintenance Guide",
    metaDescription:
      "Seasonal furnace and AC tune-ups in Eagan, MN. Extend equipment life, cut energy bills, and catch small problems early with a multi-point inspection from local pros.",
    tagline: "The cheapest repair is the breakdown that never happens.",
    intro: [
      "Regular maintenance is the single best way to avoid a surprise no-heat or no-cooling emergency. A seasonal tune-up keeps your system running efficiently, lowers your energy bills, and catches worn parts before they fail. This guide explains what a real spring AC or fall furnace tune-up should cover — and how to tell a thorough one from a quick upsell visit.",
      "Most manufacturers also require documented annual maintenance to keep your warranty valid — so a yearly tune-up protects both your equipment and your coverage.",
    ],
    signs: [
      "It's been over a year since your last service",
      "Energy bills are creeping up each season",
      "You want to protect your equipment warranty",
      "The system is louder or dustier than it used to be",
      "You're heading into peak heating or cooling season",
      "You just bought a home with an unknown service history",
    ],
    included: [
      {
        title: "Multi-point inspection",
        description:
          "Techs check and clean burners, coils, the blower, electrical connections, refrigerant levels, and safety controls.",
      },
      {
        title: "Efficiency optimization",
        description:
          "A tuned system uses less energy — a clean coil and correct airflow can noticeably lower your monthly bill.",
      },
      {
        title: "Early problem detection",
        description:
          "Catching a weak capacitor or cracked component now avoids a breakdown on the coldest or hottest day of the year.",
      },
    ],
    faqs: [
      {
        question: "How often should I service my furnace and AC?",
        answer:
          "Once a year for each: an AC tune-up in spring and a furnace tune-up in fall. This keeps efficiency high, protects your warranty, and heads off most emergency breakdowns.",
      },
      {
        question: "What's included in a tune-up?",
        answer:
          "A multi-point inspection and cleaning: burners or coils, blower, electrical connections, refrigerant, thermostat calibration, and a full safety check, with a report of anything that needs attention.",
      },
      {
        question: "Does maintenance really lower energy bills?",
        answer:
          "Yes. Dirty coils, clogged filters, and low refrigerant force your system to run longer and harder. A tune-up restores efficiency, which shows up on your monthly utility bill.",
      },
    ],
  },
  {
    slug: "indoor-air-quality",
    icon: iconBySlug["indoor-air-quality"] ?? "wind",
    title: "Indoor Air Quality",
    h1: "Indoor Air Quality in Eagan, MN: A Homeowner's Guide",
    metaTitle: "Indoor Air Quality in Eagan, MN | Filtration & Purifier Guide",
    metaDescription:
      "Improve your home's air in Eagan, MN with duct cleaning, whole-home humidifiers, dehumidifiers, and air purification. Breathe easier with help from local HVAC pros.",
    tagline: "Minnesota homes stay sealed for months — the air inside should be clean.",
    intro: [
      "Because our homes are closed up tight through long winters and humid summers, indoor air can end up several times more polluted than the air outside. Dust, allergens, dry winter air, and summer humidity all affect comfort and health. This guide covers the indoor-air-quality upgrades that genuinely help a Minnesota home — and how to judge what a contractor recommends.",
      "From duct cleaning and high-performance filtration to whole-home humidifiers that fight dry winter air and dehumidifiers that tame summer mugginess, a technician can recommend the right solution for your home across Eagan and the south metro.",
    ],
    signs: [
      "Excess dust settling quickly after cleaning",
      "Dry skin, static, or bloody noses in winter",
      "Muggy, clammy air in summer",
      "Allergy or asthma symptoms that worsen indoors",
      "Musty or stale odors from the vents",
      "Uneven humidity between rooms",
    ],
    included: [
      {
        title: "Air quality assessment",
        description:
          "A technician evaluates your home's humidity, filtration, and ductwork to recommend targeted improvements.",
      },
      {
        title: "Humidity control",
        description:
          "Whole-home humidifiers add moisture in winter; dehumidifiers pull it out in summer — for year-round comfort.",
      },
      {
        title: "Filtration & purification",
        description:
          "High-MERV filters, media air cleaners, and UV purification capture allergens, dust, and airborne particles.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need duct cleaning?",
        answer:
          "If you see visible dust blowing from vents, notice musty odors, or have recently renovated, duct cleaning can help. A technician can inspect your ducts and tell you honestly whether it's worth it.",
      },
      {
        question: "Will a humidifier help with dry winter air?",
        answer:
          "Yes. A whole-home humidifier attached to your furnace maintains comfortable humidity all winter, reducing dry skin, static, and irritation while making your home feel warmer at a lower thermostat setting.",
      },
      {
        question: "What's the best air filter for allergies?",
        answer:
          "A higher-MERV pleated filter or a dedicated media air cleaner captures far more allergens than a basic fiberglass filter. A pro can recommend the right rating for your system so airflow stays healthy.",
      },
    ],
  },
  {
    slug: "emergency-hvac",
    icon: iconBySlug["emergency-hvac"] ?? "bolt",
    title: "24/7 Emergency Service",
    h1: "Emergency HVAC in Eagan, MN: What to Do When Heat or AC Fails",
    metaTitle: "Emergency HVAC in Eagan, MN | No-Heat & No-Cooling Guide",
    metaDescription:
      "No heat or no cooling emergency in Eagan, MN? Learn what counts as an HVAC emergency, the safety steps to take first, and how to find 24/7 emergency repair from a licensed local contractor — nights, weekends, and holidays.",
    tagline: "Furnaces don't fail at convenient times — here's how to handle a no-heat emergency without overpaying.",
    intro: [
      "HVAC emergencies rarely happen during business hours. A furnace that dies at 2 AM in January or an AC that quits during a July heat wave can't wait until Monday — especially with kids, older family members, or pets at home. This guide explains what counts as a true emergency, the safety steps to take first, and how after-hours pricing works so a late-night call doesn't mean getting overcharged.",
      "Whether it's a complete no-heat failure, a no-cooling emergency, a gas smell, or a system that's tripping the breaker, rapid dispatch gets a real, licensed local technician to your door fast — nights, weekends, and holidays across Eagan and the south metro.",
    ],
    signs: [
      "No heat during freezing temperatures",
      "No cooling during a dangerous heat wave",
      "A burning or electrical smell from the system",
      "A gas odor near the furnace (leave and call from outside)",
      "The system is repeatedly tripping the breaker",
      "Water leaking heavily from the indoor unit",
    ],
    included: [
      {
        title: "Around-the-clock dispatch",
        description:
          "Many local HVAC companies keep technicians on call nights, weekends, and holidays for genuine heating and cooling emergencies — worth confirming before you need it.",
      },
      {
        title: "Rapid local response",
        description:
          "Because the pros are local to the south metro, help arrives fast — not hours away from another metro.",
      },
      {
        title: "Upfront emergency pricing",
        description:
          "You get a clear price before work begins, even after hours — no taking advantage of an emergency.",
      },
    ],
    faqs: [
      {
        question: "What counts as an HVAC emergency?",
        answer:
          "No heat in freezing weather, no cooling during dangerous heat, a gas smell, an electrical or burning odor, or a system tripping the breaker all qualify. If it affects safety or is unbearable, call right away.",
      },
      {
        question: "Do you really answer calls at night and on weekends?",
        answer:
          "Many do. A number of Twin Cities HVAC companies keep technicians on call 24/7 — including nights, weekends, and holidays — for real heating and cooling emergencies. Look for one that advertises genuine 24/7 dispatch before an emergency strikes.",
      },
      {
        question: "I smell gas near my furnace — what should I do?",
        answer:
          "Leave the house immediately, don't touch light switches, and call your gas utility and 911 from outside first. Once you're safe, an emergency HVAC technician can address the furnace itself.",
      },
    ],
  },
];

export const extraServiceDetails: readonly ServiceDetail[] = [
  {
    slug: "heat-pumps",
    icon: "gauge",
    title: "Heat Pump Repair & Installation",
    h1: "Heat Pumps in Eagan, MN: Cold-Climate Cost & Buying Guide",
    metaTitle: "Heat Pumps in Eagan, MN | Cold-Climate Cost & Buying Guide",
    metaDescription:
      "Heat pump repair and cold-climate heat pump installation in Eagan, MN: how dual-fuel systems work, what they cost, which rebates apply, and how to choose an experienced local installer.",
    tagline: "Modern cold-climate heat pumps heat Minnesota homes — when they're set up right.",
    intro: [
      "Heat pumps have come a long way: today's cold-climate models heat efficiently well below zero, and paired with a furnace in a dual-fuel setup they can cut heating costs significantly. But they only perform when they're sized, installed, and configured correctly for Minnesota winters — which is why choosing an experienced local installer matters so much.",
      "Whether your existing heat pump is icing up, stuck on auxiliary heat, or you're weighing a new cold-climate system for the rebates, this guide helps you understand the technology and choose a contractor who works on heat pumps every week — not as an afterthought.",
    ],
    signs: [
      "Outdoor unit stays iced over beyond normal defrost cycles",
      "System blows lukewarm air in heating mode",
      "Auxiliary or emergency heat runs constantly",
      "Electric bills spiking in winter",
      "Heat pump short cycles or is louder than usual",
      "You're considering a high-efficiency upgrade for rebates",
    ],
    included: [
      {
        title: "Cold-climate expertise",
        description:
          "Techs diagnose reversing valves, defrost boards, and refrigerant charge — the failure points unique to heat pumps in cold climates.",
      },
      {
        title: "Dual-fuel system design",
        description:
          "For installations, pros size the heat pump and set the balance point with your furnace so each runs when it's cheapest.",
      },
      {
        title: "Rebate & incentive guidance",
        description:
          "Cold-climate heat pumps qualify for significant Minnesota utility rebates — a good installer will help you capture them, and our rebates guide shows what applies. (The federal 25C credit that once added to this expired at the end of 2025.)",
      },
    ],
    faqs: [
      {
        question: "Do heat pumps actually work in Minnesota winters?",
        answer:
          "Yes — modern cold-climate heat pumps heat effectively even at -13°F and below. Many Minnesota homes pair one with a gas furnace in a dual-fuel setup: the heat pump handles most of the season and the furnace takes over on the coldest days.",
      },
      {
        question: "Why is my heat pump covered in ice?",
        answer:
          "Light frost is normal and defrost cycles should clear it. A unit that stays caked in ice usually has a failed defrost control, low refrigerant, or airflow problems — all worth a prompt diagnostic before the compressor is damaged.",
      },
      {
        question: "Is a heat pump cheaper to run than a furnace?",
        answer:
          "For much of the heating season, yes — heat pumps move heat rather than create it, so they deliver more heat per dollar than electric resistance and often beat gas at milder temperatures. A pro can model the numbers for your home and utility rates.",
      },
    ],
  },
  {
    slug: "thermostats",
    icon: "thermometer",
    title: "Thermostat Installation & Repair",
    h1: "Smart Thermostats in Eagan, MN: A Homeowner's Buying Guide",
    metaTitle: "Smart Thermostats in Eagan, MN | Nest & ecobee Buying Guide",
    metaDescription:
      "Smart thermostat installation and thermostat repair in Eagan, MN. Compatibility checks, C-wire installs, and proper setup for Nest, ecobee, and Honeywell.",
    tagline: "The $200 upgrade that pays for itself — when it's wired and configured right.",
    intro: [
      `A smart thermostat is one of the cheapest ways to cut heating and cooling costs — typically saving around ${SMART_THERMOSTAT_SAVINGS_PCT}% on energy bills through smarter schedules and occupancy sensing. But Minnesota systems with dual-fuel setups, humidifiers, or older wiring often need a proper C-wire and correct configuration to work reliably.`,
      "This guide explains what a correct smart-thermostat install involves — from a compatible C-wire to configuring dual-fuel and multi-stage systems — so you know whether to DIY or hire a local pro to set up your Nest, ecobee, or Honeywell right the first time.",
    ],
    signs: [
      "Blank or unresponsive thermostat screen",
      "Rooms never match the set temperature",
      "System short cycles on and off frequently",
      "Your smart thermostat keeps losing power or Wi-Fi",
      "No C-wire and your new thermostat won't stay charged",
      "Schedules and away modes aren't actually saving energy",
    ],
    included: [
      {
        title: "Compatibility check & C-wire",
        description:
          "The tech verifies your system's wiring — including adding a C-wire or adapter — so the thermostat runs reliably.",
      },
      {
        title: "Correct system configuration",
        description:
          "Heat pumps, dual-fuel, multi-stage systems, and humidifiers each need specific settings to avoid wasted energy or damage.",
      },
      {
        title: "Setup & walkthrough",
        description:
          "App connection, schedules, and sensors configured before the tech leaves — you know exactly how to use it.",
      },
    ],
    faqs: [
      {
        question: "Are smart thermostats really worth it?",
        answer:
          `For most homes, yes. Studies consistently show roughly ${SMART_THERMOSTAT_SAVINGS_PCT}% savings on heating and cooling costs, which typically pays back the device within a couple of years — faster in a climate like Minnesota's with heavy heating use.`,
      },
      {
        question: "Can I install a smart thermostat myself?",
        answer:
          "Sometimes — but many Minnesota homes lack the C-wire smart thermostats need, and dual-fuel or heat pump systems are easy to misconfigure in ways that spike bills or harm equipment. A pro install is quick and removes the guesswork.",
      },
      {
        question: "Which smart thermostat works with my system?",
        answer:
          "It depends on your equipment: some models handle dual-fuel and multi-stage systems better than others. A technician can check your wiring and recommend the right fit among Nest, ecobee, Honeywell, and others.",
      },
    ],
  },
  {
    slug: "duct-cleaning",
    icon: "wind",
    title: "Air Duct Cleaning",
    h1: "Air Duct Cleaning in Eagan, MN: When It's Worth It",
    metaTitle: "Air Duct Cleaning in Eagan, MN | When It's Worth It",
    metaDescription:
      "Professional air duct cleaning in Eagan, MN. Whole-system negative-pressure cleaning, dryer vent service, and honest advice on whether your ducts need it.",
    tagline: "Two decades of dust doesn't belong in the air your family breathes.",
    intro: [
      "Your ductwork moves every bit of air your family breathes — and after years of construction dust, pet hair, and everyday living, a lot of homes are circulating more than they should. Done properly with negative-pressure equipment, duct cleaning removes that buildup at the source instead of just knocking it loose.",
      "This guide helps you tell a legitimate, full-system duct cleaning from a bait-and-switch coupon job — including honest signs your ducts actually need it and the questions to ask before hiring a local duct cleaning pro.",
    ],
    signs: [
      "Visible dust puffing from supply vents",
      "You've recently renovated or finished a basement",
      "Dust returns quickly after cleaning the house",
      "Musty or stale smell when the system runs",
      "Evidence of pests or rodents in ductwork",
      "It's been 10+ years (or never) since the last cleaning",
    ],
    included: [
      {
        title: "Whole-system negative-pressure cleaning",
        description:
          "Supply and return trunks, branch runs, and registers cleaned with truck- or portable-mounted vacuum equipment — not just a shop vac at the vents.",
      },
      {
        title: "Honest assessment first",
        description:
          "If your ducts don't actually need cleaning, the pro will tell you — and point you at the filtration fix that will help instead.",
      },
      {
        title: "Dryer vent cleaning",
        description:
          "Lint-clogged dryer vents are a leading cause of house fires; cleaning them is a quick add-on while the equipment is on site.",
      },
    ],
    faqs: [
      {
        question: "How often should air ducts be cleaned?",
        answer:
          "NADCA (the industry association) suggests every 3–5 years for most homes, or sooner after renovations, pest issues, or if you see visible dust and mold. Many homes have never had it done — that's the highest-value first cleaning.",
      },
      {
        question: "Does duct cleaning help with allergies?",
        answer:
          "It can, especially when paired with better filtration. Removing settled dust, dander, and pollen from ducts reduces what gets recirculated — though a high-MERV filter or air cleaner is the other half of the solution.",
      },
      {
        question: "How much does duct cleaning cost?",
        answer:
          "It depends on your home's size and duct layout, which is why quotes are free and upfront. Be wary of too-good-to-be-true coupon offers — legitimate whole-system cleaning takes hours, not 45 minutes.",
      },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return allServiceDetails.find((s) => s.slug === slug);
}

/** Core + additional services, in display order. */
export const allServiceDetails: readonly ServiceDetail[] = [
  ...serviceDetails,
  ...extraServiceDetails,
];

export interface Location {
  slug: string;
  name: string;
  county: string;
  /** Neighborhoods and landmarks for genuine local relevance. */
  neighborhoods: string[];
  /** Nearby city names for internal linking + local context. */
  nearby: string[];
  intro: string;
  /**
   * A truthful description of the city's housing stock and what it means for
   * heating and cooling — homeowner-guide voice, never implying we do the work.
   */
  localNote: string;
  /** The HVAC issues these specific homes most commonly face (city-relevant). */
  commonProblems: string[];
  /** Local building department that issues mechanical permits. */
  permitAuthority: string;
}

export const locations: readonly Location[] = [
  {
    slug: "eagan",
    name: "Eagan",
    county: "Dakota County",
    neighborhoods: ["Cedar Grove", "Lexington South", "Wescott", "Thomas Lake"],
    nearby: ["Apple Valley", "Burnsville", "Inver Grove Heights", "Mendota Heights"],
    intro:
      "Eagan is our home base, and this guide is written for its homes and its climate. From the established homes near Cedar Grove to the newer builds around Lexington South and Thomas Lake, here's what Eagan homeowners should know about heating and cooling costs, common system issues, rebates, and hiring a qualified local contractor.",
    localNote:
      "Much of Eagan was built out in the 1980s and 90s, so a large share of homes are now at the age where the original furnace and air conditioner reach the end of their service life at the same time. If that's your situation, the money questions are how to size a modern high-efficiency replacement correctly for a split-level or two-story, and how to plan it before a January failure forces a rushed decision.",
    commonProblems: [
      "Original 1980s–90s furnaces and AC units reaching the end of their 15–20 year life",
      "Aging central air conditioners losing capacity and struggling in July humidity",
      "Undersized or leaky return ducts in split-level and two-story floor plans",
      "Older thermostats and single-stage systems that predate smart controls",
    ],
    permitAuthority: "City of Eagan",
  },
  {
    slug: "apple-valley",
    name: "Apple Valley",
    county: "Dakota County",
    neighborhoods: ["Cobblestone Lake", "Palomino Hills", "Regatta", "Diamond Path"],
    nearby: ["Eagan", "Burnsville", "Rosemount", "Lakeville"],
    intro:
      "Just south of Eagan, Apple Valley sits in the same Dakota County climate and utility territory. Whether you're near Cobblestone Lake or the established streets of Palomino Hills, this guide covers what AC repair, furnace service, and system replacement typically cost here — and how to choose a reliable local contractor.",
    localNote:
      "Apple Valley mixes mature neighborhoods with newer developments, so the right HVAC decision here depends a lot on your home's age. Older streets tend to have aging furnaces and AC units nearing replacement, while newer builds are usually still in the maintenance-and-warranty phase — this guide helps you figure out which situation you're in and what it should cost.",
    commonProblems: [
      "Aging furnaces and air conditioners in the older Palomino Hills–era neighborhoods",
      "Builder-grade equipment in newer developments reaching its first major service years",
      "Smart-thermostat wiring (C-wire) issues on older systems",
      "AC short-cycling and humidity complaints during Minnesota summers",
    ],
    permitAuthority: "City of Apple Valley",
  },
  {
    slug: "burnsville",
    name: "Burnsville",
    county: "Dakota County",
    neighborhoods: ["Nicollet", "Sky Oaks", "Rudy Kraemer", "Crystal Beach"],
    nearby: ["Eagan", "Apple Valley", "Savage", "Bloomington"],
    intro:
      "Burnsville homeowners face the same Minnesota temperature swings as the rest of the south metro. From the neighborhoods near the Minnesota River bluffs to homes around Sky Oaks, this guide covers local HVAC costs, common issues, rebates, and how to hire a qualified contractor for furnace repair, AC service, or a full replacement.",
    localNote:
      "Burnsville's housing runs heavily to split-levels, ramblers, and townhomes, and each brings its own heating and cooling quirks — split-levels are notoriously hard to keep evenly comfortable, and townhomes often share walls and venting that complicate a swap. Knowing your home style is the first step to a fair quote, which is why this guide walks through the questions to ask before hiring.",
    commonProblems: [
      "Uneven temperatures between levels in split-level and tri-level homes",
      "Ductwork and zoning limitations that hurt comfort and efficiency",
      "Shared venting and tight mechanical rooms in townhomes",
      "Original furnaces and AC units from earlier build-outs nearing replacement",
    ],
    permitAuthority: "City of Burnsville",
  },
  {
    slug: "rosemount",
    name: "Rosemount",
    county: "Dakota County",
    neighborhoods: ["Bloomfield", "Evermoor", "Bella Vista", "Glendalough"],
    nearby: ["Apple Valley", "Eagan", "Inver Grove Heights", "Farmington"],
    intro:
      "Rosemount's growing neighborhoods deserve reliable heating and cooling. From newer developments like Bloomfield and Evermoor to established homes near downtown, this guide explains what furnace and AC repair or replacement costs here, which rebates apply, and how to pick a trustworthy local contractor.",
    localNote:
      "Rosemount's rapid growth means many homes have relatively new systems still under manufacturer warranty. The trap here is skipping documented annual maintenance, which many warranties require — so for newer Rosemount homes the priority is protecting that coverage, not premature replacement. This guide covers what to keep on file and when a repair is genuinely worth it.",
    commonProblems: [
      "Builder-grade equipment in newer developments reaching its first service years",
      "Warranty coverage lapsing because annual maintenance wasn't documented",
      "AC humidity and short-cycling complaints in newer tightly-sealed homes",
      "Original systems in established downtown-area homes nearing end of life",
    ],
    permitAuthority: "City of Rosemount",
  },
  {
    slug: "inver-grove-heights",
    name: "Inver Grove Heights",
    county: "Dakota County",
    neighborhoods: ["Salem Hills", "Southview", "Arbor Pointe", "Cahill"],
    nearby: ["Eagan", "Mendota Heights", "Rosemount", "West St. Paul"],
    intro:
      "Inver Grove Heights spans everything from mid-century homes to brand-new builds. Whether you're in Salem Hills or near the river in Southview, this guide covers local HVAC costs, the issues these homes commonly face, rebates, and how to hire a licensed local contractor with confidence.",
    localNote:
      "Inver Grove Heights spans mid-century homes through brand-new construction, so there's no single 'typical' HVAC answer here. Mid-century homes often need duct and sizing attention along with a system that's simply worn out, while newer homes are usually about maintenance and efficiency. This guide helps you match the advice to your home's era.",
    commonProblems: [
      "Worn-out furnaces and AC units in mid-century Salem Hills–area homes",
      "Duct sizing and airflow issues in older homes converted to central air",
      "Builder-grade systems in newer Arbor Pointe–area homes reaching first service",
      "Efficiency losses that show up as high winter gas bills",
    ],
    permitAuthority: "City of Inver Grove Heights",
  },
  {
    slug: "mendota-heights",
    name: "Mendota Heights",
    county: "Dakota County",
    neighborhoods: ["Friendly Hills", "Copperfield", "The Ponds", "Somerset"],
    nearby: ["Eagan", "Inver Grove Heights", "West St. Paul", "Sunfish Lake"],
    intro:
      "Mendota Heights homeowners often have larger, more complex heating and cooling systems. From the wooded lots near Somerset to the neighborhoods of Friendly Hills, this guide covers what furnace and AC work costs here, how zoned and multi-system setups affect pricing, and how to choose a qualified local contractor.",
    localNote:
      "Mendota Heights has a lot of larger, custom homes, and those frequently run zoned or multi-system heating and cooling. That complexity changes the math: quotes vary more, sizing matters more, and a cheap bid may skip a proper load calculation. This guide covers what to insist on so you can compare complex-system quotes fairly.",
    commonProblems: [
      "Zoned and multi-system setups that make quotes hard to compare",
      "Uneven comfort in larger homes with a single undersized system",
      "Load calculations skipped on custom-home replacements",
      "Higher operating costs when a large home runs older, lower-efficiency equipment",
    ],
    permitAuthority: "City of Mendota Heights",
  },
  {
    slug: "lakeville",
    name: "Lakeville",
    county: "Dakota County",
    neighborhoods: ["Kenwood Trail", "Crystal Lake", "Spirit of Brandtjen Farm", "Cedar Highlands"],
    nearby: ["Apple Valley", "Burnsville", "Farmington", "Savage"],
    intro:
      "Lakeville is one of the metro's fastest-growing cities, with many newer homes. From Spirit of Brandtjen Farm to homes near Crystal Lake, this guide explains local HVAC costs, when newer systems typically need attention, which rebates apply, and how to hire a reliable local contractor.",
    localNote:
      "Lakeville is one of the metro's fastest-growing cities, so a large share of homes are newer with builder-grade equipment. For most Lakeville homeowners the near-term issue isn't replacement — it's documented maintenance that protects the warranty and catches the small failures builder-grade parts tend to have first. This guide covers what to keep up with and when a repair is worth it.",
    commonProblems: [
      "Builder-grade furnaces and AC units reaching their first major service years",
      "Warranty coverage at risk without documented annual maintenance",
      "Blower motor, ignitor, and capacitor failures common on newer builder equipment",
      "Humidity and airflow complaints in tightly-built newer homes",
    ],
    permitAuthority: "City of Lakeville",
  },
  {
    slug: "savage",
    name: "Savage",
    county: "Scott County",
    neighborhoods: ["Hidden Valley", "Connelly Lakes", "Stonebrooke", "Prince of Peace"],
    nearby: ["Burnsville", "Apple Valley", "Lakeville", "Bloomington"],
    intro:
      "Savage blends established and newer neighborhoods across Scott County. Whether you're near Hidden Valley or the Stonebrooke area, this guide covers what furnace repair, AC service, and full replacements cost locally, the issues these homes see, and how to choose a licensed contractor.",
    localNote:
      "Savage blends established Scott County neighborhoods with newer subdivisions, so heating and cooling needs run the full range — from tired, decades-old equipment ready for replacement to nearly-new systems that just need seasonal upkeep. This guide helps you tell which category your home falls into before you call anyone.",
    commonProblems: [
      "Aging furnaces and AC units in established Hidden Valley–area homes",
      "Builder-grade equipment in newer Stonebrooke-area homes reaching first service",
      "Airflow and duct balancing issues in multi-level homes",
      "High summer humidity straining older or undersized air conditioners",
    ],
    permitAuthority: "City of Savage",
  },
  {
    slug: "bloomington",
    name: "Bloomington",
    county: "Hennepin County",
    neighborhoods: ["Hyland", "Oak Grove", "Bloomington Ferry", "Penn Lake"],
    nearby: ["Burnsville", "Savage", "Eagan", "Edina"],
    intro:
      "Bloomington's many mid-century homes come with their own HVAC quirks. From the Hyland area to neighborhoods near Penn Lake, this guide covers local heating and cooling costs, the common issues in older Bloomington homes, available rebates, and how to hire a qualified contractor.",
    localNote:
      "Bloomington is full of mid-century homes, and many still have their original ductwork and long-in-the-tooth equipment. The recurring question here is how to reach modern, even comfort without tearing the house apart — which usually comes down to right-sizing the new system and addressing duct leakage rather than just swapping the box. This guide covers what a good contractor should evaluate.",
    commonProblems: [
      "Original mid-century ductwork that's leaky, undersized, or poorly balanced",
      "Aging furnaces and air conditioners well past their efficient years",
      "Hot-and-cold rooms from single-zone systems in 1½-story homes",
      "High heating bills from 1970s–80s low-efficiency furnaces",
    ],
    permitAuthority: "City of Bloomington",
  },
  {
    slug: "farmington",
    name: "Farmington",
    county: "Dakota County",
    neighborhoods: ["Charleswood", "Dakota County Fairgrounds area", "Meadowview", "North Creek"],
    nearby: ["Rosemount", "Lakeville", "Apple Valley", "Eagan"],
    intro:
      "Farmington's steady growth has brought many newer homes alongside established ones. From developments like Charleswood to homes near downtown, this guide explains local HVAC costs, when systems typically need service or replacement, and how to choose a trustworthy local contractor.",
    localNote:
      "Farmington's steady growth has added many newer homes with efficient systems alongside its established housing. For newer Farmington homes the smart play is documented seasonal maintenance that protects the warranty; for older ones near downtown it's planning a sensible replacement before a mid-winter failure. This guide covers both paths.",
    commonProblems: [
      "Builder-grade equipment in newer developments reaching first service years",
      "Warranty coverage lost when annual maintenance isn't documented",
      "Original furnaces nearing end of life in established downtown-area homes",
      "Efficiency and airflow issues that show up as uneven comfort",
    ],
    permitAuthority: "City of Farmington",
  },
  {
    slug: "west-st-paul",
    name: "West St. Paul",
    county: "Dakota County",
    neighborhoods: ["Thompson", "Birchview", "Marie", "Emerson"],
    nearby: ["Mendota Heights", "Inver Grove Heights", "Eagan", "St. Paul"],
    intro:
      "West St. Paul's established housing stock means many homes with older furnaces and boilers. Whether you're near Thompson Park or along Robert Street, this guide covers local HVAC costs, the issues older systems face, rebates, and how to hire a licensed contractor with confidence.",
    localNote:
      "West St. Paul's established housing stock means a lot of older furnaces — and a meaningful number of homes still heated by boilers and radiators. Boiler homes have different repair-versus-replace math and different contractor requirements than forced-air homes, so knowing what you have matters. This guide covers both, plus what a fair quote looks like for each.",
    commonProblems: [
      "Older forced-air furnaces at or past the end of their service life",
      "Boiler and radiator systems needing specialized repair or replacement",
      "Homes with no existing ductwork weighing central air or a heat pump",
      "High winter gas bills from low-efficiency heating equipment",
    ],
    permitAuthority: "City of West St. Paul",
  },
  {
    slug: "sunfish-lake",
    name: "Sunfish Lake",
    county: "Dakota County",
    neighborhoods: ["Sunfish Lake", "Salem Church Road area"],
    nearby: ["Mendota Heights", "Inver Grove Heights", "West St. Paul", "Eagan"],
    intro:
      "Sunfish Lake's estate homes often run larger, multi-zone heating and cooling systems. This guide covers what that means for costs and maintenance, the issues these more complex systems face, and how to choose a licensed contractor experienced with custom homes.",
    localNote:
      "Sunfish Lake is almost entirely large custom homes on wooded lots, and those routinely run sophisticated zoned or multi-system HVAC. Replacements here are rarely apples-to-apples, so the risk is a quote that undersizes or oversimplifies the system. This guide covers the load-calculation and zoning questions that keep a high-end quote honest.",
    commonProblems: [
      "Complex zoned and multi-system layouts that make quotes hard to compare",
      "Sizing errors on large-home replacements without a proper load calculation",
      "Uneven comfort across wings, levels, and additions",
      "Higher operating costs when large homes run older, lower-efficiency systems",
    ],
    permitAuthority: "City of Sunfish Lake",
  },
  {
    slug: "south-st-paul",
    name: "South St. Paul",
    county: "Dakota County",
    neighborhoods: ["Kaposia", "North End", "Southview area", "Riverside"],
    nearby: ["West St. Paul", "Inver Grove Heights", "Mendota Heights", "Eagan"],
    intro:
      "South St. Paul has some of the metro's most established housing stock, including homes still running boilers. From above Kaposia Landing to the North End, this guide covers local HVAC costs, the issues older systems face, rebates, and how to hire a licensed contractor.",
    localNote:
      "South St. Paul has some of the metro's most established housing, and many homes still run boilers or decades-old furnaces. In older homes like these, the honest question is often whether to keep repairing an aging system or plan a sensible efficient upgrade — and whether your home even has ductwork for central air. This guide walks through that decision without pressure.",
    commonProblems: [
      "Decades-old furnaces and boilers reaching the end of their service life",
      "Homes without existing ductwork weighing central air, ductless, or heat pumps",
      "Radiator and steam-heat systems needing specialized service",
      "High heating bills from low-efficiency legacy equipment",
    ],
    permitAuthority: "City of South St. Paul",
  },
  {
    slug: "prior-lake",
    name: "Prior Lake",
    county: "Scott County",
    neighborhoods: ["The Wilds", "Jeffers Pond", "Spring Lake", "Downtown Prior Lake"],
    nearby: ["Savage", "Shakopee", "Lakeville", "Burnsville"],
    intro:
      "Prior Lake mixes lakeshore properties with newer neighborhoods around Jeffers Pond. This guide covers local HVAC costs, humidity considerations for lakeside homes, seasonal maintenance, and how to hire a qualified local contractor who quotes upfront.",
    localNote:
      "Prior Lake pairs lakeshore properties with newer developments around Jeffers Pond, and lake homes have a specific HVAC wrinkle: humidity. Proper dehumidification and correctly sized cooling matter more near the water, while newer inland homes are mostly about warranty-protecting maintenance. This guide covers both so you can size and service your system for your actual conditions.",
    commonProblems: [
      "Excess humidity and comfort issues in lakeside homes",
      "Oversized or undersized AC causing short-cycling and poor dehumidification",
      "Builder-grade equipment in newer developments reaching first service years",
      "Warranty coverage lapsing without documented annual maintenance",
    ],
    permitAuthority: "City of Prior Lake",
  },
  {
    slug: "shakopee",
    name: "Shakopee",
    county: "Scott County",
    neighborhoods: ["Southbridge", "Dean Lakes", "Riverside Fields", "Downtown Shakopee"],
    nearby: ["Prior Lake", "Savage", "Burnsville", "Bloomington"],
    intro:
      "Shakopee is one of the metro's fastest-growing cities, with lots of newer homes reaching their first service years. Whether you're in Southbridge, near Dean Lakes, or closer to downtown, this guide covers local HVAC costs, common issues, rebates, and how to choose a licensed contractor.",
    localNote:
      "Shakopee is one of the metro's fastest-growing cities, so much of its housing is newer with builder-grade equipment now hitting its first major service years — exactly when the small failures start and warranties matter. For most Shakopee homeowners this is a maintenance-and-repair decision, not a replacement one, and this guide helps you tell the difference.",
    commonProblems: [
      "Builder-grade furnaces and AC units reaching their first major service years",
      "Blower motor, ignitor, and capacitor failures typical of newer builder equipment",
      "Warranty coverage at risk without documented annual maintenance",
      "Humidity and airflow complaints in tightly-built newer homes",
    ],
    permitAuthority: "City of Shakopee",
  },
  {
    slug: "mendota",
    name: "Mendota",
    county: "Dakota County",
    neighborhoods: ["Historic Mendota village", "Sibley Historic Site area"],
    nearby: ["Mendota Heights", "West St. Paul", "Eagan", "Inver Grove Heights"],
    intro:
      "Mendota may be one of Minnesota's smallest and oldest cities, but its homes face real heating and cooling challenges. This guide covers what HVAC work costs for the historic village's older housing stock, the retrofit issues these homes see, and how to hire a trustworthy local contractor.",
    localNote:
      "Mendota is one of Minnesota's oldest cities, and its historic homes bring real retrofit challenges — older or nonexistent ductwork, additions with their own heating, and houses that predate central air entirely. That makes options like right-sized forced air, ductless mini-splits, or heat pumps worth comparing carefully. This guide covers how to weigh them without overpaying.",
    commonProblems: [
      "Homes with little or no existing ductwork for central heating and cooling",
      "Additions and remodels heated or cooled inconsistently",
      "Aging or legacy heating systems needing replacement planning",
      "Retrofit projects where ductless or heat-pump options deserve comparison",
    ],
    permitAuthority: "City of Mendota",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Absolute canonical URL helper for schema. */
export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
