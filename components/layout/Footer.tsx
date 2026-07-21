import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { navLinks, serviceAreas, services, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pb-28 text-navy-100 lg:pb-0">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
              aria-label={`${site.name} — home`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                <Icon name="flame" className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Eagan<span className="text-accent-400">HVACs</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-100/70">
              Connecting Eagan homeowners with trusted local heating and cooling
              professionals — fast response, honest pricing, and comfort you can
              count on all year long.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-accent-300"
              >
                <Icon name="phone" className="h-4 w-4 text-accent-400" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-accent-300"
              >
                <Icon name="clipboard" className="h-4 w-4 text-accent-400" />
                {site.email}
              </a>
              <p className="flex items-center gap-3">
                <Icon name="mapPin" className="h-4 w-4 text-accent-400" />
                {site.address.city}, {site.address.state} — {site.address.region}
              </p>
            </div>
          </div>

          <nav aria-label="Footer — pages" className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Navigation
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-100/70 transition-colors hover:text-accent-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#inquiry"
                  className="text-navy-100/70 transition-colors hover:text-accent-300"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer — services" className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href="/#services"
                    className="text-navy-100/70 transition-colors hover:text-accent-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Service Area
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {serviceAreas.map((city) => (
                <li key={city} className="text-navy-100/70">
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-navy-100/60 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-accent-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-accent-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
