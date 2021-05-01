import { useEffect, useState } from 'react';

type AccountType = 'TRANSACTION' | 'SAVINGS';
type AccountInfo = {
  account_id: string;
  account_type: AccountType;
  iban: string;
  swift_bic: string;
  sort_code: string;
  account_number: string;
  currency: 'GBP';
  available: number;
  current: number;
  update_timestamp: string;
};
type ResponseData = AccountInfo[];

export default function AccountList() {
  const [data, setData] = useState<ResponseData>();

  useEffect(() => {
    fetch('https://kata.getmansa.com/accounts').then((response) => {
      console.log({ response });
      if (response.ok) {
        return response.json().then((data) => {
          setData(data);
        });
      }
    });
  }, []);

  console.log(data);
  return (
    <ul>
      <li>Account</li>
    </ul>
  );
}
