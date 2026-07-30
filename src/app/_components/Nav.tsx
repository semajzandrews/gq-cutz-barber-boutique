"use client";

import { useEffect, useState } from "react";
import { BIZ, NAV_LINKS } from "./data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="wordmark" aria-label="GQ Cutz home">
            GQ&nbsp;Cutz<span className="mk-sub">Barber Boutique</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <button
              type="button"
              className="nav-cta"
              onClick={() => window.dispatchEvent(new CustomEvent("gqcutz:book"))}
            >
              Book a chair
            </button>
            <button
              className="hamburger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <button
          className="menu-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        {NAV_LINKS.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <span className="idx">0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new CustomEvent("gqcutz:book"));
          }}
        >
          <span className="idx">→</span>Book
        </button>
      </div>
    </>
  );
}
