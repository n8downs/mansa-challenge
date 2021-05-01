import { Currency } from './money';

type AccountType = 'TRANSACTION' | 'SAVINGS';
export type AccountInfo = {
  account_id: string;
  account_type: AccountType;
  iban: string;
  swift_bic: string;
  sort_code: string;
  account_number: string;
  currency: Currency;
  available: number;
  current: number;
  update_timestamp: string;
};

type TransactionStatus = 'SUCCEEDED';
type TransactionType = 'CREDIT';
type TransactionCategory = 'CREDIT';
export type TransactionInfo = {
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  timestamp: string;
  transaction_category: TransactionCategory;
  transaction_type: TransactionType;
};
