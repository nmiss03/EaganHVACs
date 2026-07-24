const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * A single labeled cost-range bar. Rendered as pure CSS (no SVG, no JS) so it
 * stays fast and prints cleanly. Bars in a group share `scaleMax`, so their
 * widths are directly comparable — a reader can see at a glance that, say, a
 * heat pump's range runs higher and wider than a furnace's. The numeric range
 * is always in text too, so the visual never hides information from screen
 * readers, and the track carries an aria-label.
 */
export function RangeBar({
  label,
  low,
  high,
  scaleMin = 0,
  scaleMax,
  className = "",
}: {
  label: string;
  low: number;
  high: number;
  scaleMin?: number;
  scaleMax: number;
  className?: string;
}) {
  const span = scaleMax - scaleMin || 1;
  const leftPct = Math.max(((low - scaleMin) / span) * 100, 0);
  const widthPct = Math.max(((high - low) / span) * 100, 1.5);

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-navy-900">{label}</span>
        <span className="nums text-sm font-bold text-navy-900">
          {fmt(low)} – {fmt(high)}
        </span>
      </div>
      <div
        className="relative mt-1.5 h-2.5 overflow-hidden rounded-full bg-navy-900/[0.06]"
        role="img"
        aria-label={`${label}: typically ${fmt(low)} to ${fmt(high)} installed`}
      >
        <div
          className="absolute inset-y-0 rounded-full bg-accent-500"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
}
