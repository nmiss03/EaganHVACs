import Image from "next/image";

/**
 * A framed, captioned content image rendered with next/image. Used for
 * educational photos, diagrams, and infographics inside articles and tool
 * pages. Fixed intrinsic width/height reserve the space so the image never
 * shifts layout (Core Web Vitals); it lazy-loads by default. `alt` is required
 * and should describe what the image teaches.
 */
export function ContentImage({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  sizes = "(min-width: 768px) 48rem, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-2xl border border-navy-900/[0.08] shadow-card"
      />
      {caption ? (
        <figcaption className="mt-2.5 text-center text-xs leading-relaxed text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
