import * as Jalaali from 'jalaali-js';

const dayOptions: { [count: number]: number[] } = {};
for (const count of [29, 30, 31]) {
  dayOptions[count] = Array.from({ length: count }, (_, index) => index + 1);
}

export function jalaliNumber(value: any): number {
  return Number(String(value == null ? '' : value)
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632)));
}

export function daysInJalaliMonth(year: any, month: any): number[] {
  const jy = jalaliNumber(year);
  const jm = jalaliNumber(month);
  if (!Number.isInteger(jm) || jm < 1 || jm > 12) {
    return dayOptions[31];
  }
  // Do not discard Hoot 30 while a four-digit year is still being entered.
  if (jm === 12 && (!Number.isInteger(jy) || jy < 1000 || jy > 3177)) {
    return dayOptions[30];
  }
  return dayOptions[Jalaali.jalaaliMonthLength(jy, jm)];
}

export function isValidJalaliDate(year: any, month: any, day: any): boolean {
  const parts = [year, month, day].map(jalaliNumber);
  return parts.every(Number.isInteger) && parts[0] > 0 &&
    Jalaali.isValidJalaaliDate(parts[0], parts[1], parts[2]);
}
