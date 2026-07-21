import type { IconName } from "@/components/ui/Icon";
import { services, site } from "@/lib/site";

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
    h1: "Furnace Repair in Eagan, MN & the South Metro",
    metaTitle: "Furnace Repair Eagan MN | 24/7 Heating Repair Near You",
    metaDescription:
      "Furnace not heating? Get fast, honest furnace and heating repair in Eagan, MN and the south metro. Same-day and 24/7 emergency service from vetted local pros.",
    tagline: "No heat is an emergency in a Minnesota winter — and we treat it like one.",
    intro: [
      "When your furnace quits on a sub-zero January night, you don't have time to wait days for a callback. Eagan HVACs connects you with trusted, licensed heating technicians across Eagan and the south metro who offer same-day and 24/7 emergency furnace repair for every make and model.",
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
          "For no-heat emergencies during winter, contractors in our network offer same-day and 24/7 service across Eagan and the south metro. Most non-emergency repairs are scheduled within 1–2 business days.",
      },
      {
        question: "Is it worth repairing an older furnace?",
        answer:
          "If your furnace is under 15 years old and the repair costs less than about a third of a new system, repair usually makes sense. A technician can show you real numbers for both repair and replacement so you can decide with no pressure.",
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
    h1: "Air Conditioning Repair in Eagan, MN & the South Metro",
    metaTitle: "AC Repair Eagan MN | Same-Day Air Conditioning Service",
    metaDescription:
      "AC not cooling? Get same-day air conditioning repair in Eagan, MN and nearby cities. Vetted local techs, all makes & models, upfront pricing. Call today.",
    tagline: "When a heat wave hits, a warm house gets miserable fast. We move quickly.",
    intro: [
      "Minnesota summers swing from mild to sweltering in a matter of hours, and a failed air conditioner turns a comfortable home into a sauna. Eagan HVACs matches you with local, licensed AC technicians offering same-day service across Eagan and the surrounding communities.",
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
          "Carrier, Trane, Lennox, Goodman, Rheem, Amana and more — network techs service every major brand.",
      },
    ],
    faqs: [
      {
        question: "Can you fix my AC the same day?",
        answer:
          "In most cases yes. During summer, contractors in our network prioritize no-cooling calls across Eagan and the south metro and carry common parts for on-the-spot repairs.",
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
    h1: "Furnace & AC Installation in Eagan, MN",
    metaTitle: "Furnace & AC Installation Eagan MN | Free Replacement Quotes",
    metaDescription:
      "Replacing your furnace or AC in Eagan, MN? Get free quotes on right-sized, high-efficiency systems from vetted local installers. Financing and rebate guidance.",
    tagline: "A new system installed right the first time — sized for your home, not upsold.",
    intro: [
      "A new furnace or air conditioner is a major investment, and the quality of the installation matters as much as the equipment itself. An oversized or poorly installed system wastes energy and wears out early. Eagan HVACs connects you with local installers who size systems correctly using a proper load calculation.",
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
          "Yes. Xcel Energy and CenterPoint Energy offer rebates on qualifying high-efficiency furnaces and air conditioners, and installers in our network help you claim them.",
      },
    ],
  },
  {
    slug: "maintenance-tune-ups",
    icon: iconBySlug["maintenance-tune-ups"] ?? "wrench",
    title: "Maintenance & Tune-Ups",
    h1: "HVAC Maintenance & Tune-Ups in Eagan, MN",
    metaTitle: "HVAC Tune-Up Eagan MN | Furnace & AC Maintenance Near You",
    metaDescription:
      "Seasonal furnace and AC tune-ups in Eagan, MN. Extend equipment life, cut energy bills, and catch small problems early with a multi-point inspection from local pros.",
    tagline: "The cheapest repair is the breakdown that never happens.",
    intro: [
      "Regular maintenance is the single best way to avoid a surprise no-heat or no-cooling emergency. A seasonal tune-up keeps your system running efficiently, lowers your energy bills, and catches worn parts before they fail. Eagan HVACs connects you with local techs for spring AC and fall furnace tune-ups across the south metro.",
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
    h1: "Indoor Air Quality Services in Eagan, MN",
    metaTitle: "Indoor Air Quality Eagan MN | Duct Cleaning & Air Purification",
    metaDescription:
      "Improve your home's air in Eagan, MN with duct cleaning, whole-home humidifiers, dehumidifiers, and air purification. Breathe easier with help from local HVAC pros.",
    tagline: "Minnesota homes stay sealed for months — the air inside should be clean.",
    intro: [
      "Because our homes are closed up tight through long winters and humid summers, indoor air can end up several times more polluted than the air outside. Dust, allergens, dry winter air, and summer humidity all affect comfort and health. Eagan HVACs connects you with local pros who improve the air your family breathes.",
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
    h1: "24/7 Emergency HVAC Repair in Eagan, MN",
    metaTitle: "Emergency HVAC Repair Eagan MN | 24/7 Heating & Cooling",
    metaDescription:
      "No heat or no cooling emergency in Eagan, MN? Get 24/7 emergency HVAC repair from local, licensed technicians. Nights, weekends, and holidays. Call now.",
    tagline: "Furnaces don't fail at convenient times. Neither do we.",
    intro: [
      "HVAC emergencies rarely happen during business hours. A furnace that dies at 2 AM in January or an AC that quits during a July heat wave can't wait until Monday — especially with kids, older family members, or pets at home. Eagan HVACs connects you with local technicians on call around the clock.",
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
          "Technicians are on call nights, weekends, and holidays for genuine heating and cooling emergencies.",
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
          "Yes. Contractors in our network keep technicians on call 24/7, including nights, weekends, and holidays, for real heating and cooling emergencies across Eagan and nearby cities.",
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
    h1: "Heat Pump Repair & Installation in Eagan, MN",
    metaTitle: "Heat Pump Repair & Installation Eagan MN | Cold-Climate Experts",
    metaDescription:
      "Heat pump repair and cold-climate heat pump installation in Eagan, MN. Dual-fuel systems, rebate guidance, and honest advice from vetted local pros.",
    tagline: "Modern cold-climate heat pumps heat Minnesota homes — when they're set up right.",
    intro: [
      "Heat pumps have come a long way: today's cold-climate models heat efficiently well below zero, and paired with a furnace in a dual-fuel setup they can cut heating costs significantly. But they only perform when they're sized, installed, and configured correctly for Minnesota winters — which is where a vetted local pro matters.",
      "Whether your existing heat pump is icing up, stuck on auxiliary heat, or you're weighing a new cold-climate system for the rebates, Eagan HVACs connects you with technicians across Eagan and the south metro who work on heat pumps every week — not as an afterthought.",
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
          "Cold-climate heat pumps qualify for significant utility and federal incentives — installers help you capture them.",
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
    h1: "Smart Thermostat Installation in Eagan, MN",
    metaTitle: "Smart Thermostat Installation Eagan MN | Nest, ecobee & More",
    metaDescription:
      "Smart thermostat installation and thermostat repair in Eagan, MN. Compatibility checks, C-wire installs, and proper setup for Nest, ecobee, and Honeywell.",
    tagline: "The $200 upgrade that pays for itself — when it's wired and configured right.",
    intro: [
      "A smart thermostat is one of the cheapest ways to cut heating and cooling costs — typically saving around 8% on energy bills through smarter schedules and occupancy sensing. But Minnesota systems with dual-fuel setups, humidifiers, or older wiring often need a proper C-wire and correct configuration to work reliably.",
      "Eagan HVACs connects you with local techs who install and configure Nest, ecobee, Honeywell, and other smart thermostats correctly the first time — and who can diagnose an existing thermostat that's misreading temperatures or short-cycling your equipment.",
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
          "For most homes, yes. Studies consistently show roughly 8% savings on heating and cooling costs, which typically pays back the device within a couple of years — faster in a climate like Minnesota's with heavy heating use.",
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
    h1: "Air Duct Cleaning in Eagan, MN",
    metaTitle: "Air Duct Cleaning Eagan MN | Whole-Home Duct Service",
    metaDescription:
      "Professional air duct cleaning in Eagan, MN. Whole-system negative-pressure cleaning, dryer vent service, and honest advice on whether your ducts need it.",
    tagline: "Two decades of dust doesn't belong in the air your family breathes.",
    intro: [
      "Your ductwork moves every bit of air your family breathes — and after years of construction dust, pet hair, and everyday living, a lot of homes are circulating more than they should. Done properly with negative-pressure equipment, duct cleaning removes that buildup at the source instead of just knocking it loose.",
      "Eagan HVACs connects you with local duct cleaning pros who do it right — full-system cleaning, honest assessments of whether your ducts actually need it, and add-ons like dryer vent cleaning that reduce a genuine fire risk.",
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
  /** A distinct local note (housing stock, climate quirk, etc.). */
  localNote: string;
}

export const locations: readonly Location[] = [
  {
    slug: "eagan",
    name: "Eagan",
    county: "Dakota County",
    neighborhoods: ["Cedar Grove", "Lexington South", "Wescott", "Thomas Lake"],
    nearby: ["Apple Valley", "Burnsville", "Inver Grove Heights", "Mendota Heights"],
    intro:
      "Eagan is our home base, and we know its neighborhoods, housing stock, and weather firsthand. From the established homes near Cedar Grove to newer builds around Lexington South and Thomas Lake, we connect Eagan homeowners with trusted local HVAC pros for fast furnace and AC service.",
    localNote:
      "Many Eagan homes built in the 1980s and 90s are now hitting the age where original furnaces and air conditioners need replacement — and our local installers know exactly how to size a modern, efficient system for these homes.",
  },
  {
    slug: "apple-valley",
    name: "Apple Valley",
    county: "Dakota County",
    neighborhoods: ["Cobblestone Lake", "Palomino Hills", "Regatta", "Diamond Path"],
    nearby: ["Eagan", "Burnsville", "Rosemount", "Lakeville"],
    intro:
      "Just south of Eagan, Apple Valley homeowners count on us for dependable heating and cooling help. Whether you're near Cobblestone Lake or the established streets of Palomino Hills, local technicians offer same-day AC repair, furnace service, and full system replacements.",
    localNote:
      "Apple Valley's mix of mature neighborhoods and newer developments means we handle everything from aging furnaces to high-efficiency system upgrades and smart-thermostat installs.",
  },
  {
    slug: "burnsville",
    name: "Burnsville",
    county: "Dakota County",
    neighborhoods: ["Nicollet", "Sky Oaks", "Rudy Kraemer", "Crystal Beach"],
    nearby: ["Eagan", "Apple Valley", "Savage", "Bloomington"],
    intro:
      "Burnsville residents get the same fast, honest HVAC service we bring to Eagan. From the neighborhoods near the Minnesota River bluffs to homes around Sky Oaks, we match you with vetted local contractors for furnace repair, AC service, and installations.",
    localNote:
      "With Burnsville's range of split-levels, ramblers, and townhomes, local pros are experienced with the ductwork and zoning challenges these home styles often present.",
  },
  {
    slug: "rosemount",
    name: "Rosemount",
    county: "Dakota County",
    neighborhoods: ["Bloomfield", "Evermoor", "Bella Vista", "Glendalough"],
    nearby: ["Apple Valley", "Eagan", "Inver Grove Heights", "Farmington"],
    intro:
      "Rosemount's growing neighborhoods deserve reliable heating and cooling, and we deliver. From newer developments like Bloomfield and Evermoor to established homes near downtown, local technicians provide fast furnace and AC repair plus energy-efficient replacements.",
    localNote:
      "Rosemount's rapid growth means many homes have newer systems still under warranty — local pros document maintenance properly to keep that coverage intact.",
  },
  {
    slug: "inver-grove-heights",
    name: "Inver Grove Heights",
    county: "Dakota County",
    neighborhoods: ["Salem Hills", "Southview", "Arbor Pointe", "Cahill"],
    nearby: ["Eagan", "Mendota Heights", "Rosemount", "West St. Paul"],
    intro:
      "Inver Grove Heights homeowners rely on us for prompt, trustworthy HVAC service. Whether you're in Salem Hills or near the river in Southview, we connect you with local, licensed technicians for heating repair, cooling service, and system installations.",
    localNote:
      "The variety of home ages across Inver Grove Heights, from mid-century to brand-new, means local techs are ready for both classic system repairs and modern high-efficiency upgrades.",
  },
  {
    slug: "mendota-heights",
    name: "Mendota Heights",
    county: "Dakota County",
    neighborhoods: ["Friendly Hills", "Copperfield", "The Ponds", "Somerset"],
    nearby: ["Eagan", "Inver Grove Heights", "West St. Paul", "Sunfish Lake"],
    intro:
      "Mendota Heights homeowners expect quality, and local HVAC pros deliver. From the wooded lots near Somerset to the neighborhoods of Friendly Hills, we match you with vetted technicians for furnace and AC repair, maintenance, and premium system replacements.",
    localNote:
      "Mendota Heights' larger, custom homes often have zoned or multi-system HVAC setups, and local installers are experienced with designing and servicing these more complex systems.",
  },
  {
    slug: "lakeville",
    name: "Lakeville",
    county: "Dakota County",
    neighborhoods: ["Kenwood Trail", "Crystal Lake", "Spirit of Brandtjen Farm", "Cedar Highlands"],
    nearby: ["Apple Valley", "Burnsville", "Farmington", "Savage"],
    intro:
      "Lakeville's fast-growing communities count on us for heating and cooling they can trust. From Spirit of Brandtjen Farm to homes near Crystal Lake, local technicians provide same-day repairs, seasonal tune-ups, and efficient new system installations.",
    localNote:
      "As one of the metro's fastest-growing cities, Lakeville has many newer homes — local pros focus on maintenance that protects manufacturer warranties and keeps efficient systems running their best.",
  },
  {
    slug: "savage",
    name: "Savage",
    county: "Scott County",
    neighborhoods: ["Hidden Valley", "Connelly Lakes", "Stonebrooke", "Prince of Peace"],
    nearby: ["Burnsville", "Apple Valley", "Lakeville", "Bloomington"],
    intro:
      "Savage homeowners get fast, friendly HVAC service from pros who know the area. Whether you're near Hidden Valley or the Stonebrooke area, we connect you with licensed local technicians for furnace repair, AC service, and complete replacements.",
    localNote:
      "Savage's blend of established and newer neighborhoods means local technicians handle everything from aging equipment to the latest high-efficiency heating and cooling systems.",
  },
  {
    slug: "bloomington",
    name: "Bloomington",
    county: "Hennepin County",
    neighborhoods: ["Hyland", "Oak Grove", "Bloomington Ferry", "Penn Lake"],
    nearby: ["Burnsville", "Savage", "Eagan", "Edina"],
    intro:
      "Bloomington homeowners rely on us for dependable heating and cooling across the city. From the Hyland area to neighborhoods near Penn Lake, local technicians offer prompt furnace and AC repair, tune-ups, and energy-efficient system upgrades.",
    localNote:
      "Bloomington's many mid-century homes often have original ductwork and aging systems — local pros specialize in upgrading these homes to modern, efficient comfort without a full remodel.",
  },
  {
    slug: "farmington",
    name: "Farmington",
    county: "Dakota County",
    neighborhoods: ["Charleswood", "Dakota County Fairgrounds area", "Meadowview", "North Creek"],
    nearby: ["Rosemount", "Lakeville", "Apple Valley", "Eagan"],
    intro:
      "Farmington families count on us for reliable, affordable HVAC service. From newer developments like Charleswood to established homes near downtown, we connect you with trusted local technicians for heating repair, cooling service, and system installations.",
    localNote:
      "Farmington's steady growth has brought many newer homes with efficient systems — local pros keep them running well with proper seasonal maintenance and warranty-protecting service.",
  },
  {
    slug: "west-st-paul",
    name: "West St. Paul",
    county: "Dakota County",
    neighborhoods: ["Thompson", "Birchview", "Marie", "Emerson"],
    nearby: ["Mendota Heights", "Inver Grove Heights", "Eagan", "St. Paul"],
    intro:
      "West St. Paul homeowners get fast, honest HVAC help from local pros. Whether you're near Thompson Park or the neighborhoods along Robert Street, we match you with licensed technicians for furnace and AC repair, maintenance, and replacements.",
    localNote:
      "West St. Paul's established housing stock means many homes have older furnaces and boilers — local technicians are experienced with both classic systems and efficient modern replacements.",
  },
  {
    slug: "sunfish-lake",
    name: "Sunfish Lake",
    county: "Dakota County",
    neighborhoods: ["Sunfish Lake", "Salem Church Road area"],
    nearby: ["Mendota Heights", "Inver Grove Heights", "West St. Paul", "Eagan"],
    intro:
      "Sunfish Lake's estate homes deserve premium HVAC care, and local pros deliver. We connect residents with vetted, licensed technicians experienced in the larger, often multi-zone heating and cooling systems these custom homes require.",
    localNote:
      "With Sunfish Lake's large custom homes and wooded lots, local installers are equipped to design, service, and replace the more sophisticated zoned HVAC systems these properties often use.",
  },
  {
    slug: "south-st-paul",
    name: "South St. Paul",
    county: "Dakota County",
    neighborhoods: ["Kaposia", "North End", "Southview area", "Riverside"],
    nearby: ["West St. Paul", "Inver Grove Heights", "Mendota Heights", "Eagan"],
    intro:
      "South St. Paul's classic river-town neighborhoods count on us for honest, reliable heating and cooling help. From the homes above Kaposia Landing to the North End, we connect residents with licensed local technicians for furnace repair, AC service, and full system replacements.",
    localNote:
      "South St. Paul has some of the metro's most established housing stock, with many homes still running boilers or decades-old furnaces — local techs are comfortable with older systems and with planning sensible, efficient upgrades when the time comes.",
  },
  {
    slug: "prior-lake",
    name: "Prior Lake",
    county: "Scott County",
    neighborhoods: ["The Wilds", "Jeffers Pond", "Spring Lake", "Downtown Prior Lake"],
    nearby: ["Savage", "Shakopee", "Lakeville", "Burnsville"],
    intro:
      "Prior Lake homeowners — from lakeshore properties to the newer neighborhoods around Jeffers Pond — get fast, trustworthy HVAC service through our vetted local network. Same-day repairs, seasonal tune-ups, and right-sized system installations, all with upfront pricing.",
    localNote:
      "Prior Lake's mix of lake homes and newer developments means everything from humidity control for lakeside properties to warranty-protecting maintenance on newer high-efficiency systems — local pros handle both routinely.",
  },
  {
    slug: "shakopee",
    name: "Shakopee",
    county: "Scott County",
    neighborhoods: ["Southbridge", "Dean Lakes", "Riverside Fields", "Downtown Shakopee"],
    nearby: ["Prior Lake", "Savage", "Burnsville", "Bloomington"],
    intro:
      "Shakopee's fast-growing neighborhoods rely on us for dependable heating and cooling. Whether you're in Southbridge, near Dean Lakes, or in an established home closer to downtown, we match you with licensed local technicians for furnace and AC repair, maintenance, and replacements.",
    localNote:
      "As one of the metro's fastest-growing cities, Shakopee has many newer homes with builder-grade equipment now reaching its first major service years — exactly when proper maintenance and honest repair advice matter most.",
  },
  {
    slug: "mendota",
    name: "Mendota",
    county: "Dakota County",
    neighborhoods: ["Historic Mendota village", "Sibley Historic Site area"],
    nearby: ["Mendota Heights", "West St. Paul", "Eagan", "Inver Grove Heights"],
    intro:
      "Mendota may be one of Minnesota's smallest and oldest cities, but its homeowners get the same fast, honest HVAC service as the rest of the south metro. We connect residents of the historic village with trusted local technicians for heating repair, cooling service, and system replacements.",
    localNote:
      "Mendota's historic housing stock brings unique challenges — older ductwork, additions, and homes that predate central air entirely. Local pros are experienced with retrofits that respect these homes while bringing them up to modern comfort.",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Absolute canonical URL helper for schema. */
export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
