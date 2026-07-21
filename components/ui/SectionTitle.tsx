interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionTitleProps) {
  const alignClasses = align === "center" ? "mx-auto text-center" : "text-left";
  const onDark = tone === "dark";

  return (
    <div className={`max-w-2xl ${alignClasses}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
          onDark
            ? "bg-white/10 text-accent-300"
            : "bg-navy-900/5 text-navy-700"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          onDark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            onDark ? "text-navy-100/80" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
