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

type FakeAccountInfo = {
  account_id?: string;
  account_type?: AccountType;
  iban?: string;
  swift_bic?: string;
  sort_code?: string;
  account_number?: string;
  currency?: Currency;
  available?: number;
  current?: number;
  update_timestamp?: string;
};

export function createFakeAccountInfo(info: FakeAccountInfo): AccountInfo {
  return {
    account_id: info.account_id || 'fake_account_id',
    account_type: info.account_type || 'TRANSACTION',
    iban: info.iban || 'fake_iban',
    swift_bic: info.swift_bic || 'fake_swift_bic',
    sort_code: info.sort_code || 'fake_sort_code',
    account_number: info.account_number || 'fake_account_number',
    currency: info.currency || 'GBP',
    available: info.available || 1234.56,
    current: info.current || 1234.56,
    update_timestamp: info.update_timestamp || '1999-05-03T18:10:20.208Z',
  };
}

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
