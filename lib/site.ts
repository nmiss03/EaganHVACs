import type { IconName } from "@/components/ui/Icon";
import { LIFESPANS } from "@/lib/hvac-data";

export const site = {
  name: "Eagan HVACs",
  legalName: "Eagan HVACs",
  tagline: "The independent HVAC decision platform for Minnesota homeowners — tools, costs, and unbiased guides",
  description:
    "Free HVAC tools, honest Minnesota cost data, and unbiased homeowner guides. Eagan HVACs is an independent resource — we don't sell, install, or repair anything — that helps Twin Cities homeowners understand costs, compare options, and hire the right local contractor with confidence.",
  // Canonical origin — must match the primary domain served by Vercel
  // (the apex eaganhvacs.com 308-redirects to www).
  url: "https://www.eaganhvacs.com",
  phone: "(612) 424-5423",
  phoneHref: "tel:+16124245423",
  email: "namiss@eaganhvacs.com",
  address: {
    city: "Eagan",
    state: "MN",
    region: "Dakota County",
  },
} as const;

export const navLinks = [
  { label: "Tools", href: "/tools" },
  { label: "Resources", href: "/resources" },
  { label: "Services", href: "/services" },
  { label: "Cities", href: "/locations" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
] as const;

export const trustBadges: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "dollar", label: "100% Free for Homeowners" },
  { icon: "shield", label: "Independent & Unbiased" },
  { icon: "sparkles", label: "Free Planning Tools & Cost Guides" },
  { icon: "mapPin", label: "Built for Minnesota Homes" },
];

export interface Service {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  features: string[];
}

export const services: readonly Service[] = [
  {
    slug: "ac-repair",
    icon: "snowflake",
    title: "AC Repair & Service",
    description:
      "What a failed air conditioner usually needs during a Minnesota heat wave — and what a fair repair should cost.",
    features: ["Common failure causes", "Typical repair costs", "Repair-vs-replace signs"],
  },
  {
    slug: "furnace-repair",
    icon: "flame",
    title: "Furnace & Heating Repair",
    description:
      "How to tell what's wrong when the heat quits, and what qualified contractors typically charge to fix it.",
    features: ["Common no-heat causes", "Safety red flags", "Repair-vs-replace math"],
  },
  {
    slug: "installation-replacement",
    icon: "gauge",
    title: "Installation & Replacement",
    description:
      "What a right-sized, high-efficiency install should include — so you can judge any replacement quote you receive.",
    features: ["Proper sizing (Manual J)", "Efficiency & rebates", "What a fair quote covers"],
  },
  {
    slug: "maintenance-tune-ups",
    icon: "wrench",
    title: "Maintenance & Tune-Ups",
    description:
      "What a real tune-up actually covers, and when seasonal maintenance is genuinely worth paying for.",
    features: ["What's included", "Spring vs. fall timing", "Warranty protection"],
  },
  {
    slug: "indoor-air-quality",
    icon: "wind",
    title: "Indoor Air Quality",
    description:
      "Duct cleaning, humidifiers, and filtration — what genuinely helps a Minnesota home and what's oversold.",
    features: ["What actually works", "Humidity control", "Filtration basics"],
  },
  {
    slug: "emergency-hvac",
    icon: "bolt",
    title: "Emergency HVAC Help",
    description:
      "No heat at 2 AM in January? What to do first, the safety steps that matter, and how emergency pricing works.",
    features: ["What counts as an emergency", "Safety first steps", "After-hours pricing"],
  },
];

export interface WhyUsItem {
  icon: IconName;
  title: string;
  description: string;
}

export const whyUs: readonly WhyUsItem[] = [
  {
    icon: "shield",
    title: "Independent & Unbiased",
    description:
      "We don't sell equipment, install systems, or take contractor commissions — so our tools and guides just tell you the truth about your options.",
  },
  {
    icon: "mapPin",
    title: "Real Minnesota Numbers",
    description:
      "Cost ranges, rebates, and advice tuned to Twin Cities homes, climate, and utilities — not vague national averages.",
  },
  {
    icon: "gauge",
    title: "Free Decision Tools",
    description:
      "Estimate costs, check system lifespan, run repair-vs-replace, and analyze a quote — in under a minute, with no signup.",
  },
  {
    icon: "badgeCheck",
    title: "Know Before You Hire",
    description:
      "Walk into every quote already knowing the fair price range and the exact questions to ask, so you can choose a contractor with confidence.",
  },
];

export interface Step {
  icon: IconName;
  title: string;
  description: string;
}

export const steps: readonly Step[] = [
  {
    icon: "gauge",
    title: "Start With Our Free Tools",
    description:
      "Estimate costs, check your system's lifespan, or run the repair-vs-replace numbers — in under a minute, no phone number required.",
  },
  {
    icon: "clipboard",
    title: "Learn Your Options",
    description:
      "Honest Minnesota cost guides, rebate breakdowns, and troubleshooting help — so you understand the decision before anyone quotes you.",
  },
  {
    icon: "badgeCheck",
    title: "Compare Quotes Like a Pro",
    description:
      "When you're ready, gather written quotes from local contractors you choose and compare them side by side using our checklist — so you can spot the fair one.",
  },
  {
    icon: "check",
    title: "Hire With Confidence",
    description:
      "Pick the contractor and price that's right for your home and hire them directly. We're independent — we just make the decision easy.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: readonly Faq[] = [
  {
    question: "How fast can I get HVAC help in an emergency?",
    answer:
      "For a no-heat or no-cooling emergency, most Twin Cities HVAC companies offer same-day and 24/7 service — call a licensed local contractor directly and they'll prioritize it. For routine repairs and tune-ups, appointments are usually available within 1–2 business days.",
  },
  {
    question: "Are HVAC estimates free?",
    answer:
      "Estimates for new installations and replacements are typically free from most contractors. Repair visits usually carry a diagnostic fee, quoted upfront and often applied toward the repair. Everything on Eagan HVACs — the tools, guides, and cost data — is always 100% free.",
  },
  {
    question: "What areas does Eagan HVACs cover?",
    answer:
      "Our guides, tools, and cost data focus on Eagan and the surrounding south metro — Apple Valley, Burnsville, Rosemount, Inver Grove Heights, Mendota Heights, Lakeville, and nearby cities — where local pricing, rebates, and permit rules apply.",
  },
  {
    question: "How do I know an HVAC contractor is licensed and insured?",
    answer:
      "In Minnesota, ask any contractor for their state license number and current proof of insurance before work begins, and confirm the license on the state's licensing lookup. Our contractor-questions guide walks you through exactly what to verify.",
  },
  {
    question: `My furnace is ${LIFESPANS.furnace.low}+ years old. Should I repair or replace it?`,
    answer: `It depends on the repair cost, the system's condition, and your energy bills. A good rule of thumb: if the repair costs more than a third of a new system and your furnace is past ${LIFESPANS.furnace.low} years, replacement usually makes more financial sense. A technician can walk you through both options with real numbers — no pressure.`,
  },
  {
    question: "Is financing available for new HVAC systems?",
    answer:
      "Many HVAC contractors offer financing on new installations, and Minnesota utility rebates (Xcel Energy, CenterPoint Energy) can meaningfully lower the cost. (The federal 25C tax credit expired at the end of 2025 and isn't available for 2026 installs.) Our rebates guide and financing calculator help you plan what a new system will actually cost per month.",
  },
];

export const serviceOptions: readonly string[] = [
  "AC repair or service",
  "Furnace / heating repair",
  "New system installation or replacement",
  "Maintenance / tune-up",
  "Indoor air quality",
  "Emergency service",
  "Something else",
];
