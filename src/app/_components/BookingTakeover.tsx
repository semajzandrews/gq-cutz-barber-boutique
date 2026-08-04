"use client";

/**
 * GQ Cutz — direct booking.
 *
 * SPINE (identical across every build): service -> extras -> date/time -> details -> confirm
 *
 * SKIN (unique to GQ Cutz; NOT MO's drawer, NOT Kador's modal, NOT L'Hirondelle's sheet):
 *   - a full-screen editorial TAKEOVER, set like a spread, because magazine
 *     typography is this shop's whole identity
 *   - a standing left rail holds the running booking like a masthead
 *   - the Rituals are the extras, kept in the shop's own roman-numeral language
 *
 * Static export: nothing is charged.
 */

import { useEffect, useMemo, useState } from "react";

import { BIZ } from "./data";
import {
  SVCS, RITUAL_ADDONS, money, upcomingDays, slotsFor, prettyDate,
  DEPOSIT_ENABLED, DEPOSIT_AMOUNT, type Svc,
} from "./booking";
import { formatAsYouType, isCompletePhone } from "@/lib/phone";


/**
 * Phone handling is NOT duplicated here. The mask, the display format and the
 * tel:/sms: hrefs all come from @/lib/phone so the number a client reads in the
 * nav is exactly the shape he types back into this form.
 */

type Step = "service" | "rituals" | "when" | "details" | "done";

const STEPS: { key: Step; label: string }[] = [
  { key: "service", label: "The Service" },
  { key: "rituals", label: "The Rituals" },
  { key: "when", label: "The Chair" },
  { key: "details", label: "The Client" },
];

