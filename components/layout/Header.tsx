"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-navy-900/10 bg-white/95 shadow-[0_4px_20px_-8px_rgb(11_37_69/0.15)] backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
            <Icon name="flame" className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
            Eagan<span className="text-accent-500">HVACs</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50 hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-accent-600 sm:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-accent-500" />
            {site.phone}
          </a>
          <Link
            href="/#inquiry"
            className="hidden rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:inline-flex"
          >
            Get a Free Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 lg:hidden"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-navy-900/10 px-5">
            <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
              Eagan<span className="text-accent-500">HVACs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  >
                    {link.label}
                    <Icon name="arrowRight" className="h-4 w-4 text-navy-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-navy-900/10 p-5 pb-8">
            <Link
              href="/#inquiry"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-4 text-base font-semibold text-white shadow-glow transition-colors hover:bg-accent-600"
            >
              Get a Free Quote
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900/15 px-5 py-4 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              <Icon name="phone" className="h-4 w-4 text-accent-500" />
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
