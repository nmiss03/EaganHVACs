/**
 * Fire an analytics event to whichever providers are loaded. Safe to call
 * anywhere on the client — no-ops when no analytics is configured, so it
 * never throws and ships nothing until GA4/Clarity env vars are set.
 */
export function track(
  event: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  try {
    w.gtag?.("event", event, params);
    w.clarity?.("event", event);
    // Also push to the GTM dataLayer if present, for tag-manager setups.
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...params });
    }
  } catch {
    /* analytics must never break the UI */
  }
}
