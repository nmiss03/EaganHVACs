import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/** Reusable conversion band for the bottom of landing pages. */
export function CTABand({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section className="bg-white py-16 lg:py-20" aria-label="Get started">
      <Container>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-navy-900 px-7 py-12 text-center shadow-card-hover sm:px-14 lg:py-16">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[280px] w-[280px] rounded-full bg-navy-600/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-[300px] w-[300px] rounded-full bg-accent-500/15 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-navy-100/80">
              {sub}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/#inquiry" size="lg">
                Get a Free Quote
                <Icon name="arrowRight" className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="ghost" size="lg">
                <Icon name="phone" className="h-5 w-5 text-accent-400" />
                {site.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
