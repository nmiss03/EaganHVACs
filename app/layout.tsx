import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Analytics } from "@/components/seo/Analytics";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

// Publisher framing (not "quotes"/lead-gen): we're an independent Minnesota
// HVAC cost + tools resource. Single source so the three title fields agree.
const HOME_TITLE = `${site.name} — Minnesota HVAC Costs, Calculators & Buying Guides`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Minnesota HVAC cost",
    "HVAC cost estimator Minnesota",
    "furnace replacement cost Minnesota",
    "AC replacement cost Minnesota",
    "repair or replace furnace",
    "compare HVAC quotes",
    "Twin Cities HVAC guide",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: HOME_TITLE,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-xl bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyCTA />
        <Analytics />
      </body>
    </html>
  );
}
