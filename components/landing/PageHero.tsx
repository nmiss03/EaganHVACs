import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { trustBadges } from "@/lib/site";

interface PageHeroProps {
  eyebrow: string;
  icon?: IconName;
  title: string;
  intro: string[];
}

/** Compact interior-page hero used by service and location landing pages. */
export function PageHero({ eyebrow, icon, title, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900" aria-label="Introduction">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-navy-600/30 blur-3xl" />
        <div className="absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-accent-500/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full text-white/[0.035]">
          <defs>
            <pattern id="ph-hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0v44" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ph-hero-grid)" />
        </svg>
      </div>

      <Container className="relative py-14 lg:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-100 backdrop-blur">
            {icon ? <Icon name={icon} className="h-4 w-4 text-accent-400" /> : null}
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
            {title}
          </h1>
          {intro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-4 text-lg leading-relaxed text-navy-100/85"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/minnesota-hvac-buyers-kit" size="lg">
              Get the Free Buyer&rsquo;s Kit
              <Icon name="arrowRight" className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/tools" variant="ghost" size="lg">
              <Icon name="gauge" className="h-5 w-5 text-accent-400" />
              Browse the free tools
            </ButtonLink>
          </div>
          <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-7 sm:grid-cols-2">
            {trustBadges.map((badge) => (
              <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
            ))}
          </ul>
        </div>
      </Container>
      <SectionDivider fill="white" className="relative" />
    </section>
  );
}
