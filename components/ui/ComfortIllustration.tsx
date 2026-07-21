interface ComfortIllustrationProps {
  /** dark = on navy backgrounds, light = on white/gray backgrounds */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Hand-drawn line-art scene of a home with warm and cool airflow —
 * the brand illustration used inside photo placeholder frames so they
 * read as intentional graphics rather than empty boxes.
 */
export function ComfortIllustration({ tone = "dark", className = "" }: ComfortIllustrationProps) {
  const line = tone === "dark" ? "#97bcdd" : "#417db4";
  const lineSoft = tone === "dark" ? "rgba(151,188,221,0.4)" : "rgba(65,125,180,0.4)";
  const accent = "#fd8037";
  const fillSoft = tone === "dark" ? "rgba(255,255,255,0.04)" : "rgba(65,125,180,0.06)";

  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground */}
      <path d="M20 262h380" stroke={lineSoft} strokeWidth="2" strokeDasharray="1 10" />
      <path d="M60 262h280" stroke={line} strokeWidth="2.5" />

      {/* house body */}
      <path d="M120 262V150l90-64 90 64v112" stroke={line} strokeWidth="3" fill={fillSoft} />
      {/* roof overhang */}
      <path d="M104 162 210 86l106 76" stroke={line} strokeWidth="3" />
      {/* chimney */}
      <path d="M258 122v-30h20v44" stroke={line} strokeWidth="3" />
      {/* door */}
      <rect x="192" y="200" width="36" height="62" rx="3" stroke={line} strokeWidth="2.5" />
      <circle cx="220" cy="233" r="2.5" fill={line} />
      {/* windows */}
      <rect x="142" y="176" width="34" height="30" rx="3" stroke={line} strokeWidth="2.5" />
      <path d="M159 176v30M142 191h34" stroke={lineSoft} strokeWidth="2" />
      <rect x="244" y="176" width="34" height="30" rx="3" stroke={line} strokeWidth="2.5" />
      <path d="M261 176v30M244 191h34" stroke={lineSoft} strokeWidth="2" />

      {/* outdoor condenser unit */}
      <rect x="322" y="222" width="46" height="40" rx="5" stroke={line} strokeWidth="2.5" fill={fillSoft} />
      <circle cx="345" cy="240" r="10" stroke={line} strokeWidth="2" />
      <circle cx="345" cy="240" r="2" fill={line} />
      <path d="M330 256h30" stroke={lineSoft} strokeWidth="2" />
      <path d="M322 230h-8m8 12h-8" stroke={lineSoft} strokeWidth="2" />

      {/* warm airflow from chimney */}
      <path d="M268 84c-6-8 6-12 0-20" stroke={accent} strokeWidth="2.5" opacity="0.9" />
      <path d="M278 78c-5-7 5-10 0-17" stroke={accent} strokeWidth="2.5" opacity="0.55" />

      {/* warm curl (left) */}
      <path d="M56 210c22 0 22-22 44-22 16 0 20 10 20 18" stroke={accent} strokeWidth="2.5" opacity="0.85" />
      <path d="M66 234c16 0 16-14 32-14" stroke={accent} strokeWidth="2.5" opacity="0.45" />
      {/* sun */}
      <circle cx="66" cy="86" r="15" stroke={accent} strokeWidth="2.5" />
      <path d="M66 61v-8M66 119v-8M91 86h8M33 86h8M84 68l6-6M42 110l6-6M84 104l6 6M42 62l6 6" stroke={accent} strokeWidth="2.5" />

      {/* snowflake (right) */}
      <g stroke={line} strokeWidth="2.5">
        <path d="M356 70v44M356 82l-9-9M356 82l9-9M356 102l-9 9M356 102l9 9" />
        <path d="M337 81l38 22M341 76l-1 10M341 76l10-1M375 108l1-10M375 108l-10 1" opacity="0.85" />
        <path d="M337 103l38-22M341 108l10 1M341 108l-1-10M375 76l-10-1M375 76l1 10" opacity="0.85" />
      </g>

      {/* cool airflow toward house (right) */}
      <path d="M390 176c-20 0-20 16-40 16" stroke={line} strokeWidth="2.5" opacity="0.7" />
      <path d="M396 198c-14 0-14 12-28 12" stroke={line} strokeWidth="2.5" opacity="0.4" />

      {/* thermostat dial on house */}
      <circle cx="210" cy="150" r="14" stroke={line} strokeWidth="2.5" fill={fillSoft} />
      <path d="M210 150l6-7" stroke={accent} strokeWidth="2.5" />
      <circle cx="210" cy="150" r="2.2" fill={accent} />
    </svg>
  );
}
