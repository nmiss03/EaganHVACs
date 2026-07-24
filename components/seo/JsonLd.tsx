import { faqs, site } from "@/lib/site";

/**
 * Organization + WebSite + FAQPage structured data.
 *
 * EaganHVACs is an independent information publisher — NOT an HVAC
 * contractor — so the entity is modeled as an Organization/publisher, with
 * no LocalBusiness/HVACBusiness type, no opening hours, no service-area
 * dispatch, and no physical office coordinates.
 */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    email: site.email,
    foundingDate: "2026",
    knowsAbout: [
      "HVAC costs",
      "furnace replacement",
      "air conditioner replacement",
      "heat pumps",
      "Minnesota HVAC rebates",
      "home heating and cooling decisions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "customer support",
      availableLanguage: "English",
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-US",
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
