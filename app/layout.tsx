import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCTA } from "@/components/layout/StickyCTA";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Trusted HVAC Repair & Installation in Eagan, MN`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "HVAC Eagan MN",
    "furnace repair Eagan",
    "AC repair Eagan",
    "heating and cooling Eagan",
    "emergency HVAC Eagan",
    "HVAC contractors Dakota County",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Trusted HVAC Repair & Installation in Eagan, MN`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Trusted HVAC Repair & Installation in Eagan, MN`,
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
      </body>
    </html>
  );
}
