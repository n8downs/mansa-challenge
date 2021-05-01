import { useState, useEffect } from 'react';
import { TransactionInfo } from '../data/account';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatMoney } from '../data/money';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Params = {
  accountId: string;
};

export default function AccountTransactions({ accountId }: Params) {
  const styles = useAccountTransactionsStyles();
  const [oldestTransactionDate, setOldestTransactionDate] = useState<Date>();
  const [currentTransactionDate, setCurrentTransactionDate] = useState<Date>(
    new Date()
  );
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);

  useEffect(() => {
    fetch(`https://kata.getmansa.com/accounts/${accountId}/transactions`).then(
      (response) => {
        if (response.ok) {
          return response.json().then((transaction: TransactionInfo) => {
            setOldestTransactionDate(new Date(transaction.timestamp));
            setTransactions([]);
            setCurrentTransactionDate(new Date());
          });
        }
      }
    );
  }, [accountId]);

  useEffect(() => {
    if (
      oldestTransactionDate &&
      currentTransactionDate > oldestTransactionDate &&
      transactions.length < 10
    ) {
      const endDate = currentTransactionDate;
      const startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);
      fetch(
        `https://kata.getmansa.com/accounts/${accountId}/transactions?from=${startDate.toISOString()}&to=${endDate.toISOString()}`
      ).then((response) => {
        if (response.ok) {
          return response.json().then((transactions) => {
            setTransactions((previousTransactions) =>
              previousTransactions.concat(transactions)
            );
            setCurrentTransactionDate(startDate);
          });
        }
      });
    }
  }, [
    accountId,
    transactions.length,
    currentTransactionDate,
    oldestTransactionDate,
  ]);

  return (
    <List className={styles.list}>
      {transactions.map((transaction) => (
        <ListItem
          key={`${transaction.timestamp}-${transaction.amount}-${transaction.status}`}
        >
          <ListItemText>
            {new Date(transaction.timestamp).toLocaleDateString()}
          </ListItemText>
          <ListItemText className={styles.amount}>
            {formatMoney(transaction.amount, transaction.currency)}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

const useAccountTransactionsStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      flexGrow: 1,
    },
    amount: {
      textAlign: 'right',
    },
  })
);
