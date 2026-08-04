"use client";

/**
 * Call or Text — GQ Cutz Barber Boutique.
 *
 * Half the people who want a chair will never dial; they want to send the
 * picture on their phone and ask "can you do this". So the number is a choice,
 * and the text branch arrives prefilled with that exact question.
 *
 * Both hrefs come from @/lib/phone as E.164 digits, never from the pretty
 * string, because parens and spaces inside a tel: href are a coin flip on older
 * Android dialers.
 *
 * SKIN: the boutique's own editorial grammar. Square 2px edges, uppercase
 * Satoshi micro-caps, and the numbered "01 / 02" index the mobile menu already
 * uses — the panel reads like two entries torn out of the service index.
 */

import { useEffect, useRef, useState } from "react";
import { BIZ } from "./data";
import { formatPhone, telHref, smsHref } from "@/lib/phone";

type Props = {
  variant?: "pill" | "inline";
  tone?: "copper" | "ghost";
  label?: string;
  className?: string;
};

export default function CallOrText({
  variant = "pill",
  tone = "ghost",
  label = "Call or text",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pretty = formatPhone(BIZ.phoneDigits);
  const tel = telHref(BIZ.phoneDigits);
  const sms = smsHref(BIZ.phoneDigits, BIZ.smsBody);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className={`cot-pair ${className}`}>
        <a className="btn btn-solid" href={tel}>
          Call {pretty}
        </a>
        <a className="btn btn-ghost" href={sms}>
          Text a photo
        </a>
      </div>
    );
  }

  return (
    <div className={`cot ${className}`} ref={rootRef}>
      <button
        type="button"
        className={`cot-trigger cot-${tone}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cot-glyph" aria-hidden="true">
          ☏
        </span>
        <span className="cot-label">{label}</span>
      </button>

      <div className="cot-sheet" data-open={open} role="menu">
        <div className="cot-head">{pretty}</div>
        <a href={tel} role="menuitem" onClick={() => setOpen(false)}>
          <span className="cot-idx">01</span>
          <span className="cot-body">
            <strong>Call the shop</strong>
            <em>Gareth or the chair beside him picks up</em>
          </span>
        </a>
        <a href={sms} role="menuitem" onClick={() => setOpen(false)}>
          <span className="cot-idx">02</span>
          <span className="cot-body">
            <strong>Text the shop</strong>
            <em>Send the picture, ask if we can do it</em>
          </span>
        </a>
      </div>
    </div>
  );
}
