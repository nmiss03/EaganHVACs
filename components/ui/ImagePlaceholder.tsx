import { Icon, type IconName } from "@/components/ui/Icon";

interface ImagePlaceholderProps {
  label: string;
  icon?: IconName;
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
  icon = "home",
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-navy-400 shadow-card">
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-400">
          {label}
        </span>
      </div>
    </div>
  );
}
