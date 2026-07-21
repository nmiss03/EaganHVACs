import { ComfortIllustration } from "@/components/ui/ComfortIllustration";

interface ImagePlaceholderProps {
  label: string;
  aspect?: "video" | "4/3" | "square" | "3/4";
  className?: string;
}

const aspects = {
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  square: "aspect-square",
  "3/4": "aspect-[3/4]",
} as const;

/**
 * Responsive placeholder for photography that will be added later.
 * Fixed aspect ratios prevent layout shift when real images replace it.
 */
export function ImagePlaceholder({
  label,
  aspect = "4/3",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-navy-100 via-navy-50 to-white ${aspects[aspect]} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full text-navy-900/[0.04]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="ph-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path d="M28 0H0v28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph-grid)" />
      </svg>
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-200/30 blur-2xl"
      />
      <ComfortIllustration
        tone="light"
        className="absolute inset-0 h-full w-full p-6"
      />
      <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500 shadow-sm backdrop-blur">
        {label}
      </span>
    </div>
  );
}
