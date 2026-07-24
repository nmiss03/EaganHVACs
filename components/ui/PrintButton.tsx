"use client";

import { Icon } from "@/components/ui/Icon";

/** Lets homeowners print or save the kit as a PDF from their browser. */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-navy-900/15 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50 ${className}`}
    >
      <Icon name="clipboard" className="h-4 w-4 text-accent-600" />
      Print / save as PDF
    </button>
  );
}
