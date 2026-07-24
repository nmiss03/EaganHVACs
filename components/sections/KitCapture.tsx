"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/track";

interface KitCaptureProps {
  /** Where this instance lives, so signups can be attributed. */
  source?: string;
  title?: string;
  blurb?: string;
  className?: string;
}

/**
 * Email capture for the free Minnesota HVAC Buyer's Kit. Turns a one-time
 * visitor into an owned subscriber — the compounding asset of the traction
 * phase. Posts to /api/subscribe, which emails the kit and records the lead.
 */
export function KitCapture({
  source = "site",
  title = "Get the free Minnesota HVAC Buyer's Kit",
  blurb = "The quote-comparison checklist, the exact questions to ask a contractor, fair Twin Cities price ranges, and the Minnesota rebate cheat sheet — emailed to you, free.",
  className = "",
}: KitCaptureProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("done");
      track("kit_subscribe", { source });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-navy-900/[0.08] bg-navy-900 p-6 shadow-card-hover sm:p-8 ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-navy-600/30 blur-3xl" />
      </div>
      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent-300">
          <Icon name="sparkles" className="h-3.5 w-3.5" />
          Free download
        </p>
        <h2 className="mt-4 font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-100/80">{blurb}</p>

        {status === "done" ? (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent-400/30 bg-white/5 p-4">
            <Icon name="badgeCheck" className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
            <p className="text-sm font-medium text-white">
              Check your inbox — your Buyer&rsquo;s Kit is on its way. (Peek in spam if
              it&rsquo;s not there in a minute.)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6" noValidate>
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor={`kit-company-${source}`}>Company (leave blank)</label>
              <input
                id={`kit-company-${source}`}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor={`kit-email-${source}`} className="sr-only">
                Email address
              </label>
              <input
                id={`kit-email-${source}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/15 bg-white/95 px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-accent-600 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Email me the kit"}
                {status !== "loading" ? <Icon name="arrowRight" className="h-4 w-4" /> : null}
              </button>
            </div>
            {status === "error" ? (
              <p className="mt-3 text-sm font-medium text-red-300">{error}</p>
            ) : (
              <p className="mt-3 text-xs text-navy-100/60">
                No spam. Occasional Minnesota rebate &amp; cost updates. Unsubscribe anytime.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
