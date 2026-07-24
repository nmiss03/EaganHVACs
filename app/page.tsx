import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { FeaturedResources } from "@/components/sections/FeaturedResources";
import { FeaturedTools } from "@/components/sections/FeaturedTools";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InquirySection } from "@/components/sections/InquirySection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { TrustSection } from "@/components/sections/TrustSection";
import { TwoPaths } from "@/components/sections/TwoPaths";
import { KitCapture } from "@/components/sections/KitCapture";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <TwoPaths />
      <FeaturedTools />
      <FeaturedResources />
      <section className="bg-white py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <KitCapture source="home" />
          </div>
        </Container>
      </section>
      <HowItWorks />
      <TrustSection />
      <ServiceArea />
      <ServicesStrip />
      <InquirySection />
      <Faq />
    </>
  );
}
