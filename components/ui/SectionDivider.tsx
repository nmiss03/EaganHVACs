interface SectionDividerProps {
  /** Fill color of the wave — should match the section below it. */
  fill: "white" | "gray" | "navy";
  flip?: boolean;
  className?: string;
}

const fills = {
  white: "text-white",
  gray: "text-slate-50",
  navy: "text-navy-900",
} as const;

/** Decorative wave separator between sections. */
export function SectionDivider({ fill, flip = false, className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -mb-px overflow-hidden leading-none ${fills[fill]} ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14 lg:h-[72px]"
        fill="currentColor"
      >
        <path d="M0 72h1440V22c-140 26-330 42-540 33S480 8 300 8C180 8 80 18 0 40v32Z" />
      </svg>
    </div>
  );
}
