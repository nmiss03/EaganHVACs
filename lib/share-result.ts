"use client";

import { useCallback, useState } from "react";

/**
 * Makes a calculator result shareable/linkable without opting the page out of
 * static rendering.
 *
 * Instead of `useSearchParams` (which forces a Suspense boundary and a dynamic
 * de-opt in the App Router), we read the query string directly from
 * `window.location` on the client and write updates with
 * `history.replaceState`. The tool pages stay statically rendered; the result
 * state just lives in the URL so a copied link reproduces it.
 */

/** Read the current query params on the client (empty on the server). */
export function readParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/** Hook: write result inputs into the URL, and copy a shareable link. */
export function useShareResult() {
  const [copied, setCopied] = useState(false);

  /** Reflect the current inputs in the URL (no navigation, no scroll). */
  const syncUrl = useCallback((params: Record<string, string | number | undefined | null>) => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") sp.set(key, String(value));
    }
    const qs = sp.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, []);

  /** Copy the current full URL (with result params) to the clipboard. */
  const copyLink = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  }, []);

  return { syncUrl, copyLink, copied };
}
