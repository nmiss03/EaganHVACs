import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="bg-white pb-20 lg:pb-28" aria-label="Get started today">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-navy-900 px-7 py-14 text-center shadow-card-hover sm:px-14 lg:py-20">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-navy-600/40 blur-3xl" />
              <div className="absolute -bottom-28 -right-20 h-[340px] w-[340px] rounded-full bg-accent-500/15 blur-3xl" />
              <svg className="absolute inset-0 h-full w-full text-white/[0.04]">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0v40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>
            <div className="relative">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-400">
                <Icon name="sparkles" className="h-7 w-7" />
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Your comfort shouldn&rsquo;t have to wait
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-navy-100/80">
                Get connected with a trusted local HVAC pro today — free quotes,
                honest pricing, and response times your family can rely on.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </Reveal>
      </Container>
    </section>
  );
}
