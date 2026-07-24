import Image from "next/image";

/**
 * Full-width masthead ribbon at the very top of the homepage. It states the
 * platform's identity — independent HVAC research and tools for Minnesota
 * homeowners — and its four core promises (free tools, independence, local
 * focus, cited research). Rendered with next/image at a fixed intrinsic size
 * so it reserves its space and never shifts layout (Core Web Vitals), and
 * marked `priority` because it is the topmost above-the-fold element.
 */
export function HomeRibbon() {
  return (
    <section aria-label="Eagan HVAC Guide" className="bg-slate-50">
      <Image
        src="/site-images/home-ribbon.webp"
        alt="Eagan HVAC Guide — independent HVAC research and tools for Minnesota homeowners. Free tools at no cost, no sales pitches, Minnesota-focused local data on rebates and climate, and research that is sourced, cited, and regularly updated."
        width={1983}
        height={460}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}
