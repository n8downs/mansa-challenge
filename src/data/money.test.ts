import { formatMoney } from './money';

describe('money data utils', () => {
  describe('formatMoney', () => {
    test('GBP', () => {
      expect(formatMoney(2.59, 'GBP')).toBe('£2.59');
    });

    test('negative amount', () => {
      expect(formatMoney(-2.59, 'GBP')).toBe('£(2.59)');
    });

    test('always show decimal point', () => {
      expect(formatMoney(2, 'GBP')).toBe('£2.00');
      expect(formatMoney(2.2, 'GBP')).toBe('£2.20');
    });

    test('round beyond two decimal points', () => {
      expect(formatMoney(3.1499, 'GBP')).toBe('£3.15');
      expect(formatMoney(3.1449, 'GBP')).toBe('£3.14');
    });

    test('unknown currency', () => {
      // @ts-ignore for testing
      expect(formatMoney(2, 'ABC')).toBe('2.00 ABC');
    });
  });
});
