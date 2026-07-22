import { locations } from "@/lib/content";
import { faqs, site } from "@/lib/site";

/** E.164 telephone from the tel: href, e.g. "+16124245423". */
const telephoneE164 = site.phoneHref.replace("tel:", "");

/**
 * LocalBusiness + FAQPage structured data for local-search visibility.
 */
export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: telephoneE164,
    email: site.email,
    priceRange: "$$",
    slogan: site.tagline,
    foundingDate: "2026",
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/opengraph-image`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: telephoneE164,
      email: site.email,
      contactType: "customer service",
      areaServed: "US-MN",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.8041,
      longitude: -93.1669,
    },
    areaServed: locations.map((location) => ({
      "@type": "City",
      name: `${location.name}, MN`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
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

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
