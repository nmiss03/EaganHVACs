import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InquirySection } from "@/components/sections/InquirySection";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Reviews />
      <Faq />
      <ServiceArea />
      <InquirySection />
      <FinalCTA />
    </>
  );
}
