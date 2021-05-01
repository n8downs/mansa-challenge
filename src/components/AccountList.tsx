import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import { AccountInfo } from '../data/account';
import AccountLink from './AccountLink';

export default function AccountList() {
  const [accounts, setAccounts] = useState<AccountInfo[]>();

  useEffect(() => {
    fetch('https://kata.getmansa.com/accounts').then((response) => {
      if (response.ok) {
        return response.json().then((accounts) => {
          setAccounts(accounts);
        });
      }
    });
  }, []);

  if (accounts) {
    return (
      <List>
        {accounts.map((account) => {
          return <AccountLink account={account} key={account.account_id} />;
        })}
      </List>
    );
  }

  return <>TODO</>;
}
