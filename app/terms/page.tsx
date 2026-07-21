import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing your use of the ${site.name} website and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <section>
        <h2>About Our Service</h2>
        <p className="mt-3">
          {site.name} connects homeowners with independent, licensed HVAC
          contractors serving Eagan, Minnesota and nearby communities. We are a
          referral service; the contractors who perform work in your home are
          independent businesses responsible for their own workmanship,
          licensing, and insurance.
        </p>
      </section>
      <section>
        <h2>No Guarantee of Availability</h2>
        <p className="mt-3">
          While we work hard to respond quickly, response times and appointment
          availability depend on contractor schedules, weather, and demand, and
          are not guaranteed.
        </p>
      </section>
      <section>
        <h2>Estimates & Pricing</h2>
        <p className="mt-3">
          Any estimates provided through our website or by phone are
          preliminary. Final pricing is set by the contractor after evaluating
          the work, and is agreed between you and the contractor directly.
        </p>
      </section>
      <section>
        <h2>Limitation of Liability</h2>
        <p className="mt-3">
          To the fullest extent permitted by law, {site.name} is not liable for
          the acts or omissions of independent contractors, or for any indirect
          or consequential damages arising from use of this website.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p className="mt-3">
          Questions about these terms? Reach us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
