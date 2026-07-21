import type { IconName } from "@/components/ui/Icon";

export const site = {
  name: "Eagan HVACs",
  legalName: "Eagan HVACs",
  tagline: "Heating & cooling help you can count on in Eagan, MN",
  description:
    "Eagan HVACs connects Eagan homeowners with trusted local HVAC contractors for furnace repair, AC service, installations, and 24/7 emergency help.",
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
  { label: "Services", href: "/services" },
  { label: "Service Area", href: "/locations" },
  { label: "Why Us", href: "/#why-us" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const trustBadges: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "bolt", label: "Fast Local Response" },
  { icon: "shield", label: "Trusted Local Contractors" },
  { icon: "clock", label: "Emergency Service Available" },
  { icon: "mapPin", label: "Serving Eagan & Nearby Communities" },
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
    icon: "clipboard",
    title: "Tell Us What's Going On",
    description:
      "Fill out the quick form or give us a call. Describe the issue — no heat, weak cooling, strange noises, or a system past its prime.",
  },
  {
    icon: "phoneCall",
    title: "Get Matched With a Local Pro",
    description:
      "We connect you with a trusted, vetted HVAC contractor near you — usually with a callback within the hour.",
  },
  {
    icon: "thermometer",
    title: "Enjoy a Comfortable Home",
    description:
      "Your pro diagnoses the problem, gives an upfront estimate, and gets your home comfortable again — fast.",
  },
];

export interface Review {
  name: string;
  location: string;
  quote: string;
  service: string;
}

export const reviews: readonly Review[] = [
  {
    name: "Karen M.",
    location: "Eagan — Cedar Grove",
    quote:
      "Our furnace died on the coldest night of the year. I submitted the form at 9 PM and had a technician at my door by 7 the next morning. Absolute lifesavers.",
    service: "Emergency furnace repair",
  },
  {
    name: "David & Priya S.",
    location: "Eagan — Lexington South",
    quote:
      "We got three quotes for a full AC replacement, and the contractor they matched us with was the most honest and thorough by far. Install was clean and on schedule.",
    service: "AC replacement",
  },
  {
    name: "Tom R.",
    location: "Apple Valley",
    quote:
      "No upselling, no games. The tech explained exactly what was wrong, showed me the failed part, and had it fixed in under an hour. This is how service should work.",
    service: "AC repair",
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

export const serviceAreas: readonly string[] = [
  "Eagan",
  "Apple Valley",
  "Burnsville",
  "Rosemount",
  "Inver Grove Heights",
  "Mendota Heights",
  "Lakeville",
  "Savage",
  "Bloomington",
  "Farmington",
  "West St. Paul",
  "Sunfish Lake",
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
