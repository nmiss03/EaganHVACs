import type { IconName } from "@/components/ui/Icon";

export const site = {
  name: "Eagan HVACs",
  legalName: "Eagan HVACs",
  tagline: "The Minnesota homeowner's HVAC platform — tools, costs, and trusted local quotes",
  description:
    "Free HVAC tools, honest Minnesota cost guides, and side-by-side quotes from licensed local contractors. Eagan HVACs helps Twin Cities homeowners make smarter heating and cooling decisions.",
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
  { icon: "shield", label: "Licensed & Insured Contractor Network" },
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
      "Fast diagnosis and repair when your air conditioning quits in the middle of a Minnesota heat wave.",
    features: ["Same-day appointments", "All makes & models", "Upfront estimates"],
  },
  {
    slug: "furnace-repair",
    icon: "flame",
    title: "Furnace & Heating Repair",
    description:
      "Keep your home safe and warm through the coldest nights with dependable furnace and boiler repair.",
    features: ["No-heat priority service", "Safety inspections", "Honest recommendations"],
  },
  {
    slug: "installation-replacement",
    icon: "gauge",
    title: "Installation & Replacement",
    description:
      "Right-sized, high-efficiency systems installed correctly the first time — with financing-friendly options.",
    features: ["Free replacement quotes", "Energy-efficient systems", "Rebate guidance"],
  },
  {
    slug: "maintenance-tune-ups",
    icon: "wrench",
    title: "Maintenance & Tune-Ups",
    description:
      "Seasonal tune-ups that extend equipment life, lower utility bills, and catch small issues early.",
    features: ["Spring AC tune-ups", "Fall furnace checks", "Multi-point inspections"],
  },
  {
    slug: "indoor-air-quality",
    icon: "wind",
    title: "Indoor Air Quality",
    description:
      "Breathe easier with duct cleaning, whole-home humidifiers, and high-performance filtration.",
    features: ["Duct cleaning", "Humidifiers & dehumidifiers", "Air purification"],
  },
  {
    slug: "emergency-hvac",
    icon: "bolt",
    title: "24/7 Emergency Service",
    description:
      "No heat at 2 AM in January? A local pro is on call around the clock for urgent HVAC failures.",
    features: ["Nights & weekends", "Rapid dispatch", "Real local technicians"],
  },
];

export interface WhyUsItem {
  icon: IconName;
  title: string;
  description: string;
}

export const whyUs: readonly WhyUsItem[] = [
  {
    icon: "badgeCheck",
    title: "Vetted Local Contractors",
    description:
      "Every contractor we work with is local to the south metro, background-checked, and held to a high standard of workmanship.",
  },
  {
    icon: "bolt",
    title: "Fast Response Times",
    description:
      "Minnesota weather doesn't wait, and neither do we. Most inquiries get a callback within the hour during business hours.",
  },
  {
    icon: "dollar",
    title: "Upfront, Honest Pricing",
    description:
      "Clear estimates before any work begins. No surprise fees, no pressure tactics — just straightforward answers.",
  },
  {
    icon: "home",
    title: "Neighbors, Not a Call Center",
    description:
      "We live here too. When you reach out, you're talking to people who know Eagan's homes, weather, and neighborhoods.",
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
    title: "Compare Licensed Local Pros",
    description:
      "When you're ready, request quotes from vetted, licensed contractors near you and compare them side by side — free, no obligation.",
  },
  {
    icon: "check",
    title: "Choose With Confidence",
    description:
      "Pick the contractor and price that's right for your home. The work is done by the pro you choose — we're here to make choosing easy.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: readonly Faq[] = [
  {
    question: "How quickly can someone come out?",
    answer:
      "For emergencies like no heat in winter or no cooling during a heat wave, contractors in our network offer same-day and 24/7 emergency service. For routine repairs and tune-ups, most appointments are available within 1–2 business days.",
  },
  {
    question: "Do you charge for estimates?",
    answer:
      "Estimates for system replacements and new installations are free. For repair visits, most contractors charge a standard diagnostic fee, which is quoted upfront and often applied toward the cost of the repair.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Eagan and the surrounding south metro communities, including Apple Valley, Burnsville, Rosemount, Inver Grove Heights, Mendota Heights, Lakeville, and nearby neighborhoods.",
  },
  {
    question: "Are the contractors licensed and insured?",
    answer:
      "Yes. Every contractor in our network is licensed, insured, and vetted for quality workmanship and professionalism before we ever send them to a homeowner's door.",
  },
  {
    question: "My furnace is 15+ years old. Should I repair or replace it?",
    answer:
      "It depends on the repair cost, the system's condition, and your energy bills. A good rule of thumb: if the repair costs more than a third of a new system and your furnace is past 15 years, replacement usually makes more financial sense. A technician can walk you through both options with real numbers — no pressure.",
  },
  {
    question: "Do you offer financing for new systems?",
    answer:
      "Many contractors in our network offer flexible financing options for new installations and replacements, along with guidance on utility rebates and energy-efficiency incentives available to Minnesota homeowners.",
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
