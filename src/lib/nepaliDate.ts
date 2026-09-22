import NepaliDate from "nepali-datetime";

// Central place for all BS-calendar logic so the rest of the app never
// touches the library directly. Accurate for 1975–2099 BS
// (~1918–2043 AD) using nepali-datetime's official lookup table —
// covers decades further out than this system will realistically run.

const BS_MONTHS = [
  "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function adToBs(adDate: Date) {
  const nd = new NepaliDate(adDate);
  return { year: nd.getYear(), month: nd.getMonth() + 1, day: nd.getDate() }; // month is 0-indexed in the lib
}

export function bsToAd(year: number, month: number, day: number): Date {
  const nd = new NepaliDate(year, month - 1, day); // lib takes 0-indexed month
  return nd.getDateObject();
}

export function daysInBsMonth(year: number, month: number): number {
  // Walk forward from day 1 until construction fails/wraps — nepali-datetime
  // exposes this indirectly via getDate() on the last valid day.
  for (let day = 32; day >= 28; day--) {
    try {
      const nd = new NepaliDate(year, month - 1, day);
      if (nd.getDate() === day) return day;
    } catch {
      continue;
    }
  }
  return 30; // should never hit — safety fallback only
}

export function bsMonthName(month: number): string {
  return BS_MONTHS[month - 1] ?? "";
}

export function formatBs(adDate: Date, withWeekday = false): string {
  const { year, month, day } = adToBs(adDate);
  const base = `${bsMonthName(month)} ${day}, ${year}`;
  if (!withWeekday) return base;
  return `${WEEKDAYS[adDate.getDay()]}, ${base}`;
}

export function formatBsShort(adDate: Date): string {
  const { year, month, day } = adToBs(adDate);
  return `${month}/${day}/${year}`;
}

export function todayBs() {
  return adToBs(new Date());
}

export const BS_MONTH_NAMES = BS_MONTHS;
export const WEEKDAY_NAMES = WEEKDAYS;
