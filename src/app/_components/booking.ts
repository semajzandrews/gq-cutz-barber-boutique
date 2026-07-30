/**
 * GQ Cutz — online booking, data layer.
 * Composed from factory-blueprints/addons/booking-widget. Spine unchanged:
 *   service -> extras -> date/time -> details -> confirm
 *
 * WHY THIS EXISTS: every "Book" CTA on this site currently hands the client to
 * Booksy, which charges the shop per booking and owns the client relationship.
 * Booking direct keeps both.
 *
 * Prices are the shop's REAL prices, read straight from data.ts — never copied,
 * so the printed service list and the booking flow cannot drift apart.
 *
 * Static export: nothing is charged. Deposits stay off until the shop names a figure.
 */
import { SERVICES, RITUALS } from "./data";

export const DEPOSIT_ENABLED = false;
export const DEPOSIT_AMOUNT = 0;

/** Shop hours used to build the slot grid. Adjust to the shop's real hours. */
export const OPEN_HOUR = 10;
export const CLOSE_HOUR = 19;
export const SLOT_MINUTES = 45;

export type Svc = { id: string; name: string; desc: string; price: number; priceLabel: string };
export type Ritual = { id: string; numeral: string; name: string; kicker: string; add: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const SVCS: Svc[] = SERVICES.map((s) => ({
  id: slug(s.name),
  name: s.name,
  desc: s.desc,
  price: parseFloat(String(s.price).replace(/[^0-9.]/g, "")) || 0,
  priceLabel: String(s.price),
}));

/** The rituals are the shop's own language for add-ons. Priced on request. */
export const RITUAL_ADDONS: Ritual[] = RITUALS.map((r) => ({
  id: slug(r.name),
  numeral: r.n,
  name: r.name,
  kicker: r.kicker,
  add: r.add,
}));

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function upcomingDays(days = 12) {
  const out: { key: string; dow: string; day: string; month: string }[] = [];
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    out.push({
      key: x.toISOString().slice(0, 10),
      dow: x.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(x.getDate()),
      month: x.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return out;
}

export function slotsFor(dateKey: string): string[] {
  const out: string[] = [];
  const now = new Date();
  const isToday = dateKey === now.toISOString().slice(0, 10);
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      if (m >= 60) continue;
      if (isToday && (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()))) continue;
      const t = new Date(); t.setHours(h, m, 0, 0);
      out.push(t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    }
  }
  return out;
}

export function prettyDate(dateKey: string) {
  return new Date(dateKey + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}
