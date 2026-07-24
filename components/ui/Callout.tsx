import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export type CalloutTone = "note" | "tip" | "warning" | "success" | "research";

const tones: Record<
  CalloutTone,
  { wrap: string; icon: IconName; iconColor: string; defaultTitle?: string }
> = {
  note: { wrap: "border-navy-200 bg-navy-50", icon: "clipboard", iconColor: "text-navy-600" },
  tip: { wrap: "border-accent-200 bg-accent-50/60", icon: "sparkles", iconColor: "text-accent-600" },
  warning: { wrap: "border-red-200 bg-red-50/60", icon: "bolt", iconColor: "text-red-600" },
  success: { wrap: "border-emerald-200 bg-emerald-50/70", icon: "badgeCheck", iconColor: "text-emerald-600" },
  research: { wrap: "border-navy-900/[0.10] bg-slate-50", icon: "clipboard", iconColor: "text-navy-700" },
};

/**
 * One primitive for every bordered "read this" panel — editorial notes, tips,
 * warnings, verification/success confirmations, and research callouts. Using a
 * single component keeps these boxes visually consistent site-wide (a small but
 * real credibility signal) instead of re-styling ad-hoc <div>s per page.
 *
 * Semantic + zero client JS. `title` is optional; `icon` overrides the tone
 * default when a more specific glyph reads better.
 */
export function Callout({
  tone = "note",
  title,
  icon,
  children,
  className = "",
}: {
  tone?: CalloutTone;
  title?: string;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${t.wrap} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon
          name={icon ?? t.icon}
          className={`mt-0.5 h-5 w-5 shrink-0 ${t.iconColor}`}
          strokeWidth={2.2}
        />
        <div className="min-w-0">
          {title ? (
            <p className="font-display text-sm font-bold text-navy-900">{title}</p>
          ) : null}
          <div
            className={`text-sm leading-relaxed text-slate-700 ${title ? "mt-1" : ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
