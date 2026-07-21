import { InquiryForm } from "@/components/sections/InquiryForm";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/lib/site";

const reassurances = [
  {
    icon: "check",
    title: "Free, no-obligation quotes",
    description: "Get real numbers before you commit to anything.",
  },
  {
    icon: "bolt",
    title: "Fast local response",
    description: "Most requests get a callback within the hour.",
  },
  {
    icon: "shield",
    title: "Vetted, licensed pros",
    description: "Every contractor is licensed, insured, and background-checked.",
  },
] as const;

export function InquirySection() {
  return (
    <section
      id="inquiry"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-navy-100/70 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionTitle
                align="left"
                eyebrow="Get Started"
                title="Request your free quote"
                description="Tell us what's going on with your system and a trusted local pro will reach out — usually within the hour during business hours."
              />
            </Reveal>
            <ul className="mt-10 space-y-6">
              {reassurances.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-card">
                      <Icon name={item.icon} className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={280}>
              <div className="mt-10 rounded-xl bg-navy-900 p-6 text-white shadow-card-hover">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-100/70">
                  Prefer to talk to a person?
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-2 flex items-center gap-3 font-display text-2xl font-extrabold text-white transition-colors hover:text-accent-300"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500 text-white">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  {site.phone}
                </a>
                <p className="mt-3 text-sm text-navy-100/70">
                  Available 24/7 for emergencies · Mon–Sat 7am–7pm for everything else
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <InquiryForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
