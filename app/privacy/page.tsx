import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <section>
        <h2>Information We Collect</h2>
        <p className="mt-3">
          When you submit an inquiry through our website or contact us by phone,
          we collect the information you provide — typically your name, phone
          number, email address, and details about the service you need.
        </p>
      </section>
      <section>
        <h2>How We Use Your Information</h2>
        <p className="mt-3">
          We use your information solely to respond to your service request,
          including connecting you with a local HVAC contractor who can help.
          We do not sell your personal information to third parties.
        </p>
      </section>
      <section>
        <h2>Sharing With Contractors</h2>
        <p className="mt-3">
          To fulfill your request, we share your contact details and service
          description with the contractor matched to your inquiry. Contractors
          are required to use this information only to provide the requested
          service.
        </p>
      </section>
      <section>
        <h2>Data Retention & Security</h2>
        <p className="mt-3">
          We retain inquiry records only as long as necessary to provide our
          services and meet legal obligations, and we take reasonable measures
          to protect your information from unauthorized access.
        </p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p className="mt-3">
          Questions about this policy? Email us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4"
          >
            {site.email}
          </a>{" "}
          or call {site.phone}.
        </p>
      </section>
    </LegalPage>
  );
}
