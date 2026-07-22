import { Icon } from "@/components/ui/Icon";

interface LastUpdatedProps {
  /** Human-readable date, e.g. "July 2026". */
  updated: string;
  /** Optional read-time in minutes; appended when provided. */
  readMinutes?: number;
  /** Colour context: "light" (default, dark text on light bg) or "dark". */
  tone?: "light" | "dark";
  className?: string;
}

const toneClass: Record<NonNullable<LastUpdatedProps["tone"]>, string> = {
  light: "text-slate-500",
  dark: "text-navy-100/80",
};

/**
 * Consistent "Updated {date} · {n} min read" meta line used across article,
 * tool, guide, and FAQ pages. Server component — no client JS. `tone` sets the
 * colour so it stays legible on both light and navy backgrounds (avoids a
 * Tailwind class conflict from overriding the colour via className).
 */
export function LastUpdated({
  updated,
  readMinutes,
  tone = "light",
  className = "",
}: LastUpdatedProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] ${toneClass[tone]} ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Icon name="clock" className="h-3.5 w-3.5" />
        Updated {updated}
      </span>
      {typeof readMinutes === "number" ? (
        <>
          <span aria-hidden="true">·</span>
          <span>{readMinutes} min read</span>
        </>
      ) : null}
    </p>
  );
}
