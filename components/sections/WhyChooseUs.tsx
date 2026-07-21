import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whyUs } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-navy-100/60 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-xl border-2 border-dashed border-navy-200"
            />
            <ImagePlaceholder
              label="Photo of a completed local installation"
              icon="home"
              aspect="4/3"
              className="relative shadow-card-hover"
            />
            <div className="absolute -bottom-7 right-4 rounded-xl bg-navy-900 px-6 py-5 text-white shadow-card-hover sm:right-8">
              <p className="font-display text-3xl font-extrabold text-accent-400">
                1 hr
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-navy-100/80">
                Typical callback time
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionTitle
                align="left"
                eyebrow="Why Choose Us"
                title="Local comfort experts who treat your home like their own"
                description="Big national chains treat you like a ticket number. We're your neighbors — and it shows in how fast we respond and how honestly we quote."
              />
            </Reveal>
            <ul className="mt-10 space-y-7">
              {whyUs.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <li className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-card">
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
