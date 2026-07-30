"use client";

import { useEffect, useRef, useState } from "react";
import {
  BIZ,
  COVER_LINES_LEFT,
  COVER_LINES_RIGHT,
} from "./data";

export default function CoverHero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    // print-in on mount
    const t = window.setTimeout(() => setLit(true), 80);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    const onScroll = () => {
      if (reduce || !imgRef.current) return;
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      imgRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0) scale(1.02)`;
    };
    const tick = () => {
      onScroll();
      raf = 0;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`cover grain${lit ? " lit" : ""}`} id="top">
      <div className="cover-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/images/cover.jpg"
          alt="Editorial portrait of a sharply groomed man with a precise beard, the GQ Cutz cover"
          fetchPriority="high"
        />
      </div>
      <div className="cover-scrim" />

      {/* desktop flanking cover lines */}
      <div className="cover-flank left">
        {COVER_LINES_LEFT.map((l, i) => (
          <p
            key={i}
            className="cline cprint"
            style={{ transitionDelay: `${0.5 + i * 0.12}s` }}
            dangerouslySetInnerHTML={{ __html: l.html }}
          />
        ))}
      </div>
      <div className="cover-flank right">
        {COVER_LINES_RIGHT.map((l, i) => (
          <p
            key={i}
            className="cline cprint"
            style={{ transitionDelay: `${0.62 + i * 0.12}s` }}
            dangerouslySetInnerHTML={{ __html: l.html }}
          />
        ))}
      </div>

      <div className="cover-content">
        <div className="masthead">
          <div className="mh-top cprint" style={{ transitionDelay: "0.05s" }}>
            South Orange, New Jersey
          </div>
          <h1 className="cprint" style={{ transitionDelay: "0.12s" }}>
            GQ&nbsp;Cutz
          </h1>
          <div className="mh-rule cprint" style={{ transitionDelay: "0.26s" }}>
            <span>The Grooming Issue</span>
            <span className="dot" />
            <span>No. 01</span>
            <span className="dot" />
            <span>Barber Boutique</span>
          </div>
        </div>

        <div className="cover-bottom">
          <h2
            className="cover-tag cprint"
            style={{ transitionDelay: "0.38s" }}
          >
            It is not just a haircut, it is a <em>lifestyle</em>.
          </h2>

          <div className="cover-lines">
            {[...COVER_LINES_LEFT, ...COVER_LINES_RIGHT].map((l, i) => (
              <p
                key={i}
                className="cline cprint"
                style={{ transitionDelay: `${0.46 + i * 0.08}s` }}
                dangerouslySetInnerHTML={{ __html: l.html }}
              />
            ))}
          </div>

          <div
            className="cover-actions cprint"
            style={{ transitionDelay: "0.56s" }}
          >
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => window.dispatchEvent(new CustomEvent("gqcutz:book"))}
            >
              Reserve your chair
            </button>
            <a className="btn btn-ghost" href="#ritual">
              See the ritual
            </a>
          </div>

          <div className="cover-foot cprint" style={{ transitionDelay: "0.7s" }}>
            <span className="issue-line">
              GQ Cutz LLC &nbsp;·&nbsp; 4 Sloan St &nbsp;·&nbsp; Book on Booksy
            </span>
            <span className="barcode" aria-hidden="true">
              {[3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1].map(
                (w, i) => (
                  <i key={i} style={{ width: `${w}px` }} />
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