export default function BookingTakeover() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("service");
  const [svc, setSvc] = useState<Svc | null>(null);
  const [rituals, setRituals] = useState<string[]>([]);
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => upcomingDays(12), []);
  const slots = useMemo(() => (dateKey ? slotsFor(dateKey) : []), [dateKey]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("gqcutz:book", onOpen as EventListener);
    return () => window.removeEventListener("gqcutz:book", onOpen as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function reset() {
    setStep("service"); setSvc(null); setRituals([]);
    setDateKey(""); setTime(""); setName(""); setPhone("");
  }

  const toggleRitual = (id: string) =>
    setRituals((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const canAdvance =
    step === "service" ? !!svc
    : step === "rituals" ? true
    : step === "when" ? !!dateKey && !!time
    : !!name.trim() && isCompletePhone(phone);

  const nextOf: Record<Exclude<Step, "done">, Step> = {
    service: "rituals", rituals: "when", when: "details", details: "done",
  };
  const prevOf: Partial<Record<Step, Step>> = {
    rituals: "service", when: "rituals", details: "when",
  };

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[100] transition-opacity duration-300"
      style={{
        background: "var(--ink)", color: "var(--bone)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        fontFamily: "var(--font-body)",
      }}
      role="dialog" aria-modal="true" aria-label="Book a chair at GQ Cutz"
    >
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* ── left rail: the masthead ─────────────────────────────── */}
        <aside
          className="shrink-0 lg:w-[340px] px-7 lg:px-9 pt-7 pb-5 lg:py-10 flex lg:flex-col justify-between items-start gap-6"
          style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
        >
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.34em]" style={{ color: "var(--copper)" }}>
              {BIZ.name} — Direct
            </p>
            <h2
              className="mt-3 leading-[0.92]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.1rem)" }}
            >
              {step === "done" ? "The chair\nis yours." : "Book\nthe chair."}
            </h2>

            {/* running order */}
            {(svc || rituals.length > 0 || time) && step !== "done" && (
              <dl className="mt-7 hidden lg:flex flex-col gap-2.5 text-[13px]">
                {svc && (
                  <div className="flex justify-between gap-3" style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 8 }}>
                    <dt style={{ color: "var(--muted)" }}>{svc.name}</dt>
                    <dd className="tabular-nums shrink-0">{svc.priceLabel}</dd>
                  </div>
                )}
                {rituals.map((id) => {
                  const r = RITUAL_ADDONS.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="flex justify-between gap-3" style={{ borderBottom: "1px solid var(--line-soft)", paddingBottom: 8 }}>
                      <dt style={{ color: "var(--muted)" }}>{r.numeral} · {r.name}</dt>
                      <dd className="text-[11px] shrink-0" style={{ color: "var(--muted-dim)" }}>at the chair</dd>
                    </div>
                  );
                })}
                {dateKey && time && (
                  <div className="flex justify-between gap-3">
                    <dt style={{ color: "var(--muted)" }}>{prettyDate(dateKey)}</dt>
                    <dd className="tabular-nums shrink-0">{time}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>

          <div className="hidden lg:block text-[11px] leading-relaxed" style={{ color: "var(--muted-dim)" }}>
            {BIZ.address}, {BIZ.city}
            <br />
            <a href={BIZ.phoneTel} style={{ color: "var(--muted)" }}>{BIZ.phoneDisplay}</a>
          </div>

          <button onClick={() => setOpen(false)} aria-label="Close booking"
            className="lg:hidden grid place-items-center w-10 h-10 shrink-0" style={{ border: "1px solid var(--line)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </aside>

        {/* ── right: the spread ───────────────────────────────────── */}
        <div className="grow min-h-0 flex flex-col">
          <header className="shrink-0 px-7 lg:px-12 py-5 flex items-center justify-between gap-6"
            style={{ borderBottom: "1px solid var(--line)" }}>
            <ol className="flex items-center gap-5 overflow-x-auto">
              {STEPS.map((s, i) => (
                <li key={s.key} className="flex items-center gap-2 shrink-0 text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: i === stepIndex ? "var(--copper-bright)" : i < stepIndex ? "var(--muted)" : "var(--muted-dim)" }}>
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </li>
              ))}
            </ol>
            <button onClick={() => setOpen(false)} aria-label="Close booking"
              className="hidden lg:grid place-items-center w-10 h-10 shrink-0" style={{ border: "1px solid var(--line)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </header>

          <div className="grow overflow-y-auto px-7 lg:px-12 py-8">
            {step === "service" && (
              <ul className="max-w-[720px] flex flex-col">
                {SVCS.map((s) => {
                  const on = svc?.id === s.id;
                  return (
                    <li key={s.id}>
                      <button onClick={() => setSvc(s)}
                        className="w-full text-left py-5 flex items-baseline justify-between gap-6 transition-colors"
                        style={{ borderBottom: "1px solid var(--line-soft)", color: on ? "var(--copper-bright)" : "var(--bone)" }}>
                        <span className="min-w-0">
                          <span className="block" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.15rem,2vw,1.6rem)" }}>
                            {s.name}
                          </span>
                          <span className="block text-[13px] mt-1.5 max-w-[52ch]" style={{ color: "var(--muted-dim)" }}>{s.desc}</span>
                        </span>
                        <span className="tabular-nums shrink-0" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                          {s.priceLabel}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {step === "rituals" && (
              <div className="max-w-[760px]">
                <p className="text-[13px] mb-7 max-w-[54ch]" style={{ color: "var(--muted-dim)" }}>
                  Optional. Added at the chair, priced in shop.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {RITUAL_ADDONS.map((r) => {
                    const on = rituals.includes(r.id);
                    return (
                      <li key={r.id}>
                        <button onClick={() => toggleRitual(r.id)}
                          className="w-full h-full text-left p-6 transition-colors"
                          style={{
                            border: `1px solid ${on ? "var(--copper)" : "var(--line-soft)"}`,
                            background: on ? "var(--accent-dim)" : "transparent",
                          }}>
                          <span className="block text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--copper)" }}>
                            {r.numeral} · {r.kicker}
                          </span>
                          <span className="block mt-2.5" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem" }}>
                            {r.name}
                          </span>
                          <span className="block mt-3 text-[12px]" style={{ color: on ? "var(--copper-bright)" : "var(--muted-dim)" }}>
                            {on ? "Added" : r.add}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {step === "when" && (
              <div className="max-w-[760px]">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "var(--copper)" }}>Choose a day</p>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-9">
                  {days.map((d) => {
                    const on = dateKey === d.key;
                    return (
                      <button key={d.key} onClick={() => { setDateKey(d.key); setTime(""); }}
                        className="shrink-0 w-[66px] py-3.5 text-center transition-colors"
                        style={{
                          border: `1px solid ${on ? "var(--copper)" : "var(--line-soft)"}`,
                          background: on ? "var(--copper)" : "transparent",
                          color: on ? "var(--ink)" : "var(--muted)",
                        }}>
                        <span className="block text-[10px] uppercase tracking-wider">{d.dow}</span>
                        <span className="block text-[20px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>{d.day}</span>
                        <span className="block text-[9px] uppercase tracking-wider opacity-75">{d.month}</span>
                      </button>
                    );
                  })}
                </div>
                {dateKey && (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: "var(--copper)" }}>Choose a time</p>
                    {slots.length === 0 ? (
                      <p className="text-[14px]" style={{ color: "var(--muted-dim)" }}>No chairs left today. Try tomorrow.</p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-w-[560px]">
                        {slots.map((s) => {
                          const on = time === s;
                          return (
                            <button key={s} onClick={() => setTime(s)}
                              className="py-3 text-[13px] tabular-nums transition-colors"
                              style={{
                                border: `1px solid ${on ? "var(--copper)" : "var(--line-soft)"}`,
                                background: on ? "var(--copper)" : "transparent",
                                color: on ? "var(--ink)" : "var(--muted)",
                              }}>{s}</button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {step === "details" && (
              <div className="max-w-[440px] flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--copper)" }}>Your name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last"
                    className="px-4 py-3.5 text-[15px] bg-transparent"
                    style={{ border: "1px solid var(--line)", color: "var(--bone)" }} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--copper)" }}>Phone</span>
                  <input value={phone} onChange={(e) => setPhone(formatAsYouType(e.target.value))} inputMode="tel" maxLength={14} placeholder="(347) 000-0000"
                    className="px-4 py-3.5 text-[15px] bg-transparent"
                    style={{ border: "1px solid var(--line)", color: "var(--bone)" }} />
                </label>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted-dim)" }}>
                  {DEPOSIT_ENABLED
                    ? `A ${money(DEPOSIT_AMOUNT)} deposit holds the chair and comes off the service.`
                    : "No deposit taken. We'll text to confirm the chair."}
                </p>
              </div>
            )}

            {step === "done" && (
              <div className="max-w-[560px]">
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--copper)" }}>Confirmed</p>
                <p className="mt-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>
                  {svc?.name}
                </p>
                <p className="mt-2 text-[15px]" style={{ color: "var(--copper-bright)" }}>
                  {prettyDate(dateKey)} · {time}
                </p>
                {rituals.length > 0 && (
                  <ul className="mt-6 flex flex-col gap-1.5">
                    {rituals.map((id) => {
                      const r = RITUAL_ADDONS.find((x) => x.id === id)!;
                      return (
                        <li key={id} className="text-[13px]" style={{ color: "var(--muted)" }}>
                          {r.numeral} · {r.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="mt-7 text-[13px] leading-relaxed" style={{ color: "var(--muted-dim)" }}>
                  We&rsquo;ll text {phone} to confirm with {BIZ.barber}. Questions, call{" "}
                  <a href={BIZ.phoneTel} style={{ color: "var(--muted)" }}>{BIZ.phoneDisplay}</a>.
                </p>
                <p className="mt-7 inline-block px-3 py-2 text-[11px]" style={{ border: "1px solid var(--line)", color: "var(--muted-dim)" }}>
                  Demo booking — nothing was charged.
                </p>
                <button onClick={reset} className="block mt-6 text-[13px] underline" style={{ color: "var(--copper-bright)" }}>
                  Book another
                </button>
              </div>
            )}
          </div>

          {step !== "done" && (
            <footer className="shrink-0 px-7 lg:px-12 py-5 flex items-center gap-3" style={{ borderTop: "1px solid var(--line)" }}>
              {prevOf[step] && (
                <button onClick={() => setStep(prevOf[step]!)}
                  className="px-6 py-3.5 text-[11px] uppercase tracking-[0.2em]"
                  style={{ border: "1px solid var(--line)", color: "var(--muted)" }}>Back</button>
              )}
              <button
                disabled={!canAdvance}
                onClick={() => setStep(nextOf[step as Exclude<Step, "done">])}
                className="px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-opacity"
                style={{ background: "var(--copper)", color: "var(--ink)", opacity: canAdvance ? 1 : 0.3 }}>
                {step === "service" && (svc ? `Continue · ${svc.priceLabel}` : "Choose a service")}
                {step === "rituals" && (rituals.length ? `Continue · ${rituals.length} ritual${rituals.length > 1 ? "s" : ""}` : "Skip the rituals")}
                {step === "when" && "Continue"}
                {step === "details" && "Hold the chair"}
              </button>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
