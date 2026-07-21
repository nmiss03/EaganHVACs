import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <section className="bg-navy-900 py-16 lg:py-20">
        <Container>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-navy-100/70">Last updated: {updated}</p>
        </Container>
      </section>
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="prose-navy mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-slate-700 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
