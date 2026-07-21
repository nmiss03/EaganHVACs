import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { reviews, type Review } from "@/lib/site";

function TestimonialCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-xl bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <div
          className="flex text-accent-500"
          role="img"
          aria-label="5 out of 5 stars"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" className="h-4 w-4 fill-current" />
          ))}
        </div>
        <Icon name="quote" className="h-8 w-8 text-navy-100" aria-hidden="true" />
      </div>
      <blockquote className="mt-5 flex-1">
        <p className="text-[15px] leading-relaxed text-slate-700">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-navy-900/[0.06] pt-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-accent-400"
        >
          {initials}
        </span>
        <div>
          <p className="text-sm font-bold text-navy-900">{review.name}</p>
          <p className="text-xs text-slate-500">
            {review.location} · {review.service}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden bg-navy-900"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-navy-600/25 blur-3xl" />
        <div className="absolute -right-24 top-10 h-[320px] w-[320px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>
      <Container className="relative py-20 lg:py-28">
        <Reveal>
          <SectionTitle
            tone="dark"
            eyebrow="Customer Reviews"
            title="Trusted by homeowners across the south metro"
            description="Real feedback from your neighbors in Eagan and the surrounding communities."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 100}>
              <TestimonialCard review={review} />
            </Reveal>
          ))}
        </div>
      </Container>
      <SectionDivider fill="white" className="relative" />
    </section>
  );
}
