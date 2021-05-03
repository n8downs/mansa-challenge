export type Currency = 'GBP';

export function formatMoney(amount: number, currency: Currency) {
  const isNegative = amount < 0;
  const fixedAmount = Math.abs(amount).toFixed(2);
  const amountToShow = isNegative ? `(${fixedAmount})` : fixedAmount;

  switch (currency) {
    case 'GBP':
      return `£${amountToShow}`;
    default:
      return `${amountToShow} ${currency}`;
  }
}
