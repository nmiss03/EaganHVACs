"use client";

import { useEffect, useState } from "react";

/**
 * Thin scroll-progress bar pinned to the very top of the viewport. Uses a
 * transform (scaleX) so it never triggers layout shift, and only eases the
 * transform when the user hasn't asked for reduced motion.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    let ticking = false;
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
    >
      <div
        className={`h-full origin-left bg-accent-500 ${
          animate ? "transition-transform duration-150 ease-out" : ""
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
