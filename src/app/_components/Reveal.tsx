"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to `.rise` elements as they enter the viewport.
 * Content is visible by default; the opacity:0 resting state only exists
 * under `.reveal-armed`, which is set pre-hydration ONLY when the tab is
 * visible and motion is allowed. So if this never runs, nothing is stranded.
 * A short fallback also reveals anything already in view (DESIGN_LESSONS 06-03).
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-armed")) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(".rise"));
    if (!items.length) return;

    const reveal = (el: HTMLElement) => el.classList.add("in");

    // anything already in the viewport on mount reveals immediately
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) reveal(el);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

    // safety net: never leave content hidden
    const t = window.setTimeout(() => items.forEach(reveal), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
