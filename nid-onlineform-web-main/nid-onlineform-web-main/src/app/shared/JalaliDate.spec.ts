import { daysInJalaliMonth, isValidJalaliDate } from './JalaliDate';

describe('Jalali form dates', () => {
  it('limits Dalo to 30 days, including the reported year 1290', () => {
    expect(daysInJalaliMonth(1290, 11).length).toBe(30);
    expect(isValidJalaliDate(1290, 11, 31)).toBe(false);
    expect(isValidJalaliDate(1290, 11, 30)).toBe(true);
  });

  it('allows 31 days only in the first six months', () => {
    for (let month = 1; month <= 6; month++) {
      expect(isValidJalaliDate(1400, month, 31)).toBe(true);
    }
    for (let month = 7; month <= 12; month++) {
      expect(isValidJalaliDate(1400, month, 31)).toBe(false);
    }
  });

  it('allows Hoot 30 in a leap year and rejects it in a common year', () => {
    expect(daysInJalaliMonth(1399, 12).length).toBe(30);
    expect(daysInJalaliMonth(1400, 12).length).toBe(29);
    expect(isValidJalaliDate(1399, 12, 30)).toBe(true);
    expect(isValidJalaliDate(1400, 12, 30)).toBe(false);
  });

  it('waits for the complete year before removing a possible leap day', () => {
    expect(daysInJalaliMonth('', 12).length).toBe(30);
    expect(daysInJalaliMonth('139', 12).length).toBe(30);
  });

  it('accepts Dari and Arabic digits and rejects incomplete or invalid dates', () => {
    expect(isValidJalaliDate('۱۳۹۹', '۱۲', '۳۰')).toBe(true);
    expect(isValidJalaliDate('١٣٩٩', '١٢', '٣٠')).toBe(true);
    for (const date of [[0, 1, 1], [9999, 12, 1], [1400, 0, 1], [1400, 13, 1], [1400, 1, 0], [1400, 1, 1.5]]) {
      expect(isValidJalaliDate(date[0], date[1], date[2])).toBe(false);
    }
  });
});
