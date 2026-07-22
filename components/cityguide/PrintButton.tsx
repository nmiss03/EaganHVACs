"use client";

import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";

/**
 * Small client button that prints the page. Fires a `print_checklist`
 * analytics event tagged with the city so we can see which guides get used.
 */
export function PrintButton({ city }: { city: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        track("print_checklist", { city });
        if (typeof window !== "undefined") window.print();
      }}
      className="no-print inline-flex items-center gap-2 rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      <Icon name="clipboard" className="h-4 w-4 text-accent-500" />
      Print checklist
    </button>
  );
}
